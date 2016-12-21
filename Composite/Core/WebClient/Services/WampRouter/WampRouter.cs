using System;
using System.Linq;
using System.Reactive.Subjects;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using WampSharp.Binding;
using WampSharp.Logging;
using WampSharp.V2;
using WampSharp.V2.Realm;

namespace Composite.Core.WebClient.Services.WampRouter
{
    /// <exclude />
    [Route("Composite/api/Router")]
    public class MyRouterController : AspNetWebsocketTransform.RouterController
    {
        /// <exclude />
        public MyRouterController() : this(ServiceLocator.GetService<WampRouter>().GetTransport())
        {
        }

        /// <exclude />
        public MyRouterController(AspNetWebsocketTransform aspNetWebsocketTransform) 
                : base(aspNetWebsocketTransform)
        {
        }
    }

    internal class WampRouter
    {
        private const string DefaultRealmName = "realm";
        private WampHost _host;
        private AspNetWebsocketTransform _aspNetWebsocketTransform;

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

        public void RegisterPublisher<TObservable, TResult>
            (IWampEventHandler<TObservable, TResult> eventObservable)
        {
            RegisterPublisher(DefaultRealmName, eventObservable);
        }

        public void RegisterPublisher<TObservable, TResult>
            (string realmName, IWampEventHandler<TObservable,TResult> eventObservable)
        {
            IWampHostedRealm realm = _host.RealmContainer.GetRealmByName(realmName);

            ISubject<TResult> subject =
                realm.Services.GetSubject<TResult>(eventObservable.Topic);

            IObservable<TObservable> observableEvent = eventObservable.Event;

            observableEvent.Subscribe(x =>
            {
                if (realm.TopicContainer.TopicUris.FirstOrDefault(f => f.Equals(eventObservable.Topic)) == null)
                {
                    Log.LogWarning(nameof(WampRouter),
                        $"Trying to publish on topic: {eventObservable.Topic}, but there is no subscriber to this topic");
                }
                else
                {
                    subject.OnNext(eventObservable.GetNewData());
                }
                    
            });
        }

        private void StartWampRouter()
        {
            _host = new WampHost();
            _aspNetWebsocketTransform = new AspNetWebsocketTransform();

            _host.RegisterTransport(_aspNetWebsocketTransform,
                new JTokenJsonBinding(new JsonSerializer()
                { ContractResolver = new CamelCasePropertyNamesContractResolver()}));
            
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

        public AspNetWebsocketTransform GetTransport()
        {
            return _aspNetWebsocketTransform;
        }
    }
}

