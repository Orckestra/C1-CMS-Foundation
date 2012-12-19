using System;
using System.ComponentModel;
using System.Configuration;
using Composite.Core.Configuration;
using Composite.Data.ProcessControlled;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Data.Foundation
{
    internal class ProcessControllerSettings : SerializableConfigurationSection
    {
        public const string SectionName = "Composite.Data.Foundation.ProcessControllerConfiguration";

        private const string ProcessControllersPropertyName = "ProcessControllers";
        [ConfigurationProperty(ProcessControllersPropertyName)]
        public NamedElementCollection<ProcessControllerData> ProcessControllers
        {
            get
            {
                return (NamedElementCollection<ProcessControllerData>)base[ProcessControllersPropertyName];
            }
        }
    }

    internal class ProcessControllerData : NamedConfigurationElement
    {
        private const string InterfaceTypePropertyName = "interfaceType";
        private const string AttributeTypePropertyName = "attributeType";

        /// <summary>
        /// The interface type for the <see cref="IProcessController"/> that will
        /// do the processing
        /// </summary>
        [ConfigurationProperty(InterfaceTypePropertyName, IsRequired = true)]
        [TypeConverter(typeof(TypeManagerTypeNameConverter))]
        public Type InterfaceType
        {
            get { return (Type)this[InterfaceTypePropertyName]; }
            set { this[InterfaceTypePropertyName] = value; }
        }

        /// <summary>
        /// The <see cref="ProcessControllerTypeAttribute"/> attached to the IData
        /// object
        /// </summary>
        [ConfigurationProperty(AttributeTypePropertyName, IsRequired = true)]
        [TypeConverter(typeof(TypeManagerTypeNameConverter))]
        public Type AttributeType
        {
            get { return (Type)this[AttributeTypePropertyName]; }
            set { this[AttributeTypePropertyName] = value; }
        }

    }
}