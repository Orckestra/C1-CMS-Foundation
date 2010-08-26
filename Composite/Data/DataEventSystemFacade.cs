using System;
using System.Collections.Generic;
using System.Web;
using Composite.C1Console.Events;
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
    public class DataMoveEventArgs : StorageEventArgs
    {
        internal DataMoveEventArgs(Type dataType, IData data, DataScopeIdentifier targetDataScopeIdentifier)
            : base(dataType, data)
        {
            this.TargetDataScopeIdentifier = targetDataScopeIdentifier;
        }


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
      //  public delegate void StorageEventHandler(DataEventArgs dataEventArgs);
        //public delegate void StorageEventHandler(DataEventArgs dataEventArgs);
        //public delegate void StorageEventHandler(DataEventArgs dataEventArgs);
        //public delegate void StorageEventHandler(DataEventArgs dataEventArgs);
        //public delegate void StorageEventHandler(DataEventArgs dataEventArgs);
        internal delegate void DataAfterMoveDelegate(DataMoveEventArgs dataMoveEventArgs);

        private static readonly Subscriptions _dataBeforeAddEventDictionary = new Subscriptions();
        private static readonly Subscriptions _dataAfterAddEventDictionary = new Subscriptions();
        private static readonly Subscriptions _dataBeforeUpdateEventDictionary = new Subscriptions();
        private static readonly Subscriptions _dataAfterUpdateEventDictionary = new Subscriptions();
        private static readonly Subscriptions _dataDeletedEventDictionary = new Subscriptions();
        private static readonly Subscriptions _dataAfterBuildNewEventDictionary = new Subscriptions();
        private static readonly Subscriptions _dataAfterMoveEventDictionary = new Subscriptions();

        private static readonly object _collectionAccesslock = new object();


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


        public static void SubscribeToDataBeforeAdd<T>(StorageEventHandler dataBeforeAddDelegate, bool flushPersistent)
            where T : IData
        {
            SubscribeToDataBeforeAdd(typeof(T), dataBeforeAddDelegate, flushPersistent);
        }        
        
        public static void SubscribeToDataBeforeAdd<T>(StorageEventHandler dataBeforeAddDelegate)
            where T : IData
        {
            SubscribeToDataBeforeAdd(typeof(T), dataBeforeAddDelegate);
        }        
        
        public static void SubscribeToDataBeforeAdd(Type dataType, StorageEventHandler dataBeforeAddDelegate) {
            SubscribeToDataBeforeAdd(dataType, dataBeforeAddDelegate, false);
        }


        public static void SubscribeToDataBeforeAdd(Type dataType, StorageEventHandler dataBeforeAddDelegate, bool flushPersistent)
        {
            Verify.ArgumentNotNull(dataType, "dataType");
            Verify.ArgumentNotNull(dataBeforeAddDelegate, "dataBeforeAddDelegate");

            _dataBeforeAddEventDictionary.Add(dataType, new Subscription(dataBeforeAddDelegate, flushPersistent));
        }


        public static void UnsubscribeToDataBeforeAdd(Type dataType, StorageEventHandler dataBeforeAddDelegate)
        {
            Verify.ArgumentNotNull(dataType, "dataType");
            Verify.ArgumentNotNull(dataBeforeAddDelegate, "dataBeforeAddDelegate");

            _dataBeforeAddEventDictionary.Remove(dataType, dataBeforeAddDelegate);
        }

        public static void SubscribeToDataAfterAdd(Type dataType, StorageEventHandler dataAfterAddDelegate, bool flushPersistent)
        {
            Verify.ArgumentNotNull(dataType, "dataType");
            Verify.ArgumentNotNull(dataAfterAddDelegate, "dataAfterAddDelegate");

            _dataAfterAddEventDictionary.Add(dataType, dataAfterAddDelegate, flushPersistent);
        }

        public static void SubscribeToDataAfterAdd(Type dataType, StorageEventHandler dataAfterAddDelegate)
        {
            SubscribeToDataAfterAdd(dataType, dataAfterAddDelegate, false);
        }


        public static void SubscribeToDataAfterAdd<T>(StorageEventHandler dataAfterAddDelegate, bool flushPersistent)
        {
            SubscribeToDataAfterAdd(typeof(T), dataAfterAddDelegate, flushPersistent);
        }


        public static void SubscribeToDataAfterAdd<T>(StorageEventHandler dataAfterAddDelegate)
            where T : IData
        {
            SubscribeToDataAfterAdd(typeof(T), dataAfterAddDelegate);
        }



        public static void UnsubscribeToDataAfterAdd(Type dataType, StorageEventHandler dataAfterAddDelegate)
        {
            if (dataType == null) throw new ArgumentNullException("dataType");
            if (dataAfterAddDelegate == null) throw new ArgumentNullException("dataAfterAddDelegate");

            _dataAfterAddEventDictionary.Remove(dataType, dataAfterAddDelegate);
        }

        public static void SubscribeToDataBeforeUpdate(Type dataType, StorageEventHandler dataBeforeUpdateDelegate)
        {
            SubscribeToDataBeforeUpdate(dataType, dataBeforeUpdateDelegate, false);
        }

        public static void SubscribeToDataBeforeUpdate(Type dataType, StorageEventHandler dataBeforeUpdateDelegate, bool flushPersistent)
        {
            _dataBeforeUpdateEventDictionary.Add(dataType, dataBeforeUpdateDelegate, flushPersistent);
        }



        public static void SubscribeToDataBeforeUpdate<T>(StorageEventHandler dataBeforeUpdateDelegate)
            where T : IData
        {
            SubscribeToDataBeforeUpdate(typeof(T), dataBeforeUpdateDelegate);
        }

        public static void SubscribeToDataBeforeUpdate<T>(StorageEventHandler dataBeforeUpdateDelegate, bool flushPersistent)
            where T : IData
        {
            SubscribeToDataBeforeUpdate(typeof(T), dataBeforeUpdateDelegate, flushPersistent);
        }



        public static void UnsubscribeToDataBeforeUpdate(Type dataType, StorageEventHandler dataBeforeUpdateDelegate)
        {
            _dataBeforeUpdateEventDictionary.Remove(dataType, dataBeforeUpdateDelegate);
        }



        public static void SubscribeToDataAfterUpdate(Type dataType, StorageEventHandler dataAfterUpdateDelegate)
        {
            SubscribeToDataAfterUpdate(dataType, dataAfterUpdateDelegate, false);
        }

        public static void SubscribeToDataAfterUpdate(Type dataType, StorageEventHandler dataAfterUpdateDelegate, bool flushPersistent)
        {
            _dataAfterUpdateEventDictionary.Add(dataType, dataAfterUpdateDelegate, flushPersistent);
        }

        public static void SubscribeToDataAfterUpdate<T>(StorageEventHandler dataAfterUpdateDelegate)
            where T : IData
        {
            SubscribeToDataAfterUpdate(typeof(T), dataAfterUpdateDelegate);
        }


        public static void SubscribeToDataAfterUpdate<T>(StorageEventHandler dataAfterUpdateDelegate, bool flushPersistent)
            where T : IData
        {
            SubscribeToDataAfterUpdate(typeof(T), dataAfterUpdateDelegate, flushPersistent);
        }



        public static void UnsubscribeToDataAfterUpdate(Type dataType, StorageEventHandler dataAfterUpdateDelegate)
        {
            _dataAfterUpdateEventDictionary.Remove(dataType, dataAfterUpdateDelegate);
        }



        public static void SubscribeToDataDeleted(Type dataType, StorageEventHandler dataDeletedDelegate)
        {
            SubscribeToDataDeleted(dataType, dataDeletedDelegate, false);
        }

        public static void SubscribeToDataDeleted(Type dataType, StorageEventHandler dataDeletedDelegate, bool flushPersistent)
        {
            _dataDeletedEventDictionary.Add(dataType, dataDeletedDelegate, flushPersistent);
        }



        public static void SubscribeToDataDeleted<T>(StorageEventHandler dataDeletedDelegate)
            where T : IData
        {
            SubscribeToDataDeleted(typeof(T), dataDeletedDelegate);
        }

        public static void SubscribeToDataDeleted<T>(StorageEventHandler dataDeletedDelegate, bool flushPersistent)
            where T : IData
        {
            SubscribeToDataDeleted(typeof(T), dataDeletedDelegate, flushPersistent);
        }



        public static void UnsubscribeToDataDeleted(Type dataType, StorageEventHandler dataDeletedDelegate)
        {
            _dataDeletedEventDictionary.Remove(dataType, dataDeletedDelegate);
        }


        public static void SubscribeToDataAfterBuildNew(Type dataType, StorageEventHandler dataAfterBuildNewDelegate)
        {
            SubscribeToDataAfterBuildNew(dataType, dataAfterBuildNewDelegate, false);
        }

        public static void SubscribeToDataAfterBuildNew(Type dataType, StorageEventHandler dataAfterBuildNewDelegate, bool flushPersistent)
        {
            _dataAfterBuildNewEventDictionary.Add(dataType, dataAfterBuildNewDelegate, flushPersistent);
        }



        public static void SubscribeToDataAfterBuildNew<T>(StorageEventHandler dataAfterBuildNewDelegate)
            where T : IData
        {
            SubscribeToDataAfterBuildNew(typeof(T), dataAfterBuildNewDelegate);
        }



        public static void UnsubscribeToDataAfterBuildNew(Type dataType, StorageEventHandler dataAfterBuildNewDelegate)
        {
            _dataAfterBuildNewEventDictionary.Remove(dataType, dataAfterBuildNewDelegate);
        }



        internal static void SubscribeToDataAfterMove(Type dataType, DataAfterMoveDelegate dataAfterMoveDelegate)
        {
            _dataAfterMoveEventDictionary.Add(dataType, dataAfterMoveDelegate, false);
        }



        internal static void SubscribeToDataAfterMove<T>(DataAfterMoveDelegate dataAfterMoveDelegate)
            where T : IData
        {
            SubscribeToDataAfterMove(typeof(T), dataAfterMoveDelegate);
        }



        internal static void UnsubscribeToDataAfterMove(Type dataType, DataAfterMoveDelegate dataAfterMoveDelegate)
        {
            _dataAfterMoveEventDictionary.Remove(dataType, dataAfterMoveDelegate);
        }



        internal static void FireDataBeforeAddEvent(Type dataType, IData data)
        {
            var args = new StorageEventArgs(dataType, data);
            _dataBeforeAddEventDictionary.Fire <StorageEventHandler>(dataType, callback => callback(args));
        }



        internal static void FireDataBeforeAddEvent<T>(IData data)
            where T : IData
        {
            FireDataBeforeAddEvent(typeof(T), data);
        }



        internal static void FireDataAfterAddEvent(Type dataType, IData data)
        {
            var args = new StorageEventArgs(dataType, data);

            _dataAfterAddEventDictionary.Fire<StorageEventHandler>(dataType, callback => callback(args));
        }



        internal static void FireDataAfterAddEvent<T>(IData data)
            where T : IData
        {
            FireDataAfterAddEvent(typeof(T), data);
        }



        internal static void FireDataBeforeUpdateEvent(Type dataType, IData data)
        {
            var args = new StorageEventArgs(dataType, data);

            _dataBeforeUpdateEventDictionary.Fire <StorageEventHandler>(dataType, callback => callback(args));
        }



        internal static void FireDataBeforeUpdateEvent<T>(IData data)
            where T : IData
        {
            FireDataBeforeUpdateEvent(typeof(T), data);
        }



        internal static void FireDataAfterUpdateEvent(Type dataType, IData data)
        {
            var args = new StorageEventArgs(dataType, data);

            _dataAfterUpdateEventDictionary.Fire<StorageEventHandler>(dataType, callback => callback(args));
        }



        internal static void FireDataAfterUpdateEvent<T>(IData data)
            where T : IData
        {
            FireDataAfterUpdateEvent(typeof(T), data);
        }



        internal static void FireDataDeletedEvent(Type dataType, IData data)
        {
            var args = new StorageEventArgs(dataType, data);
            _dataDeletedEventDictionary.Fire<StorageEventHandler>(dataType, callback => callback(args));
        }



        internal static void FireDataDeletedEvent<T>(IData data)
            where T : IData
        {
            FireDataDeletedEvent(typeof(T), data);
        }



        internal static void FireDataAfterBuildNewEvent(Type dataType, IData data)
        {
            var args = new StorageEventArgs(dataType, data);
            _dataAfterBuildNewEventDictionary.Fire <StorageEventHandler>(dataType, callback => callback(args));
        }



        internal static void FireDataAfterMoveEvent<T>(IData data, DataScopeIdentifier targetDataScopeIdentifier)
            where T : IData
        {
            FireDataAfterMoveEvent(typeof(T), data, targetDataScopeIdentifier);
        }



        internal static void FireDataAfterMoveEvent(Type dataType, IData data, DataScopeIdentifier targetDataScopeIdentifier)
        {
            var args = new DataMoveEventArgs(dataType, data, targetDataScopeIdentifier);
            _dataAfterMoveEventDictionary.Fire<DataAfterMoveDelegate>(dataType, callback => callback(args));
        }



        internal static void FireDataAfterBuildNewEvent<T>(IData data)
            where T : IData
        {
            FireDataAfterBuildNewEvent(typeof(T), data);
        }


        private static List<Type> GetTypesToFire(Type type)
        {
            List<Type> types = new List<Type>();

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
                                      _dataAfterMoveEventDictionary
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
            private bool _active;

            public SuppressEventScope(bool active)
            {
               if (!active) return;

               _active = true;
               Counter(1);
            }

            [ThreadStatic] private int _counter;

            static readonly SuppressEventScope _instance = new SuppressEventScope(false);

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
                HttpContext httpContext = HttpContext.Current;
                
                if(httpContext != null)
                {
                    const string itemsKey = "SuppressEventScope.Counter";

                    if(httpContext.Items[itemsKey] == null)
                    {
                        httpContext.Items[itemsKey] = incrementValue;
                        return incrementValue;
                    }
                    int value = (int) httpContext.Items[itemsKey] + incrementValue;

                    httpContext.Items[itemsKey] = value;
                    return value;
                }

                _instance._counter += incrementValue;
                return _instance._counter;
            }

            #region IDisposable Members

            public void Dispose()
            {
                if(!_active) return;

                Counter(-1);

            }

            #endregion
        }


        public static IDisposable SuppressEvents
        {
            get
            {
                return new SuppressEventScope(true);
            }
        }
    }
}