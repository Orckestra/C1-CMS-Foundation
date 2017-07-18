using System;
using System.Collections.Generic;
using System.Text;
using Composite.C1Console.Security;
using Composite.Core.Serialization;


namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    internal sealed class PackageElementProviderInstalledPackageItemEntityTokenAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            if (entityToken == null) throw new ArgumentNullException(nameof(entityToken));

            var castedEntityToken = (PackageElementProviderInstalledPackageItemEntityToken)entityToken;

            if (castedEntityToken.IsLocalInstalled)
            {
                yield return new PackageElementProviderInstalledPackageLocalPackagesFolderEntityToken();
            }
            else
            {
                yield return new PackageElementProviderInstalledPackageGroupFolderEntityToken(castedEntityToken.GroupName);
            }
        }
    }


    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(PackageElementProviderInstalledPackageItemEntityTokenAncestorProvider))]
    public sealed class PackageElementProviderInstalledPackageItemEntityToken : EntityToken
    {
        /// <exclude />
        public PackageElementProviderInstalledPackageItemEntityToken(Guid packageId, string groupName, bool isLocalInstalled, bool canBeUninstalled)
        {
            this.PackageId = packageId;
            this.GroupName = groupName;
            this.IsLocalInstalled = isLocalInstalled;
            this.CanBeUninstalled = canBeUninstalled;
        }


        /// <exclude />
        public Guid PackageId { get; private set; }

        /// <exclude />
        public string GroupName { get; private set; }

        /// <exclude />
        public bool IsLocalInstalled { get; private set; }

        /// <exclude />
        public bool CanBeUninstalled { get; private set; }


        /// <exclude />
        public override string Type => "";


        /// <exclude />
        public override string Source => "";


        /// <exclude />
        public override string Id => this.PackageId.ToString();


        /// <exclude />
        public override string Serialize()
        {
            return CompositeJsonSerializer.Serialize(this);
        }


        /// <exclude />
        public static EntityToken Deserialize(string serializedEntityToken)
        {
            return CompositeJsonSerializer
                .Deserialize<PackageElementProviderInstalledPackageItemEntityToken>(serializedEntityToken);
        }


        /// <exclude />
        public override int GetHashCode()
        {
            return base.GetHashCode() ^ this.GroupName.GetHashCode() ^ this.CanBeUninstalled.GetHashCode();
        }
    }
}
