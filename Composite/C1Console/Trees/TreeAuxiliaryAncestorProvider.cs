using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Security;
using Composite.C1Console.Trees.Foundation;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Data;


namespace Composite.C1Console.Trees
{
    internal sealed class TreeAuxiliaryAncestorProvider : IAuxiliarySecurityAncestorProvider
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


                if (entityToken is TreeSimpleElementEntityToken
                    || entityToken is TreeFunctionElementGeneratorEntityToken)
                {
                    var parentEntityTokenSource = entityToken as IEntityTokenContainingParentEntityToken;

                    try
                    {
                        result.Add(entityToken, new[] { parentEntityTokenSource.GetParentEntityToken() });
                    }
                    catch (Exception ex)
                    {
                        string treeId;

                        if (entityToken is TreeSimpleElementEntityToken)
                        {
                            treeId = (entityToken as TreeSimpleElementEntityToken).TreeNodeId;
                        }
                        else if (entityToken is TreeFunctionElementGeneratorEntityToken)
                        {
                            treeId = (entityToken as TreeFunctionElementGeneratorEntityToken).TreeNodeId;
                        }
                        else
                        {
                            throw new InvalidOperationException("This code should not be reachable.");
                        }

                        Log.LogError("TreeFacade", "The tree '{0}' failed to return parent entity tokens and are ignored", treeId);
                        Log.LogError("TreeFacade", ex);
                    }
                }
                else if (entityToken is TreeDataFieldGroupingElementEntityToken)
                {
                    TreeDataFieldGroupingElementEntityToken treeDataFieldGroupingElementEntityToken = entityToken as TreeDataFieldGroupingElementEntityToken;
                    string treeId = entityToken.Source;

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
                        Log.LogError("TreeFacade", $"The tree '{treeId}' failed to return parent entity tokens and are ignored");
                        Log.LogError("TreeFacade", ex);
                    }
                }
                else if (entityToken is DataEntityToken)
                {
                    DataEntityToken dataEntityToken = entityToken as DataEntityToken;

                    Type interfaceType = dataEntityToken.InterfaceType;

                    foreach (Tree tree in TreeFacade.AllTrees)
                    {
                        List<TreeNode> treeNodes;
                        if (!tree.BuildProcessContext.DataInteraceToTreeNodes.TryGetValue(interfaceType, out treeNodes)) continue;
                        
                        IEnumerable<EntityToken> concatList = null;                        

                        foreach (TreeNode treeNode in treeNodes)
                        {
                            try
                            {                              
                                dynamicContext.CurrentTreeNode = treeNode;

                                concatList = concatList.ConcatOrDefault(treeNode.ParentNode.GetEntityTokens(entityToken, dynamicContext));
                            }
                            catch (Exception ex)
                            {
                                Log.LogError("TreeFacade", $"The tree '{treeNode.Tree.TreeId}' failed to return parent entity tokens and are ignored");
                                Log.LogError("TreeFacade", ex);
                            }
                        }

                        if (concatList != null)
                        {
                            // Filtering the current element to avoid loops while resolving security
                            concatList = concatList.Where(e => !entityToken.Equals(e));

                            IEnumerable<EntityToken> existingList;
                            if (result.TryGetValue(entityToken, out existingList))
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
                else if (entityToken is TreePerspectiveEntityToken)
                {
                    result.Add(entityToken, new[] { TreeSharedRootsFacade.SharedRootFolders[entityToken.Id].AttachmentPoint.AttachingPoint.EntityToken });
                }
            }

            return result;
        }
    }
}
