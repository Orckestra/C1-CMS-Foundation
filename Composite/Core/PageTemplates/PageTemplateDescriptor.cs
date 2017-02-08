using System;
using System.Collections.Generic;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;

namespace Composite.Core.PageTemplates
{
    /// <summary>
    /// Describes a page layout to the C1 CMS core so it may set up editing UI
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
        /// Gets or sets the placeholder descriptions.
        /// </summary>
        /// <value>
        /// The placeholder descriptions.
        /// </value>
        public virtual IEnumerable<PlaceholderDescriptor> PlaceholderDescriptions { get; set; }

        /// <summary>
        /// The default is the placeholder to focus/use when users edit a page or a layout is used in ad hoc renderings.
        /// </summary>
        public virtual string DefaultPlaceholderId { get; set; }

        /// <summary>
        /// Gets or sets an exception that occurred during loading the template.
        /// </summary>
        public virtual Exception LoadingException { get; set; }

        /// <summary>
        /// Gets a value indicating whether page template is loaded correctly.
        /// Not valid templates should not be used in data as they can not be used in rendering and their IDs may not be valid.
        /// </summary>
        /// <value>
        ///   <c>true</c> if template is loaded; otherwise, <c>false</c>.
        /// </value>
        public virtual bool IsValid
        {
            get { return LoadingException == null; }
        }

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
        public virtual IEnumerable<ElementAction> GetActions()
        {
            return new ElementAction[0];
        }
    }
}
