using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Reflection;
using Composite.Data;
using Composite.Data.Plugins.DataProvider;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration.Foundation;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration;
using System.ComponentModel;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider
{
#warning MRJ: BM: Move this class
    internal class SqlDataTypeStoreTableKey : Tuple<string, string>
    {
        public SqlDataTypeStoreTableKey(string dataScopeIdentifierName, string localeCultureName)
            :base(dataScopeIdentifierName, localeCultureName)
        {
            
        }


        public string DataScopeIdentifierName
        {
            get
            {
                return Item1;
            }
        }


        public string LocaleCultureName
        {
            get
            {
                return Item2;
            }
        }
    }



#warning MRJ: BM: Move this class
    internal sealed class SqlDataTypeStoreTable
    {
        public SqlDataTypeStoreTable(FieldInfo dataContextQueryableFieldInfo, ISqlDataProviderHelper sqlDataProviderHelper)
        {
            DataContextQueryableFieldInfo = dataContextQueryableFieldInfo;
            SqlDataProviderHelper = sqlDataProviderHelper;
        }

        public FieldInfo DataContextQueryableFieldInfo { get; set; }

        public ISqlDataProviderHelper SqlDataProviderHelper { get; set; }
    }



    internal sealed class SqlDataTypeStore
    {
        private readonly SqlDataTypeStoresContainer _sqlDataTypeStoresContainer;
        private Type _listOfInterfaceType = null;


        internal SqlDataTypeStore(Type interfaceType, Dictionary<SqlDataTypeStoreTableKey, SqlDataTypeStoreTable> sqlDataTypeStoreTables, bool isGeneretedDataType, SqlDataTypeStoresContainer sqlDataTypeStoresContainer)
        {
            _sqlDataTypeStoresContainer = sqlDataTypeStoresContainer;

            InterfaceType = interfaceType;
            StoreTables = sqlDataTypeStoreTables;
            IsGeneretedDataType = isGeneretedDataType;
        }

                
        public Type InterfaceType { get; private set; }


        public bool IsGeneretedDataType { get; private set; }

        
        internal Dictionary<SqlDataTypeStoreTableKey, SqlDataTypeStoreTable> StoreTables { get; private set; }

        
        public IQueryable GetQueryable()
        {
            SqlDataTypeStoreTableKey tableKey = GetTableKey();
                

            IQueryable queryable;
            if (StoreTables.ContainsKey(tableKey))
            {
                queryable = SqlDataContextHelperClass.GetTable(_sqlDataTypeStoresContainer.GetDataContext(), StoreTables[tableKey]);
            }
            else
            {
                if (_listOfInterfaceType == null)
                {
                    _listOfInterfaceType = typeof(List<>);
                    _listOfInterfaceType = _listOfInterfaceType.MakeGenericType(InterfaceType);
                }

                IEnumerable list = (IEnumerable)Activator.CreateInstance(_listOfInterfaceType, null);

                return list.AsQueryable();
            }


            return queryable;
        }


       
        public IData GetDataByDataId(IDataId dataId, DataProviderContext dataProivderContext)
        {
            SqlDataTypeStoreTable storage = GetCurrentTable();

            return storage.SqlDataProviderHelper.GetDataById(GetQueryable(), dataId, dataProivderContext);
        }


        
        public IData AddNew(IData dataToAdd, DataProviderContext dataProivderContext, DataContext dataContext)
        {
            SqlDataTypeStoreTable storeTable = GetCurrentTable();

            return storeTable.SqlDataProviderHelper.AddData((ISqlDataContext)dataContext, dataToAdd, dataProivderContext);
        }



        public void RemoveData(IData dataToRemove, DataContext dataContext)
        {
            SqlDataTypeStoreTable storeTable = GetCurrentTable();

            storeTable.SqlDataProviderHelper.RemoveData((ISqlDataContext)dataContext, dataToRemove);
        }



        private SqlDataTypeStoreTableKey GetTableKey()
        {
            string dataScope = DataScopeManager.MapByType(InterfaceType).Name;
            string cultureInfo = LocalizationScopeManager.MapByType(InterfaceType).Name;

            return new SqlDataTypeStoreTableKey(dataScope, cultureInfo);
        }



        private SqlDataTypeStoreTable GetCurrentTable()
        {
            SqlDataTypeStoreTableKey tableKey = GetTableKey();

            if (StoreTables.ContainsKey(tableKey) == false) throw new InvalidOperationException(string.Format("No SQL table defined for the interface type '{0}' in the data scope '{1}' and locale '{2}'", InterfaceType.FullName, tableKey.DataScopeIdentifierName, tableKey.LocaleCultureName));

            return StoreTables[tableKey];
        }
    }
}
