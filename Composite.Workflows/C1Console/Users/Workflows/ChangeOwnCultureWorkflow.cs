using System;
using System.Collections.Generic;
using System.Globalization;
using System.Workflow.Activities;
using Composite.Core.Logging;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Composite.C1Console.Workflow;


namespace Composite.C1Console.Users.Workflows
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class ChangeOwnCultureWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public ChangeOwnCultureWorkflow()
        {
            InitializeComponent();
        }


        private void stepInitialize_codeActivity_ExecuteCode(object sender, EventArgs e)
        {
            LoggingService.LogVerbose("ChangeOwnCultureWorkflow", "ChangeOwnCultureWorkflow flow started");

            CultureInfo userCulture = UserSettings.CultureInfo;

            List<KeyValuePair> regionLanguageList = StringResourceSystemFacade.GetApplicationRegionAndLanguageList();

            this.Bindings.Add("CultureName", userCulture.Name);
            this.Bindings.Add("RegionLanguageList", regionLanguageList);
        }


        private void stepFinalize_codeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string cultureName = this.GetBinding<string>("CultureName");

            UserSettings.CultureInfo = new CultureInfo(cultureName);

            LoggingService.LogVerbose("ChangeOwnCultureWorkflow", string.Format("Changed culture for user to {0}", cultureName));
        }



        private void CultureHasChanged(object sender, ConditionalEventArgs e)
        {
            string cultureName = this.GetBinding<string>("CultureName");

            e.Result = UserSettings.CultureInfo.Name != cultureName;
        }



        private void rebootConsoleActivity_ExecuteCode(object sender, EventArgs e)
        {
            this.RebootConsole();
        }

    }
}
