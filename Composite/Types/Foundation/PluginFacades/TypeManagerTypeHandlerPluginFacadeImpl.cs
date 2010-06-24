using System;
using System.Collections.Concurrent;
using Composite.Types.Plugins.TypeManagerTypeHandler;
using Composite.Types.Plugins.TypeManagerTypeHandler.Runtime;


namespace Composite.Types.Foundation.PluginFacades
{
    internal sealed class TypeManagerTypeHandlerPluginFacadeImpl : ITypeManagerTypeHandlerPluginFacade
    {
        private static readonly object _syncRoot = new object();
        private static Resources _resources;

        public Type GetType(string providerName, string fullName)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");
            Verify.ArgumentNotNullOrEmpty(fullName, "fullName");

            ITypeManagerTypeHandler typeManagerTypeHandler = GetTypeManagerTypeHandler(providerName);
            return typeManagerTypeHandler.GetType(fullName);
        }



        public string SerializedType(string providerName, Type type)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");
            Verify.ArgumentNotNull(type, "type");

            ITypeManagerTypeHandler typeManagerTypeHandler = GetTypeManagerTypeHandler(providerName);
            return typeManagerTypeHandler.SerializeType(type);
        }



        public bool HasTypeWithName(string providerName, string typeFullname)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");
            Verify.ArgumentNotNullOrEmpty(typeFullname, "typeFullname");

            ITypeManagerTypeHandler typeManagerTypeHandler = GetTypeManagerTypeHandler(providerName);
            return typeManagerTypeHandler.HasTypeWithName(typeFullname);
        }


        public void OnFlush()
        {
            _resources = null;
        }

        private static ITypeManagerTypeHandler GetTypeManagerTypeHandler(string providerName)
        {
            Resources resources = GetResources();

            return resources.TypeHandlerCache.GetOrAdd(providerName,
                provider =>
                {
                    ITypeManagerTypeHandler typeHandler = resources.Factory.Create(provider);

                    return typeHandler;
                });
        }


        private static Resources GetResources()
        {
            Resources result = _resources;
            if(result == null)
            {
                lock(_syncRoot)
                {
                    result = _resources;
                    if(result == null)
                    {
                        result = BuildResources();
                        _resources = result;
                    }
                }
            }
            return result;
        }

        private static Resources BuildResources()
        {
            return new Resources
                       {
                           Factory = new TypeManagerTypeHandlerFactory(),
                           TypeHandlerCache = new ConcurrentDictionary<string, ITypeManagerTypeHandler>()
                       };
        }

        private sealed class Resources
        {
            public TypeManagerTypeHandlerFactory Factory { get; set; }
            public ConcurrentDictionary<string, ITypeManagerTypeHandler> TypeHandlerCache { get; set; }
        }
    }
}
