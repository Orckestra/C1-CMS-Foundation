using System;
using System.Collections.Generic;
using System.Reflection;


namespace Composite.Types
{
    public static class AssemblyExtensionMethods
    {
        public static IEnumerable<Type> GetTypes(this IEnumerable<Assembly> assemblies)
        {
            foreach (Assembly assembly in assemblies)
            {
                IEnumerable<Type> types = null;

                try
                {
                    types = assembly.GetTypes();
                }
                catch
                {
                    // Ignore
                }

                if (types == null) continue;
                
                foreach (Type type in types)
                {
                    yield return type;
                }
            }
        }
    }
}
