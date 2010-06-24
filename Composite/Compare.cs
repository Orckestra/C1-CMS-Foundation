using System;
using System.Linq;
using System.Reflection;
using System.Collections.Generic;


namespace Composite
{
    public static class Compare
    {
        /// <summary>
        /// Compares to objects by comparing all public getters value recursive.
        /// Does not handle cycles.
        /// </summary>
        /// <returns>Returns true if the two objects are equal.</returns>
        public static bool ObjectCompare(object object1, object object2)
        {
            if (true == object.ReferenceEquals(object1, object2)) return true;

            Type type1 = object1.GetType();
            Type type2 = object2.GetType();

            if (type1 != type2) return false;

            PropertyInfo[] propertyInfos1 = type1.GetProperties();
            PropertyInfo[] propertyInfos2 = type2.GetProperties();

            for (int i = 0; i < propertyInfos1.Length; ++i)
            {
                MethodInfo getMethodInfo1 = propertyInfos1[i].GetGetMethod();
                MethodInfo getMethodInfo2 = propertyInfos2[i].GetGetMethod();

                object result1 = getMethodInfo1.Invoke(object1, null);
                object result2 = getMethodInfo2.Invoke(object2, null);

                if (true == result1.GetType().IsPrimitive)
                {
                    if (false == result1.Equals(result2)) return false;
                }
                else if (result1.GetType() == typeof(string))
                {
                    if (false == result1.Equals(result2)) return false;
                }
                else if (result1.GetType() == typeof(Guid))
                {
                    if (false == result1.Equals(result2)) return false;
                }
                else if (false == result1.GetType().IsPrimitive)
                {
                    if (false == ObjectCompare(result1, result2))
                    {
                        return false;
                    }
                }
           }

            return true;
        }



        public static bool PropertyCompare(object object1, object object2)
        {
            return PropertyCompare(object1, object2, false);
        }



        public static bool PropertyCompare(object object1, object object2, bool recursive)
        {
            Type type1 = object1.GetType();
            Type type2 = object2.GetType();

            List<PropertyInfo> propertyInfos1 = type1.GetProperties().ToList();
            List<PropertyInfo> propertyInfos2 = type2.GetProperties().ToList();

            if (propertyInfos1.Count != propertyInfos2.Count) return false;

            propertyInfos1.Sort(delegate(PropertyInfo p1, PropertyInfo p2) { return p1.Name.CompareTo(p2.Name); });
            propertyInfos2.Sort(delegate(PropertyInfo p1, PropertyInfo p2) { return p1.Name.CompareTo(p2.Name); });

            int count = propertyInfos1.Count;
            for (int i = 0; i < count; ++i)
            {                
                MethodInfo methodInfo1 = propertyInfos1[i].GetGetMethod();
                MethodInfo methodInfo2 = propertyInfos2[i].GetGetMethod();

                if ((methodInfo1 == null) && (methodInfo2 != null)) return false;
                if ((methodInfo1 != null) && (methodInfo2 == null)) return false;
                
                if ((methodInfo1 == null) && (methodInfo2 == null)) continue;
                    
                if (propertyInfos1[i].PropertyType != propertyInfos2[i].PropertyType) return false;

                object value1 = methodInfo1.Invoke(object1, null);
                object value2 = methodInfo2.Invoke(object2, null);

                if ((propertyInfos1[i].PropertyType.IsPrimitive == true) ||
                    (propertyInfos1[i].PropertyType == typeof(string)) ||
                    (propertyInfos1[i].PropertyType == typeof(Guid)) ||
                    (recursive == false))
                {                    
                    if (value1.Equals(value2) == false) return false;
                }
                else
                {
                    return PropertyCompare(value1, value2);
                }                
            }

            return true;
        }
    }
}
