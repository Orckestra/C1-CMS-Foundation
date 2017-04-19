using System;


namespace Composite.C1Console.Elements
{
    /// <summary>
    /// Enumeration of different types of actions. If in doupt use 'Other'.
    /// </summary>
    public enum ActionType
    {
        /// <summary>
        /// The action will enable the user to edit the element.
        /// </summary>
        Edit,

        /// <summary>
        /// The action will enable the user to add a child element.
        /// </summary>
        Add,

        /// <summary>
        /// The action will enable the user to delete the element.
        /// </summary>
        Delete,

        /// <summary>
        /// The action will enable the user to get a report, manage meta dtata or other non add/edit/delete actions
        /// </summary>
        Other,

        /// <summary>
        /// The action will should only appear in debug builds, where the C1 Console is running in developer mode. Normal users are very unlikely to ever see this action.
        /// </summary>
        DeveloperMode
    }



    /// <summary>
    /// The priority/relevance of an action group. Use 'PrimaryHigh' if actions in this group are the most relevant actions available. Otherwise use another value to move actions down in menus. 
    /// </summary>
    public enum ActionGroupPriority
    {
        /// <summary>
        /// Use this when actions in the group are of the outmost importance/relevance, like 'Edit Page' og a page.
        /// </summary>
        PrimaryHigh = 0,

        /// <summary>
        /// Use this when actions in the group are primary for the element it is attached to, but not used very often.
        /// </summary>
        PrimaryMedium = 1,

        /// <summary>
        /// Use this when actions in the group are primary for the element it is attached to, but very seldom not used.
        /// </summary>
        PrimaryLow = 2,

        /// <summary>
        /// Use this when actions in the group are often used and relevant (but not primary) for the element it is attached to.
        /// </summary>
        TargetedAppendHigh = 10,

        /// <summary>
        /// Use this when actions in the group are used and relevant (but not primary) for the element it is attached to.
        /// </summary>
        TargetedAppendMedium = 11,

        /// <summary>
        /// Use this when actions in the group are seldom used and relevant (but not primary) for the element it is attached to.
        /// </summary>
        TargetedAppendLow = 12,

        /// <summary>
        /// Use this when actions in the group are attached to elements in general, without specific relevance to those elements.
        /// </summary>
        GeneralAppendHigh = 20,

        /// <summary>
        /// Use this when actions in the group are attached to elements in general, without specific relevance to those elements.
        /// </summary>
        GeneralAppendMedium = 21,

        /// <summary>
        /// Use this when actions in the group are attached to elements in general, without specific relevance to those elements.
        /// </summary>
        GeneralAppendLow = 22
    }



    /// <summary>    
    /// Actions may have a checkbox associated with them, indicating it they are turned on or not or uncheckable.
    /// </summary>
    public enum ActionCheckedStatus
    {
        /// <summary>
        /// The action can not be checked/unchecked. This is typical default behaviour of an action.
        /// </summary>
        Uncheckable,

        /// <summary>
        /// The action is unchecked and can be checked.
        /// </summary>
        Unchecked,

        /// <summary>
        /// The action is checked and can be unchecked.
        /// </summary>
        Checked
    }



    /// <summary>
    /// Define a priority/relevance and optional named group for an action. The priority/relevance influence the position of the action in menus.
    /// </summary>
    public sealed class ActionGroup
    {
        /// <summary>
        /// Initializes a new instance.
        /// </summary>
        /// <param name="priority">the priority/relecance of the action in relation to the element it is attached to</param>
        public ActionGroup(ActionGroupPriority priority)
        {
            if (priority!=ActionGroupPriority.PrimaryHigh)
            {
                throw new ArgumentException("Unnamed action groups must be called with the PrimaryHigh priority. They serve as a way do deliver common core tasks, like 'delete'. Specify a group name if this is not a core action.");
            }

            this.Name = "";
            this.Priority = priority;
        }

        /// <summary>
        /// Initializes a new instance with a custom named group.
        /// </summary>
        /// <param name="name">A name of your choosing. If this name is used by multiple actions they may be bundled into the same group.</param>
        /// <param name="priority">the priority/relecance of the action in relation to the element it is attached to</param>
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

        /// <summary>
        /// The custom name of the group. An empty string if the group is not named.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Priority/relevance of the action.
        /// </summary>
        public ActionGroupPriority Priority { get; set; }
    }



    /// <summary>
    /// Define the location of an action in menus. Actions can be grouped by type (add,edit,delete,other) and in primary and secondary.
    /// </summary>
    public sealed class ActionLocation
    {
        /// <summary>
        /// A primary action, adding data. This will make the action show up between add and delete, next to other add actions (if any).
        /// </summary>
        public readonly static ActionLocation AddPrimaryActionLocation = new ActionLocation { ActionType = ActionType.Add, IsInFolder = false, IsInToolbar = true, ActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh) };

        /// <summary>
        /// A primary action, editing data. This will make the action show up as one of the first, next to other edit actions (if any).
        /// </summary>
        public readonly static ActionLocation EditPrimaryActionLocation = new ActionLocation { ActionType = ActionType.Edit, IsInFolder = false, IsInToolbar = true, ActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh) };

        /// <summary>
        /// A primary action, deleting data. This will make the action show up after edit and add actions, next to other delete actions (if any).
        /// </summary>
        public readonly static ActionLocation DeletePrimaryActionLocation = new ActionLocation { ActionType = ActionType.Delete, IsInFolder = false, IsInToolbar = true, ActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh) };

        /// <summary>
        /// A primary action, doing something besides from add, edit and delete. This can be a view/report actions etc. 
        /// </summary>
        public readonly static ActionLocation OtherPrimaryActionLocation = new ActionLocation { ActionType = ActionType.Other, IsInFolder = false, IsInToolbar = true, ActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh) };

        /// <exclude />
        public ActionLocation()
        {
            this.ActionGroup = new ActionGroup("Common tasks", ActionGroupPriority.GeneralAppendLow);
            this.ActionType = ActionType.Other;
        }

        /// <summary>
        /// Where the action should be grouped. Grouping is typically based on a priority, but can be a unique named group you define. 
        /// If your action is a primary action for the element it is attacted to you should ensure the ActionGroupPriorty  is set to PrimaryHigh.
        /// The lower priority, the lower in a menu list the action will appear.
        /// </summary>
        public ActionGroup ActionGroup { get; set; }
        
        /// <summary>
        /// Declare what type of action this is: Edit, Add, Delete, Other. You may also use 'DeveloperMode' which will hide the action when the C1 Console run in normal operations mode.
        /// </summary>
        public ActionType ActionType { get; set; }

        /// <summary>
        /// Set to true if your action is important enough to be shown in the toolbar. If this is a very specialized command, consider not showing it in the toolbar.
        /// </summary>
        public bool IsInToolbar { get; set; }

        /// <summary>
        /// Not implemented at client level. Setting this to true will have no effect.
        /// </summary>
        public bool IsInFolder { get; set; }

        /// <summary>
        /// Not implemented at client level. Setting a folder name will have no effect.
        /// </summary>
        public string FolderName { get; set; }

        /// <summary>
        /// Bundle actions behind a drop down button. If multiple actions on an element share ActionBundle value, they can be compounded in the client UI.
        /// </summary>
        public string ActionBundle { get; set; }

    }
}
