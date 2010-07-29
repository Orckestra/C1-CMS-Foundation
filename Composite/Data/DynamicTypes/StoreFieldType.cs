using System;
using System.Collections.Generic;
using System.Text;
using Composite.Instrumentation;
using Composite.Serialization;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable()]
    public sealed class StoreFieldType
    {
        private int? _maximumLength;
        private int? _numericPrecision;
        private int? _numericScale;

        /// <summary>The maximum number of characters allowed in a string (2048). For larger strings use the LargeString type.</summary>
        public static int StringMaximumLength { get { return 2048; } }

        /// <summary>The maximum number of digits a decimal may contain (28).</summary>
        public static int NumericPrecisionMaximum { get { return 28; } }


        public static StoreFieldType String(int maximumLength) { return new StoreFieldType(PhysicalStoreFieldType.String, maximumLength); }
        public static StoreFieldType Integer { get { return new StoreFieldType(PhysicalStoreFieldType.Integer); } }
        public static StoreFieldType Long { get { return new StoreFieldType(PhysicalStoreFieldType.Long); } }
        public static StoreFieldType Decimal(int precision, int scale) { return new StoreFieldType(PhysicalStoreFieldType.Decimal, precision, scale); }
        public static StoreFieldType DateTime { get { return new StoreFieldType(PhysicalStoreFieldType.DateTime); } }
        public static StoreFieldType LargeString { get { return new StoreFieldType(PhysicalStoreFieldType.LargeString); } }
        public static StoreFieldType Boolean { get { return new StoreFieldType(PhysicalStoreFieldType.Boolean); } }
        public static StoreFieldType Guid { get { return new StoreFieldType(PhysicalStoreFieldType.Guid); } }



        public PhysicalStoreFieldType PhysicalStoreType
        {
            get;
            private set;
        }



        public bool IsString { get { return this.PhysicalStoreType == PhysicalStoreFieldType.String || this.PhysicalStoreType == PhysicalStoreFieldType.LargeString; } }
        public bool IsLargeString { get { return this.PhysicalStoreType == PhysicalStoreFieldType.LargeString; } }
        public bool IsDecimal { get { return this.PhysicalStoreType == PhysicalStoreFieldType.Decimal; } }
        public bool IsDateTime { get { return this.PhysicalStoreType == PhysicalStoreFieldType.DateTime; } }
        public bool IsGuid { get { return this.PhysicalStoreType == PhysicalStoreFieldType.Guid; } }
        public bool IsNumeric { get { return this.PhysicalStoreType == PhysicalStoreFieldType.Decimal || this.PhysicalStoreType == PhysicalStoreFieldType.Long || this.PhysicalStoreType == PhysicalStoreFieldType.Integer; } }
        public bool IsBoolean { get { return this.PhysicalStoreType == PhysicalStoreFieldType.Boolean; } }



        public int MaximumLength
        {
            get
            {
                if (_maximumLength.HasValue == true)
                {
                    return _maximumLength.Value;
                }
                else
                {
                    throw new InvalidOperationException("The maximum length is not valid for this store field type");
                }
            }
            private set
            {
                _maximumLength = value;
            }
        }



        public int NumericPrecision
        {
            get
            {
                if (_numericPrecision.HasValue == true)
                {
                    return _numericPrecision.Value;
                }
                else
                {
                    throw new InvalidOperationException("The numeric precision is not valid for this store field type");
                }
            }
            private set
            {
                _numericPrecision = value;
            }
        }



        public int NumericScale
        {
            get
            {
                if (_numericScale.HasValue == true)
                {
                    return _numericScale.Value;
                }
                else
                {
                    throw new InvalidOperationException("The numeric scale is not valid for this store field type");
                }
            }
            private set
            {
                _numericScale = value;
            }
        }
        


        public bool IsConvertibleTo(StoreFieldType newStoreFieldType)
        {
            if (this.PhysicalStoreType == newStoreFieldType.PhysicalStoreType) return true;
            if (this.IsNumeric == true && newStoreFieldType.IsDecimal == true) return true;

            // String and LargeString are convertable to each other
            if ((PhysicalStoreType == PhysicalStoreFieldType.String && newStoreFieldType.PhysicalStoreType == PhysicalStoreFieldType.LargeString)
                || (newStoreFieldType.PhysicalStoreType == PhysicalStoreFieldType.String && PhysicalStoreType == PhysicalStoreFieldType.LargeString))
            {
                return true;
            }

            return false;
        }



        public override string ToString()
        {
            switch (this.PhysicalStoreType)
            {
                case PhysicalStoreFieldType.Integer:
                case PhysicalStoreFieldType.Long:
                case PhysicalStoreFieldType.LargeString:
                case PhysicalStoreFieldType.DateTime:
                case PhysicalStoreFieldType.Guid:
                case PhysicalStoreFieldType.Boolean:
                    return this.PhysicalStoreType.ToString();
                case PhysicalStoreFieldType.String:
                    return string.Format("{0}({1})", this.PhysicalStoreType, this.MaximumLength);
                case PhysicalStoreFieldType.Decimal:
                    return string.Format("{0}({1},{2})", this.PhysicalStoreType, this.NumericPrecision, this.NumericScale);
            }

            throw new NotImplementedException();
        }



        public string Serialize()
        {
            StringBuilder sb = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(sb, "PhysicalStoreType", this.PhysicalStoreType.ToString());

            switch (this.PhysicalStoreType)
            {
                case PhysicalStoreFieldType.String:
                    StringConversionServices.SerializeKeyValuePair(sb, "Length", this.MaximumLength);
                    break;

                case PhysicalStoreFieldType.Decimal:
                    StringConversionServices.SerializeKeyValuePair(sb, "Precision", this.NumericPrecision);
                    StringConversionServices.SerializeKeyValuePair(sb, "Scale", this.NumericScale);
                    break;
            }

            return sb.ToString();
        }



        public static StoreFieldType Deserialize(string serializedData)
        {
            using (TimerProfiler timerProfiler = TimerProfilerFacade.CreateTimerProfiler())
            {
                if (string.IsNullOrEmpty(serializedData) == true) throw new ArgumentNullException("serializedData");

                Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedData);

                if (dic.ContainsKey("PhysicalStoreType") == false) throw new ArgumentException("Wrong serialized format");

                string physicalStoreFieldTypeString = StringConversionServices.DeserializeValue<string>(dic["PhysicalStoreType"]);
                PhysicalStoreFieldType physicalStoreFieldType = (PhysicalStoreFieldType)Enum.Parse(typeof(PhysicalStoreFieldType), physicalStoreFieldTypeString);

                switch (physicalStoreFieldType)
                {
                    case PhysicalStoreFieldType.String:
                        if (dic.ContainsKey("Length") == false) throw new ArgumentException("Wrong serialized format");
                        int length = StringConversionServices.DeserializeValueInt(dic["Length"]);
                        return new StoreFieldType(physicalStoreFieldType, length);

                    case PhysicalStoreFieldType.Decimal:
                        if (dic.ContainsKey("Precision") == false) throw new ArgumentException("Wrong serialized format");
                        if (dic.ContainsKey("Scale") == false) throw new ArgumentException("Wrong serialized format");

                        int precision = StringConversionServices.DeserializeValueInt(dic["Precision"]);
                        int scale = StringConversionServices.DeserializeValueInt(dic["Scale"]);

                        return new StoreFieldType(physicalStoreFieldType, precision, scale);

                    case PhysicalStoreFieldType.Boolean:
                    case PhysicalStoreFieldType.DateTime:
                    case PhysicalStoreFieldType.Guid:
                    case PhysicalStoreFieldType.Integer:
                    case PhysicalStoreFieldType.LargeString:
                    case PhysicalStoreFieldType.Long:
                        return new StoreFieldType(physicalStoreFieldType);

                }

                throw new NotImplementedException();
            }
        }



        private StoreFieldType(PhysicalStoreFieldType storeType)
        {
            this.PhysicalStoreType = storeType;
            if (storeType == PhysicalStoreFieldType.LargeString) this.MaximumLength = int.MaxValue;
        }



        private StoreFieldType(PhysicalStoreFieldType storeType, int precision, int scale)
        {
            switch (storeType)
            {
                case PhysicalStoreFieldType.Decimal:
                    if (precision < 1) throw new ArgumentException("Precision must be 1 or greater");
                    if (precision > NumericPrecisionMaximum) throw new ArgumentException("Precision may not be greater than " + NumericPrecisionMaximum.ToString());
                    if (scale < 0) throw new ArgumentException("Scale must be 0 or greater");
                    if (scale > precision) throw new ArgumentException("Scale can not be larger than precision");
                    this.PhysicalStoreType = storeType;
                    this.NumericPrecision = precision;
                    this.NumericScale = scale;
                    return;
            }
            throw new ArgumentException("Specified PhysicalStoreType is not associated with a presision and scale");
        }



        private StoreFieldType(PhysicalStoreFieldType storeType, int maxLength)
        {
            switch (storeType)
            {
                case PhysicalStoreFieldType.String:
                    if (maxLength < 1) throw new ArgumentException("Maximum lenght must be 1 or greater", "maxLength");
                    if (maxLength > StringMaximumLength) throw new ArgumentException("Maximum lenght must be 2048 or less", "maxLength");
                    this.PhysicalStoreType = storeType;
                    this.MaximumLength = maxLength;
                    return;
            }
            throw new ArgumentException("Specified PhysicalStoreType is not associated with a maximum length");
        }
    }
}
