using System;
using System.Xml.Linq;
using System.Collections.Generic;


namespace Composite.Functions
{
    internal sealed class FunctionValueProvider : BaseValueProvider
    {
        private FunctionRuntimeTreeNode _functionFunctionRuntimeNode = null;

        private string _functionName = null;
        private List<BaseParameterRuntimeTreeNode> _parameters = null;

        private XElement _serializedFunction = null;

        private object _lock = new object();


        public FunctionValueProvider(FunctionRuntimeTreeNode functionFunctionRuntimeNode)
        {
            if (functionFunctionRuntimeNode == null) throw new ArgumentNullException("functionFunctionRuntimeNode");

            _functionFunctionRuntimeNode = functionFunctionRuntimeNode;
        }


        public FunctionValueProvider(string functionName, List<BaseParameterRuntimeTreeNode> parameters)
        {
            if (string.IsNullOrEmpty(functionName)) throw new ArgumentException("functionName may not be null or empty");
            if (parameters == null) throw new ArgumentNullException("parameters");

            _functionName = functionName;
            _parameters = parameters;
        }


        public FunctionValueProvider(XElement serializedFunction)
        {
            if (serializedFunction == null) throw new ArgumentNullException("serializedFunction");

            _serializedFunction = serializedFunction;
        }



        public override object GetValue(FunctionContextContainer contextContainer)
        {
            if (contextContainer == null) throw new ArgumentNullException("contextContainer");

            Initialize();

            return _functionFunctionRuntimeNode.GetValue(contextContainer);
        }



        public override XObject Serialize()
        {
            Initialize();

            return _functionFunctionRuntimeNode.Serialize();
        }


        private void Initialize()
        {
            if (_functionFunctionRuntimeNode == null)
            {
                lock (_lock)
                {
                    if (_functionFunctionRuntimeNode == null)
                    {
                        if (_serializedFunction == null)
                        {
                            IFunction function = FunctionFacade.GetFunction(_functionName);
                            _functionFunctionRuntimeNode = new FunctionRuntimeTreeNode(function, _parameters);
                        }
                        else
                        {
                            _functionFunctionRuntimeNode = (FunctionRuntimeTreeNode)FunctionTreeBuilder.Build(_serializedFunction);
                        }
                    }
                }
            }
        }
    }
}
