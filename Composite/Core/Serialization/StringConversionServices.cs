using System;
using System.Linq;
using System.Text;
using System.ComponentModel;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Globalization;
using System.Reflection;
using System.Collections.Concurrent;


namespace Composite.Core.Serialization
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class StringConversionServices
    {
        private const string _unencodedValueMarker = "'";
        private const string _encodedValueMarker = "\\'";

        private const string _unencodedEqualAndValueMarker = "=" + _unencodedValueMarker;

        private const string _keyValuePairRegExPattern = @"\s*(?<Key>[^=\s]*)\s*=\s*(?<IsNull>null|" + _unencodedValueMarker + @"(?<Value>[^" + _unencodedValueMarker + @"\\\r\n]*(\\.[^" + _unencodedValueMarker + @"\\\r\n]*)*)" + _unencodedValueMarker + @")\s*,*\s*";
        private static Regex _keyValuePairRegEx = new Regex(_keyValuePairRegExPattern, RegexOptions.Compiled);

        private const string _listElementRegExPattern = @"\s*" + _unencodedValueMarker + @"(?<Value>[^" + _unencodedValueMarker + @"\\\r\n]*(\\.[^" + _unencodedValueMarker + @"\\\r\n]*)*)" + _unencodedValueMarker + @"\s*,*\s*";
        private static Regex _listElementRegEx = new Regex(_listElementRegExPattern, RegexOptions.Compiled);

        private static readonly NumberFormatInfo _numberFormatInfo = CultureInfo.InvariantCulture.NumberFormat;

        // Caching
        private static readonly ConcurrentDictionary<Type, MethodInfo> _serializeKeyValuePairMethodInfoCache = new ConcurrentDictionary<Type, MethodInfo>();
        private static readonly ConcurrentDictionary<Type, MethodInfo> _deserializeValueMethodInfoCache = new ConcurrentDictionary<Type, MethodInfo>();


        #region DateTime
        /// <exclude />
        public static void SerializeKeyValuePair<PT>(StringBuilder builder, string propertyName, DateTime propertyValue)
        {
            builder.Append(propertyName);
            builder.Append(_unencodedEqualAndValueMarker);
            
            TypeConverter tc = TypeDescriptor.GetConverter(typeof(DateTime));
            builder.Append(tc.ConvertToString(propertyValue));

            builder.Append(_unencodedValueMarker);
        }


        /// <exclude />
        public static void SerializeKeyValuePair(StringBuilder builder, string propertyName, DateTime propertyValue)
        {
            SerializeKeyValuePair<DateTime>(builder, propertyName, propertyValue);
        }


        /// <exclude />
        public static DateTime DeserializeValue<PT>(string stringRepresentation, DateTime deserializationTarget)
        {
            if (stringRepresentation == null)
            {
                return default(DateTime);
            }

            TypeConverter tc = TypeDescriptor.GetConverter(typeof(DateTime));
            return (DateTime)tc.ConvertFromString(stringRepresentation);
        }


        /// <exclude />
        public static DateTime DeserializeValueDateTime(string stringRepresentation)
        {
            return DeserializeValue<DateTime>(stringRepresentation, DateTime.Now);
        }
        #endregion


        #region int
        /// <exclude />
        public static void SerializeKeyValuePair<PT>(StringBuilder builder, string propertyName, int propertyValue)
        {
            builder.Append(propertyName);
            builder.Append(_unencodedEqualAndValueMarker);
            builder.Append(propertyValue.ToString());
            builder.Append(_unencodedValueMarker);
        }

        /// <exclude />
        public static void SerializeKeyValuePair<PT>(StringBuilder builder, string propertyName, PT propertyValue, IEnumerable<string> filterProperties)
        {
            if (filterProperties != null && !filterProperties.Contains(propertyName))
                return;
            SerializeKeyValuePair<PT>(builder, propertyName, propertyValue);
        }

        /// <exclude />
        public static void SerializeKeyValuePair(StringBuilder builder, string propertyName, int propertyValue)
        {
            SerializeKeyValuePair<int>(builder, propertyName, propertyValue);
        }


        /// <exclude />
        public static int DeserializeValue<PT>(string stringRepresentation, int deserializationTarget)
        {
            if (stringRepresentation == null)
            {
                return default(int);
            }

            return Int32.Parse(stringRepresentation);
        }


        /// <exclude />
        public static int DeserializeValueInt(string stringRepresentation)
        {
            return DeserializeValue<int>(stringRepresentation, default(int));
        }
        #endregion

        #region long
        /// <exclude />
        public static void SerializeKeyValuePair<PT>(StringBuilder builder, string propertyName, long propertyValue)
        {
            builder.Append(propertyName);
            builder.Append(_unencodedEqualAndValueMarker);
            builder.Append(propertyValue.ToString());
            builder.Append(_unencodedValueMarker);
        }


        /// <exclude />
        public static void SerializeKeyValuePair(StringBuilder builder, string propertyName, long propertyValue)
        {
            SerializeKeyValuePair<long>(builder, propertyName, propertyValue);
        }


        /// <exclude />
        public static long DeserializeValue<PT>(string stringRepresentation, long deserializationTarget)
        {
            if (stringRepresentation == null)
            {
                return default(long);
            }

            return long.Parse(stringRepresentation);
        }


        /// <exclude />
        public static long DeserializeValueLong(string stringRepresentation)
        {
            return DeserializeValue<long>(stringRepresentation, default(long));
        }
        #endregion
        
        #region decimal
        /// <exclude />
        public static void SerializeKeyValuePair<PT>(StringBuilder builder, string propertyName, decimal propertyValue)
        {
            builder.Append(propertyName);
            builder.Append(_unencodedEqualAndValueMarker);
            builder.Append(propertyValue.ToString(_numberFormatInfo));
            builder.Append(_unencodedValueMarker);
        }


        /// <exclude />
        public static void SerializeKeyValuePair(StringBuilder builder, string propertyName, decimal propertyValue)
        {
            SerializeKeyValuePair<decimal>(builder, propertyName, propertyValue);
        }


        /// <exclude />
        public static decimal DeserializeValue<PT>(string stringRepresentation, decimal deserializationTarget)
        {
            if (stringRepresentation == null)
            {
                return default(decimal);
            }

            return decimal.Parse(stringRepresentation, _numberFormatInfo);
        }


        /// <exclude />
        public static decimal DeserializeValueDecimal(string stringRepresentation)
        {
            return DeserializeValue<decimal>(stringRepresentation, default(decimal));
        }
        #endregion
        
        #region bool
        /// <exclude />
        public static void SerializeKeyValuePair<PT>(StringBuilder builder, string propertyName, bool propertyValue)
        {
            builder.Append(propertyName);
            builder.Append(_unencodedEqualAndValueMarker);
            builder.Append(propertyValue.ToString());
            builder.Append(_unencodedValueMarker);
        }


        /// <exclude />
        public static void SerializeKeyValuePair(StringBuilder builder, string propertyName, bool propertyValue)
        {
            SerializeKeyValuePair<bool>(builder, propertyName, propertyValue);
        }


        /// <exclude />
        public static bool DeserializeValue<PT>(string stringRepresentation, bool deserializationTarget)
        {
            if (stringRepresentation == null)
            {
                return default(bool);
            }

            return bool.Parse(stringRepresentation);
        }


        /// <exclude />
        public static bool DeserializeValueBool(string stringRepresentation)
        {
            return DeserializeValue<bool>(stringRepresentation, default(bool));
        }
        #endregion

        #region Guid
        /// <exclude />
        public static void SerializeKeyValuePair<PT>(StringBuilder builder, string propertyName, Guid propertyValue)
        {
            builder.Append(propertyName);
            builder.Append(_unencodedEqualAndValueMarker);
            builder.Append(propertyValue.ToString("D"));
            builder.Append(_unencodedValueMarker);
        }


        /// <exclude />
        public static void SerializeKeyValuePair(StringBuilder builder, string propertyName, Guid propertyValue)
        {
            SerializeKeyValuePair<Guid>(builder, propertyName, propertyValue);
        }


        /// <exclude />
        public static Guid DeserializeValue<PT>(string stringRepresentation, Guid deserializationTarget)
        {
            if (stringRepresentation == null)
            {
                return default(Guid);
            }

            return new Guid(stringRepresentation);
        }


        /// <exclude />
        public static Guid DeserializeValueGuid(string stringRepresentation)
        {
            return DeserializeValue<Guid>(stringRepresentation, Guid.Empty);
        }
        #endregion

        #region Type
        /// <exclude />
        public static void SerializeKeyValuePair<PT>(StringBuilder builder, string propertyName, Type propertyValue)
        {
            if (null == propertyValue)
            {
                builder.Append(propertyName);
                builder.Append("=null");
            }
            else
            {

                builder.Append(propertyName);
                builder.Append(_unencodedEqualAndValueMarker);
                string typeString = String.Format("{0}, {1}", propertyValue.FullName, propertyValue.Assembly.FullName.Split(',')[0]);
                builder.Append(typeString);
                builder.Append(_unencodedValueMarker);
            }
        }


        /// <exclude />
        public static void SerializeKeyValuePair(StringBuilder builder, string propertyName, Type propertyValue)
        {
            SerializeKeyValuePair<Type>(builder, propertyName, propertyValue);
        }


        /// <exclude />
        public static Type DeserializeValue<PT>(string stringRepresentation, Type deserializationTarget)
        {
            if (stringRepresentation == null)
            {
                return default(Type);
            }

            return Type.GetType(stringRepresentation);
        }


        /// <exclude />
        public static Type DeserializeValueType(string stringRepresentation)
        {
            return DeserializeValue<Type>(stringRepresentation, default(Type));
        }
        #endregion

        #region string
        /// <exclude />
        public static void SerializeKeyValuePair<PT>(StringBuilder builder, string propertyName, string propertyValue)
        {
            if (null == propertyValue)
            {
                builder.Append(propertyName);
                builder.Append("=null");
            }
            else
            {
                builder.Append(propertyName);
                builder.Append(_unencodedEqualAndValueMarker);
                builder.Append(Escape(propertyValue));
                builder.Append(_unencodedValueMarker);
            }
        }


        /// <exclude />
        public static void SerializeKeyValuePair(StringBuilder builder, string propertyName, string propertyValue)
        {
            SerializeKeyValuePair<string>(builder, propertyName, propertyValue);
        }


        /// <exclude />
        public static string DeserializeValue<PT>(string stringRepresentation, string deserializationTarget)
        {
            if (stringRepresentation == null)
            {
                return default(string);
            }

            return Unescape(stringRepresentation);
        }


        /// <exclude />
        public static string DeserializeValueString(string stringRepresentation)
        {
            return DeserializeValue<string>(stringRepresentation, "");
        }
        #endregion

        #region Generic type
        /// <exclude />
        public static void SerializeKeyValuePair<PT>(StringBuilder builder, string propertyName, PT propertyValue)
        {
            if (null == propertyValue)
            {
                builder.Append(propertyName);
                builder.Append("=null");
            }
            else
            {
                TypeConverter tc = TypeDescriptor.GetConverter(typeof(PT));

                builder.Append(propertyName);
                builder.Append(_unencodedEqualAndValueMarker);
                builder.Append(Escape(tc.ConvertToString(propertyValue)));
                builder.Append(_unencodedValueMarker);
            }
        }


        /// <exclude />
        public static PT DeserializeValue<PT>(string stringRepresentation, PT deserializationTarget)
        {
            if (stringRepresentation == null)
            {
                return default(PT);
            }

            TypeConverter tc = TypeDescriptor.GetConverter(typeof(PT));
            return (PT)tc.ConvertFromString(Unescape(stringRepresentation));
        }


        /// <exclude />
        public static PT DeserializeValue<PT>(string stringRepresentation)
            where PT : class
        {
            return DeserializeValue<PT>(stringRepresentation, (PT)null);
        }
        #endregion


        #region array ([])
        /// <exclude />
        public static void SerializeKeyValueArrayPair<PT>(StringBuilder builder, string propertyName, PT[] propertyValue)
        {
            if (null != propertyValue)
            {
                TypeConverter tc = TypeDescriptor.GetConverter(typeof(PT));

                Converter<PT, string> innerConverter = new Converter<PT, string>(
                    delegate(PT target)
                    {
                        return Escape(tc.ConvertToString(target));
                    }
                );

                string[] valuesAsStringArray = Array.ConvertAll<PT, string>(propertyValue as PT[], innerConverter);

                StringBuilder sb = new StringBuilder();
                bool isFirst = true;

                foreach (string value in valuesAsStringArray)
                {
                    if (isFirst)
                    {
                        isFirst = false;
                    }
                    {
                        sb.Append(", ");
                    }

                    sb.Append(string.Format("{0}{1}{0}", _unencodedValueMarker, value));
                }

                builder.Append(propertyName);
                builder.Append(_unencodedEqualAndValueMarker);
                builder.Append(Escape(sb.ToString()));
                builder.Append(_unencodedValueMarker);
            }
            else
            {
                // null value
                builder.Append(propertyName);
                builder.Append("=null");
            }
        }

        /// <exclude />
        public static void SerializeKeyValueArrayPair<PT>(StringBuilder builder, string propertyName, PT[] propertyValue,IEnumerable<string> filterProperties)
        {
            if (filterProperties != null && !filterProperties.Contains(propertyName))
                return;
            SerializeKeyValueArrayPair<PT>(builder, propertyName, propertyValue);
        }

        /// <exclude />
        public static PT[] DeserializeValueArray<PT>(string stringRepresentation, PT[] deserializationTarget)
        {
            if (stringRepresentation != null)
            {
                string unescapedStringRepresentation = Unescape(stringRepresentation);

                string[] valuesAsStringArray = ParseElementList(unescapedStringRepresentation);

                TypeConverter tc = TypeDescriptor.GetConverter(typeof(PT));

                Converter<string, PT> innerConverter = new Converter<string, PT>(
                    delegate(string source)
                    {
                        return (PT)tc.ConvertFromString(Unescape(source));
                    }
                );

                PT[] resultArray = Array.ConvertAll<string, PT>(valuesAsStringArray, innerConverter);

                return resultArray;
            }
            else
            {
                return null;
            }
        }


        /// <exclude />
        public static PT[] DeserializeValueArray<PT>(string stringRepresentation)
        {
            return DeserializeValueArray<PT>(stringRepresentation, (PT[])null);
        }
        #endregion


        /// <exclude />
        public static void SerializeKeyValuePair(StringBuilder builder, string propertyName, object propertyValue, Type propertyType)
        {
            Func<Type, MethodInfo> factory = f =>
            {
                MethodInfo method =
                    (from mi in typeof(StringConversionServices).GetMethods(BindingFlags.Public | BindingFlags.Static)
                     where mi.Name == "SerializeKeyValuePair" &&
                           mi.IsGenericMethodDefinition &&
                           mi.GetParameters().Length == 3 &&
                           mi.GetParameters()[2].ParameterType.IsGenericParameter 
                     select mi).SingleOrDefault();

                method = method.MakeGenericMethod(new Type[] { f });

                return method;
            };

            MethodInfo methodInfo = _serializeKeyValuePairMethodInfoCache.GetOrAdd(propertyType, factory);

            methodInfo.Invoke(null, new object[] { builder, propertyName, propertyValue });
        }



        /// <exclude />
        public static object DeserializeValue(string stringRepresentation, Type propertyType)
        {
            Func<Type, MethodInfo> factory = f =>
            {
                MethodInfo method =
                    (from mi in typeof(StringConversionServices).GetMethods(BindingFlags.Public | BindingFlags.Static)
                     where mi.Name == "DeserializeValue" &&
                           mi.IsGenericMethodDefinition &&
                           mi.GetParameters().Length == 2 &&
                           mi.GetParameters()[1].ParameterType.IsGenericParameter 
                     select mi).SingleOrDefault();                

                method = method.MakeGenericMethod(new Type[] { f });

                return method;
            };

            object defaultValue;
            if (propertyType == typeof(Guid)) defaultValue = default(Guid);
            else if (propertyType == typeof(string)) defaultValue = default(string);
            else if (propertyType == typeof(int)) defaultValue = default(int);
            else if (propertyType == typeof(DateTime)) defaultValue = default(DateTime);
            else if (propertyType == typeof(bool)) defaultValue = default(bool);
            else if (propertyType == typeof(decimal)) defaultValue = default(decimal);
            else if (propertyType == typeof(long)) defaultValue = default(long);
            else defaultValue = null;

            MethodInfo methodInfo = _deserializeValueMethodInfoCache.GetOrAdd(propertyType, factory);
            
            object result = methodInfo.Invoke(null, new object[] { stringRepresentation, defaultValue });

            return result;
        }



        /// <exclude />
        public static Dictionary<string, string> ParseKeyValueCollection(string keyValueCollectionString)
        {
            Dictionary<string, string> parsed = new Dictionary<string, string>();

            MatchCollection matches = _keyValuePairRegEx.Matches(keyValueCollectionString);

            foreach (Match m in matches)
            {
                string key = m.Groups["Key"].Value;

                if (m.Groups["IsNull"].Value == "null")
                {
                    parsed.Add(key, null);
                }
                else
                {
                    string value = m.Groups["Value"].Value;

                    parsed.Add(key, value);
                }
            }

            return parsed;
        }


        private static string[] ParseElementList(string elements)
        {
            MatchCollection matches = _listElementRegEx.Matches(elements);

            string[] result = new string[matches.Count];

            int i = 0;
            foreach (Match m in matches)
            {
                result[i++] = m.Groups["Value"].Value;
            }

            return result;
        }


        private static string Escape(string sourceString)
        {
            return Regex.Escape(sourceString).Replace(_unencodedValueMarker, _encodedValueMarker);
        }


        private static string Unescape(string escapedStringRepresentation)
        {
            return Regex.Unescape(escapedStringRepresentation.Replace(_encodedValueMarker, _unencodedValueMarker));
        }
    }
}
