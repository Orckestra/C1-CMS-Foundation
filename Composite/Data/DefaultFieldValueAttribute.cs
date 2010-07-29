using System;
using Composite.Data.DynamicTypes;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]     
    public abstract class DefaultFieldValueAttribute : Attribute
	{
        internal DefaultFieldValueAttribute() { }

        public abstract DefaultValue GetDefaultValue();        
	}



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class DefaultFieldStringValueAttribute : DefaultFieldValueAttribute
    {
        private string _defaultValue;

        public DefaultFieldStringValueAttribute(string defaultValue)
        {
            if (defaultValue == null) throw new ArgumentNullException("defaultValue");
            _defaultValue = defaultValue;
        }

        public override DefaultValue GetDefaultValue()
        {
            return DefaultValue.String(_defaultValue);
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class DefaultFieldIntValueAttribute : DefaultFieldValueAttribute
    {
        private int _defaultValue;

        public DefaultFieldIntValueAttribute(int defaultValue)
        {
            _defaultValue = defaultValue;
        }

        public override DefaultValue GetDefaultValue()
        {
            return DefaultValue.Integer(_defaultValue);
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class DefaultFieldDecimalValueAttribute : DefaultFieldValueAttribute
    {
        private decimal _defaultValue;

        /// <summary>
        /// Decimals are not allowed as attribute parameter values. They are structs.
        /// Use int value.
        /// </summary>
        /// <param name="defaultValue"></param>
        public DefaultFieldDecimalValueAttribute(int defaultValue)
        {
            _defaultValue = defaultValue;
        }

        public override DefaultValue GetDefaultValue()
        {
            return DefaultValue.Decimal(_defaultValue);
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class DefaultFieldBoolValueAttribute : DefaultFieldValueAttribute
    {
        private bool _defaultValue;

        public DefaultFieldBoolValueAttribute(bool defaultValue)
        {
            _defaultValue = defaultValue;
        }

        public override DefaultValue GetDefaultValue()
        {
            return DefaultValue.Boolean(_defaultValue);
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class DefaultFieldGuidValueAttribute : DefaultFieldValueAttribute
    {
        private Guid _defaultValue;

        public DefaultFieldGuidValueAttribute(string guidString)
        {
            _defaultValue = new Guid(guidString);
        }

        public override DefaultValue GetDefaultValue()
        {
            return DefaultValue.Guid(_defaultValue);
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class DefaultFieldNewGuidValueAttribute : DefaultFieldValueAttribute
    {
        public DefaultFieldNewGuidValueAttribute()
        {
        }

        public override DefaultValue GetDefaultValue()
        {
            return DefaultValue.NewGuid;
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class DefaultFieldNowDateTimeValueAttribute : DefaultFieldValueAttribute
    {
        public DefaultFieldNowDateTimeValueAttribute()
        {
        }

        public override DefaultValue GetDefaultValue()
        {
            return DefaultValue.Now;
        }
    }
}
