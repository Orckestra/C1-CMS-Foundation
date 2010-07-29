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
        Type ReferencedType { get; }
        bool IsSet { get; }
        object KeyValue { get; }
        IData Data { get; }

        string Serialize();
    }
}
