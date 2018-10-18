using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading;
using System.Transactions;
using Composite.Core.Collections.Generic;
using Composite.Core.Linq;
using Composite.Data.Caching;
using Composite.Data.Foundation;
using Composite.C1Console.Events;
using Composite.Data.Transactions;
using Composite.Core.Types;
using Composite.Data.Types;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum CascadeDeleteType
    {
        /// <exclude />
        Allow = 0, // Cascade delete are performed if the references allows it, if referees dont allow it and exception is thrown

        /// <exclude />
        Disallow = 1, // Cascade deletes are not performed and if referees exists an exception is thrown

        /// <exclude />
        Disable = 2// No check on existens of referees is done. This might result in foreign key violation
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataMoveResult
    {
        internal DataMoveResult(IData movedData, IEnumerable<IData> movedRefereeDatas)
        {
            this.MovedData = movedData;
            this.MovedRefereeDatas = movedRefereeDatas;
        }


        /// <exclude />
        public IData MovedData
        {
            get;
            private set;
        }


        /// <exclude />
        public IEnumerable<IData> MovedRefereeDatas
        {
            get;
            private set;
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class DataFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.DoInitializeResources);

        private static IDataFacade _dataFacade = new DataFacadeImpl();

        static DataFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }

        
        internal static IDataFacade Implementation { get { return _dataFacade; } set { _dataFacade = value; } }


        /// <summary>
        /// Gets an empty predicate (f => true)
        /// </summary>
        public static Expression<Func<T, bool>> GetEmptyPredicate<T>() where T : class
        {
            return EmptyPredicate<T>.Instance;
        }


        #region Data interception methods

        /// <exclude />
        public static void SetDataInterceptor<T>(DataInterceptor dataInterceptor)
            where T : class, IData
        {
            _dataFacade.SetDataInterceptor<T>(dataInterceptor);
        }



        // Overload
        /// <exclude />
        public static void SetDataInterceptor(Type interfaceType, DataInterceptor dataInterceptor)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");

            MethodInfo methodInfo = GetSetDataInterceptorMethodInfo(interfaceType);

            methodInfo.Invoke(null, new object[] { dataInterceptor });
        }



        /// <exclude />
        public static bool HasDataInterceptor<T>()
            where T : class, IData
        {
            return _dataFacade.HasDataInterceptor<T>();
        }


        /// <exclude />
        internal static IEnumerable<DataInterceptor> GetDataInterceptors(Type interfaceType)
        {
            return _dataFacade.GetDataInterceptors(interfaceType);
        }


        // Overload
        /// <exclude />
        public static void HasDataInterceptor(Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");

            MethodInfo methodInfo = GetHasDataInterceptorMethodInfo(interfaceType);

            methodInfo.Invoke(null, new object[] { });
        }



        /// <exclude />
        public static void ClearDataInterceptor<T>()
            where T : class, IData
        {
            _dataFacade.ClearDataInterceptor<T>();
        }



        // Overload
        /// <exclude />
        public static void ClearDataInterceptor(Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");

            MethodInfo methodInfo = GetClearDataInterceptorMethodInfo(interfaceType);

            methodInfo.Invoke(null, new object[] { });
        }

        /// <exclude />
        public static void SetGlobalDataInterceptor<T>(DataInterceptor dataInterceptor)
            where T : class, IData
        {
            _dataFacade.SetGlobalDataInterceptor<T>(dataInterceptor);
        }



        /// <exclude />
        public static bool HasGlobalDataInterceptor<T>()
            where T : class, IData
        {
            return _dataFacade.HasGlobalDataInterceptor<T>();
        }



        /// <exclude />
        public static void ClearGlobalDataInterceptor<T>()
            where T : class, IData
        {
            _dataFacade.ClearGlobalDataInterceptor<T>();
        }



        
        #endregion



        #region GetData methods

        /// <exclude />
        public static IQueryable<T> GetData<T>(bool useCaching, IEnumerable<string> providerNames)
            where T : class, IData
        {
            return _dataFacade.GetData<T>(useCaching, providerNames);
        }

        /// <exclude />
        public static IQueryable<T> GetData<T>(bool useCaching)
            where T : class, IData
        {
            return _dataFacade.GetData<T>(useCaching, null);
        }


        // Overload
        /// <exclude />
        public static IQueryable<T> GetData<T>()
            where T : class, IData
        {
            return GetData<T>(true, null);
        }



        // Overload
        /// <exclude />
        public static IQueryable<T> GetData<T>(Expression<Func<T, bool>> predicate)
            where T : class, IData
        {
            Verify.ArgumentNotNull(predicate, "predicate");

            IQueryable<T> result = GetData<T>(true, null);

            if (object.Equals(predicate, EmptyPredicate<T>.Instance))
            {
                return result;
            }

            return result.Where(predicate);
        }



        // Overload
        /// <exclude />
        public static IQueryable<T> GetData<T>(Expression<Func<T, bool>> predicate, bool useCaching)
            where T : class, IData
        {
            if (predicate == null) throw new ArgumentNullException("predicate");

            IQueryable<T> result = GetData<T>(useCaching, null);

            if (object.Equals(predicate, EmptyPredicate<T>.Instance))
            {
                return result;
            }

            return result.Where(predicate);
        }



        // Overload
        /// <exclude />
        public static IQueryable GetData(Type interfaceType)
        {
            return GetData(interfaceType, true);
        }


        // Overload
        /// <exclude />
        public static IQueryable GetData(Type interfaceType, bool useCaching)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");

            MethodInfo methodInfo = GetGetDataMethodInfo(interfaceType);

            return methodInfo.Invoke(null, new object[] { useCaching, null }) as IQueryable;
        }



        // Overload
        /// <exclude />
        public static IQueryable GetData(Type interfaceType, string providerName)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (string.IsNullOrEmpty(providerName)) throw new ArgumentNullException("providerName");

            MethodInfo methodInfo = GetGetDataMethodInfo(interfaceType);

            return methodInfo.Invoke(null, new object[] { false, new string[] { providerName } }) as IQueryable;
        }

        #endregion



        #region GetDataFromDataSourceId methods

        /// <exclude />
        public static T GetDataFromDataSourceId<T>(DataSourceId dataSourceId, bool useCaching)
            where T : class, IData
        {
            if (null == dataSourceId) throw new ArgumentNullException("dataSourceId");

            return _dataFacade.GetDataFromDataSourceId<T>(dataSourceId, useCaching);
        }


        // Overload
        /// <exclude />
        public static T GetDataFromDataSourceId<T>(DataSourceId dataSourceId)
            where T : class, IData
        {
            if (null == dataSourceId) throw new ArgumentNullException("dataSourceId");

            return GetDataFromDataSourceId<T>(dataSourceId, true);
        }



        // Overload
        /// <exclude />
        public static IData GetDataFromDataSourceId(DataSourceId dataSourceId)
        {
            if (null == dataSourceId) throw new ArgumentNullException("dataSourceId");

            MethodInfo methodInfo = GetGetDataFromDataSourceIdMethodInfo(dataSourceId.InterfaceType);

            IData data = (IData)methodInfo.Invoke(null, new object[] { dataSourceId, true });

            return data;
        }



        // Overload
        /// <exclude />
        public static IData GetDataFromDataSourceId(DataSourceId dataSourceId, bool useCaching)
        {
            if (null == dataSourceId) throw new ArgumentNullException("dataSourceId");

            MethodInfo methodInfo = GetGetDataFromDataSourceIdMethodInfo(dataSourceId.InterfaceType);

            IData data = (IData)methodInfo.Invoke(null, new object[] { dataSourceId, useCaching });

            return data;
        }

        #endregion



        #region GetDataFromOtherScope methods (Only helpers)

        /// <exclude />
        public static IQueryable<T> GetDataFromOtherScope<T>(T data, DataScopeIdentifier dataScopeIdentifier)
            where T : class, IData
        {
            Verify.ArgumentNotNull(data, "data");
            if (dataScopeIdentifier == null) throw new ArgumentNullException("dataScopeIdentifier");

            if (GetSupportedDataScopes(data.DataSourceId.InterfaceType).Contains(dataScopeIdentifier) == false) throw new ArgumentException(string.Format("The data type '{0}' does not support the data scope '{1}'", data.DataSourceId.InterfaceType, dataScopeIdentifier));

            using (new DataScope(dataScopeIdentifier))
            {
                return DataExpressionBuilder.GetQueryableByData<T>(data, true);
            }
        }

        /// <exclude />
        public static IQueryable<T> GetDataFromOtherLocale<T>(T data, CultureInfo cultureInfo)
            where T : class, IData
        {
            Verify.ArgumentNotNull(data, "data");
            if (cultureInfo == null) throw new ArgumentNullException("cultureInfo");

            using (new DataScope(cultureInfo))
            {
                return DataExpressionBuilder.GetQueryableByData<T>(data, true);
            }
        }

        /// <exclude />
        public static IEnumerable<IData> GetDataFromOtherScope(IData data, DataScopeIdentifier dataScopeIdentifier)
        {
            return GetDataFromOtherScope(data, dataScopeIdentifier, false);
        }

        /// <exclude />
        public static IEnumerable<IData> GetDataFromOtherScope(
            IData data, DataScopeIdentifier dataScopeIdentifier, bool useCaching)
        {
            return GetDataFromOtherScope(data, dataScopeIdentifier, useCaching, true);
        }

        /// <exclude />
        public static IEnumerable<IData> GetDataFromOtherScope(
            IData data, DataScopeIdentifier dataScopeIdentifier, bool useCaching, bool ignoreVersioning)
        {
            Verify.ArgumentNotNull(data, "data");
            Verify.ArgumentNotNull(dataScopeIdentifier, nameof(dataScopeIdentifier));

            if (!GetSupportedDataScopes(data.DataSourceId.InterfaceType).Contains(dataScopeIdentifier))
            {
                throw new ArgumentException($"The data type '{data.DataSourceId.InterfaceType}' does not support the data scope '{dataScopeIdentifier}'");
            }

            if (useCaching)
            {
                DataSourceId sourceId = data.DataSourceId;
                var newDataSource = new DataSourceId(sourceId.DataId, sourceId.ProviderName, sourceId.InterfaceType)
                {
                    DataScopeIdentifier = dataScopeIdentifier
                };


                IData fromDataSource = GetDataFromDataSourceId(newDataSource, true);
                return fromDataSource == null ? new IData[0] : new[] { fromDataSource };
            }

            var result = new List<IData>();

            using (new DataScope(dataScopeIdentifier))
            {
                IQueryable table = GetData(data.DataSourceId.InterfaceType, false);

                IQueryable queryable = DataExpressionBuilder.GetQueryableByData(data, table, ignoreVersioning);

                foreach (object obj in queryable)
                {
                    result.Add((IData)obj);
                }
            }

            return result;
        }

        #endregion



        #region GetPredicateExpressionByUniqueKey methods (Only helpers)

        /// <exclude />
        public static Expression<Func<T, bool>> GetPredicateExpressionByUniqueKey<T>(DataKeyPropertyCollection dataKeyPropertyCollection)
            where T : class, IData
        {
            Verify.ArgumentNotNull(dataKeyPropertyCollection, nameof(dataKeyPropertyCollection));

            var keyProperties = typeof(T).GetKeyProperties();

            ParameterExpression parameterExpression = Expression.Parameter(typeof(T), "data");

            Expression currentExpression = GetPredicateExpressionByUniqueKeyFilterExpression(keyProperties, dataKeyPropertyCollection, parameterExpression);

            return Expression.Lambda<Func<T, bool>>(currentExpression, parameterExpression);
        }



        // Overload
        /// <exclude />
        public static Expression<Func<T, bool>> GetPredicateExpressionByUniqueKey<T>(object dataKeyValue)
            where T : class, IData
        {
            return GetPredicateExpressionByUniqueKey<T>(ToKeyCollection(typeof(T), dataKeyValue));
        }



        /// <exclude />
        public static LambdaExpression GetPredicateExpressionByUniqueKey(Type interfaceType, DataKeyPropertyCollection dataKeyPropertyCollection)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (dataKeyPropertyCollection == null) throw new ArgumentNullException("dataKeyPropertyCollection");

            var keyProperties = DataAttributeFacade.GetKeyProperties(interfaceType);

            ParameterExpression parameterExpression = Expression.Parameter(interfaceType, "data");

            Expression currentExpression = GetPredicateExpressionByUniqueKeyFilterExpression(keyProperties, dataKeyPropertyCollection, parameterExpression);

            Type delegateType = typeof(Func<,>).MakeGenericType(interfaceType, typeof(bool));

            return Expression.Lambda(delegateType, currentExpression, parameterExpression);
        }



        // Overload
        /// <exclude />
        public static LambdaExpression GetPredicateExpressionByUniqueKey(Type interfaceType, object dataKeyValue)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");

            return GetPredicateExpressionByUniqueKey(interfaceType, ToKeyCollection(interfaceType, dataKeyValue));
        }



        // Private helper
        private static Expression GetPredicateExpressionByUniqueKeyFilterExpression(IReadOnlyList<PropertyInfo> keyProperties, DataKeyPropertyCollection dataKeyPropertyCollection, ParameterExpression parameterExpression)
        {
            if (keyProperties.Count != dataKeyPropertyCollection.Count) throw new ArgumentException("Missing og to many key properties");

            var propertiesWithValues = new List<Tuple<PropertyInfo, object>>();
            foreach (var kvp in dataKeyPropertyCollection.KeyProperties)
            {
                PropertyInfo keyPropertyInfo = keyProperties.Single(f => f.Name == kvp.Key);
                object castedDataKey = ValueTypeConverter.Convert(kvp.Value, keyPropertyInfo.PropertyType);

                propertiesWithValues.Add(new Tuple<PropertyInfo, object>(keyPropertyInfo, castedDataKey));
            }

            return ExpressionHelper.CreatePropertyPredicate(parameterExpression, propertiesWithValues);
        }

        #endregion



        #region GetDataByUniqueKey methods (Only helpers)

        // Overload
        /// <exclude />
        public static T TryGetDataByUniqueKey<T>(object dataKeyValue)
            where T : class, IData
        {
            return TryGetDataByUniqueKey<T>(ToKeyCollection(typeof(T), dataKeyValue));
        }



        /// <exclude />
        public static T TryGetDataByUniqueKey<T>(DataKeyPropertyCollection dataKeyPropertyCollection)
            where T : class, IData
        {
            return (T) TryGetDataByUniqueKey(typeof(T), dataKeyPropertyCollection);
        }



        // Overload
        /// <exclude />
        public static T GetDataByUniqueKey<T>(object dataKeyValue)
            where T : class, IData
        {
            IData data = TryGetDataByUniqueKey<T>(dataKeyValue);

            if (data == null) throw new InvalidOperationException("No data exist given the data key value");

            return (T)data;
        }


        // Overload
        /// <exclude />
        public static IData TryGetDataByUniqueKey(Type interfaceType, object dataKeyValue)
        {
            Verify.ArgumentNotNull(interfaceType, nameof(interfaceType));

            return TryGetDataByUniqueKey(interfaceType, ToKeyCollection(interfaceType, dataKeyValue));
        }

        // Overload
        /// <exclude />
        public static IEnumerable<IData> TryGetDataVersionsByUniqueKey(Type interfaceType, object dataKeyValue)
        {
            Verify.ArgumentNotNull(interfaceType, "interfaceType");

            return TryGetDataVersionsByUniqueKey(interfaceType, ToKeyCollection(interfaceType, dataKeyValue));
        }


        /// <exclude />
        public static IData TryGetDataByUniqueKey(Type interfaceType, DataKeyPropertyCollection dataKeyPropertyCollection)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (dataKeyPropertyCollection == null) throw new ArgumentNullException("dataKeyPropertyCollection");

            if (dataKeyPropertyCollection.Count == 1 && DataCachingFacade.IsDataAccessCacheEnabled(interfaceType))
            {
                var query = GetData(interfaceType);
                if (query is ICachingQueryable_CachedByKey cachedByKey)
                {
                    return cachedByKey.GetCachedValueByKey(GetConvertedUniqueKey(interfaceType, dataKeyPropertyCollection));
                }
            }

            LambdaExpression lambdaExpression = GetPredicateExpressionByUniqueKey(interfaceType, dataKeyPropertyCollection);

            MethodInfo methodInfo = GetGetDataWithPredicatMethodInfo(interfaceType);

            IQueryable queryable = (IQueryable)methodInfo.Invoke(null, new object[] { lambdaExpression });

            IData data = queryable.OfType<IData>().SingleOrDefault();

            return data;
        }


        /// <exclude />
        public static IEnumerable<IData> TryGetDataVersionsByUniqueKey(Type interfaceType, DataKeyPropertyCollection dataKeyPropertyCollection)
        {
            Verify.ArgumentNotNull(interfaceType, nameof(interfaceType));
            Verify.ArgumentNotNull(dataKeyPropertyCollection, nameof(dataKeyPropertyCollection));

            if (dataKeyPropertyCollection.Count == 1 && DataCachingFacade.IsDataAccessCacheEnabled(interfaceType))
            {
                var query = GetData(interfaceType);
                if (query is ICachingQueryable_CachedByKey cachedByKey)
                {
                    return cachedByKey.GetCachedVersionValuesByKey(GetConvertedUniqueKey(interfaceType, dataKeyPropertyCollection));
                }
            }

            LambdaExpression lambdaExpression = GetPredicateExpressionByUniqueKey(interfaceType, dataKeyPropertyCollection);

            MethodInfo methodInfo = GetGetDataWithPredicatMethodInfo(interfaceType);

            var queryable = (IQueryable)methodInfo.Invoke(null, new object[] { lambdaExpression });

            return ((IEnumerable) queryable).Cast<IData>();
        }


        private static object GetConvertedUniqueKey(Type interfaceType, DataKeyPropertyCollection keyCollection)
        {
            var keyPropertyInfo = interfaceType.GetKeyProperties().Single();
            var kvp = keyCollection.KeyProperties.Single();

            if (keyPropertyInfo.Name != kvp.Key)
            {
                throw new InvalidOperationException($"Expected value for key '{keyPropertyInfo.Name}' but found '{kvp.Key}'");
            }


            var result = ValueTypeConverter.TryConvert(kvp.Value, keyPropertyInfo.PropertyType, out var conversionException);
            if (conversionException != null)
            {
                throw conversionException;
            }

            return result;
        }


        // Overload
        /// <exclude />
        public static IData GetDataByUniqueKey(Type interfaceType, object dataKeyValue)
        {
            Verify.ArgumentNotNull(interfaceType, nameof(interfaceType));

            IData data = TryGetDataByUniqueKey(interfaceType, dataKeyValue);

            Verify.IsNotNull(data, "No data exist given the data key value");

            return data;
        }



        // Overload
        /// <exclude />
        public static IData GetDataByUniqueKey(Type interfaceType, DataKeyPropertyCollection dataKeyPropertyCollection)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (dataKeyPropertyCollection == null) throw new ArgumentNullException("dataKeyPropertyCollection");

            IData data = TryGetDataByUniqueKey(interfaceType, dataKeyPropertyCollection);

            if (data == null) throw new InvalidOperationException("No data exist given the data key values");

            return data;
        }


        private static DataKeyPropertyCollection ToKeyCollection(Type interfaceType, object dataKeyValue)
        {
            var keyPropertyInfo = interfaceType.GetKeyProperties().Single();
            return ToKeyCollection(keyPropertyInfo, dataKeyValue);
        }


        private static DataKeyPropertyCollection ToKeyCollection(PropertyInfo keyPropertyInfo, object dataKeyValue)
        {
            var dataKeyPropertyCollection = new DataKeyPropertyCollection();
            dataKeyPropertyCollection.AddKeyProperty(keyPropertyInfo, dataKeyValue);
            return dataKeyPropertyCollection;
        }

        #endregion



        #region GetDataOrderedBy methods (Only helpers)

        // Overload
        /// <exclude />
        public static IEnumerable<IData> GetDataOrderedBy(Type interfaceType, PropertyInfo propertyInfo)
        {
            return GetDataOrderedByQueryable(interfaceType, propertyInfo).ToDataEnumerable();
        }



        /// <exclude />
        public static IQueryable GetDataOrderedByQueryable(Type interfaceType, PropertyInfo propertyInfo)
        {
            IQueryable source = DataFacade.GetData(interfaceType);

            ParameterExpression parameter = Expression.Parameter(interfaceType, "f");
            LambdaExpression lambdaExpression = Expression.Lambda(Expression.Property(parameter, propertyInfo), parameter);

            MethodCallExpression methodCallExpression = Expression.Call
            (
                typeof(Queryable),
                "OrderBy",
                new Type[] { interfaceType, propertyInfo.PropertyType },
                source.Expression,
                Expression.Quote(lambdaExpression)
            );

            return source.Provider.CreateQuery(methodCallExpression);
        }

        #endregion



        #region GetPredicateExpression methods (Only helpers)

        /// <exclude />
        public static LambdaExpression GetPredicateExpression(Type interfaceType, DataPropertyValueCollection dataPropertyValueCollection)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (dataPropertyValueCollection == null) throw new ArgumentNullException("dataPropertyValueCollection");

            ParameterExpression parameterExpression = Expression.Parameter(interfaceType, "data");

            Expression currentExpression = GetPredicateExpressionFilterExpression(dataPropertyValueCollection, parameterExpression);

            Type delegateType = typeof(Func<,>).MakeGenericType(new Type[] { interfaceType, typeof(bool) });

            LambdaExpression lambdaExpression = Expression.Lambda(delegateType, currentExpression, new ParameterExpression[] { parameterExpression });

            return lambdaExpression;
        }


        // Private helper
        private static Expression GetPredicateExpressionFilterExpression(DataPropertyValueCollection dataPropertyValueCollection, ParameterExpression parameterExpression)
        {
            Expression currentExpression = null;
            foreach (var kvp in dataPropertyValueCollection.PropertyValues)
            {
                Expression left = LambdaExpression.Property(parameterExpression, kvp.Key);
                object castedValue = ValueTypeConverter.Convert(kvp.Value, kvp.Key.PropertyType);
                Expression right = Expression.Constant(castedValue);

                Expression filter = Expression.Equal(left, right);

                if (currentExpression == null)
                {
                    currentExpression = filter;
                }
                else
                {
                    currentExpression = Expression.And(currentExpression, filter);
                }
            }

            return currentExpression;
        }

        #endregion



        #region WillUpdateSucceed methods (Only helpers)

        /// <exclude />
        public static bool WillUpdateSucceed(IData data)
        {
            Verify.ArgumentNotNull(data, "data");

            return data.TryValidateForeignKeyIntegrity();
        }


        /// <exclude />
        public static bool WillUpdateSucceed(IEnumerable<IData> datas)
        {
            if (null == datas) throw new ArgumentNullException("datas");

            foreach (IData data in datas)
            {
                if (data == null) throw new ArgumentException("datas may not contain nulls");

                if (data.TryValidateForeignKeyIntegrity() == false) return false;
            }

            return true;
        }

        #endregion



        #region Update methods

        // Overload
        /// <exclude />
        public static void Update(IData data)
        {
            Verify.ArgumentNotNull(data, "data");
            Verify.ArgumentCondition(data.DataSourceId != null, "data", "DataSourceId isn't defined");
            Verify.ArgumentCondition(data.DataSourceId.ProviderName != null, "data", 
                "Data provider isn't defined. Use method AddNew() for instances created with BuildNew()");

            Update(new[] { data });
        }


        /// <exclude />
        public static void Update(IData data, bool suppressEventing, bool performForeignKeyIntegrityCheck, bool performeValidation)
        {
            if (null == data) throw new ArgumentNullException("data");

            Update(new[] { data }, suppressEventing, performForeignKeyIntegrityCheck, performeValidation);
        }


        /// <exclude />
        public static void Update(IEnumerable<IData> dataset)
        {
            Verify.ArgumentNotNull(dataset, "dataset");

            _dataFacade.Update(dataset, false, true, true);
        }


        /// <exclude />
        public static void Update(IEnumerable<IData> dataset, bool suppressEventing, bool performForeignKeyIntegrityCheck)
        {
            Verify.ArgumentNotNull(dataset, "dataset");

            _dataFacade.Update(dataset, suppressEventing, performForeignKeyIntegrityCheck, true);
        }


        /// <exclude />
        public static void Update(IEnumerable<IData> dataset, bool suppressEventing, bool performForeignKeyIntegrityCheck, bool performeValidation)
        {
            Verify.ArgumentNotNull(dataset, "dataset");

            _dataFacade.Update(dataset, suppressEventing, performForeignKeyIntegrityCheck, performeValidation);
        }

        #endregion



        #region BuildNew methods (Only helpers)

        // Overload
        /// <exclude />
        public static T BuildNew<T>()
            where T : class, IData
        {
            return BuildNew<T>(false);
        }



        /// <exclude />
        public static T BuildNew<T>(bool suppressEventing)
            where T : class, IData
        {
            return _dataFacade.BuildNew<T>(suppressEventing);
        }



        // Overload
        /// <exclude />
        public static IData BuildNew(Type interfaceType)
        {
            return BuildNew(interfaceType, false);
        }



        /// <exclude />
        public static IData BuildNew(Type interfaceType, bool suppressEventling)
        {
            return _dataFacade.BuildNew(interfaceType, suppressEventling);
        }



        

        #endregion



        #region WillAddNewSucceed (Only helpers)

        /// <exclude />
        public static bool WillAddNewSucceed(IData data)
        {
            Verify.ArgumentNotNull(data, "data");

            return data.TryValidateForeignKeyIntegrity();
        }


        /// <exclude />
        public static bool WillAddNewSucceed<T>(T data)
            where T : class, IData
        {
            Verify.ArgumentNotNull(data, "data");

            return data.TryValidateForeignKeyIntegrity();
        }


        /// <exclude />
        public static bool WillAddNewSucceed<T>(IEnumerable<T> datas)
            where T : class, IData
        {
            if (datas == null) throw new ArgumentNullException("datas");

            foreach (T data in datas)
            {
                if (data == null) throw new ArgumentException("datas may not contain nulls");

                if (data.TryValidateForeignKeyIntegrity() == false) return false;
            }

            return true;
        }

        #endregion



        #region AddNew methods

        // Overload
        /// <exclude />
        public static T AddNew<T>(T data)
            where T : class, IData
        {
            Verify.ArgumentNotNull(data, "data");

            List<T> result = AddNew<T>(new T[] { data }, true, false, true, true, null);

            return result[0];
        }



        // Overload
        /// <exclude />
        public static T AddNew<T>(T data, string providerName)
            where T : class, IData
        {
            Verify.ArgumentNotNull(data, "data");
            if (string.IsNullOrEmpty(providerName)) throw new ArgumentNullException("providerName");

            List<T> result = AddNew<T>(new T[] { data }, true, false, true, true, new List<string> { providerName });

            return result[0];
        }



        // Overload
        /// <exclude />
        public static List<T> AddNew<T>(IEnumerable<T> datas)
            where T : class, IData
        {
            if (datas == null) throw new ArgumentNullException("datas");

            return AddNew<T>(datas, true, false, true, true, null);
        }



        // Overload
        /// <exclude />
        public static List<T> AddNew<T>(IEnumerable<T> datas, string providerName)
            where T : class, IData
        {
            if (datas == null) throw new ArgumentNullException("datas");
            if (string.IsNullOrEmpty(providerName)) throw new ArgumentNullException("providerName");

            return AddNew<T>(datas, true, false, true, true, new List<string> { providerName });
        }



        // Overload
        /// <summary>
        /// WARNING: Setting <paramref name="performForeignKeyIntegrityCheck"/> to 'false' can 
        /// cause serious foreign key corruption.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="performForeignKeyIntegrityCheck"></param>
        /// <returns></returns>
        public static T AddNew<T>(T data, bool performForeignKeyIntegrityCheck)
            where T : class, IData
        {
            Verify.ArgumentNotNull(data, "data");

            List<T> result = AddNew<T>(new T[] { data }, true, false, performForeignKeyIntegrityCheck, true, null);

            return result[0];
        }



        // Overload
        /// <summary>
        /// WARNING: Setting <paramref name="performForeignKeyIntegrityCheck"/> to 'false' can 
        /// cause serious foreign key corruption.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="suppressEventing"></param>
        /// <param name="performForeignKeyIntegrityCheck"></param>
        /// <returns></returns>
        public static T AddNew<T>(T data, bool suppressEventing, bool performForeignKeyIntegrityCheck)
            where T : class, IData
        {
            Verify.ArgumentNotNull(data, "data");

            List<T> result = AddNew<T>(new T[] { data }, true, suppressEventing, performForeignKeyIntegrityCheck, true, null);

            return result[0];
        }



        // Overload
        /// <summary>
        /// WARNING: Setting <paramref name="performForeignKeyIntegrityCheck"/> to 'false' can 
        /// cause serious foreign key corruption.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="suppressEventing"></param>
        /// <param name="performeValidation"></param>
        /// <param name="performForeignKeyIntegrityCheck"></param>
        /// <returns></returns>
        public static T AddNew<T>(T data, bool suppressEventing, bool performForeignKeyIntegrityCheck, bool performeValidation)
            where T : class, IData
        {
            Verify.ArgumentNotNull(data, "data");

            List<T> result = AddNew<T>(new T[] { data }, true, suppressEventing, performForeignKeyIntegrityCheck, performeValidation, null);

            return result[0];
        }



        // Overload
        /// <exclude />
        public static IData AddNew(IData data)
        {
            Verify.ArgumentNotNull(data, "data");

            MethodInfo methodInfo = GetAddNewMethodInfo(data.DataSourceId.InterfaceType);

            IData resultData = (IData)methodInfo.Invoke(null, new object[] { data, true, false, true, true, null });

            return resultData;
        }



        /// <summary>
        /// WARNING: Setting <paramref name="performForeignKeyIntegrityCheck"/> to 'false' can cause serious foreign key corruption.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="suppressEventing"></param>
        /// <param name="performForeignKeyIntegrityCheck"></param>
        /// <param name="providerName"></param>
        /// <returns></returns>
        public static IData AddNew(IData data, bool suppressEventing, bool performForeignKeyIntegrityCheck, string providerName)
        {
            Verify.ArgumentNotNull(data, "data");

            MethodInfo methodInfo = GetAddNewMethodInfo(data.DataSourceId.InterfaceType);

            IData resultData = (IData)methodInfo.Invoke(null, new object[] { data, true, suppressEventing, performForeignKeyIntegrityCheck, true, new List<string> { providerName } });

            return resultData;
        }



        /// <summary>
        /// WARNING: Setting <paramref name="performForeignKeyIntegrityCheck"/> to 'false' can cause serious foreign key corruption.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="interfaceType"></param>
        /// <param name="suppressEventing"></param>
        /// <param name="performForeignKeyIntegrityCheck"></param>
        /// <param name="providerName"></param>
        /// <returns></returns>
        public static IData AddNew(IData data, Type interfaceType, bool suppressEventing, bool performForeignKeyIntegrityCheck, string providerName)
        {
            Verify.ArgumentNotNull(data, "data");

            MethodInfo methodInfo = GetAddNewMethodInfo(interfaceType);

            IData resultData = (IData)methodInfo.Invoke(null, new object[] { data, true, suppressEventing, performForeignKeyIntegrityCheck, true, new List<string> { providerName } });

            return resultData;
        }



        /// <summary>
        /// WARNING: Setting <paramref name="performForeignKeyIntegrityCheck"/> to 'false' can cause serious foreign key corruption.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="suppressEventing"></param>
        /// <param name="performForeignKeyIntegrityCheck"></param>        
        /// <param name="performeValidation"></param>
        /// <returns></returns>
        public static IData AddNew(IData data, bool suppressEventing, bool performForeignKeyIntegrityCheck, bool performeValidation)
        {
            Verify.ArgumentNotNull(data, "data");

            MethodInfo methodInfo = GetAddNewMethodInfo(data.DataSourceId.InterfaceType);

            IData resultData = (IData)methodInfo.Invoke(null, new object[] { data, true, suppressEventing, performForeignKeyIntegrityCheck, performeValidation, null });

            return resultData;
        }




        /// <summary>
        /// WARNING: Setting <paramref name="performForeignKeyIntegrityCheck"/> to 'false' can cause serious foreign key corruption.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="interfaceType"></param>
        /// <param name="suppressEventing"></param>
        /// <param name="performForeignKeyIntegrityCheck"></param>        
        /// <param name="performeValidation"></param>
        /// <returns></returns>
        public static IData AddNew(IData data, Type interfaceType, bool suppressEventing, bool performForeignKeyIntegrityCheck, bool performeValidation)
        {
            Verify.ArgumentNotNull(data, "data");

            MethodInfo methodInfo = GetAddNewMethodInfo(interfaceType);

            IData resultData = (IData)methodInfo.Invoke(null, new object[] { data, true, suppressEventing, performForeignKeyIntegrityCheck, performeValidation, null });

            return resultData;
        }



        /// <summary>
        /// WARNING: Setting <paramref name="performForeignKeyIntegrityCheck"/> to 'false' can cause serious foreign key corruption.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="suppressEventing"></param>
        /// <param name="performForeignKeyIntegrityCheck"></param>
        /// <param name="performeValidation"></param>
        /// <param name="providerName"></param>
        /// <returns></returns>
        public static IData AddNew(IData data, bool suppressEventing, bool performForeignKeyIntegrityCheck, bool performeValidation, string providerName)
        {
            Verify.ArgumentNotNull(data, "data");

            MethodInfo methodInfo = GetAddNewMethodInfo(data.DataSourceId.InterfaceType);

            IData resultData = (IData)methodInfo.Invoke(null, new object[] { data, true, suppressEventing, performForeignKeyIntegrityCheck, performeValidation, new List<string> { providerName } });

            return resultData;
        }




        // Overload
        /// <summary>
        /// WARNING: Setting <paramref name="performForeignKeyIntegrityCheck"/> to 'false' can cause serious foreign key corruption.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="performForeignKeyIntegrityCheck"></param>
        /// <returns></returns>
        public static IData AddNew(IData data, bool performForeignKeyIntegrityCheck)
        {
            Verify.ArgumentNotNull(data, "data");

            MethodInfo methodInfo = GetAddNewMethodInfo(data.DataSourceId.InterfaceType);

            IData resultData = (IData)methodInfo.Invoke(null, new object[] { data, true, false, performForeignKeyIntegrityCheck, true, null });

            return resultData;
        }



        private static T AddNew<T>(T data, bool allowStoreCreation, bool suppressEventing, bool performForeignKeyIntegrityCheck, bool performeValidation, List<string> writeableProviders)
            where T : class, IData
        {
            List<T> result = _dataFacade.AddNew<T>(new T[] { data }, allowStoreCreation, suppressEventing, performForeignKeyIntegrityCheck, performeValidation, writeableProviders);

            return result[0];
        }



        private static List<T> AddNew<T>(IEnumerable<T> collection, bool allowStoreCreation, bool suppressEventing, bool performForeignKeyIntegrityCheck, bool performeValidation, List<string> writeableProviders)
            where T : class, IData
        {
            return _dataFacade.AddNew<T>(collection, allowStoreCreation, suppressEventing, performForeignKeyIntegrityCheck, performeValidation, writeableProviders);
        }

        #endregion



        #region WillDeleteSucceed methods (Only helpers)

        /// <exclude />
        public static bool WillDeleteSucceed<T>(T data)
            where T : class, IData
        {
            Verify.ArgumentNotNull(data, "data");

            return data.TryValidateDeleteSuccess();
        }



        /// <exclude />
        public static bool WillDeleteSucceed(IEnumerable<IData> datas)
        {
            if (datas == null) throw new ArgumentNullException("datas");

            return WillDeleteSucceed<IData>(datas);
        }



        /// <exclude />
        public static bool WillDeleteSucceed(IData data)
        {
            Verify.ArgumentNotNull(data, "data");

            return data.TryValidateDeleteSuccess();
        }



        /// <exclude />
        public static bool WillDeleteSucceed<T>(IEnumerable<T> dataset)
            where T : class, IData
        {
            Verify.ArgumentNotNull(dataset, "dataset");

            foreach (T data in dataset)
            {
                Verify.ArgumentCondition(data != null, "dataset", "The dataset may not contain null values");

                if (!data.TryValidateDeleteSuccess())
                {
                    return false;
                }
            }

            return true;
        }

        #endregion



        #region Delete methods

        // Overload
        /// <exclude />
        public static void Delete<T>(T data)
            where T : class, IData
        {
            Verify.ArgumentNotNull(data, "data");

            Delete<T>(new T[] { data }, false, CascadeDeleteType.Allow, true);
        }



        // Overload
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"></param>
        /// <param name="referencesFromAllScopes">
        /// If this is true then cascade delete is performed on all data scopes.
        /// If this is false then cascade delete is only performed in the same scope as <paramref name="data"/>
        /// </param>
        public static void Delete<T>(T data, bool referencesFromAllScopes)
            where T : class, IData
        {
            Verify.ArgumentNotNull(data, "data");

            Delete<T>(new T[] { data }, false, CascadeDeleteType.Allow, referencesFromAllScopes);
        }



        // Overload
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="datas"></param>
        /// <param name="suppressEventing"></param>
        /// <param name="referencesFromAllScopes">
        /// If this is true then cascade delete is performed on all data scopes.
        /// If this is false then cascade delete is only performed in the same scope as <paramref name="datas"/>
        /// </param>
        public static void Delete<T>(IEnumerable<T> datas, bool suppressEventing, bool referencesFromAllScopes)
            where T : class, IData
        {
            if (datas == null) throw new ArgumentNullException("datas");

            Delete<T>(datas, suppressEventing, CascadeDeleteType.Allow, referencesFromAllScopes);
        }



        // Overload
        /// <exclude />
        public static void Delete<T>(IEnumerable<T> datas)
            where T : class, IData
        {
            if (datas == null) throw new ArgumentNullException("datas");

            Delete<T>(datas, false, CascadeDeleteType.Allow, true);
        }



        // Overload
        /// <summary>
        /// Deletes the given datas. WARNING: Setting <paramref name="cascadeDeleteType"/> 
        /// to 'Disable' can cause serious foreign key corruption.
        /// </summary>
        /// <param name="datas"></param>
        /// <param name="suppressEventing"></param>
        /// <param name="cascadeDeleteType"></param>
        public static void Delete<T>(IEnumerable<T> datas, bool suppressEventing, CascadeDeleteType cascadeDeleteType)
            where T : class, IData
        {
            if (datas == null) throw new ArgumentNullException("datas");

            Delete<T>(datas, suppressEventing, cascadeDeleteType, true);
        }



        // Overload
        /// <summary>
        /// Deletes the given datas. WARNING: Setting <paramref name="cascadeDeleteType"/> 
        /// to 'Disable' can cause serious foreign key corruption.
        /// </summary>
        /// <param name="datas"></param>
        /// <param name="cascadeDeleteType"></param>
        public static void Delete<T>(IEnumerable<T> datas, CascadeDeleteType cascadeDeleteType)
            where T : class, IData
        {
            if (datas == null) throw new ArgumentNullException("datas");

            Delete<T>(datas, false, cascadeDeleteType, true);
        }



        // Overload
        /// <exclude />
        public static void Delete<T>(Expression<Func<T, bool>> predicate)
            where T : class, IData
        {
            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                IEnumerable<T> datasToDelete = DataFacade.GetData<T>(predicate, false);

                Delete<T>(datasToDelete, false, CascadeDeleteType.Allow, true);

                transactionScope.Complete();
            }
        }



        // Overload
        /// <exclude />
        public static void Delete(IEnumerable<IData> datas)
        {
            if (datas == null) throw new ArgumentNullException("datas");

            Delete<IData>(datas, false, CascadeDeleteType.Allow, true);
        }



        // Overload
        /// <summary>
        /// Deletes the given datas. WARNING: Setting <paramref name="cascadeDeleteType"/> 
        /// to 'Disable' can cause serious foreign key corruption.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="cascadeDeleteType"></param>
        public static void Delete(IData data, CascadeDeleteType cascadeDeleteType)
        {
            Verify.ArgumentNotNull(data, "data");

            Delete<IData>(new IData[] { data }, false, cascadeDeleteType, true);
        }



        // Overload
        /// <summary>
        /// Deletes the given datas. WARNING: Setting <paramref name="cascadeDeleteType"/> 
        /// to 'Disable' can cause serious foreign key corruption.
        /// </summary>
        /// <param name="datas"></param>
        /// <param name="suppressEventing"></param>
        /// <param name="cascadeDeleteType"></param>
        public static void Delete(IEnumerable<IData> datas, bool suppressEventing, CascadeDeleteType cascadeDeleteType)
        {
            if (datas == null) throw new ArgumentNullException("datas");

            Delete<IData>(datas, suppressEventing, cascadeDeleteType, true);
        }



        // Overload
        /// <summary>
        /// Deletes the given datas. WARNING: Setting <paramref name="cascadeDeleteType"/> 
        /// to 'Disable' can cause serious foreign key corruption.
        /// </summary>
        /// <param name="datas"></param>
        /// <param name="cascadeDeleteType"></param>
        public static void Delete(IEnumerable<IData> datas, CascadeDeleteType cascadeDeleteType)
        {
            if (datas == null) throw new ArgumentNullException("datas");

            Delete<IData>(datas, false, cascadeDeleteType, true);
        }



        // Overload
        /// <summary>
        /// Deletes the given datas. WARNING: Setting <paramref name="cascadeDeleteType"/> 
        /// to 'Disable' can cause serious foreign key corruption.
        /// </summary>
        /// <param name="data"></param>
        /// <param name="suppressEventing"></param>
        /// <param name="cascadeDeleteType"></param>
        public static void Delete<T>(T data, bool suppressEventing, CascadeDeleteType cascadeDeleteType)
          where T : class, IData
        {
            if (null == data) throw new ArgumentNullException("data");

            Delete<T>(new T[] { data }, suppressEventing, cascadeDeleteType, true);
        }



        private static void Delete<T>(IEnumerable<T> datas, bool suppressEventing, CascadeDeleteType cascadeDeleteType, bool referencesFromAllScopes)
            where T : class, IData
        {
            _dataFacade.Delete<T>(datas, suppressEventing, cascadeDeleteType, referencesFromAllScopes);
        }

        #endregion


        #region ValidatePath methods

        // Overload
        /// <exclude />
        public static bool ValidatePath<TFile>(TFile file, string providerName)
            where TFile : IFile
        {
            string errorMessage;

            return ValidatePath(file, providerName, out errorMessage);
        }


        /// <exclude />
        public static bool ValidatePath<TFile>(TFile file, string providerName, out string errorMessage) 
            where TFile : IFile
        {
            return _dataFacade.ValidatePath(file, providerName, out errorMessage);
        }

        #endregion


        #region GetDataProviderNames method (Only helpers)

        /// <exclude />
        public static IEnumerable<string> GetDataProviderNames()
        {
            return DataProviderRegistry.DataProviderNames;
        }



        /// <exclude />
        public static IEnumerable<string> GetDynamicDataProviderNames()
        {
            return DataProviderRegistry.DynamicDataProviderNames;
        }

        #endregion



        #region GetInterfaces methods (Only helpers)

        /// <exclude />
        public static List<Type> GetAllInterfaces()
        {
            return DataProviderRegistry.AllInterfaces.ToList();
        }



        /// <exclude />
        public static List<Type> GetAllInterfaces(UserType relevantToUserType)
        {
            return (from dataInterface in DataProviderRegistry.AllInterfaces
                    where dataInterface.GetCustomInterfaceAttributes<RelevantToUserTypeAttribute>().Any(a => (a.UserType & relevantToUserType) == relevantToUserType)
                    select dataInterface).ToList();
        }



        /// <exclude />
        public static List<Type> GetAllKnownInterfaces()
        {
            return DataProviderRegistry.AllKnownInterfaces.ToList();
        }



        /// <exclude />
        public static List<Type> GetAllKnownInterfaces(UserType relevantToUserType)
        {
            return (from dataInterface in DataProviderRegistry.AllKnownInterfaces
                    where dataInterface.GetCustomInterfaceAttributes<RelevantToUserTypeAttribute>().Any(a => (a.UserType & relevantToUserType) == relevantToUserType)
                    select dataInterface).ToList();
        }



        /// <exclude />
        public static List<Type> GetGeneratedInterfaces()
        {
            return DataProviderRegistry.GeneratedInterfaces.ToList();
        }

        #endregion



        #region DataTag methods (Only helpers)

        // Overload
        /// <exclude />
        public static void SetDataTag(IData data, string id, object value)
        {
            Verify.ArgumentNotNull(data, "data");
            if (string.IsNullOrEmpty(id)) throw new ArgumentNullException("id");

            SetDataTag(data.DataSourceId, id, value);
        }



        /// <exclude />
        public static void SetDataTag(DataSourceId dataSourceId, string id, object value)
        {
            if (dataSourceId == null) throw new ArgumentNullException("dataSourceId");
            if (string.IsNullOrEmpty(id)) throw new ArgumentNullException("id");

            dataSourceId.SetTag(id, value);
        }



        // Overload
        /// <exclude />
        public static bool TryGetDataTag<T>(IData data, string id, out T tag)
        {
            Verify.ArgumentNotNull(data, "data");
            if (string.IsNullOrEmpty(id)) throw new ArgumentNullException("id");

            return TryGetDataTag<T>(data.DataSourceId, id, out tag);
        }



        /// <exclude />
        public static bool TryGetDataTag<T>(DataSourceId dataSourceId, string id, out T tag)
        {
            if (dataSourceId == null) throw new ArgumentNullException("dataSourceId");
            if (string.IsNullOrEmpty(id)) throw new ArgumentNullException("id");

            object tagValue = null;
            bool result = dataSourceId.TryGetTag(id, out tagValue);

            if (result)
            {
                tag = (T)tagValue;
            }
            else
            {
                tag = default(T);
            }

            return result;
        }



        // Overload
        /// <exclude />
        public static T GetDataTag<T>(IData data, string id)
        {
            Verify.ArgumentNotNull(data, "data");
            if (string.IsNullOrEmpty(id)) throw new ArgumentNullException("id");

            return GetDataTag<T>(data.DataSourceId, id);
        }



        /// <exclude />
        public static T GetDataTag<T>(DataSourceId dataSourceId, string id)
        {
            if (dataSourceId == null) throw new ArgumentNullException("dataSourceId");
            if (string.IsNullOrEmpty(id)) throw new ArgumentNullException("id");

            object value;
            if (dataSourceId.TryGetTag(id, out value) == false)
            {
                throw new InvalidOperationException(string.Format("The tag '{0}' has not been set on the data source id", id));
            }

            return (T)value;
        }



        // Overload
        /// <exclude />
        public static void RemoveDataTag(IData data, string id)
        {
            Verify.ArgumentNotNull(data, "data");
            if (string.IsNullOrEmpty(id)) throw new ArgumentNullException("id");

            RemoveDataTag(data.DataSourceId, id);
        }



        /// <exclude />
        public static void RemoveDataTag(DataSourceId dataSourceId, string id)
        {
            if (dataSourceId == null) throw new ArgumentNullException("dataSourceId");
            if (string.IsNullOrEmpty(id)) throw new ArgumentNullException("id");

            dataSourceId.RemoveTag(id);
        }

        #endregion



        #region Mics methods (Only helpers)

        /// <exclude />
        internal static void ForEachDataScope(Type interfaceType, ThreadStart action) 
        {
            IEnumerable<DataScopeIdentifier> supportedDataScopes = interfaceType.GetSupportedDataScopes();

            CultureInfo[] cultures = DataLocalizationFacade.IsLocalized(interfaceType)
                                         ? DataLocalizationFacade.ActiveLocalizationCultures.ToArray()
                                         : new[] { DataLocalizationFacade.DefaultLocalizationCulture };

            foreach (DataScopeIdentifier dataScopeIdentifier in supportedDataScopes)
            {
                foreach (CultureInfo culture in cultures)
                {
                    using (new DataScope(dataScopeIdentifier, culture))
                    {
                        action();
                    }
                }
            }
        }

        /// <exclude />
        public static IEnumerable<DataScopeIdentifier> GetSupportedDataScopes(Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");

            IReadOnlyCollection<DataScopeIdentifier> supportedDataScope = interfaceType.GetSupportedDataScopes();

            if (supportedDataScope.Count == 0)
            {
                throw new InvalidOperationException(string.Format("The data type '{0}' does not support any data scopes, use the '{1}' attribute", interfaceType, typeof(DataScopeAttribute)));
            }

            return supportedDataScope;
        }



        /// <exclude />
        public static bool HasDataInAnyScope(Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");

            foreach (var dataScopeIdentifier in GetSupportedDataScopes(interfaceType))
            {
                using (new DataScope(dataScopeIdentifier))
                {
                    IData data = GetData(interfaceType).ToDataEnumerable().FirstOrDefault();

                    if (data != null)
                    {
                        return true;
                    }
                }
            }

            return false;
        }



        /// <exclude />
        public static bool ExistsInAnyLocale<T>(IEnumerable<CultureInfo> excludedCultureInfoes)
            where T : class, IData
        {
            return _dataFacade.ExistsInAnyLocale<T>(excludedCultureInfoes);
        }



        // Overload
        /// <exclude />
        public static bool ExistsInAnyLocale<T>(CultureInfo excludedCultureInfo)
            where T : class, IData
        {
            return ExistsInAnyLocale<T>(new CultureInfo[] { excludedCultureInfo });
        }



        // Overload
        /// <exclude />
        public static bool ExistsInAnyLocale<T>()
            where T : class, IData
        {
            return ExistsInAnyLocale<T>(Enumerable.Empty<CultureInfo>());
        }



        /// <exclude />
        public static bool ExistsInAnyLocale(Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");

            MethodInfo methodInfo = GetExistsInAnyLocaleMethodInfo(interfaceType);

            bool result = (bool)methodInfo.Invoke(null, null);

            return result;
        }



        // Overload
        /// <exclude />
        public static bool ExistsInAnyLocale(Type interfaceType, CultureInfo excludedCultureInfo)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");

            MethodInfo methodInfo = GetExistsInAnyLocaleWithParamMethodInfo(interfaceType);

            bool result = (bool)methodInfo.Invoke(null, new object[] { new CultureInfo[] { excludedCultureInfo } });

            return result;
        }

        #endregion



        #region GetXXXMethodInfo methods (Only helpers)

        /// <exclude />
        public static MethodInfo GetSetDataInterceptorMethodInfo(Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (typeof(IData).IsAssignableFrom(interfaceType) == false) throw new ArgumentException("The provided type must implement IData", "interfaceType");

            MethodInfo methodInfo;
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.GenericSetDataInterceptorMethodInfo.TryGetValue(interfaceType, out methodInfo) == false)
                {
                    MethodInfo nonGenericMethod = typeof(DataFacade).GetMethod(
                        nameof(SetDataInterceptor),
                        BindingFlags.Static | BindingFlags.Public,
                        null,
                        new Type[] { typeof(DataInterceptor) },
                        null);

                    methodInfo = nonGenericMethod.MakeGenericMethod(interfaceType);

                    _resourceLocker.Resources.GenericSetDataInterceptorMethodInfo.Add(interfaceType, methodInfo);
                }
            }

            return methodInfo;
        }



        /// <exclude />
        public static MethodInfo GetHasDataInterceptorMethodInfo(Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (!typeof(IData).IsAssignableFrom(interfaceType)) throw new ArgumentException("The provided type must implement IData", "interfaceType");

            MethodInfo methodInfo;
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.GenericHasDataInterceptorMethodInfo.TryGetValue(interfaceType, out methodInfo) == false)
                {
                    MethodInfo nonGenericMethod = typeof(DataFacade).GetMethod(
                        nameof(HasDataInterceptor),
                        BindingFlags.Static | BindingFlags.Public,
                        null,
                        new Type[] { },
                        null);

                    methodInfo = nonGenericMethod.MakeGenericMethod(interfaceType);

                    _resourceLocker.Resources.GenericHasDataInterceptorMethodInfo.Add(interfaceType, methodInfo);
                }
            }

            return methodInfo;
        }



        /// <exclude />
        public static MethodInfo GetClearDataInterceptorMethodInfo(Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (!typeof(IData).IsAssignableFrom(interfaceType)) throw new ArgumentException("The provided type must implement IData", "interfaceType");

            MethodInfo methodInfo;
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.GenericClearDataInterceptorMethodInfo.TryGetValue(interfaceType, out methodInfo) == false)
                {
                    MethodInfo nonGenericMethod = typeof(DataFacade).GetMethod(
                        nameof(ClearDataInterceptor),
                        BindingFlags.Static | BindingFlags.Public,
                        null,
                        new Type[] { },
                        null);

                    methodInfo = nonGenericMethod.MakeGenericMethod(interfaceType);

                    _resourceLocker.Resources.GenericClearDataInterceptorMethodInfo.Add(interfaceType, methodInfo);
                }
            }

            return methodInfo;
        }



        /// <exclude />
        public static MethodInfo GetGetDataMethodInfo(Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (!typeof(IData).IsAssignableFrom(interfaceType)) throw new ArgumentException("The provided type must implement IData", "interfaceType");

            MethodInfo methodInfo;
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.GenericGetDataFromTypeMethodInfo.TryGetValue(interfaceType, out methodInfo) == false)
                {
                    MethodInfo nonGenericMethod = typeof(DataFacade).GetMethod(
                        nameof(GetData),
                        BindingFlags.Static | BindingFlags.Public,
                        null,
                        new[] { typeof(bool), typeof(IEnumerable<string>) },
                        null);

                    methodInfo = nonGenericMethod.MakeGenericMethod(interfaceType);

                    _resourceLocker.Resources.GenericGetDataFromTypeMethodInfo.Add(interfaceType, methodInfo);
                }
            }

            return methodInfo;
        }



        /// <exclude />
        public static MethodInfo GetGetDataFromDataSourceIdMethodInfo(Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (!typeof(IData).IsAssignableFrom(interfaceType)) throw new ArgumentException("The provided type must implement IData", "interfaceType");

            MethodInfo methodInfo;
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.GenericGetDataFromDataSourceIdMethodInfo.TryGetValue(interfaceType, out methodInfo) == false)
                {
                    MethodInfo nonGenericMethod =
                        (from m in typeof(DataFacade).GetMethods(BindingFlags.Public | BindingFlags.Static)
                         where m.Name == nameof(GetDataFromDataSourceId) &&
                               m.IsGenericMethodDefinition &&
                               m.GetParameters().Length == 2
                         select m).Single();

                    methodInfo = nonGenericMethod.MakeGenericMethod(interfaceType);

                    _resourceLocker.Resources.GenericGetDataFromDataSourceIdMethodInfo.Add(interfaceType, methodInfo);
                }
            }

            return methodInfo;
        }



        /// <exclude />
        public static MethodInfo GetGetDataWithPredicatMethodInfo(Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (!typeof(IData).IsAssignableFrom(interfaceType)) throw new ArgumentException("The provided type must implement IData", "interfaceType");

            MethodInfo methodInfo;
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.GenericGetDataFromTypeWithPredicateMethodInfo.TryGetValue(interfaceType, out methodInfo) == false)
                {
                    MethodInfo genericMethod =
                        (from m in typeof(DataFacade).GetMethods(BindingFlags.Public | BindingFlags.Static)
                         where m.Name == nameof(GetData) &&
                               m.IsGenericMethodDefinition &&
                               m.GetParameters().Length == 1 &&
                               m.GetParameters()[0].ParameterType.IsGenericType &&
                               m.GetParameters()[0].ParameterType.GetGenericTypeDefinition() == typeof(Expression<>)
                         select m).Single();

                    methodInfo = genericMethod.MakeGenericMethod(interfaceType);

                    _resourceLocker.Resources.GenericGetDataFromTypeWithPredicateMethodInfo.Add(interfaceType, methodInfo);
                }
            }

            return methodInfo;
        }



        /// <exclude />
        public static MethodInfo GetAddNewMethodInfo(Type interfaceType)
        {
            Verify.ArgumentNotNull(interfaceType, "interfaceType");
            Verify.ArgumentCondition(typeof(IData).IsAssignableFrom(interfaceType), "interfaceType", "The provided type must implement IData");

            MethodInfo methodInfo;
            using (_resourceLocker.Locker)
            {
                if (!_resourceLocker.Resources.GenericAddNewFromTypeMethodInfo.TryGetValue(interfaceType, out methodInfo))
                {
                    MethodInfo genericMethodInfo = StaticReflection.GetGenericMethodInfo(data => AddNew((IData) null, true, true, true, true, null));

                    methodInfo = genericMethodInfo.MakeGenericMethod(interfaceType);

                    _resourceLocker.Resources.GenericAddNewFromTypeMethodInfo.Add(interfaceType, methodInfo);
                }
            }

            return methodInfo;
        }



        /// <exclude />
        public static MethodInfo GetExistsInAnyLocaleMethodInfo(Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (typeof(IData).IsAssignableFrom(interfaceType) == false) throw new ArgumentException("The provided type must implement IData", "interfaceType");

            MethodInfo methodInfo;
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.GenericExistsInAnyLocaleMethodInfo.TryGetValue(interfaceType, out methodInfo) == false)
                {
                    methodInfo =
                        (from method in typeof(DataFacade).GetMethods(BindingFlags.Static | BindingFlags.NonPublic)
                         where method.Name == nameof(ExistsInAnyLocale) &&
                               typeof(IEnumerable).IsAssignableFrom(method.GetParameters()[0].ParameterType) == false
                         select method).First();

                    methodInfo = methodInfo.MakeGenericMethod(interfaceType);

                    _resourceLocker.Resources.GenericExistsInAnyLocaleMethodInfo.Add(interfaceType, methodInfo);
                }
            }

            return methodInfo;
        }



        /// <exclude />
        public static MethodInfo GetExistsInAnyLocaleWithParamMethodInfo(Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (!typeof(IData).IsAssignableFrom(interfaceType)) throw new ArgumentException("The provided type must implement IData", "interfaceType");

            MethodInfo methodInfo;
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.GenericExistsInAnyLocaleWithParamMethodInfo.TryGetValue(interfaceType, out methodInfo) == false)
                {
                    methodInfo =
                        (from method in typeof(DataFacade).GetMethods(BindingFlags.Static | BindingFlags.Public)
                         where
                            method.Name == nameof(ExistsInAnyLocale) &&
                            method.GetParameters().Length == 1 &&
                            typeof(IEnumerable).IsAssignableFrom(method.GetParameters()[0].ParameterType)
                         select method).First();

                    methodInfo = methodInfo.MakeGenericMethod(interfaceType);

                    _resourceLocker.Resources.GenericExistsInAnyLocaleWithParamMethodInfo.Add(interfaceType, methodInfo);
                }
            }

            return methodInfo;
        }

        #endregion



        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }

        private static class EmptyPredicate<T> where T : class
        {
            public static readonly Expression<Func<T, bool>> Instance = f => true;
        }

        private sealed class Resources
        {
            public Dictionary<Type, MethodInfo> GenericSetDataInterceptorMethodInfo { get; set; }
            public Dictionary<Type, MethodInfo> GenericHasDataInterceptorMethodInfo { get; set; }
            public Dictionary<Type, MethodInfo> GenericClearDataInterceptorMethodInfo { get; set; }
            public Dictionary<Type, MethodInfo> GenericGetDataFromTypeMethodInfo { get; set; }
            public Dictionary<Type, MethodInfo> GenericGetDataFromDataSourceIdMethodInfo { get; set; }
            public Dictionary<Type, MethodInfo> GenericGetDataFromTypeWithPredicateMethodInfo { get; set; }
            public Dictionary<Type, MethodInfo> GenericAddNewFromTypeMethodInfo { get; set; }
            public Dictionary<Type, MethodInfo> GenericMoveFromTypeMethodInfo { get; set; }
            public Dictionary<Type, MethodInfo> GenericExistsInAnyLocaleMethodInfo { get; set; }
            public Dictionary<Type, MethodInfo> GenericExistsInAnyLocaleWithParamMethodInfo { get; set; }


            public static void DoInitializeResources(Resources resources)
            {
                resources.GenericSetDataInterceptorMethodInfo = new Dictionary<Type, MethodInfo>();
                resources.GenericHasDataInterceptorMethodInfo = new Dictionary<Type, MethodInfo>();
                resources.GenericClearDataInterceptorMethodInfo = new Dictionary<Type, MethodInfo>();
                resources.GenericGetDataFromTypeMethodInfo = new Dictionary<Type, MethodInfo>();
                resources.GenericGetDataFromDataSourceIdMethodInfo = new Dictionary<Type, MethodInfo>();
                resources.GenericGetDataFromTypeWithPredicateMethodInfo = new Dictionary<Type, MethodInfo>();
                resources.GenericAddNewFromTypeMethodInfo = new Dictionary<Type, MethodInfo>();
                resources.GenericMoveFromTypeMethodInfo = new Dictionary<Type, MethodInfo>();
                resources.GenericExistsInAnyLocaleMethodInfo = new Dictionary<Type, MethodInfo>();
                resources.GenericExistsInAnyLocaleWithParamMethodInfo = new Dictionary<Type, MethodInfo>();
            }
        }
    }
}
