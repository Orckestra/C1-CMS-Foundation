using System;
using System.Globalization;
using Composite.ConsoleEventSystem;
using Composite.ResourceSystem;
using Composite.Workflow;


namespace Composite.Users.Workflows
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class ChangeOwnActiveLocaleWorkflow : Composite.Workflow.Activities.FormsWorkflow
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
            foreach (string consoleId in ConsoleFacade.GetConsoleIdsByUsername(UserSettings.Username))
            {
                if (consoleId != currentConsoleId)
                {
                    ConsoleMessageQueueFacade.Enqueue(new CloseAllViewsMessageQueueItem { Reason = StringResourceSystemFacade.GetString("Composite.Users", "ChangeOwnActiveLocaleWorkflow.CloseAllViews.Message") }, consoleId);
                }
                ConsoleMessageQueueFacade.Enqueue(new CollapseAndRefreshConsoleMessageQueueItem(), consoleId);
                ConsoleMessageQueueFacade.Enqueue(new BroadcastMessageQueueItem { Name = "ActiveLocaleChanged", Value = "" }, consoleId);
            }
        }
    }
}
