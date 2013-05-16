using System;
using System.Transactions;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Core.ResourceSystem;
using Composite.Data;
using Composite.Data.Transactions;
using Composite.Data.Types;
using Composite.Functions.Inline;


namespace Composite.Workflows.Plugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider
{
    public sealed partial class DeleteInlineFunctionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public DeleteInlineFunctionWorkflow()
        {
            InitializeComponent();
        }



        private void finalizeCodeActivity_DeleteFunction_ExecuteCode(object sender, EventArgs e)
        {
            IInlineFunction function = GetDataItemFromEntityToken<IInlineFunction>();

            if (DataFacade.WillDeleteSucceed(function))
            {
                DeleteTreeRefresher treeRefresher = this.CreateDeleteTreeRefresher(this.EntityToken);

                using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
                {
                    DataFacade.Delete<IInlineFunctionAssemblyReference>(f => f.Function == function.Id);
                    DataFacade.Delete<IParameter>(f => f.OwnerId == function.Id);

                    function.DeleteFunctionCode();

                    DataFacade.Delete(function);

                    transactionScope.Complete();
                }

                treeRefresher.PostRefreshMesseges();
            }
            else
            {
                this.ShowMessage(
                        DialogType.Error,
                        StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "CascadeDeleteErrorTitle"),
                        StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "CascadeDeleteErrorMessage")
                    );
            }
        }
    }
}
