using System;
using System.ComponentModel;
using System.Reflection;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    internal sealed class SqlDataTypeStoreTable
    {
        public SqlDataTypeStoreTable(
            Guid dataTypeId,
            FieldInfo dataContextQueryableFieldInfo, ISqlDataProviderHelper sqlDataProviderHelper,
            string dataContextFieldName, Type dataContextFieldType)
        {
            DataTypeId = dataTypeId;
            DataContextQueryableFieldInfo = dataContextQueryableFieldInfo;
            SqlDataProviderHelper = sqlDataProviderHelper;
            DataContextFieldName = dataContextFieldName;
            DataContextFieldType = dataContextFieldType;
        }

        public Guid DataTypeId { get; set; }

        public FieldInfo DataContextQueryableFieldInfo { get; set; }

        public ISqlDataProviderHelper SqlDataProviderHelper { get; set; }

        public string DataContextFieldName { get; set; }

        public Type DataContextFieldType { get; set; }
    }
}
