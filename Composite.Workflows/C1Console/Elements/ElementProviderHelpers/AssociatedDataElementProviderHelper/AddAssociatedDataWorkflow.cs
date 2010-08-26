using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Workflow.Activities;
using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Core.Types;
using Composite.C1Console.Users;
using Composite.Data.Validation;
using Composite.C1Console.Workflow;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Composite.Data.Types;


namespace Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    /// <summary>
    /// This is used when adding data to a page folder
    /// </summary>
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddAssociatedDataWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public AddAssociatedDataWorkflow()
        {
            InitializeComponent();
        }



        private Type GetInterfaceType()
        {
            Type interfaceType;

            AssociatedDataElementProviderHelperEntityToken entityToken = this.EntityToken as AssociatedDataElementProviderHelperEntityToken;
            if (entityToken != null)
            {
                interfaceType = entityToken.GetInterfaceType();
                IData data = entityToken.GetData();

                this.UpdateBinding("Data", data);
            }
            else
            {
                DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

                interfaceType = dataEntityToken.Data.DataSourceId.InterfaceType;

                IData data = dataEntityToken.Data;
                this.UpdateBinding("Data", data);
            }

            return interfaceType;
        }



        private void IsDataTypeDescriptorNullTest(object sender, ConditionalEventArgs e)
        {
            e.Result = this.BindingExist("DataTypeDescriptor") == false;
        }




        private void IsDataAddedTest(object sender, ConditionalEventArgs e)
        {
            e.Result = false;
        }



        private void initialCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            AssociatedDataElementProviderHelperEntityToken entityToken = this.EntityToken as AssociatedDataElementProviderHelperEntityToken;

            if ((entityToken != null) && (entityToken.Payload != ""))
            {
                Type type = TypeManager.GetType(entityToken.Payload);
                Guid id = type.GetImmutableTypeId();
                DataTypeDescriptor dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(id);
                this.UpdateBinding("DataTypeDescriptor", dataTypeDescriptor);

                IData data = entityToken.GetData();
                this.UpdateBinding("Data", data);
            }
        }



        private void selectTypeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            Type interfaceType = GetInterfaceType();

            List<Type> types = PageFolderFacade.GetAllFolderTypes().ToList();

            this.Bindings.Add("Types", types);
            this.Bindings.Add("SelectedType", types[0]);
        }



        private void selectTypeCodeActivity_Next_ExecuteCode(object sender, EventArgs e)
        {
            Type type = this.GetBinding<Type>("SelectedType");

            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            Type parentInterfaceType = dataEntityToken.Data.DataSourceId.InterfaceType;
            object id = parentInterfaceType.GetKeyPropertyInfoes()[0].GetValue(dataEntityToken.Data, null);
            string idString = ValueTypeConverter.Convert<string>(id);

            AssociatedDataElementProviderHelperEntityToken entityToken = new AssociatedDataElementProviderHelperEntityToken(
                                TypeManager.SerializeType(parentInterfaceType),
                                this.EntityToken.Source,
                                idString,
                                TypeManager.SerializeType(type)
                            );

            this.ExecuteWorklow(entityToken, typeof(AddAssociatedDataWorkflow));

            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type.GetImmutableTypeId());
            this.UpdateBinding("DataTypeDescriptor", dataTypeDescriptor);
        }



        private void enterDataCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataTypeDescriptor dataTypeDescriptor = this.GetBinding<DataTypeDescriptor>("DataTypeDescriptor");

            Type type = TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);

            IPage page = this.GetBinding<IData>("Data") as IPage;

            DataTypeDescriptorFormsHelper helper = new DataTypeDescriptorFormsHelper(dataTypeDescriptor);
            helper.LayoutIconHandle = "associated-data-add";

            GeneratedTypesHelper generatedTypesHelper = new GeneratedTypesHelper(dataTypeDescriptor);
            helper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);

            IData newData;
            if (this.BindingExist("NewData") == false)
            {
                newData = DataFacade.BuildNew(type);

                PageFolderFacade.AssignFolderDataSpecificValues(newData, page);

                IPublishControlled publishControlled = newData as IPublishControlled;
                if (publishControlled != null)
                {
                    publishControlled.PublicationStatus = GenericPublishProcessController.Draft;
                }

                ILocalizedControlled localizedData = newData as ILocalizedControlled;
                if (localizedData != null)
                {
                    CultureInfo cultureInfo = UserSettings.ActiveLocaleCultureInfo;
                    if (cultureInfo == null)
                    {
                        cultureInfo = DataLocalizationFacade.DefaultLocalizationCulture;
                    }
                    localizedData.CultureName = cultureInfo.Name;
                    localizedData.SourceCultureName = cultureInfo.Name;
                }

                this.Bindings.Add("NewData", newData);

                helper.UpdateWithNewBindings(this.Bindings);
                helper.ObjectToBindings(newData, this.Bindings);
            }
            else
            {
                newData = this.GetBinding<IData>("NewData");
            }

            this.DeliverFormData(
                    type.Name,
                    StandardUiContainerTypes.Document,
                    helper.GetForm(),
                    this.Bindings,
                    helper.GetBindingsValidationRules(newData)
                );
        }



        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataTypeDescriptor dataTypeDescriptor = this.GetBinding<DataTypeDescriptor>("DataTypeDescriptor");

            Type type = TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);

            IData newData = this.GetBinding<IData>("NewData");

            DataTypeDescriptorFormsHelper helper = new DataTypeDescriptorFormsHelper(dataTypeDescriptor);

            GeneratedTypesHelper generatedTypesHelper = new GeneratedTypesHelper(dataTypeDescriptor);
            helper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);

            Dictionary<string, string> errorMessages = helper.BindingsToObject(this.Bindings, newData);

            ValidationResults validationResults = ValidationFacade.Validate(newData);

            foreach (ValidationResult result in validationResults)
            {
                this.ShowFieldMessage(result.Key, result.Message);
            }

            if (errorMessages != null)
            {
                foreach (var kvp in errorMessages)
                {
                    this.ShowFieldMessage(kvp.Key, kvp.Value);
                }
            }


            bool justAdded = false;
            if ((validationResults.IsValid == true) && (errorMessages == null))
            {
                if (this.BindingExist("DataAdded") == false)
                {
                    DataScopeIdentifier dataScopeIdentifier = DataScopeIdentifier.Public;

                    if (dataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)) == true)
                    {
                        dataScopeIdentifier = DataScopeIdentifier.Administrated;
                    }

                    using (new DataScope(dataScopeIdentifier))
                    {
                        newData = DataFacade.AddNew(newData);
                        justAdded = true;
                    }

                    this.AcquireLock(newData.GetDataEntityToken());

                    this.UpdateBinding("NewData", newData);
                    this.Bindings.Add("DataAdded", true);
                }
                else
                {
                    if (newData is IPublishControlled)
                    {
                        IData refreshedData = DataFacade.GetDataFromDataSourceId(newData.DataSourceId);
                        if (refreshedData != null &&
                            (refreshedData as IPublishControlled).PublicationStatus == GenericPublishProcessController.Published)
                        {
                            (refreshedData as IPublishControlled).PublicationStatus = GenericPublishProcessController.Draft;
                            DataFacade.Update(refreshedData);
                        }
                    }

                    DataFacade.Update(newData);
                }

                ParentTreeRefresher specificTreeRefresher = this.CreateParentTreeRefresher();
                specificTreeRefresher.PostRefreshMesseges(this.EntityToken);

                if (justAdded)
                {
                    SetSaveStatus(true, newData);
                }
                else
                {
                    SetSaveStatus(true);
                }
            }
            else
            {
                SetSaveStatus(false);
            }
        }
    }
}
