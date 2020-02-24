using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Composite.C1Console.Actions;
using Composite.C1Console.Workflow.Activities;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.Routing.Pages;
using Composite.Core.WebClient.FlowMediators.FormFlowRendering;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Security;

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
            if (!parameters.TryGetParameter<SitemapScope>(nameof(SitemapScope), out var sitemapScope))
            {
                sitemapScope = SitemapScope.Current;
            }

            var pageId = GetCurrentPageId();

            switch (sitemapScope)
            {
                case SitemapScope.Current:
                    return pageId;
                case SitemapScope.Parent:
                case SitemapScope.Level1:
                case SitemapScope.Level2:
                case SitemapScope.Level3:
                case SitemapScope.Level4:
                    var pageIds = PageStructureInfo.GetAssociatedPageIds(pageId, sitemapScope);
                    return pageIds.FirstOrDefault();
                default:
                    throw new NotImplementedException("Unhandled SitemapScope type: " + sitemapScope.ToString());
            }
        }

        private Guid GetCurrentPageId()
        {
            return GetCurrentPageIdFromPageRenderer()
                   ?? GetCurrentPageIdFromPageUrlData()
                   ?? GetCurrentPageIdFromHttpContext()
                   ?? GetCurrentPageIdFromFormFlow()
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
            var entityToken = HttpContext.Current?.Items[ActionExecutorFacade.HttpContextItem_EntityToken];
            return GetPageIdFromEntityToken(entityToken as EntityToken);
        }

        private Guid? GetCurrentPageIdFromFormFlow()
        {
            var currentFormTreeCompiler = FormFlowUiDefinitionRenderer.CurrentFormTreeCompiler;
            if (currentFormTreeCompiler.BindingObjects.TryGetValue(FormsWorkflow.EntityTokenKey, out var entityToken))
            {
                return GetPageIdFromEntityToken(entityToken as EntityToken);
            }

            return null;
        }

        private Guid? GetPageIdFromEntityToken(EntityToken entityToken)
        {
            if (entityToken is null)
            {
                return null;
            }

            Guid pageId = Guid.Empty;

            if (entityToken is DataEntityToken dataEntityToken)
            {
                //appears while adding a metadata element
                if (dataEntityToken.Data is IPage page)
                {
                    pageId = page.Id;
                }
                //appears while editing a datafolder element
                else if (dataEntityToken.Data is IPageRelatedData pageRelatedData)
                {
                    pageId = pageRelatedData.PageId;
                }
            }
            //appears while adding a datafolder element
            else if (typeof(IPage).IsAssignableFrom(Type.GetType(entityToken.Type, throwOnError: false)))
            {
                Guid.TryParse(entityToken?.Id, out pageId);
            }
            return pageId == Guid.Empty ? null : (Guid?)pageId;
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider associationDropDown = StandardWidgetFunctions.DropDownList(
                    this.GetType(), "PageAssociationRestrictions", "Key", "Value", false, true);

                yield return new StandardFunctionParameterProfile(
                    nameof(SitemapScope),
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
