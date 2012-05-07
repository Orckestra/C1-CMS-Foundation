using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Composite.Core.PageTemplates
{
    /// <summary>
    /// Describes a page layout to the Composite C1 core so it may set up editing UI
    /// </summary>
    public class PageTemplateDescriptor
    {
        /// <summary>
        /// Used to identify page layouts. The value has to be unique for each page template.
        /// </summary>
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public IEnumerable<PlaceholderDescriptor> PlaceholderDescriptions { get; set; }

        /// <summary>
        /// The default is the placeholder to focus/use when users edit a page or a layout is used in ad hoc renderings.
        /// </summary>
        public string DefaultPlaceholderId { get; set; }
    }
}
