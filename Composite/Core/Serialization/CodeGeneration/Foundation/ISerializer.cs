using System.Text;
using System.Collections.Generic;


namespace Composite.Core.Serialization.CodeGeneration.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface ISerializer
    {
        /// <exclude />
        object Deserialize(Dictionary<string, string> objectState);
    }
}
