using System;
using System.Configuration;
using System.ComponentModel;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.Configuration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class SimpleNameTypeConfigurationElement : ConfigurationElement
    {
        private const string _namePropertyName = "name";
        /// <exclude />
        [ConfigurationProperty(_namePropertyName, IsRequired=true)]
        public string Name
        {
            get { return (string)base[_namePropertyName]; }
            set { base[_namePropertyName] = value; }
        }


        private const string _typePropertyName = "type";
        /// <exclude />
        [ConfigurationProperty(_typePropertyName, IsRequired=true)]
        [TypeConverter(typeof(AssemblyQualifiedTypeNameConverter))]		
        public Type Type
        {
            get { return (Type)base[_typePropertyName]; }
            set { base[_typePropertyName] = value; }
        }
    }
}
