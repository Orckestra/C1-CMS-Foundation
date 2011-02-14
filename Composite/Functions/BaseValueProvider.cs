using System;
using System.Xml.Linq;
using Composite.Core.Types;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public abstract class BaseValueProvider
	{
        internal BaseValueProvider() { }

        /// <exclude />
        public object GetValue()
        {
            FunctionContextContainer internalContextContainer = new FunctionContextContainer();
            return GetValue(internalContextContainer);
        }

        /// <exclude />
        public abstract object GetValue(FunctionContextContainer contextContainer);

        /// <exclude />
        public virtual T GetValue<T>(FunctionContextContainer contextContainer)
        {
            object value = this.GetValue(contextContainer);

            if (value == null || value is T)
            {
                return (T)value;
            }
            else
            {
                return ValueTypeConverter.Convert<T>(value);
            }
        }

        /// <exclude />
        public abstract XObject Serialize();
	}
}
