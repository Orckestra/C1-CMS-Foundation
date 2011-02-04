using System;


namespace Composite.Data
{
    /// <summary>  
    /// This attribute is used to override the default behavior when creating new data items.
    /// See <see cref="IBuildNewHandler"/> for mor information on this subject.
    /// </summary>
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = true)]
    public sealed class BuildNewHandlerAttribute : Attribute
    {
        /// <summary>
        /// Creates a new BuildNewHandlerAttribute
        /// </summary>
        /// <param name="buildNewHandlerType">This should be a type that inherits <see cref="IBuildNewHandler"/></param>
        public BuildNewHandlerAttribute(Type buildNewHandlerType)
        {
            this.BuildNewHandlerType = buildNewHandlerType;
        }



        /// <summary>
        /// The build handle type that inherits <see cref="IBuildNewHandler"/>
        /// </summary>
        public Type BuildNewHandlerType
        {
            get;
            private set;
        }
    }
}
