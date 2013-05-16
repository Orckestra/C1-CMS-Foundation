using System;
using System.Collections.Generic;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class BaseParameterRuntimeTreeNode : BaseRuntimeTreeNode
    {
        /// <exclude />
        protected BaseParameterRuntimeTreeNode(string name)
        {
            if (string.IsNullOrEmpty(name)) throw new ArgumentNullException("name");

            this.Name = name;
        }


        /// <exclude />
        public string Name
        {
            get;
            private set;
        }
    }
}
