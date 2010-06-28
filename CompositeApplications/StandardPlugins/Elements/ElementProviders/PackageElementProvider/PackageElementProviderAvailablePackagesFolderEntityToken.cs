using System;
using System.Collections.Generic;
using Composite.Security;


namespace Composite.StandardPlugins.Elements.ElementProviders.PackageElementProvider
{
    internal sealed class AddOnElementProviderAvailableAddOnsFolderEntityTokenAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            yield return new PackageElementProviderRootEntityToken();
        }
    }



    [SecurityAncestorProvider(typeof(AddOnElementProviderAvailableAddOnsFolderEntityTokenAncestorProvider))]
    internal sealed class PackageElementProviderAvailablePackagesFolderEntityToken : EntityToken
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
            get { return ""; }
        }

        public override string Serialize()
        {
            return DoSerialize();
        }

        public static EntityToken Deserialize(string serializedEntityToken)
        {
            return new PackageElementProviderAvailablePackagesFolderEntityToken();
        }
    }
}
