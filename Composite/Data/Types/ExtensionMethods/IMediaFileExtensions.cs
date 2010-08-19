namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class IMediaFileExtensions
	{
        public static string GetKeyPath(this IMediaFile mediaFile)
        {
            return mediaFile.StoreId + ":" + mediaFile.Id;
        }


        public static string GetCompositePath(this IMediaFile mediaFile)
        {
            if (mediaFile.FolderPath != "/")
            {
                return string.Format("{0}:{1}/{2}", mediaFile.StoreId, mediaFile.FolderPath, mediaFile.FileName);
            }
            return string.Format("{0}:/{1}", mediaFile.StoreId, mediaFile.FileName);
        }



        public static string GetCompositePath(string storeId, string folderPath, string filename)
        {
            if (folderPath != "/")
            {
                return string.Format("{0}:{1}/{2}", storeId, folderPath, filename);
            }
            return string.Format("{0}:/{1}", storeId, filename);
        }
	}
}
