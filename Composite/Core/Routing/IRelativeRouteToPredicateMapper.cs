using System;
using System.Collections.Specialized;
using System.Linq.Expressions;


namespace Composite.Core.Routing
{
    /// <exclude />
    public class RelativeRoute
    {
        /// <exclude />
        public string[] PathSegments { get; set; }

        /// <exclude />
        public NameValueCollection QueryString { get; set; }
    }

    /// <exclude />
    public interface IRelativeRouteToPredicateMapper
    {
        /// <summary>
        /// Returns the amount of path info segments, handled by current mapper.
        /// </summary>
        int PathSegmentsCount { get; }
    }

    /// <exclude />
    public interface IRelativeRouteToPredicateMapper<T> : IRelativeRouteToPredicateMapper
    {
        /// <summary>
        /// Gets a predicate for filtering data based on a url segment
        /// </summary>
        /// <param name="pageId"></param>
        /// <param name="route">The relative route</param>
        /// <returns></returns>
        Expression<Func<T, bool>> GetPredicate(Guid pageId, RelativeRoute route);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fieldValue"></param>
        /// <returns></returns>
        RelativeRoute GetRoute(T fieldValue);
    }
}
