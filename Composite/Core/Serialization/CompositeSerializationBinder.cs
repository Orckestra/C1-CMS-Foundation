using System;
using System.Reflection;
using System.Runtime.Serialization;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.Core.Types;
using Composite.Data;
using Newtonsoft.Json.Serialization;

namespace Composite.Core.Serialization
{
    /// <summary>
    /// Removes temporary assembly references when serializing references to generated classes.
    /// </summary>
    internal class CompositeSerializationBinder: DefaultSerializationBinder
    {
        private const string GeneratedTypesNamespacePrefix = "CompositeGenerated.";
        private const string GeneratedTypesAssemblyName = "Composite.Generated";

        public static SerializationBinder Instance { get; } = new CompositeSerializationBinder();

        public override void BindToName(Type serializedType, out string assemblyName, out string typeName)
        {
            typeName = serializedType.FullName;

            if (typeName.StartsWith(GeneratedTypesNamespacePrefix, StringComparison.OrdinalIgnoreCase)
                && Guid.TryParse(serializedType.Assembly.GetName().Name, out _))
            {
                assemblyName = GeneratedTypesAssemblyName;
            }
            else
            {
                assemblyName = serializedType.Assembly.FullName;
            }
        }

        public override Type BindToType(string assemblyName, string typeName)
        {
            if (assemblyName == GeneratedTypesAssemblyName
                && typeName.StartsWith(GeneratedTypesNamespacePrefix, StringComparison.OrdinalIgnoreCase))
            {
                var result = TypeManager.TryGetType($"{typeName}, {assemblyName}") ?? TypeManager.TryGetType(typeName);
                if (result != null) return result;
            }

            var type = base.BindToType(assemblyName, typeName);

            if (!TypeIsSupported(assemblyName, typeName, type))
            {
                throw new NotSupportedException($"Not supported object type '{typeName}'");
            }

            return type;
        }

        private bool TypeIsSupported(string assemblyName, string typeName, Type type)
        {
            assemblyName = new AssemblyName(assemblyName).Name;

            if (assemblyName == typeof(object).Assembly.GetName().Name /* "mscorlib" */)
            {
                var dotOffset = typeName.LastIndexOf(".", StringComparison.Ordinal);
                if (dotOffset > 0)
                {
                    string @namespace = typeName.Substring(0, dotOffset);

                    return @namespace == nameof(System) || @namespace.StartsWith("System.Collections");
                }
            }

            return type != null
                   && (type.IsEnum
                       || typeof(EntityToken).IsAssignableFrom(type)
                       || typeof(SearchToken).IsAssignableFrom(type)
                       || typeof(IDataId).IsAssignableFrom(type)
                       || type == typeof(DataSourceId)
                       || type == typeof(DataScopeIdentifier));
        }
    }
}
