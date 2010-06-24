using System;
using System.Globalization;

namespace Composite.StringExtensions
{
    [Obsolete("Use Composite.Extensions.StringExtensionMethods instead")]
	public static class StringExtensions
	{
        public static string FormatWith(this string format, params object[] args)
        {
            Verify.ArgumentNotNull(format, "format");

            return string.Format(format, args);
        }

        public static bool IsNullOrEmpty(this string str)
        {
            return string.IsNullOrEmpty(str);
        }

        public static bool StartsWith(this string str, string value, bool ignoreCase)
        {
            return str.StartsWith(value, ignoreCase, CultureInfo.InvariantCulture);
        }

        public static bool EndsWith(this string str, string value, bool ignoreCase)
        {
            return str.EndsWith(value, ignoreCase, CultureInfo.InvariantCulture);
        }
	}
}
