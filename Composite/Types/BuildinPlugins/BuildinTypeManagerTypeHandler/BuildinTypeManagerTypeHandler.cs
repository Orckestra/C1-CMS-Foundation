using System;
using Composite.StandardPlugins.Types.TypeManagerTypeHandler.DynamicBuildManagerTypeManagerTypeHandler;
using Composite.StandardPlugins.Types.TypeManagerTypeHandler.SystemTypeManagerTypeHandler;
using Composite.Types.Plugins.TypeManagerTypeHandler;


namespace Composite.Types.BuildinPlugins.BuildinTypeManagerTypeHandler
{
    internal sealed class BuildinTypeManagerTypeHandler : ITypeManagerTypeHandler
    {
        public Type GetType(string fullName)
        {
            Type type;
            ITypeManagerTypeHandler handler;

            handler = new DynamicBuildManagerTypeManagerTypeHandler();
            type = handler.GetType(fullName);
            if (type != null) return type;

            handler = new SystemTypeManagerTypeHandler();
            type = handler.GetType(fullName);
            if (type != null) return type;

            return null;
        }



        public string SerializeType(Type type)
        {
            string serializedType;
            ITypeManagerTypeHandler handler;

            handler = new DynamicBuildManagerTypeManagerTypeHandler();
            serializedType = handler.SerializeType(type);
            if (serializedType != null) return serializedType;

            handler = new SystemTypeManagerTypeHandler();
            serializedType = handler.SerializeType(type);
            if (serializedType != null) return serializedType;

            return null;
        }



        public bool HasTypeWithName(string typeFullname)
        {
            ITypeManagerTypeHandler handler;

            handler = new DynamicBuildManagerTypeManagerTypeHandler();
            if (handler.HasTypeWithName(typeFullname) == true) return true;

            handler = new SystemTypeManagerTypeHandler();
            if (handler.HasTypeWithName(typeFullname) == true) return true;

            return false;
        }
    }
}
