using System;
using System.Xml.Linq;

using Composite.Functions.Foundation;
using Composite.Core.Types;


namespace Composite.Functions
{
    internal sealed class ConstantValueProvider : BaseValueProvider
    {
        private object _value;


        public ConstantValueProvider(object value)
        {
            _value = value;
        }


        public override object GetValue(FunctionContextContainer contextContainer)
        {
            return _value;
        }



        public override XObject Serialize()
        {
            if (_value != null)
            {
                return new XAttribute(FunctionTreeConfigurationNames.ValueAttributeName, _value);
            }
            else
            {
                return null;
            }
        }
    }
}
