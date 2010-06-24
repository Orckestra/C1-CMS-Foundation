using System;
using System.Web.Hosting;
using System.Workflow.Activities;
using Composite.Extensions;
using Composite.GlobalSettings;
using Composite.Threading;


namespace Composite.ConsoleEventSystem.Workflows
{
    public sealed partial class UserConsoleInformationScavengerWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public UserConsoleInformationScavengerWorkflow()
        {
            InitializeComponent();
        }



        private void OnInitializeTimeout(object sender, EventArgs e)
        {
            (sender as DelayActivity).TimeoutDuration = GlobalSettingsFacade.ConsoleTimeout;
        }



        private void scavengeCodeActivity_Scavenge_ExecuteCode(object sender, EventArgs e)
        {
            if (HostingEnvironment.ApplicationHost.ShutdownInitiated())
            {
                return;
            }

            try
            {
                using (ThreadDataManager.Initialize())
                {
                    ConsoleFacade.Scavenge();
                }
            }
            catch
            {
                // Ignore exceptions
            }
        } 
    }
}
