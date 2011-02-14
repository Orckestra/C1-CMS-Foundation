using System;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class ProcessControllerTypeAttribute : Attribute
    {
        /// <exclude />
        protected ProcessControllerTypeAttribute(Type processControllerType)
        {
            this.ProcessControllerType = processControllerType;
        }


        /// <exclude />
        public Type ProcessControllerType
        {
            get;
            private set;
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public sealed class PublishProcessControllerTypeAttribute : ProcessControllerTypeAttribute
    {
        /// <exclude />
        public PublishProcessControllerTypeAttribute(Type processControllerType)
            : base(processControllerType)
        {
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public sealed class LocalizeProcessControllerTypeAttribute : ProcessControllerTypeAttribute
    {
        /// <exclude />
        public LocalizeProcessControllerTypeAttribute(Type processControllerType)
            : base(processControllerType)
        {
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete("To be removed")]
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public sealed class VersionProcessControllerTypeAttribute : ProcessControllerTypeAttribute
    {
        /// <exclude />
        public VersionProcessControllerTypeAttribute(Type processControllerType)
            : base(processControllerType)
        {
        }
    }
}
