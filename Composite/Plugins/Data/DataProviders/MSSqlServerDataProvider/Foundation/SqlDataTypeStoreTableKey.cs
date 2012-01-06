using System;
using System.ComponentModel;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    internal class SqlDataTypeStoreTableKey : Tuple<string, string>
    {
        public SqlDataTypeStoreTableKey(string dataScopeIdentifierName, string localeCultureName)
            : base(dataScopeIdentifierName, localeCultureName)
        {

        }


        public string DataScopeIdentifierName
        {
            get
            {
                return Item1;
            }
        }


        public string LocaleCultureName
        {
            get
            {
                return Item2;
            }
        }
    }
}
