
using System;
using System.Collections.Generic;
using System.Linq;

using Composite.C1Console.Actions;
using Composite.C1Console.Elements.ElementProviderHelpers.DataGroupingProviderHelper;
using Composite.C1Console.Scheduling;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Activities;
using Composite.Core.Serialization;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;

namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewDataWorkflow : FormsWorkflow
    {
        [NonSerialized]
        private bool _doPublish;

        [NonSerialized]
        private DataTypeDescriptorFormsHelper _helper;

        [NonSerialized]
        private string _typeName;

        public AddNewDataWorkflow()
        {
            InitializeComponent();
        }

        private Type GetInterfaceType()
        {
            Type type;
            if (EntityToken is GeneratedDataTypesElementProviderTypeEntityToken)
            {
                var entityToken = EntityToken as GeneratedDataTypesElementProviderTypeEntityToken;

                type = TypeManager.GetType(entityToken.SerializedTypeName);
            }
            else if (EntityToken is DataGroupingProviderHelperEntityToken)
            {
                var entityToken = EntityToken as DataGroupingProviderHelperEntityToken;

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
                var type = GetInterfaceType();
                var guid = type.GetImmutableTypeId();

                var typeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(guid);
                if (typeDescriptor == null)
                {
                    throw new InvalidOperationException(string.Format("Can not find the type descriptor for the type '{0}'", type));
                }

                var generatedTypesHelper = new GeneratedTypesHelper(typeDescriptor) { AllowForeignKeyEditing = true };

                _helper = new DataTypeDescriptorFormsHelper(typeDescriptor, true, EntityToken)
                {
                    LayoutIconHandle = "generated-type-data-add"
                };

                _helper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);

                _typeName = typeDescriptor.Name;
            }

            return _helper;
        }

        private void initialCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            var type = GetInterfaceType();

            if (!PermissionsFacade.GetPermissionsForCurrentUser(EntityToken).Contains(PermissionType.Publish) || !typeof(IPublishControlled).IsAssignableFrom(type))
            {
                var formData = WorkflowFacade.GetFormData(InstanceId, true);

                if (formData.ExcludedEvents == null)
                {
                    formData.ExcludedEvents = new List<string>();
                }

                formData.ExcludedEvents.Add("SaveAndPublish");
            }


            var helper = GetDataTypeDescriptorFormsHelper();
            helper.UpdateWithNewBindings(Bindings);

            var newData = DataFacade.BuildNew(type);

            var publishControlled = newData as IPublishControlled;
            if (publishControlled != null)
            {
                publishControlled.PublicationStatus = GenericPublishProcessController.Draft;
            }

            if (!string.IsNullOrEmpty(Payload))
            {
                var values = new Dictionary<string, string>();

                var serializedValues = StringConversionServices.ParseKeyValueCollection(Payload);
                foreach (var kvp in serializedValues)
                {
                    values.Add(kvp.Key, StringConversionServices.DeserializeValueString(kvp.Value));
                }

                newData.SetValues(values);
            }

            helper.ObjectToBindings(newData, Bindings);

            GeneratedTypesHelper.SetNewIdFieldValue(newData);

            Bindings.Add("NewData", newData);
        }

        private void step1CodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var helper = GetDataTypeDescriptorFormsHelper();

            if (!BindingExist("DataAdded"))
            {
                helper.LayoutLabel = helper.DataTypeDescriptor.Name;
            }

            var newData = GetBinding<IData>("NewData");

            DeliverFormData(
                    _typeName,
                    StandardUiContainerTypes.Document,
                    helper.GetForm(),
                    Bindings,
                    helper.GetBindingsValidationRules(newData)
                );
        }

        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var justAdded = false;

            var isValid = ValidateBindings();
            var helper = GetDataTypeDescriptorFormsHelper();

            var newData = GetBinding<IData>("NewData");
            if (!BindAndValidate(helper, newData))
            {
                isValid = false;
            }

            if (isValid)
            {
                if (!BindingExist("DataAdded"))
                {
                    newData = DataFacade.AddNew(newData);
                    justAdded = true;

                    AcquireLock(newData.GetDataEntityToken());

                    UpdateBinding("NewData", newData);
                    Bindings.Add("DataAdded", true);

                    PublishControlledHelper.PublishIfNeeded(newData, _doPublish, Bindings, ShowMessage);

                    var specificTreeRefresher = CreateParentTreeRefresher();
                    specificTreeRefresher.PostRefreshMesseges(EntityToken);
                }
                else
                {
                    var updateTreeRefresher = CreateUpdateTreeRefresher(EntityToken);

                    DataFacade.Update(newData);
                    EntityTokenCacheFacade.ClearCache(newData.GetDataEntityToken());

                    var published = PublishControlledHelper.PublishIfNeeded(newData, _doPublish, Bindings, ShowMessage);
                    if (!published)
                    {
                        updateTreeRefresher.PostRefreshMesseges(EntityToken);
                    }
                }
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

        private void setEnablePublishCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            _doPublish = true;
        }
    }
}
