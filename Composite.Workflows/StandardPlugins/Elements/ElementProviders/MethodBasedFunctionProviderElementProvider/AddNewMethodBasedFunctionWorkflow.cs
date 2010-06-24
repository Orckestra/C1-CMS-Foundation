using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Workflow.Activities;
using System.Workflow.Runtime;
using Composite.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Extensions;
using Composite.Forms.Flows;
using Composite.ResourceSystem;
using Composite.StandardPlugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;
using Composite.Types;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewMethodBasedFunctionWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public AddNewMethodBasedFunctionWorkflow()
        {
            InitializeComponent();
        }

        private static string _lastAddedType;


        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            IMethodBasedFunctionInfo function = DataFacade.BuildNew<IMethodBasedFunctionInfo>();
            BaseFunctionFolderElementEntityToken token = (BaseFunctionFolderElementEntityToken)this.EntityToken;

            string namespaceName = "";
            int index = token.Id.IndexOf('.');
            if (index > 0)
            {
                namespaceName = token.Id.Substring(index + 1);
            }
            function.Namespace = namespaceName;
            if (_lastAddedType != null)
            {
                function.Type = _lastAddedType;
            }

            this.Bindings.Add("UserMethodName", "");
            this.Bindings.Add("NewMethodBasedFunction", function);
        }



        private void CheckType(object sender, ConditionalEventArgs e)
        {
            IMethodBasedFunctionInfo function = this.GetBinding<IMethodBasedFunctionInfo>("NewMethodBasedFunction");

            Type type = TypeManager.TryGetType(function.Type);

            if (type == null)
            {
                string errorMessage = StringResourceSystemFacade.GetString("Composite.StandardPlugins.MethodBasedFunctionProviderElementProvider", "AddFunction.CouldNotFindType");
                ShowFieldMessage("NewMethodBasedFunction.Type", errorMessage);
                e.Result = false;
                return;
            }


            if (type.IsAbstract == true)
            {
                string errorMessage = StringResourceSystemFacade.GetString("Composite.StandardPlugins.MethodBasedFunctionProviderElementProvider", "AddFunction.TypeIsAbstractOrStatic");
                ShowFieldMessage("NewMethodBasedFunction.Type", errorMessage);
                e.Result = false;
                return;
            }


            List<string> methodNames =
                (from methodInfo in type.GetMethods(BindingFlags.Static | BindingFlags.Public)
                 select methodInfo.Name).ToList();

            if (methodNames.Count == 0)
            {
                string errorMessage = StringResourceSystemFacade.GetString("Composite.StandardPlugins.MethodBasedFunctionProviderElementProvider", "AddFunction.TypeHasNoValidMethod");
                ShowFieldMessage("NewMethodBasedFunction.Type", errorMessage);
                e.Result = false;
                return;
            }


            int destinctCount = methodNames.Distinct().Count();
            if (destinctCount != methodNames.Count)
            {
                string errorMessage = StringResourceSystemFacade.GetString("Composite.StandardPlugins.MethodBasedFunctionProviderElementProvider", "AddFunction.TypeMustNotHaveOverloads");
                ShowFieldMessage("NewMethodBasedFunction.Type", errorMessage);
                e.Result = false;
                return;
            }


            this.UpdateBinding("MethodNames", methodNames);
            this.UpdateBinding("SelectedMethodName", "");

            _lastAddedType = type.FullName;

            e.Result = true;
        }



        private void step2CodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            IMethodBasedFunctionInfo function = this.GetBinding<IMethodBasedFunctionInfo>("NewMethodBasedFunction");

            Type type = TypeManager.TryGetType(function.Type);

            string methodName = this.GetBinding<string>("SelectedMethodName");


            function.MethodName = methodName;
            function.UserMethodName = methodName;
            function.Namespace = type.Namespace;
        }



        private void IsValidMethodName(object sender, ConditionalEventArgs e)
        {
            IMethodBasedFunctionInfo function = this.GetBinding<IMethodBasedFunctionInfo>("NewMethodBasedFunction");

            FlowControllerServicesContainer container = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            var flowRenderingService = container.GetService<IFormFlowRenderingService>();


            if (function.UserMethodName == String.Empty)
            {
                string errorMessage = StringResourceSystemFacade.GetString("Composite.StandardPlugins.MethodBasedFunctionProviderElementProvider", "AddFunction.MethodNameIsEmpty");
                ShowFieldMessage("SelectedMethodName", errorMessage);
                e.Result = false;
                return;
            }
            if (!function.Namespace.IsCorrectNamespace('.'))
            {
                string errorMessage = StringResourceSystemFacade.GetString("Composite.StandardPlugins.MethodBasedFunctionProviderElementProvider", "AddFunction.InvalidNamespace");
                ShowFieldMessage("SelectedMethodName", errorMessage);
                e.Result = false;
                return;
            }

            e.Result = true;
        }



        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            IMethodBasedFunctionInfo methodBasedFunctionInfo = this.GetBinding<IMethodBasedFunctionInfo>("NewMethodBasedFunction");
            methodBasedFunctionInfo.Id = Guid.NewGuid();

            methodBasedFunctionInfo = DataFacade.AddNew<IMethodBasedFunctionInfo>(methodBasedFunctionInfo);

            addNewTreeRefresher.PostRefreshMesseges(methodBasedFunctionInfo.GetDataEntityToken());
        }
    }
}
