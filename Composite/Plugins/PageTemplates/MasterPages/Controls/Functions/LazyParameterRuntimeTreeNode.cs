using System;
using System.Collections.Generic;
using Composite.Functions;

namespace Composite.Plugins.PageTemplates.MasterPages.Controls.Functions
{
    internal class LazyParameterRuntimeTreeNode : BaseParameterRuntimeTreeNode
    {
        private readonly Func<object> _getValueFunction;
        private object _result;
        private bool _evaluated;

        public LazyParameterRuntimeTreeNode(string parameterName, Func<object> getValueFunction)
            : base(parameterName)
        {
            _getValueFunction = getValueFunction;
        }

        public override object GetValue(FunctionContextContainer contextContainer)
        {
            if (!_evaluated)
            {
                _result = _getValueFunction();
                _evaluated = true;
            }

            return _result;
        }

        public override IEnumerable<string> GetAllSubFunctionNames()
        {
            throw new NotSupportedException();
        }

        public override bool ContainsNestedFunctions
        {
            get { return false; }
        }

        public override System.Xml.Linq.XElement Serialize()
        {
            throw new NotSupportedException();
        }
    }
}
