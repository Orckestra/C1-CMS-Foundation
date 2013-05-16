using System;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.Generic;


namespace Composite.Core.Linq
{
    internal static class TypeHelpers
    {        
        public static Type FindElementType(Expression expression)
        {
            Type elementType = expression.Type;
            if (!elementType.IsGenericType)
            {
                return null;
            }
            
            Type defintion = elementType.GetGenericTypeDefinition();

            if ((typeof (IQueryable<>) == defintion) ||
                (typeof (IEnumerable<>) == defintion))
            {
                return elementType.GetGenericArguments()[0];
            }
            
            Type[] interfaces = elementType.GetInterfaces();

            foreach (Type interf in interfaces)
            {
                Type def = interf;
                if (interf.IsGenericType)
                {
                    def = interf.GetGenericTypeDefinition();
                }

                if ((typeof (IQueryable<>) == def) ||
                    (typeof (IEnumerable<>) == def))
                {
                    return elementType.GetGenericArguments()[0];
                }
            }

            throw new NotImplementedException("Expression type could not be found");
        }
    }
}
