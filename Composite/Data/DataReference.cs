using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;
using System.Globalization;
using Composite.Core.Types;
using System.Reflection;
using System.Linq.Expressions;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DataReferenceConverter()]
    public class NullableDataReference<T> : DataReference<T> where T : class, IData
    {
        /// <exclude />
        public NullableDataReference()
            : base()
        {
        }


        /// <exclude />
        public NullableDataReference(object keyValue)
            : base(keyValue)
        {
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DataReferenceConverter()]
    public class DataReference<T> : IDataReference where T : class, IData
    {
        private object _keyValue;


        /// <exclude />
        public DataReference()
        {
            _keyValue = null;
        }



        /// <exclude />
        public DataReference(object keyValue)
        {
            if (keyValue != null)
            {
                Type realKeyType = typeof(T).GetKeyPropertyInfoes().Single().PropertyType;
                if (keyValue.GetType().Equals(realKeyType) == false)
                {
                    _keyValue = Composite.Core.Types.ValueTypeConverter.Convert(keyValue, realKeyType);
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


        /// <exclude />
        public DataReference(T data)
        {
            if (data == null)
            {
                _keyValue = null;
            }
            else
            {
                _keyValue = data.GetUniqueKey();
            }
        }


        /// <exclude />
        public Type ReferencedType
        {
            get
            {
                return typeof(T);
            }
        }


        /// <exclude />
        public bool IsSet
        {
            get 
            {
                if (_keyValue is Guid)
                    return ((Guid)_keyValue) != Guid.Empty;

                return (_keyValue != null); 
            }
        }


        /// <exclude />
        public object KeyValue
        {
            get
            {
                return _keyValue;
            }
        }


        /// <exclude />
        IData IDataReference.Data
        {
            get
            {
                return this.Data;
            }
        }


        /// <exclude />
        public T Data
        {
            get
            {
                if (this.IsSet == false)
                {
                    return default(T);
                }
                else
                {
                    return DataFacade.GetDataByUniqueKey<T>(_keyValue);
                }
            }
        }


        /// <exclude />
        public Expression<Func<T, bool>> GetPredicateExpression()
        {
            if (this.IsSet == false)
            {
                return f => false;
            }
            else
            {
                return DataFacade.GetPredicateExpressionByUniqueKey<T>(_keyValue);
            }
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
            if (value == null) throw new ArgumentNullException("value");

            if (targetType == typeof(string) && value is IDataReference)
            {
                IDataReference valueCasted = (IDataReference)value;

                if (valueCasted.IsSet == true)
                {
                    targetValue = ((IDataReference)value).KeyValue.ToString();
                }
                else
                {
                    targetValue = null;
                }

                return true;
            }


            if (value is IDataReference)
            {
                IDataReference valueCasted = (IDataReference)value;
                
                if (valueCasted.IsSet == true)
                {
                    if (targetType.IsAssignableFrom( ((IDataReference)value).KeyValue.GetType() ))
                    {
                        targetValue = ((IDataReference)value).KeyValue;
                        return true;
                    }
                }
                else
                {
                    targetValue = null;
                    return true;
                }

            }


            if (typeof(IDataReference).IsAssignableFrom(targetType))
            {
                if (value is string && string.IsNullOrEmpty((string)value) == true)
                    value = null;

                object[] activationParameters = new object[1];
                activationParameters[0] = value;

                IDataReference dataReference = (IDataReference)Activator.CreateInstance(targetType, activationParameters);

                targetValue = dataReference;

                return true;
            }



            targetValue = null;
            return false;
        }
    }
}
