using System;
using System.Linq;
using System.Xml.Linq;
using System.Reflection;
using System.Collections.Generic;

using Composite.Data;


namespace Composite.StandardPlugins.Data.DataProviders.XmlDataProvider.CodeGeneration.Foundation
{
    internal static class GeneretedClassesMethodCache
    {
        private static MethodInfo _xElementElementMethod = typeof(XElement).GetMethod("Element");
        private static MethodInfo _xElementAttributeMethod = typeof(XElement).GetMethod("Attribute");
        private static ConstructorInfo _dataSourceIdConstructor = typeof(DataSourceId).GetConstructors(BindingFlags.Instance | BindingFlags.Public)[0];
        private static ConstructorInfo _dataSourceIdConstructor2 = typeof(DataSourceId).GetConstructors(BindingFlags.Instance | BindingFlags.Public)[1];
        private static MethodInfo _guidCompareToMethod = null;
        private static Dictionary<Type, MethodInfo> _explicitCastXElementMethodInfoCache = new Dictionary<Type, MethodInfo>();
        private static Dictionary<Type, MethodInfo> _explicitCastXAttributeMethodInfoCache = new Dictionary<Type, MethodInfo>();



        public static MethodInfo XElementElementMethod
        {
            get
            {
                return _xElementElementMethod;
            }
        }



        public static MethodInfo XElementAttributeMethod
        {
            get
            {
                return _xElementAttributeMethod;
            }
        }



        public static ConstructorInfo DataSourceIdConstructor
        {
            get
            {
                return _dataSourceIdConstructor;
            }
        }

        public static ConstructorInfo DataSourceIdConstructor2
        {
            get
            {
                return _dataSourceIdConstructor2;
            }
        }



        public static MethodInfo GuidCompareTo
        {
            get
            {
                if (null == _guidCompareToMethod)
                {
                    _guidCompareToMethod =
                        (from mi in typeof(Guid).GetMethods()
                         where mi.Name == "CompareTo" && mi.GetParameters()[0].ParameterType == typeof(Guid)
                         select mi).First();
                }

                return _guidCompareToMethod;
            }
        }



        public static MethodInfo GetExplicitCastXElement(Type type)
        {
            if (null == type) throw new ArgumentNullException("type");

            MethodInfo methodInfo;

            if (false == _explicitCastXElementMethodInfoCache.TryGetValue(type, out methodInfo))
            {
                methodInfo =
                    (from member in typeof(XElement).GetMethods()
                     where member.Name == "op_Explicit" && member.ReturnType == type
                     select member).FirstOrDefault();

                if (null == methodInfo)
                {
                    if (null == methodInfo) throw new InvalidOperationException(string.Format("No explicit cast from {0} to {1} exists", typeof(XElement), type));
                }

                _explicitCastXElementMethodInfoCache.Add(type, methodInfo);
            }

            return methodInfo;
        }



        public static MethodInfo GetExplicitCastXAttribute(Type type)
        {
            if (null == type) throw new ArgumentNullException("type");

            MethodInfo methodInfo;

            if (false == _explicitCastXAttributeMethodInfoCache.TryGetValue(type, out methodInfo))
            {
                methodInfo =
                    (from member in typeof(XAttribute).GetMethods()
                     where member.Name == "op_Explicit" && member.ReturnType == type
                     select member).FirstOrDefault();

                if (null == methodInfo)
                {
                    if (null == methodInfo) throw new InvalidOperationException(string.Format("No explicit cast from {0} to {1} exists", typeof(XElement), type));
                }

                _explicitCastXAttributeMethodInfoCache.Add(type, methodInfo);
            }

            return methodInfo;
        }
    }
}
