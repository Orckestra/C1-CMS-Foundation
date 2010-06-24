using System;

using Microsoft.Practices.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.GlobalSettings.Plugins.GlobalSettingsProvider
{
    [Assembler(typeof(NonConfigurableGlobalSettingsProviderAssembler))]
    public sealed class NonConfigurableGlobalSettingsProvider : GlobalSettingsProviderData
    {
    }

    public sealed class NonConfigurableGlobalSettingsProviderAssembler : IAssembler<IGlobalSettingsProvider, GlobalSettingsProviderData>
    {
        public IGlobalSettingsProvider Assemble(IBuilderContext context, GlobalSettingsProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IGlobalSettingsProvider)Activator.CreateInstance(objectConfiguration.Type);            
        }
    }
}
