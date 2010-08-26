using System;
using System.Linq;
using System.Transactions;
using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Data.Transactions;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.SqlFunctionElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteSqlConnectionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public DeleteSqlConnectionWorkflow()
        {
            InitializeComponent();
        }


      
        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DeleteTreeRefresher deleteTreeRefresher = this.CreateDeleteTreeRefresher(this.EntityToken);

            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            ISqlConnection connection = (ISqlConnection)dataEntityToken.Data;

            var queries = from item in DataFacade.GetData<ISqlFunctionInfo>()
                          where item.ConnectionId == connection.Id
                          select item;
            using (TransactionScope transationScope = TransactionsFacade.CreateNewScope())
            {
                DataFacade.Delete(connection);
                foreach (ISqlFunctionInfo query in queries)
                {
                    DataFacade.Delete(query);
                }
                transationScope.Complete();
            }

            deleteTreeRefresher.PostRefreshMesseges();
        }
    }
}
