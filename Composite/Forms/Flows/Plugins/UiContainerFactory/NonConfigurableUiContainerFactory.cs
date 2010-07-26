using System;

using Microsoft.Practices.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Forms.Flows.Plugins.UiContainerFactory
{
    [Assembler(typeof(NonConfigurableUiContainerFactoryAssembler))]
    internal sealed class NonConfigurableUiContainerFactory : UiContainerFactoryData
    {
    }



    internal sealed class NonConfigurableUiContainerFactoryAssembler : IAssembler<IUiContainerFactory, UiContainerFactoryData>
    {
        public IUiContainerFactory Assemble(IBuilderContext context, UiContainerFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IUiContainerFactory)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
