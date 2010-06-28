using Composite.Security;
using Composite.Security.SecurityAncestorProviders;


namespace Composite.StandardPlugins.Elements.ElementProviders.LocalizationElementProvider
{
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
	internal sealed class LocalizationElementProviderRootEntityToken : EntityToken
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
            return new LocalizationElementProviderRootEntityToken();
        }
    }
}
