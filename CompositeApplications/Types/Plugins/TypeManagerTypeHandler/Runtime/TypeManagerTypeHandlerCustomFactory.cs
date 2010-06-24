using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Types.Plugins.TypeManagerTypeHandler.Runtime
{
    internal sealed class TypeManagerTypeHandlerCustomFactory : AssemblerBasedCustomFactory<ITypeManagerTypeHandler, TypeManagerTypeHandlerData>
    {
        protected override TypeManagerTypeHandlerData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            TypeManagerTypeHandlerSettings settings = configurationSource.GetSection(TypeManagerTypeHandlerSettings.SectionName) as TypeManagerTypeHandlerSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", TypeManagerTypeHandlerSettings.SectionName));
            }

            return settings.TypeManagerTypeHandlerPlugins.Get(name);
        }
    }
}
