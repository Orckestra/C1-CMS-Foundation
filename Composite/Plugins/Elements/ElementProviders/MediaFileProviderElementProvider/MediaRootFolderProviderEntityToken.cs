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
        /// <exclude />
        public MediaRootFolderProviderEntityToken(string parentFolder)
        {
            Verify.ArgumentNotNull(parentFolder, nameof(parentFolder));

            Id = parentFolder;
        }

        /// <exclude />
        public override string Type => "";

        /// <exclude />
        public override string Source => "";

        /// <exclude />
        public override string Id { get; }

        /// <exclude />
        public override string  Serialize() => DoSerialize();

        /// <exclude />
        public static EntityToken Deserialize(string serializedData)
        {
            string type, source, id;

            EntityToken.DoDeserialize(serializedData, out type, out source, out id);

            return new MediaRootFolderProviderEntityToken(id);
        }
    }
}
