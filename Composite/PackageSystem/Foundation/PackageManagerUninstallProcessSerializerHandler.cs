using System.Collections.Generic;
using Composite.Serialization;


namespace Composite.PackageSystem.Foundation
{
    /// <summary>
    /// This class is only for pleasing the workflow system. 
    /// </summary>
    internal sealed class PackageManagerUninstallProcessSerializerHandler : ISerializerHandler
    {
        public string Serialize(object objectToSerialize)
        {
            return "";
        }

        public object Deserialize(string serializedObject)
        {
            return new PackageManagerUninstallProcess(new List<PackageFragmentValidationResult>());
        }
    }
}
