using Composite.Core.ResourceSystem;


namespace Composite.C1Console.Elements
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ActionVisualizedData
    {
        /// <exclude />
        public ActionVisualizedData() 
        {
            this.ActionCheckedStatus = ActionCheckedStatus.Uncheckable;
        }

        /// <exclude />
        public ActionVisualizedData(ActionVisualizedData copy) 
        {
            this.ActionLocation = copy.ActionLocation;
            this.Disabled = copy.Disabled;
            this.Icon = copy.Icon;
            this.Label = copy.Label;
            this.ToolTip = copy.ToolTip;
            this.ActionCheckedStatus = copy.ActionCheckedStatus;
        }


        /// <exclude />
        public ActionCheckedStatus ActionCheckedStatus { get; set; }

        /// <exclude />
        public string Label { get; set; }

        /// <exclude />
        public bool Disabled { get; set; }

        /// <exclude />
        public ResourceHandle Icon { get; set; }

        /// <exclude />
        public string ToolTip { get; set; }

        /// <exclude />
        public ActionLocation ActionLocation { get; set; }
    }
}
