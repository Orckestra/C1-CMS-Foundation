using System;
using System.Threading;
using System.Xml.Linq;
using System.Collections.Generic;
using Composite.Functions.Foundation;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class FunctionParameterRuntimeTreeNode : BaseParameterRuntimeTreeNode
    {
        private FunctionRuntimeTreeNode _functionNode;

        private bool _cachedValueCalculated = false;
        private object _cachedValue;


        /// <exclude />
        public FunctionParameterRuntimeTreeNode(string name, FunctionRuntimeTreeNode functionNode)
            : base(name)
        {
            _functionNode = functionNode;
        }



        /// <exclude />
        public FunctionRuntimeTreeNode GetHostedFunction()
        {
            return _functionNode;
        }



        /// <exclude />
        public override bool ContainsNestedFunctions
        {
            get
            {
                return _functionNode.ContainsNestedFunctions;
            }
        }


        /// <exclude />
        public override object GetValue(FunctionContextContainer contextContainer)
        {
            if (contextContainer == null) throw new ArgumentNullException("contextContainer");

            object result = _functionNode.GetValue(contextContainer);

            _cachedValue = result;
            Thread.MemoryBarrier();
            _cachedValueCalculated = true;

            return result;
        }


        /// <exclude />
        [Obsolete("This method is not used")]
        public override object GetCachedValue(FunctionContextContainer contextContainer)
        {
            Verify.ArgumentNotNull(contextContainer, "contextContainer");

            return _cachedValueCalculated ? _cachedValue : GetValue(contextContainer);
        }


        /// <exclude />
        public override IEnumerable<string> GetAllSubFunctionNames()
        {
            return _functionNode.GetAllSubFunctionNames();
        }


        /// <exclude />
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
