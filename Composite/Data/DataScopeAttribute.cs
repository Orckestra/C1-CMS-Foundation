using System;
using System.Collections.Generic;


namespace Composite.Data
{
    /// <summary>
    /// Assigns data scopes to a data type. By default data types will live in the public data scope (only) and you use this
    /// attribute to specify aditional scopes.
    /// </summary>
    /// <example> This sample shows how to use the DataScope attribute along with related interfaces and attributes:
    /// <code>
    /// // (other IData attributes)
    /// [DataScope(DataScopeIdentifier.PublicName)]
    /// [DataScope(DataScopeIdentifier.AdministratedName)]
    /// [PublishProcessControllerType(typeof(GenericPublishProcessController))]
    /// interface IMyDataType : IData, IPublishControlled
    /// {
    ///     // data type properties
    /// }
    /// </code>
    /// </example>    
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public sealed class DataScopeAttribute : Attribute
    {


        /// <exclude />
        public DataScopeAttribute(string dataScope)
        {
            this.Identifier = Composite.Data.DataScopeIdentifier.Deserialize(dataScope);
        }


        /// <exclude />
        public DataScopeIdentifier Identifier
        {
            get;
            private set;
        }
    }
}
