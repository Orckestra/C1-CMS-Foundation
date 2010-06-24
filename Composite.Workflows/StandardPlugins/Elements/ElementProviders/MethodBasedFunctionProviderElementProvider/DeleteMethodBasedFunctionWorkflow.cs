using System;
using System.Linq;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Data;
using Composite.Data.Types;
using Composite.ResourceSystem;
using Composite.StandardPlugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteMethodBasedFunctionWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public DeleteMethodBasedFunctionWorkflow()
        {
            InitializeComponent();
        }

      

        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken token = (DataEntityToken)this.EntityToken;

            IMethodBasedFunctionInfo methodBasedFunctionInfo = (IMethodBasedFunctionInfo)token.Data;

            if (DataFacade.WillDeleteSucceed(methodBasedFunctionInfo) == true)
            {
                DeleteTreeRefresher treeRefresher = this.CreateDeleteTreeRefresher(this.EntityToken);

                DataFacade.Delete(token.Data);

                int count =
                    (from info in DataFacade.GetData<IMethodBasedFunctionInfo>()
                     where info.Namespace == methodBasedFunctionInfo.Namespace
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
                    treeRefresher.PostRefreshMesseges();
                }
            }
            else
            {
                this.ShowMessage(
                        DialogType.Error,
                        StringResourceSystemFacade.GetString("Composite.StandardPlugins.MethodBasedFunctionProviderElementProvider", "CascadeDeleteErrorTitle"),
                        StringResourceSystemFacade.GetString("Composite.StandardPlugins.MethodBasedFunctionProviderElementProvider", "CascadeDeleteErrorMessage")
                    );
            }
        }
    }
}
