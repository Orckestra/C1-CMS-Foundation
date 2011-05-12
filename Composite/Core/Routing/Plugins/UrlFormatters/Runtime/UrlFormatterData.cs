using System.Configuration;
using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Core.Routing.Plugins.UrlFormatters.Runtime
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [ConfigurationElementType(typeof(NonConfigurableUrlFormatter))]
    public class UrlFormatterData : NameTypeManagerTypeConfigurationElement
    {
        private const string MandatoryPropertyName = "mandatory";

        /// <exclude />
        [ConfigurationProperty(MandatoryPropertyName, IsRequired = true)]
        public bool Mandatory
        {
            get
            {
                return (bool)this[MandatoryPropertyName];
            }
            set
            {
                this[MandatoryPropertyName] = value;
            }
        }
    }
}
