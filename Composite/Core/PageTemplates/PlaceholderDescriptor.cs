using System.Collections.Generic;

namespace Composite.Core.PageTemplates
{
    /// <summary>
    /// Describe a placeholder on a page template.
    /// </summary>
    public class PlaceholderDescriptor
    {
        /// <summary>
        /// Used to identify a layout placeholder. This has to be unique only within a page template.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Gets or sets the title.
        /// </summary>
        /// <value>
        /// The title.
        /// </value>
        public string Title { get; set; }


        /// <summary>
        /// List of container class names. Used to clasify the placeholder to attach css classes to editor and to filter components
        /// </summary>
        public IList<string> ContainerClasses { get; set; }
    }
}
