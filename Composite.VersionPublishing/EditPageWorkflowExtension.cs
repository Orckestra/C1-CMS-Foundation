using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Activities;
using Composite.Core.IO;
using Composite.Data;
using Composite.Data.Types;
using Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider;
using Composite.Plugins.Elements.ElementProviders.PageElementProvider;

namespace Composite.VersionPublishing
{
    internal class EditPageWorkflowExtension : IFormsWorkflowExtension
    {
        private static readonly Guid AddNewVersionOptionId = new Guid("46e22dca-c772-44e9-b80b-34fd49fd86bf");

        private static class BindingNames
        {
            public const string SelectedPage = "SelectedPage";

            // Custom
            public const string PageVersionId = "PageVersionId";
            public const string PageVersions = "PageVersions";
        }

        const string CustomToolbarMarkupRelativePath =
            "~/Composite/InstalledPackages/content/forms/Composite.VersionPublishing/EditPage.ToolBar.xml";

        const string EditStateActivityName = "editStateActivity";

        public void Initialize(FormsWorkflow workflow)
        {
            if (workflow.GetType() != typeof (EditPageWorkflow))
            {
                return;
            }

            // Creating an EventDrivenActivity to handle version change
            var customEvent02Activity = new CustomEvent02HandleExternalEventActivity
            {
                EventName = "CustomEvent02",
                InterfaceType = typeof (IFormsWorkflowEventService),
                Name = "customEvent02Activity"
            };

            var codeActivity = new CodeActivity();
            var handler = new EventHandlers();
            codeActivity.ExecuteCode += handler.OpenNewEditingWorkflow;

            var versionChange_EventDrivenActivity = new EventDrivenActivity
            {
                Name = "eventDrivenActivity_VersionChange",
                Activities =
                {
                    customEvent02Activity,
                    codeActivity,
                    new SetStateActivity("versionChange_setState")
                    {
                        TargetStateName = EditStateActivityName
                    }
                    //, new CloseCurrentViewActivity()
                }
            };


            var editStateActivity = workflow.Activities.Single(a => a.Name == EditStateActivityName)
                as StateActivity;

            // Detaching "editStateActivity" from the workflow so it can be modified
            workflow.Activities.Remove(editStateActivity);

            editStateActivity.Activities.Add(versionChange_EventDrivenActivity);

            workflow.Activities.Add(editStateActivity);
        }


        public void OnDeliverFormData(FormsWorkflow workflow, OnDeliverFormDataParameters parameters)
        {
            if (workflow.GetType() != typeof(EditPageWorkflow))
            {
                return;
            }

            var editPageWorkflow = workflow as EditPageWorkflow;

            IPage page = editPageWorkflow.Bindings["SelectedPage"] as IPage;
            Guid pageId = page.Id;

            using (var dc = new DataConnection())
            {
                var allPageVersions = dc.Get<IPage>().Where(p => p.Id == pageId).ToList();

                var versions = allPageVersions
                    .Select(v => new KeyValuePair<Guid, string>(v.VersionId, v.VersionName ?? ""))
                    .OrderBy(v => v.Value)
                    .ToList();

                versions.Insert(0, new KeyValuePair<Guid, string>(
                    AddNewVersionOptionId,
                    "Add new version")); // TODO: localize

                parameters.Bindings[BindingNames.PageVersions] = versions;
                parameters.Bindings[BindingNames.PageVersionId] = page.VersionId;
            }

            EmbedToolbarActions(workflow);
        }


        private void EmbedToolbarActions(FormsWorkflow workflow)
        {
            string filePath = PathUtil.Resolve(CustomToolbarMarkupRelativePath);

            string text = C1File.ReadAllText(filePath);

            workflow.SetCustomToolbarDefinition(text);
        }


        [Serializable]
        public class EventHandlers
        {
            public void OpenNewEditingWorkflow(object sender, EventArgs args)
            {
                var workflow = ((CodeActivity) sender).GetRoot<EditPageWorkflow>();

                var newVersionId = (Guid)workflow.Bindings[BindingNames.PageVersionId];
                var page = (IPage)workflow.Bindings[BindingNames.SelectedPage];

                // Returning version selector to its previous value
                workflow.Bindings[BindingNames.PageVersionId] = page.VersionId;
                workflow.RerenderView();

                if (newVersionId == AddNewVersionOptionId)
                {
                    workflow.ExecuteWorklow(workflow.EntityToken, typeof(AddNewPageVersionWorkflow));
                    return;
                }


                EntityToken targetEntityToken;
                using (var dc = new DataConnection())
                {
                    var pageId = page.Id;
                    var targetPage = dc.Get<IPage>().Single(p => p.Id == pageId && p.VersionId == newVersionId);

                    targetEntityToken = targetPage.GetDataEntityToken();
                }

                workflow.ExecuteWorklow(targetEntityToken, typeof(EditPageWorkflow));
            }
        }
    }
}
