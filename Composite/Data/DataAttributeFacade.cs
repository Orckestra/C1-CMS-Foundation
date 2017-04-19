using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.C1Console.Events;
using Composite.Core.Linq;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Composite.Data.Types;


namespace Composite.Data
{
    /// <summary>
    /// This facade is used to obtain attribute informations for IData's and IData subinterface types
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class DataAttributeFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize, false);


        static DataAttributeFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        /// <exclude />
        public static bool IsAutoUpdateble(this IData data)
        {
            Verify.ArgumentNotNull(data, "data");

            return IsAutoUpdateble(data.DataSourceId.InterfaceType);
        }



        /// <exclude />
        public static bool IsAutoUpdateble(this Type interfaceType)
        {
            Verify.ArgumentNotNull(interfaceType, "interfaceType");

            bool isAutoUpdateble;

            if (!_resourceLocker.Resources.InterfaceToAutoUpdatebleCache.TryGetValue(interfaceType, out isAutoUpdateble))
            {
                isAutoUpdateble = interfaceType.GetCustomInterfaceAttributes<AutoUpdatebleAttribute>().Any();

                _resourceLocker.Resources.InterfaceToAutoUpdatebleCache.Add(interfaceType, isAutoUpdateble);
            }

            return isAutoUpdateble;
        }


        /// <summary>
        /// Checks whether the specified type is a custom defined IData interface, which is not generated
        /// </summary>
        /// <param name="interfaceType"></param>
        /// <exclude />
        internal static bool IsStaticDataType(this Type interfaceType)
        {
            return typeof (IData).IsAssignableFrom(interfaceType)
                   && interfaceType.Assembly != typeof (IData).Assembly
                   && !IsGenerated(interfaceType);
        }

        /// <exclude />
        public static bool IsGenerated(this Type interfaceType)
        {
            Verify.ArgumentNotNull(interfaceType, "interfaceType");

            bool isGenerated;

            var cache = _resourceLocker.Resources.InterfaceToGeneratedCache;

            if (cache.TryGetValue(interfaceType, out isGenerated))
            {
                return isGenerated;
            }

            lock (cache)
            {
                if (cache.TryGetValue(interfaceType, out isGenerated))
                {
                    return isGenerated;
                }

                isGenerated = interfaceType.GetCustomInterfaceAttributes<CodeGeneratedAttribute>().Any();

                cache.Add(interfaceType, isGenerated);
            }

            return isGenerated;
        }



        /// <exclude />
        public static Guid GetImmutableTypeId(this IData data)
        {
            return GetImmutableTypeId(data.DataSourceId.InterfaceType);
        }



        /// <exclude />
        public static Guid GetImmutableTypeId(this Type interfaceType)
        {
			Verify.ArgumentNotNull(interfaceType, "interfaceType");

            Guid immutableTypeId;

        	bool success = TryGetImmutableTypeId(interfaceType, out immutableTypeId);
			Verify.That(success, "No '{0}' defined on the type '{1}'", typeof(ImmutableTypeIdAttribute), interfaceType);

            return immutableTypeId;
        }



        /// <exclude />
        public static bool TryGetImmutableTypeId(this Type interfaceType, out Guid immutableTypeId)
        {
			Verify.ArgumentNotNull(interfaceType, "interfaceType");

            var interfaceToImmutableTypeIdCache = _resourceLocker.Resources.InterfaceToImmutableTypeIdCache;

            immutableTypeId = interfaceToImmutableTypeIdCache.GetOrAdd(interfaceType, type =>
            {
                var attributes = type.GetCustomInterfaceAttributes<ImmutableTypeIdAttribute>().ToList();

                return attributes.Count == 0 ? Guid.Empty : attributes[0].ImmutableTypeId;
            });

            return immutableTypeId != Guid.Empty;
		}



        /// <exclude />
        public static bool IsNotReferenceable(this IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            return IsNotReferenceable(data.DataSourceId.InterfaceType);
        }



        /// <exclude />
        public static bool IsNotReferenceable(this Type interfaceType)
        {
            Verify.ArgumentNotNull(interfaceType, "interfaceType");

            var map = _resourceLocker.Resources.InterfaceToNotReferenceableCache;

            return map.GetOrAdd(interfaceType, type => type.GetCustomInterfaceAttributes<NotReferenceableAttribute>().Any());
        }



        /// <exclude />
        public static string GetLabel(this IData data)
        {
            if (data == null)
            {
                return _resourceLocker.Resources.UndefinedDataLableValue;
            }

            return data.GetLabel(true);
        }



        /// <exclude />
        public static string GetLabel(this IData data, bool useForeignLabel)
        {
            if (data == null)
            {
                return _resourceLocker.Resources.UndefinedDataLableValue;
            }

            int foreignKeysExpanded = 0;
            MethodInfo methodInfo;

            while (true)
            {
                string undefinedLabelValue;

                string propertyName;
                GetLabelVisualizationMethodInfo(data, 
                    useForeignLabel, 
                    out methodInfo, 
                    out propertyName,
                    out undefinedLabelValue);

                if (methodInfo == null)
                {
                    return undefinedLabelValue;
                }

                if (propertyName != null)
                {
                    data = data.GetReferenced(propertyName);
                    foreignKeysExpanded++;

                    if (data == null)
                    {
                        return string.Format(undefinedLabelValue, propertyName);
                    }

                    // checking if we have an endless recursion while calculating field titles
                    if(foreignKeysExpanded > 10)
                    {
                        return string.Format(undefinedLabelValue, propertyName);
                    }
                    continue;
                }

                break;
            }

            object result = methodInfo.Invoke(data, null);

            if ((result != null) && !(result is string))
            {
                return result.ToString();
            }

            return (string)result;
        }


        private static void GetLabelVisualizationMethodInfo(IData data, bool useForeignLabel, out MethodInfo methodInfo, out string propertyName, out string undefinedLabelValue)
        {
            using (_resourceLocker.Locker)
            {
                undefinedLabelValue = _resourceLocker.Resources.UndefinedLableValue;

                KeyValuePair<MethodInfo, string> cachedValue;

                if (_resourceLocker.Resources.InterfaceTypeToLabelMethodInfoCache.TryGetValue(data.DataSourceId.InterfaceType, out cachedValue))
                {
                    methodInfo = cachedValue.Key;
                    propertyName = cachedValue.Value;
                    return;
                }

                PropertyInfo propertyInfo = GetLabelPropertyInfo(data);
                propertyName = null;

                if (useForeignLabel)
                {
                    List<ForeignKeyAttribute> foreignKeyAttributes = propertyInfo.GetCustomAttributesRecursively<ForeignKeyAttribute>().ToList();
                    if (foreignKeyAttributes.Count > 0)
                    {
                        propertyName = propertyInfo.Name;

                        IData foreignData = data.GetReferenced(propertyInfo.Name);

                        if (foreignData == null)
                        {
                            undefinedLabelValue = string.Format(undefinedLabelValue, propertyInfo.Name);
                            methodInfo = null;
                            return;
                        }

                        propertyInfo = GetLabelPropertyInfo(foreignData);
                    }
                }

                methodInfo = propertyInfo.GetGetMethod();

                var cacheEntry = new KeyValuePair<MethodInfo, string>(methodInfo, propertyName);
                _resourceLocker.Resources.InterfaceTypeToLabelMethodInfoCache.Add(data.DataSourceId.InterfaceType, cacheEntry);
            }
        }



        private static PropertyInfo GetLabelPropertyInfo(IData data)
        {
            return GetLabelPropertyInfo(data.DataSourceId.InterfaceType);
        }



        /// <exclude />
        public static PropertyInfo GetLabelPropertyInfo(this Type interfaceType)
        {
            List<LabelPropertyNameAttribute> list = interfaceType.GetCustomInterfaceAttributes<LabelPropertyNameAttribute>().ToList();

            PropertyInfo propertyInfo = null;
            if (list.Count != 0)
            {
                propertyInfo = interfaceType.GetPropertiesRecursively(pi => pi.Name == list[0].PropertyName).FirstOrDefault();
            }
            else
            {
                propertyInfo = interfaceType.GetPropertiesRecursively(pi => typeof(IData).IsAssignableFrom(pi.DeclaringType)).FirstOrDefault();
            }

            if (propertyInfo == null)
            {
                throw new InvalidOperationException("No label property defined or property not found");
            }

            return propertyInfo;
        }



        /// <exclude />
        public static CachingType GetCachingType(Type interfaceType)
        {
            var map = _resourceLocker.Resources.InterfaceTypeToCachingTypeCache;

            return map.GetOrAdd(interfaceType, type =>
            {
                var list = type.GetCustomInterfaceAttributes<CachingAttribute>().ToList();

                return (list.Count == 0) ? CachingType.None : list[0].CachingType;
            });
        }

        /// <exclude />
        [Obsolete("Use GetDataReferenceProperties() instead ")]
        public static List<ForeignPropertyInfo> GetDataReferencePropertyInfoes(Type interfaceType)
        {
            return new List<ForeignPropertyInfo>(GetDataReferenceProperties(interfaceType));
        }


        /// <exclude />
        public static IReadOnlyList<ForeignPropertyInfo> GetDataReferenceProperties(Type interfaceType)
        {
            var map = _resourceLocker.Resources.InterfaceTypeToDataReferenceProperties;

            return map.GetOrAdd(interfaceType, type =>
            {
                var foreignKeyProperies = new List<ForeignPropertyInfo>();

                foreach (PropertyInfo propertyInfo in type.GetPropertiesRecursively())
                {
                    var  attributes = propertyInfo.GetCustomAttributesRecursively<ForeignKeyAttribute>().ToList();

                    Verify.That(attributes.Count <= 1, "More than one '{0}' specified for the property named '{1}'", typeof (ForeignKeyAttribute), propertyInfo.Name);

                    if (attributes.Count == 1)
                    {
                        var attr = attributes[0];

                        if (attr.IsValid)
                        {
                            if (attr.InterfaceType == null)
                            {
                                throw new InvalidOperationException(
                                    $"Null argument is not allowed for the attribute '{typeof (ForeignKeyAttribute)}' on the property '{propertyInfo}'");
                            }
                                

                            if (!typeof (IData).IsAssignableFrom(attr.InterfaceType))
                            {
                                throw new InvalidOperationException(
                                    $"The argument should inherit the type '{typeof (IData)}' for the attribute '{typeof (ForeignKeyAttribute)}' on the property '{propertyInfo}'");
                            }

                            if (attr.IsNullReferenceValueSet)
                            {
                                foreignKeyProperies.Add(new ForeignPropertyInfo(
                                    propertyInfo,
                                    attr.InterfaceType,
                                    attr.KeyPropertyName,
                                    attr.AllowCascadeDeletes,
                                    attr.NullReferenceValue,
                                    attr.NullReferenceValueType,
                                    attr.NullableString
                                    ));
                            }
                            else
                            {
                                foreignKeyProperies.Add(new ForeignPropertyInfo(
                                    propertyInfo,
                                    attr.InterfaceType,
                                    attr.KeyPropertyName,
                                    attr.AllowCascadeDeletes,
                                    attr.NullableString
                                    ));
                            }
                        }
                        else
                        {
                            Log.LogWarning("DataAttributeFacade", "Ignoring unknown foreign key reference from type '{0}' to type '{1}'. ",
                                    type.FullName, attr.TypeManagerName);
                        }
                    }
                }

                return foreignKeyProperies;
            });
        }



        /// <exclude />
        public static IReadOnlyList<string> GetKeyPropertyNames(this Type interfaceType)
        {
            Verify.ArgumentNotNull(interfaceType, "interfaceType");

            var map = _resourceLocker.Resources.InterfaceTypeToKeyPropertyNames;

            return map.GetOrAdd(interfaceType, type => (from kpn in type.GetCustomAttributesRecursively<KeyPropertyNameAttribute>()
                                                        orderby kpn.Index
                                                        select kpn.KeyPropertyName).ToList());
        }


        /// <exclude />
        public static IReadOnlyList<string> GetVersionKeyPropertyNames(this Type interfaceType)
        {
            Verify.ArgumentNotNull(interfaceType, "interfaceType");

            var map = _resourceLocker.Resources.InterfaceTypeToVersionKeyPropertyNames;

            return map.GetOrAdd(interfaceType, type => 
                (from kpn in type.GetCustomAttributesRecursively<VersionKeyPropertyNameAttribute>()
                 orderby kpn.VersionKeyPropertyName
                 select kpn.VersionKeyPropertyName).ToList());
        }

        /// <exclude />
        [Obsolete("Use GetKeyProperties() instead")]
        public static List<PropertyInfo> GetKeyPropertyInfoes(this IData data)
        {
            return GetKeyProperties(data);
        }


        /// <exclude />
        public static List<PropertyInfo> GetKeyProperties(this IData data)
        {
            Verify.ArgumentNotNull(data, "data");

            // Return type is List<PropertyInfo> for backward compatibility with the PackageCreator package
            return new List<PropertyInfo>(GetKeyProperties(data.DataSourceId.InterfaceType));
        }


        /// <exclude />
        [Obsolete("Use GetKeyProperties() instead")]
        public static List<PropertyInfo> GetKeyPropertyInfoes(this Type interfaceType)
        {
            return new List<PropertyInfo>(GetKeyProperties(interfaceType)); 
        }

        /// <exclude />
        public static IReadOnlyList<PropertyInfo> GetPhysicalKeyProperties(this Type interfaceType)
        {
            var versionKeyAttributes = interfaceType
                .GetCustomAttributesRecursively<VersionKeyPropertyNameAttribute>();
            
            var versionProperties = versionKeyAttributes
                .Select(v => interfaceType.GetDataPropertyRecursively(v.VersionKeyPropertyName));

            var keyProperties = GetKeyProperties(interfaceType);

            return keyProperties.Concat(versionProperties).ToList();
        }

        /// <exclude />
        public static IReadOnlyList<PropertyInfo> GetKeyProperties(this Type interfaceType)
        {
            Verify.ArgumentNotNull(interfaceType, "interfaceType");

            if (!typeof(IData).IsAssignableFrom(interfaceType))
            {
                throw new ArgumentException($"The specified type must inherit from '{typeof (IData)}");
            }

            var map = _resourceLocker.Resources.InterfaceTypeToKeyPropertyInfo;

            return map.GetOrAdd(interfaceType, type =>
            {
                var keyProperties = new List<PropertyInfo>();

                List<PropertyInfo> properties = type.GetPropertiesRecursively();

                foreach (string name in GetKeyPropertyNames(type))
                {
                    PropertyInfo propertyInfo = properties.FirstOrDefault(pi => pi.Name == name);

                    Verify.IsNotNull(propertyInfo, "Type '{0}' declare (or inherit) a '{1}' with a name '{2}' that was not found as a property on the type.", type, typeof(KeyPropertyNameAttribute), name);

                    keyProperties.Add(propertyInfo);
                }

                return keyProperties;

            });
        }

        internal static PropertyInfo GetSingleKeyProperty(this Type interfaceType)
        {
            return interfaceType.GetKeyProperties().SingleOrException(
                "No key properties defined on data type '{0}'",
                "Multiple key proterties defined for data type '{0}'", interfaceType);
        }


        /// <exclude />
        public static string GetTypeTitle(this IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            return GetTypeTitle(data.DataSourceId.InterfaceType);
        }



        /// <exclude />
        public static string GetTypeTitle(this Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (!typeof(IData).IsAssignableFrom(interfaceType)) throw new ArgumentException($"The specified type must inherit from '{typeof (IData)}");

            string title;

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.InterfaceTypeToTypeTitle.TryGetValue(interfaceType, out title) == false)
                {
                    List<TitleAttribute> attributes = interfaceType.GetCustomAttributesRecursively<TitleAttribute>().ToList();

                    if (attributes.Count == 0)
                    {
                        title = interfaceType.Name;
                    }
                    else if (attributes.Count == 1)
                    {
                        title = attributes[0].Title;
                    }
                    else
                    {
                        throw new InvalidOperationException(
                            $"More than one '{typeof (TitleAttribute)}' defined on the type '{interfaceType}'");
                    }

                    _resourceLocker.Resources.InterfaceTypeToTypeTitle.Add(interfaceType, title);
                }
            }

            return title;
        }      



        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }


        private sealed class Resources
        {
            public string UndefinedLableValue { get; set; }
            public string UndefinedDataLableValue { get; set; }
            public Dictionary<Type, bool> InterfaceToAutoUpdatebleCache { get; set; }
            public Dictionary<Type, bool> InterfaceToGeneratedCache { get; set; }
            public ConcurrentDictionary<Type, Guid> InterfaceToImmutableTypeIdCache { get; set; }
            public ConcurrentDictionary<Type, bool> InterfaceToNotReferenceableCache { get; set; }
            public Dictionary<Type, KeyValuePair<MethodInfo, string>> InterfaceTypeToLabelMethodInfoCache { get; set; }
            public ConcurrentDictionary<Type, CachingType> InterfaceTypeToCachingTypeCache { get; set; }
            public ConcurrentDictionary<Type, IReadOnlyList<ForeignPropertyInfo>> InterfaceTypeToDataReferenceProperties { get; set; }
            public ConcurrentDictionary<Type, IReadOnlyList<PropertyInfo>> InterfaceTypeToKeyPropertyInfo { get; set; }
            public Dictionary<Type, string> InterfaceTypeToTypeTitle { get; set; }
            public ConcurrentDictionary<Type, IReadOnlyList<string>> InterfaceTypeToKeyPropertyNames { get; set; }
            public ConcurrentDictionary<Type, IReadOnlyList<string>> InterfaceTypeToVersionKeyPropertyNames { get; set; }

            public static void Initialize(Resources resources)
            {
                resources.UndefinedLableValue = StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", "UndefinedLabelTemplate");
                resources.UndefinedDataLableValue = StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", "UndefinedDataLavelTemplate");
                resources.InterfaceToAutoUpdatebleCache = new Dictionary<Type, bool>();
                resources.InterfaceToGeneratedCache = new Dictionary<Type, bool>();
                resources.InterfaceToImmutableTypeIdCache = new ConcurrentDictionary<Type, Guid>();
                resources.InterfaceToNotReferenceableCache = new ConcurrentDictionary<Type, bool>();
                resources.InterfaceTypeToLabelMethodInfoCache = new Dictionary<Type, KeyValuePair<MethodInfo, string>>();
                resources.InterfaceTypeToCachingTypeCache = new ConcurrentDictionary<Type, CachingType>();
                resources.InterfaceTypeToDataReferenceProperties = new ConcurrentDictionary<Type, IReadOnlyList<ForeignPropertyInfo>>();
                resources.InterfaceTypeToKeyPropertyInfo = new ConcurrentDictionary<Type, IReadOnlyList<PropertyInfo>>();
                resources.InterfaceTypeToTypeTitle = new Dictionary<Type, string>();
                resources.InterfaceTypeToKeyPropertyNames = new ConcurrentDictionary<Type, IReadOnlyList<string>>();
                resources.InterfaceTypeToVersionKeyPropertyNames = new ConcurrentDictionary<Type, IReadOnlyList<string>>();
            }
        }
    }
}
