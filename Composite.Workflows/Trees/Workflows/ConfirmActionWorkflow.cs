using System;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.Elements;
using Composite.Functions;
using Composite.ResourceSystem;
using Composite.Trees;
using Composite.Data;


namespace Composite.Workflows.Trees.Workflows
{
    public sealed partial class ConfirmActionWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public ConfirmActionWorkflow()
        {
            InitializeComponent();
        }

      

        private void initializeCodeActivity_UpdateBinding_ExecuteCode(object sender, EventArgs e)
        {
            ConfirmActionNode confirmActionNode = (ConfirmActionNode)ActionNode.Deserialize(this.Payload);

            DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext = CreateDynamicValuesHelperReplaceContext();

            this.Bindings.Add("Label", confirmActionNode.ConfirmTitleDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext));
            this.Bindings.Add("Message", confirmActionNode.ConfirmMessageDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext));
        }



        private void showConfirmCodeActivity_ExecuteFunction_ExecuteCode(object sender, EventArgs e)
        {
            ConfirmActionNode confirmActionNode = (ConfirmActionNode)ActionNode.Deserialize(this.Payload);

            DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext = CreateDynamicValuesHelperReplaceContext();

            AttributeDynamicValuesHelper attributeDynamicValuesHelper = new AttributeDynamicValuesHelper(confirmActionNode.FunctionMarkup);
            attributeDynamicValuesHelper.Initialize(confirmActionNode.OwnerNode);
            XElement markup = confirmActionNode.FunctionMarkupDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext);

            BaseRuntimeTreeNode baseRuntimeTreeNode = FunctionTreeBuilder.Build(markup);
            object value = baseRuntimeTreeNode.GetValue();
        }        
    }
}
