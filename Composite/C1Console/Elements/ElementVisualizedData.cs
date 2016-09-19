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

        /// <summary>
        /// Having a common ElementBundle across elements will make the client bundle them up as a single node, and allow the user to select a specific element via a drop down, showing individual BundleElementName values
        /// </summary>
        public string ElementBundle { get; set; }

        /// <summary>
        /// When bundling elements this field is used to identify this specific element for selection
        /// </summary>
        public string BundleElementName { get; set; }

    }
}
