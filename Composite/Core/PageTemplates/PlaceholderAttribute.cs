using System;

namespace Composite.Core.PageTemplates
{
    /// <summary>
    /// Defines a placeholder property
    /// </summary>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class PlaceholderAttribute : Attribute
    {
        /// <summary>
        /// Placeholder's ID. If this parameter is not set, the property name will be the ID
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Placeholder's label. Is used f.e. in EditPageWorkflow
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// A comma seperated list of container class names. These class names are used to filter Component options in editors and to style the editing area.
        /// </summary>
        public string ContainerClasses { get; set; }

        /// <summary>
        /// Determines whether current placeholder is the default placeholder
        /// </summary>
        public bool IsDefault { get; set; }
    }
}
