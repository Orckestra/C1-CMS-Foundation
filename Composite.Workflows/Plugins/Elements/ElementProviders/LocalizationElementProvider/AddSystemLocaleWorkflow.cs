using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Workflow.Activities;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Types;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.Core.Localization;


namespace Composite.Plugins.Elements.ElementProviders.LocalizationElementProvider
{
    [EntityTokenLock()]
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
                where alreadyAddedCultureNames.Contains(cul.Name) == false
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

            Dictionary<string, string> culturesDictionary = cultures.ToDictionary(f => f.Name, f => StringResourceSystemFacade.GetString("Composite.Cultures", f.Name));

            string urlMappingName = GetDefaultUrlMappingNameFromCultureName(culturesDictionary.First().Key);
            if (DataLocalizationFacade.ActiveLocalizationCultures.Count() == 0)
            {
                urlMappingName = "";
            }

            this.Bindings.Add("CultureName", culturesDictionary.First().Key);
            this.Bindings.Add("RegionLanguageList", culturesDictionary);
            this.Bindings.Add("UrlMappingName", urlMappingName);
            this.Bindings.Add("AccessToAllUsers", true);
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            string cultureName = this.GetBinding<string>("CultureName");
            string urlMappingName = this.GetBinding<string>("UrlMappingName");
            bool accessToAllUsers = this.GetBinding<bool>("AccessToAllUsers");

            LocalizationFacade.AddLocale(cultureName, urlMappingName, accessToAllUsers);    

            this.CloseCurrentView();

            ConsoleMessageQueueFacade.Enqueue(new CollapseAndRefreshConsoleMessageQueueItem(), null);
            ConsoleMessageQueueFacade.Enqueue(new BroadcastMessageQueueItem { Name = "LocalesUpdated", Value = "" }, null);


            SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
            specificTreeRefresher.PostRefreshMesseges(this.EntityToken);
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
                urlMappingName = urlMappingName.Substring(0, urlMappingName.IndexOf("-"));
            }
            return urlMappingName;
        }



        private void codeActivity_ShowBalloon_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowFieldMessage("UrlMappingName", StringResourceSystemFacade.GetString("Composite.Plugins.LocalizationElementProvider", "AddSystemLocaleWorkflow.UrlMappingName.InUseMessage"));
        }
    }
}
