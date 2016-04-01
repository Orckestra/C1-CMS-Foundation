using System;
using System.Linq;
using Composite.Core.Types;
using Composite.Data.DynamicTypes;


namespace Composite.Data
{
    /// <summary>
    /// The attribute will tell the system that a data property is a reference (foreign key) to another IData.
    /// </summary>
    /// <example> This sample shows how to use the ForeignKey attribute. 
    /// <code>
    /// // data interface attributes ...
    /// interface IMyDataType : IData
    /// {
    ///     [StoreFieldType(PhysicalStoreFieldType.Guid)]
    ///     [ImmutableFieldId("{D75EA67F-AD14-4BAB-8547-6D87002809F2}")]
    ///     [ForeignKey(typeof(IPage), "Id", AllowCascadeDeletes = true)]
    ///     Guid PageId { get; set; }
    ///     
    ///     // more data properties ...
    ///     
    /// }
    /// </code>
    /// </example>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class ForeignKeyAttribute : Attribute
    {
        private string _interfaceTypeManagerName;

        private Type _interfaceType;
        private string _keyPropertyName;

        private object _nullReferenceValue;
        private bool _isNullReferenceValueSet;

        private readonly object _lock = new object();



        /// <summary>
        /// Tell the system that this data property is a reference (foreign key) to another IData.
        /// </summary>
        /// <param name="interfaceType">The type being referenced</param>
        /// <param name="keyPropertyName">The field being referenced</param>
        public ForeignKeyAttribute(Type interfaceType, string keyPropertyName)
        {
            _interfaceType = interfaceType;
            _keyPropertyName = keyPropertyName;
        }


        /// <summary>
        /// Only use this constructor for types that are registred with the DynamicTypeManager. Primary key field is infered.
        /// </summary>
        /// <param name="interfaceTypeManagerName">A string that will yield a type from the TypeManager.</param>
        public ForeignKeyAttribute(string interfaceTypeManagerName)
        {
            Verify.ArgumentNotNullOrEmpty(interfaceTypeManagerName, nameof(interfaceTypeManagerName));

            _interfaceTypeManagerName = interfaceTypeManagerName;
        }



        /// <summary>
        /// If the "parent" data is deleted and this is set to true, then the data that 
        /// refer to the parent is also deleted.
        /// </summary>
        public bool AllowCascadeDeletes { get; set; }


        /// <summary>
        /// This value is used when foreign key integrity is performed.
        /// If this is not set, the data that the foreign key is pointing to must always exists.
        /// </summary>
        public object NullReferenceValue
        {
            get
            {
                return _nullReferenceValue;
            }
            set
            {
                _nullReferenceValue = value;
                _isNullReferenceValueSet = true;
            }
        }


        /// <summary>
        /// The NullReferenceValue will be converted to the the type specifed with the property
        /// </summary>
        public Type NullReferenceValueType
        {
            get;
            set;
        }



        /// <summary>
        /// Use this if non-reference is allowed with strings foreign keys
        /// </summary>
        public bool NullableString
        {
            get;
            set;
        }



        /// <exclude />
        public bool IsNullReferenceValueSet
        {
            get { return _isNullReferenceValueSet; }
        }



        /// <exclude />
        public Type InterfaceType
        {
            get
            {
                lock (_lock)
                {
                    if (_interfaceType == null)
                    {
                        _interfaceType = TypeManager.GetType(_interfaceTypeManagerName);
                    }
                }

                return _interfaceType;
            }
        }



        /// <exclude />
        public bool IsValid
        {
            get
            {
                lock (_lock)
                {
                    if (_interfaceType == null)
                    {
                        _interfaceType = TypeManager.TryGetType(_interfaceTypeManagerName);
                    }
                }

                return _interfaceType != null;
            }
        }



        /// <exclude />
        public string TypeManagerName
        {
            get
            {
                lock (_lock)
                {
                    if (string.IsNullOrEmpty(_interfaceTypeManagerName))
                    {
                        _interfaceTypeManagerName = TypeManager.TrySerializeType(_interfaceType);
                    }
                }

                return _interfaceTypeManagerName;
            }
        }



        /// <exclude />
        public string KeyPropertyName
        {
            get
            {
                lock (_lock)
                {
                    if (_keyPropertyName == null)
                    {
                        _keyPropertyName = DynamicTypeManager.GetDataTypeDescriptor(this.InterfaceType).KeyPropertyNames.Single();
                    }
                }

                return _keyPropertyName;
            }
        }
    }
}
