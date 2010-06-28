using Composite.Security;
using Composite.Security.SecurityAncestorProviders;

namespace Composite.StandardPlugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    internal sealed class WebsiteFileElementProviderRootEntityToken : EntityToken
	{
        private string _providerName;

        public WebsiteFileElementProviderRootEntityToken(string providerName)
        {
            _providerName = providerName;
        }

        public override string Type
        {
            get { return ""; }
        }

        public override string Source
        {
            get { return _providerName; }
        }

        public override string Id
        {
            get { return ""; }
        }

        public override string Serialize()
        {
            return _providerName;
        }

        public static EntityToken Deserialize(string serializedData)
        {
            return new WebsiteFileElementProviderRootEntityToken(serializedData);
        }
    }
}
