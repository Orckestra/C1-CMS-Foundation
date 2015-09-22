using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Events;
using Composite.C1Console.Elements;
using Composite.Core.Logging;
using Composite.Core.ResourceSystem.Icons;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.Core.WebClient.Services.TreeServiceObjects;
using Composite.Core.WebClient.Services.TreeServiceObjects.ExtensionMethods;


namespace Composite.Core.WebClient.FlowMediators
{
    internal class NullRootEntityToken : EntityToken
    {
        public override string Type { get { return "null"; } }
        public override string Source { get { return "null"; } }
        public override string Id { get { return "null"; } }
        public override string Serialize() { return "NullRootEntiryToken"; }
    }

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class TreeServicesFacade
    {
        /// <exclude />
        public static ClientElement GetRoot()
        {
                List<Element> roots = ElementFacade.GetRoots(null).ToList();

                if (roots.Count == 0)
                {
                    // user with out any access logging in - return "empty root"
                    roots = ElementFacade.GetRootsWithNoSecurity().ToList();
                    if (roots.Count == 0) throw new InvalidOperationException("No roots specified");
                    if (roots.Count > 1) throw new InvalidOperationException("More than one root specified");

                    var emptyElement = new Element(new ElementHandle("nullRoot", new NullRootEntityToken()));
                    emptyElement.VisualData = new ElementVisualizedData { HasChildren = false, Label = "nullroot", Icon = CommonElementIcons.Folder };

                    roots.Clear();
                    roots.Add(emptyElement);
                }
                else if (roots.Count > 1)
                {
                    throw new InvalidOperationException("More than one root specified");
                }

                return roots[0].GetClientElement();
        }



        /// <exclude />
        public static List<ClientElement> GetRoots(string providerHandle, string serializedSearchToken)
        {
                SearchToken searchToken = null;
                if (!string.IsNullOrEmpty(serializedSearchToken))
                {
                    searchToken = SearchToken.Deserialize(serializedSearchToken);
                }

                List<Element> roots;
                if (UserSettings.ForeignLocaleCultureInfo == null || UserSettings.ForeignLocaleCultureInfo.Equals(UserSettings.ActiveLocaleCultureInfo))
                {
                    roots = ElementFacade.GetRoots(new ElementProviderHandle(providerHandle), searchToken).ToList();
                }
                else
                {
                    roots = ElementFacade.GetForeignRoots(new ElementProviderHandle(providerHandle), searchToken).ToList();
                }

                return roots.ToClientElementList();
        }



        /// <exclude />
        public static List<string> GetLocaleAwarePerspectiveElements()
        {
            IEnumerable<Element> elements = ElementFacade.GetPerspectiveElements(true);

            List<string> clientElementKeys = new List<string>();
            foreach (Element element in elements)
            {
                if (element.IsLocaleAware)
                {
                    clientElementKeys.Add(element.GetClientElement().ElementKey);
                }
            }

            return clientElementKeys;
        }



        /// <exclude />
        public static List<ClientElement> GetPerspectiveElementsWithNoSecurity()
        {
            return ElementFacade.GetPerspectiveElementsWithNoSecurity().ToList().ToClientElementList();
        }



        /// <exclude />
        public static List<ClientElement> GetChildren(string providerName, string serializedEntityToken, string piggybag, string serializedSearchToken)
        {
                //LoggingService.LogVerbose("RGB(255, 0, 255)TreeServiceFacade", "----- Start -----------------------------------------------");

                int t1 = Environment.TickCount;

                EntityToken entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);
                ElementHandle elementHandle = new ElementHandle(providerName, entityToken, piggybag);

                //int t2 = Environment.TickCount;

                SearchToken searchToken = null;
                if (!string.IsNullOrEmpty(serializedSearchToken))
                {
                    searchToken = SearchToken.Deserialize(serializedSearchToken);
                }

                List<Element> childElements;
                if (UserSettings.ForeignLocaleCultureInfo == null || UserSettings.ForeignLocaleCultureInfo.Equals(UserSettings.ActiveLocaleCultureInfo))
                {
                    childElements = ElementFacade.GetChildren(elementHandle, searchToken).ToList();
                }
                else
                {
                    childElements = ElementFacade.GetForeignChildren(elementHandle, searchToken).ToList();
                }

                //int t3 = Environment.TickCount;

                List<ClientElement> resultList = childElements.ToClientElementList();

                int t4 = Environment.TickCount;

                //LoggingService.LogVerbose("RGB(255, 0, 255)TreeServiceFacade", string.Format("ElementHandle: {0} ms", t2 - t1));
                //LoggingService.LogVerbose("RGB(255, 0, 255)TreeServiceFacade", string.Format("GetChildren: {0} ms", t3 - t2));
                //LoggingService.LogVerbose("RGB(255, 0, 255)TreeServiceFacade", string.Format("ToClientElementList: {0} ms", t4 - t3));
                //LoggingService.LogVerbose("RGB(255, 0, 255)TreeServiceFacade", string.Format("Total: {0} ms", t4 - t1));
                //LoggingService.LogVerbose("RGB(255, 0, 255)TreeServiceFacade", "----- End -------------------------------------------------");

                //LoggingService.LogVerbose("TreeServiceFacade", string.Format("GetChildren: {0} ms", t4 - t1));

                return resultList;
        }



        /// <exclude />
        public static List<RefreshChildrenInfo> GetMultipleChildren(List<RefreshChildrenParams> nodesToBeRefreshed)
        {
                int t1 = Environment.TickCount;

                var result = new List<RefreshChildrenInfo>();

                foreach (RefreshChildrenParams node in nodesToBeRefreshed)
                {
                    EntityToken entityToken;

                    try
                    {
                        entityToken = EntityTokenSerializer.Deserialize(node.EntityToken);
                    }
                    catch (EntityTokenSerializerException)
                    {
                        continue;
                    }
                    
                    var elementHandle = new ElementHandle(node.ProviderName, entityToken, node.Piggybag);
                    SearchToken searchToken = null;
                    if (!string.IsNullOrEmpty(node.SearchToken))
                    {
                        searchToken = SearchToken.Deserialize(node.SearchToken);
                    }

                    List<Element> childElements;
                    if (UserSettings.ForeignLocaleCultureInfo == null || UserSettings.ForeignLocaleCultureInfo.Equals(UserSettings.ActiveLocaleCultureInfo))
                    {
                        childElements = ElementFacade.GetChildren(elementHandle, searchToken).ToList();
                    }
                    else
                    {
                        childElements = ElementFacade.GetForeignChildren(elementHandle, searchToken).ToList();
                    }

                    result.Add(new RefreshChildrenInfo
                      {
                          ElementKey = GetElementKey(node.ProviderName, node.EntityToken, node.Piggybag),
                          ClientElements = childElements.ToClientElementList()
                      });
                }

                int t2 = Environment.TickCount;

                //LoggingService.LogVerbose("TreeServiceFacade", string.Format("GetMultipleChildren: {0} ms", t2 - t1));

                return result;
        }



        /// <exclude />
        public static List<ClientLabeledProperty> GetLabeledProperties(string providerName, string serializedEntityToken, string piggybag)
        {
                EntityToken elementEntityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);
                ElementHandle elementHandle = new ElementHandle(providerName, elementEntityToken, piggybag);

                IEnumerable<LabeledProperty> labeledProperties;
                if (UserSettings.ForeignLocaleCultureInfo == null || UserSettings.ForeignLocaleCultureInfo.Equals(UserSettings.ActiveLocaleCultureInfo))
                {
                    labeledProperties = ElementFacade.GetLabeledProperties(elementHandle);
                }
                else
                {
                    labeledProperties = ElementFacade.GetForeignLabeledProperties(elementHandle);
                }


                return
                    (from property in labeledProperties
                     select new ClientLabeledProperty(property)).ToList();
        }



        /// <exclude />
        public static void ExecuteElementAction(string providerName, string serializedEntityToken, string piggybag, string serializedActionToken, string consoleId)
        {
            using (DebugLoggingScope.MethodInfoScope)
            {
                EntityToken entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);
                if (!entityToken.IsValid())
                {
                    ShowInvalidEntityMessage(consoleId);
                    return;
                }

                var elementHandle = new ElementHandle(providerName, entityToken, piggybag);

                ActionToken actionToken = ActionTokenSerializer.Deserialize(serializedActionToken, true);
                ActionHandle actionHandle = new ActionHandle(actionToken);

                ActionExecutionMediator.ExecuteElementAction(elementHandle, actionHandle, consoleId);
            }
        }



        /// <exclude />
        public static bool ExecuteElementDraggedAndDropped(string draggedElementProviderName, string draggedElementSerializedEntityToken, string draggedElementPiggybag, string newParentElementProviderName, string newParentElementSerializedEntityToken, string newParentElementPiggybag, int dropIndex, string consoleId, bool isCopy)
        {
            if (draggedElementProviderName != newParentElementProviderName)
            {
                throw new InvalidOperationException("Only drag'n'drop internal in element providers are allowed");
            }

            EntityToken draggedElementEntityToken = EntityTokenSerializer.Deserialize(draggedElementSerializedEntityToken);
            ElementHandle draggedElementHandle = new ElementHandle(draggedElementProviderName, draggedElementEntityToken, draggedElementPiggybag);

            EntityToken newParentElementEntityToken = EntityTokenSerializer.Deserialize(newParentElementSerializedEntityToken);
            ElementHandle newParentdElementHandle = new ElementHandle(newParentElementProviderName, newParentElementEntityToken, newParentElementPiggybag);

            return ActionExecutionMediator.ExecuteElementDraggedAndDropped(draggedElementHandle, newParentdElementHandle, dropIndex, consoleId, isCopy);                            
        }


        /// <exclude />
        public static List<RefreshChildrenInfo> FindEntityToken(string serializedAncestorEntityToken, string serializedEntityToken, List<RefreshChildrenParams> openedNodes)
        {
            Verify.ArgumentNotNullOrEmpty(serializedAncestorEntityToken, "serializedAncestorEntityToken");
            Verify.ArgumentNotNullOrEmpty(serializedEntityToken, "serializedEntityToken");

            EntityToken ancestorEntityToken = EntityTokenSerializer.Deserialize(serializedAncestorEntityToken);
            EntityToken entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);

            return FindEntityToken(ancestorEntityToken, entityToken, openedNodes);
        }

        
        internal static List<RefreshChildrenInfo> FindEntityToken(EntityToken ancestorEntityToken, EntityToken entityToken, List<RefreshChildrenParams> openedNodes)
        {
            foreach (List<EntityToken> ancestorChain in GetAncestorChains(ancestorEntityToken, entityToken))
            {
                if (ancestorChain == null || ancestorChain.Count == 0)
                {
                    continue;
                }

                List<EntityToken> ancestorEntityTokens = ancestorChain.ToList();

                int lastAlreadyOpenedNodeIndex = 0;
                while (lastAlreadyOpenedNodeIndex + 1 < ancestorChain.Count
                       && openedNodes.Any(node => EntityTokenSerializer.Deserialize(node.EntityToken).Equals(ancestorEntityTokens[lastAlreadyOpenedNodeIndex + 1])))
                {
                    lastAlreadyOpenedNodeIndex++;
                }

                var openNode = openedNodes.FirstOrDefault(node => EntityTokenSerializer.Deserialize(node.EntityToken).Equals(ancestorEntityTokens[lastAlreadyOpenedNodeIndex]));
                if (openNode == null)
                {
                    return null;
                }

                // Expanding all the nodes under the root
                var nodesToBeExpanded = new List<EntityToken>();
                nodesToBeExpanded.AddRange(ancestorEntityTokens.Skip(lastAlreadyOpenedNodeIndex));
                nodesToBeExpanded.RemoveAt(nodesToBeExpanded.Count - 1);
                // Last node is a target one, so doesn't have to be expanded
                nodesToBeExpanded.AddRange(openedNodes.Select(s => EntityTokenSerializer.Deserialize(s.EntityToken)));

                var result = new List<RefreshChildrenInfo>();
                // Expanding all the nodes, and checking if all of the nodes in the ancestor chain is marked 
                // as seen in TreeLockBehaviour
                bool success =
                    ExpandNodesRec(openNode.EntityToken,
                               openNode.ProviderName,
                               openNode.Piggybag,
                               nodesToBeExpanded,
                               result,
                               ancestorEntityTokens);

                if (success)
                {
                    return result;
                }
            }
            return null;
        }

        /// <summary>
        /// Expands nodes recurcively.
        /// </summary>
        /// <param name="entityToken"></param>
        /// <param name="elementProviderName"></param>
        /// <param name="piggybag"></param>
        /// <param name="entityTokensToBeExpanded"></param>
        /// <param name="resultList"></param>
        /// <param name="keyNodes"></param>
        /// <returns>Returns false, if there's a key node, that has [element.TreeLockBehavior == None]</returns>
        private static bool ExpandNodesRec(string entityToken, string elementProviderName, string piggybag, 
            List<EntityToken> entityTokensToBeExpanded, List<RefreshChildrenInfo> resultList, List<EntityToken> keyNodes)
        {
            if (resultList.Count > 1000) // Preventing an infinite loop
            {
                return true;
            }
            List<ClientElement> children = GetChildren(elementProviderName, entityToken, piggybag, null);

            var refreshChildrenInfo = new RefreshChildrenInfo
            {
                ElementKey = GetElementKey(elementProviderName, entityToken, piggybag),
                ClientElements = children
            };
            resultList.Add(refreshChildrenInfo);

            foreach (ClientElement child in children)
            {
                var childEntityToken = EntityTokenSerializer.Deserialize(child.EntityToken);

                if (!child.TreeLockEnabled
                    && keyNodes.Contains(childEntityToken))
                {
                    return false;
                }

                if (entityTokensToBeExpanded.Contains(childEntityToken))
                {
                    if (ExpandNodesRec(child.EntityToken, 
                                       child.ProviderName, 
                                       child.Piggybag, 
                                       entityTokensToBeExpanded,
                                       resultList, 
                                       keyNodes))
                    {
                        return true;
                    }
                }
                else
                {
                    if (keyNodes.Contains(childEntityToken))
                    {
                        return true;
                    }
                }
            }

            return false;
        }



        // TODO: Move logic to another place
        private static string GetElementKey(string providerName, string entityToken, string piggybag)
        {
            return providerName + entityToken + piggybag;
        }



        private static IEnumerable<List<EntityToken>> GetAncestorChains(EntityToken ancestorEnitityToken, EntityToken entityToken)
        {
            foreach (List<EntityToken> ancestorChain in GetAncestorChains(entityToken, 20))
            {
                if (ancestorChain.Count > 1)
                {
                    int index = ancestorChain.IndexOf(ancestorEnitityToken);
                    if(index < 0) continue;

                    yield return (index == 0) ? ancestorChain : ancestorChain.GetRange(index, ancestorChain.Count - index);
                }
            }
        }



        private static IEnumerable<List<EntityToken>> GetAncestorChains(EntityToken descendant, int deep, List<EntityToken> visitedParents = null)
        {
            if (deep == 0)
            {
                yield return new List<EntityToken>();
                yield break;
            }

            if (visitedParents == null)
            {
                visitedParents = new List<EntityToken>();
            }
            visitedParents.Add(descendant);

            List<EntityToken> parents = ParentsFacade.GetAllParents(descendant);            
            if (parents.Count == 0)
            {
                var newChain = new List<EntityToken> {descendant};
                yield return newChain;
                yield break;
            }

            // NOTE: A workaround which gives "AllFunctionElementProvider" search results less priority that other function element providers
            if (parents.Count == 2 && parents[0].Id != null && parents[0].Id.StartsWith("ROOT:AllFunctionsElementProvider"))
            {
                parents.Reverse();
            }

            foreach (var parent in parents)
            {                
                foreach (List<EntityToken> chain in GetAncestorChains(parent, deep - 1, visitedParents))
                {
                    chain.Add(descendant);
                    yield return chain;
                }
            }
        }



        private static void ShowInvalidEntityMessage(string consoleId)
        {
            // TODO: Add tree refreshing, localize message
            var msgBoxEntry = new MessageBoxMessageQueueItem { DialogType = DialogType.Error, Title = "Data item not found", Message = "This item seems to have been deleted.\n\nPlease update the tree by using the context menu \"Refresh\" command." };
            ConsoleMessageQueueFacade.Enqueue(msgBoxEntry, consoleId);
        }
    }
}
