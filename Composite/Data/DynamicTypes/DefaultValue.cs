using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using Composite.Core.Instrumentation;
using Composite.Core.Serialization;


namespace Composite.Data.DynamicTypes
{
    /// <summary>
    /// Represents a default value for a data type field
    /// </summary>
    [Serializable]
    public sealed class DefaultValue : IComparable
    {
        private readonly object _value;
        private readonly DefaultValueType _valueType;

        private readonly RandomStringSettings _randomStringSettings;

        /// <summary>
        /// String default value
        /// </summary>
        /// <param name="defaultValue">value</param>
        /// <returns></returns>
        public static DefaultValue String(string defaultValue) { return new DefaultValue(defaultValue); }

        /// <summary>
        /// Int default value
        /// </summary>
        /// <param name="defaultValue">value</param>
        /// <returns></returns>
        public static DefaultValue Integer(int defaultValue) { return new DefaultValue(defaultValue); }

        /// <summary>
        /// Decimal default value
        /// </summary>
        /// <param name="defaultValue">value</param>
        /// <returns></returns>
        public static DefaultValue Decimal(decimal defaultValue) { return new DefaultValue(defaultValue); }

        /// <summary>
        /// Bool default value
        /// </summary>
        /// <param name="defaultValue">value</param>
        /// <returns></returns>
        public static DefaultValue Boolean(bool defaultValue) { return new DefaultValue(defaultValue); }

        /// <summary>
        /// DateTime default value
        /// </summary>
        /// <param name="defaultValue">value</param>
        /// <returns></returns>
        public static DefaultValue DateTime(DateTime defaultValue) { return new DefaultValue(defaultValue); }

        /// <summary>
        /// Guid default value
        /// </summary>
        /// <param name="defaultValue">value</param>
        /// <returns></returns>
        public static DefaultValue Guid(Guid defaultValue) { return new DefaultValue(defaultValue); }

        /// <summary>
        /// 'Now' as a default value (time stamp)
        /// </summary>
        /// <returns></returns>
        public static DefaultValue Now { get { return new DefaultValue(DefaultValueType.DateTimeNow); } }

        /// <summary>
        /// New Guid as default value. Generate a new unique Guid.
        /// </summary>
        /// <returns></returns>
        public static DefaultValue NewGuid { get { return new DefaultValue(DefaultValueType.NewGuid); } }


        /// <summary>
        /// A new value is a new random string
        /// </summary>
        /// <returns></returns>
        public static DefaultValue RandomString(int length, bool checkCollisions)
        {
            return new DefaultValue(new RandomStringSettings(length, checkCollisions)); 
        }


        /// <summary>
        /// The default value.
        /// </summary>
        public object Value
        {
            get
            {
                switch (_valueType)
                {
                    case DefaultValueType.DateTimeNow:
                        return System.DateTime.Now;

                    case DefaultValueType.NewGuid:
                        return System.Guid.NewGuid();

                    case DefaultValueType.RandomString:
                        return null; // A new value is generated and set in an "OnBeforeAdd" event handler.

                    default:
                        return _value;
                }
            }
        }


        /// <summary>
        /// Type of the default value
        /// </summary>
        public DefaultValueType ValueType { get { return _valueType; } }


        /// <exclude />
        public DefaultValue Clone()
        {
            switch (_valueType)
            {
                case DefaultValueType.Boolean:
                    return DefaultValue.Boolean((bool)_value);

                case DefaultValueType.DateTime:
                    return DefaultValue.DateTime((DateTime)_value);

                case DefaultValueType.DateTimeNow:
                    return DefaultValue.Now;

                case DefaultValueType.Decimal:
                    return DefaultValue.Decimal((decimal)_value);

                case DefaultValueType.Guid:
                    return DefaultValue.Guid((Guid)_value);

                case DefaultValueType.Integer:
                    return DefaultValue.Integer((int)_value);

                case DefaultValueType.NewGuid:
                    return DefaultValue.NewGuid;

                case DefaultValueType.String:
                    return DefaultValue.String((string)_value);

                case DefaultValueType.RandomString:
                    return new DefaultValue(_randomStringSettings);

                default:
                    throw new NotImplementedException();
            }
        }


        /// <exclude />
        public string Serialize()
        {
            var sb = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(sb, "ValueType", this.ValueType.ToString());
            
            if (!IsDynamicValue && this.Value != null)
            {
                StringConversionServices.SerializeKeyValuePair(sb, "Value", SerializeDefaultValue(ValueType, this.Value));
            }

            if (_randomStringSettings != null)
            {
                _randomStringSettings.Serialize(sb);
            }

            return sb.ToString();
        }


        private static string SerializeDefaultValue(DefaultValueType type, object value)
        {
            Verify.ArgumentNotNull(value, "value");

            switch (type)
                {
                    case DefaultValueType.Boolean:
                        return ((bool)value).ToString(CultureInfo.InvariantCulture);

                    case DefaultValueType.DateTime:
                        return ((DateTime)value).ToString(CultureInfo.InvariantCulture);

                    case DefaultValueType.Decimal:
                        return ((Decimal)value).ToString(CultureInfo.InvariantCulture);

                    case DefaultValueType.Guid:
                        return value.ToString();

                    case DefaultValueType.Integer:
                        return ((Int32)value).ToString(CultureInfo.InvariantCulture);

                    case DefaultValueType.String:
                        return (string)value;

                    case DefaultValueType.RandomString:
                    case DefaultValueType.NewGuid:
                    case DefaultValueType.DateTimeNow:
                        return string.Empty;

                    default:
                        throw new NotImplementedException("DefaultValueType = " + type);
                }
        }


        /// <exclude />
        public static DefaultValue Deserialize(string serializedData)
        {
            Verify.ArgumentNotNullOrEmpty(serializedData, "serializedData");

            using (TimerProfilerFacade.CreateTimerProfiler())
            {
                Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedData);

                Verify.That(dic.ContainsKey("ValueType"), "Wrong serialized format");

                string valueTypeString = StringConversionServices.DeserializeValue<string>(dic["ValueType"]);
                var valueType = (DefaultValueType)Enum.Parse(typeof(DefaultValueType), valueTypeString);

                bool hasValue = dic.ContainsKey("Value");

                switch (valueType)
                {
                    case DefaultValueType.Boolean:
                        Verify.That(hasValue, "Wrong serialized format");
                        bool boolValue = StringConversionServices.DeserializeValueBool(dic["Value"]);
                        return DefaultValue.Boolean(boolValue);

                    case DefaultValueType.DateTime:
                        Verify.That(hasValue, "Wrong serialized format");
                        DateTime dateTimeValue = StringConversionServices.DeserializeValueDateTime(dic["Value"]);
                        return DefaultValue.DateTime(dateTimeValue);

                    case DefaultValueType.DateTimeNow:
                        return DefaultValue.Now;

                    case DefaultValueType.Decimal:
                        Verify.That(hasValue, "Wrong serialized format");
                        decimal decimalValue = StringConversionServices.DeserializeValueDecimal(dic["Value"]);
                        return DefaultValue.Decimal(decimalValue);

                    case DefaultValueType.Guid:
                        Verify.That(hasValue, "Wrong serialized format");
                        Guid guidValue = StringConversionServices.DeserializeValueGuid(dic["Value"]);
                        return DefaultValue.Guid(guidValue);

                    case DefaultValueType.Integer:
                        Verify.That(hasValue, "Wrong serialized format");
                        int intValue = StringConversionServices.DeserializeValueInt(dic["Value"]);
                        return DefaultValue.Integer(intValue);

                    case DefaultValueType.NewGuid:
                        return DefaultValue.NewGuid;

                    case DefaultValueType.String:
                        string stringValue = null;
                        if (hasValue)
                        {
                            stringValue = StringConversionServices.DeserializeValueString(dic["Value"]);
                        }
                        return DefaultValue.String(stringValue);

                    case DefaultValueType.RandomString:
                        var settings = RandomStringSettings.Deserialize(dic);

                        return new DefaultValue(settings);

                    default:
                        throw new NotImplementedException("DefaultValueType = " + valueType);
                }
            }                    
        }



        /// <exclude />
        public override string ToString()
        {
            return Serialize();
        }



        internal CodeAttributeDeclaration GetCodeAttributeDeclaration()
        {
            CodeAttributeDeclaration codeAttributeDeclaration;

            switch (this.ValueType)
            {
                case DefaultValueType.DateTimeNow:
                    codeAttributeDeclaration = new CodeAttributeDeclaration(new CodeTypeReference(typeof(DefaultFieldNowDateTimeValueAttribute)));
                    break;

                case DefaultValueType.Guid:
                    codeAttributeDeclaration = new CodeAttributeDeclaration(new CodeTypeReference(typeof(DefaultFieldGuidValueAttribute)),
                        new CodeAttributeArgument(new CodePrimitiveExpression(this.Value.ToString())));
                    break;

                case DefaultValueType.Integer :
                    codeAttributeDeclaration = new CodeAttributeDeclaration(new CodeTypeReference(typeof(DefaultFieldIntValueAttribute)),
                        new CodeAttributeArgument(new CodePrimitiveExpression(this.Value)));
                    break;

                case DefaultValueType.Decimal:
                    codeAttributeDeclaration = new CodeAttributeDeclaration(new CodeTypeReference(typeof(DefaultFieldDecimalValueAttribute)),
                        new CodeAttributeArgument(new CodePrimitiveExpression(decimal.ToInt32((decimal)this.Value))));
                    break;

                case DefaultValueType.NewGuid:
                    codeAttributeDeclaration = new CodeAttributeDeclaration(new CodeTypeReference(typeof(DefaultFieldNewGuidValueAttribute)));
                    break;

                case DefaultValueType.String:
                    codeAttributeDeclaration = new CodeAttributeDeclaration(new CodeTypeReference(typeof(DefaultFieldStringValueAttribute)),
                        new CodeAttributeArgument(new CodePrimitiveExpression(this.Value)));
                    break;

                case DefaultValueType.RandomString:
                    codeAttributeDeclaration = new CodeAttributeDeclaration(new CodeTypeReference(typeof(DefaultFieldRandomStringValueAttribute)),
                        new CodeAttributeArgument(new CodePrimitiveExpression(_randomStringSettings.Length)),
                        new CodeAttributeArgument(new CodePrimitiveExpression(_randomStringSettings.CheckCollisions)));
                    break;

                case DefaultValueType.Boolean:
                    codeAttributeDeclaration = new CodeAttributeDeclaration(new CodeTypeReference(typeof(DefaultFieldBoolValueAttribute)),
                        new CodeAttributeArgument(new CodePrimitiveExpression(this.Value)));
                    break;

                    
                default:
                    throw new NotImplementedException();
            }

            return codeAttributeDeclaration;
        }

        internal bool IsAssignableTo(StoreFieldType storeType)
        {
            switch (this.ValueType)
            {
                case DefaultValueType.DateTime:
                case DefaultValueType.DateTimeNow:
                    return storeType.IsDateTime || storeType.IsString;
                case DefaultValueType.String:
                    if (!storeType.IsString) return false;
                    return this.Value == null || storeType.MaximumLength >= this.Value.ToString().Length;
                case DefaultValueType.RandomString:
                    return storeType.IsString && storeType.MaximumLength >= _randomStringSettings.Length;
                case DefaultValueType.Integer:
                    return storeType.IsNumeric || storeType.IsString;
                case DefaultValueType.Decimal:
                    return storeType.IsDecimal;
                case DefaultValueType.Boolean:
                    return storeType.IsBoolean || storeType.IsString;
                case DefaultValueType.Guid:
                case DefaultValueType.NewGuid:
                    return storeType.IsGuid || storeType.IsString;
            }

            throw new ArgumentException("Unknown store type");
        }

        private DefaultValue(RandomStringSettings randomStringSettings)
        {
            _valueType = DefaultValueType.RandomString;
            _randomStringSettings = randomStringSettings;
        }


        private DefaultValue(string defaultValue)
        {
            _valueType = DefaultValueType.String;
            _value = defaultValue;
        }


        private DefaultValue(int defaultValue)
        {
            _valueType = DefaultValueType.Integer;
            _value = defaultValue;
        }


        private DefaultValue(decimal defaultValue)
        {
            _valueType = DefaultValueType.Decimal;
            _value = defaultValue;
        }


        private DefaultValue(bool defaultValue)
        {
            _valueType = DefaultValueType.Boolean;
            _value = defaultValue;
        }


        private DefaultValue(DateTime defaultValue)
        {
            _valueType = DefaultValueType.DateTime;
            _value = defaultValue;
        }


        private DefaultValue(Guid defaultValue)
        {
            _valueType = DefaultValueType.Guid;
            _value = defaultValue;
        }


        private DefaultValue(DefaultValueType defaultValueType)
        {
            switch (defaultValueType)
            {
                case DefaultValueType.DateTimeNow:
                case DefaultValueType.NewGuid:
                    _valueType = defaultValueType;
                    return;
            }

            throw new ArgumentException("Provided value type can not be constructed using this constructor. Use other constructor.");
        }

        private bool IsDynamicValue
        {
            get
            {
                return ValueType == DefaultValueType.DateTimeNow 
                    || ValueType == DefaultValueType.NewGuid
                    || ValueType == DefaultValueType.RandomString;
            }
        }


        /// <exclude />
        public int CompareTo(object obj)
        {
            if (obj == null) throw new ArgumentNullException();
            if (obj.GetType() != typeof(DefaultValue)) throw new ArithmeticException(string.Format("Expected object of type {0}", typeof(DefaultValue)));

            var compareTo = (DefaultValue)obj;

            if (this.ValueType != compareTo.ValueType) return -1;

            switch (_valueType)
            {
                case DefaultValueType.DateTimeNow:
                case DefaultValueType.NewGuid:
                    return 0;

                case DefaultValueType.String:
                    if (this.Value == null)
                    {
                        return compareTo.Value == null ? 0 : -1;
                    }

                    return string.Compare(this.Value.ToString(), compareTo.Value.ToString(), StringComparison.Ordinal);

                case DefaultValueType.Integer:
                    return ((int)this.Value).CompareTo((int)compareTo.Value);

                case DefaultValueType.Decimal:
                    return ((Decimal)this.Value).CompareTo((Decimal)compareTo.Value);

                case DefaultValueType.Boolean:
                    return ((bool)this.Value).CompareTo((bool)compareTo.Value);

                case DefaultValueType.DateTime:
                    return ((DateTime)this.Value).CompareTo((DateTime)compareTo.Value);

                case DefaultValueType.Guid:
                    return string.Compare(this.Value.ToString(), compareTo.Value.ToString(), StringComparison.OrdinalIgnoreCase);

                case DefaultValueType.RandomString:
                    return string.Compare(_randomStringSettings.ToString(), compareTo._randomStringSettings.ToString(), StringComparison.OrdinalIgnoreCase);

                default:
                    throw new NotImplementedException("Unable to compare DefaultValue objects - unknown case of DefaultValueType");
            }
        }


        /// <exclude />
        public override bool Equals(object obj)
        {
            return obj is DefaultValue && CompareTo(obj) == 0;
        }


        /// <exclude />
        public override int GetHashCode()
        {
            return ToString().GetHashCode();
        }


        [Serializable]
        private class RandomStringSettings
        {
            public RandomStringSettings(int length, bool checkCollisions)
            {
                Length = length;
                CheckCollisions = checkCollisions;
            }

            public void Serialize(StringBuilder sb)
            {
                StringConversionServices.SerializeKeyValuePair(sb, "Length", Length);
                StringConversionServices.SerializeKeyValuePair(sb, "CheckCollisions", CheckCollisions);
            }

            public static RandomStringSettings Deserialize(Dictionary<string, string> values)
            {
                return new RandomStringSettings(
                    StringConversionServices.DeserializeValueInt(values["Length"]),
                    StringConversionServices.DeserializeValueBool(values["CheckCollisions"]));
            }



            public int Length { get; private set; }
            public bool CheckCollisions { get; private set; }

            public override string ToString()
            {
                return string.Format("{0},{1}", Length, CheckCollisions);
            }
        }

    }


    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum DefaultValueType
    {
        /// <exclude />
        DateTimeNow = 0,

        /// <exclude />
        String = 1,

        /// <exclude />
        Integer = 2,

        /// <exclude />
        Decimal = 3,

        /// <exclude />
        Boolean = 4,

        /// <exclude />
        DateTime = 5,

        /// <exclude />
        Guid = 6,

        /// <exclude />
        NewGuid = 7,

        /// <exclude />
        RandomString = 8,
    }
}
