using Composite.Core.Serialization;


namespace Composite.Core.PackageSystem.Foundation
{
    internal sealed class InstalledPackageInformationSerializerHandler : ISerializerHandler
    {
        public string Serialize(object objectToSerialize)
        {
            return "";
        }

        public object Deserialize(string serializedObject)
        {
            return new InstalledPackageInformation();
        }
    }
}
