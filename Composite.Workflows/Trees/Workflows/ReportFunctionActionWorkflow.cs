using System;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.Elements;
using Composite.Functions;
using Composite.Serialization;
using Composite.Trees;
using Composite.Workflow;


namespace Composite.Workflows.Trees.Workflows
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class ReportFunctionActionWorkflow : Composite.Workflow.Activities.FormsWorkflow
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
            XDocument result = (XDocument)baseRuntimeTreeNode.GetValue();
            
            this.Bindings.Add("Label", reportFunctionActionNode.DocumentLabelDynamicValueHelper.ReplaceValues(dynamicValuesHelperReplaceContext));
            this.Bindings.Add("Icon", reportFunctionActionNode.DocumentIcon.ResourceName);
            this.Bindings.Add("HtmlBlob", result.ToString());
        }
    }
}
