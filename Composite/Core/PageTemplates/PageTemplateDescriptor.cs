using System;
using System.Collections.Generic;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;

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

        /// <summary>
        /// Gets or sets the title.
        /// </summary>
        /// <value>
        /// The title.
        /// </value>
        /// 
        public string Title { get; set; }
        /// <summary>
        /// Gets or sets the description.
        /// </summary>
        /// <value>
        /// The description.
        /// </value>
        public string Description { get; set; }

        /// <summary>
        /// Gets or sets the placeholder descriptions.
        /// </summary>
        /// <value>
        /// The placeholder descriptions.
        /// </value>
        public IEnumerable<PlaceholderDescriptor> PlaceholderDescriptions { get; set; }

        /// <summary>
        /// The default is the placeholder to focus/use when users edit a page or a layout is used in ad hoc renderings.
        /// </summary>
        public string DefaultPlaceholderId { get; set; }

        /// <summary>
        /// Gets the entity token.
        /// </summary>
        /// <returns></returns>
        public virtual EntityToken GetEntityToken()
        {
            return new PageTemplateEntityToken(Id);
        }

        /// <summary>
        /// Appends actions to a visual element.
        /// </summary>
        /// <param name="element">The element.</param>
        public virtual void AppendActions(Element element)
        {
            // Doing nothing
        }
    }
}
