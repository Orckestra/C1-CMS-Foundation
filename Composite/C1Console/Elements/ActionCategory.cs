using System;


namespace Composite.C1Console.Elements
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum ActionType
    {
        /// <exclude />
        Edit,

        /// <exclude />
        Add,

        /// <exclude />
        Delete,

        /// <exclude />
        Other,

        /// <exclude />
        DeveloperMode
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum ActionGroupPriority
    {
        /// <exclude />
        PrimaryHigh = 0,

        /// <exclude />
        PrimaryMedium = 1,

        /// <exclude />
        PrimaryLow = 2,

        /// <exclude />
        TargetedAppendHigh = 10,

        /// <exclude />
        TargetedAppendMedium = 11,

        /// <exclude />
        TargetedAppendLow = 12,

        /// <exclude />
        GeneralAppendHigh = 20,

        /// <exclude />
        GeneralAppendMedium = 21,

        /// <exclude />
        GeneralAppendLow = 22
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum ActionCheckedStatus
    {
        /// <exclude />
        Uncheckable,

        /// <exclude />
        Unchecked,

        /// <exclude />
        Checked
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ActionGroup
    {
        /// <exclude />
        public ActionGroup(ActionGroupPriority priority)
        {
            if (priority!=ActionGroupPriority.PrimaryHigh)
            {
                throw new ArgumentException("Unnamed action groups must be called with the PrimaryHigh priority. They serve as a way do deliver common core tasks, like 'delete'. Specify a group name if this is not a core action.");
            }

            this.Name = "";
            this.Priority = priority;
        }

        /// <exclude />
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

        /// <exclude />
        public string Name { get; set; }

        /// <exclude />
        public ActionGroupPriority Priority { get; set; }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ActionLocation
    {
        /// <exclude />
        public readonly static ActionLocation AddPrimaryActionLocation = new ActionLocation { ActionType = ActionType.Add, IsInFolder = false, IsInToolbar = true, ActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh) };

        /// <exclude />
        public readonly static ActionLocation EditPrimaryActionLocation = new ActionLocation { ActionType = ActionType.Edit, IsInFolder = false, IsInToolbar = true, ActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh) };

        /// <exclude />
        public readonly static ActionLocation DeletePrimaryActionLocation = new ActionLocation { ActionType = ActionType.Delete, IsInFolder = false, IsInToolbar = true, ActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh) };

        /// <exclude />
        public readonly static ActionLocation OtherPrimaryActionLocation = new ActionLocation { ActionType = ActionType.Other, IsInFolder = false, IsInToolbar = true, ActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh) };

        /// <exclude />
        public ActionLocation()
        {
            this.ActionGroup = new ActionGroup("Common tasks", ActionGroupPriority.GeneralAppendLow);
            this.ActionType = ActionType.Other;
        }

        /// <exclude />
        public ActionGroup ActionGroup { get; set; }
        
        /// <exclude />
        public ActionType ActionType { get; set; }

        /// <exclude />
        public bool IsInToolbar { get; set; }

        /// <exclude />
        public bool IsInFolder { get; set; }

        /// <exclude />
        public string FolderName { get; set; }
    }
}
