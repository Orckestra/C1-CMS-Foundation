using System;
using System.Globalization;
using System.Web;
using Composite.Core.Routing;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.AspNet
{
    /// <summary>
    /// Represents an <see cref="IPage"/> instance in a sitemap.
    /// </summary>
    public class CmsPageSiteMapNode: SiteMapNode
    {
        private int? _depth;

        /// <summary>
        /// Gets or sets the culture.
        /// </summary>
        /// <value>
        /// The culture.
        /// </value>
        public CultureInfo Culture { get; protected set; }

        /// <summary>
        /// Gets or sets the priority.
        /// </summary>
        /// <value>
        /// The priority.
        /// </value>
        public int? Priority { get; protected set; }

        /// <summary>
        /// Gets the current page.
        /// </summary>
        public IPage Page { get; protected set; }

        /// <summary>
        /// Gets or sets the depth.
        /// </summary>
        /// <value>
        /// The depth.
        /// </value>
        public int Depth
        {
            get
            {
                if (_depth == null)
                {
                    int depth = 0;
                    Guid id = Page.Id;

                    const int maxDepth = 1000;
                    using (new DataScope(Page.DataSourceId.PublicationScope, Page.DataSourceId.LocaleScope))
                    {
                        while (id != Guid.Empty && depth < maxDepth)
                        {
                            depth++;
                            id = PageManager.GetParentId(id);
                        }
                        if (depth == maxDepth)
                        {
                            throw new InvalidOperationException("Endless page loop");
                        }
                    }

                    _depth = depth;
                }
                return _depth.Value;
            }
            protected set { _depth = value; }
        }

        /// <summary>
        /// Gets or sets the last modified.
        /// </summary>
        /// <value>
        /// The last modified.
        /// </value>
        public DateTime LastModified { get; protected set; }

        /// <summary>
        /// Gets or sets the change frequency.
        /// </summary>
        /// <value>
        /// The change frequency.
        /// </value>
        public SiteMapNodeChangeFrequency? ChangeFrequency { get; protected set; }

        /// <summary>
        /// Gets or sets the document title.
        /// </summary>
        /// <value>
        /// The document title.
        /// </value>
        public string DocumentTitle { get; protected set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="CmsPageSiteMapNode"/> class.
        /// </summary>
        /// <param name="provider">The provider.</param>
        /// <param name="page">The page.</param>
        public CmsPageSiteMapNode(SiteMapProvider provider, IPage page)
            : base(provider, page.Id.ToString(), PageUrls.BuildUrl(page), page.MenuTitle, page.Description)
        {
            Page = page;
            DocumentTitle = page.Title;
            LastModified = page.ChangeDate;
            Priority = 5;

            Culture = page.DataSourceId.LocaleScope;
        }


        /// <exclude />
        public bool Equals(CmsPageSiteMapNode obj)
        {
            return Key == obj.Key && Culture.Equals(obj.Culture);
        }

        /// <exclude />
        public override bool Equals(object obj)
        {
            var pageSiteMapNode = obj as CmsPageSiteMapNode;
            if (pageSiteMapNode != null)
            {
                return Equals(pageSiteMapNode);
            }
            
            return base.Equals(obj);
        }

        /// <exclude />
        public override SiteMapNode Clone()
        {
            return new CmsPageSiteMapNode(this.Provider, Page);
        }

        /// <exclude />
        public override int GetHashCode()
        {
            return Key.GetHashCode() ^ Culture.GetHashCode();
        }

        /// <exclude />
        public static bool operator ==(CmsPageSiteMapNode a, CmsPageSiteMapNode b)
        {
            if (Object.ReferenceEquals(a, b))
            {
                return true;
            }

            if ((object)a == null || (object)b == null)
            {
                return false;
            }

            return a.Equals(b);
        }

        /// <exclude />
        public static bool operator !=(CmsPageSiteMapNode a, CmsPageSiteMapNode b)
        {
            return !(a == b);
        }
    }
}
