using System;
using System.Collections.Generic;
using Composite.C1Console.Security;


namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    internal sealed class AddOnElementProviderAddOnSourcesItemEntityTokenAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            yield return new PackageElementProviderPackageSourcesFolderEntityToken();
        }
    }



    [SecurityAncestorProvider(typeof(AddOnElementProviderAddOnSourcesItemEntityTokenAncestorProvider))]
    internal sealed class PackageElementProviderPackageSourcesItemEntityToken : EntityToken
    {
        string _id;

        public PackageElementProviderPackageSourcesItemEntityToken(Guid id)
        {
            _id = id.ToString();
        }

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
            get { return _id; }
        }

        public override string Serialize()
        {
            return DoSerialize();
        }

        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;
            DoDeserialize(serializedEntityToken, out type, out source, out id);

            return new PackageElementProviderPackageSourcesItemEntityToken(new Guid(id));
        }
    }
}
