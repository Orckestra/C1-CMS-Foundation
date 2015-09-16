using System;
using System.Collections.Specialized;
using System.Linq.Expressions;


namespace Composite.Core.Routing
{
    public class RelativeRoute
    {
        public string[] PathSegments { get; set; }
        public NameValueCollection QueryString { get; set; }
    }


    public interface IRelativeRouteToPredicateMapper
    {
        /// <summary>
        /// Returns the amount of path info segments, handled by current mapper.
        /// </summary>
        int PathSegmentsCount { get; }
    }

    public interface IRelativeRouteToPredicateMapper<T> : IRelativeRouteToPredicateMapper
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="route">The relative route</param>
        /// <returns></returns>
        Expression<Func<T, bool>> GetPredicate(RelativeRoute route);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fieldValue"></param>
        /// <returns></returns>
        RelativeRoute GetRoute(T fieldValue);
    }
}
