using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using Composite.Data;
using Composite.Data.Types;
using Composite.ResourceSystem;
using Composite.Workflow;
using Composite.Localization;


namespace Composite.StandardPlugins.Elements.ElementProviders.LocalizationElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditSystemLocaleWorkflow : Composite.Workflow.Activities.FormsWorkflow
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

            this.Bindings.Add("SystemActiveLocale", systemActiveLocale);
        }



        private void saveCodeActivity_Save_ExecuteCode(object sender, EventArgs e)
        {
            ISystemActiveLocale systemActiveLocale = this.GetBinding<ISystemActiveLocale>("SystemActiveLocale");

            DataFacade.Update(systemActiveLocale);
            
            SetSaveStatus(true);
        }



        private void editCodeActivity_ShowBaloon_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowFieldMessage("SystemActiveLocale.UrlMappingName", StringResourceSystemFacade.GetString("Composite.StandardPlugins.LocalizationElementProvider", "EditSystemLocaleWorkflow.UrlMappingName.InUseMessage"));
        }
    }
}
