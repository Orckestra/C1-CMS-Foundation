using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Workflow.Activities;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Workflow;
using Composite.Core.Localization;


namespace Composite.Plugins.Elements.ElementProviders.LocalizationElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditSystemLocaleWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EditSystemLocaleWorkflow()
        {
            InitializeComponent();
        }



        private void UrlMappingNameInUse(object sender, ConditionalEventArgs e)
        {
            ISystemActiveLocale systemActiveLocale = this.GetBinding<ISystemActiveLocale>("SystemActiveLocale");

            e.Result = LocalizationFacade.IsUrlMappingNameInUse(systemActiveLocale.CultureName, systemActiveLocale.UrlMappingName);
        }



        private void initializeCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            ISystemActiveLocale systemActiveLocale = (ISystemActiveLocale)dataEntityToken.Data;
            Bindings.Add("SystemActiveLocale", systemActiveLocale);

            var systemActiveLocales = DataFacade.GetData<ISystemActiveLocale>().ToList();

            if (string.IsNullOrEmpty(systemActiveLocale.FallbackCultureName) && systemActiveLocales.Any(d => d.FallbackCultureName == systemActiveLocale.CultureName))
            {
                Bindings.Add("FallbackLocales", new Dictionary<string,string>());
            }
            else
            {
                var fallbackLocales =
                    systemActiveLocales.Where(d =>
                            d.CultureName != systemActiveLocale.CultureName && string.IsNullOrEmpty(d.FallbackCultureName))
                        .Select(d => new CultureInfo(d.CultureName)).ToDictionary(f => f.Name, DataLocalizationFacade.GetCultureTitle);

                Bindings.Add("FallbackLocales", fallbackLocales);
            }
        }



        private void saveCodeActivity_Save_ExecuteCode(object sender, EventArgs e)
        {
            ISystemActiveLocale systemActiveLocale = this.GetBinding<ISystemActiveLocale>("SystemActiveLocale");

            DataFacade.Update(systemActiveLocale);
            
            SetSaveStatus(true);
        }



        private void editCodeActivity_ShowBaloon_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowFieldMessage("SystemActiveLocale.UrlMappingName", StringResourceSystemFacade.GetString("Composite.Plugins.LocalizationElementProvider", "EditSystemLocaleWorkflow.UrlMappingName.InUseMessage"));
        }
    }
}
