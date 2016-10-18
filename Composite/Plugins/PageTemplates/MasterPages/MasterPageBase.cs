using System;
using System.Web.UI;
using Composite.Core.PageTemplates;
using Composite.Data;
using Composite.Plugins.PageTemplates.MasterPages.Controls.Rendering;

namespace Composite.Plugins.PageTemplates.MasterPages
{
    /// <summary>
    /// Base class for ASP.NET MasterPage classes in Orckestra CMS. Inheriting from this bring common features like easy data and sitemap access. 
    /// This class is intended for use in shared MasterPages, to create a MasterPage based page template for Orckestra CMS use <see cref="Composite.Plugins.PageTemplates.MasterPages.MasterPagePageTemplate"/>.
    /// </summary>
    public abstract class MasterPageBase : MasterPage
    {
        private DataConnection _dataConnection;

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

        /// <summary>
        /// Gets a Page Template Feature based on name.
        /// </summary>
        /// <param name="featureName">Name of the Page Template Feature to return.</param>
        /// <returns>The Page Template Feature as an ASP.NET Control</returns>
        public Control GetPageTemplateFeature(string featureName)
        {
            var feature = new PageTemplateFeature();
            feature.Name = featureName;
            return feature;
        }


        /// <exclude />
        public override void Dispose()
        {
            if (_dataConnection != null)
            {
                _dataConnection.Dispose();
                _dataConnection = null;
            }

            base.Dispose();
        }
    }
}
