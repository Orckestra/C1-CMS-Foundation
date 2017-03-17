using System;
using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    public sealed partial class AddTypeToWhiteListWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
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
