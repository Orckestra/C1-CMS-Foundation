using System;
using System.Collections.Generic;
using Composite.C1Console.Security;


namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    internal sealed class AddOnElementProviderInstalledAddOnLocalAddOnsFolderEntityTokenAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            yield return new PackageElementProviderInstalledPackageFolderEntityToken();
        }
    }


    
    [SecurityAncestorProvider(typeof(AddOnElementProviderInstalledAddOnLocalAddOnsFolderEntityTokenAncestorProvider))]
    internal sealed class PackageElementProviderInstalledPackageLocalPackagesFolderEntityToken : EntityToken
	{
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
            get { return "PackageElementProviderInstalledPackageLocalPackagesFolderEntityToken"; }
        }

        public override string Serialize()
        {
            return DoSerialize();
        }

        public static EntityToken Deserialize(string serializedEntityToken)
        {
            return new PackageElementProviderInstalledPackageLocalPackagesFolderEntityToken();
        }
    }
}
