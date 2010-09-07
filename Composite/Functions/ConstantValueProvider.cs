using System.Xml.Linq;
using Composite.Functions.Foundation;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ConstantValueProvider : BaseValueProvider
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
