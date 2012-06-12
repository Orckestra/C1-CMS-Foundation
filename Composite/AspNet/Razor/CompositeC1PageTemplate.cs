using System;
using System.Web;
using Composite.Core.PageTemplates;
using Composite.Core.Xml;

namespace Composite.AspNet.Razor
{
    /// <summary>
    /// 
    /// </summary>
    public abstract class CompositeC1PageTemplate : CompositeC1WebPage, ITemplateDefinition
    {
        /// <summary>
        /// Defines page template id.
        /// </summary>
        public abstract Guid TemplateId
        {
            get;
        }

        /// <summary>
        /// Defines page template title.
        /// </summary>
        public abstract string TemplateTitle
        {
            get;
        }

        /// <summary>
        /// Defines page template description.
        /// </summary>
        public virtual string TemplateDescription
        {
            get { return null; }
        }

        /// <summary>
        /// Renders the content of specific placeholderPlaceholders the specified placeholder content.
        /// </summary>
        /// <param name="content">Content of the placeholder.</param>
        /// <returns></returns>
        public IHtmlString Placeholder(XhtmlDocument content)
        {
            return Html.Raw(content.ToString());
        }

    }
}
