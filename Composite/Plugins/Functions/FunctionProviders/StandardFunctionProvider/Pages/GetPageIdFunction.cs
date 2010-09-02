using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using Composite.Functions;
using Composite.C1Console.Security;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.ResourceSystem;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Data;

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

            Guid pageId = Guid.Empty;

            switch (SitemapScope)
            {
                case SitemapScope.Current:
                    pageId = PageRenderer.CurrentPageId;
                    break;
                case SitemapScope.Parent:
                case SitemapScope.Level1:
                case SitemapScope.Level2:
                case SitemapScope.Level3:
                case SitemapScope.Level4:
                    IEnumerable<Guid> pageIds = PageStructureInfo.GetAssociatedPageIds(PageRenderer.CurrentPageId, SitemapScope);
                    pageId = pageIds.FirstOrDefault();
                    break;
                default:
                    throw new NotImplementedException("Unhandled SitemapScope type: " + SitemapScope.ToString());
            }

            return pageId;
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
