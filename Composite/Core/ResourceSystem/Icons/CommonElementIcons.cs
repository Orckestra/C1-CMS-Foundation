
namespace Composite.Core.ResourceSystem.Icons
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class CommonElementIcons
    {
        /// <exclude />
        public static ResourceHandle Advanced { get { return GetIconHandle("advanced"); } }
        /// <exclude />
        public static ResourceHandle Clock { get { return GetIconHandle("clock"); } }
        /// <exclude />
        public static ResourceHandle Cancel { get { return GetIconHandle("cancel"); } }
        /// <exclude />
        public static ResourceHandle CancelDisabled { get { return GetIconHandle("cancel-disabled"); } }
        /// <exclude />
        public static ResourceHandle Close { get { return GetIconHandle("close"); } }
        /// <exclude />
        public static ResourceHandle Data { get { return GetIconHandle("data"); } }
        /// <exclude />
        public static ResourceHandle DataAwaitingApproval { get { return GetIconHandle("data-awaiting-approval"); } }
        /// <exclude />
        public static ResourceHandle DataAwaitingPublication { get { return GetIconHandle("data-awaiting-publication"); } }
        /// <exclude />
        public static ResourceHandle DataDraft { get { return GetIconHandle("data-draft"); } }
        /// <exclude />
        public static ResourceHandle DataPublished { get { return GetIconHandle("data-published"); } }
        /// <exclude />
        public static ResourceHandle DeletedItems { get { return GetIconHandle("deleteditems"); } }
        /// <exclude />
        public static ResourceHandle Earth { get { return GetIconHandle("earth"); } }
        /// <exclude />
        public static ResourceHandle Error { get { return GetIconHandle("error"); } }
        /// <exclude />
        public static ResourceHandle Folder { get { return GetIconHandle("folder"); } }
        /// <exclude />
        public static ResourceHandle FolderOpen { get { return GetIconHandle("folder-open"); } }
        /// <exclude />
        public static ResourceHandle FolderDisabled { get { return GetIconHandle("folder-disabled"); } }
        /// <exclude />
        public static ResourceHandle MimeApplicationMsWord { get { return GetIconHandle("mimetype-doc"); } }
        /// <exclude />
        public static ResourceHandle MimeApplicationPdf { get { return GetIconHandle("mimetype-pdf"); } }
        /// <exclude />
        public static ResourceHandle MimeApplicationRtf { get { return GetIconHandle("mimetype-rtf"); } }
        /// <exclude />
        public static ResourceHandle MimeApplicationVndMsExcel { get { return GetIconHandle("mimetype-xsl"); } }
        /// <exclude />
        public static ResourceHandle MimeApplicationVndMsPowerpoint { get { return GetIconHandle("mimetype-ppt"); } }
        /// <exclude />
        public static ResourceHandle MimeApplicationZip { get { return GetIconHandle("mimetype-zip"); } }
        /// <exclude />
        public static ResourceHandle MimeImageBmp { get { return GetIconHandle("mimetype-bmp"); } }
        /// <exclude />
        public static ResourceHandle MimeImageGif { get { return GetIconHandle("mimetype-gif"); } }
        /// <exclude />
        public static ResourceHandle MimeImageJpeg { get { return GetIconHandle("mimetype-jpg"); } }
        /// <exclude />
        public static ResourceHandle MimeImagePng { get { return GetIconHandle("mimetype-png"); } }
        /// <exclude />
        public static ResourceHandle MimeTextPlain { get { return GetIconHandle("mimetype-txt"); } }
        /// <exclude />
        public static ResourceHandle MimeTextXml { get { return GetIconHandle("mimetype-xml"); } }
        /// <exclude />
        public static ResourceHandle Nodes { get { return GetIconHandle("nodes"); } }
        /// <exclude />
        public static ResourceHandle Options { get { return GetIconHandle( "options" ); } }
        /// <exclude />
        public static ResourceHandle Page { get { return GetIconHandle("page"); } }
        /// <exclude />
        public static ResourceHandle Popup { get { return GetIconHandle("popup"); } }
        /// <exclude />
        public static ResourceHandle Search { get { return GetIconHandle("generic-search"); } }
        /// <exclude />
        public static ResourceHandle Report { get { return GetIconHandle("report"); } }
        /// <exclude />
        public static ResourceHandle Template { get { return GetIconHandle("template"); } }
        /// <exclude />
        public static ResourceHandle Tools { get { return GetIconHandle("tools"); } }
        /// <exclude />
        public static ResourceHandle User { get { return GetIconHandle("user"); } }
        /// <exclude />
        public static ResourceHandle UserDisabled { get { return GetIconHandle("user-disabled"); } }
        /// <exclude />
        public static ResourceHandle UserGroup { get { return GetIconHandle("user-group"); } }
        /// <exclude />
        public static ResourceHandle Question { get { return GetIconHandle("question"); } }


        private static ResourceHandle GetIconHandle()
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, "unknown");
        }

        
        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }
    }
}
