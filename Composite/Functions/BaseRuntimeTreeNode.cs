using System;
using System.Xml.Linq;
using System.Collections.Generic;
using Composite.Core.Types;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class BaseRuntimeTreeNode
    {
        internal BaseRuntimeTreeNode() { }

        /// <exclude />
        public object GetValue()
        {
            FunctionContextContainer internalContextContainer = new FunctionContextContainer();
            return GetValue(internalContextContainer);
        }


        /// <exclude />
        public abstract object GetValue(FunctionContextContainer contextContainer);


        /// <exclude />
        public T GetValue<T>()
        {
            FunctionContextContainer internalContextContainer = new FunctionContextContainer();
            return GetValue<T>(internalContextContainer);
        }


        /// <exclude />
        public virtual object GetValue(FunctionContextContainer contextContainer, Type type)
        {
            Verify.ArgumentNotNull(contextContainer, "contextContainer");

            object value = this.GetValue(contextContainer);

            if (value == null || type.IsInstanceOfType(value))
            {
                return value;
            }
            
            return ValueTypeConverter.Convert(value, type);
        }


        /// <exclude />
        public T GetValue<T>(FunctionContextContainer contextContainer)
        {
            return (T) GetValue(contextContainer, typeof(T));
        }

        /// <exclude />
        public object GetCachedValue()
        {
            FunctionContextContainer internalContextContainer = new FunctionContextContainer();
            return GetValue(internalContextContainer);
        }

        /// <exclude />
        public abstract IEnumerable<string> GetAllSubFunctionNames();

        /// <exclude />
        public abstract bool ContainsNestedFunctions { get; }

        /// <exclude />
        public abstract XElement Serialize();
    }
}
