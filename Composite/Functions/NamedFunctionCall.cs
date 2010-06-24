namespace Composite.Functions
{
    public class NamedFunctionCall
    {
        public NamedFunctionCall(string name, BaseFunctionRuntimeTreeNode functionCall)
        {
            this.Name = name;
            this.FunctionCall = functionCall;
        }


        public string Name { get; set; }
        public BaseFunctionRuntimeTreeNode FunctionCall { get; set; }
    }
}
