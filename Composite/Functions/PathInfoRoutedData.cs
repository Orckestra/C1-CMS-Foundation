using Composite.Core.WebClient.Renderings.Page;
using Composite.Data;

namespace Composite.Functions
{
    public static class RoutedData
    {
        /// <summary>
        /// Parameter return type for functions handling data references passed via url
        /// </summary>
        /// <typeparam name="T">The data type.</typeparam>
        public class ById<T> : RoutedData<T> where T : class, IData
        {
            /// <exclude />
            protected override IRoutedDataUrlMapper GetUrlMapper()
            {
                var page = PageRenderer.CurrentPage;
                Verify.IsNotNull(page, "The current page is not set");

                return new PathInfoRoutedDataUrlMapper<T>(page);
            }
        }
    }
}
