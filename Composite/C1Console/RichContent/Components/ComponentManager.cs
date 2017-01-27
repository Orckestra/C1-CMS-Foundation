using Composite.Core;
using Composite.Core.Application;
using Composite.Core.Logging;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Composite.C1Console.RichContent.Components
{
    [ApplicationStartup()]
    internal class ComponentManagerRegistrator
    {
        public void ConfigureServices(IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton(typeof(ComponentManager));
        }
    }


    /// <summary>
    /// Get this class through the <see cref="Composite.Core.ServiceLocator"/>. Describes components registered. 
    /// </summary>
    public class ComponentManager : IObserver<ComponentChange>
    {
        /// <summary>
        /// Instanciates a new instance of the ComponentManager. This class aggregate Components delivered from providers
        /// implementing <see cref="IComponentProvider"/> and registered with <see cref="ServiceLocator"/>.
        /// Get this class from <see cref="ServiceLocator"/>.
        /// </summary>
        /// <param name="providers">Providers the ComponentManager should read from.</param>
        /// <param name="changeNotifier">Service to signal changes in providers</param>
        /// <param name="log">Service to write to log</param>
        public ComponentManager(IEnumerable<IComponentProvider> providers, ComponentChangeNotifier changeNotifier, ILog log)
        {
            _log = log;
            _providers = providers.ToList();
            _notifierUnsubscriber = changeNotifier.Subscribe(this);

            _log.LogVerbose(nameof(ComponentManager), "Registering {0} IComponentProvider instances: {1}", _providers.Count, string.Join(",", _providers.Select(f => f.ProviderId)));
        }

        private readonly ILog _log;
        private readonly List<IComponentProvider> _providers;
        private IDisposable _notifierUnsubscriber;
        private List<Component> _componentCache;

        /// <summary>
        /// Returns all known Components
        /// </summary>
        /// <returns>Components</returns>
        public IEnumerable<Component> GetComponents()
        {
            var components = _componentCache;
            if (components == null)
            {
                components = _providers.SelectMany(p => p.GetComponents()).ToList();
                _componentCache = components;
            }
            return components;
        }



        #region Change notifications
        void IObserver<ComponentChange>.OnCompleted()
        {
            _log.LogWarning(nameof(ComponentManager), "Unexpected ComponentChange OnCompleted called");
        }

        void IObserver<ComponentChange>.OnError(Exception error)
        {
            _log.LogError(nameof(ComponentManager), error);
        }

        void IObserver<ComponentChange>.OnNext(ComponentChange value)
        {
            _componentCache = null;
            _log.LogInformation(nameof(ComponentManager), "We should flush some cache here.." + value.ProviderId);
        }
        #endregion
    }
}
