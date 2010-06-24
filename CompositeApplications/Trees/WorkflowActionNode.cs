using System;
using System.Collections.Generic;
using Composite.Elements;
using Composite.ResourceSystem;
using Composite.Security;
using Composite.Types;
using Composite.Workflow;


namespace Composite.Trees
{
    public sealed class WorkflowActionNode : ActionNode
    {
        public Type WorkflowType { get; internal set; }     // Requried


        protected override void OnAddAction(Action<ElementAction> actionAdder, EntityToken entityToken, TreeNodeDynamicContext dynamicContext, DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext)
        {
            WorkflowActionToken actionToken = new WorkflowActionToken(
                WorkflowFacade.GetWorkflowType(TypeManager.SerializeType(this.WorkflowType)),
                this.PermissionTypes)
            {
                Payload = this.Serialize(),
                ExtraPayload = PiggybagSerializer.Serialize(dynamicContext.Piggybag.PreparePiggybag(dynamicContext.CurrentTreeNode, dynamicContext.CurrentEntityToken)),
                DoIgnoreEntityTokenLocking = true
            };


            actionAdder(new ElementAction(new ActionHandle(actionToken))
            {
                VisualData = CreateActionVisualizedData(dynamicValuesHelperReplaceContext)
            });
        }
    }
}
