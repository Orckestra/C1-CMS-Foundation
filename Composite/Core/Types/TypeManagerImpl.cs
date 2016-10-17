using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.Types.BuildinPlugins.BuildinTypeManagerTypeHandler;
using Composite.Core.Types.Foundation.PluginFacades;
using Composite.Core.Types.Plugins.TypeManagerTypeHandler;
using Composite.Core.Types.Plugins.TypeManagerTypeHandler.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.Types
{
    internal sealed class TypeManagerImpl : ITypeManager
    {
        private ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize, false);
        private ConcurrentDictionary<Type, string> _serializedTypeLookup = new ConcurrentDictionary<Type, string>();
       

        public Type GetType(string fullName)
        {
            return GetType(fullName, true);
        }

        private Type GetType(string fullName, bool throwIfNotFound)
        {
            Verify.ArgumentNotNullOrEmpty(fullName, "fullName");

            Type type;

            // A little nasty check here... /MRJ
            if (fullName.StartsWith("<t"))
            {
                var element = XElement.Parse(fullName);

                type = GetGenericType(element);
            }
            else
            {
                type = GetNonGenericType(fullName);
            }

            if (throwIfNotFound && type == null)
            {
                throw new InvalidOperationException($"The type '{fullName}' could not be found");
            }

            return type;
        }


        /// <summary>
        /// Returns the type with the provided fullName (or null).
        /// </summary>
        /// <returns>A type or null</returns>
        public Type TryGetType(string fullName)
        {
            try
            {
                return GetType(fullName, false);
            }
            catch
            {
                return null;
            }
        }



        public string SerializeType(Type type)
        {
            string serializedType = TrySerializeType(type);

            if (string.IsNullOrEmpty(serializedType))
            {
                throw new InvalidOperationException(
                    $"No TypeManagerTypeHandler plugins could serialize the given type '{type}'");
            }

            return serializedType;
        }



        public string TrySerializeType(Type type)
        {
            Verify.ArgumentNotNull(type, nameof(type));

            return _serializedTypeLookup.GetOrAdd(type,
                t => t.IsGenericType ? TrySerializeGenericType(t).ToString() : TrySerializeNonGenericType(t));
        }



        public void AddCompiledType(Type compiledType)
        {
        }



        /// <summary>
        /// This method return true if there is type with the fullname <para>typeFullname</para> anywhere in the system.
        /// </summary>
        /// <param name="typeFullname">Full name: namespace+name. X.Y.Z where X.Y is the namespace and Z is the type.</param>
        /// <returns></returns>
        public bool HasTypeWithName(string typeFullname)
        {
            using (_resourceLocker.ReadLocker)
            {
                if (_resourceLocker.Resources.BuildinHandler != null)
                {
                    return _resourceLocker.Resources.BuildinHandler.HasTypeWithName(typeFullname);
                }
            }

            var providerEntries = _resourceLocker.Resources.ProviderNameList;
            
            return providerEntries.Any(entry => TypeManagerTypeHandlerPluginFacade.HasTypeWithName(entry.ProviderName, typeFullname));
        }



        public void OnFlush()
        {
            _serializedTypeLookup = new ConcurrentDictionary<Type, string>();
            _resourceLocker.ResetInitialization();
        }



        private Type GetGenericType(XElement element)
        {
            if (element.HasElements)
            {
                XAttribute attribute = element.Attribute("n");

                if (attribute == null) return null;

                List<Type> genericArguments = new List<Type>();

                foreach (XElement childElement in element.Elements())
                {
                    Type type = GetGenericType(childElement);

                    if (type == null) return null;

                    genericArguments.Add(type);
                }

                Type genericType = Type.GetType(attribute.Value);

                return genericType?.MakeGenericType(genericArguments.ToArray());
            }
            else
            {
                XAttribute attribute = element.Attribute("n");

                if (attribute == null) return null;

                return GetNonGenericType(attribute.Value);
            }
        }



        private Type GetNonGenericType(string fullName)
        {
            using (_resourceLocker.ReadLocker)
            {
                if (_resourceLocker.Resources.BuildinHandler != null)
                {
                    return _resourceLocker.Resources.BuildinHandler.GetType(fullName);
                }
            }

            fullName = TypeManager.FixLegasyTypeName(fullName);

            // This should be the first thing tried, otherwise "old" types are found in Composite.Generated.dll instead of a possible new compiled version of the type /MRJ
            if (!fullName.Contains(","))
            {
                Type compositeType = typeof (Composite.Data.IData).Assembly.GetType(fullName, false);
                if (compositeType != null) return compositeType;
            }

            List<ProviderEntry> providerEntries = new List<ProviderEntry>(_resourceLocker.Resources.ProviderNameList);

            foreach (ProviderEntry entry in providerEntries)
            {
                Type type = TypeManagerTypeHandlerPluginFacade.GetType(entry.ProviderName, fullName);

                if (type != null)
                {
                    return type;
                }
            }
            
            return null;
        }



        private XElement TrySerializeGenericType(Type type)
        {
            if (type.IsGenericType)
            {
                Type genericType = type.GetGenericTypeDefinition();

                Type[] genericArguments = type.GetGenericArguments();

                XElement element =
                    new XElement("t",
                        new XAttribute("n", genericType.AssemblyQualifiedName)
                    );

                foreach (Type genericArgument in genericArguments)
                {
                    XElement elm = TrySerializeGenericType(genericArgument);

                    if (elm == null) return null;

                    element.Add(elm);
                }

                return element;
            }
            
            string serializedType = TrySerializeNonGenericType(type);
            if (serializedType == null) return null;

            return new XElement("t", new XAttribute("n", serializedType));
        }



        private string TrySerializeNonGenericType(Type type)
        {
            using (_resourceLocker.ReadLocker)
            {
                if (_resourceLocker.Resources.BuildinHandler != null)
                {
                    string serializedType = _resourceLocker.Resources.BuildinHandler.SerializeType(type);

                    if (serializedType != null)
                    {
                        return serializedType;
                    }
                }
            }

            var providerEntries = new List<ProviderEntry>(_resourceLocker.Resources.ProviderNameList);

            foreach (ProviderEntry entry in providerEntries)
            {
                string serializedType = TypeManagerTypeHandlerPluginFacade.SerializedType(entry.ProviderName, type);

                if (serializedType != null)
                {
                    return serializedType;
                }
            }

            return null;
        }



        private static IConfigurationSource GetConfiguration()
        {
            IConfigurationSource source = ConfigurationServices.ConfigurationSource;

            if (null == source)
            {
                throw new ConfigurationErrorsException("No configuration source specified");
            }

            return source;
        }



        private sealed class Resources
        {
            public List<ProviderEntry> ProviderNameList;
            public ITypeManagerTypeHandler BuildinHandler;

            public static void Initialize(Resources resources)
            {
                resources.BuildinHandler = null;

                if (RuntimeInformation.IsUnittest
                    && ConfigurationServices.ConfigurationSource?.GetSection(TypeManagerTypeHandlerSettings.SectionName) == null)
                {
                    resources.BuildinHandler = new BuildinTypeManagerTypeHandler();
                }
                else
                {
                    IConfigurationSource source = GetConfiguration();

                    TypeManagerTypeHandlerSettings settings = source.GetSection(TypeManagerTypeHandlerSettings.SectionName) as TypeManagerTypeHandlerSettings;

                    if (settings == null)
                    {
                        throw new ConfigurationErrorsException($"Failed to load the configuration section '{TypeManagerTypeHandlerSettings.SectionName}' from the configuration");
                    }

                    resources.ProviderNameList = new List<ProviderEntry>();

                    foreach (TypeManagerTypeHandlerData data in settings.TypeManagerTypeHandlerPlugins)
                    {
                        resources.ProviderNameList.Add(new ProviderEntry(data.Priority, data.Name));
                    }

                    resources.ProviderNameList.Sort((e1, e2) => e1.Priority - e2.Priority);
                }
            }
        }



        [DebuggerDisplay("ProviderName = {ProviderName}, Priority = {Priority}")]
        private class ProviderEntry
        {
            public ProviderEntry(int priority, string providerName)
            {
                Priority = priority;
                ProviderName = providerName;
            }

            public int Priority { get; }

            public string ProviderName { get; }
        }
    }
}
