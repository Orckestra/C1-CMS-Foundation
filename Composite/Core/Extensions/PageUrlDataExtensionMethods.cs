using Composite.Core.Routing;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.Core.Extensions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class PageUrlDataExtensionMethods
    {
        /// <exclude />
        public static IPage GetPage(this PageUrlData pageUrlData)
        {
            Verify.ArgumentNotNull(pageUrlData, nameof(pageUrlData));

            using (new DataScope(pageUrlData.PublicationScope, pageUrlData.LocalizationScope))
            {
                if (pageUrlData.VersionId != null)
                {
                    return PageManager.GetPageById(pageUrlData.PageId, pageUrlData.VersionId.Value);
                }

                return PageManager.GetPageById(pageUrlData.PageId);
            }
        }
    }
}
