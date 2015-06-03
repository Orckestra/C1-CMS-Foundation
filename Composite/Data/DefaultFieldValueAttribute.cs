using System;
using Composite.Data.DynamicTypes;


namespace Composite.Data
{
    /// <summary>    
    /// This abstract class is used by data providers when a new column is added to a table. Extend this class to create your own.
    /// </summary>
    public abstract class DefaultFieldValueAttribute : Attribute
	{
        internal DefaultFieldValueAttribute() { }

        /// <exclude />
        public abstract DefaultValue GetDefaultValue();        
	}



    /// <summary>    
    /// Associate a static default value to a string property on a data type.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class DefaultFieldStringValueAttribute : DefaultFieldValueAttribute
    {
        private readonly string _defaultValue;


        /// <summary>    
        /// Associate a static default value to a string property on a data type.
        /// </summary>
        public DefaultFieldStringValueAttribute(string defaultValue)
        {
            if (defaultValue == null) throw new ArgumentNullException("defaultValue");
            _defaultValue = defaultValue;
        }


        /// <exclude />
        public override DefaultValue GetDefaultValue()
        {
            return DefaultValue.String(_defaultValue);
        }
    }



    /// <summary>    
    /// Associate a static default value to an integer property on a data type.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class DefaultFieldIntValueAttribute : DefaultFieldValueAttribute
    {
        private readonly int _defaultValue;


        /// <summary>    
        /// Associate a static default value to an integer property on a data type.
        /// </summary>
        public DefaultFieldIntValueAttribute(int defaultValue)
        {
            _defaultValue = defaultValue;
        }


        /// <exclude />
        public override DefaultValue GetDefaultValue()
        {
            return DefaultValue.Integer(_defaultValue);
        }
    }



    /// <summary>    
    /// Associate a static default value to a decimal property on a data type.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class DefaultFieldDecimalValueAttribute : DefaultFieldValueAttribute
    {
        private readonly decimal _defaultValue;

        /// <summary>
        /// Decimals are not allowed as attribute parameter values. They are structs.
        /// Use int value.
        /// </summary>
        /// <param name="defaultValue"></param>
        public DefaultFieldDecimalValueAttribute(int defaultValue)
        {
            _defaultValue = defaultValue;
        }


        /// <exclude />
        public override DefaultValue GetDefaultValue()
        {
            return DefaultValue.Decimal(_defaultValue);
        }
    }



    /// <summary>    
    /// Associate a static default value to a boolean property on a data type.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class DefaultFieldBoolValueAttribute : DefaultFieldValueAttribute
    {
        private readonly bool _defaultValue;


        /// <summary>    
        /// Associate a static default value to a boolean property on a data type.
        /// </summary>
        public DefaultFieldBoolValueAttribute(bool defaultValue)
        {
            _defaultValue = defaultValue;
        }


        /// <exclude />
        public override DefaultValue GetDefaultValue()
        {
            return DefaultValue.Boolean(_defaultValue);
        }
    }



    /// <summary>    
    /// Associate a static default value to a GUID property on a data type.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class DefaultFieldGuidValueAttribute : DefaultFieldValueAttribute
    {
        private readonly Guid _defaultValue;


        /// <summary>    
        /// Associate a static default value to a GUID property on a data type.
        /// </summary>
        public DefaultFieldGuidValueAttribute(string guidString)
        {
            _defaultValue = new Guid(guidString);
        }


        /// <exclude />
        public override DefaultValue GetDefaultValue()
        {
            return DefaultValue.Guid(_defaultValue);
        }
    }



    /// <summary>    
    /// Associate a random new GUID to a GUID property on a data type.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class DefaultFieldNewGuidValueAttribute : DefaultFieldValueAttribute
    {
        /// <exclude />
        public override DefaultValue GetDefaultValue()
        {
            return DefaultValue.NewGuid;
        }
    }



    /// <summary>    
    /// Associate the current date and time to a DateTime property on a data type.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class DefaultFieldNowDateTimeValueAttribute : DefaultFieldValueAttribute
    {
        /// <exclude />
        public override DefaultValue GetDefaultValue()
        {
            return DefaultValue.Now;
        }
    }
}
