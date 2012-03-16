using System;
using System.Data;
using System.Data.Linq;
using System.Diagnostics;
using System.Data.Linq.Mapping;
using System.Reflection;

namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public class DataContextBase : DataContext
    {
        private static readonly MethodInfo NewIdMethodInfo = typeof (DataContextBase).GetMethod("NewId");

        /// <exclude />
        [DebuggerNonUserCode]
        public DataContextBase(IDbConnection connection)
            : base(connection)
        {
            
        }

        /// <exclude />
        [Function(Name = "NEWID", IsComposable = true)]
        public Guid NewId()
        {
            return Guid.NewGuid();
        }

        internal static MethodInfo GetNewIdMethodInfo()
        {
            return NewIdMethodInfo;
        }
	}
}
