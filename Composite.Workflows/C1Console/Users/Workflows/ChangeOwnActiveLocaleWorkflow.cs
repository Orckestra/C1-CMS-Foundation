using System;
using System.Globalization;
using Composite.C1Console.Events;
using Composite.C1Console.Workflow;
using Composite.Core.ResourceSystem;


namespace Composite.C1Console.Users.Workflows
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class ChangeOwnActiveLocaleWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public ChangeOwnActiveLocaleWorkflow()
        {
            InitializeComponent();
        }



        private void changeLocaleCodeActivity_Execute_ExecuteCode(object sender, EventArgs e)
        {
            WorkflowActionToken workflowActionToken = (WorkflowActionToken)this.ActionToken;

            CultureInfo cultureInfo = CultureInfo.CreateSpecificCulture(workflowActionToken.Payload);

            UserSettings.ActiveLocaleCultureInfo = cultureInfo;

            string currentConsoleId = GetCurrentConsoleId();

            foreach (string consoleId in GetConsoleIdsOpenedByCurrentUser())
            {
                if (consoleId != currentConsoleId)
                {
                    ConsoleMessageQueueFacade.Enqueue(new CloseAllViewsMessageQueueItem { Reason = StringResourceSystemFacade.GetString("Composite.C1Console.Users", "ChangeOwnActiveLocaleWorkflow.CloseAllViews.Message") }, consoleId);
                }
                ConsoleMessageQueueFacade.Enqueue(new CollapseAndRefreshConsoleMessageQueueItem(), consoleId);
                ConsoleMessageQueueFacade.Enqueue(new BroadcastMessageQueueItem { Name = "ActiveLocaleChanged", Value = "" }, consoleId);
            }
        }
    }
}
