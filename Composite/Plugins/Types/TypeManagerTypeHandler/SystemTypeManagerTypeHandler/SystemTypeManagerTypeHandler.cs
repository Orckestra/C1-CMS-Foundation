using System;
using Composite.Core.Types;
using Composite.Core.Types.Plugins.TypeManagerTypeHandler;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Plugins.Types.TypeManagerTypeHandler.SystemTypeManagerTypeHandler
{
    [ConfigurationElementType(typeof(SystemTypeManagerTypeHandlerData))]
    internal sealed class SystemTypeManagerTypeHandler : ITypeManagerTypeHandler
    {
        public Type GetType(string fullName)
        {
            if(fullName.Contains(":"))
            {
                return null;
            }

            try
            {
                return Type.GetType(fullName);
            }
            catch (Exception)
            {
                // Suppress all exceptions
                return null;
            }
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
    internal sealed class SystemTypeManagerTypeHandlerData : TypeManagerTypeHandlerData
    {
    }
}
