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
    }
}
