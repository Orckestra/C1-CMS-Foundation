using System;
using System.Collections.Generic;
using System.Linq;
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

        private class AncestorMatch
        {
            public Type InterfaceType;
            public object KeyValue;
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
                AncestorMatch ancestorFromFilter = GetAncestorFromParentFilter(dynamicContext);

                foreach (IAttachmentPoint attachmentPoint in this.Tree.AttachmentPoints)
                {
                    if(attachmentPoint is DynamicDataItemAttachmentPoint 
                        && ancestorFromFilter != null)
                    {
                        var dynamicAttachmentPoint = attachmentPoint as DynamicDataItemAttachmentPoint;

                        if (ancestorFromFilter.InterfaceType == dynamicAttachmentPoint.InterfaceType)
                        {
                            if (dynamicAttachmentPoint.KeyValue.Equals(ancestorFromFilter.KeyValue))
                            {
                                foreach (var e in dynamicAttachmentPoint.GetEntityTokens(null, null)) {
                                    yield return e;
                                }
                            }
                            continue;
                        }
                    }

                    foreach (EntityToken entityToken in attachmentPoint.GetEntityTokens(childEntityToken, dynamicContext))
                    {
                        yield return entityToken;
                    }
                }
            }
        }


        private AncestorMatch GetAncestorFromParentFilter(TreeNodeDynamicContext dynamicContext)
        {
            var treeNode = dynamicContext.CurrentTreeNode;
            if (treeNode is DataElementsTreeNode)
            {
                var parentIdFilter = treeNode.FilterNodes.OfType<ParentIdFilterNode>().FirstOrDefault();
                if (parentIdFilter == null) return null;

                Type ancestorType = parentIdFilter.ParentFilterType;
                object key = parentIdFilter.FindParentKeyValue(dynamicContext);

                return key == null ? null : new AncestorMatch { InterfaceType = ancestorType, KeyValue = key};
            }

            if (treeNode is DataFolderElementsTreeNode
                && dynamicContext.CurrentEntityToken is TreeDataFieldGroupingElementEntityToken groupEntityToken
                && groupEntityToken.ChildGeneratingDataElementsReferenceValue != null)
            {
                return new AncestorMatch
                {
                    InterfaceType = groupEntityToken.ChildGeneratingDataElementsReferenceType,
                    KeyValue = groupEntityToken.ChildGeneratingDataElementsReferenceValue
                };
            }

            return null;
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
