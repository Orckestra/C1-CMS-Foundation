using System;
using System.Data;
using System.ComponentModel;
using System.Linq;
using Composite.Data.DynamicTypes;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Sql
{
    internal static class SqlColumnInformationExtensions
    {
        public static SqlColumnInformation CreateSqlColumnInformation(this DataTypeDescriptor dataTypeDescriptor, string fieldName)
        {
            DataFieldDescriptor dataFieldDescriptor = dataTypeDescriptor.Fields[fieldName];

            return new SqlColumnInformation(
                dataFieldDescriptor.Name,
                dataTypeDescriptor.PhysicalKeyPropertyNames.Contains(dataFieldDescriptor.Name),
                false,
                false,
                dataFieldDescriptor.IsNullable,
                dataFieldDescriptor.InstanceType,
                DynamicTypesCommon.GetStoreTypeToSqlDataTypeMapping(dataFieldDescriptor.StoreType)
            );
       }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    public sealed class SqlColumnInformation
    {
        private readonly string _columnName;
        private readonly string _trimmedColumnName;
        private readonly bool _isPrimaryKey;
        private readonly bool _isIdentity;
        private readonly bool _isComputed;
        private readonly bool _isNullable;
        private readonly Type _type;
        private readonly SqlDbType _sqlDbType;

        private int? _hashCode;

        internal SqlColumnInformation(
            string columnName,
            bool isPrimaryKey,
            bool isIdentity,
            bool isComputed,
            bool isNullable,
            Type type,
            SqlDbType sqlDbType)
        {
            _columnName = columnName;
            _trimmedColumnName = _columnName.Replace(" ", "");
            _isPrimaryKey = isPrimaryKey;
            _isIdentity = isIdentity;
            _isComputed = isComputed;
            _isNullable = isNullable;
            _type = type;
            _sqlDbType = sqlDbType;
        }        


        /// <exclude />
        public string ColumnName => _columnName;


        /// <exclude />
        public string TrimmedColumnName => _trimmedColumnName;


        /// <exclude />
        public bool IsPrimaryKey => _isPrimaryKey;


        /// <exclude />
        public bool IsIdentity => _isIdentity;


        /// <exclude />
        public bool IsComputed => _isComputed;


        /// <exclude />
        public bool IsNullable => _isNullable;


        /// <exclude />
        public Type Type => _type;


        /// <exclude />
        public SqlDbType SqlDbType => _sqlDbType;


        /// <exclude />
        public override int GetHashCode()
        {
            if (!_hashCode.HasValue)
            {
                _hashCode = _columnName.GetHashCode() ^
                           _trimmedColumnName.GetHashCode() ^
                           _isPrimaryKey.GetHashCode() ^
                           _isIdentity.GetHashCode() ^
                           _isComputed.GetHashCode() ^
                           _isNullable.GetHashCode() ^
                           _type.GetHashCode() ^
                           _sqlDbType.GetHashCode();
            }

            return _hashCode.Value;
        }
    }
}
