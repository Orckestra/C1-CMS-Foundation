using System;
using System.Collections.Generic;
using Composite.Core.Types;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class ParameterList
    {
        private class StoredParameterReturnValue
        {
            public object ValueObject { get; set; }
            public Type ValueType { get; set; }
            public bool IsDefaultValue { get; set; }
        }


        private FunctionContextContainer _functionContextContainer;
        private Dictionary<string, StoredParameterReturnValue> _parameters = new Dictionary<string, StoredParameterReturnValue>();


        internal ParameterList(FunctionContextContainer functionContextContainer)
        {
            _functionContextContainer = functionContextContainer;
        }



        /// <exclude />
        public IEnumerable<string> AllParameterNames
        {
            get
            {
                foreach (var keyName in _parameters.Keys)
                {
                    yield return keyName;
                }
            }
        }



        /// <exclude />
        public T GetParameter<T>(string parameterName)
        {
            object value = GetParameter(parameterName);

            if (value == null || typeof(T).IsAssignableFrom(value.GetType()) == true)
            {
                return (T)value;
            }
            else
            {
                return ValueTypeConverter.Convert<T>(value);
            }
        }


        /// <exclude />

        public bool TryGetParameter<T>(string parameterName, out T value)
        {
            object objectValue;
            bool found = TryGetParameter(parameterName, out objectValue);

            if (found == true)
            {
                if (objectValue == null || typeof(T).IsAssignableFrom(objectValue.GetType()) == true)
                {
                    value = (T)objectValue;
                }
                else
                {
                    value = ValueTypeConverter.Convert<T>(objectValue);
                }

                return true;
            }
            else
            {
                value = default(T);
                return false;
            }
        }



        /// <exclude />
        public object GetParameter(string parameterName, Type targetType)
        {
            object value = GetParameter(parameterName);

            if (value != null && targetType.IsAssignableFrom(value.GetType()) == false)
            {
                return ValueTypeConverter.Convert(value, targetType);
            }

            return value;
        }



        /// <exclude />
        public object GetParameter(string parameterName)
        {
            object value;
            if (TryGetParameter(parameterName, out value) == false) throw new ArgumentException(string.Format("No parameter named '{0}' exists", parameterName));
            return value;
        }


        /// <summary>
        /// Fetches the tree node object of a parameter, if available. In contrast to the TryGetValue() function
        /// this will give you the 'value definition' rather than the result of calling it.
        /// </summary>
        /// <param name="parameterName">Name of the parameter</param>
        /// <param name="runtimeTreeNode"></param>
        /// <returns></returns>
        public bool TryGetParameterRuntimeTreeNode(string parameterName, out BaseRuntimeTreeNode runtimeTreeNode)
        {
            StoredParameterReturnValue storedParameterReturnValue;
            bool paramFound = _parameters.TryGetValue(parameterName, out storedParameterReturnValue);

            bool valueIsTreeNode = paramFound && typeof(BaseRuntimeTreeNode).IsAssignableFrom(storedParameterReturnValue.ValueObject.GetType());

            if (valueIsTreeNode)
            {
                runtimeTreeNode = (BaseRuntimeTreeNode)storedParameterReturnValue.ValueObject;
                return true;
            }
            else
            {
                runtimeTreeNode = null;
                return false;
            }
        }



        /// <exclude />
        public bool TryGetParameter(string parameterName, out object value)
        {
            StoredParameterReturnValue storedParameterReturnValue;
            bool parameterFound = _parameters.TryGetValue(parameterName, out storedParameterReturnValue);

            if (!parameterFound)
            {
                value = null;
                return false;
            }
            
            object storedValue = storedParameterReturnValue.ValueObject;

            if ((storedValue != null) && (storedValue is BaseRuntimeTreeNode))
            {
                storedValue = ((BaseRuntimeTreeNode) storedValue).GetValue(_functionContextContainer);
            }

            if (storedValue != null && !storedParameterReturnValue.ValueType.IsInstanceOfType(storedValue))
            {
                storedValue = ValueTypeConverter.Convert(storedValue, storedParameterReturnValue.ValueType);
            }

            value = storedValue;

            return true;
        }



        /// <exclude />
        public bool IsDefaultValue(string parameterName)
        {
            return _parameters[parameterName].IsDefaultValue;
        }



        internal void AddConstantParameter(string parameterName, object value, Type parameterType, bool isDefaultValue = false)
        {
            _parameters.Add(parameterName, new StoredParameterReturnValue { ValueObject = value, ValueType = parameterType, IsDefaultValue = isDefaultValue});
        }



        internal void AddLazyParameter(string parameterName, BaseRuntimeTreeNode runtimeTreeNode, Type parameterType)
        {
            _parameters.Add(parameterName, new StoredParameterReturnValue { ValueObject = runtimeTreeNode, ValueType = parameterType, IsDefaultValue = false });
        }
    }
}
