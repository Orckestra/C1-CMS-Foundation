using System;


namespace Composite.C1Console.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsageAttribute(AttributeTargets.Class, Inherited = true, AllowMultiple = false)]
    public sealed class ActionExecutorAttribute : Attribute
    {
        private Type _actionExecutorType;


        public ActionExecutorAttribute(Type actionExecutorType)
        {
            _actionExecutorType = actionExecutorType;
        }


        public Type ActionExecutorType
        {
            get { return _actionExecutorType; }
        }
    }
}
