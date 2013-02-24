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
    /// Add this attribute to your data interface to specify what controller to use for publishing.
    /// Your data type is expected to implement <see cref="Composite.Data.ProcessControlled.IPublishControlled"/> when this attribute is used.
    /// The type you specify is expected to implement <see cref="Composite.Data.ProcessControlled.IPublishProcessController"/>.
    /// For default publishing behaviour use the type <see cref="Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController.GenericPublishProcessController"/>
    /// </summary>
    /// <example> This sample shows how to use the PublishProcessControllerType attribute.
    /// <code>
    /// [PublishProcessControllerType(typeof(GenericPublishProcessController))]
    /// // (other IData attributes)
    /// interface IMyDataType : IData, IPublishControlled
    /// {
    ///     // data type properties
    /// }
    /// </code>
    /// </example>    
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public sealed class PublishProcessControllerTypeAttribute : ProcessControllerTypeAttribute
    {
        /// <summary>
        /// Specify what controller to use for publishing.
        /// For default publishing behaviour use the type <see cref="Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController.GenericPublishProcessController"/>
        /// </summary>
        /// <param name="processControllerType">Controller to use in publishing flow</param>
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
}
