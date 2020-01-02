using System;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using Composite.Core;
using Composite.Core.Linq;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Data;
using System.Threading;
using Composite.Core.Xml;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Caching
{
    internal sealed class PageObjectCacheFunction : DowncastableStandardFunctionBase
    {
        private static readonly XName FunctionXName = Namespaces.Function10 + "function";

        public PageObjectCacheFunction(EntityTokenFactory entityTokenFactory)
            : base("PageObjectCache", "Composite.Utils.Caching", typeof(object), entityTokenFactory)
        {
        }



        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider associationDropDown = StandardWidgetFunctions.DropDownList(
                    this.GetType(), "PageAssociationRestrictions", "Key", "Value", false, true);

                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "ObjectToCache", typeof(object), true, new NoValueValueProvider(), null);
                yield return new StandardFunctionParameterProfile(
                    "ObjectCacheId", typeof(string), true, new NoValueValueProvider(), textboxWidget);
                yield return new StandardFunctionParameterProfile(
                    "SitemapScope",
                    typeof(SitemapScope),
                    false,
                    new ConstantValueProvider(SitemapScope.Level1),
                    associationDropDown);
                yield return new StandardFunctionParameterProfile(
                    "SecondsToCache", typeof(int), false, new ConstantValueProvider(60), textboxWidget);
                yield return new StandardFunctionParameterProfile(
                    "LanguageSpecific",
                    typeof(bool),
                    false,
                    new ConstantValueProvider(true),
                    StandardWidgetFunctions.GetBoolSelectorWidget("Language specific content", "Share across all languages"));
            }
        }


        readonly ConcurrentDictionary<string, object> _lockCollection = new ConcurrentDictionary<string, object>();
        bool _poteintialKeysLeakLogged = false;

        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            if (DataScopeManager.CurrentDataScope.Name != DataScopeIdentifier.PublicName)
            {
                return parameters.GetParameter<object>("ObjectToCache");
            }

            var cache = HttpRuntime.Cache;
            string cacheKey = BuildCacheKey(parameters);

            object result = cache.Get(cacheKey);
            if (result == null)
            {
                var lockObject = _lockCollection.GetOrAdd(cacheKey, key => new object());

                lock (lockObject)
                {
                    if(_lockCollection.Count > 50000 && !_poteintialKeysLeakLogged)
                    {
                        _poteintialKeysLeakLogged = true;
                        Log.LogWarning(nameof(PageObjectCacheFunction), "Potential memory leak in the locks collection");
                    }

                    result = cache.Get(cacheKey);
                    if (result == null)
                    {
                        result = parameters.GetParameter<object>("ObjectToCache");

                        if (result != null)
                        {
                            result = EvaluateLazyResult(result, context);

                            int secondsToCache = parameters.GetParameter<int>("SecondsToCache");

                            cache.Add(
                                cacheKey, 
                                result, 
                                null, 
                                DateTime.Now.AddSeconds(secondsToCache),
                                TimeSpan.Zero, 
                                System.Web.Caching.CacheItemPriority.Default, 
                                null);
                        }
                    }
                } 
            }

            return result;
        }

        private static object EvaluateLazyResult(object result, FunctionContextContainer context)
        {
            if (result is XDocument document)
            {
                PageRenderer.ExecuteEmbeddedFunctions(document.Root, context);
                return result;
            }

            if (result is IEnumerable<XNode> xNodes)
            {
                return EvaluateLazyResult(xNodes, context);
            }

            return result;
        }

        private static object EvaluateLazyResult(IEnumerable<XNode> xNodes, FunctionContextContainer context)
        {
            var resultList = new List<object>();

            // Attaching the result to be cached to an XElement, so the cached XObject-s will not be later attached to 
            // an XDocument and causing a bigger memory leak.
            var tempParent = new XElement("t");

            foreach (var node in xNodes.Evaluate())
            {
                node.Remove();

                if (node is XElement element)
                {
                    if (element.Name == FunctionXName)
                    {
                        var functionTreeNode = (FunctionRuntimeTreeNode)FunctionTreeBuilder.Build(element);

                        var functionCallResult = functionTreeNode.GetValue(context);
                        if (functionCallResult != null)
                        {
                            if (functionCallResult is XDocument document)
                            {
                                functionCallResult = document.Root;
                            }

                            resultList.Add(functionCallResult);

                            if (functionCallResult is XObject || functionCallResult is IEnumerable<XObject>)
                            {
                                tempParent.Add(functionCallResult);
                            }
                        }
                    }
                    else
                    {
                        PageRenderer.ExecuteEmbeddedFunctions(element, context);
                        resultList.Add(element);
                        tempParent.Add(element);
                    }
                }
                else
                {
                    resultList.Add(node);
                    tempParent.Add(node);
                }
            }

            return resultList.ToArray();
        }

        private static string BuildCacheKey(ParameterList parameters)
        {
            string cacheKey = parameters.GetParameter<string>("ObjectCacheId");

            bool languageSpecific = parameters.GetParameter<bool>("LanguageSpecific");
            if (languageSpecific)
            {
                cacheKey = $"{cacheKey}:{Thread.CurrentThread.CurrentCulture}";
            }

            SitemapScope SitemapScope = parameters.GetParameter<SitemapScope>("SitemapScope");
            if (SitemapScope != SitemapScope.All)
            {
                Guid associatedPageId = PageStructureInfo.GetAssociatedPageIds(PageRenderer.CurrentPageId, SitemapScope).FirstOrDefault();
                associatedPageId = (associatedPageId == Guid.Empty ? PageRenderer.CurrentPageId : associatedPageId);
                cacheKey = $"{cacheKey}:{associatedPageId}";
            }
            return cacheKey;
        }

        public static IEnumerable<KeyValuePair<SitemapScope, string>> PageAssociationRestrictions()
        {
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Current, "Current page");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.All, "All pages (use everywhere)");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Parent, "Parent page");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level1, "Level 1 page (this website)");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level2, "Level 2 page");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level3, "Level 3 page");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level4, "Level 4 page");
        }

    }
}
