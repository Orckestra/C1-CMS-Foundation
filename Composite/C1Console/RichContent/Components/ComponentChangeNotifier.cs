using Composite.Core.Application;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;

namespace Composite.C1Console.RichContent.Components
{
    [ApplicationStartup()]
    internal class ComponentChangeNotifierRegistrator
    {
        public void ConfigureServices(IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton(typeof(ComponentChangeNotifier));
        }
    }


    /// <summary>
    /// Component change structure
    /// </summary>
    public class ComponentChange
    {
        /// <summary>
        /// Provider's Id, e.g. provider's class name
        /// </summary>
        public string ProviderId { get; set; }

    }

    /// <summary>
    /// This class manages change notifiers subscribed in component providers
    /// </summary>
    public class ComponentChangeNotifier : IObservable<ComponentChange>
    {
        /// <exclude />
        public ComponentChangeNotifier()
        {
            _observers = new List<IObserver<ComponentChange>>();
        }

        private readonly List<IObserver<ComponentChange>> _observers;

        /// <summary>
        /// Use this method to subscribe an observer
        /// </summary>
        /// <param name="observer"></param>
        public IDisposable Subscribe(IObserver<ComponentChange> observer)
        {
            if (!_observers.Contains(observer))
                _observers.Add(observer);
            return new Unsubscriber(_observers, observer);
        }


        private class Unsubscriber : IDisposable
        {
            private readonly List<IObserver<ComponentChange>> _observers;
            private readonly IObserver<ComponentChange> _observer;

            public Unsubscriber(List<IObserver<ComponentChange>> observers, IObserver<ComponentChange> observer)
            {
                this._observers = observers;
                this._observer = observer;
            }

            public void Dispose()
            {
                if (_observer != null && _observers.Contains(_observer))
                    _observers.Remove(_observer);
            }
        }

        /// <summary>
        /// Notify a change in the provider
        /// </summary>
        /// <param name="providerId"></param>
        public void ProviderChange(string providerId)
        {
            var change = new ComponentChange { ProviderId = providerId };
            foreach (var observer in _observers)
            {
                observer.OnNext(change);
            }
        }

    }
}
