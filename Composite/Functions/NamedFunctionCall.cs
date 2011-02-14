namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class NamedFunctionCall
    {
        /// <exclude />
        public NamedFunctionCall(string name, BaseFunctionRuntimeTreeNode functionCall)
        {
            this.Name = name;
            this.FunctionCall = functionCall;
        }


        /// <exclude />
        public string Name { get; set; }

        /// <exclude />
        public BaseFunctionRuntimeTreeNode FunctionCall { get; set; }
    }
}
