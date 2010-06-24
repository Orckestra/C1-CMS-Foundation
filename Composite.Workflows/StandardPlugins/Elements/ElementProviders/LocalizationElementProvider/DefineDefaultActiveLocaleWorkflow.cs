using System;
using System.Globalization;
using Composite.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Localization;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.LocalizationElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DefineDefaultActiveLocaleWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public DefineDefaultActiveLocaleWorkflow()
        {
            InitializeComponent();
        }      



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            ISystemActiveLocale systemActiveLocale = (ISystemActiveLocale)dataEntityToken.Data;

            CultureInfo cultureInfo = CultureInfo.CreateSpecificCulture(systemActiveLocale.CultureName);

            if (LocalizationFacade.SetDefaultLocale(cultureInfo) == true)
            {
                ParentTreeRefresher parentTreeRefresher = this.CreateParentTreeRefresher();
                parentTreeRefresher.PostRefreshMesseges(this.EntityToken);
            }
        }        
    }
}
