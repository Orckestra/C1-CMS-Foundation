using System.Workflow.ComponentModel;


namespace Composite.Workflow
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ActivityExtensionMethods
    {
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



        public static T GetRoot<T>(this Activity activity)
            where T : Activity
        {
            return (T)GetRoot(activity);
        }
    }
}
