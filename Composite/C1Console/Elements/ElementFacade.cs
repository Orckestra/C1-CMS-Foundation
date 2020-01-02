using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml;
using Composite.Core.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Elements.Foundation;
using Composite.C1Console.Elements.Foundation.PluginFacades;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.C1Console.Forms.DataServices;
using Composite.C1Console.Forms.Flows;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Core.Logging;
using Composite.Core.Instrumentation;
using Composite.Plugins.Elements.ElementProviders.VirtualElementProvider;


namespace Composite.C1Console.Elements
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ElementFacade
    {
        private static IEnumerable<EntityToken> _perspectiveEntityTokens;

        /// <exclude />
        public static IEnumerable<Element> GetRoots(SearchToken searchToken)
        {
            return GetRoots(ElementProviderRegistry.RootElementProviderName, searchToken, true, false);
        }



        /// <exclude />
        public static IEnumerable<Element> GetRoots(ElementProviderHandle elementProviderHandle, SearchToken searchToken)
        {
            if (elementProviderHandle == null) throw new ArgumentNullException("elementProviderHandle");

            return GetRoots(elementProviderHandle.ProviderName, searchToken, true, false);
        }



        /// <exclude />
        public static IEnumerable<Element> GetChildren(ElementHandle elementHandle, SearchToken searchToken)
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");

            return GetChildren(elementHandle, searchToken, true, false);
        }



        /// <exclude />
        public static IEnumerable<LabeledProperty> GetLabeledProperties(ElementHandle elementHandle)
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");

            return ElementProviderPluginFacade.GetLabeledProperties(elementHandle.ProviderName, elementHandle.EntityToken);
        }



        /// <exclude />
        public static bool ContainsLocalizedData(ElementProviderHandle elementProviderHandle)
        {
            if (elementProviderHandle == null) throw new ArgumentNullException("elementProviderHandle");

            if (ElementProviderPluginFacade.IsLocaleAwareElementProvider(elementProviderHandle.ProviderName) == false) return false;

            return ElementProviderPluginFacade.ContainsLocalizedData(elementProviderHandle.ProviderName);
        }



        /// <exclude />
        public static IEnumerable<Element> GetForeignRoots(SearchToken searchToken)
        {
            return GetRoots(ElementProviderRegistry.RootElementProviderName, searchToken, true, true);
        }



        /// <exclude />
        public static IEnumerable<Element> GetForeignRoots(ElementProviderHandle elementProviderHandle, SearchToken searchToken)
        {
            if (elementProviderHandle == null) throw new ArgumentNullException("elementProviderHandle");

            return GetRoots(elementProviderHandle.ProviderName, searchToken, true, true);
        }



        /// <exclude />
        public static IEnumerable<Element> GetForeignChildren(ElementHandle elementHandle, SearchToken searchToken)
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");

            return GetChildren(elementHandle, searchToken, true, true);
        }



        /// <exclude />
        public static IEnumerable<LabeledProperty> GetForeignLabeledProperties(ElementHandle elementHandle)
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");

            if (ElementProviderPluginFacade.IsLocaleAwareElementProvider(elementHandle.ProviderName))
            {
                return ElementProviderPluginFacade.GetForeignLabeledProperties(elementHandle.ProviderName, elementHandle.EntityToken);
            }

            return ElementProviderPluginFacade.GetLabeledProperties(elementHandle.ProviderName, elementHandle.EntityToken);
        }



        /// <exclude />
        public static object GetData(ElementProviderHandle elementProviderHandle, string dataName)
        {
            if (elementProviderHandle == null) throw new ArgumentNullException("elementProviderHandle");
            if (string.IsNullOrEmpty(dataName)) throw new ArgumentNullException("dataName");

            return ElementProviderPluginFacade.GetData(elementProviderHandle.ProviderName, dataName);
        }



        /// <exclude />
        public static bool ExecuteElementDraggedAndDropped(ElementHandle draggedElementHandle, ElementHandle newParentElementHandle, int dropIndex, bool isCopy, FlowControllerServicesContainer draggedElementFlowControllerServicesContainer)
        {
            if (draggedElementHandle == null) throw new ArgumentNullException("draggedElementHandle");
            if (newParentElementHandle == null) throw new ArgumentNullException("newParentElementHandle");
            if (draggedElementFlowControllerServicesContainer == null) throw new ArgumentNullException("draggedElementFlowControllerServicesContainer");

            if (draggedElementHandle.Equals(newParentElementHandle))
            {
                LoggingService.LogError("ElementFacade", "ExecuteElementDraggedAndDropped on the same element is not allowed");
                return false;
            }

            DragAndDropType dragAndDropType = DragAndDropType.Move;
            if (isCopy)
            {
                dragAndDropType = DragAndDropType.Copy;
            }

            return ElementProviderPluginFacade.OnElementDraggedAndDropped(draggedElementHandle.ProviderName, draggedElementHandle.EntityToken, newParentElementHandle.EntityToken, dropIndex, dragAndDropType, draggedElementFlowControllerServicesContainer);
        }



        /// <exclude />
        public static SearchToken GetNewSearchToken(ElementHandle elementHandle)
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");

            SearchToken searchToken;

            if (ElementProviderPluginFacade.GetNewSearchToken(elementHandle.ProviderName, elementHandle.EntityToken, out searchToken) == false)
            {
                return new SearchToken();
            }

            return searchToken;
        }



        /// <exclude />
        public static XmlReader GetSearchFormMarkup(ElementHandle elementHandle)
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");

            XmlReader formDefinition;

            if (ElementProviderPluginFacade.GetSearchFormDefinition(elementHandle.ProviderName, elementHandle.EntityToken, out formDefinition) == false)
            {
                IFormMarkupProvider markupProvider = new FormDefinitionFileMarkupProvider("/Administrative/ElementKeywordSearch.xml");

                return markupProvider.GetReader();
            }

            return formDefinition;
        }



        /// <exclude />
        public static Dictionary<string, object> GetSearchFormBindings(ElementHandle elementHandle)
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");

            Dictionary<string, object> bindings;

            if (ElementProviderPluginFacade.GetSearchFormBindings(elementHandle.ProviderName, elementHandle.EntityToken, out bindings) == false)
            {
                return new Dictionary<string, object>();
            }

            return bindings;
        }



        /// <exclude />
        public static IEnumerable<Element> GetRootsWithNoSecurity()
        {
            return GetRoots(ElementProviderRegistry.RootElementProviderName, null, false, false);
        }



        /// <exclude />
        public static IEnumerable<Element> GetRootsWithNoSecurity(ElementProviderHandle elementProviderHandle, SearchToken searchToken)
        {
            if (elementProviderHandle == null) throw new ArgumentNullException("elementProviderHandle");

            return GetRoots(elementProviderHandle.ProviderName, searchToken, false, false);
        }



        /// <exclude />
        public static IEnumerable<Element> GetPerspectiveElements(bool performSecurityCheck)
        {
            IEnumerable<ElementHandle> rootElementHandles = GetRoots(ElementProviderRegistry.RootElementProviderName, null, performSecurityCheck, false).Select(f => f.ElementHandle);

            foreach (ElementHandle rootElementHandle in rootElementHandles)
            {
                IEnumerable<Element> perspectiveElements = GetChildren(rootElementHandle, null, performSecurityCheck, false);

                foreach (Element perspectiveElement in perspectiveElements)
                {
                    yield return perspectiveElement;
                }
            }
        }



        /// <exclude />
        public static IEnumerable<Element> GetPerspectiveElementsWithNoSecurity()
        {
            return GetPerspectiveElements(false);
        }


        internal static bool IsPerspectiveEntityToken(EntityToken entityToken)
        {
            if (!(entityToken is VirtualElementProviderEntityToken))
            {
                return false;
            }

            if (_perspectiveEntityTokens == null)
            {
                _perspectiveEntityTokens =
                    GetPerspectiveElementsWithNoSecurity().Select(e => e.ElementHandle.EntityToken).ToList();
            }

            return _perspectiveEntityTokens.Contains(entityToken);
        }


        internal static bool IsLocaleAwareElementProvider(ElementProviderHandle elementProviderHandle)
        {
            if (elementProviderHandle == null) throw new ArgumentNullException("elementProviderHandle");

            return ElementProviderPluginFacade.IsLocaleAwareElementProvider(elementProviderHandle.ProviderName);
        }



        private static IEnumerable<Element> GetRoots(string providerName, SearchToken searchToken, bool performSecurityCheck, bool useForeign)
        {
            if (providerName == null) throw new ArgumentNullException("providerName");
            
            IEnumerable<Element> roots;

            try
            {
                if (!useForeign || !ElementProviderPluginFacade.IsLocaleAwareElementProvider(providerName))
                {
                    roots = ElementProviderPluginFacade.GetRoots(providerName, searchToken).ToList();
                }
                else
                {
                    roots = ElementProviderPluginFacade.GetForeignRoots(providerName, searchToken).ToList();
                }
            }
            catch (Exception ex) when (providerName != ElementProviderRegistry.RootElementProviderName)
            {
                Log.LogError(nameof(ElementFacade), $"Failed to get root elements for element provider '{providerName}'");
                Log.LogError(nameof(ElementFacade), ex);

                return Enumerable.Empty<Element>();
            }
            

            if (performSecurityCheck)
            {
                roots = roots.FilterElements();
            }

            ElementActionProviderFacade.AddActions(roots, providerName);

            if (performSecurityCheck)
            {
                return roots.FilterActions();
            }

            return roots;
        }


        private static IEnumerable<Element> GetChildrenFromProvider(ElementHandle elementHandle, SearchToken searchToken, bool useForeign)
        {
            if (ElementProviderRegistry.ElementProviderNames.Contains(elementHandle.ProviderName))
            {
                if (!useForeign || !ElementProviderPluginFacade.IsLocaleAwareElementProvider(elementHandle.ProviderName))
                {
                    return ElementProviderPluginFacade.GetChildren(elementHandle.ProviderName, elementHandle.EntityToken, searchToken);
                }

                return ElementProviderPluginFacade.GetForeignChildren(elementHandle.ProviderName, elementHandle.EntityToken, searchToken);
            }

            if (ElementAttachingProviderRegistry.ElementAttachingProviderNames.Contains(elementHandle.ProviderName))
            {
                return ElementAttachingProviderPluginFacade.GetChildren(elementHandle.ProviderName, elementHandle.EntityToken, elementHandle.Piggyback);
            }

            throw new InvalidOperationException($"No element provider named '{elementHandle.ProviderName}' found");
        }


        private static IEnumerable<Element> GetChildren(ElementHandle elementHandle, SearchToken searchToken, bool performSecurityCheck, bool useForeign)
        {
            Verify.ArgumentNotNull(elementHandle, nameof(elementHandle));

            var performanceToken = PerformanceCounterFacade.BeginElementCreation();

            var children = GetChildrenFromProvider(elementHandle, searchToken, useForeign).Evaluate();

            var originalChildren = children;

            children = ElementAttachingProviderFacade.AttachElements(elementHandle.EntityToken, elementHandle.Piggyback, children).Evaluate();

            int totalElementCount = children.Count;

            if (performSecurityCheck)
            {
                children = children.FilterElements().Evaluate();
            }

            // Evaluating HasChildren for not attached elements
            foreach (Element element in originalChildren)
            {
                if (children.Contains(element) && !element.VisualData.HasChildren)
                {
                    element.VisualData.HasChildren = ElementAttachingProviderFacade.HaveCustomChildElements(element.ElementHandle.EntityToken, element.ElementHandle.Piggyback);
                }
            }

            ElementActionProviderFacade.AddActions(children, elementHandle.ProviderName);

            if (performSecurityCheck)
            {
                children = children.FilterActions().Evaluate();
            }

            PerformanceCounterFacade.EndElementCreation(performanceToken, children.Count, totalElementCount);

            return children;
        }
    }
}
