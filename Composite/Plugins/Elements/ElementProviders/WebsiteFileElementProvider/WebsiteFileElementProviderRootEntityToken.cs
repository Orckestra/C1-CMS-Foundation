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
        /// <exclude />
        public WebsiteFileElementProviderRootEntityToken(string providerName, string rootPath)
        {
            ProviderName = providerName;
            RootPath = rootPath;
        }


        /// <exclude />
        internal string ProviderName
        {
            get;
            private set;
        }

        internal string RootPath
        {
            get;
            private set;
        }

        /// <exclude />
        public override string Type
        {
            get { return ""; }
        }


        /// <exclude />
        public override string Source
        {
            get { return ProviderName; }
        }


        /// <exclude />
        public override string Id
        {
            get { return ""; }
        }


        /// <exclude />
        public override string Serialize()
        {
            return string.Format("{0}${1}", ProviderName, RootPath);
        }


        /// <exclude />
        public static EntityToken Deserialize(string serializedData)
        {
            if (serializedData.IndexOf('$')>0)
            {
                var parts = serializedData.Split('$');
                return new WebsiteFileElementProviderRootEntityToken(parts[0], parts[1]);
            }
            else
            {
                return new WebsiteFileElementProviderRootEntityToken(serializedData, "");
            }
        }
    }
}
