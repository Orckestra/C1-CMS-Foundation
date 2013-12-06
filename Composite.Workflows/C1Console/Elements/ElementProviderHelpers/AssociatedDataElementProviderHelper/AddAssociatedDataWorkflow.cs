using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Workflow.Activities;
using System.Workflow.Runtime;
using Composite.C1Console.Actions;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Foundation;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types;


namespace Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    /// <summary>
    /// This is used when adding data to a page folder
    /// </summary>
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddAssociatedDataWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        [NonSerialized]
        private bool _doPublish = false;

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

                if (!PermissionsFacade.GetPermissionsForCurrentUser(EntityToken).Contains(PermissionType.Publish) || !typeof(IPublishControlled).IsAssignableFrom(type))
                {
                    FormData formData = WorkflowFacade.GetFormData(InstanceId, true);

                    if (formData.ExcludedEvents == null)
                        formData.ExcludedEvents = new List<string>();

                    formData.ExcludedEvents.Add("SaveAndPublish");
                }
            }
        }



        private void selectTypeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            List<Type> types = PageFolderFacade.GetAllFolderTypes().ToList();

            this.Bindings.Add("Types", types);
            this.Bindings.Add("SelectedType", types[0]);
        }



        private void selectTypeCodeActivity_Next_ExecuteCode(object sender, EventArgs e)
        {
            Type type = this.GetBinding<Type>("SelectedType");

            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            Type parentInterfaceType = dataEntityToken.Data.DataSourceId.InterfaceType;
            object id = parentInterfaceType.GetKeyProperties()[0].GetValue(dataEntityToken.Data, null);
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
                    CultureInfo cultureInfo = UserSettings.ActiveLocaleCultureInfo ?? DataLocalizationFacade.DefaultLocalizationCulture;
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

            IData newData = this.GetBinding<IData>("NewData");

            DataTypeDescriptorFormsHelper helper = new DataTypeDescriptorFormsHelper(dataTypeDescriptor);

            GeneratedTypesHelper generatedTypesHelper = new GeneratedTypesHelper(dataTypeDescriptor);
            helper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);


            bool isValid = ValidateBindings();

            if (!BindAndValidate(helper, newData))
            {
                isValid = false;
            }

            bool justAdded = false;
            if (isValid)
            {
                bool published = false;

                if (this.BindingExist("DataAdded") == false)
                {
                    DataScopeIdentifier dataScopeIdentifier = DataScopeIdentifier.Public;

                    if (dataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)))
                    {
                        dataScopeIdentifier = DataScopeIdentifier.Administrated;
                    }

                    using (new DataScope(dataScopeIdentifier))
                    {
                        newData = DataFacade.AddNew(newData);
                        justAdded = true;
                    }

                    PublishIfNeeded(newData);

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

                    published = PublishIfNeeded(newData);

                    EntityTokenCacheFacade.ClearCache(newData.GetDataEntityToken());
                }

                if (!published)
                {
                    ParentTreeRefresher specificTreeRefresher = this.CreateParentTreeRefresher();
                    specificTreeRefresher.PostRefreshMesseges(this.EntityToken);
                }

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

        private bool PublishIfNeeded(IData newData)
        {
            if (newData is IPublishControlled && _doPublish)
            {
                GenericPublishProcessController.PublishActionToken actionToken = new GenericPublishProcessController.PublishActionToken();
                FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
                ActionExecutorFacade.Execute(newData.GetDataEntityToken(), actionToken, serviceContainer);
                return true;
            }

            return false;
        }

        private void enablePublishCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            _doPublish = true;
        }
    }
}
