using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Workflow.Activities;
using Composite.C1Console.Events;
using Composite.C1Console.Workflow;
using Composite.Core.Localization;
using Composite.Core.ResourceSystem;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.Plugins.Elements.ElementProviders.LocalizationElementProvider
{
    [EntityTokenLock]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddSystemLocaleWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public AddSystemLocaleWorkflow()
        {
            InitializeComponent();
        }



        private void HasAnyWhiteListedLocales(object sender, ConditionalEventArgs e)
        {
            List<string> alreadyAddedCultureNames =
                (from d in DataFacade.GetData<ISystemActiveLocale>()
                 select d.CultureName).ToList();

            IEnumerable<CultureInfo> cultures =
                from cul in DataLocalizationFacade.WhiteListedLocales
                where !alreadyAddedCultureNames.Contains(cul.Name)
                orderby cul.DisplayName
                select cul;

            e.Result = cultures.Any();
        }



        private void UrlMappingNameInUse(object sender, ConditionalEventArgs e)
        {
            string urlMappingName = this.GetBinding<string>("UrlMappingName");

            e.Result = LocalizationFacade.IsUrlMappingNameInUse(urlMappingName);
        }



        private void initializeCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            List<string> alreadyAddedCultureNames =
                (from d in DataFacade.GetData<ISystemActiveLocale>()
                 select d.CultureName).ToList();

            IEnumerable<CultureInfo> cultures =
                from cul in DataLocalizationFacade.WhiteListedLocales
                where alreadyAddedCultureNames.Contains(cul.Name) == false
                orderby cul.DisplayName
                select cul;

            var culturesDictionary = cultures.ToDictionary(f => f.Name, DataLocalizationFacade.GetCultureTitle);

            this.Bindings = new Dictionary<string, object>
            {
                {"CultureName", ""},
                {"RegionLanguageList", culturesDictionary},
                {"UrlMappingName", ""},
                {"AccessToAllUsers", true}
            };
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            string cultureName = this.GetBinding<string>("CultureName");
            string urlMappingName = this.GetBinding<string>("UrlMappingName");
            bool accessToAllUsers = this.GetBinding<bool>("AccessToAllUsers");

            LocalizationFacade.AddLocale(cultureName, urlMappingName, accessToAllUsers);

            this.CloseCurrentView();

            ConsoleMessageQueueFacade.Enqueue(new BroadcastMessageQueueItem { Name = "LocalesUpdated", Value = "" }, null);


            var specificTreeRefresher = this.CreateSpecificTreeRefresher();
            specificTreeRefresher.PostRefreshMesseges(this.EntityToken);

            var newLocaleDataItem = DataFacade.GetData<ISystemActiveLocale>().FirstOrDefault(l => l.CultureName == cultureName);

            if (newLocaleDataItem != null)
            {
                SelectElement(newLocaleDataItem.GetDataEntityToken());
            }
        }



        private void updateRulMappingNameCodeActivity_Update_ExecuteCode(object sender, EventArgs e)
        {
            string urlMappingName = GetDefaultUrlMappingNameFromCultureName( this.GetBinding<string>("CultureName") );

            this.UpdateBinding("UrlMappingName", urlMappingName);
        }



        private string GetDefaultUrlMappingNameFromCultureName(string cultureName)
        {
            string urlMappingName = cultureName;
            if (urlMappingName.Contains("-"))
            {
                urlMappingName = urlMappingName.Substring(0, urlMappingName.IndexOf("-", StringComparison.Ordinal));
            }
            return urlMappingName;
        }



        private void codeActivity_ShowBalloon_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowFieldMessage("UrlMappingName", StringResourceSystemFacade.GetString("Composite.Plugins.LocalizationElementProvider", "AddSystemLocaleWorkflow.UrlMappingName.InUseMessage"));
        }
    }
}
