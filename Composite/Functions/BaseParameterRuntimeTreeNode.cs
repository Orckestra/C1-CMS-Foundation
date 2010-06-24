using System;
using System.Collections.Generic;


namespace Composite.Functions
{
    public abstract class BaseParameterRuntimeTreeNode : BaseRuntimeTreeNode
    {
        protected BaseParameterRuntimeTreeNode(string name)
        {
            if (string.IsNullOrEmpty(name) == true) throw new ArgumentNullException("name");

            this.Name = name;
        }


        public string Name
        {
            get;
            private set;
        }
    }
}
