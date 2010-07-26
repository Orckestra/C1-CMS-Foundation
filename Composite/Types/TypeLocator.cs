using System;
using System.Reflection;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

using Composite.GlobalSettings;

namespace Composite.Types
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    internal sealed class BaseTypeIncludesAttribute : Attribute
    {
        private Type _baseType;
        private TypeIncludes _includes;

        
        
        public BaseTypeIncludesAttribute(Type baseType) : this(baseType, TypeIncludes.ConcreteTypes)
        {
        }



        public BaseTypeIncludesAttribute(Type baseType, TypeIncludes includes)
        {
            _baseType = baseType;
            _includes = includes;
        }



        public Type BaseType { get { return _baseType; } }
        public TypeIncludes TypeIncludes { get { return _includes; } }
    }

    [Flags]
    internal enum TypeIncludes
    {
        /// <summary>
        /// Include interfaces in the result.
        /// </summary>
        InterfaceTypes = 0x01,
        /// <summary>
        /// Include concrete types in the result.
        /// </summary>
        ConcreteTypes = 0x02,
        /// <summary>
        /// Include primitives in the result.
        /// </summary>
        PrimitiveTypes = 0x04,
    }



    internal sealed class TypeLocator
    {
        public static IEnumerable<Type> FindTypes(TypeIncludes flags)
        {
            return FindTypes(flags, typeof(object));
        }



        public static IEnumerable<Type> FindTypes(TypeIncludes flags, Type baseType)
        {
            if (baseType == null) throw new ArgumentNullException("baseType", "Must be set to a type");

            Func<Type, bool> predicate = BuildPredicate(flags);
            var foundTypes = from containedType in FindTypes(baseType)
                             where predicate(containedType)
                             select containedType;

            if (!(IsSet(flags, TypeIncludes.ConcreteTypes) && IsConcreteType(baseType)))
            {
                if(foundTypes.Contains(baseType))
                {
                    IList<Type> b = new List<Type>();
                    b.Add(baseType);
                    foundTypes = foundTypes.Except(b.AsQueryable());
                }
            }
            
            if (IsSet(flags, TypeIncludes.PrimitiveTypes))
            {
                foundTypes = foundTypes.Concat(FindPrimitiveTypes());
            }
            return foundTypes;
        }



        private static IEnumerable<Type> FindPrimitiveTypes()
        {
            return PrimitiveTypes.Types;
        }



        private static IEnumerable<Type> FindTypes(Type type)
        {
            IEnumerable<Assembly> assemblies = GetPropeableAssemblies();

            var typesFound =
                from containedTypes in
                    (
                        from assembly in assemblies
                        select GetTypesFromAssembly( assembly )
                    )
                from singleType in containedTypes
                where type.IsAssignableFrom(singleType) 
                select singleType;
            return typesFound;
        }



        private static IEnumerable<Type> GetTypesFromAssembly(Assembly assembly)
        {
            try
            {
                return assembly.GetTypes();
            }
            catch (ReflectionTypeLoadException ex)
            {
                if (ex.LoaderExceptions.Length > 0)
                {
                    throw new InvalidOperationException("Failed to reflect the assembly " + assembly.FullName + ". The loader exception message is " + ex.LoaderExceptions[0].Message, ex);
                }
                throw new InvalidOperationException("Failed to reflect the assembly " + assembly.FullName, ex);
            }
        }



        private static IEnumerable<Assembly> GetPropeableAssemblies()
        {
            return
                from assembly in AppDomain.CurrentDomain.GetAssemblies()
                where IsProbeableAssembly(assembly.FullName) == true
                select assembly;
        }



        public static bool IsProbeableAssembly(string assemblyFullName)
        {
            string lowerAssemblyName = assemblyFullName.ToLower();

            if (lowerAssemblyName.IndexOf(',') > -1)
            {
                lowerAssemblyName = lowerAssemblyName.Substring(0, lowerAssemblyName.IndexOf(','));
            }
            

            foreach (string excludeName in GlobalSettingsFacade.NonProbableAssemblyNames.Where(n => n.Contains("*") == false))
            {
                if (lowerAssemblyName == excludeName.ToLower()) return false;
            }

            foreach (string excludeStartName in GlobalSettingsFacade.NonProbableAssemblyNames.Where(n => n.EndsWith("*") == true))
            {
                if (lowerAssemblyName.StartsWith(excludeStartName.Replace("*", "").ToLower())) return false;
            }

            return true;

        }



        private static bool IsConcreteType(Type type)
        {
            return (type.IsClass || type.IsValueType) && !type.IsAbstract;
        }



        private static IList<Func<Type, bool>> SelectFuntions(TypeIncludes flags)
        {
            bool includeAllInterfaces = IsSet(flags, TypeIncludes.InterfaceTypes);
            bool includeConcreteTypes = IsSet(flags, TypeIncludes.ConcreteTypes);

            List<Func<Type, bool>> functions = new List<Func<Type, bool>>();
            if (includeAllInterfaces)
            {
                functions.Add(x => x.IsInterface);
            }
            if (includeConcreteTypes)
            {
                functions.Add(x => (IsConcreteType(x)));
            }

            return functions;
        }



        private static Func<Type, bool> BuildPredicate(TypeIncludes flags)
        {
            IList<Func<Type, bool>> functions = SelectFuntions(flags);

            Func<Func<Type, bool>, Func<Type, bool>, Func<Type, bool>>
                or = (f1, f2) => (t => f1(t) || f2(t));

            Func<Type, bool> current = (x => false);
            foreach (Func<Type, bool> func in functions)
            {
                current = or(func, current);
            }
            return current;
        }



        private static bool IsSet(TypeIncludes flags, TypeIncludes compareFlag)
        {
            return ((flags & compareFlag) == compareFlag);
        }
    }
}
