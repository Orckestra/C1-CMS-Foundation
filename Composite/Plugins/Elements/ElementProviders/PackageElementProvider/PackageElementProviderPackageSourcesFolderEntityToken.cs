using System;
using System.Collections.Generic;
using Composite.C1Console.Security;


namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    internal sealed class PackageElementProviderPackageSourcesFolderEntityTokenAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            yield return new PackageElementProviderRootEntityToken();
        }
    }



    [SecurityAncestorProvider(typeof(PackageElementProviderPackageSourcesFolderEntityTokenAncestorProvider))]
    internal sealed class PackageElementProviderPackageSourcesFolderEntityToken : EntityToken
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
            get { return "PackageElementProviderPackageSourcesFolderEntityToken"; }
        }

        public override string Serialize()
        {
            return DoSerialize();
        }

        public static EntityToken Deserialize(string serializedEntityToken)
        {
            return new PackageElementProviderPackageSourcesFolderEntityToken();
        }
    }
}
