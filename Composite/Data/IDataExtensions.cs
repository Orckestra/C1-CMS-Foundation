using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Data.DynamicTypes;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Data.Hierarchy;
using Composite.Core.Types;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class IDataExtensions
    {
        private static ConcurrentDictionary<Type, IReadOnlyCollection<DataScopeIdentifier>> _supportedDataScopes
            = new ConcurrentDictionary<Type, IReadOnlyCollection<DataScopeIdentifier>>();

        private static MethodInfo ToDataReferenceMethodInfo =
            StaticReflection.GetGenericMethodInfo(() => ToDataReference<IData>(null));

        /// <summary>
        /// Copies all changed properties from sourceData to targetData.
        /// </summary>
        /// <param name="sourceData"></param>
        /// <param name="targetData"></param>
        public static void FullCopyChangedTo(this IData sourceData, IData targetData)
        {
            FullCopyChangedTo(sourceData, targetData, null);
        }


        
        /// <summary>
        /// Copies all changed properties from sourceData to targetData.
        /// </summary>
        /// <param name="sourceData"></param>
        /// <param name="targetData"></param>
        /// <param name="propertyNamesToIgnore"></param>
        public static void FullCopyChangedTo(this IData sourceData, IData targetData, IEnumerable<string> propertyNamesToIgnore)
        {
            foreach (PropertyInfo targetPropertyInfo in targetData.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance))
            {
                if (targetPropertyInfo.Name == "DataSourceId") continue;
                if ((propertyNamesToIgnore != null) && (propertyNamesToIgnore.Contains(targetPropertyInfo.Name))) continue;

                if (targetPropertyInfo.CanWrite)
                {
                    PropertyInfo sourcePropertyInfo = sourceData.GetType().GetProperty(targetPropertyInfo.Name, BindingFlags.Public | BindingFlags.Instance);

                    if (sourcePropertyInfo == null) throw new InvalidOperationException(string.Format("Missing source property '{0}' on the data type '{1}'", targetPropertyInfo.Name, sourceData.DataSourceId.InterfaceType));

                    object newValue = sourcePropertyInfo.GetValue(sourceData, null);
                    object oldValue = targetPropertyInfo.GetValue(targetData, null);

                    if (Equals(newValue, oldValue) == false)
                    {
                        targetPropertyInfo.SetValue(targetData, newValue, null);
                    }
                }
            }
        }


        /// <summary>
        /// Copies all properties that exists on the targetData from the sourceData except the DataSourceId
        /// If the targetData has a property that does not exist on the sourceData, the default value is used.
        /// </summary>
        /// <param name="sourceData"></param>
        /// <param name="targetData"></param>
        public static void ProjectedCopyTo(this IData sourceData, IData targetData)
        {
            ProjectedCopyTo(sourceData, targetData, true);
        }




        /// <summary>
        /// Copies all properties that exists on the targetData from the sourceData except the DataSourceId
        /// </summary>
        /// <param name="sourceData"></param>
        /// <param name="targetData"></param>
        /// <param name="useDefaultValues"></param>
        public  static void ProjectedCopyTo(this IData sourceData, IData targetData, bool useDefaultValues)
        {
            foreach (PropertyInfo targetPropertyInfo in targetData.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance))
            {
                if (targetPropertyInfo.Name == "DataSourceId") continue;

                if (targetPropertyInfo.CanWrite)
                {
                    PropertyInfo sourcePropertyInfo = sourceData.GetType().GetProperty(targetPropertyInfo.Name, BindingFlags.Public | BindingFlags.Instance);

                    if (sourcePropertyInfo != null)
                    {
                        object value = sourcePropertyInfo.GetValue(sourceData, null);

                        targetPropertyInfo.SetValue(targetData, value, null);
                    }
                    else if (useDefaultValues)
                    {
                        object oldValue = targetPropertyInfo.GetValue(targetData, null);

                        if (oldValue == null)
                        {
                            DefaultValue defaultValue = DynamicTypeReflectionFacade.GetDefaultValue(targetPropertyInfo);

                            if (defaultValue != null)
                            {
                                targetPropertyInfo.SetValue(targetData, defaultValue.Value, null);
                            }
                            else
                            {
                                // Do something here ?? /MRJ
                            }
                        }
                    }
                }
            }
        }



        /// <summary>
        /// Compares the value of the key properties of leftData and rightData
        /// and if all the values are equals then it returns true. Otherwise false.
        /// </summary>
        /// <param name="leftData"></param>
        /// <param name="rightData"></param>
        /// <returns></returns>
        internal static bool KeyEquals(this IData leftData, IData rightData)
        {
            Verify.ArgumentNotNull(leftData, "leftData");
            Verify.ArgumentNotNull(rightData, "rightData");

            if (leftData.DataSourceId.InterfaceType != rightData.DataSourceId.InterfaceType) return false;

            foreach (PropertyInfo propertyInfo in DataAttributeFacade.GetKeyProperties(leftData.DataSourceId.InterfaceType))
            {
                object leftValue = propertyInfo.GetValue(leftData, null);
                object rightValue = propertyInfo.GetValue(rightData, null);

                if (!leftValue.Equals(rightValue)) return false;
            }

            return true;
        }



        /// <summary>
        /// This returns an enumerable where no two data elements has the same key value.
        /// </summary>
        /// <param name="datas"></param>
        /// <returns></returns>
        internal static List<IData> KeyDistinct(this IEnumerable<IData> datas)
        {
            var result = new List<IData>();
            foreach (IData data in datas)
            {
                if (!result.Any(f => f.KeyEquals(data)))
                {
                    result.Add(data);
                }
            }

            return result;
        }



        /// <summary>
        /// Returns the data item's key field's value. If the key is compound, an exeption will be thrown.
        /// </summary>
        /// <param name="data"></param>        
        /// <returns></returns>
        /// <exclude />
        // Made public for Base site in App_Code/Composite/BasicSearch.cs
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
        public static object GetUniqueKey(this IData data)
        {
            Verify.ArgumentNotNull(data, "data");

            return data.DataSourceId.InterfaceType.GetSingleKeyProperty().GetValue(data, null);
        }



        /// <summary>
        /// Returns the data item's key field's value. If the key is compound, an exception will be thrown.
        /// </summary>
        /// <param name="data"></param>       
        /// <returns></returns>
        public static T GetUniqueKey<T>(this IData data)
        {
            Verify.ArgumentNotNull(data, "data");

            return (T)data.GetUniqueKey();
        }



        /// <summary>
        /// Converts a data item into a data reference
        /// </summary>
        /// <param name="data">The data item</param>
        /// <returns></returns>
        public static IDataReference ToDataReference(this IData data)
        {
            Verify.ArgumentNotNull(data, "data");

            var interfaceType = data.DataSourceId.InterfaceType;

            return (IDataReference) ToDataReferenceMethodInfo
                .MakeGenericMethod(new[] {interfaceType}).Invoke(null, new object[] {data});
        }



        /// <summary>
        /// Converts a data item into a data reference
        /// </summary>
        /// <param name="data">The data item</param>
        /// <returns></returns>
        public static DataReference<T> ToDataReference<T>(T data) where T : class, IData
        {
            return new DataReference<T>(data);
        }



        /// <summary>
        /// Returns true if the child has ancestor as one of its ancestors
        /// </summary>
        /// <param name="child"></param>
        /// <param name="parent"></param>
        /// <returns></returns>
        internal static bool HasAncestor(this IData child, IData parent)
        {
            return HasAncestor(child, parent, int.MaxValue);
        }



        /// <summary>
        /// Returns true if the child has ancestor as one of its ancestors
        /// in max maxLevels ancestors
        /// </summary>
        /// <param name="child"></param>
        /// <param name="parent"></param>
        /// <param name="maxLevels"></param>
        /// <returns></returns>        
        internal static bool HasAncestor(this IData child, IData parent, int maxLevels)
        {
            Verify.ArgumentNotNull(child, "child");
            Verify.ArgumentNotNull(parent, "parent");

            if (maxLevels < 0) return false;
            if (child.KeyEquals(parent))
            {
                return true;
            }
            
            IData childParent = child.GetParent();

            if (childParent == null) return false;

            return HasAncestor(childParent, parent, maxLevels - 1);
        }


        internal static IReadOnlyCollection<DataScopeIdentifier> GetSupportedDataScopes(this Type interfaceType)
        {
            Verify.ArgumentNotNull(interfaceType, "interfaceType");
            if (!typeof(IData).IsAssignableFrom(interfaceType)) throw new ArgumentException(string.Format("The specified type must inherit from '{0}'", typeof(IData)), "interfaceType");

            return _supportedDataScopes.GetOrAdd(interfaceType, GetSupportedDataScopesInt);
        }

        private static IReadOnlyCollection<DataScopeIdentifier> GetSupportedDataScopesInt(Type interfaceType)
        {
            IEnumerable<DataScopeAttribute> attributes = interfaceType.GetCustomInterfaceAttributes<DataScopeAttribute>();

            return attributes.Select(attribute => attribute.Identifier).Distinct().ToList();
        }

        /// <summary>    
        /// </summary>
        /// <exclude />
        // Made public for Base site in App_Code/Composite/BasicSearch.cs
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
        public static List<IData> ToDataList(this IQueryable queryable)
        {
            Verify.ArgumentNotNull(queryable, "queryable");

            return Enumerable.Cast<IData>(queryable).ToList();
        }



        /// <exclude />
        public static IEnumerable<IData> ToDataEnumerable(this IQueryable queryable)
        {
            Verify.ArgumentNotNull(queryable, "queryable");

            return Enumerable.Cast<IData>(queryable);
        }


        internal static IEnumerable ToCastedDataEnumerable(this IEnumerable<IData> datas, Type interfaceType)
        {
            MethodInfo methodInfo = typeof(Enumerable).GetMethods().Single(f => f.Name == "Cast");
            methodInfo = methodInfo.MakeGenericMethod(interfaceType);

            return (IEnumerable)methodInfo.Invoke(null, new object[] { datas });
        }



        internal static IDictionary<string, List<T>> ToDataProviderSortedDictionary<T>(this IEnumerable<T> datas)
            where T : class, IData
        {
            if (datas == null) throw new ArgumentNullException("datas");

            var result = new Dictionary<string, List<T>>();

            foreach (T data in datas)
            {
                List<T> dataList;

                if (result.TryGetValue(data.DataSourceId.ProviderName, out dataList) == false)
                {
                    dataList = new List<T>();

                    result.Add(data.DataSourceId.ProviderName, dataList);
                }

                dataList.Add(data);
            }

            return result;
        }



        internal static Dictionary<string, Dictionary<Type, List<IData>>> ToDataProviderAndInterfaceTypeSortedDictionary<T>(this IEnumerable<T> datas)
            where T : class, IData
        {
            if (datas == null) throw new ArgumentNullException("datas");

            var result = new Dictionary<string, Dictionary<Type, List<IData>>>();

            foreach (IData data in datas)
            {
                Dictionary<Type, List<IData>> dictionary;
                if (!result.TryGetValue(data.DataSourceId.ProviderName, out dictionary))
                {
                    dictionary = new Dictionary<Type, List<IData>>();

                    result.Add(data.DataSourceId.ProviderName, dictionary);
                }

                List<IData> dataList;
                if (!dictionary.TryGetValue(data.DataSourceId.InterfaceType, out dataList))
                {
                    dataList = new List<IData>();

                    dictionary.Add(data.DataSourceId.InterfaceType, dataList);
                }

                dataList.Add(data);
            }

            return result;
        }

        /// <exclude />
        [Obsolete("Use GetDataPropertyRecursively instead")]
        public static PropertyInfo GetDataPropertyRecursivly(this Type dataType, string propertyName)
        {
            return GetDataPropertyRecursively(dataType, propertyName);
        }

        /// <exclude />
        public static PropertyInfo GetDataPropertyRecursively(this Type dataType, string propertyName)
        {
            Verify.ArgumentNotNull(dataType, "dataType");

            PropertyInfo propertyInfo = dataType.GetProperty(propertyName);

            if (propertyInfo != null) return propertyInfo;

            foreach (Type superInterface in dataType.GetInterfaces())
            {
                if (superInterface != typeof(IData) &&
                    typeof(IData).IsAssignableFrom(superInterface))
                {
                    PropertyInfo propInfo = superInterface.GetDataPropertyRecursivly(propertyName);

                    if (propInfo != null)
                    {
                        return propInfo;
                    }
                }
            }

            return null;
        }



        internal static List<PropertyInfo> GetAllProperties(this Type dataType)
        {
            Verify.ArgumentNotNull(dataType, "dataType");

            var result = new List<PropertyInfo>();

            result.AddRange(dataType.GetProperties());

            foreach (Type superInterface in dataType.GetInterfacesRecursively())
            {
                if (superInterface != typeof(IData) &&
                    typeof(IData).IsAssignableFrom(superInterface))
                {
                    result.AddRange(superInterface.GetProperties());
                }
            }

            // A compatibility fix, returning the same "PageId" property twice usually leads to an error
            if (typeof(IPageData).IsAssignableFrom(dataType))
            {
                result.RemoveAll(p => p.Name == "PageId" && p.DeclaringType == typeof(IPageData));
            }

            return result;
        }



        /// <exclude />
        public static void SetValues(this IData data, Dictionary<string, string> values)
        {
            Verify.ArgumentNotNull(data, "data");
            Verify.ArgumentNotNull(values, "values");

            List<PropertyInfo> properties = data.DataSourceId.InterfaceType.GetPropertiesRecursively();

            foreach (var kvp in values)
            {
                PropertyInfo propertyInfo = properties.Single(f => f.Name == kvp.Key);

                object convertedValue = ValueTypeConverter.Convert(kvp.Value, propertyInfo.PropertyType);

                propertyInfo.SetValue(data, convertedValue, null);
            }
        }
    }
}
