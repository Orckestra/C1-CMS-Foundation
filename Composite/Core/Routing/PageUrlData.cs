using System;
using System.Collections.Specialized;
using System.Globalization;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Core.Routing
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class PageUrlData
    {
        /// <exclude />
        public PageUrlData()
        {
        }

        /// <exclude />
        public PageUrlData(IPage page)
        {
            Verify.ArgumentNotNull(page, "page");

            PageId = page.Id;
            this.PublicationScope = page.DataSourceId.PublicationScope;
            this.LocalizationScope = page.DataSourceId.LocaleScope;
        }

        /// <exclude />
        public PageUrlData(Guid pageId, PublicationScope publicationScope, CultureInfo localizationScope)
        {
            PageId = pageId;
            PublicationScope = publicationScope;
            LocalizationScope = localizationScope;
        }

        /// <exclude />
        public Guid PageId { get; set; }

        /// <exclude />
        public PublicationScope PublicationScope { get; set; }

        /// <exclude />
        public CultureInfo LocalizationScope { get; set; }

        /// <exclude />
        public virtual string PathInfo { get; set; }

        /// <exclude />
        public virtual NameValueCollection QueryParameters { get; set; }
    }
}
