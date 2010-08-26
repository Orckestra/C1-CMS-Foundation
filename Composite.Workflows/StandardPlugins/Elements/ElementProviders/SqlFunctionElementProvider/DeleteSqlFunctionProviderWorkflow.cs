using System;
using System.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.SqlFunctionElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteSqlFunctionProviderWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public DeleteSqlFunctionProviderWorkflow()
        {
            InitializeComponent();
        }




        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken token = this.EntityToken as DataEntityToken;

            ISqlFunctionInfo sqlFunctionInfo = (ISqlFunctionInfo)token.Data;

            if (DataFacade.WillDeleteSucceed(token.Data) == true)
            {
                DeleteTreeRefresher treeRefresher = this.CreateDeleteTreeRefresher(this.EntityToken);

                DataFacade.Delete(sqlFunctionInfo);

                int count =
                    (from info in DataFacade.GetData<ISqlFunctionInfo>()
                     where info.Namespace == sqlFunctionInfo.Namespace
                     select info).Count();                

                if (count == 0)
                {
                    ISqlConnection sqlConnection =
                        (from connection in DataFacade.GetData<ISqlConnection>()
                         where connection.Id == sqlFunctionInfo.ConnectionId
                         select connection).Single();

                    SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
                    specificTreeRefresher.PostRefreshMesseges(sqlConnection.GetDataEntityToken());
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
                        StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", "CascadeDeleteErrorTitle"),
                        StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", "CascadeDeleteErrorMessage")
                    );
            }            
        }
    }
}
