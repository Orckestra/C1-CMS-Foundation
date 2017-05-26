using System;
using System.Collections.Generic;
using Composite.C1Console.Forms.Foundation;

namespace Composite.C1Console.Forms.CoreUiControls
{
    [ControlValueProperty("SelectedKeys")]
    internal abstract class HierarchicalSelectorUiControl : UiControl
    {
        internal HierarchicalSelectorUiControl()
        {
            this.AutoSelectParents = true;
        }

        [BindableProperty]
        [FormsProperty]
        public IEnumerable<object> SelectedKeys { get; set; }

        [FormsProperty]
        public IEnumerable<SelectionTreeNode> TreeNodes { get; set; }

        [FormsProperty]
        public bool AutoSelectChildren { get; set; }

        [FormsProperty]
        public bool AutoSelectParents { get; set; }

        [FormsProperty]
        public bool Required { get; set; }
    }

    /// <exclude />
    [Serializable]
    public sealed class SelectionTreeNode
    {
        /// <exclude />
        public object Key { get; set; }

        /// <exclude />
        public string Label { get; set; }

        /// <summary>
        /// Determines whether a tree element should feature a checkbox.
        /// </summary>
        public bool Selectable { get; set; }

        /// <summary>
        /// Determines whether the tree element's checkbox is readonly.
        /// </summary>
        public bool Readonly { get; set; }

        /// <exclude />
        public string Icon { get; set; }

        /// <exclude />
        public IEnumerable<SelectionTreeNode> Children { get; set; }
    }
}
