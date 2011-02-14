using System;
using System.Data;


namespace Composite.Sql
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class SqlColumnInformation
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


        /// <exclude />
        public string ColumnName
        {
            get { return _columnName; }
        }


        /// <exclude />
        public string TrimmedColumnName
        {
            get { return _trimmedColumnName; }
        }


        /// <exclude />
        public bool IsPrimaryKey
        {
            get { return _isPrimaryKey; }
        }


        /// <exclude />
        public bool IsIdentity
        {
            get { return _isIdentity; }
        }


        /// <exclude />
        public bool IsComputed
        {
            get { return _isComputed; }
        }


        /// <exclude />
        public bool IsNullable
        {
            get { return _isNullable; }
        }


        /// <exclude />
        public Type Type
        {
            get { return _type; }   
        }


        /// <exclude />
        public SqlDbType SqlDbType
        {
            get { return _sqlDbType; }
        }


        /// <exclude />
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
