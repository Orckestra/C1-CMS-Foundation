using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using Composite.Functions;
using Composite.Linq;
using Composite.Renderings.Page;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Data;
using System.Threading;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Caching
{
    internal sealed class PageObjectCacheFunction : DowncastableStandardFunctionBase
    {
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
                    "PageAssociationScope",
                    typeof(PageAssociationScope),
                    false,
                    new ConstantValueProvider(PageAssociationScope.Level1Page),
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


        readonly object _lock = new object();

        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            if (DataScopeManager.CurrentDataScope.Name != DataScopeIdentifier.PublicName)
            {
                return parameters.GetParameter<object>("ObjectToCache");
            }

            string cacheKey = BuildCacheKey(parameters);

            object result = HttpRuntime.Cache.Get(cacheKey);
            if (result == null)
            {
                lock (_lock)
                {
                    result = HttpRuntime.Cache.Get(cacheKey);
                    if (result == null)
                    {
                        result = parameters.GetParameter<object>("ObjectToCache");

                        if (result != null)
                        {
                            result = EvaluateLazyResult(result);

                            int secondsToCache = parameters.GetParameter<int>("SecondsToCache"); 

                            HttpRuntime.Cache.Add(
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


        private static object EvaluateLazyResult(object result)
        {
            if(result is IEnumerable<XElement>)
            {
                return (result as IEnumerable<XElement>).Evaluate();
            }

            return result;
        }

        private static string BuildCacheKey(ParameterList parameters)
        {
            string cacheKey = parameters.GetParameter<string>("ObjectCacheId");

            bool languageSpecific = parameters.GetParameter<bool>("LanguageSpecific");
            if (languageSpecific == true)
            {
                cacheKey = string.Format("{0}:{1}", cacheKey, Thread.CurrentThread.CurrentCulture);
            }

            PageAssociationScope pageAssociationScope = parameters.GetParameter<PageAssociationScope>("PageAssociationScope");
            if (pageAssociationScope != PageAssociationScope.AllPages)
            {
                Guid associatedPageId = PageStructureInfo.GetAssociatedPageIds(PageRenderer.CurrentPageId, pageAssociationScope).FirstOrDefault();
                associatedPageId = (associatedPageId == Guid.Empty ? PageRenderer.CurrentPageId : associatedPageId);
                cacheKey = string.Format("{0}:{1}", cacheKey, associatedPageId);
            }
            return cacheKey;
        }

        public static IEnumerable<KeyValuePair<PageAssociationScope, string>> PageAssociationRestrictions()
        {
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.CurrentPage, "Current page");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.AllPages, "All pages (use everywhere)");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.ParentPage, "Parent page");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level1Page, "Level 1 page (this website)");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level2Page, "Level 2 page");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level3Page, "Level 3 page");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level4Page, "Level 4 page");
        }

    }
}
