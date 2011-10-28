using System.Collections.Generic;

using Composite.Core.Linq;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Sql
{
    internal sealed class SqlTableInformation : ISqlTableInformation
    {
        private string _tableName;
        private bool _hasIdentityColumn;
        private string _identityColumnName;

        private Dictionary<string, SqlColumnInformation> _columns = new Dictionary<string, SqlColumnInformation>();
        private int? _hashCode = null;

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
            if (true == columnInformation.IsIdentity)
            {
                _hasIdentityColumn = true;
                _identityColumnName = columnInformation.ColumnName;
            }

            _columns.Add(columnInformation.ColumnName, columnInformation);

            _hashCode = null;
        }


        public override int GetHashCode()
        {
            if (false == _hashCode.HasValue)
            {
                if (true == _hasIdentityColumn)
                {
                    _hashCode = _tableName.GetHashCode() ^
                                _hasIdentityColumn.GetHashCode() ^
                                _identityColumnName.GetHashCode() ^
                                _columns.GetContentHashCode();
                }
                else
                {
                    _hashCode = _tableName.GetHashCode() ^
                                _hasIdentityColumn.GetHashCode() ^
                                _columns.GetContentHashCode();
                }
            }

            return _hashCode.Value;
        }
    }
}
