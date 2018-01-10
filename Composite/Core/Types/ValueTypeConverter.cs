using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Xml;
using System.Xml.Linq;
using Composite.C1Console.Users;
using Composite.Core.Extensions;
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
        private static readonly MethodInfo NewLazyObjectMethodInfo = StaticReflection.GetGenericMethodInfo(() => NewLazyObject<object>(null));

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
                if (!targetType.IsPrimitive)
                {
                    return null;
                }

                throw new InvalidOperationException(string.Format("Can not convert null to type '{0}'", targetType));
            }

            
            if (targetType.IsInstanceOfType(value))
            {
                return value;
            }

            if (targetType.IsLazyGenericType() && !value.GetType().IsLazyGenericType())
            {
                Type genericArgument = targetType.GetGenericArguments()[0];

                object convertedValue = TryConvert(value, genericArgument, out conversionError);

                return CreateLazyObject(() => convertedValue, genericArgument);
            }


            var helper = targetType.GetCustomAttributesRecursively<ValueTypeConverterHelperAttribute>().FirstOrDefault();
            if (helper != null)
            {
                object ret;
                if (helper.TryConvert(value, targetType, out ret))
                {
                    return ret;
                }
            }

            var helper2 = value.GetType().GetCustomAttributesRecursively<ValueTypeConverterHelperAttribute>().FirstOrDefault();
            if (helper2 != null)
            {
                object ret;
                if (helper2.TryConvert(value, targetType, out ret))
                {
                    return ret;
                }
            }

            if (targetType == typeof(object))
            {
                return value;
            }

            if ((IsGenericEnumerable(value.GetType())) &&
                (IsGenericEnumerable(targetType)))
            {
                Type targetItemType = targetType.GetGenericArguments()[0];

                IList targetValue = (IList)Activator.CreateInstance(typeof(List<>).MakeGenericType(new [] { targetItemType }));

                foreach (object valueItem in ((IEnumerable)value))
                {
                    object convertedValueItem = Convert(valueItem, targetItemType);

                    targetValue.Add(convertedValueItem);
                }

                return targetValue;
            }

            // Haz item, wantz list of it.
            if (!IsGenericEnumerable(value.GetType())
                && IsGenericEnumerable(targetType))
            {
                Type targetItemType = targetType.GetGenericArguments()[0];

                if (targetItemType.IsInstanceOfType(value))
                {
                    IList targetValue = (IList)Activator.CreateInstance(typeof(List<>).MakeGenericType(new [] { targetItemType }));
                    if (value is string)
                    {
                        ((string)value).Split(',').ForEach(f => targetValue.Add(f));
                    }
                    else
                    {
                        targetValue.Add(value);
                    }
                    return targetValue;
                }
            }

            var stringValue = value as string;
            if (stringValue != null)
            {
                return TryConvertStringValue(stringValue, targetType, ref conversionError);
            }

            if (targetType == typeof(string))
            {
                if (value is Type) return TypeManager.SerializeType((Type)value);
                if (value is DateTime) return XmlConvert.ToString((DateTime)value, XmlDateTimeSerializationMode.Local);
                if (value is IEnumerable) return string.Join(",", ((IEnumerable)value).Cast<string>().ToArray());
            }

            TypeConverter targetConverter = TypeDescriptor.GetConverter(targetType);
            if (targetConverter.CanConvertFrom(value.GetType()))
            {
                return targetConverter.ConvertFrom(null, UserSettings.CultureInfo, value);
            }

            TypeConverter valueConverter = TypeDescriptor.GetConverter(value.GetType());
            if (valueConverter.CanConvertTo(targetType))
            {
                return valueConverter.ConvertTo(null, UserSettings.CultureInfo, value, targetType);
            }

            throw new InvalidOperationException(string.Format("No conversion from {0} to {1} could be found", value.GetType(), targetType));
        }

        private static object TryConvertStringValue(string stringValue, Type targetType, ref Exception conversionError)
        {
            if (targetType == typeof (Type))
            {
                return stringValue != string.Empty ? TypeManager.GetType(stringValue) : null;
            }

            if (targetType == typeof (XhtmlDocument))
            {
                if (stringValue == string.Empty)
                {
                    return new XhtmlDocument();
                }
                return XhtmlDocument.Parse(stringValue);
            }

            if (targetType == typeof (XDocument))
            {
                return XDocument.Parse(stringValue);
            }

            if (targetType == typeof (XElement))
            {
                return XElement.Parse(stringValue);
            }

            if (targetType == typeof (IEnumerable<XNode>))
            {
                try
                {
                    XElement wrapper = XElement.Parse(string.Format("<wrapper>{0}</wrapper>", stringValue));
                    return wrapper.Nodes();
                }
                catch
                {
                    throw new InvalidCastException(string.Format("Unable to convert string '{0}' to a list of XNodes.", stringValue));
                }
            }

            if (targetType == typeof (IEnumerable<XElement>))
            {
                try
                {
                    XElement wrapper = XElement.Parse(string.Format("<wrapper>{0}</wrapper>", stringValue));
                    return wrapper.Elements();
                }
                catch
                {
                    throw new InvalidCastException(string.Format("Unable to convert string '{0}' to a list of XElements.", stringValue));
                }
            }

            if (targetType == typeof (XNamespace))
            {
                return XNamespace.Get(stringValue);
            }

            if (targetType.IsGenericType && targetType.GetGenericTypeDefinition() == typeof (Nullable<>))
            {
                Type valueType = targetType.GetGenericArguments()[0];
                if (IsOneOfTheHandledValueTypes(valueType))
                {
                    if (stringValue.Trim().Length == 0)
                    {
                        return null;
                    }

                    return TryConvertValueType(stringValue, valueType, out conversionError);
                }
            }


            if (IsOneOfTheHandledValueTypes(targetType))
            {
                return TryConvertValueType(stringValue, targetType, out conversionError);
            }

            TypeConverter tc = TypeDescriptor.GetConverter(targetType);
            CultureInfo culture = LocalizationScopeManager.CurrentLocalizationScope;
            object convertedResult = tc.ConvertFromString(null, culture, stringValue);

            if (convertedResult == null && !string.IsNullOrEmpty(stringValue))
            {
                throw new InvalidOperationException(string.Format("Unable to convert string value '{0}' to type '{1}'", stringValue, targetType.FullName));
            }

            return convertedResult;
        }

        private static object CreateLazyObject(Func<object> func, Type type)
        {
            return NewLazyObjectMethodInfo.MakeGenericMethod(type).Invoke(null, new object[] { func });
        }

        private static Lazy<T> NewLazyObject<T>(Func<object> func)
        {
            return new Lazy<T>(() => (T)func(), true);
        }

        private static bool IsOneOfTheHandledValueTypes(Type type)
        {
            return type == typeof (bool) || type == typeof (Guid) || type == typeof (int) || type == typeof (Decimal);
        }

        private static object TryConvertValueType(string stringValue, Type targetType, out Exception conversionError)
        {
            conversionError = null;

            if (targetType == typeof(bool))
            {
                bool boolResult;

                if (!bool.TryParse(stringValue, out boolResult))
                {
                    boolResult = false;

                    // TODO: localize
                    conversionError = new InvalidOperationException("Failed to convert value '{0}' into a Boolean".FormatWith(stringValue));
                }
                return boolResult;
            }

            if (targetType == typeof(int))
            {
                int intResult = 0;
                try
                {
                    intResult = Int32.Parse(stringValue);
                }
                catch(OverflowException)
                {
                    conversionError = new InvalidOperationException(LocalizationFiles.Composite_Management.Validation_Int32_Overflow);
                }
                catch (Exception ex)
                {
                    conversionError = ex;
                }

                return intResult;
            }

            if (targetType == typeof(decimal))
            {
                // TODO: localize
                decimal decimalResult;
                if (!decimal.TryParse(stringValue, out decimalResult))
                {
                    conversionError = new InvalidOperationException("Failed to convert value '{0}' into a Decimal".FormatWith(stringValue));
                }

                return decimalResult;
            }

            if (targetType == typeof(Guid))
            {
                Guid guidResult = Guid.Empty;
                
                if (string.IsNullOrEmpty(stringValue) || !Guid.TryParse(stringValue, out guidResult))
                {
                    // TODO: localize
                    conversionError = new InvalidOperationException("Failed to convert value '{0}' into a Guid".FormatWith(stringValue));
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
            if (!type.IsGenericType) return false;

            type = type.GetGenericTypeDefinition();

            return typeof (IEnumerable<>).IsAssignableFrom(type) 
                || typeof (List<>).IsAssignableFrom(type) 
                || typeof (IList<>).IsAssignableFrom(type);
        }
    }
}