using System;
using System.Reflection;
using System.Text;


namespace Composite.Extensions
{
    public static class MethodInfoExtensionMethods
    {
        public static string ToExceptionString(this MethodInfo methodInfo)
        {
            if (methodInfo == null) throw new ArgumentNullException("methodInfo");

            StringBuilder sb = new StringBuilder();
            sb.Append(methodInfo.DeclaringType.FullName);
            sb.Append(".");
            sb.Append(methodInfo.Name);

            Type[] genericArguments = methodInfo.GetGenericArguments();
            if (genericArguments.Length > 0)
            {
                sb.Append("[");
                bool firstGenericParameter = true;
                foreach (Type type in genericArguments)
                {
                    if (firstGenericParameter == false)
                    {
                        sb.Append(", ");
                    }
                    else
                    {
                        firstGenericParameter = false;
                    }

                    sb.Append(type.Name);
                }
                sb.Append("]");
            }

            sb.Append("(");

            bool firstParameter = true;
            foreach (ParameterInfo parameterInfo in methodInfo.GetParameters())
            {
                if (firstParameter == false)
                {
                    sb.Append(", ");
                }
                else
                {
                    firstParameter = false;
                }

                sb.Append(parameterInfo.ParameterType.Name);
                sb.Append(" ");
                sb.Append(parameterInfo.Name);
            }

            sb.Append(")");

            return sb.ToString();
        }
    }
}
