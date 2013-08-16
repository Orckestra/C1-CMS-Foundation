using System;
using System.Data.Linq;
using System.Reflection;
using Composite.Core.Collections.Generic;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration
{
    /// <summary>    
    /// Provides an api to work with generated tables of a DataContext object.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class SqlDataContextHelperClass
    {
        readonly DataContext _dataContext;

        private readonly Hashtable<string, ITable> _tables = new Hashtable<string, ITable>();
        private readonly object _syncRoot = new object();


        /// <exclude />
        public SqlDataContextHelperClass(DataContext dataContext)
        {
            _dataContext = dataContext;
        }


        /// <exclude />
        public void Add(object entity, string tableName)
        {
            EnsureTableInitialized(tableName);

            _tables[tableName].InsertOnSubmit(entity);
        }


        /// <exclude />
        public void Remove(object entity, string tableName)
        {
            EnsureTableInitialized(tableName);

            ITable table = _tables[tableName]; 

            table.Attach(entity);
            table.DeleteOnSubmit(entity);
        }


        private void EnsureTableInitialized(string tableName)
        {
            if(_tables.ContainsKey(tableName))
            {
                return;
            }

            lock(_syncRoot)
            {
                if (_tables.ContainsKey(tableName))
                {
                    return;
                }

                Type dataContextType = _dataContext.GetType();

                FieldInfo fi = dataContextType.GetField(tableName);
                Verify.IsNotNull(fi, "DataContext class should have a field with name '{0}'", tableName);

                Type entityType = fi.FieldType;

                // Operation takes 3 ms every request :(
                ITable table = _dataContext.GetTable(entityType);

                _tables.Add(tableName, table);
            }
        }


        /// <exclude />
        internal static ITable GetTable(DataContext _dataContext, SqlDataTypeStoreTable storeInformation)
        {
            FieldInfo fi = storeInformation.DataContextQueryableFieldInfo;
            Verify.IsNotNull(fi, "Missing FieldInfo for a DataContext field.");

            object value = fi.GetValue(_dataContext);
            if(value == null)
            {
                var helperClassFieldInfo =_dataContext.GetType().GetField("_sqlDataContextHelperClass", BindingFlags.NonPublic | BindingFlags.Instance);
                Verify.IsNotNull(helperClassFieldInfo, "Helper field isn't exist in DataContext object.");

                var helper = helperClassFieldInfo.GetValue(_dataContext) as SqlDataContextHelperClass;
                Verify.That(helper != null, "Helper object has not been set");

                helper.EnsureTableInitialized(fi.Name);

                value = helper._tables[fi.Name];
            }
            return Verify.ResultNotNull(value as ITable);
        }
    }
}
