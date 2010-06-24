using System;
using Composite.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Shutdown)]
    public sealed partial class AddTypeToWhiteListWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public AddTypeToWhiteListWorkflow()
        {
            InitializeComponent();
        }



        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            GeneratedDataTypesElementProviderTypeEntityToken castedEntityToken = (GeneratedDataTypesElementProviderTypeEntityToken)this.EntityToken;

            IGeneratedTypeWhiteList generatedTypeWhiteList = DataFacade.BuildNew<IGeneratedTypeWhiteList>();
            generatedTypeWhiteList.TypeManagerTypeName = castedEntityToken.SerializedTypeName;
            DataFacade.AddNew<IGeneratedTypeWhiteList>(generatedTypeWhiteList);

            ParentTreeRefresher parentTreeRefresher = this.CreateParentTreeRefresher();
            parentTreeRefresher.PostRefreshMesseges(this.EntityToken, 3);
        }
    }
}
