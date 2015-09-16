using Composite.Core.Routing;
using Composite.Data;

namespace Composite.Functions
{
    /// <exclude />
    public interface IRoutedDataUrlMapper
    {
        /// <exclude />
        RoutedDataModel GetRouteDataModel(PageUrlData pageUrlData);
        /// <exclude />
        PageUrlData BuildItemUrl(IData item);
    }
}
