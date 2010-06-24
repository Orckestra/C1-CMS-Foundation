using System;
using System.Linq;
using Composite.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Users;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.SqlFunctionElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewSqlFunctionProviderWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public AddNewSqlFunctionProviderWorkflow()
        {
            InitializeComponent();
        }



        private void initializeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string namespaceName;
            ISqlConnection sqlConnection;

            if ((this.EntityToken is DataEntityToken) == true)
            {
                DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

                namespaceName = UserSettings.LastSpecifiedNamespace;
                sqlConnection = (ISqlConnection)dataEntityToken.Data;
            }
            else if ((this.EntityToken is SqlFunctionProviderFolderEntityToken) == true)
            {
                Guid connectionId = new Guid(((SqlFunctionProviderFolderEntityToken)this.EntityToken).ConnectionId);

                namespaceName = this.EntityToken.Id;
                sqlConnection = DataFacade.GetData<ISqlConnection>(x => x.Id == connectionId).First();                
            }
            else
            {
                throw new NotImplementedException();
            }
             

            ISqlFunctionInfo sqlFunctionInfo = DataFacade.BuildNew<ISqlFunctionInfo>();
            sqlFunctionInfo.IsQuery = true;
            sqlFunctionInfo.ConnectionId = sqlConnection.Id;
            sqlFunctionInfo.Id = Guid.NewGuid();
            sqlFunctionInfo.Name = "";
            sqlFunctionInfo.Namespace = namespaceName;
            sqlFunctionInfo.Description = "";

            this.Bindings.Add("NewSqlQueryInfo", sqlFunctionInfo);
        }



        private void finalizeActivity_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            ISqlFunctionInfo sqlFunctionInfo = this.GetBinding<ISqlFunctionInfo>("NewSqlQueryInfo");

            sqlFunctionInfo = DataFacade.AddNew<ISqlFunctionInfo>(sqlFunctionInfo);

            UserSettings.LastSpecifiedNamespace = sqlFunctionInfo.Namespace;

            addNewTreeRefresher.PostRefreshMesseges(sqlFunctionInfo.GetDataEntityToken());

            this.ExecuteWorklow(sqlFunctionInfo.GetDataEntityToken(), typeof(EditSqlFunctionProviderWorkflow));
        }
    }
}
