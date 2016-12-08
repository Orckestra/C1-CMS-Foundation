using System;
using System.Reactive.Subjects;
using WampSharp.Binding;
using WampSharp.Logging;
using WampSharp.V2;
using WampSharp.V2.Realm;

namespace Composite.Core.WebClient.Services.WampRouter
{
    internal class WampRouter
    {
        private const string DefaultRealmName = "realm";
        private WampHost _host;

        public WampRouter()
        {
            LogProvider.SetCurrentLogProvider(new WampLogger());

            StartWampRouter();
        }

        public void RegisterCallee(IRpcService instance)
        {
            RegisterCallee(DefaultRealmName, instance);
        }

        public void RegisterCallee(string realmName, IRpcService instance) 
        {
            var realm = _host.RealmContainer.GetRealmByName(realmName);

            var registrationTask = realm.Services.RegisterCallee(instance);
            registrationTask.Wait();
        }

        public void RegisterPublisher<T1, T2>(string topicName, IWampEventHandler<T1, T2> eventObservable)
        {
            RegisterPublisher(DefaultRealmName, topicName, eventObservable);
        }

        public void RegisterPublisher<T1,T2>(string realmName, string topicName, IWampEventHandler<T1,T2> eventObservable)
        {
            IWampHostedRealm realm = _host.RealmContainer.GetRealmByName(realmName);

            ISubject<T2> subject =
                realm.Services.GetSubject<T2>(topicName);

            IObservable<T1> observableEvent = eventObservable.Event;

            IDisposable disposable =
                observableEvent.Subscribe(x =>
                {
                    try
                    {
                        subject.OnNext(eventObservable.GetNewData());
                    }
                    catch (Exception)
                    {
                        //TODO: Why it publishes data and generates error
                    }
                });
        }

        private void StartWampRouter()
        {
            _host = new WampHost();
            _host.RegisterTransport(new AspNetWebsocketTransform(),
                new JTokenJsonBinding());
            
            IWampHostedRealm realm = _host.RealmContainer.GetRealmByName(DefaultRealmName);

            realm.SessionCreated += SessionCreated;
            realm.SessionClosed += SessionRemoved;
            _host.Open();
        }
        private static void SessionCreated(object sender, WampSessionCreatedEventArgs e)
        {
            Log.LogVerbose(nameof(WampRouter),"A new wamp client is connected");
        }

        private static void SessionRemoved(object sender, WampSessionCloseEventArgs e)
        {
            Log.LogVerbose(nameof(WampRouter), "A connection error occured");
        }
    }
}

