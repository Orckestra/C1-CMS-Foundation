using System;
using System.Collections.Specialized;
using System.Globalization;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Core.Routing
{
    /// <summary>
    /// Information stored in a Orckestra CMS page url
    /// </summary>
    public class PageUrlData
    {
        /// <exclude />
        public PageUrlData()
        {
        }


        /// <summary>
        /// Initializes a new instance of the <see cref="PageUrlData"/> class.
        /// </summary>
        /// <param name="page">The page.</param>
        public PageUrlData(IPage page)
        {
            Verify.ArgumentNotNull(page, "page");

            PageId = page.Id;
            VersionId = page.VersionId;
            this.PublicationScope = page.DataSourceId.PublicationScope;
            this.LocalizationScope = page.DataSourceId.LocaleScope;
        }


        /// <summary>
        /// Initializes a new instance of the <see cref="PageUrlData"/> class.
        /// </summary>
        /// <param name="pageId">The page id.</param>
        /// <param name="publicationScope">The publication scope.</param>
        /// <param name="localizationScope">The localization scope.</param>
        public PageUrlData(Guid pageId, PublicationScope publicationScope, CultureInfo localizationScope)
        {
            PageId = pageId;
            PublicationScope = publicationScope;
            LocalizationScope = localizationScope;
        }


        /// <summary>
        /// Gets or sets the page id.
        /// </summary>
        /// <value>
        /// The page id.
        /// </value>
        public Guid PageId { get; set; }

        /// <summary>
        /// Gets or sets the page version id.
        /// </summary>
        /// <value>
        /// The page id.
        /// </value>
        public Guid? VersionId { get; set; }


        /// <summary>
        /// Gets or sets the publication scope.
        /// </summary>
        /// <value>
        /// The publication scope.
        /// </value>
        public PublicationScope PublicationScope { get; set; }


        /// <summary>
        /// Gets or sets the localization scope.
        /// </summary>
        /// <value>
        /// The localization scope.
        /// </value>
        public CultureInfo LocalizationScope { get; set; }


        /// <summary>
        /// Gets or sets the path info.
        /// </summary>
        /// <value>
        /// The path info.
        /// </value>
        public virtual string PathInfo { get; set; }


        /// <summary>
        /// Gets or sets the query parameters.
        /// </summary>
        /// <value>
        /// The query parameters.
        /// </value>
        public virtual NameValueCollection QueryParameters { get; set; }


        internal bool HasQueryParameters
        {
            get { return QueryParameters != null && QueryParameters.HasKeys(); }
        }
    }
}
