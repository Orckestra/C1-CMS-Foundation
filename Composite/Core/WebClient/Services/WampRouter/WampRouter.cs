using System;
using System.Linq;
using System.Reactive.Subjects;
using System.Web.Routing;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using WampSharp.AspNet.WebSockets.Server;
using WampSharp.Binding;
using WampSharp.Logging;
using WampSharp.V2;
using WampSharp.V2.Realm;

namespace Composite.Core.WebClient.Services.WampRouter
{
    internal class WampRouter
    {
        private const string DefaultRealmName = "realm";
        private const string WampConsoleUrl = "api/Router";
        private WampHost _host;

        public WampRouter()
        {
            LogProvider.SetCurrentLogProvider(new WampLogger());
            try
            {
                StartWampRouter();
                Log.LogInformation(nameof(WampRouter),"WAMP router initiated successfully");
            }
            catch (Exception e)
            {
                Log.LogCritical(nameof(WampRouter), "WAMP router could not be instantiated");
                Log.LogCritical(nameof(WampRouter), e);
            }
            
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
                if (!realm.TopicContainer.TopicUris.Any(f => f.Equals(eventObservable.Topic)))
                {
                    Log.LogVerbose(nameof(WampRouter),
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
            _host = new WampAuthenticationHost(new UserNameBasedAuthenticationFactory());

            string routeUrl = $"{UrlUtils.AdminFolderName}/{WampConsoleUrl}";
            if (routeUrl.StartsWith("/"))
            {
                routeUrl = routeUrl.Substring(1);
            }

            _host.RegisterTransport(
                new AspNetWebSocketTransport(routeUrl, new UserNameBasedCookieAuthenticationFactory()),
                new JTokenJsonBinding(new JsonSerializer
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                }));
            
            IWampHostedRealm realm = _host.RealmContainer.GetRealmByName(DefaultRealmName);

            realm.SessionCreated += SessionCreated;
            realm.SessionClosed += SessionRemoved;
            _host.Open();

            FixWampRoute(routeUrl);
        }

        private static void FixWampRoute(string routeUrl)
        {
            var routes = RouteTable.Routes;

            for (int i = 0; i < routes.Count; i++)
            {
                var route = routes[i] as Route;
                if (route?.Url == routeUrl)
                {
                    routes.Remove(route);
                    routes.Add(new WampRouteWrapper(route));
                    return;
                }
            }
        }


        private static void SessionCreated(object sender, WampSessionCreatedEventArgs e)
        {
            Log.LogVerbose(nameof(WampRouter),"A new WAMP client is connected");
        }

        private static void SessionRemoved(object sender, WampSessionCloseEventArgs e)
        {
            Log.LogVerbose(nameof(WampRouter), "A connection error occured");
        }
    }
}

