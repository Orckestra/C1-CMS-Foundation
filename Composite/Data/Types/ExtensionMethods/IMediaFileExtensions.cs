namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class IMediaFileExtensions
	{
        /// <exclude />
        public static string GetKeyPath(this IMediaFile mediaFile)
        {
            return mediaFile.StoreId + ":" + mediaFile.Id;
        }


        /// <exclude />
        public static string GetCompositePath(this IMediaFile mediaFile)
        {
            return GetCompositePath(mediaFile.StoreId, mediaFile.FolderPath, mediaFile.FileName);
        }


        /// <exclude />
        public static string GetCompositePath(string storeId, string folderPath, string filename)
        {
            if (folderPath != "/")
            {
                return storeId + ":" + folderPath + "/" + filename;
            }
            return storeId + ":/" + filename;
        }
	}
}
