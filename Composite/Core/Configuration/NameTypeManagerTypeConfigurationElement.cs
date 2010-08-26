using System;
using System.Configuration;
using System.ComponentModel;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.Configuration
{
    /// <summary>
    /// Represents a <see cref="ConfigurationElement"/> that has a name and type known to <see cref="Composite.Core.Types.TypeManager"/>.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class NameTypeManagerTypeConfigurationElement : NamedConfigurationElement, IObjectWithNameAndType
    {
        private const string _typePropertyName = "type";

        /// <summary>
        /// Gets or sets the <see cref="Type"/> the element is the configuration for.
        /// </summary>
        /// <value>
        /// The <see cref="Type"/> the element is the configuration for.
        /// </value>
        [ConfigurationProperty(_typePropertyName, IsRequired = true)]
        [TypeConverter(typeof(TypeManagerTypeNameConverter))]
        public Type Type
        {
            get
            {
                return (Type)this[_typePropertyName];
            }
            set
            {
                this[_typePropertyName] = value;
            }
        }
    }
}
