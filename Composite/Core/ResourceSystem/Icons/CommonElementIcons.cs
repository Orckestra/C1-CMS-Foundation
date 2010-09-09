
namespace Composite.Core.ResourceSystem.Icons
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class CommonElementIcons
    {
        public static ResourceHandle Advanced { get { return GetIconHandle("advanced"); } }
        public static ResourceHandle Clock { get { return GetIconHandle("clock"); } }
        public static ResourceHandle Cancel { get { return GetIconHandle("cancel"); } }
        public static ResourceHandle CancelDisabled { get { return GetIconHandle("cancel-disabled"); } }
        public static ResourceHandle Close { get { return GetIconHandle("close"); } }
        public static ResourceHandle Data { get { return GetIconHandle("data"); } }
        public static ResourceHandle DataAwaitingApproval { get { return GetIconHandle("data-awaiting-approval"); } }
        public static ResourceHandle DataAwaitingPublication { get { return GetIconHandle("data-awaiting-publication"); } }
        public static ResourceHandle DataDraft { get { return GetIconHandle("data-draft"); } }
        public static ResourceHandle DataPublished { get { return GetIconHandle("data-published"); } }
        public static ResourceHandle DeletedItems { get { return GetIconHandle("deleteditems"); } }
        public static ResourceHandle Earth { get { return GetIconHandle("earth"); } }
        public static ResourceHandle Error { get { return GetIconHandle("error"); } }
        public static ResourceHandle Folder { get { return GetIconHandle("folder"); } }
        public static ResourceHandle FolderOpen { get { return GetIconHandle("folder-open"); } }
        public static ResourceHandle FolderDisabled { get { return GetIconHandle("folder-disabled"); } }
        public static ResourceHandle MimeApplicationMsWord { get { return GetIconHandle("mimetype-doc"); } }
        public static ResourceHandle MimeApplicationPdf { get { return GetIconHandle("mimetype-pdf"); } }
        public static ResourceHandle MimeApplicationRtf { get { return GetIconHandle("mimetype-rtf"); } }
        public static ResourceHandle MimeApplicationVndMsExcel { get { return GetIconHandle("mimetype-xsl"); } }
        public static ResourceHandle MimeApplicationVndMsPowerpoint { get { return GetIconHandle("mimetype-ppt"); } }
        public static ResourceHandle MimeApplicationZip { get { return GetIconHandle("mimetype-zip"); } }
        public static ResourceHandle MimeImageBmp { get { return GetIconHandle("mimetype-bmp"); } }
        public static ResourceHandle MimeImageGif { get { return GetIconHandle("mimetype-gif"); } }
        public static ResourceHandle MimeImageJpeg { get { return GetIconHandle("mimetype-jpg"); } }
        public static ResourceHandle MimeImagePng { get { return GetIconHandle("mimetype-png"); } }
        public static ResourceHandle MimeTextPlain { get { return GetIconHandle("mimetype-txt"); } }
        public static ResourceHandle MimeTextXml { get { return GetIconHandle("mimetype-xml"); } }
        public static ResourceHandle Nodes { get { return GetIconHandle("nodes"); } }
        public static ResourceHandle Options { get { return GetIconHandle( "options" ); } }
        public static ResourceHandle Page { get { return GetIconHandle("page"); } }
        public static ResourceHandle Popup { get { return GetIconHandle("popup"); } }
        public static ResourceHandle Search { get { return GetIconHandle("generic-search"); } }
        public static ResourceHandle Report { get { return GetIconHandle("report"); } }
        public static ResourceHandle Template { get { return GetIconHandle("template"); } }
        public static ResourceHandle Tools { get { return GetIconHandle("tools"); } }
        public static ResourceHandle User { get { return GetIconHandle("user"); } }
        public static ResourceHandle UserDisabled { get { return GetIconHandle("user-disabled"); } }
        public static ResourceHandle UserGroup { get { return GetIconHandle("user-group"); } }
        
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
