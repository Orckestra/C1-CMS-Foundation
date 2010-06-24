using System;
using Composite.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Shutdown)]
    public sealed partial class RemoveTypeFromWhiteListWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public RemoveTypeFromWhiteListWorkflow()
        {
            InitializeComponent();
        }



        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            GeneratedDataTypesElementProviderTypeEntityToken castedEntityToken = (GeneratedDataTypesElementProviderTypeEntityToken)this.EntityToken;

            DataFacade.Delete<IGeneratedTypeWhiteList>(f => f.TypeManagerTypeName == castedEntityToken.SerializedTypeName);

            ParentTreeRefresher parentTreeRefresher = this.CreateParentTreeRefresher();
            parentTreeRefresher.PostRefreshMesseges(this.EntityToken, 3);
        }
    }
}
