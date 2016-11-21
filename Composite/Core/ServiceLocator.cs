using System;
using System.Linq;
using System.Web;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Collections.Concurrent;

namespace Composite.Core
{
    /// <summary>
    /// A mechanism for retrieving a service objects; that is, an object that provides custom support to other objects.
    /// 
    /// To register a service, see <see cref="Composite.Core.Application.ApplicationStartupAttribute"/> 
    /// </summary>
    /// <remarks>
    /// The underlying plumbing is from <see cref="Microsoft.Extensions.DependencyInjection"/>.
    /// </remarks>
    public static class ServiceLocator
    {
        private const string HttpContextKey = "HttpApplication.ServiceScope";
        private static IServiceCollection _serviceCollection;
        private static IServiceProvider _serviceProvider = null;
        private static ConcurrentDictionary<Type, bool> _hasTypeLookup = new ConcurrentDictionary<Type, bool>();

        /// <summary>
        /// Get service of type T
        /// </summary>
        /// <typeparam name="T">The type of service object to get</typeparam>
        /// <returns>A service object of type T or null if there is no such service</returns>
        public static T GetService<T>()
        {
            return ServiceProvider.GetService<T>();
        }


        /// <summary>
        /// Get service of type T
        /// </summary>
        /// <typeparam name="T">The type of service object to get</typeparam>
        /// <exception cref="System.InvalidOperationException">There is no service of type T</exception>
        /// <returns>A service object of type T or null if there is no such service</returns>
        public static T GetRequiredService<T>()
        {
            return ServiceProvider.GetRequiredService<T>();
        }


        /// <summary>
        /// Get services of type T
        /// </summary>
        /// <typeparam name="T">The type of service objects to get</typeparam>
        /// <returns>An enumerable of service objects of type T</returns>
        public static IEnumerable<T> GetServices<T>()
        {
            return ServiceProvider.GetServices<T>();
        }


        /// <summary>
        /// Get service of the specified type
        /// </summary>
        /// <param name="serviceType">The type of service object to get</param>
        /// <returns>A service object of type serviceType or null if there is no such service</returns>
        public static object GetService(Type serviceType)
        {
            return ServiceProvider.GetService(serviceType);
        }


        /// <summary>
        /// Get service of the specified type
        /// </summary>
        /// <param name="serviceType">The type of service object to get</param>
        /// <exception cref="System.InvalidOperationException">There is no service of type serviceType</exception>
        /// <returns>A service object of type serviceType</returns>
        public static object GetRequiredService(Type serviceType)
        {
            return ServiceProvider.GetRequiredService(serviceType);
        }

        
        /// <summary>
        /// Get services of the specified type
        /// </summary>
        /// <param name="serviceType">The type of service objects to get</param>
        /// <returns>An enumerable of service objects of type serviceType</returns>
        public static IEnumerable<object> GetServices(Type serviceType)
        {
            return ServiceProvider.GetServices(serviceType);
        }




        /// <summary>
        /// Gets an application service provider
        /// </summary>
        internal static IServiceProvider ServiceProvider
        {
            get
            {
                Verify.IsNotNull(_serviceProvider,"IServiceProvider not build - call out of expected sequence.");

                return RequestScopedServiceProvider ?? _serviceProvider;
            }
        }


  
        internal static bool HasService(Type serviceType)
        {
            Verify.ArgumentNotNull(serviceType, nameof(serviceType));
            Verify.IsNotNull(_serviceProvider, "IServiceProvider not build - call out of expected sequence.");

            bool hasType;

            if (!_hasTypeLookup.TryGetValue(serviceType, out hasType))
            {
                if (ServiceCollection.Any(sd => sd.ServiceType.IsAssignableFrom(serviceType)
                                                   || (serviceType.IsGenericType
                                                        && sd.ServiceType.IsAssignableFrom(serviceType.GetGenericTypeDefinition()))))
                {
                    hasType = true;
                }

                try
                {
                    hasType = ServiceProvider.GetService(serviceType) != null;
                }
                catch (Exception)
                {
                    hasType = false;
                }

                _hasTypeLookup.TryAdd(serviceType, hasType);
            }

            return hasType;
        }


        /// <summary>
        /// A service collection to be populated at startup
        /// </summary>
        internal static IServiceCollection ServiceCollection
        {
            get
            {
                Verify.IsNull(_serviceProvider, "ServiceCollection accessed after ServiceProvider build-up - call out of sequence.");

                if (_serviceCollection == null)
                {
                    _serviceCollection = new ServiceCollection();
                }
                return _serviceCollection;
            } 
        }


        internal static void BuildServiceProvider()
        {
            _serviceProvider = _serviceCollection.BuildServiceProvider();
        }


        /// <summary>
        /// Creates a service scope associated with the current http context
        /// </summary>
        internal static void CreateRequestServicesScope(HttpContext context)
        {
            Verify.ArgumentNotNull(context, nameof(context));
            Verify.IsNotNull(_serviceProvider, "ServiceProvider not initialized yet");
            Verify.IsNull(context.Items[HttpContextKey], "Multiple calls to CreateRequestServicesScope unexpected");

            var serviceScopeFactory = (IServiceScopeFactory)_serviceProvider.GetService(typeof(IServiceScopeFactory));
            var serviceScope = serviceScopeFactory.CreateScope();

            context.Items[HttpContextKey] = serviceScope;
        }


        /// <summary>
        /// Disposes a service scope associated with the current http context
        /// </summary>
        internal static void DisposeRequestServicesScope(HttpContext context)
        {
            Verify.ArgumentNotNull(context, nameof(context));
            var scope = (IServiceScope)context.Items[HttpContextKey];
            if (scope != null)
            {
                scope.Dispose();
            }
        }


        /// <summary>
        /// Return a IServiceScope - if a scope has been initialized on the request (HttpContext) a scoped provider is returned.
        /// </summary>
        private static IServiceProvider RequestScopedServiceProvider
        {
            get
            {
                var context = HttpContext.Current;
                if (context == null) return null;

                var scope = (IServiceScope)context.Items[HttpContextKey];

                return scope != null ? scope.ServiceProvider : null;
            }
        }

    }
}
