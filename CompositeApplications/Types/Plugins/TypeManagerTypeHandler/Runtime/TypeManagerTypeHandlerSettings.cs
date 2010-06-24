using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Types.Plugins.TypeManagerTypeHandler.Runtime
{
    public sealed class TypeManagerTypeHandlerSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.Types.Plugins.TypeManagerTypeHandler";
        

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
