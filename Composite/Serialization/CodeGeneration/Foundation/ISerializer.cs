using System.Text;
using System.Collections.Generic;


namespace Composite.Serialization.CodeGeneration.Foundation
{
    public interface ISerializer
    {
        void Serialize(object propertyClass, StringBuilder serializedValues);
        object Deserialize(Dictionary<string, string> objectState);
    }
}
