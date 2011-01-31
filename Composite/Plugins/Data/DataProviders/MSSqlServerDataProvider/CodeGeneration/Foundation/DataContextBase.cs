using System;
using System.Data;
using System.Data.Linq;
using System.Diagnostics;
using System.Data.Linq.Mapping;

namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public class DataContextBase : DataContext
	{
        [DebuggerNonUserCode]
        public DataContextBase(IDbConnection connection)
            : base(connection)
        {
        }

        [Function(Name = "NEWID", IsComposable = true)]
        public Guid NewId()
        {
            return Guid.NewGuid();
        }
	}
}
