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
using Composite.Plugins.Elements.ElementProviders.PageElementProvider;

namespace Composite.VersionPublishing
{
    internal class EditPageWorkflowExtension : IFormsWorkflowExtension
    {
        private class BindingNames
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
            var handler = new VersionChangeHandler();
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
                    },
                    new CloseCurrentViewActivity()
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

                var versions = allPageVersions.
                    Select(f => new KeyValuePair<Guid, string>(f.VersionId, f.VersionName ?? "")).
                    ToList();

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
        public class VersionChangeHandler
        {
            public void OpenNewEditingWorkflow(object sender, EventArgs args)
            {
                var workflow = GetWorkflow((CodeActivity) sender);

                var pageId = ((IPage) workflow.Bindings[BindingNames.SelectedPage]).Id;
                var newVersionId = (Guid) workflow.Bindings[BindingNames.PageVersionId];

                EntityToken targetEntityToken;
                using (var dc = new DataConnection())
                {
                    var targetPage = dc.Get<IPage>().Single(p => p.Id == pageId && p.VersionId == newVersionId);

                    targetEntityToken = targetPage.GetDataEntityToken();
                }

                workflow.ExecuteWorklow(targetEntityToken, typeof(EditPageWorkflow));
            }

            private static FormsWorkflow GetWorkflow(CodeActivity codeActivity)
            {
                var pointer = codeActivity.Parent;
                while(pointer != null && !(pointer is FormsWorkflow))
                {
                    pointer = pointer.Parent;
                }

                return pointer as FormsWorkflow;
            }
        }
    }
}
