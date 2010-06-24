using System;
using System.Xml.Linq;


namespace Composite.Functions
{
	public sealed class NoValueValueProvider : BaseValueProvider
	{
        public override object GetValue(FunctionContextContainer contextContainer)
        {
            throw new InvalidOperationException("No value exists");
        }

        public override XObject Serialize()
        {
            throw new InvalidOperationException("No value exists");
        }
    }
}
