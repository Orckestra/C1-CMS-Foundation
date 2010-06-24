using System;
using System.Linq;
using System.Collections.Generic;


namespace Composite.Types
{
    public static class PrimitiveTypes
    {
        private static readonly Type[] _primitiveTypes = 
                {
                    typeof(DateTime),
                    typeof(Boolean),
                    typeof(Byte),
                    typeof(Char),
                    typeof(Double),
                    typeof(Guid),
                    typeof(Int16),
                    typeof(Int32),
                    typeof(Int64),
                    typeof(SByte),
                    typeof(Single),
                    typeof(UInt16),
                    typeof(UInt32),
                    typeof(UInt64),
                    typeof(string),
                    typeof(Decimal)
                };



        public static IEnumerable<Type> Types
        {
            get
            {
                return _primitiveTypes;
            }
        }



        public static bool IsPrimitiveType(this Type type)
        {
            return _primitiveTypes.Contains(type);
        }



        public static bool IsPrimitiveOrNullableType(this Type type)
        {
            if ((type.IsGenericType == true) &&
                (type.GetGenericTypeDefinition() == typeof(Nullable<>)))
            {
                return IsPrimitiveType(type.GetGenericArguments()[0]);
            }
            else
            {
                return IsPrimitiveType(type);
            }
        }
    }
}
