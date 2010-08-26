using System;
using System.Runtime.CompilerServices;
using Composite.Core.Collections.Generic;


namespace Composite.Core.Linq
{
    internal static class TypeExtensions
    {
        private static readonly Hashtable<string, bool?> _typeIsCompiledCache = new Hashtable<string, bool?>();

        public static bool IsCompilerGeneratedType(this Type type)
        {
            string key = type.FullName + type.Assembly.FullName;

            bool? result = _typeIsCompiledCache[key];

            if(result != null)
            {
                return (bool)result;
            }

            lock(_typeIsCompiledCache)
            {
                result = _typeIsCompiledCache[key];
                if (result != null) return (bool) result;

                result = type.GetCustomAttributes(typeof (CompilerGeneratedAttribute), true).Length > 0;

                _typeIsCompiledCache.Add(key, result);

                return (bool)result;
            }
        }
    }
}
