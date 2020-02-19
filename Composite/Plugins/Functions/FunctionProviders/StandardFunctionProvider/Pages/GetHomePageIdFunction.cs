using Composite.C1Console.Actions;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow.Activities;
using Composite.Core.Routing.Pages;
using Composite.Core.WebClient.FlowMediators.FormFlowRendering;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using System;
using System.Linq;
using System.Web;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Pages
{
    internal sealed class GetHomePageIdFunction : StandardFunctionBase
    {
        public GetHomePageIdFunction(EntityTokenFactory entityTokenFactory)
            : base("GetHomePageIdFunction", "Composite.Pages", typeof(Guid), entityTokenFactory)
        {
        }

        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            var currentPageId = GetCurrentPageId();
            return currentPageId == Guid.Empty
                ? currentPageId
                : (object)PageStructureInfo.GetAssociatedPageIds(currentPageId, SitemapScope.Level1).FirstOrDefault();
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
            return GetPageIdFromDataToken(entityToken);
        }

        private Guid? GetCurrentPageIdFromFormFlow()
        {
            var currentFormTreeCompiler = FormFlowUiDefinitionRenderer.CurrentFormTreeCompiler;
            if (currentFormTreeCompiler.BindingObjects.TryGetValue(FormsWorkflow.EntityTokenKey, out var entityToken))
            {
                return GetPageIdFromDataToken(entityToken);
            }
            return null;
        }

        private Guid? GetPageIdFromDataToken(object entityTokenObj)
        {
            if (entityTokenObj is null || !(entityTokenObj is EntityToken entityToken))
            {
                return null;
            }

            Guid? pageId = null;

            if (entityTokenObj is DataEntityToken dataEntityToken)
            {
                if (dataEntityToken.Data is IPage cPage)
                {
                    pageId = cPage?.Id;
                }
                else if (dataEntityToken.Data is IPageRelatedData cPagerelatedDate)
                {
                    pageId = cPagerelatedDate?.PageId;
                }
            }
            else if (typeof(IPage).IsAssignableFrom(Type.GetType(entityToken.Type, throwOnError: false)))
            {
                Guid.TryParse(entityToken?.Id, out Guid parcedId);
                pageId = parcedId;
            }
            return pageId == Guid.Empty ? null : pageId;
        }
    }
}