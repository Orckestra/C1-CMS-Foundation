using System;
using Composite.C1Console.Actions.Data;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;


namespace Composite.C1Console.Trees
{
	internal sealed class GenericDeleteDataActionNode : ActionNode
	{
        protected override void OnAddAction(Action<ElementAction> actionAdder, EntityToken entityToken, TreeNodeDynamicContext dynamicContext, DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext)
        {
            actionAdder(new ElementAction(new ActionHandle(new ProxyDataActionToken(ActionIdentifier.Delete,this.PermissionTypes)))
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
