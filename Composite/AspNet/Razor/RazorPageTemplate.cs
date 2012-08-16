using System;
using System.Web;
using System.Xml.Linq;
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
        /// Renders the content of specific placeholderPlaceholders the specified placeholder content.
        /// </summary>
        /// <param name="content">Content of the placeholder.</param>
        /// <returns></returns>
        [Obsolete("Use Markup() method instead")]
        public IHtmlString Placeholder(XhtmlDocument content)
        {
            return Markup(content);
        }


        /// <summary>
        /// Renders the specified XNode.
        /// </summary>
        /// <param name="xNode">The <see cref="XNode">XNode</see>.</param>
        /// <returns></returns>
        public IHtmlString Markup(XNode xNode)
        {
            return Html.C1().Markup(xNode);
        }
    }
}
