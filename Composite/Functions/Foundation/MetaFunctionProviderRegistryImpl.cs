using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Collections.Generic;
using Composite.Core.Logging;


namespace Composite.Functions.Foundation
{
    internal sealed class MetaFunctionProviderRegistryImpl : IMetaFunctionProviderRegistry
    {
        private ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.DoInitialize);



        public List<string> FunctionNames
        {
            get
            {
                using (GlobalInitializerFacade.CoreIsInitializedScope)
                {
                    using (_resourceLocker.ReadLocker)
                    {
                        return _resourceLocker.Resources.FunctionContainer.FunctionNames.ToList();
                    }
                }
            }
        }



        public List<string> WidgetFunctionNames
        {
            get
            {
                using (GlobalInitializerFacade.CoreIsInitializedScope)
                {
                    using (_resourceLocker.ReadLocker)
                    {
                        return _resourceLocker.Resources.WidgetFunctionContainer.FunctionNames.ToList();
                    }
                }
            }
        }



        public IEnumerable<string> FunctionNamesByProviderName(string providerName)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                using (_resourceLocker.ReadLocker)
                {
                    return _resourceLocker.Resources.FunctionContainer.FunctionNamesByProviderName(providerName);
                }
            }
        }



        public IEnumerable<string> WidgetFunctionNamesByProviderName(string providerName)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                using (_resourceLocker.ReadLocker)
                {
                    return _resourceLocker.Resources.WidgetFunctionContainer.FunctionNamesByProviderName(providerName);
                }
            }
        }



        public IEnumerable<string> GetFunctionNamesByType(Type supportedType)
        {
            if (supportedType == null) throw new ArgumentNullException("supportedType");

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                using (_resourceLocker.ReadLocker)
                {
                    return _resourceLocker.Resources.FunctionContainer.GetFunctionNamesByType(supportedType);
                }
            }
        }



        public IEnumerable<string> GetWidgetFunctionNamesByType(Type supportedType)
        {
            if (supportedType == null) throw new ArgumentNullException("supportedType");

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                using (_resourceLocker.ReadLocker)
                {
                    return _resourceLocker.Resources.WidgetFunctionContainer.GetFunctionNamesByType(supportedType);
                }
            }
        }



        public IFunction GetFunction(string name)
        {
            if (string.IsNullOrEmpty(name) == true) throw new ArgumentNullException("name");

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                using (_resourceLocker.ReadLocker)
                {
                    return (IFunction)_resourceLocker.Resources.FunctionContainer.GetFunction(name);
                }
            }
        }



        public IWidgetFunction GetWidgetFunction(string name)
        {
            if (string.IsNullOrEmpty(name) == true) throw new ArgumentNullException("name");

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                using (_resourceLocker.ReadLocker)
                {
                    return (IWidgetFunction)_resourceLocker.Resources.WidgetFunctionContainer.GetFunction(name);
                }
            }
        }



        public IEnumerable<Type> FunctionSupportedTypes
        {
            get
            {
                using (GlobalInitializerFacade.CoreIsInitializedScope)
                {
                    using (_resourceLocker.ReadLocker)
                    {
                        return _resourceLocker.Resources.FunctionContainer.FunctionSupportedTypes;
                    }
                }
            }
        }



        public IEnumerable<Type> WidgetFunctionSupportedTypes
        {
            get
            {
                using (GlobalInitializerFacade.CoreIsInitializedScope)
                {
                    using (_resourceLocker.ReadLocker)
                    {
                        return _resourceLocker.Resources.WidgetFunctionContainer.FunctionSupportedTypes;
                    }
                }
            }
        }



        public void ReinitializeFunctionFromProvider(string providerName)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                using (_resourceLocker.Locker)
                {
                    _resourceLocker.Resources.FunctionContainer.ReInitializeFunctionsFromProvider(providerName);
                }
            }
        }



        public void ReinitializeWidgetFunctionFromProvider(string providerName)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                using (_resourceLocker.Locker)
                {
                    _resourceLocker.Resources.WidgetFunctionContainer.ReInitializeFunctionsFromProvider(providerName);
                }
            }
        }



        public void Initialize_PostStaticTypes()
        {
            _resourceLocker.ResetInitialization();

            using (_resourceLocker.Locker)
            {
                _resourceLocker.Resources.FunctionContainer.Initialize_StaticTypeDependentFunctions();
                _resourceLocker.Resources.WidgetFunctionContainer.Initialize_StaticTypeDependentFunctions();
            }
        }



        public void Initialize_PostDynamicTypes()
        {
            using (_resourceLocker.Locker)
            {
                _resourceLocker.Resources.FunctionContainer.Initialize_DynamicTypeDependentFunctions();
                _resourceLocker.Resources.WidgetFunctionContainer.Initialize_DynamicTypeDependentFunctions();
            }
        }



        public void Flush()
        {
            _resourceLocker.ResetInitialization();
        }



        private sealed class Resources
        {
            public static void DoInitialize(Resources resources)
            {
                resources.ExcludedFunctionNames = new List<string>();
                resources.FunctionContainer = new FunctionContainer(resources.ExcludedFunctionNames);
                resources.WidgetFunctionContainer = new WidgetFunctionContainer(resources.ExcludedFunctionNames);
            }

            public FunctionContainer FunctionContainer { get; set; }
            public WidgetFunctionContainer WidgetFunctionContainer { get; set; }
            public List<string> ExcludedFunctionNames { get; set; }
        }
    }
}
