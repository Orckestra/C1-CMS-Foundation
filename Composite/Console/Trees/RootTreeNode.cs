using System;
using System.Collections.Generic;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Trees.Foundation;
using Composite.C1Console.Trees.Foundation.AttachmentPoints;


namespace Composite.C1Console.Trees
{
    /// <summary>
    /// This node is a virtual node represending the element that the tree is attached under.
    /// </summary>    
    internal class RootTreeNode : TreeNode
    {
        public RootTreeNode()
        {
            this.Id = StringConstants.RootNodeId;
        }


        public override IEnumerable<EntityToken> GetEntityTokens(EntityToken childEntityToken, TreeNodeDynamicContext dynamicContext)
        {
            TreeSimpleElementEntityToken treeSimpleElementEntityToken = childEntityToken as TreeSimpleElementEntityToken;
            if (treeSimpleElementEntityToken != null)
            {
                yield return treeSimpleElementEntityToken.ParentEntityToken;
            }
            else
            {
                foreach (IAttachmentPoint attachmentPoint in this.Tree.AttachmentPoints)
                {
                    foreach (EntityToken entityToken in attachmentPoint.GetEntityTokens(childEntityToken, dynamicContext))
                    {
                        yield return entityToken;
                    }
                }
            }
        }



        public override AncestorResult GetParentEntityToken(EntityToken childEntityToken, Type parentInterfaceOfInterest, TreeNodeDynamicContext dynamicContext)
        {            
            throw new NotImplementedException("Should never get called");            
        }


        protected override IEnumerable<Element> OnGetElements(EntityToken parentEntityToken, TreeNodeDynamicContext dynamicContext)
        {
            foreach (TreeNode childTreeNode in this.ChildNodes)
            {
                foreach (Element element in childTreeNode.GetElements(parentEntityToken, dynamicContext))
                {                    
                    element.ElementHandle.Piggyback[StringConstants.PiggybagTreeId] = this.Tree.TreeId;
                    
                    yield return element;
                }
            }
        }



        public override string ToString()
        {
            return "RootTreeNode, Id = " + this.Id;
        }
    }
}
