using Composite.Core.Application;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Composite.C1Console.Components
{
    [ApplicationStartup()]
    public class ComponentChangeNotifierRegistrator
    {
        /// <exclude>
        public void ConfigureServices(IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton(typeof(ComponentChangeNotifier));
        }
    }


    public class ComponentChange
    {
        public string ProviderId { get; set; }

    }

    public class ComponentChangeNotifier : IObservable<ComponentChange>
    {
        public ComponentChangeNotifier()
        {
            observers = new List<IObserver<ComponentChange>>();
        }

        private List<IObserver<ComponentChange>> observers;

        public IDisposable Subscribe(IObserver<ComponentChange> observer)
        {
            if (!observers.Contains(observer))
                observers.Add(observer);
            return new Unsubscriber(observers, observer);
        }


        private class Unsubscriber : IDisposable
        {
            private List<IObserver<ComponentChange>> _observers;
            private IObserver<ComponentChange> _observer;

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

        public void ProviderChange(string providerId)
        {
            var change = new ComponentChange { ProviderId = providerId };
            foreach (var observer in observers)
            {
                observer.OnNext(change);
            }
        }

    }
}
