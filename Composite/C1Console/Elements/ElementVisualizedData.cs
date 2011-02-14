using Composite.Core.ResourceSystem;


namespace Composite.C1Console.Elements
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ElementVisualizedData
    {
        /// <exclude />
        public string Label { get; set; }

        /// <exclude />
        public bool HasChildren { get; set; }

        /// <exclude />
        public bool IsDisabled { get; set; }

        /// <exclude />
        public ResourceHandle Icon { get; set; }

        /// <exclude />
        public ResourceHandle OpenedIcon { get; set; }

        /// <exclude />
        public string ToolTip { get; set; }
    }
}
