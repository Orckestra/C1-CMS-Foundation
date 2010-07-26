using System;
using System.Data;


namespace Composite.Sql
{
    internal sealed class SqlColumnInformation
    {
        private static readonly char[] _trimChars = new char[] { ' ' };

        private string _columnName;
        private string _trimmedColumnName;
        private bool _isPrimaryKey;
        private bool _isIdentity;
        private bool _isComputed;
        private bool _isNullable;
        private Type _type;
        private SqlDbType _sqlDbType;

        private int? _hasCode = null;

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

            _trimmedColumnName = _columnName;
            foreach (char c in _trimChars)
            {
                while (true)
                {
                    int idx = _trimmedColumnName.IndexOf(c);
                    if ( -1 != idx)
                    {
                        _trimmedColumnName = _trimmedColumnName.Remove(idx, 1);
                    }
                    else
                    {
                        break;
                    }
                }
            }
            
            _isPrimaryKey = isPrimaryKey;
            _isIdentity = isIdentity;
            _isComputed = isComputed;
            _isNullable = isNullable;
            _type = type;
            _sqlDbType = sqlDbType;
        }

        public string ColumnName
        {
            get { return _columnName; }
        }

        public string TrimmedColumnName
        {
            get { return _trimmedColumnName; }
        }

        public bool IsPrimaryKey
        {
            get { return _isPrimaryKey; }
        }
        
        public bool IsIdentity
        {
            get { return _isIdentity; }
        }

        public bool IsComputed
        {
            get { return _isComputed; }
        }

        public bool IsNullable
        {
            get { return _isNullable; }
        }

        public Type Type
        {
            get { return _type; }   
        }
        
        public SqlDbType SqlDbType
        {
            get { return _sqlDbType; }
        }


        public override int GetHashCode()
        {
            if (false == _hasCode.HasValue)
            {
                _hasCode = _columnName.GetHashCode() ^
                           _trimmedColumnName.GetHashCode() ^
                           _isPrimaryKey.GetHashCode() ^
                           _isIdentity.GetHashCode() ^
                           _isComputed.GetHashCode() ^
                           _isNullable.GetHashCode() ^
                           _type.GetHashCode() ^
                           _sqlDbType.GetHashCode();
            }

            return _hasCode.Value;
        }
    }
}
