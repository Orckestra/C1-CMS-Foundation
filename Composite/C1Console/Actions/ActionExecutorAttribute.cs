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


        /// <exclude />
        public ActionExecutorAttribute(Type actionExecutorType)
        {
            _actionExecutorType = actionExecutorType;
        }


        /// <exclude />
        public Type ActionExecutorType
        {
            get { return _actionExecutorType; }
        }
    }
}
