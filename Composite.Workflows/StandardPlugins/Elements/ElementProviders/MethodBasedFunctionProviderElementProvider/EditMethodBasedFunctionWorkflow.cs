using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using Composite.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Extensions;
using Composite.Types;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditMethodBasedFunctionWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public EditMethodBasedFunctionWorkflow()
        {
            InitializeComponent();
        }


        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            this.Bindings.Add("CurrentMethodFunctionInfo", dataEntityToken.Data);
            this.Bindings.Add("ErrorMessage", null);
        }



        private void IsValidData(object sender, ConditionalEventArgs e)
        {
            e.Result = false;

            IMethodBasedFunctionInfo function = this.GetBinding<IMethodBasedFunctionInfo>("CurrentMethodFunctionInfo");

            if (function.UserMethodName == String.Empty)
            {
                this.ShowFieldMessage("CurrentMethodFunctionInfo.UserMethodName", "${Composite.StandardPlugins.MethodBasedFunctionProviderElementProvider, EditFunction.MethodNameEmpty}");
                return;
            }

            if (!function.Namespace.IsCorrectNamespace('.'))
            {
                this.ShowFieldMessage("CurrentMethodFunctionInfo.UserMethodName", "${Composite.StandardPlugins.MethodBasedFunctionProviderElementProvider, EditFunction.InvalidNamespace}");
                return;
            }

            Type type = TypeManager.TryGetType(function.Type);

            if (type == null)
            {
                this.ShowFieldMessage("CurrentMethodFunctionInfo.Type", "${Composite.StandardPlugins.MethodBasedFunctionProviderElementProvider, EditFunction.TypeNotFound}");
                return;
            }

            List<string> methodNames =
                (from methodInfo in type.GetMethods()
                 select methodInfo.Name).ToList();


            if (!methodNames.Contains(function.MethodName))
            {
                this.ShowFieldMessage("CurrentMethodFunctionInfo.MethodName", "${Composite.StandardPlugins.MethodBasedFunctionProviderElementProvider, EditFunction.MethodNotInType}");
                return;
            }


            if (methodNames.Count == 0)
            {
                this.ShowFieldMessage("CurrentMethodFunctionInfo.Type", "${Composite.StandardPlugins.MethodBasedFunctionProviderElementProvider, EditFunction.NoValidMethod}");
                return;
            }

            int destinctCount = methodNames.Distinct().Count();
            if (destinctCount != methodNames.Count)
            {
                this.ShowFieldMessage("CurrentMethodFunctionInfo.Type", "${Composite.StandardPlugins.MethodBasedFunctionProviderElementProvider, EditFunction.MethodOverloadsNotAllowed}");
                return;
            }           

            e.Result = true;
        }



        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            UpdateTreeRefresher updateTreeRefresher = this.CreateUpdateTreeRefresher(this.EntityToken);

            IMethodBasedFunctionInfo methodBasedFunctionInfo = this.GetBinding<IMethodBasedFunctionInfo>("CurrentMethodFunctionInfo");

            DataFacade.Update(methodBasedFunctionInfo);

            SetSaveStatus(true);

            updateTreeRefresher.PostRefreshMesseges(methodBasedFunctionInfo.GetDataEntityToken());
        }
    }
}
