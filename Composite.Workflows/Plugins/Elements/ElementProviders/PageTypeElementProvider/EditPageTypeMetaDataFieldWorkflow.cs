using System;
using System.Collections.Generic;
using System.Workflow.Activities;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Types;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.PageTypeElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditPageTypeMetaDataFieldWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EditPageTypeMetaDataFieldWorkflow()
        {
            InitializeComponent();
        }



        private void ValidateTypeExistence(object sender, ConditionalEventArgs e)
        {
            e.Result = true;

            IPageTypeMetaDataTypeLink pageTypeMetaDataTypeLink = this.GetDataItemFromEntityToken<IPageTypeMetaDataTypeLink>();

            DataTypeDescriptor dataTypeDescriptor;
            if (DynamicTypeManager.TryGetDataTypeDescriptor(pageTypeMetaDataTypeLink.DataTypeId, out dataTypeDescriptor) == false)
            {
                e.Result = false;

                DeleteTreeRefresher deleteTreeRefresher = CreateDeleteTreeRefresher(this.EntityToken);

                DataFacade.Delete<IPageTypeMetaDataTypeLink>(pageTypeMetaDataTypeLink);

                this.ShowMessage(
                    DialogType.Warning,
                    StringResourceSystemFacade.GetString("Composite.Plugins.PageTypeElementProvider", "PageType.EditPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataTypeNotExisting.Title"),
                    StringResourceSystemFacade.GetString("Composite.Plugins.PageTypeElementProvider", "PageType.EditPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataTypeNotExisting.Message"));

                deleteTreeRefresher.PostRefreshMesseges();                
            }            
        }



        private void initializeCodeActivity_UpdateBindings_ExecuteCode(object sender, EventArgs e)
        {
            IPageTypeMetaDataTypeLink pageTypeMetaDataTypeLink = this.GetDataItemFromEntityToken<IPageTypeMetaDataTypeLink>();

            IPageMetaDataDefinition pageMetaDataDefinition = PageMetaDataFacade.GetMetaDataDefinition(pageTypeMetaDataTypeLink.PageTypeId, pageTypeMetaDataTypeLink.Name);

            //this.UpdateBinding("CompositionDescriptionName", compositionDescription.Name);
            this.UpdateBinding("CompositionDescriptionLabel", pageMetaDataDefinition.Label);

            ICompositionContainer metaDataContainer = PageMetaDataFacade.GetMetaDataContainerByDefinitionName(pageTypeMetaDataTypeLink.Name);

            List<KeyValuePair<Guid, string>> metaDataContainerOptions = PageMetaDataFacade.GetAllMetaDataContainers();

            this.Bindings.Add("MetaDataContainerOptions", metaDataContainerOptions);
            this.Bindings.Add("CompositionContainerId", metaDataContainer.Id);
        }



        private void ValidateBindings(object sender, ConditionalEventArgs e)
        {
            IPageTypeMetaDataTypeLink pageTypeMetaDataTypeLink = this.GetDataItemFromEntityToken<IPageTypeMetaDataTypeLink>();

            IPageMetaDataDefinition pageMetaDataDefinition = PageMetaDataFacade.GetMetaDataDefinition(pageTypeMetaDataTypeLink.PageTypeId, pageTypeMetaDataTypeLink.Name);

            string metaDataDescriptionLabel = this.GetBinding<string>("CompositionDescriptionLabel");
            Guid containerId = this.GetBinding<Guid>("CompositionContainerId");

            e.Result = true;

            if (pageMetaDataDefinition.Label != metaDataDescriptionLabel)
            {
                if (PageMetaDataFacade.IsDefinitionAllowed(pageTypeMetaDataTypeLink.PageTypeId, pageMetaDataDefinition.Name, metaDataDescriptionLabel, pageMetaDataDefinition.MetaDataTypeId) == false)
                {
                    this.ShowFieldMessage("CompositionDescriptionLabel", "${Composite.Plugins.PageTypeElementProvider, PageType.EditPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataFieldNameAlreadyUsed}");
                    SetSaveStatus(false);
                    e.Result = false;
                }
            }

            if (pageMetaDataDefinition.MetaDataContainerId != containerId)
            {
                if (PageMetaDataFacade.IsNewContainerIdAllowed(pageTypeMetaDataTypeLink.PageTypeId, pageMetaDataDefinition.Name, containerId) == false)
                {
                    this.ShowFieldMessage("CompositionContainerId", "${Composite.Plugins.PageTypeElementProvider, PageType.EditPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataContainerChangeNotAllowed}");
                    SetSaveStatus(false);
                    e.Result = false;
                }
            }
        }



        private void saveCodeActivity_Save_ExecuteCode(object sender, EventArgs e)
        {
            IPageTypeMetaDataTypeLink pageTypeMetaDataTypeLink = this.GetDataItemFromEntityToken<IPageTypeMetaDataTypeLink>();
            string metaDataDescriptionLabel = this.GetBinding<string>("CompositionDescriptionLabel");
            Guid containerId = this.GetBinding<Guid>("CompositionContainerId");

            PageMetaDataFacade.UpdateDefinition(pageTypeMetaDataTypeLink.PageTypeId, pageTypeMetaDataTypeLink.Name, metaDataDescriptionLabel, containerId);

            SetSaveStatus(true);
            this.RefreshCurrentEntityToken();
        }
    }
}
