using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Xml.Linq;
using Composite.Collections.Generic;
using Composite.ConfigurationSystem;
using Composite.Types.BuildinPlugins.BuildinTypeManagerTypeHandler;
using Composite.Types.Foundation.PluginFacades;
using Composite.Types.Plugins.TypeManagerTypeHandler;
using Composite.Types.Plugins.TypeManagerTypeHandler.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Types
{
    public sealed class TypeManagerImpl : ITypeManager
    {
        private ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize, false);
        private ConcurrentDictionary<Type, string> _serializedTypeLookup = new ConcurrentDictionary<Type, string>();


        public Type GetType(string fullName)
        {
            Type type = TryGetType(fullName);

            if (type != null)
            {
                return type;
            }

            throw new InvalidOperationException(string.Format("The type {0} could not be found", fullName));
        }



        /// <summary>
        /// Returns the type with the provided fullName (or null).
        /// </summary>
        /// <returns>A type or null</returns>
        public Type TryGetType(string fullName)
        {
            if (string.IsNullOrEmpty(fullName)) throw new ArgumentNullException("fullName");

            // A little nasty check here... /MRJ
            if (fullName.StartsWith("<t") == true)
            {
                XElement element = XElement.Parse(fullName);

                return TryGetGenericType(element);
            }
            else
            {
                return TryGetNonGenericType(fullName);
            }
        }



        public string SerializeType(Type type)
        {
            string serializedType = TrySerializeType(type);

            if (string.IsNullOrEmpty(serializedType) == true) throw new InvalidOperationException(string.Format("No TypeManagerTypeHandler plugins could serialize the given type '{0}'", type));

            return serializedType;
        }

        public string TrySerializeType(Type type)
        {
            if (type == null) throw new ArgumentNullException("type");

            return _serializedTypeLookup.GetOrAdd(type,
                t => t.IsGenericType ? TrySerializeGenericType(t).ToString() : TrySerializeNonGenericType(t));
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

            List<ProviderEntry> providerEntries = new List<ProviderEntry>(_resourceLocker.Resources.ProviderNameList);

            foreach (ProviderEntry entry in providerEntries)
            {
                bool result = TypeManagerTypeHandlerPluginFacade.HasTypeWithName(entry.ProviderName, typeFullname);
                if (result == true)
                {
                    return result;
                }

            }

            return false;
        }



        public void OnFlush()
        {
            _serializedTypeLookup = new ConcurrentDictionary<Type, string>();
            _resourceLocker.ResetInitialization();
        }



        private Type TryGetGenericType(XElement element)
        {
            if (element.HasElements == true)
            {
                XAttribute attribute = element.Attribute("n");

                if (attribute == null) return null;

                List<Type> genericArguments = new List<Type>();

                foreach (XElement childElement in element.Elements())
                {
                    Type type = TryGetGenericType(childElement);

                    if (type == null) return null;

                    genericArguments.Add(type);
                }

                Type genericType = Type.GetType(attribute.Value);

                if (genericType == null) return null;

                genericType = genericType.MakeGenericType(genericArguments.ToArray());

                return genericType;
            }
            else
            {
                XAttribute attribute = element.Attribute("n");

                if (attribute == null) return null;

                return TryGetNonGenericType(attribute.Value);
            }
        }



        private Type TryGetNonGenericType(string fullName)
        {
            using (_resourceLocker.ReadLocker)
            {
                if (_resourceLocker.Resources.BuildinHandler != null)
                {
                    return _resourceLocker.Resources.BuildinHandler.GetType(fullName);
                }
            }


            // This should be the first thing tried, otherwise "old" types are found in Composite.Genereted.dll instead of a possible new compiled version of the type /MRJ
            if (fullName.Contains(",") == false)
            {
#warning ASSEMBLY RENAME: This string should be renamed as well
                Type compositeType = TryGetNonGenericType(fullName + ", Composite");
                if (compositeType != null) return compositeType;

                if (fullName.StartsWith("DynamicType:") == false)
                {
                    Type dynamicType = TryGetNonGenericType("DynamicType:" + fullName);
                    if (dynamicType != null) return dynamicType;
                }
            }


            List<ProviderEntry> providerEntries = new List<ProviderEntry>(_resourceLocker.Resources.ProviderNameList);         

            foreach (ProviderEntry entry in providerEntries)
            {
                Type type;
                try
                {
                    type = TypeManagerTypeHandlerPluginFacade.GetType(entry.ProviderName, fullName);
                }
                catch
                {
                    // Do nothing here...
                    type = null;
                }
                if (type != null)
                {
                    return type;
                }
            }            

            return null;
        }



        private XElement TrySerializeGenericType(Type type)
        {
            if (type.IsGenericType == true)
            {
                Type genericType = type.GetGenericTypeDefinition();

                Type[] genericArguemnts = type.GetGenericArguments();

                XElement element =
                    new XElement("t",
                        new XAttribute("n", genericType.AssemblyQualifiedName)
                    );

                foreach (Type genericArgument in genericArguemnts)
                {
                    XElement elm = TrySerializeGenericType(genericArgument);

                    if (elm == null) return null;

                    element.Add(elm);
                }

                return element;
            }
            else
            {
                string serializedType = TrySerializeNonGenericType(type);
                if (serializedType == null) return null;

                return new XElement("t", new XAttribute("n", serializedType));
            }
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

            List<ProviderEntry> providerEntries = new List<ProviderEntry>(_resourceLocker.Resources.ProviderNameList);

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
                throw new ConfigurationErrorsException(string.Format("No configuration source specified"));
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

                if ((RuntimeInformation.IsDebugBuild == true) &&
                            ((ConfigurationServices.ConfigurationSource == null) ||
                            (ConfigurationServices.ConfigurationSource.GetSection(TypeManagerTypeHandlerSettings.SectionName) == null)))
                {
                    resources.BuildinHandler = new BuildinTypeManagerTypeHandler();
                }
                else
                {
                    IConfigurationSource source = GetConfiguration();

                    TypeManagerTypeHandlerSettings settings = source.GetSection(TypeManagerTypeHandlerSettings.SectionName) as TypeManagerTypeHandlerSettings;

                    if (settings == null)
                    {
                        throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration", TypeManagerTypeHandlerSettings.SectionName));
                    }

                    resources.ProviderNameList = new List<ProviderEntry>();

                    foreach (TypeManagerTypeHandlerData data in settings.TypeManagerTypeHandlerPlugins)
                    {
                        resources.ProviderNameList.Add(new ProviderEntry(data.Priority, data.Name));
                    }

                    resources.ProviderNameList.Sort(delegate(ProviderEntry e1, ProviderEntry e2) { return e1.Priority - e2.Priority; });
                }
            }
        }



        [DebuggerDisplay("ProviderName = {ProviderName}, Priority = {Priority}")]
        private class ProviderEntry
        {
            private int _priority;
            private string _providerName;

            public ProviderEntry(int priority, string providerName)
            {
                _priority = priority;
                _providerName = providerName;
            }

            public int Priority
            {
                get { return _priority; }
            }

            public string ProviderName
            {
                get { return _providerName; }
            }
        }
    }
}
