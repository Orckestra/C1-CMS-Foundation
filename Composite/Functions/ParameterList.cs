using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using Composite.Core.Types;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [DebuggerDisplay("Count = {_parameters.Count}")]
    public sealed class ParameterList
    {
        [DebuggerDisplay("{ValueObject}")]
        private class StoredParameterReturnValue
        {
            public object ValueObject { get; set; }
            public Type ValueType { get; set; }
            public bool IsDefaultValue { get; set; }
        }


        private readonly FunctionContextContainer _functionContextContainer;
        private readonly Dictionary<string, StoredParameterReturnValue> _parameters = new Dictionary<string, StoredParameterReturnValue>();

        private static readonly MethodInfo NewLazyObjectMethodInfo = StaticReflection.GetGenericMethodInfo(() => NewLazyObject<object>(null));


        /// <exclude />
        public ParameterList(FunctionContextContainer functionContextContainer)
        {
            _functionContextContainer = functionContextContainer;
        }



        /// <exclude />
        public IEnumerable<string> AllParameterNames
        {
            get { return _parameters.Keys; }
        }



        /// <exclude />
        public T GetParameter<T>(string parameterName)
        {
            object value = GetParameter(parameterName);

            if (value == null || value is T)
            {
                return (T)value;
            }
            
            return ValueTypeConverter.Convert<T>(value);
        }


        /// <exclude />

        public bool TryGetParameter<T>(string parameterName, out T value)
        {
            object objectValue;
            bool found = TryGetParameter(parameterName, out objectValue);

            if (!found)
            {
                value = default(T);
                return false;
            }

            if (objectValue == null || objectValue is T)
            {
                value = (T)objectValue;
            }
            else
            {
                value = ValueTypeConverter.Convert<T>(objectValue);
            }

            return true;
        }



        /// <exclude />
        public object GetParameter(string parameterName, Type targetType)
        {
            object value = GetParameter(parameterName);

            if (value != null && !targetType.IsInstanceOfType(value))
            {
                return ValueTypeConverter.Convert(value, targetType);
            }

            return value;
        }



        /// <exclude />
        public object GetParameter(string parameterName)
        {
            object value;
            if (!TryGetParameter(parameterName, out value)) throw new ArgumentException(string.Format("No parameter named '{0}' exists", parameterName));
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

            bool valueIsTreeNode = paramFound && storedParameterReturnValue.ValueObject is BaseRuntimeTreeNode;

            if (!valueIsTreeNode)
            {
                runtimeTreeNode = null;
                return false;
            }
            
            runtimeTreeNode = (BaseRuntimeTreeNode) storedParameterReturnValue.ValueObject;
            return true;
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

            object valueObject = storedParameterReturnValue.ValueObject;
            var parameterType = storedParameterReturnValue.ValueType;

            if (parameterType.IsGenericType && parameterType.GetGenericTypeDefinition() == typeof (Lazy<>))
            {
                Type genericArgument = parameterType.GetGenericArguments()[0];

                value = CreateLazyObject(() => EvaluateTreeNode(valueObject, genericArgument, _functionContextContainer), genericArgument);
            }
            else
            {
                value = EvaluateTreeNode(valueObject, parameterType, _functionContextContainer);
            }

            return true;
        }

        private static object EvaluateTreeNode(object node, Type type, FunctionContextContainer functionContextContainer)
        {
            if (node is BaseRuntimeTreeNode)
            {
                node = ((BaseRuntimeTreeNode)node).GetValue(functionContextContainer, type);
            }

            if (node != null && !type.IsInstanceOfType(node))
            {
                node = ValueTypeConverter.Convert(node, type);
            }

            return node;
        }

        private static object CreateLazyObject(Func<object> func, Type type)
        {
            return NewLazyObjectMethodInfo.MakeGenericMethod(type).Invoke(null, new object[] { func });
        }

        private static Lazy<T> NewLazyObject<T>(Func<object> func)
        {
            return new Lazy<T>(() => (T) func(), true);
        }

        /// <exclude />
        public bool IsDefaultValue(string parameterName)
        {
            return _parameters[parameterName].IsDefaultValue;
        }


        /// <exclude />
        public void AddConstantParameter(string parameterName, object value, Type parameterType, bool isDefaultValue = false)
        {
            Verify.That(!_parameters.ContainsKey(parameterName), "Parameter '{0}' has already been assigned", parameterName);

            _parameters.Add(parameterName, new StoredParameterReturnValue { ValueObject = value, ValueType = parameterType, IsDefaultValue = isDefaultValue});
        }



        /// <exclude />
        public void AddLazyParameter(string parameterName, BaseRuntimeTreeNode runtimeTreeNode, Type parameterType)
        {
            Verify.That(!_parameters.ContainsKey(parameterName), "Parameter '{0}' has already been assigned", parameterName);

            _parameters.Add(parameterName, new StoredParameterReturnValue { ValueObject = runtimeTreeNode, ValueType = parameterType, IsDefaultValue = false });
        }
    }
}
