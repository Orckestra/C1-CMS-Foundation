using System;
using System.Web;
using Composite.Core.PageTemplates;
using Composite.Core.Xml;

namespace Composite.AspNet.Razor
{
    /// <summary>
    /// Base class for a razor control that represends a C1 page tempalte
    /// </summary>
    public abstract class RazorPageTemplate : CompositeC1WebPage, IPageTemplate
    {
        /// <summary>
        /// Override this method and set <see cref="RazorPageTemplate.TemplateId"/> and <see cref="RazorPageTemplate.TemplateTitle"/>.
        /// </summary>
        public abstract void Configure();

        /// <summary>
        /// Gets or sets the page template id. You should set this in your Configure() method override.
        /// </summary>
        public Guid TemplateId
        {
            get;
            protected set;
        }

        /// <summary>
        /// Gets or sets the page template title. You should set this in your Configure() method override.
        /// </summary>
        public string TemplateTitle
        {
            get;
            protected set;
        }
    }
}
