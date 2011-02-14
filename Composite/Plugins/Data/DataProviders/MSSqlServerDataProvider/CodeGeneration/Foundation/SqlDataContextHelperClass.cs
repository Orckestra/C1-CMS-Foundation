using System;
using System.Data.Linq;
using System.Reflection;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Core.Types;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration.Foundation
{
    /// <summary>    
    /// Provides an api to work with generated tables of a DataContext object.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class SqlDataContextHelperClass
    {
        readonly DataContext _dataContext;

        private readonly Hashtable<string, Type> _typeResolvingTable = new Hashtable<string, Type>();
        private readonly Hashtable<string, ITable> _tables = new Hashtable<string, ITable>();
        private readonly object _syncRoot = new object();

        private static readonly object _typeResolvingSyncRoot = new object();


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
                Verify.IsNotNull(fi, "DataContext class should have a field with name '{0}'".FormatWith(fi));

                Type entityType = fi.FieldType;

                // Operation takes 3 ms every request :(
                ITable table = _dataContext.GetTable(entityType);

                _tables.Add(tableName, table);
            }
        }


        /// <exclude />
        public static ITable GetTable(DataContext _dataContext, SqlDataProviderCodeGeneratorTableResult.StoreInformation storeInformation)
        {
            FieldInfo fi = storeInformation.DataContextQueryableFieldInfo;
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

        /// <summary>
        /// Searches a type by the type name in all loaded auto-generated asseblies.
        /// </summary>
        /// <param name="typeName">The type's name.</param>
        /// <returns>The last version of type.</returns>
        private Type ResolveType(string typeName)
        {
            Type resolvedType;

            if(_typeResolvingTable.TryGetValue(typeName, out resolvedType))
            {
                return resolvedType;
            }

            lock(_typeResolvingSyncRoot)
            {
                if(_typeResolvingTable.TryGetValue(typeName, out resolvedType))
                {
                    return resolvedType;
                }

                Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();

                // Assemblies are checked in back order, so the newly created will be checked firstly
                for(int i=assemblies.Length-1; i>=0; i--)
                {
                    var assebmly = assemblies[i];

                    if(assebmly.GetCustomAttributes(typeof(BuildManagerCompileUnitAssemblyAttribute), true).Length == 0)
                    {
                        continue;
                    }

                    Type type = assebmly.GetType(typeName, false, false);
                    if (type == null) continue;

                    _typeResolvingTable.Add(typeName, type);
                    return type;
                }

            }
            throw new InvalidOperationException("Type '{0}' has not been found".FormatWith(typeName));
        }
    }
}
