using System;
using System.ComponentModel;
using System.Globalization;

namespace Composite.ResourceSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [TypeConverter(typeof(IconSizeConverter))]
    public enum IconSize
    {
        Normal = 16,
        Large = 24,
        XLarge = 32
    }


    internal class IconSizeConverter : TypeConverter
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
                case "normal":
                    return IconSize.Normal;

                case "large":
                    return IconSize.Large;

                case "xlarge":
                    return IconSize.XLarge;

                default:
                    throw new FormatException(String.Format("{0} is not a valid IconSize - use Normal, Large or XLarge", value));
            }
        }
    }
}
