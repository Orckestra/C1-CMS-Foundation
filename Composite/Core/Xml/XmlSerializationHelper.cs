using System;
using System.Xml.Linq;
using Composite.Core.Types;

namespace Composite.Core.Xml
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class XmlSerializationHelper
    {
        /// <summary>
        /// Converts the object into an xml serializable object.
        /// </summary>
        /// <exclude />
        public static object GetSerializableObject(object value)
        {
            if (value == null) return null;

            var type = value.GetType();
            if (type == typeof (string)
                || type == typeof (double)
                || type == typeof (float)
                || type == typeof (decimal)
                || type == typeof (DateTime)
                || type == typeof (DateTimeOffset)
                || type == typeof (TimeSpan))
            {
                return value;
            }

            return ValueTypeConverter.Convert<string>(value);
        }

        /// <exclude />
        public static object Deserialize(XAttribute attribute, Type type)
        {
            if (type == typeof(string)) return (string)attribute;
            if (type == typeof(double) || type == typeof(double?)) return (double)attribute;
            if (type == typeof(float) || type == typeof(float?)) return (float)attribute;
            if (type == typeof(decimal) || type == typeof(decimal?)) return (decimal)attribute;
            if (type == typeof(DateTime) || type == typeof(DateTime?)) return (DateTime)attribute;
            if (type == typeof(DateTimeOffset) || type == typeof(DateTimeOffset?)) return (DateTimeOffset)attribute;
            if (type == typeof(TimeSpan) || type == typeof(TimeSpan?)) return (TimeSpan)attribute;

            return ValueTypeConverter.Convert(attribute.Value, type);
        }
    }
}
