using System;
using System.Linq;
using Composite.Core.Types;
using System.Linq.Expressions;


namespace Composite.Data
{
    /// <summary>
    /// Represents a reference to a Composite C1 IData item. Unlike <see cref="DataReference{T}"/> this class signals
    /// that a data reference need not be set for this to be in a valid state.
    /// </summary>
    /// <typeparam name="T">The C1 Data Type (<see cref="IData"/>) being referenced</typeparam>
    [DataReferenceConverter]
    public class NullableDataReference<T> : DataReference<T> where T : class, IData
    {
        /// <exclude />
        public NullableDataReference()
        {
        }


        /// <exclude />
        public NullableDataReference(object keyValue)
            : base(keyValue)
        {
        }
    }



    /// <summary>
    /// Represents a reference to a Composite C1 IData item. 
    /// </summary>
    /// <typeparam name="T">The C1 Data Type (<see cref="IData"/>) being referenced</typeparam>
    [DataReferenceConverter]
    public class DataReference<T> : IDataReference where T : class, IData
    {
        private readonly object _keyValue;
        private T _cachedValue;
            
        /// <summary>
        /// Constructs a 'empty' DataReference.
        /// </summary>
        public DataReference()
        {
            _keyValue = null;
        }



        /// <summary>
        /// Constructs a DataReference using a key value.
        /// </summary>
        /// <param name="keyValue">The key value, like the Guid for a page's Id.</param>
        public DataReference(object keyValue)
        {
            if (keyValue != null)
            {
                Type realKeyType = typeof(T).GetKeyProperties().Single().PropertyType;
                if (keyValue.GetType() != realKeyType)
                {
                    _keyValue = ValueTypeConverter.Convert(keyValue, realKeyType);
                }
                else
                {
                    _keyValue = keyValue;
                }
            }
            else
            {
                _keyValue = null;
            }
        }


        /// <summary>
        /// Constructs a DataReference using an instance of the data item.
        /// </summary>
        /// <param name="data">The data item to reference.</param>
        public DataReference(T data)
        {
            if (data != null)
            {
                _keyValue = data.GetUniqueKey();
                _cachedValue = data;
            }
        }


        /// <summary>
        /// The type of the data item. This type inherits from IData.
        /// </summary>
        public Type ReferencedType
        {
            get
            {
                return typeof(T);
            }
        }


        /// <summary>
        /// If the reference has not been set this is false.
        /// </summary>
        public bool IsSet
        {
            get 
            {
                if (_keyValue is Guid)
                    return (Guid)_keyValue != Guid.Empty;

                return _keyValue != null; 
            }
        }


        /// <summary>
        /// The key value of the data item being referenced, like the Guid for a page id.
        /// </summary>
        public object KeyValue
        {
            get
            {
                return _keyValue;
            }
        }


        /// <summary>
        /// The data item being referenced.
        /// </summary>
        IData IDataReference.Data
        {
            get
            {
                return this.Data;
            }
        }


        /// <summary>
        /// The data item being referenced.
        /// </summary>
        public T Data
        {
            get
            {
                if (!IsSet)
                {
                    return default(T);
                }

                if (_cachedValue != null)
                {
                    return _cachedValue;
                }

                return _cachedValue = DataFacade.GetDataByUniqueKey<T>(_keyValue);
            }
        }


        /// <summary>
        /// A linq predicate that select the data item being referenced. You can use this when filtering data on the <see cref="DataConnection"/>.
        /// </summary>
        /// <returns>Predicate for referenced data.</returns>
        public Expression<Func<T, bool>> GetPredicateExpression()
        {
            if (!IsSet)
            {
                return f => false;
            }
            
            return DataFacade.GetPredicateExpressionByUniqueKey<T>(_keyValue);
        }


        /// <exclude />
        public string Serialize()
        {
            if (_keyValue == null) return "";

            return Composite.Core.Types.ValueTypeConverter.Convert<string>(_keyValue);
        }


        /// <exclude />
        public override string ToString()
        {
            return this.Serialize();
        }
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataReferenceConverterAttribute : ValueTypeConverterHelperAttribute
    {
        /// <exclude />
        public override bool TryConvert(object value, Type targetType, out object targetValue)
        {
            Verify.ArgumentNotNull(value, "value");

            IDataReference valueCasted = value as IDataReference;
            if (valueCasted != null)
            {
                if (!valueCasted.IsSet)
                {
                    targetValue = null;
                    return true;
                }
                
                if (targetType == typeof (string))
                {
                    targetValue = valueCasted.KeyValue.ToString();
                    return true;
                }

                if (targetType.IsInstanceOfType(valueCasted.KeyValue))
                {
                    targetValue = valueCasted.KeyValue;
                    return true;
                }
            }


            if (typeof(IDataReference).IsAssignableFrom(targetType))
            {
                if (value is string && string.IsNullOrEmpty((string) value))
                {
                    value = null;
                }

                object[] activationParameters = { value };

                var dataReference = (IDataReference)Activator.CreateInstance(targetType, activationParameters);

                targetValue = dataReference;

                return true;
            }


            targetValue = null;
            return false;
        }
    }
}
