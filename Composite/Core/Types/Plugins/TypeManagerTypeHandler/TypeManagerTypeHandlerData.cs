using System.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.Types.Plugins.TypeManagerTypeHandler
{
    internal class TypeManagerTypeHandlerData : NameTypeConfigurationElement
    {
        private const string _priorityPropertyName = "priority";
        [ConfigurationProperty(_priorityPropertyName, IsRequired = true, IsKey = true)]
        public int Priority
        {
            get { return (int)base[_priorityPropertyName]; }
            set { base[_priorityPropertyName] = value; }
        }
    }
}
