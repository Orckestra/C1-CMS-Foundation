using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.Types.Plugins.TypeManagerTypeHandler.Runtime
{
    internal sealed class TypeManagerTypeHandlerSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.Core.Types.Plugins.TypeManagerTypeHandler";
        

        private const string _typeManagerTypeHandlerPluginsProperty = "TypeManagerTypeHandlerPlugins";
        [ConfigurationProperty(_typeManagerTypeHandlerPluginsProperty, IsRequired = true)]
        public NameTypeConfigurationElementCollection<TypeManagerTypeHandlerData, TypeManagerTypeHandlerData> TypeManagerTypeHandlerPlugins
        {
            get
            {
                return (NameTypeConfigurationElementCollection<TypeManagerTypeHandlerData, TypeManagerTypeHandlerData>)base[_typeManagerTypeHandlerPluginsProperty];
            }
        }
    }
}
