using System;
using System.Collections.Generic;
using System.Text;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Core.Serialization;
using Newtonsoft.Json;


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


    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(PackageElementProviderAvailablePackagesItemEntityTokenAncestorProvider))]
    public sealed class PackageElementProviderAvailablePackagesItemEntityToken : EntityToken
    {
        /// <exclude />
        [JsonConstructor]
        public PackageElementProviderAvailablePackagesItemEntityToken(string id, string groupName)
        {
            Id = id;
            this.GroupName = groupName;
        }

        /// <exclude />
        public string GroupName { get; private set; }

        /// <exclude />
        public Guid PackageId => new Guid(this.Id);

        /// <exclude />
        public override string Type => "";

        /// <exclude />
        public override string Source => "";

        /// <exclude />
        public override string Id { get; }

        /// <exclude />
        public override string Serialize()
        {
            return CompositeJsonSerializer.Serialize(this);
        }

        /// <exclude />
        public static EntityToken Deserialize(string serializedEntityToken)
        {
            EntityToken entityToken;
            if (CompositeJsonSerializer.IsJsonSerialized(serializedEntityToken))
            {
                entityToken = CompositeJsonSerializer.Deserialize<PackageElementProviderAvailablePackagesItemEntityToken>(serializedEntityToken);
            }
            else
            {
                entityToken = DeserializeLegacy(serializedEntityToken);
                Log.LogVerbose(nameof(PackageElementProviderAvailablePackagesItemEntityToken), entityToken.GetType().FullName);
            }
            return entityToken;
        }

        /// <exclude />
        public static EntityToken DeserializeLegacy(string serializedEntityToken)
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
