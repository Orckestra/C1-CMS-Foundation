using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.C1Console.Security;
using Composite.C1Console.Elements.Foundation.PluginFacades;
using Composite.C1Console.Elements.Plugins.ElementAttachingProvider;

namespace Composite.C1Console.Elements.Foundation
{
	internal static class ElementAttachingProviderFacade
	{
        public static bool HaveCustomChildElements(EntityToken parentEntityToken, Dictionary<string, string> piggybag)
        {
            foreach (string providerName in ElementAttachingProviderRegistry.ElementAttachingProviderNames)
            {
                bool result = ElementAttachingProviderPluginFacade.HaveCustomChildElements(providerName, parentEntityToken, piggybag);
                if (result == true)
                {
                    return true;
                }
            }

            return false;
        }



        public static IEnumerable<Element> AttachElements(EntityToken parentEntityToken, Dictionary<string, string> piggybag, IEnumerable<Element> currentElements)
        {
            List<ElementAttachingProviderResult> topResults = new List<ElementAttachingProviderResult>();
            List<ElementAttachingProviderResult> bottomResults = new List<ElementAttachingProviderResult>();

            foreach (string providerName in ElementAttachingProviderRegistry.ElementAttachingProviderNames)
            {
                if (ElementAttachingProviderPluginFacade.IsMultibleResultElementAttachingProvider(providerName) == false)
                {
                    ElementAttachingProviderResult result = ElementAttachingProviderPluginFacade.GetAlternateElementList(providerName, parentEntityToken, piggybag);

                    if ((result == null) || (result.Elements == null)) continue;

                    if (result.Position == ElementAttachingProviderPosition.Top)
                    {
                        topResults.Add(result);
                    }
                    else if (result.Position == ElementAttachingProviderPosition.Bottom)
                    {
                        bottomResults.Add(result);
                    }
                }
                else
                {
                    IEnumerable<ElementAttachingProviderResult> results = ElementAttachingProviderPluginFacade.GetAlternateElementLists(providerName, parentEntityToken, piggybag);

                    if (results == null) continue;

                    foreach (ElementAttachingProviderResult result in results)
                    {
                        if ((result == null) || (result.Elements == null)) continue;

                        if (result.Position == ElementAttachingProviderPosition.Top)
                        {
                            topResults.Add(result);
                        }
                        else if (result.Position == ElementAttachingProviderPosition.Bottom)
                        {
                            bottomResults.Add(result);
                        }
                    }
                }
            }

            Comparison<ElementAttachingProviderResult> sortMethod = delegate(ElementAttachingProviderResult r1, ElementAttachingProviderResult r2) { return r2.PositionPriority - r1.PositionPriority; };
            topResults.Sort(sortMethod);
            bottomResults.Sort(sortMethod);


            IEnumerable<Element> topElements = null;
            foreach (ElementAttachingProviderResult result in topResults)
            {
                if (topElements == null)
                {
                    topElements = result.Elements;
                }
                else
                {
                    topElements = topElements.Concat(result.Elements);
                }
            }


            IEnumerable<Element> bottomElements = null;
            foreach (ElementAttachingProviderResult result in bottomResults)
            {
                if (bottomElements == null)
                {
                    bottomElements = result.Elements;
                }
                else
                {
                    bottomElements = bottomElements.Concat(result.Elements);
                }
            }

            IEnumerable<Element> resultElements = topElements;

            if (resultElements == null)
            {
                resultElements = currentElements;
            }
            else
            {
                resultElements = resultElements.Concat(currentElements);
            }

            if (bottomElements != null)
            {
                resultElements = resultElements.Concat(bottomElements);
            }

            return resultElements;
        }
	}
}
