using System;


namespace Composite.Workflow
{
    /// <summary>
    /// If this attribute is specified on a workflow, then the EntityToken will be locked
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public sealed class EntityTokenLockAttribute : Attribute
    {
        public EntityTokenLockAttribute()
        {
        }
    }
}
