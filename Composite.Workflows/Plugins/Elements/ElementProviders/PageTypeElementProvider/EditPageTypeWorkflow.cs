using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Workflow.Activities;
using Composite.Core.PageTemplates;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Linq;
using Composite.Core.ResourceSystem;
using Composite.Data.Transactions;
using Composite.C1Console.Trees;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.PageTypeElementProvider
{
    [EntityTokenLock]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditPageTypeWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EditPageTypeWorkflow()
        {
            InitializeComponent();
        }



        private void CleanDeadLinks(Guid pageTypeId)
        {
            IEnumerable<IPageTypeMetaDataTypeLink> pageTypeMetaDataTypeLinks =
                DataFacade.GetData<IPageTypeMetaDataTypeLink>().
                Where(f => f.PageTypeId == pageTypeId).
                Evaluate().
                RemoveDeadLinks();

            IEnumerable<IPageTypeDataFolderTypeLink> pageTypeDataFolderTypeLinks =
                DataFacade.GetData<IPageTypeDataFolderTypeLink>().
                Where(f => f.PageTypeId == pageTypeId).
                Evaluate().
                RemoveDeadLinks();


            IEnumerable<IPageTypeTreeLink> pageTypeTreeLinks =
                DataFacade.GetData<IPageTypeTreeLink>().
                Where(f => f.PageTypeId == pageTypeId).
                Evaluate().
                RemoveDeadLinks();
        }



        private void initializeCodeActivity_UpdateBindings_ExecuteCode(object sender, EventArgs e)
        {
            IPageType pageType = (IPageType)((DataEntityToken)this.EntityToken).Data;

            CleanDeadLinks(pageType.Id);

            this.Bindings.Add("PageType", pageType);

            List<KeyValuePair<Guid, string>> pageTypes =
                DataFacade.GetData<IPageType>().
                OrderBy(f => f.Name).
                ToList(f => new KeyValuePair<Guid, string>(f.Id, f.Name));

            List<KeyValuePair<Guid, string>> defaultPageTypeOptions = new List<KeyValuePair<Guid, string>>();
            defaultPageTypeOptions.Add(new KeyValuePair<Guid, string>(Guid.Empty, StringResourceSystemFacade.GetString("Composite.Plugins.PageTypeElementProvider", "PageType.EditPageTypeWorkflow.DefaultChildPageTypeKeySelector.NoneSelectedLabel")));
            defaultPageTypeOptions.AddRange(pageTypes);

            this.Bindings.Add("DefaultChildPageTypeOptions", defaultPageTypeOptions);

                


            this.Bindings.Add("HomepageRelationOptions", new List<KeyValuePair<string, string>> { 
               new KeyValuePair<string, string>(PageTypeHomepageRelation.NoRestriction.ToPageTypeHomepageRelationString(), StringResourceSystemFacade.GetString("Composite.Plugins.PageTypeElementProvider", string.Format("PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.{0}Label", PageTypeHomepageRelation.NoRestriction))),
               new KeyValuePair<string, string>(PageTypeHomepageRelation.OnlyHomePages.ToPageTypeHomepageRelationString(), StringResourceSystemFacade.GetString("Composite.Plugins.PageTypeElementProvider", string.Format("PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.{0}Label", PageTypeHomepageRelation.OnlyHomePages))),
               new KeyValuePair<string, string>(PageTypeHomepageRelation.OnlySubPages.ToPageTypeHomepageRelationString(), StringResourceSystemFacade.GetString("Composite.Plugins.PageTypeElementProvider", string.Format("PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.{0}Label", PageTypeHomepageRelation.OnlySubPages))),
            });


            List<KeyValuePair<Guid, string>> pageTemplates =
                PageTemplateFacade.GetPageTemplates().
                OrderBy(f => f.Title).
                ToList(f => new KeyValuePair<Guid, string>(f.Id, f.Title));

            List<KeyValuePair<Guid, string>> defaultPageTempatesOptions = new List<KeyValuePair<Guid, string>>();
            defaultPageTempatesOptions.Add(new KeyValuePair<Guid, string>(Guid.Empty, StringResourceSystemFacade.GetString("Composite.Plugins.PageTypeElementProvider", "PageType.EditPageTypeWorkflow.DefaultPageTemplateKeySelector.NoneSelectedLabel")));
            defaultPageTempatesOptions.AddRange(pageTemplates);

            this.Bindings.Add("DefaultTemplateOptions", defaultPageTempatesOptions);


            this.Bindings.Add("TemplateRestrictionOptions", pageTemplates);


            List<Guid> selectedPageTemplateIds =
                DataFacade.GetData<IPageTypePageTemplateRestriction>().
                Where(f => f.PageTypeId == pageType.Id).
                Select(f => f.PageTemplateId).
                ToList();

            this.Bindings.Add("TemplateRestrictionSelected", selectedPageTemplateIds);
         
   
            List<KeyValuePair<Guid, string>> parentRestrictingPageTypes = 
                DataFacade.GetData<IPageType>().              
                OrderBy(f => f.Name).
                ToList(f => new KeyValuePair<Guid, string>(f.Id, f.Name));

            this.Bindings.Add("PageTypeChildRestrictionOptions", parentRestrictingPageTypes);


            List<Guid> selectedPageTypeParentRestrictions =
                DataFacade.GetData<IPageTypeParentRestriction>().
                Where(f => f.PageTypeId == pageType.Id).
                Select(f => f.AllowedParentPageTypeId).
                ToList();

            this.Bindings.Add("PageTypeChildRestrictionSelected", selectedPageTypeParentRestrictions);

            
            List<KeyValuePair<Guid, string>> dataFolderTypes = 
                PageFolderFacade.GetAllFolderTypes().                
                OrderBy(f => f.FullName).
                ToList(f => new KeyValuePair<Guid, string>(f.GetImmutableTypeId(), f.GetTypeTitle()));

            this.Bindings.Add("DataFolderOptions", dataFolderTypes);


            List<Guid> selectedDataFolderTypes =
                DataFacade.GetData<IPageTypeDataFolderTypeLink>().
                Where(f => f.PageTypeId == pageType.Id).
                Select(f => f.DataTypeId).
                ToList();

            this.Bindings.Add("DataFolderSelected", selectedDataFolderTypes);
            

            List<KeyValuePair<string, string>> applications =
                TreeFacade.AllTrees.
                Where(f => string.IsNullOrEmpty(f.AllowedAttachmentApplicationName) == false).
                OrderBy(f => f.TreeId).
                ToList(f => new KeyValuePair<string, string>(f.TreeId, f.AllowedAttachmentApplicationName));

            this.Bindings.Add("ApplicationOptions", applications);


            List<string> selectedApplications =
                DataFacade.GetData<IPageTypeTreeLink>().
                Where(f => f.PageTypeId == pageType.Id).
                Select(f => f.TreeId).
                ToList();

            this.Bindings.Add("ApplicationSelected", selectedApplications);           
        }



        private void editCodeActivity_ValidateBindings(object sender, ConditionalEventArgs e)
        {
            IPageType pageType = (IPageType)((DataEntityToken)this.EntityToken).Data;
            List<Guid> selectedPageTemplateIds = this.GetBinding<List<Guid>>("TemplateRestrictionSelected");
            List<Guid> selectedPageTypeParentRestrictions = this.GetBinding<List<Guid>>("PageTypeChildRestrictionSelected");

            if ((pageType.DefaultTemplateId != Guid.Empty) && (selectedPageTemplateIds.Count > 0) && (selectedPageTemplateIds.Contains(pageType.DefaultTemplateId) == false))
            {
                this.ShowFieldMessage("DefaultTemplateSelected", "${Composite.Plugins.PageTypeElementProvider, PageType.EditPageTypeWorkflow.ValidationError.DefaultTemplateNotInRestrictions}");
                SetSaveStatus(false);
                e.Result = false;
                return;
            }

            if ((pageType.HomepageRelation == PageTypeHomepageRelation.OnlyHomePages.ToPageTypeHomepageRelationString()) && (selectedPageTypeParentRestrictions.Count > 0))
            {
                this.ShowFieldMessage("PageType.HomepageRelation", "${Composite.Plugins.PageTypeElementProvider, PageType.EditPageTypeWorkflow.ValidationError.HomepageRelationConflictsWithParentRestrictions}");
                SetSaveStatus(false);
                e.Result = false;
                return;
            }

            e.Result = true;
        }



        private void saveCodeActivity_Save_ExecuteCode(object sender, EventArgs e)
        {
            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                ConditionalEventArgs args = new ConditionalEventArgs();
                editCodeActivity_ValidateBindings(this, args);
                if (args.Result == false) return;

                IPageType pageType = this.GetBinding<IPageType>("PageType");

                UpdatePageTemplateResctrictions(pageType);
                UpdatePageTypeParentResctrictions(pageType);
                UpdatePageTypeDataFolderTypeLinks(pageType);
                UpdatePageTypeTreeLinks(pageType);

                DataFacade.Update(pageType);

                transactionScope.Complete();
            }

            SetSaveStatus(true);
        }



        private void UpdatePageTemplateResctrictions(IPageType pageType)
        {
            List<Guid> selectedPageTemplateIds = this.GetBinding<List<Guid>>("TemplateRestrictionSelected");

            IEnumerable<IPageTypePageTemplateRestriction> pageTypePageTemplateRestrictions = DataFacade.GetData<IPageTypePageTemplateRestriction>().Where(f => f.PageTypeId == pageType.Id).Evaluate();

            // Remove deselected
            foreach (IPageTypePageTemplateRestriction restriction in pageTypePageTemplateRestrictions)
            {
                if (selectedPageTemplateIds.Contains(restriction.PageTemplateId) == false)
                {
                    DataFacade.Delete<IPageTypePageTemplateRestriction>(restriction);
                }
            }

            // Add newly selected
            foreach (Guid templateId in selectedPageTemplateIds)
            {
                if (pageTypePageTemplateRestrictions.Where(f => f.PageTemplateId == templateId).Any() == false)
                {
                    IPageTypePageTemplateRestriction pageTypePageTemplateRestriction = DataFacade.BuildNew<IPageTypePageTemplateRestriction>();
                    pageTypePageTemplateRestriction.Id = Guid.NewGuid();
                    pageTypePageTemplateRestriction.PageTypeId = pageType.Id;
                    pageTypePageTemplateRestriction.PageTemplateId = templateId;

                    DataFacade.AddNew<IPageTypePageTemplateRestriction>(pageTypePageTemplateRestriction);
                }
            }
        }



        private void UpdatePageTypeParentResctrictions(IPageType pageType)
        {
            List<Guid> selectedPageTypeParentRestrictions = this.GetBinding<List<Guid>>("PageTypeChildRestrictionSelected");

            IEnumerable<IPageTypeParentRestriction> pageTypeParentRestrictions = DataFacade.GetData<IPageTypeParentRestriction>().Where(f => f.PageTypeId == pageType.Id).Evaluate();

            // Remove deselected
            foreach (IPageTypeParentRestriction restriction in pageTypeParentRestrictions)
            {
                if (selectedPageTypeParentRestrictions.Contains(restriction.AllowedParentPageTypeId) == false)
                {
                    DataFacade.Delete<IPageTypeParentRestriction>(restriction);
                }
            }

            // Add newly selected
            foreach (Guid templateId in selectedPageTypeParentRestrictions)
            {
                if (pageTypeParentRestrictions.Where(f => f.AllowedParentPageTypeId == templateId).Any() == false)
                {
                    IPageTypeParentRestriction pageTypeParentRestriction = DataFacade.BuildNew<IPageTypeParentRestriction>();
                    pageTypeParentRestriction.Id = Guid.NewGuid();
                    pageTypeParentRestriction.PageTypeId = pageType.Id;
                    pageTypeParentRestriction.AllowedParentPageTypeId = templateId;

                    DataFacade.AddNew<IPageTypeParentRestriction>(pageTypeParentRestriction);
                }
            }
        }



        private void UpdatePageTypeDataFolderTypeLinks(IPageType pageType)
        {
            List<Guid> selectedDataFolderTypeIds = this.GetBinding<List<Guid>>("DataFolderSelected");

            IEnumerable<IPageTypeDataFolderTypeLink> pageTypeDateFolderTypeLinks = DataFacade.GetData<IPageTypeDataFolderTypeLink>().Where(f => f.PageTypeId == pageType.Id).Evaluate();

            // Remove deselected
            foreach (IPageTypeDataFolderTypeLink dataFolderTypeLink in pageTypeDateFolderTypeLinks)
            {
                if (selectedDataFolderTypeIds.Contains(dataFolderTypeLink.DataTypeId) == false)
                {
                    DataFacade.Delete<IPageTypeDataFolderTypeLink>(dataFolderTypeLink);
                }
            }

            // Add newly selected
            foreach (Guid dataFolderTypeId in selectedDataFolderTypeIds)
            {
                if (pageTypeDateFolderTypeLinks.Where(f => f.DataTypeId == dataFolderTypeId).Any() == false)
                {
                    IPageTypeDataFolderTypeLink pageTypeDateFolderTypeLink = DataFacade.BuildNew<IPageTypeDataFolderTypeLink>();
                    pageTypeDateFolderTypeLink.Id = Guid.NewGuid();
                    pageTypeDateFolderTypeLink.PageTypeId = pageType.Id;
                    pageTypeDateFolderTypeLink.DataTypeId = dataFolderTypeId;

                    DataFacade.AddNew<IPageTypeDataFolderTypeLink>(pageTypeDateFolderTypeLink);
                }
            }
        }



        private void UpdatePageTypeTreeLinks(IPageType pageType)
        {
            List<string> selectedTreeIds = this.GetBinding<List<string>>("ApplicationSelected");

            IEnumerable<IPageTypeTreeLink> pageTypeTreeLinks = DataFacade.GetData<IPageTypeTreeLink>().Where(f => f.PageTypeId == pageType.Id).Evaluate();

            // Remove deselected
            foreach (IPageTypeTreeLink treeLink in pageTypeTreeLinks)
            {
                if (selectedTreeIds.Contains(treeLink.TreeId) == false)
                {
                    DataFacade.Delete<IPageTypeTreeLink>(treeLink);                        
                }
            }

            // Add newly selected
            foreach (string treeId in selectedTreeIds)
            {
                if (pageTypeTreeLinks.Where(f => f.TreeId == treeId).Any() == false)
                {
                    IPageTypeTreeLink pageTypeTreeLink = DataFacade.BuildNew<IPageTypeTreeLink>();
                    pageTypeTreeLink.Id = Guid.NewGuid();
                    pageTypeTreeLink.PageTypeId = pageType.Id;
                    pageTypeTreeLink.TreeId = treeId;

                    DataFacade.AddNew<IPageTypeTreeLink>(pageTypeTreeLink);
                }
            }
        }        
    }
}
