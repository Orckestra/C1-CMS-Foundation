using System;
using System.Linq;
using System.Web;
using Microsoft.Extensions.DependencyInjection;

namespace Composite.Core.Application
{
    /// <summary>
    /// Build in service locator that is used for the injecting dependencies into c1 functions.
    /// </summary>
    internal static class ServiceLocator
    {
        private const string HttpContextKey = "HttpApplication.ServiceScope";
        private static IServiceCollection _serviceCollection;
        private static IServiceProvider _serviceProvider;

        /// <summary>
        /// A service collection to be populated at startup
        /// </summary>
        internal static IServiceCollection ServiceCollection
        {
            get
            {
                if (_serviceCollection == null)
                {
                    _serviceCollection = new ServiceCollection();
                }
                return _serviceCollection;
            } 
            set { _serviceCollection = value; }
        }

        internal static void BuildServiceProvider()
        {
            _serviceProvider = _serviceCollection.BuildServiceProvider();
        }

        /// <summary>
        /// Gets an application service provider
        /// </summary>
        internal static IServiceProvider ServiceProvider 
        {
            get
            {
                if (_serviceProvider == null)
                {
                    throw new InvalidOperationException("IServiceProvider not build - call out of sequence.");
                }

                return _serviceProvider;
            }
        }


        /// <summary>
        /// Gets a request service provider
        /// </summary>
        internal static IServiceProvider RequestScopedServices
        {
            get
            {
                var context = HttpContext.Current;
                if (context == null) return null;

                var scope = (IServiceScope)context.Items[HttpContextKey];
                return scope != null ? scope.ServiceProvider : null;
            }
        }

        /// <summary>
        /// Creates a service scope associated with the current http context
        /// </summary>
        internal static void CreateRequestServicesScope(HttpContext context)
        {
            if (ServiceProvider == null)
            {
                return;
            }

            var serviceScopeFactory = (IServiceScopeFactory) ServiceProvider.GetService(typeof(IServiceScopeFactory));
            var serviceScope = serviceScopeFactory.CreateScope();

            context.Items[HttpContextKey] = serviceScope;
        }

        /// <summary>
        /// Disposes a service scope associated with the current http context
        /// </summary>
        internal static void DisposeRequestServicesScope(HttpContext context)
        {
            if (ServiceProvider == null)
            {
                return;
            }

            var scope = (IServiceScope)context.Items[HttpContextKey];
            if (scope != null)
            {
                scope.Dispose();
            }
        }

        internal static bool HasService(Type serviceType)
        {
            var serviceCollection = ServiceLocator.ServiceCollection;
            if (serviceCollection != null
                && serviceCollection.Any(sd => sd.ServiceType.IsAssignableFrom(serviceType)
                                               || (serviceType.IsGenericType 
                                                    && sd.ServiceType.IsAssignableFrom(serviceType.GetGenericTypeDefinition()))))
            {
                return true;
            }

            var serviceProvider = RequestScopedServices ?? ServiceProvider;

            if (serviceProvider != null)
            {
                try
                {
                    return serviceProvider.GetService(serviceType) != null;
                }
                catch (Exception)
                {
                    // Some of the services may fail during construction in current context.
                    return true;
                }
            }
            
            return false;
        }
    }
}
