using System.Workflow.ComponentModel;


namespace Composite.C1Console.Workflow
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ActivityExtensionMethods
    {
        /// <exclude />
        public static Activity GetRoot(this Activity activity)
        {
            if (activity.Parent == null)
            {
                return activity;
            }
            else
            {
                return GetRoot(activity.Parent);
            }
        }



        /// <exclude />
        public static T GetRoot<T>(this Activity activity)
            where T : Activity
        {
            return (T)GetRoot(activity);
        }
    }
}
