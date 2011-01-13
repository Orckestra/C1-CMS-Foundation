using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data;
using System.Data.Linq;
using System.Data.SqlTypes;
using System.Linq;
using System.Reflection;
using System.Text;
using Composite.Core.Extensions;
using Composite.Core.Logging;
using Composite.Core.Sql;
using Composite.Core.Threading;
using Composite.Data;
using Composite.Data.Plugins.DataProvider;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration.Foundation;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration
{
    internal sealed class SqlDataProviderCodeGeneratorResult
    {
        private readonly Dictionary<Type, SqlDataProviderCodeGeneratorTableResult> _tableResults = new Dictionary<Type, SqlDataProviderCodeGeneratorTableResult>();
        private readonly List<KeyValuePair<Type, List<string>>> _tableErrors = new List<KeyValuePair<Type, List<string>>>();

        private static readonly ConcurrentDictionary<Type, List<PropertyInfo>> _dateTimeProperties = new ConcurrentDictionary<Type, List<PropertyInfo>>();
        private static readonly object[] EmptyObjectsArray = new object[0];

        private readonly string _providerName;
        private readonly string _connectionString;
        private readonly SqlLoggingContext _sqlLoggingContext;

        internal SqlDataProviderCodeGeneratorResult(string providerName, string connectionString, SqlLoggingContext sqlLoggingContext = null)
        {
            _providerName = providerName;
            _connectionString = connectionString;
            _sqlLoggingContext = sqlLoggingContext;
        }


        public IEnumerable<Type> ConfiguredInterfaceTypes { get; internal set; }

        public IEnumerable<Type> AllInterfaceTypes
        {
            get
            {
                IEnumerable<Type> errorTypes =
                    (from error in _tableErrors
                     select error.Key).Distinct();

                return _tableResults.Keys.Concat(errorTypes).Distinct(); 
            }
        }


        public string ConnectionString { get; internal set; }

        private static ITable GetTable(DataContext dataContext, Object entity)
        {
            Verify.ArgumentNotNull(dataContext, "dataContext");
            Verify.ArgumentNotNull(entity, "entity");

            Type entityType = entity.GetType();

            ITable table = dataContext.GetTable(entityType);
            Verify.IsNotNull(table, "Failed to find a table, related to '{0}' type".FormatWith(entityType.FullName));
            return table;
        }

        public void Update(IEnumerable<IData> dataset)
        {
            using (DataContext dataContext = CreateDataContext())
            {
                foreach (IData data in dataset)
                {
                    Verify.ArgumentCondition(data != null, "dataset", "The data set shouldn't contain any null values.");

                    // TODO: Check if it's necessury to make an optimization here
                    ITable table = GetTable(dataContext, data);                    
                    table.Attach(data);

                    IEntity entity = (IEntity)data;
                    entity.Commit();
                }

                SubmitChanges(dataContext);
            }
        }



        public List<T> AddNew<T>(IEnumerable<T> dataset, DataProviderContext dataProviderContext) 
            where T : class, IData
        {
            SqlDataProviderCodeGeneratorTableResult tableResult = TryGetTableResult(typeof(T));
            if (tableResult == null)
            {
                StringBuilder sb = new StringBuilder();
                sb.AppendLine(string.Format("The interface type '{0}' was not configured correctly with the following errors:", typeof(T)));

                foreach (KeyValuePair<Type, List<string>> kvp in _tableErrors)
                {
                    if (kvp.Key == typeof(T))
                    {
                        foreach (string error in kvp.Value)
                        {
                            sb.AppendLine(error);
                        }
                    }
                }

                throw new InvalidOperationException(sb.ToString());
            }


            var resultDataset = new List<T>();

            using(var dataContext = CreateDataContext())
            {
                foreach (IData data in dataset)
                {
                    Verify.ArgumentCondition(data != null, "dataset", "Data set may not contain nulls");

                    IData newData = tableResult.AddNew(data, dataProviderContext, dataContext);

                    (newData as IEntity).Commit(); 

                    CheckConstraints(newData);

                    resultDataset.Add((T)newData);
                }

                SubmitChanges(dataContext);
            }

            return resultDataset;
        }



        private static void CheckConstraints(IData data)
        {
            // DateTime.MinValue is not supported by SQL, since it has a different minimal value for a date
            if (data is IChangeHistory)
            {
                var changeHistory = (IChangeHistory)data;
                if (changeHistory.ChangeDate == DateTime.MinValue)
                {
                    changeHistory.ChangeDate = DateTime.Now;
                }
            }

            foreach(PropertyInfo dateTimeProperty in GetDateTimeProperties(data.DataSourceId.InterfaceType))
            {
                object value = dateTimeProperty.GetValue(data, EmptyObjectsArray);
                if(value == null) continue;

                DateTime dateTime = (DateTime) value;
                if(dateTime == DateTime.MinValue)
                {
                    dateTimeProperty.SetValue(data, SqlDateTime.MinValue.Value, EmptyObjectsArray);
                }
            }
        }

        private static IEnumerable<PropertyInfo> GetDateTimeProperties(Type interfaceType)
        {
            return 
                _dateTimeProperties.GetOrAdd(interfaceType, type =>
                {
                    List<PropertyInfo> result = new List<PropertyInfo>();

                    foreach (PropertyInfo property in interfaceType.GetProperties())
                    {
                        if ((property.PropertyType != typeof(DateTime) && property.PropertyType != typeof(DateTime?))
                            || property.GetSetMethod() == null)
                        {
                            continue;
                        }

                        result.Add(property);
                    }

                    foreach(Type baseInterface in interfaceType.GetInterfaces())
                    {
                        if (baseInterface == typeof(IChangeHistory)) continue;
                        

                        result.AddRange(GetDateTimeProperties(baseInterface));
                    }

                    return result;
                });
        }

        public void Delete(IEnumerable<DataSourceId> dataSourceIds, DataProviderContext dataProivderContext)
        {
            DataContext dataContext = null;
            try
            {

                foreach (DataSourceId dataSourceId in dataSourceIds)
                {
                    if (dataSourceId == null) throw new ArgumentException("dataSourceIds contains nulls");

                    using (new DataScope(dataSourceId.DataScopeIdentifier, dataSourceId.LocaleScope))
                    {
                        SqlDataProviderCodeGeneratorTableResult tableResult =
                            TryGetTableResult(dataSourceId.InterfaceType);
                        if (tableResult == null)
                        {
                            StringBuilder sb = new StringBuilder();
                            sb.AppendLine(
                                string.Format(
                                    "The table of the interface type '{0}' from where the data id '{1}' originates has not been configured correctly with the following errors:",
                                    dataSourceId.InterfaceType, dataSourceId.GetType()));

                            foreach (KeyValuePair<Type, List<string>> kvp in _tableErrors)
                            {
                                if (kvp.Key == dataSourceId.InterfaceType)
                                {
                                    foreach (string error in kvp.Value)
                                    {
                                        sb.AppendLine(error);
                                    }
                                }
                            }

                            throw new InvalidOperationException(sb.ToString());
                        }


                        if (tableResult.DataIdType != dataSourceId.DataId.GetType())
                        {
                            throw new ArgumentException(
                                "Only data ids from this provider is allowed to be deleted on on the provider");
                        }

                        IData data = tableResult.GetDataByDataId(dataSourceId.DataId, dataProivderContext);

                        Verify.That(data != null, "Row has already been deleted");

                        if (dataContext == null) dataContext = CreateDataContext();

                        tableResult.RemoveData(data, dataContext);
                    }
                }

                if (dataContext != null)
                {
                    SubmitChanges(dataContext);
                }
            }
            finally
            {
                if(dataContext != null)
                {
                    dataContext.Dispose();
                }
            }
        }



        public IEnumerable<SqlDataProviderCodeGeneratorTableResult> TableResults
        {
            get
            {
                return _tableResults.Values;
            }
        }



        public SqlDataProviderCodeGeneratorTableResult TryGetTableResult(Type interfaceType)
        {
            Verify.ArgumentNotNull(interfaceType, "interfaceType");

            SqlDataProviderCodeGeneratorTableResult result;
            return _tableResults.TryGetValue(interfaceType, out result) ? result : null;
        }


        public List<string> GetErrors(Type interfaceType)
        {
            List<string> errors = null;

            foreach (KeyValuePair<Type, List<string>> kvp in _tableErrors)
            {
                if (kvp.Key == interfaceType)
                {
                    if (errors == null)
                    {
                        errors = new List<string>();
                    }

                    errors.AddRange(kvp.Value);
                }
            }

            return errors;
        }



        internal void AddTableResult(Type interfaceType, SqlDataProviderCodeGeneratorTableResult tableResult)
        {
            _tableResults.Add(interfaceType, tableResult);
        }



        internal void AddTableError(Type interfaceType, List<string> errors)
        {
            List<string> errorList = null;
            foreach (KeyValuePair<Type, List<string>> kvp in _tableErrors)
            {
                if (kvp.Key == interfaceType)
                {
                    errorList = kvp.Value;
                }
            }

            if (errorList == null)
            {
                _tableErrors.Add(new KeyValuePair<Type, List<string>>(interfaceType, errors));
            }
            else
            {
                errorList.AddRange(errors);
            }
        }



        internal Type DataContextType { get; set; }


        /// <summary>
        /// Gets an instance of a DataContext.
        /// </summary>
        /// <returns></returns>
        internal DataContext GetDataContext()
        {
            string threadDataKey = "SqlDataContext" + _providerName;

            var threadData = ThreadDataManager.GetCurrentNotNull();
            if (threadData.HasValue(threadDataKey))
            {
                DataContext result = Verify.ResultNotNull(threadData[threadDataKey] as DataContext);

                // In a result of a flush, data context type can be changed
               if(result.GetType().GUID == DataContextType.GUID)
               {
                   return result;
               }
            }

            DataContext dataContext = CreateDataContext();
            dataContext.ObjectTrackingEnabled = false;

            threadData.OnDispose += dataContext.Dispose;
        
            threadData.SetValue(threadDataKey, dataContext);

            if (_sqlLoggingContext.Enabled == true)
            {
                dataContext.Log = new SqlLoggerTextWriter(_sqlLoggingContext);
            }
            
            return dataContext;
        }



        private DataContext CreateDataContext()
        {
            IDbConnection connection = SqlConnectionManager.GetConnection(_connectionString);

            DataContext dataContext = (DataContext)Activator.CreateInstance(DataContextType, connection);

            if (_sqlLoggingContext.Enabled == true)
            {
                dataContext.Log = new SqlLoggerTextWriter(_sqlLoggingContext);
            }

            return dataContext;
        }



        internal static void SubmitChanges(DataContext dataContext)
        {
            try
            {
                dataContext.SubmitChanges();
            }
            catch (Exception ex)
            {
                LoggingService.LogWarning("SqlDataProviderCodeGeneratorResult", ex);

                throw;
            }
        }        
    }
}
