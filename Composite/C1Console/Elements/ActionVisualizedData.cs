using Composite.Core.ResourceSystem;


namespace Composite.C1Console.Elements
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ActionVisualizedData
    {
        public ActionVisualizedData() 
        {
            this.ActionCheckedStatus = ActionCheckedStatus.Uncheckable;
        }

        public ActionVisualizedData(ActionVisualizedData copy) 
        {
            this.ActionLocation = copy.ActionLocation;
            this.Disabled = copy.Disabled;
            this.Icon = copy.Icon;
            this.Label = copy.Label;
            this.ToolTip = copy.ToolTip;
            this.ActionCheckedStatus = copy.ActionCheckedStatus;
        }


        public ActionCheckedStatus ActionCheckedStatus { get; set; }
        public string Label { get; set; }
        public bool Disabled { get; set; }
        public ResourceHandle Icon { get; set; }
        public string ToolTip { get; set; }
        public ActionLocation ActionLocation { get; set; }
    }
}
