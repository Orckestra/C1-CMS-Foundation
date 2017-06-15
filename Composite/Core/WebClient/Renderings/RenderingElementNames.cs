using System.Xml.Linq;
using Composite.Core.Xml;

namespace Composite.Core.WebClient.Renderings
{
    /// <summary>
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class RenderingElementNames
    {
        /// <exclude />
        public static XName Html { get; } = Namespaces.Xhtml + "html";

        /// <exclude />
        public static XName PlaceHolder { get; } = Namespaces.Rendering10 + "placeholder";

        /// <exclude />
        public static XName PlaceHolderIdAttribute { get; } = "id";

        /// <exclude />
        public static XName PlaceHolderTitleAttribute { get; } = "title";

        /// <exclude />
        public static XName PlaceHolderDefaultAttribute { get; } = "default";

        /// <exclude />
        public static XName PageTitle { get; } = Namespaces.Rendering10 + "page.title";

        /// <exclude />
        public static XName PageAbstract { get; } = Namespaces.Rendering10 + "page.description";

        /// <exclude />
        public static XName PageMetaTagDescription { get; } = Namespaces.Rendering10 + "page.metatag.description";
    }
}
