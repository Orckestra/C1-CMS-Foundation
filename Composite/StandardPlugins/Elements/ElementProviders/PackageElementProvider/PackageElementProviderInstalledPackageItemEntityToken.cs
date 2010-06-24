using System;
using System.Collections.Generic;
using System.Text;
using Composite.Security;
using Composite.Serialization;


namespace Composite.StandardPlugins.Elements.ElementProviders.PackageElementProvider
{
    public sealed class AddOnElementProviderInstalledAddOnItemEntityTokenAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            PackageElementProviderInstalledPackageItemEntityToken castedEntityToken = (PackageElementProviderInstalledPackageItemEntityToken)entityToken;

            yield return new PackageElementProviderInstalledPackageGroupFolderEntityToken(castedEntityToken.GroupName);
        }
    }



    [SecurityAncestorProvider(typeof(AddOnElementProviderInstalledAddOnItemEntityTokenAncestorProvider))]
    public sealed class PackageElementProviderInstalledPackageItemEntityToken : EntityToken
    {
        public PackageElementProviderInstalledPackageItemEntityToken(Guid packageId, string groupName, bool isLocalInstalled, bool canBeUninstalled)
        {
            this.AddOnId = packageId;
            this.GroupName = groupName;
            this.IsLocalInstalled = isLocalInstalled;
            this.CanBeUninstalled = canBeUninstalled;
        }


        public Guid AddOnId { get; private set; }
        public string GroupName { get; private set; }
        public bool IsLocalInstalled { get; private set; }
        public bool CanBeUninstalled { get; private set; }


        public override string Type
        {
            get { return ""; }
        }


        public override string Source
        {
            get { return ""; }
        }


        public override string Id
        {
            get { return this.AddOnId.ToString(); }
        }


        public override string Serialize()
        {
            StringBuilder sb = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(sb, "_GroupName_", this.GroupName);
            StringConversionServices.SerializeKeyValuePair(sb, "_IsLocalInstalled_", this.CanBeUninstalled);
            StringConversionServices.SerializeKeyValuePair(sb, "_CanBeUninstalled_", this.CanBeUninstalled);

            DoSerialize(sb);

            return sb.ToString();
        }


        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;
            Dictionary<string, string> dic;

            DoDeserialize(serializedEntityToken, out type, out source, out id, out dic);

            if ((dic.ContainsKey("_GroupName_") == false) || (dic.ContainsKey("_IsLocalInstalled_") == false) || (dic.ContainsKey("_CanBeUninstalled_") == false)) throw new ArgumentException("serializedEntityToken is of wrong format");

            string groupName = StringConversionServices.DeserializeValueString(dic["_GroupName_"]);
            bool isLocalInstalled = StringConversionServices.DeserializeValueBool(dic["_IsLocalInstalled_"]);
            bool canBeUninstalled = StringConversionServices.DeserializeValueBool(dic["_CanBeUninstalled_"]);

            return new PackageElementProviderInstalledPackageItemEntityToken(new Guid(id), groupName, isLocalInstalled, canBeUninstalled);
        }


        public override int GetHashCode()
        {
            return base.GetHashCode() ^ this.GroupName.GetHashCode() ^ this.CanBeUninstalled.GetHashCode();
        }
    }
}
