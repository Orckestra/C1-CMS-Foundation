using System;
using System.Collections.Generic;
using System.Text;
using Composite.C1Console.Security;
using Composite.Core.Serialization;


namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    internal sealed class PackageElementProviderAvailablePackagesItemEntityTokenAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            var castedToken = (PackageElementProviderAvailablePackagesItemEntityToken) entityToken;

            yield return new PackageElementProviderAvailablePackagesGroupFolderEntityToken(castedToken.GroupName);
        }
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(PackageElementProviderAvailablePackagesItemEntityTokenAncestorProvider))]
    public sealed class PackageElementProviderAvailablePackagesItemEntityToken : EntityToken
    {
        private readonly string _id;

        /// <exclude />
        public PackageElementProviderAvailablePackagesItemEntityToken(string id, string groupName)
        {
            _id = id;
            this.GroupName = groupName;
        }

        /// <exclude />
        public string GroupName { get; private set; }

        /// <exclude />
        public Guid PackageId { get { return new Guid(this.Id); } }

        /// <exclude />
        public override string Type
        {
            get { return ""; }
        }

        /// <exclude />
        public override string Source
        {
            get { return ""; }
        }

        /// <exclude />
        public override string Id
        {
            get { return _id; }
        }

        /// <exclude />
        public override string Serialize()
        {
            var sb = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(sb, "_GroupName_", this.GroupName);

            DoSerialize(sb);

            return sb.ToString();
        }

        /// <exclude />
        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;
            Dictionary<string, string> dic;

            DoDeserialize(serializedEntityToken, out type, out source, out id, out dic);

            if (!dic.ContainsKey("_GroupName_")) throw new ArgumentException("serializedEntityToken is of wrong format");

            string groupName = StringConversionServices.DeserializeValueString(dic["_GroupName_"]);

            return new PackageElementProviderAvailablePackagesItemEntityToken(id, groupName);
        }
    }
}
