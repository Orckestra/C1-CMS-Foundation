using System;
using System.Collections.Generic;
using Composite.Security;


namespace Composite.StandardPlugins.Elements.ElementProviders.PackageElementProvider
{
    public sealed class AddOnElementProviderAvailableAddOnsGroupFolderEntityTokenAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            yield return new PackageElementProviderAvailablePackagesFolderEntityToken();
        }
    }



    [SecurityAncestorProvider(typeof(AddOnElementProviderAvailableAddOnsGroupFolderEntityTokenAncestorProvider))]
    public sealed class PackageElementProviderAvailablePackagesGroupFolderEntityToken : EntityToken
	{        
        public PackageElementProviderAvailablePackagesGroupFolderEntityToken(string groupName)
        {
            this.GroupName = groupName;
        }

        public string GroupName { get; private set; }
        
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
            get { return this.GroupName; }
        }

        public override string Serialize()
        {
            return DoSerialize();
        }

        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;

            DoDeserialize(serializedEntityToken, out type, out source, out id);

            return new PackageElementProviderAvailablePackagesGroupFolderEntityToken(id);
        }
    }
}
