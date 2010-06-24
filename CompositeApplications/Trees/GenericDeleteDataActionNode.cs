using System;
using Composite.Elements;
using Composite.ResourceSystem;
using Composite.Security;
using Composite.Workflow;


namespace Composite.Trees
{
	public sealed class GenericDeleteDataActionNode : ActionNode
	{
        protected override void OnAddAction(Action<ElementAction> actionAdder, EntityToken entityToken, TreeNodeDynamicContext dynamicContext, DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext)
        {
            actionAdder(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Workflows.Trees.Workflows.GenericDeleteDataWorkflow"), this.PermissionTypes)))
            {
                VisualData = CreateActionVisualizedData(dynamicValuesHelperReplaceContext)
            });
        }



        protected override void OnInitialize()
        {
            if ((this.OwnerNode is DataElementsTreeNode) == false)
            {
                AddValidationError("TreeValidationError.GenericDeleteDataAction.OwnerIsNotDataNode");
            }
        }



        public override string ToString()
        {
            return string.Format("GenericDeleteDataActionNode, Label = {0}", this.Label);
        }
	}
}
