using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Logging;
using Composite.Security;


namespace Composite.Trees
{
    public sealed class TreeAuxiliaryAncestorProvider : IAuxiliarySecurityAncestorProvider
    {
        public Dictionary<EntityToken, IEnumerable<EntityToken>> GetParents(IEnumerable<EntityToken> entityTokens)
        {
            Dictionary<EntityToken, IEnumerable<EntityToken>> result = new Dictionary<EntityToken, IEnumerable<EntityToken>>();

            foreach (EntityToken entityToken in entityTokens)
            {
                TreeNodeDynamicContext dynamicContext = new TreeNodeDynamicContext(TreeNodeDynamicContextDirection.Up)
                {
                    CurrentEntityToken = entityToken
                };


                if ((entityToken is TreeSimpleElementEntityToken) == true)
                {
                    TreeSimpleElementEntityToken treeSimpleElementEntityToken = entityToken as TreeSimpleElementEntityToken;
                    string treeId = treeSimpleElementEntityToken.Source;

                    try
                    {
                        Tree tree = TreeFacade.GetTree(treeId);

                        string treeNodeId = treeSimpleElementEntityToken.TreeNodeId;

                        TreeNode treeNode = tree.GetTreeNode(treeNodeId);
                        dynamicContext.CurrentTreeNode = treeNode;

                        IEnumerable<EntityToken> resultEntityTokens = treeNode.ParentNode.GetEntityTokens(entityToken, dynamicContext);
                        resultEntityTokens = treeNode.FilterParentGeneretedEntityTokens(entityToken, resultEntityTokens, dynamicContext);

                        result.Add(entityToken, resultEntityTokens);
                    }
                    catch (Exception ex)
                    {
                        LoggingService.LogError("TreeFacade", string.Format("The tree '{0}' failed to return parent entity tokens and are ignored", treeId));
                        LoggingService.LogError("TreeFacade", ex);
                    }
                }
                else if ((entityToken is TreeFunctionElementGeneratorEntityToken) == true)
                {
                    TreeFunctionElementGeneratorEntityToken treeFunctionElementGeneratorEntityToken = entityToken as TreeFunctionElementGeneratorEntityToken;
                    string treeId = treeFunctionElementGeneratorEntityToken.Source;

                    try
                    {
                        Tree tree = TreeFacade.GetTree(treeId);

                        string treeNodeId = treeFunctionElementGeneratorEntityToken.TreeNodeId;

                        TreeNode treeNode = tree.GetTreeNode(treeNodeId);
                        dynamicContext.CurrentTreeNode = treeNode;

                        IEnumerable<EntityToken> resultEntityTokens = treeNode.ParentNode.GetEntityTokens(entityToken, dynamicContext);
                        resultEntityTokens = treeNode.FilterParentGeneretedEntityTokens(entityToken, resultEntityTokens, dynamicContext);

                        result.Add(entityToken, resultEntityTokens);
                    }
                    catch (Exception ex)
                    {
                        LoggingService.LogError("TreeFacade", string.Format("The tree '{0}' failed to return parent entity tokens and are ignored", treeId));
                        LoggingService.LogError("TreeFacade", ex);
                    }
                }
                else if ((entityToken is TreeDataFieldGroupingElementEntityToken) == true)
                {
                    TreeDataFieldGroupingElementEntityToken treeDataFieldGroupingElementEntityToken = entityToken as TreeDataFieldGroupingElementEntityToken;
                    string treeId = treeDataFieldGroupingElementEntityToken.Source;

                    try
                    {
                        Tree tree = TreeFacade.GetTree(treeId);

                        string treeNodeId = treeDataFieldGroupingElementEntityToken.TreeNodeId;
                        TreeNode treeNode = tree.GetTreeNode(treeNodeId);

                        dynamicContext.FieldGroupingValues = treeDataFieldGroupingElementEntityToken.GroupingValues;
                        dynamicContext.FieldFolderRangeValues = treeDataFieldGroupingElementEntityToken.FolderRangeValues;
                        dynamicContext.CurrentTreeNode = treeNode;

                        result.Add(entityToken, treeNode.ParentNode.GetEntityTokens(entityToken, dynamicContext));
                    }
                    catch (Exception ex)
                    {
                        LoggingService.LogError("TreeFacade", string.Format("The tree '{0}' failed to return parent entity tokens and are ignored", treeId));
                        LoggingService.LogError("TreeFacade", ex);
                    }
                }
                else if ((entityToken is DataEntityToken) == true)
                {
                    DataEntityToken dataEntityToken = entityToken as DataEntityToken;

                    Type interfaceType = dataEntityToken.InterfaceType;

                    foreach (Tree tree in TreeFacade.AllTrees)
                    {
                        List<TreeNode> treeNodes;
                        if (tree.BuildProcessContext.DataInteraceToTreeNodes.TryGetValue(interfaceType, out treeNodes) == false) continue;

                        IEnumerable<EntityToken> concatList = null;

                        foreach (TreeNode treeNode in treeNodes)
                        {
                            try
                            {
                                dynamicContext.CurrentTreeNode = treeNode;
                                if (concatList == null)
                                {
                                    concatList = treeNode.ParentNode.GetEntityTokens(entityToken, dynamicContext);
                                }
                                else
                                {
                                    concatList = concatList.Concat(treeNode.ParentNode.GetEntityTokens(entityToken, dynamicContext));
                                }
                            }
                            catch (Exception ex)
                            {
                                LoggingService.LogError("TreeFacade", string.Format("The tree '{0}' failed to return parent entity tokens and are ignored", treeNode.Tree.TreeId));
                                LoggingService.LogError("TreeFacade", ex);
                            }
                        }

                        if (concatList != null)
                        {
                            IEnumerable<EntityToken> existingList = null;
                            if (result.TryGetValue(entityToken, out existingList) == true)
                            {
                                result[entityToken] = existingList.Concat(concatList);
                            }
                            else
                            {
                                result.Add(entityToken, concatList);
                            }
                        }
                    }
                }
            }

            return result;
        }
    }
}
