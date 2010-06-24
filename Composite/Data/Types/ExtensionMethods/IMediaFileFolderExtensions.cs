namespace Composite.Data.Types
{
	public static class IMediaFileFolderExtensions
	{
        public static string GetKeyPath(this IMediaFileFolder mediaFileFolder)
        {
            return mediaFileFolder.StoreId + ":" + mediaFileFolder.Id;
        }

        public static string GetCompositePath(this IMediaFileFolder mediaFileFolder)
        {
            return string.Format("{0}:{1}", mediaFileFolder.StoreId, mediaFileFolder.Path);
        }
	}
}
