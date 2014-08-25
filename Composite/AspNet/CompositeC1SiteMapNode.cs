using System;
using System.Globalization;
using System.Web;
using Composite.Data;

namespace Composite.AspNet
{
    /// <summary>
    /// CompositeC1 implementation of <see cref="SiteMapNode"/>
    /// </summary>
    public class CompositeC1SiteMapNode: SiteMapNode
    {
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
        /// Gets or sets the depth.
        /// </summary>
        /// <value>
        /// The depth.
        /// </value>
        public int Depth { get; protected set; }

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
        /// Gets or sets the page node.
        /// </summary>
        /// <value>
        /// The page node.
        /// </value>
        public PageNode PageNode { get; protected set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="CompositeC1SiteMapNode"/> class.
        /// </summary>
        /// <param name="provider">The provider.</param>
        /// <param name="node">The node.</param>
        /// <param name="data">The data.</param>
        public CompositeC1SiteMapNode(CompositeC1SiteMapProvider provider, PageNode node, DataConnection data)
            : this(provider, node, data, node.Level)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="CompositeC1SiteMapNode"/> class.
        /// </summary>
        /// <param name="provider">The provider.</param>
        /// <param name="node">The node.</param>
        /// <param name="data">The data.</param>
        public CompositeC1SiteMapNode(CompositeC1SiteMapProvider provider, PageNode node, DataConnection data, int level)
            : base(provider, node.Id.ToString(), node.Url, node.MenuTitle, node.Description)
        {
            DocumentTitle = node.Title;
            Depth = level;
            LastModified = node.ChangedDate;
            Priority = 5;

            PageNode = node;
            Culture = data.CurrentLocale;
        }

        /// <exclude />
        protected CompositeC1SiteMapNode(CompositeC1SiteMapProvider provider, string key)
            :base(provider, key)
        {
            // To be used for cloning
        }

        /// <exclude />
        public bool Equals(CompositeC1SiteMapNode obj)
        {
            return Key == obj.Key && Culture.Equals(obj.Culture);
        }

        /// <exclude />
        public override bool Equals(object obj)
        {
            var compositeC1SiteMapNode = obj as CompositeC1SiteMapNode;
            if (compositeC1SiteMapNode != null)
            {
                return Equals(compositeC1SiteMapNode);
            }
            
            return base.Equals(obj);
        }

        /// <exclude />
        public override SiteMapNode Clone()
        {
            var clone = new CompositeC1SiteMapNode((CompositeC1SiteMapProvider)this.Provider, this.Key);

            clone.DocumentTitle = this.DocumentTitle;
            clone.Description = this.Description;
            clone.Url = this.Url;
            clone.Culture = this.Culture;
            clone.Priority = this.Priority;
            clone.Depth = this.Depth;
            clone.LastModified = this.LastModified;
            clone.ChangeFrequency = this.ChangeFrequency;
            clone.DocumentTitle = this.DocumentTitle;
            clone.PageNode = this.PageNode;

            return base.Clone();
        }

        /// <exclude />
        public override int GetHashCode()
        {
            return Key.GetHashCode() ^ Culture.GetHashCode();
        }

        /// <exclude />
        public static bool operator ==(CompositeC1SiteMapNode a, CompositeC1SiteMapNode b)
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
        public static bool operator !=(CompositeC1SiteMapNode a, CompositeC1SiteMapNode b)
        {
            return !(a == b);
        }
    }
}
