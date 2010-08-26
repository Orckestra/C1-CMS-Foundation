using System;
using Composite.C1Console.Events;


namespace Composite.Core.Types.Foundation.PluginFacades
{
    internal static class TypeManagerTypeHandlerPluginFacade
    {
        private static ITypeManagerTypeHandlerPluginFacade _implementation = new TypeManagerTypeHandlerPluginFacadeImpl();

        internal static ITypeManagerTypeHandlerPluginFacade Implementation { get { return _implementation; } set { _implementation = value; } }



        static TypeManagerTypeHandlerPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static Type GetType(string providerName, string fullName)
        {
            return _implementation.GetType(providerName, fullName);
        }



        public static string SerializedType(string providerName, Type type)
        {
            return _implementation.SerializedType(providerName, type);
        }



        public static bool HasTypeWithName(string providerName, string typeFullname)
        {
            return _implementation.HasTypeWithName(providerName, typeFullname);
        }




        private static void OnFlushEvent(FlushEventArgs args)
        {
            _implementation.OnFlush();
        }
    }
}
