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
            PageAssociationScope pageAssociationScope;
            if (parameters.TryGetParameter<PageAssociationScope>("PageAssociationScope", out pageAssociationScope) == false)
            {
                pageAssociationScope = PageAssociationScope.CurrentPage;
            }

            Guid pageId = Guid.Empty;

            switch (pageAssociationScope)
            {
                case PageAssociationScope.CurrentPage:
                    pageId = PageRenderer.CurrentPageId;
                    break;
                case PageAssociationScope.ParentPage:
                case PageAssociationScope.Level1Page:
                case PageAssociationScope.Level2Page:
                case PageAssociationScope.Level3Page:
                case PageAssociationScope.Level4Page:
                    IEnumerable<Guid> pageIds = PageStructureInfo.GetAssociatedPageIds(PageRenderer.CurrentPageId, pageAssociationScope);
                    pageId = pageIds.FirstOrDefault();
                    break;
                default:
                    throw new NotImplementedException("Unhandled PageAssociationScope type: " + pageAssociationScope.ToString());
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
                    "PageAssociationScope",
                    typeof(PageAssociationScope),
                    false,
                    new ConstantValueProvider(PageAssociationScope.CurrentPage),
                    associationDropDown);
            }
        }


        public static IEnumerable<KeyValuePair<PageAssociationScope, string>> PageAssociationRestrictions()
        {
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.CurrentPage, "Current page");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.ParentPage, "Parent page");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level1Page, "Level 1 page (homepage)");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level2Page, "Level 2 page");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level3Page, "Level 3 page");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level4Page, "Level 4 page");
        }

    }
}
