using System;
using System.Collections.Generic;
using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.C1Console.Elements.ElementProviderHelpers.DataGroupingProviderHelper;
using Composite.Core.Serialization;
using Composite.Core.Types;
using Composite.Data.Validation;
using Composite.C1Console.Workflow;
using Microsoft.Practices.EnterpriseLibrary.Validation;


namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewDataWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        [NonSerialized]
        private DataTypeDescriptorFormsHelper _helper = null;

        [NonSerialized]
        private string _typeName = null;


        public AddNewDataWorkflow()
        {
            InitializeComponent();
        }


        private Type GetInterfaceType()
        {
            Type type;
            if (this.EntityToken is GeneratedDataTypesElementProviderTypeEntityToken)
            {
                GeneratedDataTypesElementProviderTypeEntityToken entityToken = this.EntityToken as GeneratedDataTypesElementProviderTypeEntityToken;
                type = TypeManager.GetType(entityToken.SerializedTypeName);
            }
            else if (this.EntityToken is DataGroupingProviderHelperEntityToken)
            {
                DataGroupingProviderHelperEntityToken entityToken = this.EntityToken as DataGroupingProviderHelperEntityToken;
                type = TypeManager.GetType(entityToken.Type);
            }
            else
            {
                throw new NotImplementedException();
            }

            return type;
        }


        private DataTypeDescriptorFormsHelper GetDataTypeDescriptorFormsHelper()
        {
            if (_helper == null)
            {
                Type type = GetInterfaceType();

                Guid guid = type.GetImmutableTypeId();

                DataTypeDescriptor typeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(guid);

                if (typeDescriptor == null) throw new InvalidOperationException(string.Format("Can not find the type descriptor for the type '{0}'", type));

                GeneratedTypesHelper generatedTypesHelper = new GeneratedTypesHelper(typeDescriptor) { AllowForiegnKeyEditing = true };

                _helper = new DataTypeDescriptorFormsHelper(typeDescriptor, true, this.EntityToken);
                _helper.LayoutIconHandle = "generated-type-data-add";

                _helper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);

                _typeName = typeDescriptor.Name;
            }

            return _helper;
        }



        private DataTypeDescriptor GetDataTypeDescriptor()
        {
            GeneratedDataTypesElementProviderTypeEntityToken entityToken = (GeneratedDataTypesElementProviderTypeEntityToken)this.EntityToken;
            Type type = TypeManager.GetType(entityToken.SerializedTypeName);

            Guid guid = type.GetImmutableTypeId();

            return DataMetaDataFacade.GetDataTypeDescriptor(guid);
        }



        private void initialCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            DataTypeDescriptorFormsHelper helper = GetDataTypeDescriptorFormsHelper();            
            helper.UpdateWithNewBindings(this.Bindings);
            
            Type type = GetInterfaceType();

            IData newData = DataFacade.BuildNew(type);

            IPublishControlled publishControlled = newData as IPublishControlled;
            if (publishControlled != null)
            {
                publishControlled.PublicationStatus = GenericPublishProcessController.Draft;
            }            
            
            if (string.IsNullOrEmpty(this.Payload) == false)
            {
                Dictionary<string, string> serializedValues = StringConversionServices.ParseKeyValueCollection(this.Payload);
                Dictionary<string, string> values = new Dictionary<string, string>();
                foreach (var kvp in serializedValues)
                {
                    values.Add(kvp.Key, StringConversionServices.DeserializeValueString(kvp.Value));
                }

                newData.SetValues(values);
            }

            helper.ObjectToBindings(newData, this.Bindings);            

            GeneratedTypesHelper.SetNewIdFieldValue(newData);

            this.Bindings.Add("NewData", newData);
        }



        private void step1CodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataTypeDescriptorFormsHelper helper = GetDataTypeDescriptorFormsHelper();

            if (this.BindingExist("DataAdded") == false)
            {
                helper.LayoutLabel = helper.DataTypeDescriptor.Name; 
            }

            IData newData = this.GetBinding<IData>("NewData");            

            this.DeliverFormData(
                    _typeName,
                    StandardUiContainerTypes.Document,
                    helper.GetForm(),
                    this.Bindings,
                    helper.GetBindingsValidationRules(newData)
                );
        }



        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            bool isValid = ValidateBindings();

            DataTypeDescriptorFormsHelper helper = GetDataTypeDescriptorFormsHelper();

            IData newData = this.GetBinding<IData>("NewData");

            if(!BindAndValidate(helper, newData))
            {
                isValid = false;
            }


            bool justAdded = false;

            if (isValid)
            {
                if (this.BindingExist("DataAdded") == false)
                {
                    newData = DataFacade.AddNew(newData);
                    justAdded = true;

                    this.AcquireLock(newData.GetDataEntityToken());

                    this.UpdateBinding("NewData", newData);
                    this.Bindings.Add("DataAdded", true);
                }
                else
                {
                    DataFacade.Update(newData);
                }

                SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
                specificTreeRefresher.PostRefreshMesseges(new GeneratedDataTypesElementProviderRootEntityToken(this.EntityToken.Source, GeneratedDataTypesElementProviderRootEntityToken.GlobalDataTypeFolderId));
            }

            if (justAdded)
            {
                SetSaveStatus(true, newData);
            } 
            else
            {
                SetSaveStatus(isValid);
            }
        }   
    }
}
