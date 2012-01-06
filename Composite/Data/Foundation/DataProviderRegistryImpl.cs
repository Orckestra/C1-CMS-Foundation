using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Core.Configuration;
using Composite.Data.Foundation.PluginFacades;
using Composite.Data.Plugins.DataProvider;
using Composite.Data.Plugins.DataProvider.Runtime;
using Composite.Core.Instrumentation;
using Composite.Core.Logging;
using Composite.Core.Types;


namespace Composite.Data.Foundation
{
    internal sealed class DataProviderRegistryImpl : IDataProviderRegistry
    {
        private string _defaultDynamicTypeDataProviderName = null;
        private List<string> _dataProviderNames = null;
        private Dictionary<Type, List<string>> _interfaceTypeToReadableProviderNamesDictionary = null;
        private Dictionary<Type, List<string>> _interfaceTypeToWriteableProviderNamesDictionary = null;
        private Dictionary<Type, List<string>> _knownInterfaceTypeToDynamicProviderNamesDictionary = null;
        private List<Type> _generatedInterfaceTypes = null;


        public string DefaultDynamicTypeDataProviderName
        {
            get
            {
                if ((_defaultDynamicTypeDataProviderName == null) ||
                    (_dataProviderNames.Contains(_defaultDynamicTypeDataProviderName) == false))
                {
                    throw new InvalidOperationException("Failed to locate the default provider name for dynamic types. Please check the configuration.");
                }

                return _defaultDynamicTypeDataProviderName;
            }
        }



        public IEnumerable<Type> AllInterfaces
        {
            get
            {
                return _interfaceTypeToReadableProviderNamesDictionary.Keys.ToList();
            }
        }



        public IEnumerable<Type> AllKnownInterfaces
        {
            get
            {
                return _interfaceTypeToReadableProviderNamesDictionary.Keys.
                                Concat(_knownInterfaceTypeToDynamicProviderNamesDictionary.Keys).
                                ToList();
            }
        }



        public IEnumerable<Type> GeneratedInterfaces
        {
            get
            {
                return _generatedInterfaceTypes;
            }
        }



        public IEnumerable<string> DataProviderNames
        {
            get
            {
                return _dataProviderNames;
            }
        }



        public IEnumerable<string> DynamicDataProviderNames
        {
            get
            {
                foreach (string providerName in DataProviderRegistry.DataProviderNames)
                {
                    if (DataProviderPluginFacade.IsDynamicProvider(providerName) == true)
                    {
                        yield return providerName;
                    }
                }
            }
        }



        public List<string> GetDataProviderNamesByInterfaceType(Type interfaceType)
        {
            List<string> providerNames = new List<string>();

            if (true == _interfaceTypeToReadableProviderNamesDictionary.ContainsKey(interfaceType))
            {
                providerNames.AddRange(_interfaceTypeToReadableProviderNamesDictionary[interfaceType]);
            }
            else if (_knownInterfaceTypeToDynamicProviderNamesDictionary.ContainsKey(interfaceType))
            {
                providerNames.AddRange(_knownInterfaceTypeToDynamicProviderNamesDictionary[interfaceType]);
            }

            return providerNames;
        }



        public List<string> GetWriteableDataProviderNamesByInterfaceType(Type interfaceType)
        {
            if (true == _interfaceTypeToWriteableProviderNamesDictionary.ContainsKey(interfaceType))
            {
                return _interfaceTypeToWriteableProviderNamesDictionary[interfaceType];
            }
            else
            {
                return new List<string>();
            }
        }


        public void AddNewDataType(Type interaceType, string providerName, bool isWritableProvider = true)
        {
            AddType(interaceType, providerName, isWritableProvider);
        }



        public void InitializeDataTypes()
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler())
            {
                _dataProviderNames = new List<string>();
                _interfaceTypeToReadableProviderNamesDictionary = new Dictionary<Type, List<string>>();
                _interfaceTypeToWriteableProviderNamesDictionary = new Dictionary<Type, List<string>>();
                _knownInterfaceTypeToDynamicProviderNamesDictionary = new Dictionary<Type, List<string>>();
                _generatedInterfaceTypes = new List<Type>();

                if (DataProviderPluginFacade.HasConfiguration() == true)
                {
                    BuildDataProviderNames();
                    BuildDictionaries();
                }
                else if (RuntimeInformation.IsDebugBuild == true)
                {
                    LoggingService.LogError("DataProviderRegistry", string.Format("Failed to load the configuration section '{0}' from the configuration", DataProviderSettings.SectionName));
                }
            }
        }



        public void Flush()
        {
            _defaultDynamicTypeDataProviderName = null;
            _dataProviderNames = null;
            _interfaceTypeToReadableProviderNamesDictionary = null;
            _interfaceTypeToWriteableProviderNamesDictionary = null;
            _knownInterfaceTypeToDynamicProviderNamesDictionary = null;
            _generatedInterfaceTypes = null;
        }



        private void AddType(Type typeToAdd, string providerName, bool writeableProvider)
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler())
            {
                if (false == typeToAdd.IsInterface)
                {
                    throw new InvalidOperationException(string.Format("The data provider {0} returned an non-interface ({1})", providerName, typeToAdd));
                }

                if (false == typeof(IData).IsAssignableFrom(typeToAdd))
                {
                    throw new InvalidOperationException(string.Format("The data provider {0} returned an non IData interface ({1})", providerName, typeToAdd));
                }

                List<DataScopeIdentifier> supportedDataScopes = typeToAdd.GetSupportedDataScopes().ToList();

                if (supportedDataScopes.Count == 0)
                {
                    throw new InvalidOperationException(string.Format("The data provider {0} returned an IData interface ({1}) with no data scopes defined. Use the {2} attribute to define scopes.", providerName, typeToAdd, typeof(DataScopeAttribute)));
                }

                foreach (PropertyInfo propertyInfo in typeToAdd.GetPropertiesRecursively())
                {
                    bool containsBadAttribute = propertyInfo.GetCustomAttributesRecursively<Microsoft.Practices.EnterpriseLibrary.Validation.Validators.StringLengthValidatorAttribute>().Any();
                    if (containsBadAttribute == false) continue;

#pragma warning disable 0612
                    LoggingService.LogWarning("DataProviderRegistry", string.Format("The property named '{0}' on the type '{1}' has an attribute of type '{2}' wich is not supported, use '{3}'", typeToAdd, propertyInfo.Name, typeof(Microsoft.Practices.EnterpriseLibrary.Validation.Validators.StringLengthValidatorAttribute), typeof(Composite.Data.Validation.Validators.StringLengthValidatorAttribute)));
#pragma warning restore 0612
                }


                if (false == _interfaceTypeToReadableProviderNamesDictionary.ContainsKey(typeToAdd))
                {
                    _interfaceTypeToReadableProviderNamesDictionary.Add(typeToAdd, new List<string>());

                    Core.Logging.LoggingService.LogVerbose("DataProviderRegistry", string.Format("Adding supported IData interface: {0}", typeToAdd));
                }

                if (false == _interfaceTypeToReadableProviderNamesDictionary[typeToAdd].Contains(providerName))
                {
                    _interfaceTypeToReadableProviderNamesDictionary[typeToAdd].Add(providerName);
                }


                if (writeableProvider == true)
                {
                    if (false == _interfaceTypeToWriteableProviderNamesDictionary.ContainsKey(typeToAdd))
                    {
                        _interfaceTypeToWriteableProviderNamesDictionary.Add(typeToAdd, new List<string>());
                    }

                    if (false == _interfaceTypeToWriteableProviderNamesDictionary[typeToAdd].Contains(providerName))
                    {
                        _interfaceTypeToWriteableProviderNamesDictionary[typeToAdd].Add(providerName);
                    }
                }
            }
        }



        private void BuildDataProviderNames()
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler())
            {
                DataProviderSettings dataProviderSettings = ConfigurationServices.ConfigurationSource.GetSection(DataProviderSettings.SectionName) as DataProviderSettings;

                _defaultDynamicTypeDataProviderName = dataProviderSettings.DefaultDynamicTypeDataProviderName;

                foreach (DataProviderData data in dataProviderSettings.DataProviderPlugins)
                {
                    _dataProviderNames.Add(data.Name);
                }
            }
        }



        private void BuildDictionaries()
        {
            using (TimerProfiler timerProfiler1 = TimerProfilerFacade.CreateTimerProfiler("Adding supported types"))
            {
                foreach (string providerName in _dataProviderNames)
                {
                    IEnumerable<Type> types = DataProviderPluginFacade.GetSupportedInterfaces(providerName);

                    bool writeableProvider = DataProviderPluginFacade.IsWriteableProvider(providerName);

                    foreach (Type type in types)
                    {
                        AddType(type, providerName, writeableProvider);
                    }


                    if (DataProviderPluginFacade.IsGeneratedTypesProvider(providerName))
                    {
                        IEnumerable<Type> generatedTypes = DataProviderPluginFacade.GetGeneratedInterfaces(providerName);

                        foreach (Type type in generatedTypes)
                        {
                            AddType(type, providerName, writeableProvider);

                            if (_generatedInterfaceTypes.Contains(type) == false)
                            {
                                _generatedInterfaceTypes.Add(type);
                            }
                        }
                    }
                }
            }


            using (TimerProfiler timerProfiler2 = TimerProfilerFacade.CreateTimerProfiler("Adding known interfaces"))
            {
                foreach (string providerName in _dataProviderNames)
                {
                    if (DataProviderPluginFacade.IsDynamicProvider(providerName) == true)
                    {
                        IEnumerable<Type> knownTypes = DataProviderPluginFacade.GetKnownInterfaces(providerName);

                        foreach (Type knownType in knownTypes)
                        {
                            if (_interfaceTypeToReadableProviderNamesDictionary.Keys.Contains(knownType) == false)
                            {
                                List<string> providerNames;

                                if (_knownInterfaceTypeToDynamicProviderNamesDictionary.TryGetValue(knownType, out providerNames) == false)
                                {
                                    providerNames = new List<string>();

                                    _knownInterfaceTypeToDynamicProviderNamesDictionary.Add(knownType, providerNames);

                                    LoggingService.LogVerbose("DataProviderRegistry", string.Format("Adding known IData interface: {0}", knownType));
                                }

                                providerNames.Add(providerName);
                            }
                        }
                    }                    
                }
            }
        }
    }
}
