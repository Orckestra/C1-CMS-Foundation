using System;
using System.Collections.Generic;
using Composite.C1Console.Security;
using Composite.C1Console.Elements.Foundation.PluginFacades;
using Composite.C1Console.Elements.Plugins.ElementAttachingProvider;
using Composite.Core.Extensions;

namespace Composite.C1Console.Elements.Foundation
{
	internal static class ElementAttachingProviderFacade
	{
        public static bool HaveCustomChildElements(EntityToken parentEntityToken, Dictionary<string, string> piggybag)
        {
            foreach (string providerName in ElementAttachingProviderRegistry.ElementAttachingProviderNames)
            {
                bool result = ElementAttachingProviderPluginFacade.HaveCustomChildElements(providerName, parentEntityToken, piggybag);
                if (result)
                {
                    return true;
                }
            }

            return false;
        }



        public static IEnumerable<Element> AttachElements(EntityToken parentEntityToken, Dictionary<string, string> piggybag, IEnumerable<Element> currentElements)
        {
            var topResults = new List<ElementAttachingProviderResult>();
            var bottomResults = new List<ElementAttachingProviderResult>();

            foreach (string providerName in ElementAttachingProviderRegistry.ElementAttachingProviderNames)
            {
                if (!ElementAttachingProviderPluginFacade.IsMultipleResultElementAttachingProvider(providerName))
                {
                    var result = ElementAttachingProviderPluginFacade.GetAlternateElementList(providerName, parentEntityToken, piggybag);

                    if (result?.Elements == null) continue;

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
                    var results = ElementAttachingProviderPluginFacade.GetAlternateElementLists(providerName, parentEntityToken, piggybag);

                    if (results == null) continue;

                    foreach (ElementAttachingProviderResult result in results)
                    {
                        if (result?.Elements == null) continue;

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

            Comparison<ElementAttachingProviderResult> sortMethod =
                (r1, r2) => r2.PositionPriority - r1.PositionPriority;

            topResults.Sort(sortMethod);
            bottomResults.Sort(sortMethod);


            IEnumerable<Element> topElements = null;
            foreach (var result in topResults)
            {
                topElements = topElements.ConcatOrDefault(result.Elements);
            }


            IEnumerable<Element> bottomElements = null;
            foreach (var result in bottomResults)
            {
                bottomElements = bottomElements.ConcatOrDefault(result.Elements);
            }


            return topElements
                .ConcatOrDefault(currentElements)
                .ConcatOrDefault(bottomElements);
        }
	}
}
