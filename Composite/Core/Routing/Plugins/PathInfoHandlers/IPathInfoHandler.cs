using Composite.Data.Types;

namespace Composite.Core.Routing.Plugins.PathInfoHandlers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IPathInfoHandler
    {
        /// <summary>
        /// Entry point for a modules that handle PathInfo part of requests to C1 pages
        /// </summary>
        /// <example>
        /// If there's a request http://composite.net/blog/2011/01/02
        /// An the system knows that page http://composite.net/blog exists, this method will be called for all page info handlers with parameters:
        /// page = {id of the "blog" page}, pathInfo = "/2011/01/02"
        /// </example>
        /// <param name="page"></param>
        /// <param name="pathInfo"></param>
        /// <returns>true, if module handles this request</returns>
        bool Handle(IPage page, string pathInfo);
    }
}
