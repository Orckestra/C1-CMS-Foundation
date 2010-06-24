using System;
using System.Collections.Generic;


namespace Composite.Data
{
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    public sealed class DataScopeAttribute : Attribute
    {
        

        public DataScopeAttribute(string dataScope)
        {
            this.Identifier = Composite.Data.DataScopeIdentifier.Deserialize(dataScope);
        }


        public DataScopeIdentifier Identifier
        {
            get;
            private set;
        }
    }
}
