using System;

using Microsoft.Extensions.DependencyInjection;

namespace Composite.AspNet
{
    internal class WebObjectActivator : IServiceProvider
    {
        private readonly IServiceProvider _inner;

        public WebObjectActivator(IServiceProvider inner)
        {
            _inner = inner;
        }

        public object GetService(Type serviceType)
        {
            var service = _inner.GetService(serviceType);

            // Multiple types from System.Web.dll have internal constructors
            // Ignoring those types to have a better debugging experience
            if (service == null
                && serviceType.Assembly != typeof(System.Web.IHttpModule).Assembly)
            {
                try
                {
                    service = ActivatorUtilities.CreateInstance(_inner, serviceType);
                }
                catch (InvalidOperationException)
                {
                }
            }

            return service ?? Activator.CreateInstance(serviceType, true);
        }
    }
}
