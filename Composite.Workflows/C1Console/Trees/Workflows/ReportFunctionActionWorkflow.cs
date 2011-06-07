using System;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.C1Console.Elements;
using Composite.Functions;
using Composite.Core.Serialization;
using Composite.C1Console.Trees;
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
            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(this.Payload);

            ReportFunctionActionNode reportFunctionActionNode = (ReportFunctionActionNode)ActionNode.Deserialize(this.Payload);

            Dictionary<string, string> piggybag = PiggybagSerializer.Deserialize(this.ExtraPayload);

            DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext = new DynamicValuesHelperReplaceContext
            {
                PiggybagDataFinder = new PiggybagDataFinder(piggybag, this.EntityToken)
            };

            XElement markup = reportFunctionActionNode.FunctionMarkupDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext);                       

            BaseRuntimeTreeNode baseRuntimeTreeNode = FunctionTreeBuilder.Build(markup);
            XDocument result = baseRuntimeTreeNode.GetValue() as XDocument;

            if (result == null)
            {
                string message = string.Format(StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "TreeValidationError.ReportFunctionAction.WrongReturnValue"), "XDocument");
                
                Log.LogError("TreeFacade", message);

                throw new InvalidOperationException(message);
            }
            
            this.Bindings.Add("Label", reportFunctionActionNode.DocumentLabelDynamicValueHelper.ReplaceValues(dynamicValuesHelperReplaceContext));
            this.Bindings.Add("Icon", reportFunctionActionNode.DocumentIcon.ResourceName);
            this.Bindings.Add("HtmlBlob", result.ToString());
        }
    }
}
