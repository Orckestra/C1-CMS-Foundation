using Composite.C1Console.Security;
using Composite.C1Console.Security.SecurityAncestorProviders;


namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
	public sealed class GeneratedDataTypesElementProviderRootEntityToken : EntityToken
	{
        private string _source;
        private string _id;


        /// <exclude />
        public GeneratedDataTypesElementProviderRootEntityToken(string providerName, string id)
        {
            _source = providerName;
            _id = id;
        }


        /// <exclude />
        public override string Type
        {
            get { return ""; }
        }


        /// <exclude />
        public override string Source
        {
            get { return _source; }
        }


        /// <exclude />
        public override string Id
        {
            get { return _id; }
        }


        /// <exclude />
        public override string Serialize()
        {
            return DoSerialize();
        }


        /// <exclude />
        public static EntityToken Deserialize(string serializedData)
        {
            string type, source, id;

            DoDeserialize(serializedData, out type, out source, out id);

            return new GeneratedDataTypesElementProviderRootEntityToken(source, id);
        }

        /// <exclude />
        public static string GlobalDataTypeFolderId { get { return "GlobalDataTypeFolder"; } }

        /// <exclude />
        public static string StaticGlobalDataTypeFolderId { get { return "StaticGlobalDataTypeFolder"; } }

        /// <exclude />
        public static string PageDataFolderTypeFolderId { get { return "PageDataFolderTypeFolder"; } }

        /// <exclude />
        public static string PageMetaDataTypeFolderId { get { return "PageMetaDataTypeFolder"; } }
    }
}
