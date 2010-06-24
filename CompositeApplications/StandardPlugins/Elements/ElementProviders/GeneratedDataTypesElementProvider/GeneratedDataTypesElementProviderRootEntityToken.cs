using Composite.Security;
using Composite.Security.SecurityAncestorProviders;


namespace Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
	internal sealed class GeneratedDataTypesElementProviderRootEntityToken : EntityToken
	{
        private string _source;
        private string _id;

        public GeneratedDataTypesElementProviderRootEntityToken(string providerName, string id)
        {
            _source = providerName;
            _id = id;
        }

        public override string Type
        {
            get { return ""; }
        }

        public override string Source
        {
            get { return _source; }
        }

        public override string Id
        {
            get { return _id; }
        }

        public override string Serialize()
        {
            return DoSerialize();
        }


        public static EntityToken Deserialize(string serializedData)
        {
            string type, source, id;

            DoDeserialize(serializedData, out type, out source, out id);

            return new GeneratedDataTypesElementProviderRootEntityToken(source, id);
        }


        public static string GlobalDataTypeFolderId { get { return "GlobalDataTypeFolder"; } }
        public static string PageDataFolderTypeFolderId { get { return "PageDataFolderTypeFolder"; } }
        public static string PageMetaDataTypeFolderId { get { return "PageMetaDataTypeFolder"; } }
    }
}
