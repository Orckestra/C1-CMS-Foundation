using System;
using System.Collections.Generic;
using System.Reflection;


namespace Composite.Core.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class AssemblyExtensionMethods
    {
        /// <exclude />
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
