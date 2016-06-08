using System;
using System.Linq;
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
                    Guid pageId = pageUrlData.PageId;
                    Guid versionId = pageUrlData.VersionId.Value;

                    // TODO: add caching here
                    return DataFacade.GetData<IPage>().FirstOrDefault(p => 
                        p.Id == pageId 
                        && p.VersionId == versionId);
                }

                return PageManager.GetPageById(pageUrlData.PageId);
            }
        }
    }
}
