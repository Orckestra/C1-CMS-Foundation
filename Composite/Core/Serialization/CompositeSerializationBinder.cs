using System;
using System.Runtime.Serialization;
using Composite.Core.Types;
using Newtonsoft.Json.Serialization;

namespace Composite.Core.Serialization
{
    /// <summary>
    /// Removes temproraty assembly references when serializing references to generated classes.
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

            return base.BindToType(assemblyName, typeName);
        }
    }
}
