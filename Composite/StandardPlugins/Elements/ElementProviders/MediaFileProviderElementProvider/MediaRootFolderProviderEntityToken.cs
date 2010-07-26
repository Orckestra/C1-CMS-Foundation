using Composite.Security;


namespace Composite.StandardPlugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    [SecurityAncestorProvider(typeof(MediaFileProviderEntityTokenSecurityAncestorProvider))]
    internal sealed class MediaRootFolderProviderEntityToken : EntityToken
	{
        private string _id;

        public MediaRootFolderProviderEntityToken(string parentFolder)
        {
            _id = parentFolder;
        }

    	public override string  Type
        {
	        get { return ""; }
        }

        public override string  Source
        {
	        get { return ""; }
        }

        public override string  Id
        {
	        get { return _id; }
        }

        public override string  Serialize()
        {
            return DoSerialize();
        }

        public static EntityToken Deserialize(string serializedData)
        {
            string type, source, id;

            EntityToken.DoDeserialize(serializedData, out type, out source, out id);

            return new MediaRootFolderProviderEntityToken(id);
        }
    }
}
