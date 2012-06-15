using System;
using System.Web.UI;
using Composite.Core.PageTemplates;


namespace Composite.Plugins.PageTemplates.MasterPages
{
    /// <summary>
    /// Base master page
    /// </summary>
    public abstract class MasterPagePageTemplate : MasterPage, IPageTemplate
    {
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
    }
}
