using System;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.C1Console.Elements;
using Composite.Functions;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Trees;
using Composite.Data;


namespace Composite.C1Console.Trees.Workflows
{
    public sealed partial class ConfirmActionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
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
