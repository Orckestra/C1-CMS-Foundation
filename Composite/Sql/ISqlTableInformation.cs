using System.Collections.Generic;

namespace Composite.Sql
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface ISqlTableInformation
    {
        string TableName { get; }
        bool HasIdentityColumn { get; }
        string IdentityColumnName { get; }
        SqlColumnInformation this[string columnName] { get; }
        IEnumerable<SqlColumnInformation> ColumnInformations { get; }
    }
}