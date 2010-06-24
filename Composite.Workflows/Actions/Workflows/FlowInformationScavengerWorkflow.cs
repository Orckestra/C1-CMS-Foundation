using System;
using System.Web.Hosting;
using Composite.Extensions;
using System.Workflow.Activities;
using Composite.GlobalSettings;


namespace Composite.Actions.Workflows
{
    public sealed partial class FlowInformationScavengerWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public FlowInformationScavengerWorkflow()
        {
            InitializeComponent();
        }


        private void OnInitializeTimeout(object sender, EventArgs e)
        {
            (sender as DelayActivity).TimeoutDuration = GlobalSettingsFacade.WorkflowTimeout;
        }


        private void scavengeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            if(HostingEnvironment.ApplicationHost.ShutdownInitiated())
            {
                return;
            }

            try
            {
                FlowControllerFacade.Scavenge();
            }
            catch
            {
                // Ignore exceptions
            }
        }        
    }
}
