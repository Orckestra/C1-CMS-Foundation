using System;
using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    public sealed partial class RemoveTypeFromWhiteListWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
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
