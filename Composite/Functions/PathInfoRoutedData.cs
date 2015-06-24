using Composite.Core.WebClient.Renderings.Page;
using Composite.Data;

namespace Composite.Functions
{
    public static class RoutedData
    {
        /// <summary>
        /// Parameter return type for functions handling data references passed via url {pageUrl}/{DataId}
        /// </summary>
        /// <typeparam name="T">The data type.</typeparam>
        public class ById<T> : RoutedData<T> where T : class, IData
        {
            /// <exclude />
            protected override IRoutedDataUrlMapper GetUrlMapper()
            {
                var page = PageRenderer.CurrentPage;
                Verify.IsNotNull(page, "The current page is not set");

                return new PathInfoRoutedDataUrlMapper<T>(page, PathInfoRoutedDataUrlMapper<T>.DataRouteKind.Key);
            }
        }

        /// <summary>
        /// Parameter return type for functions handling data references passed via url {pageUrl}/{DataId}
        /// </summary>
        /// <typeparam name="T">The data type.</typeparam>
        public class ByIdAndLabel<T> : RoutedData<T> where T : class, IData
        {
            /// <exclude />
            protected override IRoutedDataUrlMapper GetUrlMapper()
            {
                var page = PageRenderer.CurrentPage;
                Verify.IsNotNull(page, "The current page is not set");

                return new PathInfoRoutedDataUrlMapper<T>(page, PathInfoRoutedDataUrlMapper<T>.DataRouteKind.KeyAndLabel);
            }
        }

        /// <summary>
        /// Parameter return type for functions handling data references passed via url {pageUrl}/{DataId}
        /// </summary>
        /// <typeparam name="T">The data type.</typeparam>
        public class ByLabel<T> : RoutedData<T> where T : class, IData
        {
            /// <exclude />
            protected override IRoutedDataUrlMapper GetUrlMapper()
            {
                var page = PageRenderer.CurrentPage;
                Verify.IsNotNull(page, "The current page is not set");

                // return new LabelDataUrlMapper(page);
                return new PathInfoRoutedDataUrlMapper<T>(page, PathInfoRoutedDataUrlMapper<T>.DataRouteKind.Label);
            }
        }
    }
}
