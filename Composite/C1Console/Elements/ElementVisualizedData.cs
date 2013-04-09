using Composite.Core.ResourceSystem;


namespace Composite.C1Console.Elements
{
    /// <summary>    
    /// Describe an elements visual appearance
    /// </summary>
    public sealed class ElementVisualizedData
    {
        /// <summary>
        /// Label to be shown in tree
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// If this element has (may have) chrildren. When true navigation for opening the element will be provided.
        /// </summary>
        public bool HasChildren { get; set; }

        /// <summary>
        /// When true the element will be shown in the UI but in a grayed out way with all actions disabled
        /// </summary>
        public bool IsDisabled { get; set; }

        /// <summary>
        /// The icon of the element (when closed)
        /// </summary>
        public ResourceHandle Icon { get; set; }

        /// <summary>
        /// The icon of the element when open (when children are shown)
        /// </summary>
        public ResourceHandle OpenedIcon { get; set; }

        /// <summary>
        /// Tooltip for the element - typically shown when hovering the element
        /// </summary>
        public string ToolTip { get; set; }
    }
}
