using Composite.C1Console.Security;
using Composite.C1Console.Security.SecurityAncestorProviders;

namespace Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    public sealed class WebsiteFileElementProviderRootEntityToken : EntityToken
	{
        private string _providerName;

        /// <exclude />
        public WebsiteFileElementProviderRootEntityToken(string providerName)
        {
            _providerName = providerName;
        }


        /// <exclude />
        public override string Type
        {
            get { return ""; }
        }


        /// <exclude />
        public override string Source
        {
            get { return _providerName; }
        }


        /// <exclude />
        public override string Id
        {
            get { return ""; }
        }


        /// <exclude />
        public override string Serialize()
        {
            return _providerName;
        }


        /// <exclude />
        public static EntityToken Deserialize(string serializedData)
        {
            return new WebsiteFileElementProviderRootEntityToken(serializedData);
        }
    }
}
