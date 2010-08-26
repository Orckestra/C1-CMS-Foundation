using System;
using System.Configuration;
using System.Xml;
using Composite.Core.Logging;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.Configuration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class NameTypeManagerTypeConfigurationElementCollection<T> : PolymorphicConfigurationElementCollection<T>
        where T : NameTypeManagerTypeConfigurationElement, new()
    {
        private const string typeAttribute = "type";

        /// <summary>
        /// Get the configuration object for each <see cref="NameTypeConfigurationElement"/> object in the collection.
        /// </summary>
        /// <param name="reader">The <see cref="XmlReader"/> that is deserializing the element.</param>
        protected override Type RetrieveConfigurationElementType(XmlReader reader)
        {
            Type configurationElementType = null;
            if (reader.AttributeCount > 0)
            {
                // expect the first attribute to be the name
                for (bool go = reader.MoveToFirstAttribute(); go; go = reader.MoveToNextAttribute())
                {
                    if (typeAttribute.Equals(reader.Name))
                    {
                        Type providerType = Type.GetType(reader.Value);
                        if (providerType == null)
                        {
                            LoggingService.LogCritical("Configuration", string.Format("Could not create type '{0}' ", reader.Value));

                            throw new ConfigurationErrorsException(string.Format("Type '{0}' could not be created", reader.Value));
                        }

                        Attribute attribute = Attribute.GetCustomAttribute(providerType, typeof(ConfigurationElementTypeAttribute));
                        if (attribute == null)
                        {
                            Type dataElementType = typeof(T);
                            attribute = Attribute.GetCustomAttribute(dataElementType, typeof(ConfigurationElementTypeAttribute));
                        }


                        if (attribute == null)
                        {
                            throw new ConfigurationErrorsException(string.Format("The type {0} does not contain the ConfigurationElementTypeAttribute.", providerType.Name));
                        }

                        configurationElementType = ((ConfigurationElementTypeAttribute)attribute).ConfigurationType;

                        break;
                    }
                }

                if (configurationElementType == null)
                {
                    throw new ConfigurationErrorsException(string.Format("The type attribute does not exist on the element {0}.", reader.Name));
                }

                // cover the traces ;)
                reader.MoveToElement();
            }
            return configurationElementType;
        }
    }
}
