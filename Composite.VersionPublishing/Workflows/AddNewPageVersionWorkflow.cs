using System;
using System.Linq;
using System.Workflow.Activities;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Workflow;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Plugins.Elements.ElementProviders.PageElementProvider;


namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewPageVersionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static class BindingNames
        {
            public const string Page = nameof(Page);
            public const string VersionName = Page + "." + nameof(ITimedPublishing.VersionName);
            public const string PublishTime = Page + "." + nameof(ITimedPublishing.PublishTime);
            public const string UnpublishTime = Page + "." + nameof(ITimedPublishing.UnpublishTime);
        }

        private IPage CurrentPage => (IPage)Bindings[BindingNames.Page];

        public AddNewPageVersionWorkflow()
        {
            InitializeComponent();
        }



        private void initializeAddNewfolderCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            using (var conn = new DataConnection())
            {
                var page = (IPage)((DataEntityToken)EntityToken).Data;

                var newPage = conn.CreateNew<IPage>();
                newPage.Id = page.Id;
                newPage.TemplateId = page.TemplateId;
                newPage.PageTypeId = page.PageTypeId;
                newPage.Title = page.Title;
                newPage.MenuTitle = page.MenuTitle;
                newPage.UrlTitle = page.UrlTitle;
                newPage.FriendlyUrl = page.FriendlyUrl;
                newPage.PublicationStatus = GenericPublishProcessController.Draft;
                newPage.Description = page.Description;

                newPage.VersionId = Guid.NewGuid();
                newPage.VersionName = null;
                newPage.PublishTime = null;
                newPage.UnpublishTime = null;

                Bindings[BindingNames.Page] = newPage;
            }
        }


        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var newPage = CurrentPage;

            using (var conn = new DataConnection())
            {
                newPage = conn.Add(newPage);
                
                // TODO: update nameless version
                // TODO: copy the placeholder contents
            }

            RefreshParentEntityToken();

            ExecuteWorklow(newPage.GetDataEntityToken(), typeof(EditPageWorkflow));
        }

        private void ValidateInputs(object sender, ConditionalEventArgs e)
        {
            e.Result = true;

            var newPage = CurrentPage;
            string versionName = newPage.VersionName;

            if (string.IsNullOrEmpty(versionName))
            {
                e.Result = false;
                // TODO: localize
                ShowFieldMessage(BindingNames.VersionName, "This field is required"); 
            }
            else
            {
                using (var conn = new DataConnection())
                {
                    Guid pageId = newPage.Id;

                    var pageVersions = conn.Get<IPage>().Where(p => p.Id == pageId).ToList();
                    if (pageVersions.Any(p => p.VersionName.Equals(newPage.VersionName, StringComparison.InvariantCultureIgnoreCase)))
                    {
                        e.Result = false;
                        // TODO: localize
                        ShowFieldMessage(BindingNames.VersionName, "A version with this name already exists");
                    }
                }
            }

            if (newPage.UnpublishTime != null && newPage.UnpublishTime < DateTime.Now)
            {
                e.Result = false;
                // TODO: localize
                ShowFieldMessage(BindingNames.UnpublishTime, "The date cannot be set in the past");
            }

            if (newPage.PublishTime != null && newPage.PublishTime < DateTime.Now)
            {
                e.Result = false;
                // TODO: localize
                ShowFieldMessage(BindingNames.PublishTime, "The date cannot be set in the past");
            }

            if (newPage.PublishTime != null 
                && newPage.UnpublishTime != null
                && newPage.PublishTime > newPage.UnpublishTime)
            {
                e.Result = false;
                // TODO: localize
                ShowFieldMessage(BindingNames.UnpublishTime, "The unpublicaton time should appear later than publication time");
            }
        }
    }
}