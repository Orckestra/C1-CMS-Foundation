using System;

using Microsoft.Practices.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.Types.Plugins.TypeManagerTypeHandler
{
    [Assembler(typeof(NonConfigurableTypeManagerTypeHandlerAssembler))]
    internal sealed class NonConfigurableTypeManagerTypeHandler : TypeManagerTypeHandlerData
    {
    }


    internal sealed class NonConfigurableTypeManagerTypeHandlerAssembler : IAssembler<ITypeManagerTypeHandler, TypeManagerTypeHandlerData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public ITypeManagerTypeHandler Assemble(IBuilderContext context, TypeManagerTypeHandlerData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (ITypeManagerTypeHandler)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
