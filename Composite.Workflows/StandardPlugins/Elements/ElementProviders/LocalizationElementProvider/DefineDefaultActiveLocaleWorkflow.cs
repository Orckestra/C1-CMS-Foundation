using System;
using System.Globalization;
using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Localization;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.LocalizationElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DefineDefaultActiveLocaleWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
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
