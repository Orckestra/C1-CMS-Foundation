using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

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
        public string Title { get; set; }
    }
}
