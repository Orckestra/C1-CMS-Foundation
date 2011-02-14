using Composite.C1Console.Security;
using Composite.C1Console.Security.SecurityAncestorProviders;


namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    public sealed class PackageElementProviderRootEntityToken : EntityToken
	{
        /// <exclude />
        public override string Type
        {
            get { return ""; }
        }

        /// <exclude />
        public override string Source
        {
            get { return ""; }
        }

        /// <exclude />
        public override string Id
        {
            get { return "PackageElementProviderRootEntityToken"; }
        }

        /// <exclude />
        public override string Serialize()
        {
            return DoSerialize();
        }

        /// <exclude />
        public static EntityToken Deserialize(string serializedEntityToken)
        {
            return new PackageElementProviderRootEntityToken();
        }
    }
}
