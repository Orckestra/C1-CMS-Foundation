using System;
using System.Linq;
using System.Collections.Generic;
using Composite.Core.Collections.Generic;
using Composite.Core.Types;
using Composite.C1Console.Events;


namespace Composite.Data.Hierarchy.Foundation
{
    internal static class DataAncestorProviderCache
    {
        private static Hashtable<Type, IDataAncestorProvider> _dataAncestorProviderCache = new Hashtable<Type, IDataAncestorProvider>();

        private static readonly object _syncRoot = new object();



        static DataAncestorProviderCache()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }


        public static IDataAncestorProvider GetDataAncestorProvider(IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            Type dataType = data.GetType();

            var cache = _dataAncestorProviderCache;

            IDataAncestorProvider dataAncestorProvider = cache[dataType];

            if (dataAncestorProvider != null)
            {
                return dataAncestorProvider;
            }

            lock (_syncRoot)
            {
                dataAncestorProvider = cache[dataType];

                if (dataAncestorProvider != null)
                {
                    return dataAncestorProvider;
                }

                List<DataAncestorProviderAttribute> attributes = dataType.GetCustomInterfaceAttributes<DataAncestorProviderAttribute>().ToList();


                if (attributes.Count == 0) throw new InvalidOperationException(string.Format("Missing {0} attribute on the data type {1}", typeof(DataAncestorProviderAttribute), dataType));
                if (attributes.Count > 1) throw new InvalidOperationException(string.Format("Only one {0} attribute is allowed on the data type {1}", typeof(DataAncestorProviderAttribute), dataType));

                DataAncestorProviderAttribute attribute = attributes[0];

                if (attribute.DataAncestorProviderType == null) throw new InvalidOperationException(string.Format("Data ancestor provider type can not be null on the data type {0}", data));
                if (typeof(IDataAncestorProvider).IsAssignableFrom(attribute.DataAncestorProviderType) == false) throw new InvalidOperationException(string.Format("Data ancestor provider {0} should implement the interface {1}", attribute.DataAncestorProviderType, typeof(IDataAncestorProvider)));

                dataAncestorProvider = (IDataAncestorProvider)Activator.CreateInstance(attribute.DataAncestorProviderType);

                cache.Add(dataType, dataAncestorProvider);

                return dataAncestorProvider;
            }
        }

        private static void Flush()
        {
            _dataAncestorProviderCache = new Hashtable<Type, IDataAncestorProvider>();
        }
    }
}
