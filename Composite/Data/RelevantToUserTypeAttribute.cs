using System;
using System.Collections.Generic;


namespace Composite.Data
{
    /// <summary>
    /// Add this attribute to your data interface to make it visible in the C1 Console developer UI.
    /// </summary>
    /// <example> This sample shows how to use the RelevantToUserType attribute.
    /// <code>
    /// [RelevantToUserType(UserType.Developer)]
    /// // (other IData attributes)
    /// interface IMyDataType : IData
    /// {
    ///     // data type properties
    /// }
    /// </code>
    /// </example>    
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public sealed class RelevantToUserTypeAttribute : Attribute
    {
        /// <summary>
        /// Make your data interface visible in the C1 Console developer UI.
        /// </summary>
        /// <param name="relevantToUserType">The <see cref="Composite.Data.UserType"/> this data type is relevant to. Only 'Developer' is available.</param>
        public RelevantToUserTypeAttribute(UserType relevantToUserType)
        {
            this.UserType = relevantToUserType;
        }



        /// <exclude />
        public RelevantToUserTypeAttribute(string relevantToUserTypeString)
        {
            this.UserType = (UserType)Enum.Parse( typeof(UserType), relevantToUserTypeString );
        }



        /// <exclude />
        public UserType UserType
        {
            get;
            private set;
        }
    }
}
