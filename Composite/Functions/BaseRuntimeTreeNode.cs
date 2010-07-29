using System;
using System.Xml.Linq;
using System.Collections.Generic;
using Composite.Types;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class BaseRuntimeTreeNode
    {
        internal BaseRuntimeTreeNode() { }

        public object GetValue()
        {
            FunctionContextContainer internalContextContainer = new FunctionContextContainer();
            return GetValue(internalContextContainer);
        }

        public abstract object GetValue(FunctionContextContainer contextContainer);

        public T GetValue<T>()
        {
            FunctionContextContainer internalContextContainer = new FunctionContextContainer();
            return GetValue<T>(internalContextContainer);
        }

        public virtual T GetValue<T>(FunctionContextContainer contextContainer)
        {
            if (contextContainer == null) throw new ArgumentNullException("contextContainer");

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

        public object GetCachedValue()
        {
            FunctionContextContainer internalContextContainer = new FunctionContextContainer();
            return GetValue(internalContextContainer);
        }

        public abstract object GetCachedValue(FunctionContextContainer contextContainer);
        public abstract IEnumerable<string> GetAllSubFunctionNames();
        public abstract bool ContainsNestedFunctions { get; }

        public abstract XElement Serialize();
    }
}
