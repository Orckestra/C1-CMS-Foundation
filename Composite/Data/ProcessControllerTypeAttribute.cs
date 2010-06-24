using System;


namespace Composite.Data
{    
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



    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public sealed class PublishProcessControllerTypeAttribute : ProcessControllerTypeAttribute
    {
        public PublishProcessControllerTypeAttribute(Type processControllerType)
            : base(processControllerType)
        {
        }
    }



    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public sealed class LocalizeProcessControllerTypeAttribute : ProcessControllerTypeAttribute
    {
        public LocalizeProcessControllerTypeAttribute(Type processControllerType)
            : base(processControllerType)
        {
        }
    }
    


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
