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
        public IHtmlString Placeholder(XhtmlDocument content)
        {
            if(content == null)
            {
                return null;
            }

            return Html.Raw(content.ToString());
        }

    }
}
