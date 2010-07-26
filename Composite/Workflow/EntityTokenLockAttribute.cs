using System;


namespace Composite.Workflow
{
    /// <summary>
    /// If this attribute is specified on a workflow, then the EntityToken will be locked
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    internal sealed class EntityTokenLockAttribute : Attribute
    {
        public EntityTokenLockAttribute()
        {
        }
    }
}
