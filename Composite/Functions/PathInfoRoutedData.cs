using System;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Data;
using Microsoft.Framework.DependencyInjection;

namespace Composite.Functions
{
    /// <summary>
    /// Contains subclasses that can be used as function parameters that provide data routing.
    /// </summary>
    public static class RoutedData
    {
        /// <summary>
        /// Registers function parameter types that enable data url routing.
        /// </summary>
        /// <param name="serviceCollection"></param>
        public static void ConfigureServices(IServiceCollection serviceCollection)
        {
            Action<Type> registerType = type => serviceCollection.Add(new ServiceDescriptor(type, type, ServiceLifetime.Scoped));

            registerType(typeof(ById<>));
            registerType(typeof(ByIdAndLabel<>));
            registerType(typeof(ByLabel<>));
        }

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
