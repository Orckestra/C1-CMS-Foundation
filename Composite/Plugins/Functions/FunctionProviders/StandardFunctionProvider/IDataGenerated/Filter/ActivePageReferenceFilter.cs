using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Data.Caching;
using Composite.Data.Foundation;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Core.Linq.ExpressionVisitors;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Data;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.IDataGenerated.Filter
{
	internal sealed class ActivePageReferenceFilter<T> : StandardFunctionBase
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
                    "SitemapScope",
                    typeof(SitemapScope),
                    false,
                    new ConstantValueProvider(SitemapScope.Current),
                    associationDropDown);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            SitemapScope SitemapScope;
            Expression filter;

            if (parameters.TryGetParameter<SitemapScope>("SitemapScope", out SitemapScope) == false)
            {
                SitemapScope = SitemapScope.Current;
            }

            switch (SitemapScope)
            {
                case SitemapScope.Current:
                    Guid currentPageId = PageRenderer.CurrentPageId;
                    filter = Expression.Equal(_foreignKeyPropertyExpression, Expression.Constant(currentPageId));
                    break;
                case SitemapScope.All:
                    filter = Expression.Constant(true);
                    break;
                default:
                    Guid pageId = PageRenderer.CurrentPageId;

                    IEnumerable<Guid> pageIds = new FilterWrapper(
                        pageId, 
                        SitemapScope, TableVersion.Get(typeof(IPageStructure)),
                        PageStructureInfo.GetAssociatedPageIds(pageId, SitemapScope));

                    Expression<Func<Guid, bool>> containsExpression = f => pageIds.Contains(f);
                    filter = Expression.Invoke(containsExpression, _foreignKeyPropertyExpression);
                    break;
            }

            return Expression.Lambda<Func<T, bool>>(filter, new ParameterExpression[] { _parameterExpression });
        }


        public static IEnumerable<KeyValuePair<SitemapScope, string>> PageAssociationRestrictions()
        {
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Current, "Current page");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.All, "All pages (no filter)");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.AncestorsAndCurrent, "Ancestors and current (breadcrumb)");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Ancestors, "Ancestor pages");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Parent, "Parent page");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.DescendantsAndCurrent, "Current and descendant pages");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Children, "Child pages");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Siblings, "Sibling pages");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level1, "Level 1 page (homepage)");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level1AndDescendants, "Level 1 and descendant pages (current site)");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level1AndSiblings, "Level 1 and sibling pages (all homepages)");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level2, "Level 2 page");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level2AndDescendants, "Level 2 and descendant pages");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level2AndSiblings, "Level 2 and sibling pages (site main areas)");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level3, "Level 3 page");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level3AndDescendants, "Level 3 and descendant pages");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level3AndSiblings, "Level 3 and sibling pages");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level4, "Level 4 page");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level4AndDescendants, "Level 4 and descendant pages");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level4AndSiblings, "Level 4 and sibling pages");
        }


        private class FilterWrapper : CacheKeyBuilderExpressionVisitor.ICacheKeyProvider, IEnumerable<Guid>
        {
            private Guid _pageId;
            private SitemapScope _associationScope;
            private int _tableVersion;
            private IEnumerable<Guid> _innerEnumerator;

            public FilterWrapper(Guid pageId, SitemapScope associationScope, int tableVersion, IEnumerable<Guid> innerEnumerator)
            {
                _pageId = pageId;
                _associationScope = associationScope;
                _tableVersion = tableVersion;
                _innerEnumerator = innerEnumerator;
            }

            public string GetCacheKey()
            {
                return "APRFilter" + GetRootForSelectionScope() + _associationScope + _tableVersion;
            }

            private Guid GetRootForSelectionScope()
            {
                switch (_associationScope)
                {
                    case SitemapScope.All:
                        return Guid.Empty;
                    case SitemapScope.Parent:
                        return PageManager.GetParentId(_pageId);
                    case SitemapScope.Level1:
                    case SitemapScope.Level1AndSiblings:
                    case SitemapScope.Level1AndDescendants:
                        return GetPageOnLevel(1);
                    case SitemapScope.Level2:
                    case SitemapScope.Level2AndSiblings:
                    case SitemapScope.Level2AndDescendants:
                        return GetPageOnLevel(2);
                    case SitemapScope.Level3:
                    case SitemapScope.Level3AndSiblings:
                    case SitemapScope.Level3AndDescendants:
                        return GetPageOnLevel(3);
                    case SitemapScope.Level4:
                    case SitemapScope.Level4AndSiblings:
                    case SitemapScope.Level4AndDescendants:
                        return GetPageOnLevel(4);
                }
                return _pageId;
            }

            private Guid GetPageOnLevel(int level)
            {
                var ancestorsChain = new List<Guid>();
                Guid currentPage = _pageId;

                while(currentPage != Guid.Empty && ancestorsChain.Count < 1000)
                {
                    ancestorsChain.Add(currentPage);
                    currentPage = PageManager.GetParentId(currentPage);
                }

                if (level > ancestorsChain.Count) return Guid.Empty;

                return ancestorsChain[ancestorsChain.Count - level];
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
