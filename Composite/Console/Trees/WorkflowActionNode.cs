using System;
using System.Collections.Generic;
using Composite.C1Console.Elements;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Security;
using Composite.Core.Types;
using Composite.C1Console.Workflow;


namespace Composite.C1Console.Trees
{
    internal sealed class WorkflowActionNode : ActionNode
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
