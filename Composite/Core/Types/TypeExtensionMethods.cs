using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using Composite.Data;
using Composite.C1Console.Events;
using Composite.Core.Collections.Generic;


namespace Composite.Core.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class TypeExtensionMethods
    {
        private static Dictionary<PropertyInfo, List<Attribute>> _propertyAttributeCache = new Dictionary<PropertyInfo, List<Attribute>>();

        /// <exclude />
        static TypeExtensionMethods()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }


        /// <exclude />
        public static string GetVersionNeutralName(this Type type)
        {
            if (type.IsGenericType == false)
            {
                return string.Format("{0},{1}", type.FullName, type.Assembly.FullName.Split(',')[0]);
            }
            else
            {
                Type[] genericArguments = type.GetGenericArguments();

                StringBuilder sb = new StringBuilder();
                bool firstTime = true;
                foreach (Type genericType in genericArguments)
                {
                    string serializedType = GetVersionNeutralName(genericType);

                    if (firstTime == false)
                    {
                        sb.Append(",");
                    }
                    else
                    {
                        firstTime = false;
                    }

                    sb.Append(string.Format("[{0}]", serializedType));
                }

                string fullName = type.FullName.Remove(type.FullName.IndexOf('['));

                return string.Format("{0}[{1}],{2}", fullName, sb, type.Assembly.FullName.Split(',')[0]);
            }
        }



        /// <exclude />
        public static List<PropertyInfo> GetPropertiesRecursively(this Type type)
        {
            return GetPropertiesRecursively(type, null);
        }



        /// <exclude />
        public static List<PropertyInfo> GetPropertiesRecursively(this Type type, Func<PropertyInfo, bool> predicate)
        {
            List<PropertyInfo> properties = new List<PropertyInfo>();

            if (predicate == null)
            {
                properties.AddRange(type.GetProperties());
            }
            else
            {
                properties.AddRange(type.GetProperties().Where(predicate));
            }

            Type[] interfaceTypes = type.GetInterfaces();
            foreach (Type interfaceType in interfaceTypes)
            {
                if (predicate == null)
                {
                    properties.AddRange(interfaceType.GetProperties());
                }
                else
                {
                    properties.AddRange(interfaceType.GetProperties().Where(predicate));
                }
            }

            return properties;
        }



        /// <exclude />
        public static List<Type> GetInterfacesRecursively(this Type type)
        {
            List<Type> interfaces = new List<Type>();

            GetInterfacesRecursively(type, null, interfaces);

            return interfaces;
        }



        /// <exclude />
        public static List<Type> GetInterfacesRecursively(this Type type, Func<Type, bool> predicate)
        {
            List<Type> interfaces = new List<Type>();

            GetInterfacesRecursively(type, predicate, interfaces);

            return interfaces;
        }



        private static void GetInterfacesRecursively(this Type type, Func<Type, bool> predicate, List<Type> interfaces)
        {
            foreach (Type interfaceType in type.GetInterfaces())
            {
                if ((predicate == null) || (predicate(interfaceType) == true))
                {
                    if (interfaces.Contains(interfaceType) == false)
                    {
                        interfaces.Add(interfaceType);
                    }
                }

                GetInterfacesRecursively(interfaceType, predicate, interfaces);
            }
        }



        /// <exclude />
        public static string SerializeValue(this Type sourceType, object valueToSerialize)
        {
            if (valueToSerialize == null) return null;

            if (sourceType == typeof(string)) return (string)valueToSerialize;
            if (sourceType == typeof(Guid)) return valueToSerialize.ToString();
            if (sourceType == typeof(int)) return valueToSerialize.ToString();

            throw new NotImplementedException(string.Format("Serialization of the the type {0} is not supported", sourceType.FullName));
        }



        /// <exclude />
        public static object DeserializeValue(this Type targetType, string serializedValue)
        {
            if (serializedValue == null) return null;

            if (targetType == typeof(string)) return (string)serializedValue;
            if (targetType == typeof(Guid)) return new Guid(serializedValue);
            if (targetType == typeof(int)) return int.Parse(serializedValue); ;

            throw new NotImplementedException(string.Format("Deserializing values of the the type {0} is not supported", targetType.FullName));
        }


        private static Hashtable<Type, List<Attribute>> _interfaceAttributeCache = new Hashtable<Type, List<Attribute>>();
        private static object _lock = new object();


        /// <exclude />
        public static IEnumerable<T> GetCustomInterfaceAttributes<T>(this Type type) where T : Attribute
        {
            List<Attribute> attributeList;

            if (_interfaceAttributeCache.TryGetValue(type, out attributeList) == false)
            {
                lock (_lock)
                {
                    if (_interfaceAttributeCache.TryGetValue(type, out attributeList) == false)
                    {
                        attributeList = new List<Attribute>();
                        GetCustomAttributesRecursively(type, attributeList, null, new List<Type>(), true);

                        _interfaceAttributeCache.Add(type, attributeList);
                    }
                }
            }

            return attributeList.OfType<T>();
        }




        private static Dictionary<Type, List<Attribute>> _typeAttributeCache = new Dictionary<Type, List<Attribute>>();


        /// <exclude />
        public static IEnumerable<T> GetCustomAttributesRecursively<T>(this Type type)
            where T : Attribute
        {
            List<Attribute> attributeList = null;

            lock (_lock)
            {
                if (_typeAttributeCache.TryGetValue(type, out attributeList) == false)
                {
                    attributeList = new List<Attribute>();
                    GetCustomAttributesRecursively(type, attributeList, null, new List<Type>(), false);

                    _typeAttributeCache.Add(type, attributeList);
                }
            }

            return attributeList.OfType<T>();
        }



        /// <exclude />
        public static IEnumerable<T> GetCustomAttributesRecursively<T>(this PropertyInfo propertyInfo)
            where T : Attribute
        {
            List<Attribute> attributeList = null;

            lock (_lock)
            {
                if (_propertyAttributeCache.TryGetValue(propertyInfo, out attributeList) == false)
                {
                    attributeList = new List<Attribute>();
                    GetCustomAttributesRecursively(propertyInfo.DeclaringType, attributeList, propertyInfo.Name, new List<Type>(), false);

                    _propertyAttributeCache.Add(propertyInfo, attributeList);
                }
            }

            return attributeList.OfType<T>();
        }



        private static void GetCustomAttributesRecursively(Type type, List<Attribute> foundAttributes, string propertyName, List<Type> typesChecked, bool examineInterfacesOnly)
        {
            if (typesChecked.Contains(type) == true)
            {
                return;
            }
            else
            {
                typesChecked.Add(type);
            }

            IEnumerable<Attribute> attributes = null;

            if (propertyName == null)
            {
                if (examineInterfacesOnly == false || type.IsInterface == true)
                {
                    attributes =
                        from attr in type.GetCustomAttributes(true)
                        select attr as Attribute;
                }
            }
            else
            {
                PropertyInfo propertyInfo = type.GetProperty(propertyName);

                if (propertyInfo != null)
                {
                    attributes =
                        from attr in propertyInfo.GetCustomAttributes(true)
                        select attr as Attribute;
                }
            }


            if (attributes != null)
            {
                foundAttributes.AddRange(attributes);
            }


            if (examineInterfacesOnly == false && (type.BaseType != null) && (type.BaseType != typeof(object)))
            {
                GetCustomAttributesRecursively(type.BaseType, foundAttributes, propertyName, typesChecked, examineInterfacesOnly);
            }

            Type[] interfaces = type.GetInterfaces();
            foreach (Type interfaceType in interfaces)
            {
                GetCustomAttributesRecursively(interfaceType, foundAttributes, propertyName, typesChecked, examineInterfacesOnly);
            }
        }



        /// <exclude />
        public static string GetShortLabel(this Type type)
        {
            if (type.IsGenericType == true)
            {
                string genericUglyName = type.Name;

                if (genericUglyName.IndexOf('`') > -1)
                {
                    StringBuilder sb = new StringBuilder(genericUglyName.Substring(0, genericUglyName.IndexOf('`')));

                    sb.Append('<');
                    bool firstArg = true;
                    foreach (Type genericArgument in type.GetGenericArguments())
                    {
                        if (firstArg == false) sb.Append(',');
                        sb.Append(genericArgument.GetShortLabel());
                        firstArg = false;
                    }
                    sb.Append('>');

                    return sb.ToString();
                }
                else
                {
                    return type.Name;
                }
            }
            else
            {
                var titleAttributes = type.GetCustomInterfaceAttributes<TitleAttribute>();
                if (titleAttributes != null && titleAttributes.Any())
                {
                    return titleAttributes.First().Title;
                }
                else
                {
                    return type.Name;
                }
            }

        }



        private static void Flush()
        {
            _propertyAttributeCache = new Dictionary<PropertyInfo, List<Attribute>>();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }
    }
}
