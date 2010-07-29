using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml;
using Composite.Linq;
using Composite.Actions;
using Composite.Elements.Foundation;
using Composite.Elements.Foundation.PluginFacades;
using Composite.Elements.Plugins.ElementProvider;
using Composite.Elements.Security;
using Composite.Forms.DataServices;
using Composite.Forms.Flows;
using Composite.Logging;
using Composite.Instrumentation;


namespace Composite.Elements
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ElementFacade
    {
        public static IEnumerable<Element> GetRoots(SearchToken searchToken)
        {
            return GetRoots(ElementProviderRegistry.RootElementProviderName, searchToken, true, false);
        }



        public static IEnumerable<Element> GetRoots(ElementProviderHandle elementProviderHandle, SearchToken searchToken)
        {
            if (elementProviderHandle == null) throw new ArgumentNullException("elementProviderHandle");

            return GetRoots(elementProviderHandle.ProviderName, searchToken, true, false);
        }



        public static IEnumerable<Element> GetChildren(ElementHandle elementHandle, SearchToken searchToken)
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");

            return GetChildren(elementHandle, searchToken, true, false);
        }



        public static IEnumerable<LabeledProperty> GetLabeledProperties(ElementHandle elementHandle)
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");

            return ElementProviderPluginFacade.GetLabeledProperties(elementHandle.ProviderName, elementHandle.EntityToken);
        }



        public static bool ContainsLocalizedData(ElementProviderHandle elementProviderHandle)
        {
            if (elementProviderHandle == null) throw new ArgumentNullException("elementProviderHandle");

            if (ElementProviderPluginFacade.IsLocaleAwareElementProvider(elementProviderHandle.ProviderName) == false) return false;

            return ElementProviderPluginFacade.ContainsLocalizedData(elementProviderHandle.ProviderName);
        }



        public static IEnumerable<Element> GetForeignRoots(SearchToken searchToken)
        {
            return GetRoots(ElementProviderRegistry.RootElementProviderName, searchToken, true, true);
        }



        public static IEnumerable<Element> GetForeignRoots(ElementProviderHandle elementProviderHandle, SearchToken searchToken)
        {
            if (elementProviderHandle == null) throw new ArgumentNullException("elementProviderHandle");

            return GetRoots(elementProviderHandle.ProviderName, searchToken, true, true);
        }



        public static IEnumerable<Element> GetForeignChildren(ElementHandle elementHandle, SearchToken searchToken)
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");

            return GetChildren(elementHandle, searchToken, true, true);
        }



        public static IEnumerable<LabeledProperty> GetForeignLabeledProperties(ElementHandle elementHandle)
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");

            if (ElementProviderPluginFacade.IsLocaleAwareElementProvider(elementHandle.ProviderName) == true)
            {
                return ElementProviderPluginFacade.GetForeignLabeledProperties(elementHandle.ProviderName, elementHandle.EntityToken);
            }
            else
            {
                return ElementProviderPluginFacade.GetLabeledProperties(elementHandle.ProviderName, elementHandle.EntityToken);
            }

        }



        public static object GetData(ElementProviderHandle elementProviderHandle, string dataName)
        {
            if (elementProviderHandle == null) throw new ArgumentNullException("elementProviderHandle");
            if (string.IsNullOrEmpty(dataName) == true) throw new ArgumentNullException("dataName");

            return ElementProviderPluginFacade.GetData(elementProviderHandle.ProviderName, dataName);
        }



        public static bool ExecuteElementDraggedAndDropped(ElementHandle draggedElementHandle, ElementHandle newParentElementHandle, int dropIndex, bool isCopy, FlowControllerServicesContainer draggedElementFlowControllerServicesContainer)
        {
            if (draggedElementHandle == null) throw new ArgumentNullException("draggedElementHandle");
            if (newParentElementHandle == null) throw new ArgumentNullException("newParentElementHandle");
            if (draggedElementFlowControllerServicesContainer == null) throw new ArgumentNullException("draggedElementFlowControllerServicesContainer");

            if (draggedElementHandle.Equals(newParentElementHandle) == true)
            {
                LoggingService.LogError("ElementFacade", "ExecuteElementDraggedAndDropped on the same element is not allowed");
                return false;
            }

            DragAndDropType dragAndDropType = DragAndDropType.Move;
            if (isCopy == true)
            {
                dragAndDropType = DragAndDropType.Copy;
            }

            return ElementProviderPluginFacade.OnElementDraggedAndDropped(draggedElementHandle.ProviderName, draggedElementHandle.EntityToken, newParentElementHandle.EntityToken, dropIndex, dragAndDropType, draggedElementFlowControllerServicesContainer);
        }



        public static SearchToken GetNewSearchToken(ElementHandle elementHandle)
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");

            if (elementHandle == null) throw new ArgumentNullException("elementHandle");

            SearchToken searchToken;

            if (ElementProviderPluginFacade.GetNewSearchToken(elementHandle.ProviderName, elementHandle.EntityToken, out searchToken) == false)
            {
                return new SearchToken();
            }

            return searchToken;
        }



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



        internal static IEnumerable<Element> GetRootsWithNoSecurity()
        {
            return GetRoots(ElementProviderRegistry.RootElementProviderName, null, false, false);
        }



        internal static IEnumerable<Element> GetRootsWithNoSecurity(ElementProviderHandle elementProviderHandle, SearchToken searchToken)
        {
            if (elementProviderHandle == null) throw new ArgumentNullException("elementProviderHandle");

            return GetRoots(elementProviderHandle.ProviderName, searchToken, false, false);
        }



        public static IEnumerable<Element> GetPerspectiveElements(SearchToken searchToken, bool performceSecurityCheck)
        {
            IEnumerable<ElementHandle> rootElementHandles = GetRoots(ElementProviderRegistry.RootElementProviderName, null, performceSecurityCheck, false).Select(f => f.ElementHandle);

            foreach (ElementHandle rootElementHandle in rootElementHandles)
            {
                IEnumerable<Element> perspectiveElements = GetChildren(rootElementHandle, null, performceSecurityCheck, false);

                foreach (Element perspectiveElement in perspectiveElements)
                {
                    yield return perspectiveElement;
                }
            }
        }



        public static IEnumerable<Element> GetPerspectiveElementsWithNoSecurity(SearchToken searchToken)
        {
            return GetPerspectiveElements(searchToken, false);
        }



        internal static bool IsLocaleAwareElementProvider(ElementProviderHandle elementProviderHandle)
        {
            if (elementProviderHandle == null) throw new ArgumentNullException("elementProviderHandle");

            return ElementProviderPluginFacade.IsLocaleAwareElementProvider(elementProviderHandle.ProviderName);
        }



        private static IEnumerable<Element> GetRoots(string providerName, SearchToken searchToken, bool performceSecurityCheck, bool useForeign)
        {
            if (providerName == null) throw new ArgumentNullException("providerName");

            IEnumerable<Element> roots;
            if ((useForeign == false) || (ElementProviderPluginFacade.IsLocaleAwareElementProvider(providerName) == false))
            {
                roots = ElementProviderPluginFacade.GetRoots(providerName, searchToken).ToList();
            }
            else
            {
                roots = ElementProviderPluginFacade.GetForeignRoots(providerName, searchToken).ToList();
            }

            ElementActionProviderFacade.AddActions(roots, providerName);

            if (performceSecurityCheck == true)
            {
                return roots.FilterActions();
            }
            else
            {
                return roots;
            }
        }



        private static IEnumerable<Element> GetChildren(ElementHandle elementHandle, SearchToken searchToken, bool performceSecurityCheck, bool useForeign)
        {
            if (elementHandle == null) throw new ArgumentNullException("elementHandle");

            IPerformanceCounterToken performanceToken = PerformanceCounterFacade.BeginElementCreation();

            IEnumerable<Element> children;
            if (ElementProviderRegistry.ElementProviderNames.Contains(elementHandle.ProviderName) == true)
            {
                if ((useForeign == false) || (ElementProviderPluginFacade.IsLocaleAwareElementProvider(elementHandle.ProviderName) == false))
                {
                    children = ElementProviderPluginFacade.GetChildren(elementHandle.ProviderName, elementHandle.EntityToken, searchToken).Evaluate();
                }
                else
                {
                    children = ElementProviderPluginFacade.GetForeignChildren(elementHandle.ProviderName, elementHandle.EntityToken, searchToken).Evaluate();
                }
            }
            else if (ElementAttachingProviderRegistry.ElementAttachingProviderNames.Contains(elementHandle.ProviderName) == true)
            {
                children = ElementAttachingProviderPluginFacade.GetChildren(elementHandle.ProviderName, elementHandle.EntityToken, elementHandle.Piggyback).Evaluate();
            }
            else
            {
                throw new InvalidOperationException(string.Format("No element provider named '{0}' found", elementHandle.ProviderName));
            }

            foreach (Element element in children)
            {
                if (element.VisualData.HasChildren == false)
                {
                    element.VisualData.HasChildren = ElementAttachingProviderFacade.HaveCustomChildElements(element.ElementHandle.EntityToken, element.ElementHandle.Piggyback);
                }
            }
                        
            children = ElementAttachingProviderFacade.AttachElements(elementHandle.EntityToken, elementHandle.Piggyback, children).Evaluate();

            int totalElementCount = children.Count();

            ElementActionProviderFacade.AddActions(children, elementHandle.ProviderName);

            if (performceSecurityCheck == true)
            {
                children = children.FilterActions().Evaluate();
            }

            PerformanceCounterFacade.EndElementCreation(performanceToken, children.Count(), totalElementCount);

            return children;
        }
    }
}
