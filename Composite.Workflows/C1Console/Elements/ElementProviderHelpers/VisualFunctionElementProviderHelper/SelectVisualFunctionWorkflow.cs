using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Types;
using Composite.C1Console.Workflow;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using System.Workflow.Runtime;
using Composite.C1Console.Elements.ElementProviderHelpers.VisualFunctionElementProviderHelper.Foundation;


namespace Composite.C1Console.Elements.ElementProviderHelpers.VisualFunctionElementProviderHelper
{
    public sealed partial class SelectVisualFunctionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public SelectVisualFunctionWorkflow()
        {
            InitializeComponent();
        }

       

        private void selectCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            IData data = ((DataEntityToken)this.EntityToken).Data;

            string serializedType = TypeManager.SerializeType(data.DataSourceId.InterfaceType);

            var functions =
                (from f in DataFacade.GetData<IVisualFunction>()
                 where f.TypeManagerName == serializedType
                 select new { Name = f.Name, Namespace = f.Namespace }).ToList();

            IEnumerable<string> renderingFunctins =
                VisualFunctionElementProviderHelper.GetRenderingFunctions(data.DataSourceId.InterfaceType).
                Select(f => f.CompositName);

            if (renderingFunctins.Count() > 0)
            {
                this.Bindings.Add("RenderingFunctions", renderingFunctins);
                this.Bindings.Add("SelectedRenderingFunction", renderingFunctins.First());
            }
            else
            {
                FlowControllerServicesContainer container = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
                IManagementConsoleMessageService service = container.GetService<IManagementConsoleMessageService>();
                service.CloseCurrentView();
            }
        }



        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            IData data = ((DataEntityToken)this.EntityToken).Data;

            WorkflowActionToken workflowActionToken = (WorkflowActionToken)this.ActionToken;

            string selectedFunction = this.GetBinding<string>("SelectedRenderingFunction");

            RenderingFunctionNames renderingFunctionName =
                (from f in VisualFunctionElementProviderHelper.GetRenderingFunctions(data.DataSourceId.InterfaceType)
                 where f.CompositName == selectedFunction
                 select f).Single();

            IVisualFunction function =  VisualFunctionElementProviderHelper.GetVisualFunction(renderingFunctionName);


            if (workflowActionToken.Payload == "Edit")
            {
                this.ExecuteWorklow(function.GetDataEntityToken(), typeof(EditVisualFunctionWorkflow));
            }
            else if (workflowActionToken.Payload == "Delete")
            {
                this.ExecuteWorklow(function.GetDataEntityToken(), typeof(DeleteVisualFunctionWorkflow));
            }
            else
            {
                throw new NotImplementedException();
            }
        }
    }
}
