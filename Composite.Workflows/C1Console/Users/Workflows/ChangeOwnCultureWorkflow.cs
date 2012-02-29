using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Workflow.Activities;
using Composite.Core.Logging;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Composite.C1Console.Workflow;
using Composite.Data;


namespace Composite.C1Console.Users.Workflows
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class ChangeOwnCultureWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public ChangeOwnCultureWorkflow()
        {
            InitializeComponent();
        }


        private void stepInitialize_codeActivity_ExecuteCode(object sender, EventArgs e)
        {
            CultureInfo userCulture = UserSettings.CultureInfo; // Copy admins settings
            CultureInfo c1ConsoleUiLanguage = UserSettings.C1ConsoleUiLanguage; // Copy admins settings

            List<KeyValuePair> regionLanguageList = StringResourceSystemFacade.GetSupportedCulturesList();
            Dictionary<string, string> culturesDictionary = StringResourceSystemFacade.GetAllCultures();

            this.Bindings.Add("AllCultures", culturesDictionary);
            this.Bindings.Add("CultureName", userCulture.Name);

            this.Bindings.Add("C1ConsoleUiCultures", regionLanguageList);
            this.Bindings.Add("C1ConsoleUiLanguageName", c1ConsoleUiLanguage.Name);
        }


        private void stepFinalize_codeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string cultureName = this.GetBinding<string>("CultureName");
            string c1ConsoleUiLanguageName = this.GetBinding<string>("C1ConsoleUiLanguageName");

            UserSettings.CultureInfo = new CultureInfo(cultureName);
            UserSettings.C1ConsoleUiLanguage = new CultureInfo(c1ConsoleUiLanguageName);

            LoggingService.LogVerbose("ChangeOwnCultureWorkflow", string.Format("Changed culture for user to {0}", cultureName));
        }



        private void CultureHasChanged(object sender, ConditionalEventArgs e)
        {
            string cultureName = this.GetBinding<string>("CultureName");
            string c1ConsoleUiLanguageName = this.GetBinding<string>("C1ConsoleUiLanguageName");

            e.Result = UserSettings.CultureInfo.Name != cultureName || UserSettings.C1ConsoleUiLanguage.Name != c1ConsoleUiLanguageName;
        }



        private void rebootConsoleActivity_ExecuteCode(object sender, EventArgs e)
        {
            this.RebootConsole();
        }

    }
}
