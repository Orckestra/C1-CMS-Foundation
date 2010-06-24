using System;
using Composite.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Security.Cryptography;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.SqlFunctionElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditSqlConnectionWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public EditSqlConnectionWorkflow()
        {
            InitializeComponent();
        }

        private void initialStateCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            ISqlConnection connection = (ISqlConnection)dataEntityToken.Data;
            
            string decryptedConnectionString = connection.EncryptedConnectionString.Decrypt();

            this.Bindings.Add("ConnectionString", decryptedConnectionString);
            this.Bindings.Add("SqlConnection", connection);
        }


        private void saveEditStateCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            UpdateTreeRefresher updateTreeRefresher = this.CreateUpdateTreeRefresher(this.EntityToken);

            ISqlConnection connection = this.GetBinding<ISqlConnection>("SqlConnection");
            string connectionString = this.GetBinding<string>("ConnectionString");
            connection.EncryptedConnectionString = connectionString.Encrypt();

            DataFacade.Update(connection);

            SetSaveStatus(true);

            updateTreeRefresher.PostRefreshMesseges(connection.GetDataEntityToken());
        }
    }
}
