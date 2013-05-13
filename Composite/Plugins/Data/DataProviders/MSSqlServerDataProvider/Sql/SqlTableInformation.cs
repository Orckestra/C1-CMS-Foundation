using System.Collections.Generic;

using Composite.Core.Linq;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Sql
{
    internal sealed class SqlTableInformation : ISqlTableInformation
    {
        private readonly string _tableName;
        private bool _hasIdentityColumn;
        private string _identityColumnName;

        private readonly Dictionary<string, SqlColumnInformation> _columns = new Dictionary<string, SqlColumnInformation>();
        private int? _hashCode;

        internal SqlTableInformation(string tableName)
        {
            _tableName = tableName;
        }


        public string TableName
        {
            get { return _tableName; }
        }


        public bool HasIdentityColumn
        {
            get { return _hasIdentityColumn; }
        }


        public string IdentityColumnName
        {
            get { return _identityColumnName; }
        }


        public SqlColumnInformation this[string columnName]
        {
            get
            {
                return _columns[columnName];
            }
        }


        public IEnumerable<SqlColumnInformation> ColumnInformations
        {
            get
            {
                foreach(SqlColumnInformation column in _columns.Values)
                {
                    yield return column;
                }
            }
        }


        internal void AddColumnInformation(SqlColumnInformation columnInformation)
        {
            if (columnInformation.IsIdentity)
            {
                _hasIdentityColumn = true;
                _identityColumnName = columnInformation.ColumnName;
            }

            _columns.Add(columnInformation.ColumnName, columnInformation);

            _hashCode = null;
        }


        public override int GetHashCode()
        {
            if (!_hashCode.HasValue)
            {
                int calculatedHashCode =_tableName.GetHashCode() ^
                                        _hasIdentityColumn.GetHashCode() ^
                                        _columns.GetContentHashCode();

                if (_hasIdentityColumn)
                {
                    calculatedHashCode  ^= _identityColumnName.GetHashCode();
                }

                _hashCode = calculatedHashCode;
            }

            return _hashCode.Value;
        }
    }
}
