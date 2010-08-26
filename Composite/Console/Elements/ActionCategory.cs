using System;


namespace Composite.C1Console.Elements
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum ActionType
    {
        Edit,
        Add,
        Delete,
        Other,
        DeveloperMode
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum ActionGroupPriority
    {
        PrimaryHigh = 0,
        PrimaryMedium = 1,
        PrimaryLow = 2,
        TargetedAppendHigh = 10,
        TargetedAppendMedium = 11,
        TargetedAppendLow = 12,
        GeneralAppendHigh = 20,
        GeneralAppendMedium = 21,
        GeneralAppendLow = 22
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum ActionCheckedStatus
    {
        Uncheckable,
        Unchecked,
        Checked
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ActionGroup
    {
        public ActionGroup(ActionGroupPriority priority)
        {
            if (priority!=ActionGroupPriority.PrimaryHigh)
            {
                throw new ArgumentException("Unnamed action groups must be called with the PrimaryHigh priority. They serve as a way do deliver common core tasks, like 'delete'. Specify a group name if this is not a core action.");
            }

            this.Name = "";
            this.Priority = priority;
        }

        public ActionGroup(string name, ActionGroupPriority priority)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentException("Parameter 'name' must have a value");
            }

            if (priority == ActionGroupPriority.PrimaryHigh)
            {
                throw new ArgumentException("Named action groups can not be called with the PrimaryHigh priority. They serve as a way do deliver non-core tasks, like 'search'.");
            }

            this.Name = name;
            this.Priority = priority;
        }

        public string Name { get; set; }
        public ActionGroupPriority Priority { get; set; }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ActionLocation
    {
        public readonly static ActionLocation AddPrimaryActionLocation = new ActionLocation { ActionType = ActionType.Add, IsInFolder = false, IsInToolbar = true, ActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh) };
        public readonly static ActionLocation EditPrimaryActionLocation = new ActionLocation { ActionType = ActionType.Edit, IsInFolder = false, IsInToolbar = true, ActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh) };
        public readonly static ActionLocation DeletePrimaryActionLocation = new ActionLocation { ActionType = ActionType.Delete, IsInFolder = false, IsInToolbar = true, ActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh) };
        public readonly static ActionLocation OtherPrimaryActionLocation = new ActionLocation { ActionType = ActionType.Other, IsInFolder = false, IsInToolbar = true, ActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh) };

        public ActionLocation()
        {
            this.ActionGroup = new ActionGroup("Common tasks", ActionGroupPriority.GeneralAppendLow);
            this.ActionType = ActionType.Other;
        }

        public ActionGroup ActionGroup { get; set; }
        public ActionType ActionType { get; set; }
        public bool IsInToolbar { get; set; }
        public bool IsInFolder { get; set; }
        public string FolderName { get; set; }
    }
}
