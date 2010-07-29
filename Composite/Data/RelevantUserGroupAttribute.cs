using System;
using System.Collections.Generic;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]    
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public sealed class RelevantToUserTypeAttribute : Attribute
    {
        public RelevantToUserTypeAttribute(UserType relevantToUserType)
        {
            this.UserType = relevantToUserType;
        }



        public RelevantToUserTypeAttribute(string relevantToUserTypeString)
        {
            this.UserType = (UserType)Enum.Parse( typeof(UserType), relevantToUserTypeString );
        }



        public UserType UserType
        {
            get;
            private set;
        }
    }
}
