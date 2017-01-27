using System;
using System.Collections.Generic;
using System.Xml.Linq;

namespace Composite.C1Console.RichContent.Components
{
    /// <summary>
    /// Describes component structure
    /// </summary>
    public class Component
    {
        /// <summary>
        /// Component's unique id
        /// </summary>
        public virtual Guid Id { get; set; }

        /// <summary>
        /// Component's Title
        /// </summary>
        public virtual string Title { get; set; }

        /// <summary>
        /// Component's Description
        /// </summary>
        public virtual string Description { get; set; }

        /// <summary>
        /// Component's Tags which would be categorized with
        /// </summary>
        public virtual IEnumerable<string> GroupingTags { get; set; }

        /// <summary>
        /// Container classes in which this component can appear
        /// </summary>
        public virtual IEnumerable<string> ContainerClasses { get; set; }

        /// <summary>
        /// Container classes in which this component should not appear
        /// </summary>
        public virtual IEnumerable<string> AntiTags { get; set; }

        /// <summary>
        /// Image or Icon that should be used for component
        /// </summary>
        public virtual ComponentImage ComponentImage { get; set; }

        /// <summary>
        /// Component's definition
        /// </summary>
        public virtual string ComponentDefinition { get; set; }
    }

    /// <summary>
    /// Image or Icon that should be used for component
    /// </summary>
    public class ComponentImage
    {
        /// <summary>
        /// Icon name
        /// </summary>
        public string IconName;

        /// <summary>
        /// Image uri
        /// </summary>
        public string CustomImageUri;
    }
}
