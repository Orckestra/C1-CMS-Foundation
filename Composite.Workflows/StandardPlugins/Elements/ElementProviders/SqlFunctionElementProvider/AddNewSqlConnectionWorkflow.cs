using System;
using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Security.Cryptography;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.SqlFunctionElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewSqlConnectionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public AddNewSqlConnectionWorkflow()
        {
            InitializeComponent();
        }

        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            ISqlConnection sqlConnection = DataFacade.BuildNew<ISqlConnection>();

            sqlConnection.Id = Guid.NewGuid();
            sqlConnection.Name = "New Sql Connection";

            this.Bindings.Add("NewSqlConnection", sqlConnection);
            this.Bindings.Add("ConnectionString", "");
        }



        private void finalizecodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            ISqlConnection sqlConnection = this.GetBinding<ISqlConnection>("NewSqlConnection");
            string connection = this.GetBinding<string>("ConnectionString");

            sqlConnection.EncryptedConnectionString = connection.Encrypt();

            sqlConnection = DataFacade.AddNew<ISqlConnection>(sqlConnection);

            addNewTreeRefresher.PostRefreshMesseges(sqlConnection.GetDataEntityToken());
        }
    }
}
 
