using Composite.Serialization;


namespace Composite.PackageSystem.Foundation
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
