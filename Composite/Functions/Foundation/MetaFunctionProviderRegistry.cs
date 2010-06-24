using System;
using System.Collections.Generic;
using System.Diagnostics;
using Composite.EventSystem;


namespace Composite.Functions.Foundation
{
	internal static class MetaFunctionProviderRegistry
	{
        private static IMetaFunctionProviderRegistry _metaFunctionProviderRegistry = new MetaFunctionProviderRegistryImpl();
        

        static MetaFunctionProviderRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }


        internal static IMetaFunctionProviderRegistry Implementation { get { return _metaFunctionProviderRegistry; } set { _metaFunctionProviderRegistry = value; } }



        public static List<string> FunctionNames
        {
            get
            {
                return _metaFunctionProviderRegistry.FunctionNames;
            }
        }



        public static List<string> WidgetFunctionNames
        {
            get
            {
                return _metaFunctionProviderRegistry.WidgetFunctionNames;
            }
        }



        public static IEnumerable<string> FunctionNamesByProviderName(string providerName)
        {
            return _metaFunctionProviderRegistry.FunctionNamesByProviderName(providerName);
        }



        public static IEnumerable<string> WidgetFunctionNamesByProviderName(string providerName)
        {
            return _metaFunctionProviderRegistry.WidgetFunctionNamesByProviderName(providerName);
        }



        public static IEnumerable<string> GetFunctionNamesByType(Type supportedType)
        {
            return _metaFunctionProviderRegistry.GetFunctionNamesByType(supportedType);
        }



        public static IEnumerable<string> GetWidgetFunctionNamesByType(Type supportedType)
        {
            return _metaFunctionProviderRegistry.GetWidgetFunctionNamesByType(supportedType);
        }



        public static IFunction GetFunction(string name)
        {
            return _metaFunctionProviderRegistry.GetFunction(name);
        }



        public static IWidgetFunction GetWidgetFunction(string name)
        {
            return _metaFunctionProviderRegistry.GetWidgetFunction(name);
        }



        public static IEnumerable<Type> FunctionSupportedTypes
        {
            get
            {
                return _metaFunctionProviderRegistry.FunctionSupportedTypes;
            }
        }



        public static IEnumerable<Type> WidgetFunctionSupportedTypes
        {
            get
            {
                return _metaFunctionProviderRegistry.WidgetFunctionSupportedTypes;
            }
        }



        internal static void ReinitializeFunctionFromProvider(string providerName)
        {
            _metaFunctionProviderRegistry.ReinitializeFunctionFromProvider(providerName);
        }



        internal static void ReinitializeWidgetFunctionFromProvider(string providerName)
        {
            _metaFunctionProviderRegistry.ReinitializeWidgetFunctionFromProvider(providerName);
        }



        internal static void Initialize_PostStaticTypes()
        {
            if (RuntimeInformation.IsDebugBuild == true)
            {
                GlobalInitializerFacade.ValidateIsOnlyCalledFromGlobalInitializerFacade(new StackTrace());
            }

            _metaFunctionProviderRegistry.Initialize_PostStaticTypes();
        }



        internal static void Initialize_PostDynamicTypes()
        {
            if (RuntimeInformation.IsDebugBuild == true)
            {
                GlobalInitializerFacade.ValidateIsOnlyCalledFromGlobalInitializerFacade(new StackTrace());
            }

            _metaFunctionProviderRegistry.Initialize_PostDynamicTypes();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            _metaFunctionProviderRegistry.Flush();
        }
	}
}
