using System;
using System.Linq;
using Composite.Data;
using System.Collections.Generic;
using System.Globalization;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Events;


namespace Composite.C1Console.Users.Workflows
{
    public sealed partial class ChangeOwnForeignLocaleWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public ChangeOwnForeignLocaleWorkflow()
        {
            InitializeComponent();
        }



        private void HasActiveLocales(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            e.Result = DataLocalizationFacade.ActiveLocalizationCultures.Count() > 1;
        }



        private void step1CodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            IEnumerable<CultureInfo> foreignCultures =
                    from l in DataLocalizationFacade.ActiveLocalizationCultures
                    select l;

            List<KeyValuePair<string, string>> foreignCulturesDictionary = foreignCultures.Select(f => new KeyValuePair<string, string>(f.Name, DataLocalizationFacade.GetCultureTitle(f))).OrderBy(f => f.Value).ToList();
            foreignCulturesDictionary.Insert(0, new KeyValuePair<string, string>("NONE", StringResourceSystemFacade.GetString("Composite.C1Console.Users", "ChangeForeignLocaleWorkflow.NoForeignLocaleLabel")));

            string selectedForeignCultureName = "NONE";
            if (UserSettings.ForeignLocaleCultureInfo != null)
            {
                selectedForeignCultureName = UserSettings.ForeignLocaleCultureInfo.Name;
            }

            this.Bindings.Add("ForeignCultureName", selectedForeignCultureName);
            this.Bindings.Add("ForeignCulturesList", foreignCulturesDictionary);
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            string foreignCultureName = this.GetBinding<string>("ForeignCultureName");
            CultureInfo foreignCultureInfo = null;
            if (foreignCultureName != "NONE")
            {
                foreignCultureInfo = CultureInfo.CreateSpecificCulture(foreignCultureName);
            }

            UserSettings.ForeignLocaleCultureInfo = foreignCultureInfo;

            foreach (string consoleId in GetConsoleIdsOpenedByCurrentUser())
            {
                ConsoleMessageQueueFacade.Enqueue(new BroadcastMessageQueueItem { Name = "ForeignLocaleChanged", Value = "" }, consoleId);
            }

            this.CloseCurrentView();
            this.CollapseAndRefresh();
        }
    }
}
