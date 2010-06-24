using System;
using System.Linq;
using Composite.Data.Types;
using Composite.Data;
using Composite.Workflow;


namespace Composite.Workflows.StandardPlugins.Elements.ElementProviders.PageTypeElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditPageTypeDefaultPageContentWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public EditPageTypeDefaultPageContentWorkflow()
        {
            InitializeComponent();
        }




        private void initializeCodeActivity_UpdateBindings_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            this.Bindings.Add("DefaultPageContent", dataEntityToken.Data);
        }


        private void saveCodeActivity_Save_ExecuteCode(object sender, EventArgs e)
        {
            IPageTypeDefaultPageContent defaultPageContent = this.GetBinding<IPageTypeDefaultPageContent>("DefaultPageContent");

            DataFacade.Update(defaultPageContent);

            this.SetSaveStatus(true);

            this.CreateParentTreeRefresher().PostRefreshMesseges(this.EntityToken);
        }
    }
}
