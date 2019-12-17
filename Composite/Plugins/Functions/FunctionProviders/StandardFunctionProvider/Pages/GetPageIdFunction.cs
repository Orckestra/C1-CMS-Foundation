using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Xml.Linq;
using Composite.Functions;
using Composite.C1Console.Security;
using Composite.Core.Extensions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.ResourceSystem;
using Composite.Core.Routing;
using Composite.Core.Routing.Pages;
using Composite.Core.WebClient.FlowMediators;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Pages
{
    internal sealed class GetPageIdFunction : StandardFunctionBase
    {
        public GetPageIdFunction(EntityTokenFactory entityTokenFactory)
            : base("GetPageId", "Composite.Pages", typeof(Guid), entityTokenFactory)
        {
        }

        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            SitemapScope SitemapScope;
            if (parameters.TryGetParameter<SitemapScope>("SitemapScope", out SitemapScope) == false)
            {
                SitemapScope = SitemapScope.Current;
            }

            var pageId = GetPageId();

            switch (SitemapScope)
            {
                case SitemapScope.Current:
                    return pageId;
                case SitemapScope.Parent:
                case SitemapScope.Level1:
                case SitemapScope.Level2:
                case SitemapScope.Level3:
                case SitemapScope.Level4:
                    var pageIds = PageStructureInfo.GetAssociatedPageIds(pageId, SitemapScope);
                    return pageIds.FirstOrDefault();
                default:
                    throw new NotImplementedException("Unhandled SitemapScope type: " + SitemapScope.ToString());
            }
        }

        private Guid GetPageId()
        {
            return GetCurrentPageIdFromPageRenderer()
                   ?? GetCurrentPageIdFromPageUrlData()
                   ?? GetCurrentPageIdFromHttpContext()
                   ?? Guid.Empty;
        }

        private Guid? GetCurrentPageIdFromPageRenderer()
        {
            var pageId = PageRenderer.CurrentPageId;
            return pageId == Guid.Empty ? (Guid?)null : pageId;
        }

        private Guid? GetCurrentPageIdFromPageUrlData()
        {
            var pageId = C1PageRoute.PageUrlData?.PageId;
            return pageId == Guid.Empty ? null : pageId;
        }

        private Guid? GetCurrentPageIdFromHttpContext()
        {
            try
            {
                var entityToken = HttpContext.Current?.Items[TreeServicesFacade.HttpContextItem_EntityToken] as DataEntityToken;
                if (entityToken != null && Type.GetType(entityToken.Type) == typeof(IPage))
                {
                    var data = entityToken.Data as IPage;
                    var pageId = data?.Id;
                    return pageId == Guid.Empty ? null : pageId;
                }
            }
            catch
            {
            }

            return null;
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider associationDropDown = StandardWidgetFunctions.DropDownList(
                    this.GetType(), "PageAssociationRestrictions", "Key", "Value", false, true);

                yield return new StandardFunctionParameterProfile(
                    "SitemapScope",
                    typeof(SitemapScope),
                    false,
                    new ConstantValueProvider(SitemapScope.Current),
                    associationDropDown);
            }
        }


        public static IEnumerable<KeyValuePair<SitemapScope, string>> PageAssociationRestrictions()
        {
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Current, "Current page");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Parent, "Parent page");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level1, "Level 1 page (homepage)");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level2, "Level 2 page");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level3, "Level 3 page");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level4, "Level 4 page");
        }

    }
}
