using System;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class ProcessControllerTypeAttribute : Attribute
    {
        protected ProcessControllerTypeAttribute(Type processControllerType)
        {
            this.ProcessControllerType = processControllerType;
        }


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
        public VersionProcessControllerTypeAttribute(Type processControllerType)
            : base(processControllerType)
        {
        }
    }
}
