using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Xml;
using System.Xml.Linq;
using Composite.C1Console.Users;
using Composite.Core.ResourceSystem;
using Composite.Core.Xml;
using Composite.Data;


namespace Composite.Core.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ValueTypeConverter
    {
        /// <exclude />
        public static object Convert(object value, Type targetType)
        {
            Exception conversionError;
            return TryConvert(value, targetType, out conversionError);
        }

        /// <exclude />
        internal static object TryConvert(object value, Type targetType, out Exception conversionError)
        {
            conversionError = null;

            if (value == null)
            {
                if (targetType.IsPrimitive == false)
                {
                    return null;
                }

                throw new InvalidOperationException(string.Format("Can not convert null to type '{0}'", targetType));
            }

            
            if (targetType.IsAssignableFrom(value.GetType()))
            {
                return value;
            }

            ValueTypeConverterHelperAttribute helper = targetType.GetCustomAttributesRecursively<ValueTypeConverterHelperAttribute>().FirstOrDefault();
            if (helper != null)
            {
                object ret = null;
                if (helper.TryConvert(value, targetType, out ret) == true)
                {
                    return ret;
                }
            }

            ValueTypeConverterHelperAttribute helper2 = value.GetType().GetCustomAttributesRecursively<ValueTypeConverterHelperAttribute>().FirstOrDefault();
            if (helper2 != null)
            {
                object ret = null;
                if (helper2.TryConvert(value, targetType, out ret) == true)
                {
                    return ret;
                }
            }

            if (targetType == typeof(object))
            {
                return value;
            }

            if ((IsGenericEnumerable(value.GetType()) == true) &&
                (IsGenericEnumerable(targetType) == true))
            {
                Type targetItemType = targetType.GetGenericArguments()[0];

                IList targetValue = (IList)Activator.CreateInstance(typeof(List<>).MakeGenericType(new Type[] { targetItemType }));

                foreach (object valueItem in ((IEnumerable)value))
                {
                    object convertedValueItem = Convert(valueItem, targetItemType);

                    targetValue.Add(convertedValueItem);
                }

                return targetValue;
            }

            // Haz item, wantz list of it.
            if ((IsGenericEnumerable(value.GetType()) == false) &&
                (IsGenericEnumerable(targetType) == true))
            {
                Type targetItemType = targetType.GetGenericArguments()[0];

                if (targetItemType.IsAssignableFrom(value.GetType()))
                {
                    IList targetValue = (IList)Activator.CreateInstance(typeof(List<>).MakeGenericType(new Type[] { targetItemType }));
                    targetValue.Add(value);
                    return targetValue;
                }
            }


            if (value.GetType() == typeof(string))
            {
                if (targetType == typeof(Type))
                {
                    return (value as string) != string.Empty ? TypeManager.GetType((string)value) : null;
                }

                if (targetType == typeof(XhtmlDocument))
                {
                    if ((string)value == string.Empty)
                    {
                        return new XhtmlDocument();
                    }
                    return XhtmlDocument.Parse((string)value);
                }

                if (targetType == typeof(XDocument))
                {
                    return XDocument.Parse((string)value);
                }

                if (targetType == typeof(XElement))
                {
                    return XElement.Parse((string)value);
                }

                if (targetType == typeof(IEnumerable<XNode>))
                {
                    try
                    {
                        XElement wrapper = XElement.Parse(string.Format("<wrapper>{0}</wrapper>", value));
                        return wrapper.Nodes();
                    }
                    catch
                    {
                        throw new InvalidCastException(string.Format("Unable to convert string '{0}' to a list of XNodes.", value));
                    }
                }

                if (targetType == typeof(XNamespace))
                {
                    return XNamespace.Get((string)value);
                }

                if(targetType.IsGenericType && targetType.GetGenericTypeDefinition() == typeof(Nullable<>))
                {
                    Type valueType = targetType.GetGenericArguments()[0];
                    if(IsOneOfTheHandledValueTypes(valueType))
                    {
                        if((value as string).Trim().Length == 0)
                        {
                            return null;
                        }

                        return TryConvertValueType(value, valueType, out conversionError);    
                    }
                }


                if(IsOneOfTheHandledValueTypes(targetType))
                {
                    return TryConvertValueType(value, targetType, out conversionError);
                }

                TypeConverter tc = TypeDescriptor.GetConverter(targetType);
                CultureInfo culture = LocalizationScopeManager.CurrentLocalizationScope;
                object convertedResult = tc.ConvertFromString(null, culture, value as string);

                if (convertedResult == null && string.IsNullOrEmpty((string)value) == false)
                    throw new InvalidOperationException(string.Format("Unable to convert string value '{0}' to type '{1}'", value, targetType.FullName));

                return convertedResult;
            }

            if (targetType == typeof(string))
            {
                if (value is Type) return TypeManager.SerializeType((Type)value);
                if (value is DateTime) return XmlConvert.ToString((DateTime)value, XmlDateTimeSerializationMode.Local);
            }

            TypeConverter targetConverter = TypeDescriptor.GetConverter(targetType);
            if (true == targetConverter.CanConvertFrom(value.GetType()))
            {
                return targetConverter.ConvertFrom(null, UserSettings.CultureInfo, value);
            }

            TypeConverter valueConverter = TypeDescriptor.GetConverter(value.GetType());
            if (true == valueConverter.CanConvertTo(targetType))
            {
                return valueConverter.ConvertTo(null, UserSettings.CultureInfo, value, targetType);
            }

            throw new InvalidOperationException(string.Format("No conversion from {0} to {1} could be found", value.GetType().ToString(), targetType.ToString()));
        }


        private static bool IsOneOfTheHandledValueTypes(Type type)
        {
            return type == typeof (bool) || type == typeof (Guid) || type == typeof (int) || type == typeof (Decimal);
        }

        private static object TryConvertValueType(object value, Type targetType, out Exception conversionError)
        {
            conversionError = null;

            if (targetType == typeof(bool))
            {
                // TODO: return validation message
                bool boolResult;
                if (bool.TryParse((string)value, out boolResult) == false)
                {
                    boolResult = false;
                }
                return boolResult;
            }

            if (targetType == typeof(int))
            {
                int intResult = 0;
                try
                {
                    intResult = Int32.Parse((string)value);
                }
                catch(OverflowException)
                {
                    string message = LocalizationFiles.Composite_Management.Validation_Int32_Overflow;
                    conversionError = new InvalidOperationException(message);
                }
                catch (Exception ex)
                {
                    conversionError = ex;
                }

                return intResult;
            }

            if (targetType == typeof(decimal))
            {
                // TODO: return validation message
                decimal decimalResult = 0;
                decimal.TryParse((string)value, out decimalResult);
                return decimalResult;
            }

            if (targetType == typeof(Guid))
            {
                Guid guidResult = Guid.Empty;

                try
                {
                    guidResult = new Guid((string)value);
                }
                catch
                {
                    // TODO: return validation message
                    // Ignore
                }

                return guidResult;
            }

            throw new NotImplementedException("Supported types should be defined in IsOneOfTheHandledValueTypes() method");
        }

        /// <exclude />
        public static T Convert<T>(object value)
        {
            return (T)Convert(value, typeof(T));
        }



        private static bool IsGenericEnumerable(Type type)
        {
            if (type.IsGenericType == false) return false;

            type = type.GetGenericTypeDefinition();

            if (typeof(IEnumerable<>).IsAssignableFrom(type) == true) return true;
            if (typeof(List<>).IsAssignableFrom(type) == true) return true;
            if (typeof(IList<>).IsAssignableFrom(type) == true) return true;

            return false;
        }
    }
}
