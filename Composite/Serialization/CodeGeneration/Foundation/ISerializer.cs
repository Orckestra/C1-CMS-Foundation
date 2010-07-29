using System.Text;
using System.Collections.Generic;


namespace Composite.Serialization.CodeGeneration.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface ISerializer
    {
        void Serialize(object propertyClass, StringBuilder serializedValues);
        object Deserialize(Dictionary<string, string> objectState);
    }
}
