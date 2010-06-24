using System;
using System.Linq;
using System.Xml.Linq;
using System.Collections.Generic;
using Composite.Functions.Foundation;
using Composite.Types;


namespace Composite.Functions
{
    public sealed class FunctionParameterRuntimeTreeNode : BaseParameterRuntimeTreeNode
    {
        private FunctionRuntimeTreeNode _functionNode;

        private bool _cachedValueCalculated = false;
        private object _cachedValue;


        public FunctionParameterRuntimeTreeNode(string name, FunctionRuntimeTreeNode functionNode)
            : base(name)
        {
            _functionNode = functionNode;
        }



        public FunctionRuntimeTreeNode GetHostedFunction()
        {
            return _functionNode;
        }



        public override bool ContainsNestedFunctions
        {
            get
            {
                return _functionNode.ContainsNestedFunctions;
            }
        }


        public override object GetValue(FunctionContextContainer contextContainer)
        {
            if (contextContainer == null) throw new ArgumentNullException("contextContainer");

            _cachedValue = _functionNode.GetValue(contextContainer);
            _cachedValueCalculated = true;

            return _cachedValue;
        }



        public override object GetCachedValue(FunctionContextContainer contextContainer)
        {
            if (contextContainer == null) throw new ArgumentNullException("contextContainer");

            if ((_cachedValueCalculated == false))
            {
                return GetValue(contextContainer);
            }
            else
            {                
                return _cachedValue;
            }
        }



        public override IEnumerable<string> GetAllSubFunctionNames()
        {
            return _functionNode.GetAllSubFunctionNames();
        }



        public override XElement Serialize()
        {
            // ensure "f:function" naming:
            XElement element = XElement.Parse(string.Format(@"<f:{0} xmlns:f=""{1}"" />", FunctionTreeConfigurationNames.ParamTagName, FunctionTreeConfigurationNames.NamespaceName));

            element.Add(new XAttribute(FunctionTreeConfigurationNames.NameAttributeName, this.Name));

            element.Add(_functionNode.Serialize());

            return element;
        }

    }
}
