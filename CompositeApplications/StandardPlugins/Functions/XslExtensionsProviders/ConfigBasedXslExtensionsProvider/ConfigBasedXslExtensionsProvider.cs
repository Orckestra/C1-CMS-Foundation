using System;
using System.Collections.Generic;
using System.Configuration;
using System.Reflection;
using Composite.Functions.Plugins.XslExtensionsProvider;
using Composite.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.StandardPlugins.Functions.XslExtensionsProviders.ConfigBasedXslExtensionsProvider
{
    [ConfigurationElementType(typeof(ConfigBasedXslExtensionsProviderData))]
    internal class ConfigBasedXslExtensionsProvider : IXslExtensionsProvider
	{
        private object _syncRoot = new object();
        private List<KeyValuePair<string, ConstructorInfo>> _constructors;
        private ConfigBasedXslExtensionsProviderData _providerData;

        internal ConfigBasedXslExtensionsProvider(ConfigBasedXslExtensionsProviderData providerData)
        {
            _providerData = providerData;
        }

        public List<Pair<string, object>> CreateExtensions()
        {
            var result = new List<Pair<string, object>>();

            if(_constructors == null)
            {
                lock(_syncRoot)
                {
                    if(_constructors == null)
                    {
                        var constructors = new List<KeyValuePair<string, ConstructorInfo>>();
                        if (_providerData == null)
                        {
                            return result;
                        }

                        foreach (var configLine in _providerData.XslExtensions)
                        {
                            PropertyInformation propertyInformation = configLine.ElementInformation.Properties["type"];
                            if (propertyInformation == null) continue;

                            Type type = propertyInformation.Value as Type;
                            if (type == null) continue;

                            ConstructorInfo constructor = type.GetConstructors()[0];
                            constructors.Add(new KeyValuePair<string, ConstructorInfo>(configLine.Name, constructor));
                        }

                        // TODO: uncomment
                        _constructors = constructors;
                    }
                }
            }

            foreach(var pair in _constructors)
            {
                object instance = pair.Value.Invoke(new object[0]);
                result.Add(new Pair<string, object>(pair.Key, instance));
            }
            return result;
        }
    }
}
