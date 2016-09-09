using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using Composite.Core.PageTemplates;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Linq;
using Composite.Core.ResourceSystem;
using Composite.Data.Transactions;
using Composite.C1Console.Trees;
using Composite.C1Console.Workflow;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_PageTypeElementProvider;

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
            DataFacade.GetData<IPageTypeMetaDataTypeLink>()
                .Where(f => f.PageTypeId == pageTypeId)
                .Evaluate()
                .RemoveDeadLinks();

            DataFacade.GetData<IPageTypeDataFolderTypeLink>()
                .Where(f => f.PageTypeId == pageTypeId)
                .Evaluate()
                .RemoveDeadLinks();

            DataFacade.GetData<IPageTypeTreeLink>()
                .Where(f => f.PageTypeId == pageTypeId)
                .Evaluate()
                .RemoveDeadLinks();
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

            var defaultPageTypeOptions = new List<KeyValuePair<Guid, string>>
            {
                new KeyValuePair<Guid, string>(Guid.Empty,
                   Texts.PageType_EditPageTypeWorkflow_DefaultChildPageTypeKeySelector_NoneSelectedLabel)
            };

            defaultPageTypeOptions.AddRange(pageTypes);

            this.Bindings.Add("DefaultChildPageTypeOptions", defaultPageTypeOptions);


            Func<PageTypeHomepageRelation, KeyValuePair<string, string> > getOption =
                relation =>
                    new KeyValuePair<string, string>(
                        relation.ToString(),
                        GetText($"PageType.EditPageTypeWorkflow.HomepageRelationKeySelector.{relation}Label"));

            this.Bindings.Add("HomepageRelationOptions", new List<KeyValuePair<string, string>> {
               getOption(PageTypeHomepageRelation.NoRestriction),
               getOption(PageTypeHomepageRelation.OnlyHomePages),
               getOption(PageTypeHomepageRelation.OnlySubPages),
            });


            List<KeyValuePair<Guid, string>> pageTemplates =
                PageTemplateFacade.GetPageTemplates().
                OrderBy(f => f.Title).
                ToList(f => new KeyValuePair<Guid, string>(f.Id, f.Title));

            var defaultPageTemplateOptions = new List<KeyValuePair<Guid, string>>
            {
                new KeyValuePair<Guid, string>(Guid.Empty,
                    Texts.PageType_EditPageTypeWorkflow_DefaultPageTemplateKeySelector_NoneSelectedLabel)
            };
            defaultPageTemplateOptions.AddRange(pageTemplates);

            this.Bindings.Add("DefaultTemplateOptions", defaultPageTemplateOptions);


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
                Where(f => !string.IsNullOrEmpty(f.AllowedAttachmentApplicationName)).
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

            if (pageType.DefaultTemplateId != Guid.Empty 
                && selectedPageTemplateIds.Count > 0 
                && !selectedPageTemplateIds.Contains(pageType.DefaultTemplateId))
            {
                this.ShowFieldMessage("DefaultTemplateSelected", Texts.PageType_EditPageTypeWorkflow_ValidationError_DefaultTemplateNotInRestrictions);
                SetSaveStatus(false);
                e.Result = false;
                return;
            }

            if (pageType.HomepageRelation == nameof(PageTypeHomepageRelation.OnlyHomePages) 
                && selectedPageTypeParentRestrictions.Count > 0)
            {
                this.ShowFieldMessage("PageType.HomepageRelation", Texts.PageType_EditPageTypeWorkflow_ValidationError_HomepageRelationConflictsWithParentRestrictions);
                SetSaveStatus(false);
                e.Result = false;
                return;
            }

            e.Result = true;
        }



        private void saveCodeActivity_Save_ExecuteCode(object sender, EventArgs e)
        {
            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                var args = new ConditionalEventArgs();
                editCodeActivity_ValidateBindings(this, args);
                if (!args.Result) return;

                IPageType pageType = this.GetBinding<IPageType>("PageType");

                UpdatePageTemplateResctrictions(pageType);
                UpdatePageTypeParentResctrictions(pageType);
                UpdatePageTypeDataFolderTypeLinks(pageType);
                UpdatePageTypeTreeLinks(pageType);

                DataFacade.Update(pageType);

                transactionScope.Complete();
            }

            this.RefreshParentEntityToken();

            SetSaveStatus(true);
        }



        private void UpdatePageTemplateResctrictions(IPageType pageType)
        {
            List<Guid> selectedPageTemplateIds = this.GetBinding<List<Guid>>("TemplateRestrictionSelected");

            var pageTypePageTemplateRestrictions = DataFacade.GetData<IPageTypePageTemplateRestriction>()
                .Where(f => f.PageTypeId == pageType.Id).Evaluate();

            // Remove deselected
            foreach (IPageTypePageTemplateRestriction restriction in pageTypePageTemplateRestrictions)
            {
                if (!selectedPageTemplateIds.Contains(restriction.PageTemplateId))
                {
                    DataFacade.Delete(restriction);
                }
            }

            // Add newly selected
            foreach (Guid templateId in selectedPageTemplateIds)
            {
                if (!pageTypePageTemplateRestrictions.Any(f => f.PageTemplateId == templateId))
                {
                    var pageTypePageTemplateRestriction = DataFacade.BuildNew<IPageTypePageTemplateRestriction>();
                    pageTypePageTemplateRestriction.Id = Guid.NewGuid();
                    pageTypePageTemplateRestriction.PageTypeId = pageType.Id;
                    pageTypePageTemplateRestriction.PageTemplateId = templateId;

                    DataFacade.AddNew(pageTypePageTemplateRestriction);
                }
            }
        }



        private void UpdatePageTypeParentResctrictions(IPageType pageType)
        {
            List<Guid> selectedPageTypeParentRestrictions = this.GetBinding<List<Guid>>("PageTypeChildRestrictionSelected");

            var pageTypeParentRestrictions = DataFacade.GetData<IPageTypeParentRestriction>()
                .Where(f => f.PageTypeId == pageType.Id).Evaluate();

            // Remove deselected
            foreach (IPageTypeParentRestriction restriction in pageTypeParentRestrictions)
            {
                if (!selectedPageTypeParentRestrictions.Contains(restriction.AllowedParentPageTypeId))
                {
                    DataFacade.Delete(restriction);
                }
            }

            // Add newly selected
            foreach (Guid templateId in selectedPageTypeParentRestrictions)
            {
                if (!pageTypeParentRestrictions.Any(f => f.AllowedParentPageTypeId == templateId))
                {
                    var pageTypeParentRestriction = DataFacade.BuildNew<IPageTypeParentRestriction>();
                    pageTypeParentRestriction.Id = Guid.NewGuid();
                    pageTypeParentRestriction.PageTypeId = pageType.Id;
                    pageTypeParentRestriction.AllowedParentPageTypeId = templateId;

                    DataFacade.AddNew(pageTypeParentRestriction);
                }
            }
        }



        private void UpdatePageTypeDataFolderTypeLinks(IPageType pageType)
        {
            List<Guid> selectedDataFolderTypeIds = this.GetBinding<List<Guid>>("DataFolderSelected");

            var pageTypeDateFolderTypeLinks = DataFacade.GetData<IPageTypeDataFolderTypeLink>()
                .Where(f => f.PageTypeId == pageType.Id).Evaluate();

            // Remove deselected
            foreach (IPageTypeDataFolderTypeLink dataFolderTypeLink in pageTypeDateFolderTypeLinks)
            {
                if (!selectedDataFolderTypeIds.Contains(dataFolderTypeLink.DataTypeId))
                {
                    DataFacade.Delete(dataFolderTypeLink);
                }
            }

            // Add newly selected
            foreach (Guid dataFolderTypeId in selectedDataFolderTypeIds)
            {
                if (!pageTypeDateFolderTypeLinks.Any(f => f.DataTypeId == dataFolderTypeId))
                {
                    IPageTypeDataFolderTypeLink pageTypeDateFolderTypeLink = DataFacade.BuildNew<IPageTypeDataFolderTypeLink>();
                    pageTypeDateFolderTypeLink.Id = Guid.NewGuid();
                    pageTypeDateFolderTypeLink.PageTypeId = pageType.Id;
                    pageTypeDateFolderTypeLink.DataTypeId = dataFolderTypeId;

                    DataFacade.AddNew(pageTypeDateFolderTypeLink);
                }
            }
        }



        private void UpdatePageTypeTreeLinks(IPageType pageType)
        {
            List<string> selectedTreeIds = this.GetBinding<List<string>>("ApplicationSelected");

            var pageTypeTreeLinks = DataFacade.GetData<IPageTypeTreeLink>()
                .Where(f => f.PageTypeId == pageType.Id).Evaluate();

            // Remove deselected
            foreach (IPageTypeTreeLink treeLink in pageTypeTreeLinks)
            {
                if (!selectedTreeIds.Contains(treeLink.TreeId))
                {
                    DataFacade.Delete<IPageTypeTreeLink>(treeLink);
                }
            }

            // Add newly selected
            foreach (string treeId in selectedTreeIds)
            {
                if (!pageTypeTreeLinks.Any(f => f.TreeId == treeId))
                {
                    IPageTypeTreeLink pageTypeTreeLink = DataFacade.BuildNew<IPageTypeTreeLink>();
                    pageTypeTreeLink.Id = Guid.NewGuid();
                    pageTypeTreeLink.PageTypeId = pageType.Id;
                    pageTypeTreeLink.TreeId = treeId;

                    DataFacade.AddNew<IPageTypeTreeLink>(pageTypeTreeLink);
                }
            }
        }

        private static string GetText(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageTypeElementProvider", key);
        }
    }
}
