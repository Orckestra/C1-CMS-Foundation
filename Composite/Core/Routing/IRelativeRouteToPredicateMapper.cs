using System;
using System.Collections.Specialized;
using System.Linq;
using System.Linq.Expressions;
using System.Web;


namespace Composite.Core.Routing
{
    /// <exclude />
    public class RelativeRoute
    {
        /// <exclude />
        public string[] PathSegments { get; set; }

        /// <exclude />
        public NameValueCollection QueryString { get; set; }

        /// <exclude />
        public override string ToString()
        {
            string result = PathSegments != null ? string.Join("/", PathSegments) : string.Empty;

            if (result != string.Empty)
            {
                result = "/" + result;
            }

            if (QueryString != null && QueryString.Count > 0)
            {
                Func<string, string> encode = HttpUtility.HtmlAttributeEncode;

                result += "?" + string.Join("&",
                            QueryString.Cast<string>().Select(key => $"{encode(key)}={encode(QueryString[key])}"));

            }

            return result;
        }
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
