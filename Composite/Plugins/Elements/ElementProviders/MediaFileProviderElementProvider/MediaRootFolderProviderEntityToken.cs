using Composite.C1Console.Security;


namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(MediaFileProviderEntityTokenSecurityAncestorProvider))]
    public sealed class MediaRootFolderProviderEntityToken : EntityToken
	{
        private string _id;

        /// <exclude />
        public MediaRootFolderProviderEntityToken(string parentFolder)
        {
            _id = parentFolder;
        }

        /// <exclude />
    	public override string  Type
        {
	        get { return ""; }
        }

        /// <exclude />
        public override string  Source
        {
	        get { return ""; }
        }

        /// <exclude />
        public override string  Id
        {
	        get { return _id; }
        }

        /// <exclude />
        public override string  Serialize()
        {
            return DoSerialize();
        }

        /// <exclude />
        public static EntityToken Deserialize(string serializedData)
        {
            string type, source, id;

            EntityToken.DoDeserialize(serializedData, out type, out source, out id);

            return new MediaRootFolderProviderEntityToken(id);
        }
    }
}
