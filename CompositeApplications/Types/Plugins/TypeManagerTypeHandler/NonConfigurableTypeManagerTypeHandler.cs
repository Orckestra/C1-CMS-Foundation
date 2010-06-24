using System;

using Microsoft.Practices.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Types.Plugins.TypeManagerTypeHandler
{
    [Assembler(typeof(NonConfigurableTypeManagerTypeHandlerAssembler))]
    public sealed class NonConfigurableTypeManagerTypeHandler : TypeManagerTypeHandlerData
    {
    }


    public sealed class NonConfigurableTypeManagerTypeHandlerAssembler : IAssembler<ITypeManagerTypeHandler, TypeManagerTypeHandlerData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public ITypeManagerTypeHandler Assemble(IBuilderContext context, TypeManagerTypeHandlerData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (ITypeManagerTypeHandler)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
