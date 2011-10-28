using System.Collections.Generic;

namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Sql
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface ISqlTableInformation
    {
        /// <exclude />
        string TableName { get; }

        /// <exclude />
        bool HasIdentityColumn { get; }

        /// <exclude />
        string IdentityColumnName { get; }

        /// <exclude />
        SqlColumnInformation this[string columnName] { get; }

        /// <exclude />
        IEnumerable<SqlColumnInformation> ColumnInformations { get; }
    }
}