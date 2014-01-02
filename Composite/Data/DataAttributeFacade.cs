using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Core.Collections.Generic;
using Composite.C1Console.Events;
using Composite.Core.Logging;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;


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
        private static Hashtable<Type, List<string>> _interfaceTypeToKeyPropertyNames = new Hashtable<Type, List<string>>(); 


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

            if (interfaceToImmutableTypeIdCache.TryGetValue(interfaceType, out immutableTypeId))
			{
				return true;
			}

			var attributes = interfaceType.GetCustomInterfaceAttributes<ImmutableTypeIdAttribute>().ToList();

			if (attributes.Count == 0)
			{
				immutableTypeId = Guid.Empty;

				return false;
			}

			immutableTypeId = attributes[0].ImmutableTypeId;

            lock (interfaceToImmutableTypeIdCache)
            {
                if (!interfaceToImmutableTypeIdCache.ContainsKey(interfaceType))
                {
                    interfaceToImmutableTypeIdCache.Add(interfaceType, immutableTypeId);
                }
            }

			return true;
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
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");

            bool isNotReferenceable;

            if (_resourceLocker.Resources.InterfaceToNotReferenceableCache.TryGetValue(interfaceType, out isNotReferenceable) == false)
            {
                isNotReferenceable = interfaceType.GetCustomInterfaceAttributes<NotReferenceableAttribute>().Any();

                _resourceLocker.Resources.InterfaceToNotReferenceableCache.Add(interfaceType, isNotReferenceable);
            }

            return isNotReferenceable;
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
            CachingType cachingType;

            var res = _resourceLocker;

            if (!res.Resources.InterfaceTypeToCachingTypeCache.TryGetValue(interfaceType, out cachingType))
            {
                using (res.Locker)
                {
                    if (!res.Resources.InterfaceTypeToCachingTypeCache.TryGetValue(interfaceType, out cachingType))
                    {
                        List<CachingAttribute> list = interfaceType.GetCustomInterfaceAttributes<CachingAttribute>().ToList();

                        cachingType = (list.Count == 0) ? CachingType.None : list[0].CachingType;

                        res.Resources.InterfaceTypeToCachingTypeCache.Add(interfaceType, cachingType);
                    }
                }
            }

            return cachingType;
        }

        /// <exclude />
        [Obsolete("Use GetDataReferenceProperties() instead ")]
        public static List<ForeignPropertyInfo> GetDataReferencePropertyInfoes(Type interfaceType)
        {
            return GetDataReferenceProperties(interfaceType);
        }


        /// <exclude />
        public static List<ForeignPropertyInfo> GetDataReferenceProperties(Type interfaceType)
        {
            List<ForeignPropertyInfo> foreignKeyProperyInfos;

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.InterfaceTypeToDataReferenceProperties.TryGetValue(interfaceType, out foreignKeyProperyInfos) == false)
                {
                    foreignKeyProperyInfos = new List<ForeignPropertyInfo>();

                    foreach (PropertyInfo propertyInfo in interfaceType.GetPropertiesRecursively())
                    {
                        List<ForeignKeyAttribute> attributes = propertyInfo.GetCustomAttributesRecursively<ForeignKeyAttribute>().ToList();

                        if (attributes.Count > 1) throw new InvalidOperationException(string.Format("More than one '{0}' specified for the property named '{1}'", typeof(ForeignKeyAttribute), propertyInfo.Name));

                        if (attributes.Count == 1)
                        {
                            if (attributes[0].IsValid)
                            {
                                if (attributes[0].InterfaceType == null) throw new InvalidOperationException(string.Format("Null argument is not allowed for the attribute '{0}' on the property '{1}'", typeof(ForeignKeyAttribute), propertyInfo));
                                if (typeof(IData).IsAssignableFrom(attributes[0].InterfaceType) == false) throw new InvalidOperationException(string.Format("The argument should inherit the type '{0}' for the attribute '{1}' on the property '{2}'", typeof(IData), typeof(ForeignKeyAttribute), propertyInfo));                                

                                if (attributes[0].IsNullReferenceValueSet)
                                {
                                    foreignKeyProperyInfos.Add(new ForeignPropertyInfo(
                                            propertyInfo,
                                            attributes[0].InterfaceType,
                                            attributes[0].KeyPropertyName,
                                            attributes[0].AllowCascadeDeletes,
                                            attributes[0].NullReferenceValue,
                                            attributes[0].NullReferenceValueType,
                                            attributes[0].NullableString
                                        ));
                                }
                                else
                                {
                                    foreignKeyProperyInfos.Add(new ForeignPropertyInfo(
                                            propertyInfo,
                                            attributes[0].InterfaceType,
                                            attributes[0].KeyPropertyName,
                                            attributes[0].AllowCascadeDeletes,
                                            attributes[0].NullableString
                                        ));
                                }
                            }
                            else
                            {
                                LoggingService.LogWarning("DataAttributeFacade", string.Format("Ignoring unknown foreign key reference from type '{0}' to type '{1}'. ", interfaceType.FullName, attributes[0].TypeManagerName));
                            }
                        }
                    }

                    _resourceLocker.Resources.InterfaceTypeToDataReferenceProperties.Add(interfaceType, foreignKeyProperyInfos);
                }
            }

            return foreignKeyProperyInfos;
        }



        /// <exclude />
        public static List<string> GetKeyPropertyNames(this Type interfaceType)
        {
            Verify.ArgumentNotNull(interfaceType, "interfaceType");

            List<string> keyPropertyNames;

            var hashtable = _interfaceTypeToKeyPropertyNames;

            if (!hashtable.TryGetValue(interfaceType, out keyPropertyNames))
            {
                keyPropertyNames = (from kpn in interfaceType.GetCustomAttributesRecursively<KeyPropertyNameAttribute>()
                                    orderby kpn.Index
                                    select kpn.KeyPropertyName).ToList();

                lock (hashtable)
                {
                    if (!hashtable.ContainsKey(interfaceType))
                    {
                        hashtable.Add(interfaceType, keyPropertyNames);
                    }
                }
            }

            return keyPropertyNames;
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
            if (data == null) throw new ArgumentNullException("data");

            return GetKeyProperties(data.DataSourceId.InterfaceType);
        }


        /// <exclude />
        [Obsolete("Use GetKeyProperties() instead")]
        public static List<PropertyInfo> GetKeyPropertyInfoes(this Type interfaceType)
        {
            return GetKeyProperties(interfaceType);
        }

        /// <exclude />
        public static List<PropertyInfo> GetKeyProperties(this Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (typeof(IData).IsAssignableFrom(interfaceType) == false) throw new ArgumentException(string.Format("The specified type must inherit from '{0}", typeof(IData)));

            List<PropertyInfo> keyProperties;

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.InterfaceTypeToKeyProeprtyInfoes.TryGetValue(interfaceType, out keyProperties) == false)
                {
                    keyProperties = new List<PropertyInfo>();

                    List<PropertyInfo> pis = interfaceType.GetPropertiesRecursively();

                    foreach (string name in GetKeyPropertyNames(interfaceType))
                    {
                        PropertyInfo propertyInfo =
                            (from pi in pis
                             where pi.Name == name
                             select pi).FirstOrDefault();

                        if (propertyInfo == null) throw new InvalidOperationException(string.Format("Type '{0}' declare (or inherit) a '{1}' with a name '{2}' that was not found as a property on the type.", interfaceType, typeof(KeyPropertyNameAttribute), name));

                        keyProperties.Add(propertyInfo);
                    }

                    _resourceLocker.Resources.InterfaceTypeToKeyProeprtyInfoes.Add(interfaceType, keyProperties);
                }
            }

            return new List<PropertyInfo>(keyProperties);
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
            if (typeof(IData).IsAssignableFrom(interfaceType) == false) throw new ArgumentException(string.Format("The specified type must inherit from '{0}", typeof(IData)));

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
                        throw new InvalidOperationException(string.Format("More than one '{0}' defined on the type '{1}'", typeof(TitleAttribute), interfaceType));
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
            _interfaceTypeToKeyPropertyNames = new Hashtable<Type, List<string>>();
        }


        private sealed class Resources
        {
            public string UndefinedLableValue { get; set; }
            public string UndefinedDataLableValue { get; set; }
            public Dictionary<Type, bool> InterfaceToAutoUpdatebleCache { get; set; }
            public Dictionary<Type, bool> InterfaceToGeneratedCache { get; set; }
            public Hashtable<Type, Guid> InterfaceToImmutableTypeIdCache { get; set; }
            public Dictionary<Type, bool> InterfaceToNotReferenceableCache { get; set; }
            public Dictionary<Type, KeyValuePair<MethodInfo, string>> InterfaceTypeToLabelMethodInfoCache { get; set; }
            public Hashtable<Type, CachingType> InterfaceTypeToCachingTypeCache { get; set; }
            public Dictionary<Type, List<ForeignPropertyInfo>> InterfaceTypeToDataReferenceProperties { get; set; }
            public Dictionary<Type, List<PropertyInfo>> InterfaceTypeToKeyProeprtyInfoes { get; set; }
            public Dictionary<Type, string> InterfaceTypeToTypeTitle { get; set; }

            public static void Initialize(Resources resources)
            {
                resources.UndefinedLableValue = StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", "UndefinedLabelTemplate");
                resources.UndefinedDataLableValue = StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", "UndefinedDataLavelTemplate");
                resources.InterfaceToAutoUpdatebleCache = new Dictionary<Type, bool>();
                resources.InterfaceToGeneratedCache = new Dictionary<Type, bool>();
                resources.InterfaceToImmutableTypeIdCache = new Hashtable<Type, Guid>();
                resources.InterfaceToNotReferenceableCache = new Dictionary<Type, bool>();
                resources.InterfaceTypeToLabelMethodInfoCache = new Dictionary<Type, KeyValuePair<MethodInfo, string>>();
                resources.InterfaceTypeToCachingTypeCache = new Hashtable<Type, CachingType>();
                resources.InterfaceTypeToDataReferenceProperties = new Dictionary<Type, List<ForeignPropertyInfo>>();
                resources.InterfaceTypeToKeyProeprtyInfoes = new Dictionary<Type, List<PropertyInfo>>();
                resources.InterfaceTypeToTypeTitle = new Dictionary<Type, string>();
            }
        }
    }
}
