
namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider
{
    internal class SqlDataTypeStoreDataScope
    {
        internal string DataScopeName { get; set; }
        internal string CultureName { get; set; }
        internal string TableName { get; set; }


        public override bool Equals(object obj)
        {
            return Equals(obj as SqlDataTypeStoreDataScope);
        }



        public bool Equals(SqlDataTypeStoreDataScope sqlDataTypeStoreDataScope)
        {
            if (sqlDataTypeStoreDataScope == null) return false;

            return
                sqlDataTypeStoreDataScope.DataScopeName == DataScopeName &&
                sqlDataTypeStoreDataScope.CultureName == CultureName &&
                sqlDataTypeStoreDataScope.TableName == TableName;
        }



        public override int GetHashCode()
        {
            return 
                DataScopeName.GetHashCode() ^
                CultureName.GetHashCode() ^
                TableName.GetHashCode();
        }
    }
}
