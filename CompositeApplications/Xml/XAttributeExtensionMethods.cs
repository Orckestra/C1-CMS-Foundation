using System;
using System.Xml.Linq;


namespace Composite.Xml
{
	internal static class XAttributeExtensionMethods
	{
        public static string GetValueOrDefault(this XAttribute attribute, string defaultValue)
        {
            if (attribute == null) return defaultValue;

            return attribute.Value;
        }



        public static bool TryGetIntValue(this XAttribute attribute, out int value)
        {
            if (attribute == null) throw new ArgumentNullException("attribute");

            value = default(int);
            try
            {
                value = (int)attribute;
            }
            catch(FormatException)
            {
                return false;
            }

            return true;
        }



        public static bool TryGetBoolValue(this XAttribute attribute, out bool value)
        {
            if (attribute == null) throw new ArgumentNullException("attribute");

            value = default(bool);
            try
            {
                value = (bool)attribute;
            }
            catch (FormatException)
            {
                return false;
            }

            return true;
        }



        public static bool TryGetGuidValue(this XAttribute attribute, out Guid value)
        {
            if (attribute == null) throw new ArgumentNullException("attribute");

            value = default(Guid);
            try
            {
                value = (Guid)attribute;
            }
            catch (FormatException)
            {
                return false;
            }

            return true;
        }
	}
}
