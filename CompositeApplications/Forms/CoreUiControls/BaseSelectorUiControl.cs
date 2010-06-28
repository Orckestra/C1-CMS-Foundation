using System;
using System.Collections;
using System.ComponentModel;
using System.Globalization;
using Composite.Forms.Foundation;

namespace Composite.Forms.CoreUiControls
{
    internal abstract class BaseSelectorUiControl : UiControl
    {
        public BaseSelectorUiControl()
        {
            this.OptionsKeyField = ".";
            this.OptionsLabelField = ".";
            this.Required = true;
        }

        [RequiredValue()]
        [FormsProperty()]
        public IEnumerable Options { get; set; }

        [FormsProperty()]
        public string OptionsKeyField { get; set; }

        [FormsProperty()]
        public string OptionsLabelField { get; set; }

        [FormsProperty()]
        public SelectorBindingType BindingType { get; set; }

        [FormsProperty()]
        public bool Required { get; set; }

        [BindableProperty()]
        [FormsProperty()]
        public EventHandler SelectedIndexChangedEventHandler { get; set; }
    }


    [TypeConverter(typeof(SelectorBindingTypeConverter))]
    internal enum SelectorBindingType
    {
        BindToObject,
        BindToKeyFieldValue
    }


    internal class SelectorBindingTypeConverter : TypeConverter
    {
        public override bool CanConvertFrom(ITypeDescriptorContext context, Type sourceType)
        {
            return sourceType == typeof(string);
        }

        public override object ConvertFrom(ITypeDescriptorContext context, CultureInfo culture, object value)
        {
            string val = value as string;

            val = val.ToLower();

            switch (val)
            {
                case "bindtoobject":
                    return SelectorBindingType.BindToObject;

                case "bindtokeyfieldvalue":
                    return SelectorBindingType.BindToKeyFieldValue;

                default:
                    throw new FormatException(String.Format("{0} is not a valid Selector BindingType value - use BindToObject or BindToKeyFieldValue", value));
            }
        }
    }
}
