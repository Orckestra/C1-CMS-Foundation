using System;
using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.C1Console.Elements.ElementProviderHelpers.VisualFunctionElementProviderHelper
{
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

            deleteTreeRefresher.PostRefreshMesseges();
        }
    }
}
