using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Data.Foundation.PluginFacades;
using Composite.Data.Plugins.DataProvider;
using Composite.Data.Plugins.DataProvider.Runtime;
using Composite.Core.Instrumentation;
using Composite.Core.Types;


namespace Composite.Data.Foundation
{
    internal sealed class DataProviderRegistryImpl : IDataProviderRegistry
    {
        private string _defaultDynamicTypeDataProviderName;
        private List<string> _dataProviderNames;
        private Dictionary<Type, List<string>> _interfaceTypeToReadableProviderNames;
        private Dictionary<Type, List<string>> _interfaceTypeToWriteableProviderNames;
        private Dictionary<Type, List<string>> _knownInterfaceTypeToDynamicProviderNames;
        private List<Type> _generatedInterfaceTypes;

        private Hashtable<Type, Exception> _initializationErrors;


        public string DefaultDynamicTypeDataProviderName
        {
            get
            {
                if (_defaultDynamicTypeDataProviderName == null || !_dataProviderNames.Contains(_defaultDynamicTypeDataProviderName))
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
                return _interfaceTypeToReadableProviderNames.Keys.ToList();
            }
        }



        public IEnumerable<Type> AllKnownInterfaces
        {
            get
            {
                return _interfaceTypeToReadableProviderNames.Keys.
                                Concat(_knownInterfaceTypeToDynamicProviderNames.Keys).
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
                return DataProviderRegistry.DataProviderNames.Where(DataProviderPluginFacade.IsDynamicProvider);
            }
        }



        public List<string> GetDataProviderNamesByInterfaceType(Type interfaceType)
        {
            List<string> providerNames = new List<string>();

            if (_interfaceTypeToReadableProviderNames.ContainsKey(interfaceType))
            {
                providerNames.AddRange(_interfaceTypeToReadableProviderNames[interfaceType]);
            }
            else if (_knownInterfaceTypeToDynamicProviderNames.ContainsKey(interfaceType))
            {
                providerNames.AddRange(_knownInterfaceTypeToDynamicProviderNames[interfaceType]);
            }

            return providerNames;
        }



        public List<string> GetWriteableDataProviderNamesByInterfaceType(Type interfaceType)
        {
            if (!_interfaceTypeToWriteableProviderNames.ContainsKey(interfaceType))
            {
                return new List<string>();
            }
            
            return _interfaceTypeToWriteableProviderNames[interfaceType];
        }


        public void AddNewDataType(Type interaceType, string providerName, bool isWritableProvider = true)
        {
            AddType(interaceType, providerName, isWritableProvider);
        }



        public void AddKnownDataType(Type interaceType, string providerName)
        {
            List<string> providers;
            if (!_knownInterfaceTypeToDynamicProviderNames.TryGetValue(interaceType, out providers))
            {
                providers = new List<string>();
                _knownInterfaceTypeToDynamicProviderNames.Add(interaceType, providers);
            }

            providers.Add(providerName);
        }

        public void UnregisterDataType(Type interfaceType, string providerName)
        {
            List<string> providerNames;
            if (!_interfaceTypeToReadableProviderNames.TryGetValue(interfaceType, out providerNames))
            {
                return;
            }

            providerNames.Remove(providerName);
        }


        public void RegisterDataTypeInitializationError(Type interfaceType, Exception exception)
        {
            _initializationErrors[interfaceType] = exception;
        }

        public void CheckInitializationErrors(Type interfaceType)
        {
            if (_initializationErrors.ContainsKey(interfaceType))
            {
                var ex = _initializationErrors[interfaceType];
                throw new InvalidOperationException("Failed to initialize data type '{0}'".FormatWith(interfaceType.FullName), ex);
            }
        }

        public void InitializeDataTypes()
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                _dataProviderNames = new List<string>();
                _interfaceTypeToReadableProviderNames = new Dictionary<Type, List<string>>();
                _interfaceTypeToWriteableProviderNames = new Dictionary<Type, List<string>>();
                _knownInterfaceTypeToDynamicProviderNames = new Dictionary<Type, List<string>>();
                _initializationErrors = new Hashtable<Type, Exception>();
                _generatedInterfaceTypes = new List<Type>();

                if (DataProviderPluginFacade.HasConfiguration())
                {
                    BuildDataProviderNames();
                    BuildDictionaries();
                }
                else if (RuntimeInformation.IsDebugBuild)
                {
                    Log.LogError("DataProviderRegistry", string.Format("Failed to load the configuration section '{0}' from the configuration", DataProviderSettings.SectionName));
                }
            }
        }



        public void Flush()
        {
            _defaultDynamicTypeDataProviderName = null;
            _dataProviderNames = null;
            _interfaceTypeToReadableProviderNames = null;
            _interfaceTypeToWriteableProviderNames = null;
            _knownInterfaceTypeToDynamicProviderNames = null;
            _generatedInterfaceTypes = null;
        }



        private void AddType(Type typeToAdd, string providerName, bool writeableProvider)
        {
            Verify.That(typeToAdd.IsInterface, "The data provider {0} returned an non-interface ({1})", providerName, typeToAdd);
            Verify.That(typeof(IData).IsAssignableFrom(typeToAdd), "The data provider {0} returned an non IData interface ({1})", providerName, typeToAdd);

            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                List<DataScopeIdentifier> supportedDataScopes = typeToAdd.GetSupportedDataScopes().ToList();

                if (supportedDataScopes.Count == 0)
                {
                    throw new InvalidOperationException(string.Format("The data provider {0} returned an IData interface ({1}) with no data scopes defined. Use the {2} attribute to define scopes.", providerName, typeToAdd, typeof(DataScopeAttribute)));
                }

                foreach (PropertyInfo propertyInfo in typeToAdd.GetPropertiesRecursively())
                {
                    bool containsBadAttribute = propertyInfo.GetCustomAttributesRecursively<Microsoft.Practices.EnterpriseLibrary.Validation.Validators.StringLengthValidatorAttribute>().Any();
                    if (!containsBadAttribute) continue;

#pragma warning disable 0612
                    Log.LogWarning("DataProviderRegistry", string.Format("The property named '{0}' on the type '{1}' has an attribute of type '{2}' wich is not supported, use '{3}'", typeToAdd, propertyInfo.Name, typeof(Microsoft.Practices.EnterpriseLibrary.Validation.Validators.StringLengthValidatorAttribute), typeof(Composite.Data.Validation.Validators.StringLengthValidatorAttribute)));
#pragma warning restore 0612
                }

                var readableList = _interfaceTypeToReadableProviderNames.GetOrAdd(typeToAdd, () => new List<string>());
                if (!readableList.Contains(providerName))
                {
                    readableList.Add(providerName);
                }


                if (writeableProvider)
                {
                    var writableList = _interfaceTypeToWriteableProviderNames.GetOrAdd(typeToAdd, () => new List<string>());
                    if (!writableList.Contains(providerName))
                    {
                        writableList.Add(providerName);
                    }
                }
            }
        }



        private void BuildDataProviderNames()
        {
            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                var dataProviderSettings = ConfigurationServices.ConfigurationSource.GetSection(DataProviderSettings.SectionName) as DataProviderSettings;

                _defaultDynamicTypeDataProviderName = dataProviderSettings.DefaultDynamicTypeDataProviderName;

                foreach (DataProviderData data in dataProviderSettings.DataProviderPlugins)
                {
                    _dataProviderNames.Add(data.Name);
                }
            }
        }


        private void BuildDictionaries()
        {
            using (TimerProfilerFacade.CreateTimerProfiler("Adding supported types"))
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

                            if (!_generatedInterfaceTypes.Contains(type))
                            {
                                _generatedInterfaceTypes.Add(type);
                            }
                        }
                    }
                }
            }


            using (TimerProfilerFacade.CreateTimerProfiler("Adding known interfaces"))
            {
                foreach (string providerName in _dataProviderNames)
                {
                    if (DataProviderPluginFacade.IsDynamicProvider(providerName))
                    {
                        IEnumerable<Type> knownTypes = DataProviderPluginFacade.GetKnownInterfaces(providerName);

                        foreach (Type knownType in knownTypes)
                        {
                            if (!_interfaceTypeToReadableProviderNames.Keys.Contains(knownType))
                            {
                                List<string> providerNames;

                                if (!_knownInterfaceTypeToDynamicProviderNames.TryGetValue(knownType, out providerNames))
                                {
                                    providerNames = new List<string>();

                                    _knownInterfaceTypeToDynamicProviderNames.Add(knownType, providerNames);

                                    if (RuntimeInformation.IsDebugBuild)
                                    {
                                        Log.LogVerbose("DataProviderRegistry", "Adding known IData interface: {0}", knownType);
                                    }
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
