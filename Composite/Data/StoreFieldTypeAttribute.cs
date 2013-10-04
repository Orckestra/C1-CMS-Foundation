using System;
using Composite.Data.DynamicTypes;


namespace Composite.Data
{
    /// <summary>
    /// Specifies what physical store type should be used to store this property.
    /// </summary>
    /// <example> This sample shows how to use the StoreFieldType attribute. 
    /// Here a string field with a maximum of 40 characters.
    /// <code>
    /// // data interface attributes ...
    /// interface IMyDataType : IData
    /// {
    ///     [StoreFieldType(PhysicalStoreFieldType.String, 40)]
    ///     [ImmutableFieldId("{D75EA67F-AD14-4BAB-8547-6D87002809F1}")]
    ///     string ProductName { get; set; }
    ///     
    ///     // more data properties ...
    ///     
    /// }
    /// </code>
    /// </example>    
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class StoreFieldTypeAttribute : Attribute
    {
        private StoreFieldTypeAttribute()
        {
            this.IsNullable = false;
        }


        /// <summary>
        /// Specifies what physical store type should be used to store this property.
        /// This overload is intended for int, long, large string, date time, guid and bool.
        /// For decimal and string, use other overload where you can specify length values also.
        /// </summary>
        /// <param name="physicalStoreFieldType">PhysicalStoreFieldType to use</param>
        public StoreFieldTypeAttribute(PhysicalStoreFieldType physicalStoreFieldType)
            : this()
        {
            switch (physicalStoreFieldType)
            {
                case PhysicalStoreFieldType.Integer:
                    this.StoreFieldType = StoreFieldType.Integer;
                    return;
                case PhysicalStoreFieldType.Long:
                    this.StoreFieldType = StoreFieldType.Long;
                    return;
                case PhysicalStoreFieldType.LargeString:
                    this.StoreFieldType = StoreFieldType.LargeString;
                    return;
                case PhysicalStoreFieldType.DateTime:
                    this.StoreFieldType = StoreFieldType.DateTime;
                    return;
                case PhysicalStoreFieldType.Guid:
                    this.StoreFieldType = StoreFieldType.Guid;
                    return;
                case PhysicalStoreFieldType.Boolean:
                    this.StoreFieldType = StoreFieldType.Boolean;
                    return;
            }

            throw new ArgumentException(string.Format("[{0}] - field type {1}.{2} require some aditional arguments in the attribute constructor.",
                this.GetType().Name, typeof(PhysicalStoreFieldType).Name, physicalStoreFieldType));
        }


        /// <summary>
        /// Specifies what physical store type should be used to store this property.
        /// This overload is intended for string.
        /// </summary>
        /// <param name="physicalStoreFieldType">PhysicalStoreFieldType to use - PhysicalStoreFieldType.String expected</param>
        /// <param name="maxLength">Number of characters to reserve in physical store</param>
        public StoreFieldTypeAttribute(PhysicalStoreFieldType physicalStoreFieldType, int maxLength)
            : this()
        {
            switch (physicalStoreFieldType)
            {
                case PhysicalStoreFieldType.String:
                    this.StoreFieldType = StoreFieldType.String(maxLength);
                    return;
            }

            throw new ArgumentException(string.Format("[{0}] - field type {1}.{2} does not take an int argument in the attribute constructor.",
                this.GetType().Name, typeof(PhysicalStoreFieldType).Name, physicalStoreFieldType));
        }


        /// <summary>
        /// Specifies what physical store type should be used to store this property.
        /// This overload is intended for decimal.
        /// </summary>
        /// <param name="physicalStoreFieldType">PhysicalStoreFieldType to use - PhysicalStoreFieldType.Decimal expected</param>
        /// <param name="numericPrecision">Numeric precision for decimal</param>
        /// <param name="numericScale">Numeric scale for decimal</param>
        public StoreFieldTypeAttribute(PhysicalStoreFieldType physicalStoreFieldType, int numericPrecision, int numericScale)
            : this()
        {
            switch (physicalStoreFieldType)
            {
                case PhysicalStoreFieldType.Decimal:
                    this.StoreFieldType = StoreFieldType.Decimal(numericPrecision, numericScale);
                    return;
            }

            throw new ArgumentException(string.Format("[{0}] - field type {1}.{2} does not take two 'int' arguments in the attribute constructor.",
                this.GetType().Name, typeof(PhysicalStoreFieldType).Name, physicalStoreFieldType));
        }


        /// <exclude />
        public StoreFieldType StoreFieldType { get; private set; }


        /// <summary>
        /// When true the data store can allow null values. Default is false.
        /// </summary>
        public bool IsNullable { get; set; }
    }
}
