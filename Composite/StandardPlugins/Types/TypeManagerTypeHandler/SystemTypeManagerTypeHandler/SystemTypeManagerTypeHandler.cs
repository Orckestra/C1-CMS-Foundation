using System;
using Composite.Types;
using Composite.Types.Plugins.TypeManagerTypeHandler;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.StandardPlugins.Types.TypeManagerTypeHandler.SystemTypeManagerTypeHandler
{
    [ConfigurationElementType(typeof(SystemTypeManagerTypeHandlerData))]
    public sealed class SystemTypeManagerTypeHandler : ITypeManagerTypeHandler
    {
        public Type GetType(string fullName)
        {
            Type type = null;
            try
            {
                type = Type.GetType(fullName);
            }
            catch (Exception)
            {
                // Suppress all exceptions
            }

            return type;
        }



        public string SerializeType(Type type)
        {
            if (type.FullName.StartsWith("System") == false)
            {
                return type.GetVersionNeutralName();
            }
            else
            {
                return type.AssemblyQualifiedName;
            }
        }



        public bool HasTypeWithName(string typeFullname)
        {
            return GetType(typeFullname) != null;
        }
    }



    [Assembler(typeof(NonConfigurableTypeManagerTypeHandlerAssembler))]
    public sealed class SystemTypeManagerTypeHandlerData : TypeManagerTypeHandlerData
    {
    }
}
