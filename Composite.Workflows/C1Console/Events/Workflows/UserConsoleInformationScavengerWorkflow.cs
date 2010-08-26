using System;
using System.Web.Hosting;
using System.Workflow.Activities;
using Composite.Core.Extensions;
using Composite.Core.Configuration;
using Composite.Core.Threading;


namespace Composite.C1Console.Events.Workflows
{
    public sealed partial class UserConsoleInformationScavengerWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
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
