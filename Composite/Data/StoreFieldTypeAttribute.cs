using System;
using Composite.Data.DynamicTypes;


namespace Composite.Data
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class StoreFieldTypeAttribute : Attribute
    {
        private StoreFieldTypeAttribute()
        {
            this.IsNullable = false;
        }



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

            throw new ArgumentException(string.Format("{1} require aditional arguments", this.GetType(), physicalStoreFieldType));
        }



        public StoreFieldTypeAttribute(PhysicalStoreFieldType physicalStoreFieldType, int maxLength)
            : this()
        {
            switch (physicalStoreFieldType)
            {
                case PhysicalStoreFieldType.String:
                    this.StoreFieldType = StoreFieldType.String(maxLength);
                    return;
            }

            throw new ArgumentException(string.Format("{1} does not take an int argument", this.GetType(), physicalStoreFieldType));
        }


        public StoreFieldTypeAttribute(PhysicalStoreFieldType physicalStoreFieldType, int numericPrecision, int numericScale)
            : this()
        {
            switch (physicalStoreFieldType)
            {
                case PhysicalStoreFieldType.Decimal:
                    this.StoreFieldType = StoreFieldType.Decimal(numericPrecision, numericScale);
                    return;
            }

            throw new ArgumentException(string.Format("{1} does not take an int argument", this.GetType(), physicalStoreFieldType));
        }


        public StoreFieldType StoreFieldType { get; private set; }


        /// <summary>
        /// When true the data store can allow null values. Default is false.
        /// </summary>
        public bool IsNullable { get; set; }
    }
}
