using System;
using System.Collections.Generic;
using Composite.Core.Types;
using Composite.Core.Types.Plugins.TypeManagerTypeHandler;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Plugins.Types.TypeManagerTypeHandler.DynamicBuildManagerTypeManagerTypeHandler
{    
    [ConfigurationElementType(typeof(DynamicBuildManagerTypeManagerTypeHandlerData))]
    internal sealed class DynamicBuildManagerTypeManagerTypeHandler : ITypeManagerTypeHandler
    {
        private static readonly string _prefix = "DynamicType:";

        private static readonly object _lock = new object();
        private static readonly Dictionary<Type, string> _serializedCache = new Dictionary<Type, string>();

        public Type GetType(string fullName)
        {
            Type compiledType = CodeGenerationManager.GetCompiledType(fullName);
            if (compiledType != null) return compiledType;

            if (fullName.StartsWith(_prefix) && !fullName.Contains(","))
            {
                string name = fullName.Remove(0, _prefix.Length);
                Type resultType = Type.GetType(name + ", Composite.Generated");

                return resultType;
            }
            
            return null;
        }


        
        public string SerializeType(Type type)
        {
            lock (_lock)
            {
                string result;

                if (_serializedCache.TryGetValue(type, out result) == false)
                {
                    result = SerializeTypeImpl(type);
                    _serializedCache.Add(type, result);
                }

                return result;
            }
        }



        public bool HasTypeWithName(string typeFullname)
        {
            return GetType(typeFullname) != null;
        }



        private static string SerializeTypeImpl(Type type)
        {
            string assemblyLocation = type.Assembly.Location;

            if ((assemblyLocation.StartsWith(CodeGenerationManager.TempAssemblyFolderPath, StringComparison.InvariantCultureIgnoreCase)) ||
                (assemblyLocation.IndexOf(CodeGenerationManager.CompositeGeneratedFileName, StringComparison.InvariantCultureIgnoreCase) >= 0))
            {
                return type.FullName;
            }
                
            return null;
        }
    }



    [Assembler(typeof(NonConfigurableTypeManagerTypeHandlerAssembler))]
    internal sealed class DynamicBuildManagerTypeManagerTypeHandlerData : TypeManagerTypeHandlerData
    {        
    }
}
