using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Data.Caching;
using Composite.Data.Foundation;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Linq.ExpressionVisitors;
using Composite.Renderings.Page;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.IDataGenerated.Filter
{
	public sealed class ActivePageReferenceFilter<T> : StandardFunctionBase
	{
        private static readonly ParameterExpression _parameterExpression = Expression.Parameter(typeof(T), "data");
        private static readonly Expression _foreignKeyPropertyExpression;

        static ActivePageReferenceFilter()
        {
            PropertyInfo foreignKeyPropertyInfo = DataAssociationRegistry.GetForeignKeyPropertyInfo(typeof(IPage), typeof(T));
            _foreignKeyPropertyExpression = Expression.Property(_parameterExpression, foreignKeyPropertyInfo);
        }

        public ActivePageReferenceFilter(EntityTokenFactory entityTokenFactory)
            : base("ActivePageReferenceFilter", typeof(T).FullName, typeof(Expression<Func<T, bool>>), entityTokenFactory)
        {
            this.ResourceHandleNameStem = "Composite.IDataGenerated.Filter.ActivePageReferenceFilter";
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



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            PageAssociationScope pageAssociationScope;
            Expression filter;

            if (parameters.TryGetParameter<PageAssociationScope>("PageAssociationScope", out pageAssociationScope) == false)
            {
                pageAssociationScope = PageAssociationScope.CurrentPage;
            }

            switch (pageAssociationScope)
            {
                case PageAssociationScope.CurrentPage:
                    Guid currentPageId = PageRenderer.CurrentPageId;
                    filter = Expression.Equal(_foreignKeyPropertyExpression, Expression.Constant(currentPageId));
                    break;
                case PageAssociationScope.AllPages:
                    filter = Expression.Constant(true);
                    break;
                default:
                    Guid pageId = PageRenderer.CurrentPageId;

                    IEnumerable<Guid> pageIds = new FilterWrapper(
                        pageId, 
                        pageAssociationScope, TableVersion.Get(typeof(IPageStructure)),
                        PageStructureInfo.GetAssociatedPageIds(pageId, pageAssociationScope));

                    Expression<Func<Guid, bool>> containsExpression = f => pageIds.Contains(f);
                    filter = Expression.Invoke(containsExpression, _foreignKeyPropertyExpression);
                    break;
            }

            return Expression.Lambda<Func<T, bool>>(filter, new ParameterExpression[] { _parameterExpression });
        }


        public static IEnumerable<KeyValuePair<PageAssociationScope, string>> PageAssociationRestrictions()
        {
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.CurrentPage, "Current page");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.AllPages, "All pages (no filter)");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.AncestorAndCurrentPages, "Ancestors and current (breadcrumb)");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.AncestorPages, "Ancestor pages");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.ParentPage, "Parent page");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.CurrentAndDescendantPages, "Current and descendant pages");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.ChildPages, "Child pages");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.SiblingPages, "Sibling pages");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level1Page, "Level 1 page (homepage)");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level1AndDescendantPages, "Level 1 and descendant pages (current site)");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level1AndSiblingPages, "Level 1 and sibling pages (all homepages)");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level2Page, "Level 2 page");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level2AndDescendantPages, "Level 2 and descendant pages");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level2AndSiblingPages, "Level 2 and sibling pages (site main areas)");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level3Page, "Level 3 page");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level3AndDescendantPages, "Level 3 and descendant pages");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level3AndSiblingPages, "Level 3 and sibling pages");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level4Page, "Level 4 page");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level4AndDescendantPages, "Level 4 and descendant pages");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level4AndSiblingPages, "Level 4 and sibling pages");
        }


        private class FilterWrapper : CacheKeyBuilderExpressionVisitor.ICacheKeyProvider, IEnumerable<Guid>
        {
            private Guid _pageId;
            private PageAssociationScope _associationScope;
            private int _tableVersion;
            private IEnumerable<Guid> _innerEnumerator;

            public FilterWrapper(Guid pageId, PageAssociationScope associationScope, int tableVersion, IEnumerable<Guid> innerEnumerator)
            {
                _pageId = pageId;
                _associationScope = associationScope;
                _tableVersion = tableVersion;
                _innerEnumerator = innerEnumerator;
            }

            public string GetCacheKey()
            {
                return ("APRFilter" +_pageId) + (_associationScope + _tableVersion);
            }

            public IEnumerator<Guid> GetEnumerator()
            {
                return _innerEnumerator.GetEnumerator();
            }

            System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
            {
                return _innerEnumerator.GetEnumerator();
            }
        }

	}
}
