using System;
using System.Collections.Generic;
using System.Globalization;
using Composite.C1Console.Events;
using Composite.Core.Caching;
using Composite.Core.Extensions;
using Composite.Core.Types;
using Subscription = Composite.Core.Types.Pair<System.Delegate, bool>;
using Subscriptions = Composite.Core.Collections.Generic.Hashtable<System.Type, System.Collections.Generic.List<Composite.Core.Types.Pair<System.Delegate, bool>>>;


namespace Composite.Data
{   
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class DataMoveEventArgs : DataEventArgs
    {
        internal DataMoveEventArgs(Type dataType, IData data, DataScopeIdentifier targetDataScopeIdentifier)
            : base(dataType, data)
        {
            this.TargetDataScopeIdentifier = targetDataScopeIdentifier;
        }


        /// <exclude />
        public DataScopeIdentifier TargetDataScopeIdentifier
        {
            get;
            private set;
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class DataEventSystemFacade
    {        
        /// <exclude />
        public delegate void DataAfterMoveDelegate(object sender, DataMoveEventArgs dataMoveEventArgs);

        private static readonly Subscriptions _dataBeforeAddEventDictionary = new Subscriptions();
        private static readonly Subscriptions _dataAfterAddEventDictionary = new Subscriptions();
        private static readonly Subscriptions _dataBeforeUpdateEventDictionary = new Subscriptions();
        private static readonly Subscriptions _dataAfterUpdateEventDictionary = new Subscriptions();
        private static readonly Subscriptions _dataDeletedEventDictionary = new Subscriptions();
        private static readonly Subscriptions _dataAfterBuildNewEventDictionary = new Subscriptions();
        private static readonly Subscriptions _storeChangedEventDictionary = new Subscriptions();

        private static readonly object _collectionAccesslock = new object();


        /// <exclude />
        static DataEventSystemFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }


        private static void Add(this Subscriptions collection, Type dataType, Delegate callback, bool flushPersistent)
        {
            Verify.ArgumentNotNull(callback, "callback");

            Add(collection, dataType, new Subscription(callback, flushPersistent));
        }


        private static void Add(this Subscriptions collection, Type dataType, Subscription subscription)
        {
            Verify.ArgumentNotNull(collection, "collection");
            Verify.ArgumentNotNull(dataType, "dataType");
            Verify.ArgumentNotNull(subscription, "subscription");

            Verify.ArgumentCondition(typeof (IData).IsAssignableFrom(dataType), "dataType",
                                     "dataType does not inherit the type '{0}'".FormatWith(typeof (IData)));

            lock(_collectionAccesslock)
            {
                if(!collection.ContainsKey(dataType))
                {
                    collection.Add(dataType, new List<Subscription>());
                }
                collection[dataType].Add(subscription);
            }
        }

        private static void Remove(this Subscriptions collection, Type dataType, Delegate callback)
        {
            Verify.ArgumentCondition(typeof (IData).IsAssignableFrom(dataType), "dataType",
                                     "dataType does not inherit the type '{0}'".FormatWith(typeof (IData)));

            if(!collection.ContainsKey(dataType))
            {
                return;
            }

            var list = collection[dataType];

            lock (_collectionAccesslock)
            {
                for (int i = list.Count - 1; i >= 0; i--)
                {
                    if (list[i].First == callback)
                    {
                        list.RemoveAt(i);
                        return;
                    }
                }
            }
        }


        private delegate void ExecuteCallback<T>(T callback);

        private static void Fire<DelegateType>(this Subscriptions collection, Type dataType, ExecuteCallback<DelegateType> runner) where DelegateType : class
        {
            Verify.ArgumentNotNull(collection, "collection");
            Verify.ArgumentNotNull(dataType, "dataType");
            Verify.ArgumentNotNull(runner, "runner");

            if (SuppressEventScope.IsEnabled)
            {
                return;
            }

            List<Type> types = GetTypesToFire(dataType);

            foreach (Type type in types)
            {
                Pair<Delegate, bool>[] subscriptions = null;

                if (collection.ContainsKey(type))
                {
                    lock (_collectionAccesslock)
                    {
                        if (collection.ContainsKey(type))
                        {
                            subscriptions = collection[type].ToArray();
                        }
                    }
                }

                if (subscriptions == null) continue;

                foreach (Pair<Delegate, bool> subscription in subscriptions)
                {
                    var callback = subscription.First as DelegateType;
                    Verify.That(callback != null, "Wrong delegate type");

                    runner(callback);
                }
            }
        }


        /// <exclude />
        public static void SubscribeToDataBeforeAdd<T>(DataEventHandler dataBeforeAddDelegate, bool flushPersistent)
            where T : IData
        {
            SubscribeToDataBeforeAdd(typeof(T), dataBeforeAddDelegate, flushPersistent);
        }

        /// <exclude />
        [Obsolete("Use SubscribeToDataBeforeAdd<T>(DataEventHandler, bool)")]
        public static void SubscribeToDataBeforeAdd<T>(DataEventHandler dataBeforeAddDelegate)
            where T : IData
        {
            SubscribeToDataBeforeAdd(typeof(T), dataBeforeAddDelegate);
        }


        /// <exclude />
        [Obsolete("Use SubscribeToDataBeforeAdd(Type, DataEventHandler, bool)")]
        public static void SubscribeToDataBeforeAdd(Type dataType, DataEventHandler dataBeforeAddDelegate) {
            SubscribeToDataBeforeAdd(dataType, dataBeforeAddDelegate, false);
        }


        /// <exclude />
        public static void SubscribeToDataBeforeAdd(Type dataType, DataEventHandler dataBeforeAddDelegate, bool flushPersistent)
        {
            Verify.ArgumentNotNull(dataType, "dataType");
            Verify.ArgumentNotNull(dataBeforeAddDelegate, "dataBeforeAddDelegate");

            _dataBeforeAddEventDictionary.Add(dataType, new Subscription(dataBeforeAddDelegate, flushPersistent));
        }


        /// <exclude />
        public static void UnsubscribeToDataBeforeAdd(Type dataType, DataEventHandler dataBeforeAddDelegate)
        {
            Verify.ArgumentNotNull(dataType, "dataType");
            Verify.ArgumentNotNull(dataBeforeAddDelegate, "dataBeforeAddDelegate");

            _dataBeforeAddEventDictionary.Remove(dataType, dataBeforeAddDelegate);
        }


        /// <exclude />
        public static void SubscribeToDataAfterAdd(Type dataType, DataEventHandler dataAfterAddDelegate, bool flushPersistent)
        {
            Verify.ArgumentNotNull(dataType, "dataType");
            Verify.ArgumentNotNull(dataAfterAddDelegate, "dataAfterAddDelegate");

            _dataAfterAddEventDictionary.Add(dataType, dataAfterAddDelegate, flushPersistent);
        }


        /// <exclude />
        [Obsolete("Use SubscribeToDataAfterAdd(Type, DataEventHandler, bool)")]
        public static void SubscribeToDataAfterAdd(Type dataType, DataEventHandler dataAfterAddDelegate)
        {
            SubscribeToDataAfterAdd(dataType, dataAfterAddDelegate, false);
        }


        /// <exclude />
        public static void SubscribeToDataAfterAdd<T>(DataEventHandler dataAfterAddDelegate, bool flushPersistent)
        {
            SubscribeToDataAfterAdd(typeof(T), dataAfterAddDelegate, flushPersistent);
        }


        /// <exclude />
        [Obsolete("Use SubscribeToDataAfterAdd<T>(DataEventHandler, bool)")]
        public static void SubscribeToDataAfterAdd<T>(DataEventHandler dataAfterAddDelegate)
            where T : IData
        {
            SubscribeToDataAfterAdd(typeof(T), dataAfterAddDelegate);
        }


        /// <exclude />
        public static void SubscribeToStoreChanged(Type dataType, StoreEventHandler storeChangeDelegate, bool flushPersistent)
        {
            Verify.ArgumentNotNull(dataType, "dataType");
            Verify.ArgumentNotNull(storeChangeDelegate, "storeChangeDelegate");

            _storeChangedEventDictionary.Add(dataType, storeChangeDelegate, flushPersistent);
        }


        /// <exclude />
        public static void SubscribeToStoreChanged<T>(StoreEventHandler storeChangeDelegate, bool flushPersistent)
        {
            SubscribeToStoreChanged(typeof(T), storeChangeDelegate, flushPersistent);
        }



        /// <exclude />
        public static void UnsubscribeToDataAfterAdd(Type dataType, DataEventHandler dataAfterAddDelegate)
        {
            if (dataType == null) throw new ArgumentNullException("dataType");
            if (dataAfterAddDelegate == null) throw new ArgumentNullException("dataAfterAddDelegate");

            _dataAfterAddEventDictionary.Remove(dataType, dataAfterAddDelegate);
        }


        /// <exclude />
        public static void UnsubscribeToStoreChanged(Type dataType, StoreEventHandler storeChangeDelegate)
        {
            Verify.ArgumentNotNull(dataType, "dataType");
            Verify.ArgumentNotNull(storeChangeDelegate, "storeChangeDelegate");

            _storeChangedEventDictionary.Remove(dataType, storeChangeDelegate);
        }


        /// <exclude />
        [Obsolete("Use SubscribeToDataBeforeUpdate(Type, DataEventHandler, bool)")]
        public static void SubscribeToDataBeforeUpdate(Type dataType, DataEventHandler dataBeforeUpdateDelegate)
        {
            SubscribeToDataBeforeUpdate(dataType, dataBeforeUpdateDelegate, false);
        }


        /// <exclude />
        public static void SubscribeToDataBeforeUpdate(Type dataType, DataEventHandler dataBeforeUpdateDelegate, bool flushPersistent)
        {
            _dataBeforeUpdateEventDictionary.Add(dataType, dataBeforeUpdateDelegate, flushPersistent);
        }


        /// <exclude />
        [Obsolete("Use SubscribeToDataBeforeUpdate<T>(DataEventHandler, bool)")]
        public static void SubscribeToDataBeforeUpdate<T>(DataEventHandler dataBeforeUpdateDelegate)
            where T : IData
        {
            SubscribeToDataBeforeUpdate(typeof(T), dataBeforeUpdateDelegate);
        }


        /// <exclude />
        public static void SubscribeToDataBeforeUpdate<T>(DataEventHandler dataBeforeUpdateDelegate, bool flushPersistent)
            where T : IData
        {
            SubscribeToDataBeforeUpdate(typeof(T), dataBeforeUpdateDelegate, flushPersistent);
        }


        /// <exclude />
        public static void UnsubscribeToDataBeforeUpdate(Type dataType, DataEventHandler dataBeforeUpdateDelegate)
        {
            _dataBeforeUpdateEventDictionary.Remove(dataType, dataBeforeUpdateDelegate);
        }


        /// <exclude />
        [Obsolete("Use SubscribeToDataAfterUpdate(Type, DataEventHandler, bool)")]
        public static void SubscribeToDataAfterUpdate(Type dataType, DataEventHandler dataAfterUpdateDelegate)
        {
            SubscribeToDataAfterUpdate(dataType, dataAfterUpdateDelegate, false);
        }


        /// <exclude />
        public static void SubscribeToDataAfterUpdate(Type dataType, DataEventHandler dataAfterUpdateDelegate, bool flushPersistent)
        {
            _dataAfterUpdateEventDictionary.Add(dataType, dataAfterUpdateDelegate, flushPersistent);
        }


        /// <exclude />
        [Obsolete("Use SubscribeToDataAfterUpdate<T>(DataEventHandler, bool)")]
        public static void SubscribeToDataAfterUpdate<T>(DataEventHandler dataAfterUpdateDelegate)
            where T : IData
        {
            SubscribeToDataAfterUpdate(typeof(T), dataAfterUpdateDelegate);
        }


        /// <exclude />
        public static void SubscribeToDataAfterUpdate<T>(DataEventHandler dataAfterUpdateDelegate, bool flushPersistent)
            where T : IData
        {
            SubscribeToDataAfterUpdate(typeof(T), dataAfterUpdateDelegate, flushPersistent);
        }


        /// <exclude />
        public static void UnsubscribeToDataAfterUpdate(Type dataType, DataEventHandler dataAfterUpdateDelegate)
        {
            _dataAfterUpdateEventDictionary.Remove(dataType, dataAfterUpdateDelegate);
        }


        /// <exclude />
        [Obsolete("Use SubscribeToDataDeleted(Type, DataEventHandler, bool)")]
        public static void SubscribeToDataDeleted(Type dataType, DataEventHandler dataDeletedDelegate)
        {
            SubscribeToDataDeleted(dataType, dataDeletedDelegate, false);
        }


        /// <exclude />
        public static void SubscribeToDataDeleted(Type dataType, DataEventHandler dataDeletedDelegate, bool flushPersistent)
        {
            _dataDeletedEventDictionary.Add(dataType, dataDeletedDelegate, flushPersistent);
        }


        /// <exclude />
        [Obsolete("Use SubscribeToDataDeleted<T>(DataEventHandler, bool)")]
        public static void SubscribeToDataDeleted<T>(DataEventHandler dataDeletedDelegate)
            where T : IData
        {
            SubscribeToDataDeleted(typeof(T), dataDeletedDelegate);
        }


        /// <exclude />
        public static void SubscribeToDataDeleted<T>(DataEventHandler dataDeletedDelegate, bool flushPersistent)
            where T : IData
        {
            SubscribeToDataDeleted(typeof(T), dataDeletedDelegate, flushPersistent);
        }


        /// <exclude />
        public static void UnsubscribeToDataDeleted(Type dataType, DataEventHandler dataDeletedDelegate)
        {
            _dataDeletedEventDictionary.Remove(dataType, dataDeletedDelegate);
        }


        /// <exclude />
        [Obsolete("Use SubscribeToDataAfterBuildNew(Type, DataEventHandler, bool)")]
        public static void SubscribeToDataAfterBuildNew(Type dataType, DataEventHandler dataAfterBuildNewDelegate)
        {
            SubscribeToDataAfterBuildNew(dataType, dataAfterBuildNewDelegate, false);
        }


        /// <exclude />
        public static void SubscribeToDataAfterBuildNew(Type dataType, DataEventHandler dataAfterBuildNewDelegate, bool flushPersistent)
        {
            _dataAfterBuildNewEventDictionary.Add(dataType, dataAfterBuildNewDelegate, flushPersistent);
        }


        /// <exclude />
        [Obsolete("Use SubscribeToDataAfterBuildNew<T>(DataEventHandler, bool)")]
        public static void SubscribeToDataAfterBuildNew<T>(DataEventHandler dataAfterBuildNewDelegate)
            where T : IData
        {
            SubscribeToDataAfterBuildNew(typeof(T), dataAfterBuildNewDelegate);
        }

        /// <exclude />
        public static void SubscribeToDataAfterBuildNew<T>(DataEventHandler dataAfterBuildNewDelegate, bool flushPersistent)
            where T : IData
        {
            SubscribeToDataAfterBuildNew(typeof(T), dataAfterBuildNewDelegate, flushPersistent);
        }


        /// <exclude />
        public static void UnsubscribeToDataAfterBuildNew(Type dataType, DataEventHandler dataAfterBuildNewDelegate)
        {
            _dataAfterBuildNewEventDictionary.Remove(dataType, dataAfterBuildNewDelegate);
        }


        internal static void FireDataBeforeAddEvent(Type dataType, IData data)
        {
            var args = new DataEventArgs(dataType, data);
            _dataBeforeAddEventDictionary.Fire <DataEventHandler>(dataType, callback => callback(null, args));
        }



        internal static void FireDataBeforeAddEvent<T>(IData data)
            where T : IData
        {
            FireDataBeforeAddEvent(typeof(T), data);
        }



        internal static void FireDataAfterAddEvent(Type dataType, IData data)
        {
            var args = new DataEventArgs(dataType, data);

            _dataAfterAddEventDictionary.Fire<DataEventHandler>(dataType, callback => callback(null, args));

            FireStoreChangedEvent(dataType, data);
        }


        /// <summary>
        /// Fire this when an external store has changed outside the process to notify subscribers to the StoreChangeEvent.  
        /// </summary>
        /// <param name="dataType"></param>
        /// <param name="publicationScope"></param>
        /// <param name="locale"></param>
        internal static void FireExternalStoreChangedEvent(Type dataType, PublicationScope publicationScope, CultureInfo locale)
        {
            FireStoreChangedEvent(dataType, publicationScope, locale, false);
        }


        /// <summary>
        /// Follow up event for intally fired events
        /// </summary>
        private static void FireStoreChangedEvent(Type dataType, IData data)
        {
            FireStoreChangedEvent(dataType, data.DataSourceId.DataScopeIdentifier.ToPublicationScope(), data.DataSourceId.LocaleScope, true);
        }


        /// <summary>
        /// Call this indirectly. Use FireStoreChangedEvent or FireExternalStoreChangedEvent above.
        /// </summary>
        private static void FireStoreChangedEvent(Type dataType, PublicationScope publicationScope, CultureInfo locale, bool dataEventsFired)
        {
            var args = new StoreEventArgs(dataType, publicationScope, locale, dataEventsFired);

            // switch to the scope where event is happening
            using (new DataConnection(publicationScope, locale))
            {
                _storeChangedEventDictionary.Fire<StoreEventHandler>(dataType, callback => callback(null, args));
            }
        }



        internal static void FireDataAfterAddEvent<T>(IData data)
            where T : IData
        {
            FireDataAfterAddEvent(typeof(T), data);
        }



        internal static void FireDataBeforeUpdateEvent(Type dataType, IData data)
        {
            var args = new DataEventArgs(dataType, data);

            _dataBeforeUpdateEventDictionary.Fire<DataEventHandler>(dataType, callback => callback(null, args));
        }



        internal static void FireDataBeforeUpdateEvent<T>(IData data)
            where T : IData
        {
            FireDataBeforeUpdateEvent(typeof(T), data);
        }



        internal static void FireDataAfterUpdateEvent(Type dataType, IData data)
        {
            var args = new DataEventArgs(dataType, data);

            _dataAfterUpdateEventDictionary.Fire<DataEventHandler>(dataType, callback => callback(null, args));

            FireStoreChangedEvent(dataType, data);

        }



        internal static void FireDataAfterUpdateEvent<T>(IData data)
            where T : IData
        {
            FireDataAfterUpdateEvent(typeof(T), data);
        }



        internal static void FireDataDeletedEvent(Type dataType, IData data)
        {
            var args = new DataEventArgs(dataType, data);
            _dataDeletedEventDictionary.Fire<DataEventHandler>(dataType, callback => callback(null, args));

            FireStoreChangedEvent(dataType, data);
        }



        internal static void FireDataDeletedEvent<T>(IData data)
            where T : IData
        {
            FireDataDeletedEvent(typeof(T), data);
        }



        internal static void FireDataAfterBuildNewEvent(Type dataType, IData data)
        {
            var args = new DataEventArgs(dataType, data);
            _dataAfterBuildNewEventDictionary.Fire<DataEventHandler>(dataType, callback => callback(null, args));
        }


        internal static void FireDataAfterBuildNewEvent<T>(IData data)
            where T : IData
        {
            FireDataAfterBuildNewEvent(typeof(T), data);
        }


        private static List<Type> GetTypesToFire(Type type)
        {
            var types = new List<Type>();

            types.Add(type);

            foreach (Type superInterface in type.GetInterfaces())
            {
                if (typeof(IData).IsAssignableFrom(superInterface))
                {
                    types.Add(superInterface);
                }
            }

            return types;
        }

        private static void OnFlushEvent(FlushEventArgs args)
        {
            // Removing all non flush-persistent subscriptions
            var dictionaries = new[]
                                  {
                                      _dataBeforeAddEventDictionary,
                                      _dataAfterAddEventDictionary,
                                      _dataBeforeUpdateEventDictionary,
                                      _dataAfterUpdateEventDictionary,
                                      _dataDeletedEventDictionary,
                                      _dataAfterBuildNewEventDictionary,
                                      _storeChangedEventDictionary
                                  };

            foreach (var dictionary in dictionaries)
            {
                foreach (var subscrList in dictionary.GetValues())
                {
                    for (int i = subscrList.Count - 1; i >= 0; i--)
                    {
                        if (!subscrList[i].Second)
                        {
                            subscrList.RemoveAt(i);
                        }
                    }
                }
            }
        }


        private class SuppressEventScope: IDisposable
        {
            private readonly bool _active;

            public SuppressEventScope(bool active)
            {
               if (!active) return;

               _active = true;
               Counter(1);
            }

            private sealed class CounterContainer
            {
                public CounterContainer()
                {
                    this.Counter = 0;
                }

                public int Counter { get; set; }
            }


            private static CounterContainer SuppressEventScopeCounter
            {
                get
                {
                    return RequestLifetimeCache.GetCachedOrNew<CounterContainer>("SuppressEventScope:Counter");
                }
            }

            public static bool IsEnabled
            {
                get { return Counter(0) > 0; }
            }

            /// <summary>
            /// Adds a value to counter, and  returns result value.
            /// </summary>
            /// <param name="incrementValue">Value to be added.</param>
            /// <returns></returns>
            private static int Counter(int incrementValue)
            {
                CounterContainer counter = SuppressEventScopeCounter;
                counter.Counter += incrementValue;

                return counter.Counter;
            }

            #region IDisposable Members

            public void Dispose()
            {
                if(!_active) return;

                Counter(-1);
#if LeakCheck
                GC.SuppressFinalize(this);
#endif
            }

#if LeakCheck
            private string stack = Environment.StackTrace;
            /// <exclude />
            ~SuppressEventScope()
            {
                Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            }
#endif
            #endregion
        }


        /// <exclude />
        public static IDisposable SuppressEvents
        {
            get
            {
                return new SuppressEventScope(true);
            }
        }
    }
}