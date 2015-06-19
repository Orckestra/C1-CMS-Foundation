using Composite.Core.WebClient.Renderings.Page;
using Composite.Data;

namespace Composite.Functions
{
    /// <summary>
    /// Parameter return type for functions handling data references passed via url
    /// </summary>
    /// <typeparam name="T">The data type.</typeparam>
    public class PathInfoRoutedData<T>: RoutedData<T> where T: class, IData
    {
        public override IRoutedDataUrlMapper GetUrlMapper()
        {
            var page = PageRenderer.CurrentPage;
            Verify.IsNotNull(page, "The current page is not set");

            return new PathInfoRoutedDataUrlMapper<T>(page);
        }
    }
}
