using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Elements;
using Composite.Elements.Plugins.ElementAttachingProvider;
using Composite.Linq;
using Composite.Logging;
using Composite.ResourceSystem;
using Composite.Security;
using Composite.Trees.Foundation;
using Composite.Trees.Foundation.AttachmentPoints;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Trees
{
    [ConfigurationElementType(typeof(NonConfigurableElementAttachingProvider))]
    internal class TreeElementAttachingProvider : IMultibleResultElementAttachingProvider
    {
        public ElementProviderContext Context
        {
            get;
            set;
        }



        public bool HaveCustomChildElements(EntityToken parentEntityToken, Dictionary<string, string> piggybag)
        {
            foreach (Tree tree in TreeFacade.GetTreesByEntityToken(parentEntityToken))
            {
                if (tree.RootTreeNode.ChildNodes.Count() > 0) return true;
            }

            return false;
        }



        public ElementAttachingProviderResult GetAlternateElementList(EntityToken parentEntityToken, Dictionary<string, string> piggybag)
        {
            throw new NotImplementedException("Will never get called");
        }



        public IEnumerable<ElementAttachingProviderResult> GetAlternateElementLists(EntityToken parentEntityToken, Dictionary<string, string> piggybag)
        {
            IEnumerable<Tree> trees = TreeFacade.GetTreesByEntityToken(parentEntityToken);

            foreach (Tree tree in trees)
            {
                foreach (IAttachmentPoint attachmentPoint in tree.GetAttachmentPoints(parentEntityToken))
                {
                    TreeNodeDynamicContext dynamicContext = new TreeNodeDynamicContext(TreeNodeDynamicContextDirection.Down)
                    {
                        ElementProviderName = this.Context.ProviderName,
                        Piggybag = piggybag,
                        CurrentEntityToken = parentEntityToken,
                        CurrentTreeNode = tree.RootTreeNode
                    };

                    ElementAttachingProviderResult result = null;
                    try
                    {
                        result = new ElementAttachingProviderResult()
                        {
                            Elements = tree.RootTreeNode.GetElements(parentEntityToken, dynamicContext).Evaluate(),
                            Position = attachmentPoint.Position,
                            PositionPriority = 0
                        };
                    }
                    catch (Exception ex)
                    {
                        LoggingService.LogError("TreeFacade", string.Format("Getting elements from the three '{0}' failed", tree.TreeId));
                        LoggingService.LogError("TreeFacade", ex);

                        Element errorElement = ShowErrorElementHelper.CreateErrorElement(
                            StringResourceSystemFacade.GetString("Composite.Trees", "KeyFacade.ErrorTreeNode.Label"),
                            tree.TreeId,
                            ex.Message);

                        result = new ElementAttachingProviderResult()
                        {
                            Elements = new List<Element>() { errorElement },
                            Position = attachmentPoint.Position,
                            PositionPriority = 0
                        };                        
                    }

                    yield return result;
                }
            }
        }



        public IEnumerable<Element> GetChildren(EntityToken parentEntityToken, Dictionary<string, string> piggybag)
        {
            string treeId = piggybag.Where(f => f.Key == StringConstants.PiggybagTreeId).Single().Value;

            Tree tree = TreeFacade.GetTree(treeId);
            if (tree == null) return new Element[] { };


            TreeNodeDynamicContext dynamicContext = new TreeNodeDynamicContext(TreeNodeDynamicContextDirection.Down)
            {
                ElementProviderName = this.Context.ProviderName,
                Piggybag = piggybag,
                CurrentEntityToken = parentEntityToken
            };

            IEnumerable<Element> result;

            try
            {
                if (parentEntityToken is TreeSimpleElementEntityToken)
                {
                    TreeNode treeNode = tree.GetTreeNode(parentEntityToken.Id);
                    if (treeNode == null) throw new InvalidOperationException("Tree is out of sync");

                    dynamicContext.CurrentTreeNode = treeNode;

                    result = treeNode.ChildNodes.GetElements(parentEntityToken, dynamicContext);
                }
                else if (parentEntityToken is TreeFunctionElementGeneratorEntityToken)
                {
                    TreeNode treeNode = tree.GetTreeNode(parentEntityToken.Id);
                    if (treeNode == null) throw new InvalidOperationException("Tree is out of sync");

                    dynamicContext.CurrentTreeNode = treeNode;

                    result = treeNode.ChildNodes.GetElements(parentEntityToken, dynamicContext);
                }
                else if (parentEntityToken is TreeDataFieldGroupingElementEntityToken)
                {
                    TreeDataFieldGroupingElementEntityToken castedParentEntityToken = parentEntityToken as TreeDataFieldGroupingElementEntityToken;
                    TreeNode treeNode = tree.GetTreeNode(parentEntityToken.Id);
                    if (treeNode == null) throw new InvalidOperationException("Tree is out of sync");

                    dynamicContext.CurrentTreeNode = treeNode;
                    dynamicContext.FieldGroupingValues = castedParentEntityToken.GroupingValues;
                    dynamicContext.FieldFolderRangeValues = castedParentEntityToken.FolderRangeValues;

                    result = treeNode.ChildNodes.GetElements(parentEntityToken, dynamicContext);
                }
                else if (parentEntityToken is DataEntityToken)
                {
                    DataEntityToken dataEntityToken = parentEntityToken as DataEntityToken;

                    Type interfaceType = dataEntityToken.InterfaceType;

                    List<TreeNode> treeNodes;
                    if (tree.BuildProcessContext.DataInteraceToTreeNodes.TryGetValue(interfaceType, out treeNodes) == false)
                    {
                        throw new InvalidOperationException();
                    }

                    string parentNodeId = piggybag.GetParentIdFromPiggybag();

                    TreeNode treeNode = treeNodes.Where(f => f.ParentNode.Id == parentNodeId).SingleOrDefault();
                    if (treeNode == null) throw new InvalidOperationException("Tree is out of sync");

                    dynamicContext.CurrentTreeNode = treeNode;

                    result = treeNode.ChildNodes.GetElements(parentEntityToken, dynamicContext);
                }
                else
                {
                    throw new NotImplementedException("Unhandled entityt token type");
                }


                result = result.Evaluate();
            }
            catch (Exception ex)
            {
                LoggingService.LogError("TreeFacade", string.Format("Getting elements from the three '{0}' failed", tree.TreeId));
                LoggingService.LogError("TreeFacade", ex);

                Element errorElement = ShowErrorElementHelper.CreateErrorElement(
                    StringResourceSystemFacade.GetString("Composite.Trees", "KeyFacade.ErrorTreeNode.Label"),
                    tree.TreeId,
                    ex.Message);

                return new Element[] { errorElement };
            }

            return result;
        }
    }
}
