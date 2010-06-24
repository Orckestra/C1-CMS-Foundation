using System.Collections.Generic;

namespace Composite.Sql
{
    public interface ISqlTableInformation
    {
        string TableName { get; }
        bool HasIdentityColumn { get; }
        string IdentityColumnName { get; }
        SqlColumnInformation this[string columnName] { get; }
        IEnumerable<SqlColumnInformation> ColumnInformations { get; }
    }
}