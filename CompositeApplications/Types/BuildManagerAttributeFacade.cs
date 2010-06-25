using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;


namespace Composite.Types
{
    internal static class BuildManagerAttributeFacade
    {
        private static Dictionary<string, bool> _isDynamicBuildLookup = new Dictionary<string, bool>();
        private static Dictionary<Assembly, Dictionary<Type, Attribute>> _assemblyAttributesLookup = new Dictionary<Assembly, Dictionary<Type, Attribute>>();
        
        private static object _lock = new object();



        public static bool IsDynamicBuild(this Assembly assembly)
        {
            bool result = false;
            lock (_lock)
            {
                if (_isDynamicBuildLookup.TryGetValue(assembly.FullName, out result) == false)
                {
                    object[] attributes = assembly.GetCustomAttributes(typeof(BuildManagerCompileUnitAssemblyAttribute), true);

                    result = attributes.Length == 1;
                    _isDynamicBuildLookup.Add(assembly.FullName, result);
                }
            }

            return result;
        }



        public static bool IsCacheble(this Assembly assembly)
        {
            BuildManagerCompileUnitAssemblyAttribute attribute = GetAttribute<BuildManagerCompileUnitAssemblyAttribute>(assembly);

            return attribute.Cacheble;
        }



        public static string GetAssemblyId(this Assembly assembly)
        {
            BuildManagerCompileUnitAssemblyAttribute attribute = GetAttribute<BuildManagerCompileUnitAssemblyAttribute>(assembly);

            return attribute.Id;
        }
      


        public static string GetTypeCompileUnitId(this Type type)
        {
            object attribute = type.GetCustomAttributes(typeof(BuildManagerCompileUnitIdAttribute), false).Single();

            return ((BuildManagerCompileUnitIdAttribute)attribute).Id;
        }



        public static string GetTypeCompileUnitFingerprint(this Type type)
        {
            object attribute = type.GetCustomAttributes(typeof(BuildManagerFingerprintAttribute), false).Single();

            return ((BuildManagerFingerprintAttribute)attribute).Fingerprint;
        }



        public static int GetAssemblyVersionNumber(this Type type)
        {
            object attribute = type.GetCustomAttributes(typeof(BuildManagerAssemblyVersionAttribute), false).Single();

            return ((BuildManagerAssemblyVersionAttribute)attribute).Version;
        }

        

        private static T GetAttribute<T>(Assembly assembly)
            where T : Attribute
        {
            if (assembly == null) throw new ArgumentNullException("assembly");

            Attribute result;
            Dictionary<Type, Attribute> assemblyAttributes;

            lock (_lock)
            {
                if (_assemblyAttributesLookup.TryGetValue(assembly, out assemblyAttributes) == false)
                {
                    assemblyAttributes = new Dictionary<Type, Attribute>();
                    _assemblyAttributesLookup.Add(assembly, assemblyAttributes);
                }

                if (assemblyAttributes.TryGetValue(typeof(T), out result) == false)
                {
                    object[] attributeObjects = assembly.GetCustomAttributes(typeof(T), true);

                    if (attributeObjects.Length != 1) throw new InvalidOperationException(string.Format("The assembly '{0}' does not have the required attribute '{1}'", assembly.FullName, typeof(T)));

                    result = (T)attributeObjects[0];

                    assemblyAttributes.Add(typeof(T), result);
                }

            }

            return (T)result;
        }
    }
}
