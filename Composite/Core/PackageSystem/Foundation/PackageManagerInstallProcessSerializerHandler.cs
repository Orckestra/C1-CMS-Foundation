using System.Collections.Generic;
using Composite.Core.Serialization;


namespace Composite.Core.PackageSystem.Foundation
{
    /// <summary>
    /// This class is only for pleasing the workflow system. 
    /// </summary>
    internal sealed class PackageManagerInstallProcessSerializerHandler : ISerializerHandler
    {
        public string Serialize(object objectToSerialize)
        {
            return "";
        }

        public object Deserialize(string serializedObject)
        {
            return new PackageManagerInstallProcess(new List<PackageFragmentValidationResult>(), null);
        }
    }
}
