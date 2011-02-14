using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public interface IDataReference
	{
        /// <exclude />
        Type ReferencedType { get; }

        /// <exclude />
        bool IsSet { get; }

        /// <exclude />
        object KeyValue { get; }

        /// <exclude />
        IData Data { get; }

        /// <exclude />
        string Serialize();
    }
}
