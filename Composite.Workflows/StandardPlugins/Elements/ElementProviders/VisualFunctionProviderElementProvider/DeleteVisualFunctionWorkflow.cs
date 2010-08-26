using System;
using System.Linq;
using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.VisualFunctionProviderElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteVisualFunctionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public DeleteVisualFunctionWorkflow()
        {
            InitializeComponent();
        }

        

        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DeleteTreeRefresher deleteTreeRefresher = this.CreateDeleteTreeRefresher(this.EntityToken);

            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            IVisualFunction visualFunction = (IVisualFunction)dataEntityToken.Data;

            DataFacade.Delete<IVisualFunction>(visualFunction);

            int count =
                    (from info in DataFacade.GetData<IVisualFunction>()
                     where info.Namespace == visualFunction.Namespace
                     select info).Count();


            if (count == 0)
            {
                WorkflowActionToken actionToken = (WorkflowActionToken)this.ActionToken;

                string id = BaseFunctionProviderElementProvider.BaseFunctionProviderElementProvider.CreateId("", actionToken.Payload);

                BaseFunctionFolderElementEntityToken entityToken = new BaseFunctionFolderElementEntityToken(id);

                SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
                specificTreeRefresher.PostRefreshMesseges(entityToken);
            }
            else
            {
                deleteTreeRefresher.PostRefreshMesseges();
            }
        }
    }
}
