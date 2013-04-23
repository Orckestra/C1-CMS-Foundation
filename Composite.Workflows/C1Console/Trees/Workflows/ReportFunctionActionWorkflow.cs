using System;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.C1Console.Elements;
using Composite.Functions;
using Composite.C1Console.Workflow;
using Composite.Core.ResourceSystem;
using Composite.Core;


namespace Composite.C1Console.Trees.Workflows
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class ReportFunctionActionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public ReportFunctionActionWorkflow()
        {
            InitializeComponent();
        }

        
        private void initializeCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            ReportFunctionActionNode reportFunctionActionNode = (ReportFunctionActionNode)ActionNode.Deserialize(this.Payload);

            Dictionary<string, string> piggybag = PiggybagSerializer.Deserialize(this.ExtraPayload);

            var replaceContext = new DynamicValuesHelperReplaceContext(this.EntityToken, piggybag);

            XElement markup = reportFunctionActionNode.FunctionMarkupDynamicValuesHelper.ReplaceValues(replaceContext);                       

            BaseRuntimeTreeNode baseRuntimeTreeNode = FunctionTreeBuilder.Build(markup);
            XDocument result = baseRuntimeTreeNode.GetValue() as XDocument;

            if (result == null)
            {
                string message = string.Format(StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "TreeValidationError.ReportFunctionAction.WrongReturnValue"), "XDocument");
                
                Log.LogError("TreeFacade", message);

                throw new InvalidOperationException(message);
            }

            this.Bindings.Add("Label", reportFunctionActionNode.DocumentLabelDynamicValueHelper.ReplaceValues(replaceContext));
            this.Bindings.Add("Icon", reportFunctionActionNode.DocumentIcon.ResourceName);
            this.Bindings.Add("HtmlBlob", result.ToString());
        }
    }
}
