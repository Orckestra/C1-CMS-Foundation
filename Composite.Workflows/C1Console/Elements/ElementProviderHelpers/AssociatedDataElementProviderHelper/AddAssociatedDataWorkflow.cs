using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;

using Composite.C1Console.Actions;
using Composite.C1Console.Scheduling;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Activities;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;

namespace Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    /// <summary>
    /// This is used when adding data to a page folder
    /// </summary>
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddAssociatedDataWorkflow : FormsWorkflow
    {
        [NonSerialized]
        private bool _doPublish;

        private static class BindingNames
        {
            public const string PageId = nameof(PageId);
        }

        public AddAssociatedDataWorkflow()
        {
            InitializeComponent();
        }

        private void IsDataTypeDescriptorNullTest(object sender, ConditionalEventArgs e)
        {
            e.Result = !BindingExist("DataTypeDescriptor");
        }

        private void initialCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var entityToken = EntityToken as AssociatedDataElementProviderHelperEntityToken;

            if (!string.IsNullOrEmpty(entityToken?.Payload))
            {
                var type = TypeManager.GetType(entityToken.Payload);
                var id = type.GetImmutableTypeId();
                var dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(id);
                UpdateBinding("DataTypeDescriptor", dataTypeDescriptor);

                UpdateBinding(BindingNames.PageId, new Guid(entityToken.Id));

                if (!PermissionsFacade.GetPermissionsForCurrentUser(EntityToken).Contains(PermissionType.Publish) || !typeof(IPublishControlled).IsAssignableFrom(type))
                {
                    var formData = WorkflowFacade.GetFormData(InstanceId, true);

                    if (formData.ExcludedEvents == null)
                        formData.ExcludedEvents = new List<string>();

                    formData.ExcludedEvents.Add("SaveAndPublish");
                }
            }
        }

        private void selectTypeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var types = PageFolderFacade.GetAllFolderTypes().ToList();

            Bindings.Add("Types", types);
            Bindings.Add("SelectedType", types[0]);
        }

        private void selectTypeCodeActivity_Next_ExecuteCode(object sender, EventArgs e)
        {
            var type = GetBinding<Type>("SelectedType");

            var dataEntityToken = (DataEntityToken)EntityToken;

            var parentInterfaceType = dataEntityToken.Data.DataSourceId.InterfaceType;
            var id = parentInterfaceType.GetKeyProperties()[0].GetValue(dataEntityToken.Data, null);
            var idString = ValueTypeConverter.Convert<string>(id);

            var entityToken = new AssociatedDataElementProviderHelperEntityToken(
                                TypeManager.SerializeType(parentInterfaceType),
                                EntityToken.Source,
                                idString,
                                TypeManager.SerializeType(type)
                            );

            ExecuteWorklow(entityToken, typeof(AddAssociatedDataWorkflow));

            var dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type.GetImmutableTypeId());
            UpdateBinding("DataTypeDescriptor", dataTypeDescriptor);
        }

        private void enterDataCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var dataTypeDescriptor = GetBinding<DataTypeDescriptor>("DataTypeDescriptor");

            var type = TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);

            Guid pageId = GetBinding<Guid>(BindingNames.PageId);

            var helper = new DataTypeDescriptorFormsHelper(dataTypeDescriptor, true, null)
            {
                LayoutIconHandle = "associated-data-add"
            };

            var generatedTypesHelper = new GeneratedTypesHelper(dataTypeDescriptor);
            helper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);

            IData newData;
            if (!BindingExist("NewData"))
            {
                newData = DataFacade.BuildNew(type);

                PageFolderFacade.AssignFolderDataSpecificValues(newData, pageId);

                var publishControlled = newData as IPublishControlled;
                if (publishControlled != null)
                {
                    publishControlled.PublicationStatus = GenericPublishProcessController.Draft;
                }

                var localizedData = newData as ILocalizedControlled;
                if (localizedData != null)
                {
                    var cultureInfo = UserSettings.ActiveLocaleCultureInfo ?? DataLocalizationFacade.DefaultLocalizationCulture;
                    localizedData.SourceCultureName = cultureInfo.Name;
                }

                Bindings.Add("NewData", newData);

                helper.UpdateWithNewBindings(Bindings);
                helper.ObjectToBindings(newData, Bindings);
            }
            else
            {
                newData = GetBinding<IData>("NewData");
            }

            DeliverFormData(
                    type.Name,
                    StandardUiContainerTypes.Document,
                    helper.GetForm(),
                    Bindings,
                    helper.GetBindingsValidationRules(newData)
                );
        }

        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var dataTypeDescriptor = GetBinding<DataTypeDescriptor>("DataTypeDescriptor");

            var newData = GetBinding<IData>("NewData");

            var helper = new DataTypeDescriptorFormsHelper(dataTypeDescriptor, true, newData.GetDataEntityToken());

            var generatedTypesHelper = new GeneratedTypesHelper(dataTypeDescriptor);
            helper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);


            var isValid = ValidateBindings();

            if (!BindAndValidate(helper, newData))
            {
                isValid = false;
            }

            var justAdded = false;
            if (isValid)
            {
                var published = false;

                if (!BindingExist("DataAdded"))
                {
                    var dataScopeIdentifier = DataScopeIdentifier.Public;
                    if (dataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)))
                    {
                        dataScopeIdentifier = DataScopeIdentifier.Administrated;
                    }

                    using (new DataScope(dataScopeIdentifier))
                    {
                        newData = DataFacade.AddNew(newData);

                        justAdded = true;
                    }

                    PublishControlledHelper.PublishIfNeeded(newData, _doPublish, Bindings, ShowMessage);

                    AcquireLock(newData.GetDataEntityToken());

                    UpdateBinding("NewData", newData);
                    Bindings.Add("DataAdded", true);
                }
                else
                {
                    var publishedControlled = newData as IPublishControlled;
                    if (publishedControlled != null)
                    {
                        var refreshedData = (IPublishControlled)DataFacade.GetDataFromDataSourceId(newData.DataSourceId);
                        if (refreshedData != null && refreshedData.PublicationStatus == GenericPublishProcessController.Published)
                        {
                            refreshedData.PublicationStatus = GenericPublishProcessController.Draft;

                            DataFacade.Update(refreshedData);
                        }
                    }

                    DataFacade.Update(newData);

                    published = PublishControlledHelper.PublishIfNeeded(newData, _doPublish, Bindings, ShowMessage);

                    EntityTokenCacheFacade.ClearCache(newData.GetDataEntityToken());
                }

                if (!published)
                {
                    var specificTreeRefresher = CreateParentTreeRefresher();
                    specificTreeRefresher.PostRefreshMesseges(EntityToken);
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

        private void enablePublishCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            _doPublish = true;
        }
    }
}
