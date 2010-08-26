using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using Composite.Core.Types;


namespace Composite.Core.Serialization
{
	class PropertySerializerHandler : ISerializerHandler
	{
        public string Serialize(object objectToSerialize)
        {
            if (objectToSerialize == null) throw new ArgumentNullException("objectToSerialize");

            StringBuilder sb = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(sb, "_Type_", TypeManager.SerializeType(objectToSerialize.GetType()));

            IEnumerable<PropertyInfo> propertyInfos =
                from prop in objectToSerialize.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance)
                where prop.CanRead == true && prop.CanWrite == true
                select prop;

            foreach (PropertyInfo propertyInfo in propertyInfos)
            {
                MethodInfo methodInfo =
                        (from mi in typeof(StringConversionServices).GetMethods(BindingFlags.Public | BindingFlags.Static)
                         where mi.Name == "SerializeKeyValuePair" &&
                               mi.IsGenericMethodDefinition == true &&
                               mi.GetParameters().Length == 3 &&
                               mi.GetParameters()[2].ParameterType.IsGenericParameter == true
                         select mi).SingleOrDefault();
                
                methodInfo = methodInfo.MakeGenericMethod(new Type[] { propertyInfo.PropertyType });

                object propertyValue = propertyInfo.GetValue(objectToSerialize, null);

                methodInfo.Invoke(null, new object[] { sb, propertyInfo.Name, propertyValue });
            }

            return sb.ToString();
        }

        public object Deserialize(string serializedObject)
        {
            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedObject);

            if (dic.ContainsKey("_Type_") == false) throw new ArgumentException("serializedObject is of wrong format");

            string typeString = StringConversionServices.DeserializeValueString(dic["_Type_"]);
            Type type = TypeManager.GetType(typeString);

            object obj = Activator.CreateInstance(type);

            IEnumerable<PropertyInfo> propertyInfos =
                from prop in type.GetProperties(BindingFlags.Public | BindingFlags.Instance)
                where prop.CanRead == true && prop.CanWrite == true
                select prop;

            foreach (PropertyInfo propertyInfo in propertyInfos)
            {
                if (dic.ContainsKey(propertyInfo.Name) == false) throw new ArgumentException("serializedObject is of wrong format");

                MethodInfo methodInfo =
                        (from mi in typeof(StringConversionServices).GetMethods(BindingFlags.Public | BindingFlags.Static)
                         where mi.Name == "DeserializeValue" &&
                               mi.IsGenericMethodDefinition == true &&
                               mi.GetParameters().Length == 2 &&
                               mi.GetParameters()[1].ParameterType.IsGenericParameter == true
                         select mi).SingleOrDefault();

                object defaultValue;
                if (propertyInfo.PropertyType == typeof(Guid)) defaultValue = default(Guid);
                else if (propertyInfo.PropertyType == typeof(string)) defaultValue = default(string);
                else if (propertyInfo.PropertyType == typeof(int)) defaultValue = default(int);
                else if (propertyInfo.PropertyType == typeof(DateTime)) defaultValue = default(DateTime);
                else if (propertyInfo.PropertyType == typeof(bool)) defaultValue = default(bool);
                else if (propertyInfo.PropertyType == typeof(decimal)) defaultValue = default(decimal);
                else if (propertyInfo.PropertyType == typeof(long)) defaultValue = default(long);
                else defaultValue = null;

                methodInfo = methodInfo.MakeGenericMethod(new Type[] { propertyInfo.PropertyType });
               
                object propertyValue = methodInfo.Invoke(null, new object[] { dic[propertyInfo.Name], defaultValue });

                propertyInfo.SetValue(obj, propertyValue, null);
            }

            return obj;
        }
    }
}
