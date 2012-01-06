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
        public SqlDataTypeStoreTable(FieldInfo dataContextQueryableFieldInfo, ISqlDataProviderHelper sqlDataProviderHelper)
        {
            DataContextQueryableFieldInfo = dataContextQueryableFieldInfo;
            SqlDataProviderHelper = sqlDataProviderHelper;
        }

        public FieldInfo DataContextQueryableFieldInfo { get; set; }

        public ISqlDataProviderHelper SqlDataProviderHelper { get; set; }
    }
}
