using System;
using Composite.Data;

namespace Composite.Core.Routing
{
    /// <summary>
    /// Provides a link between a data item and a url
    /// </summary>
    public interface IDataUrlMapper 
    {
        /// <summary>
        /// Gets a data item by page url data
        /// </summary>
        /// <param name="pageUrlData"></param>
        /// <returns></returns>
        IDataReference GetData(PageUrlData pageUrlData);

        /// <summary>
        /// Gets page url data by a a data item
        /// </summary>
        /// <param name="instance"></param>
        /// <returns></returns>
        PageUrlData GetPageUrlData(IDataReference instance);
    }
}
