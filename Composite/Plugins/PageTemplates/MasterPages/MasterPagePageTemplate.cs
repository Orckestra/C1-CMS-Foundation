using System;
using System.Web.UI;
using Composite.Core.PageTemplates;
using Composite.Data;


namespace Composite.Plugins.PageTemplates.MasterPages
{
    /// <summary>
    /// Base master page
    /// </summary>
    public abstract class MasterPagePageTemplate : MasterPage, IPageTemplate
    {
        private DataConnection _dataConnection;

        /// <summary>
        /// Gets the template id.
        /// </summary>
        public abstract Guid TemplateId { get; }

        /// <summary>
        /// Gets the template title.
        /// </summary>
        public virtual string TemplateTitle
        {
            get { return null; }
        }
        
        /// <summary>
        /// Gets the template description.
        /// </summary>
        public virtual string TemplateDescription
        {
            get { return null; }
        }

        /// <summary>
        /// Gets or sets the data connection.
        /// </summary>
        /// <value>
        /// The data connection.
        /// </value>
        public DataConnection Data
        {
            get
            {
                if (_dataConnection == null)
                {
                    _dataConnection = new DataConnection();
                }
                return _dataConnection;
            }
        }

        /// <summary>
        /// Gets the sitemap navigator.
        /// </summary>
        public SitemapNavigator SitemapNavigator
        {
            get { return Data.SitemapNavigator; }
        }

        /// <exclude />
        public override void Dispose()
        {
            if(_dataConnection != null)
            {
                _dataConnection.Dispose();
                _dataConnection = null;
            }

            base.Dispose();
        }
    }
}
