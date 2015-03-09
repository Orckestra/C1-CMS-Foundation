using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider
{
    internal class XmlDataTypeStoreCreator
    {
        private readonly string _fileStoreDirectory;


        /// <summary>
        /// </summary>
        /// <param name="fileStoreDirectory"></param>
        public XmlDataTypeStoreCreator(string fileStoreDirectory)
        {
            _fileStoreDirectory = fileStoreDirectory;
        }



        /// <summary>
        /// This class is used to create <see cref="XmlDataTypeStore"/>.
        /// Either for existing stores or for just newly created/added stores.
        /// There exist one store for each data type that the provider handles.
        /// While the <see cref="XmlDataTypeStore"/> is created, the input and 
        /// configuration is validated.
        /// </summary>
        /// <param name="dataTypeDescriptor"></param>
        /// <param name="dataProviderHelperClassType">The runtime type for the generated implementation of <see cref="IXmlDataProviderHelper"/></param>
        /// <param name="dataIdClassType">The runtime type for the generated data id class.</param>
        /// <param name="xmlDataTypeStoreDataScopes">If this is null, default values will be created.</param>
        /// <returns>
        /// Returns a <see cref="XmlDataTypeStore"/> if it is valid, else null 
        /// </returns>
        public XmlDataTypeStore CreateStoreResult(DataTypeDescriptor dataTypeDescriptor, Type dataProviderHelperClassType, Type dataIdClassType, IEnumerable<XmlDataTypeStoreDataScope> xmlDataTypeStoreDataScopes)
        {
            if (xmlDataTypeStoreDataScopes == null)
            {
                var defaultDataScopes = new List<XmlDataTypeStoreDataScope>();

                IEnumerable<string> cultureNames;
                if (dataTypeDescriptor.Localizeable)
                {
                    cultureNames = DataLocalizationFacade.ActiveLocalizationNames;
                }
                else
                {
                    cultureNames = new[] { CultureInfo.InvariantCulture.Name };
                }

                foreach (DataScopeIdentifier dataScopeIdentifier in dataTypeDescriptor.DataScopes.Distinct())
                {
                    foreach (string cultureName in cultureNames)
                    {
                        var defaultXmlDataTypeStoreDataScope = new XmlDataTypeStoreDataScope
                        {
                            DataScopeName = dataScopeIdentifier.Name,
                            CultureName = cultureName,
                            ElementName = NamesCreator.MakeElementName(dataTypeDescriptor),
                            Filename = Path.Combine(_fileStoreDirectory, NamesCreator.MakeFileName(dataTypeDescriptor, dataScopeIdentifier, cultureName))
                        };

                        var document = new XDocument(new XElement(defaultXmlDataTypeStoreDataScope.ElementName));
                        document.SaveToFile(defaultXmlDataTypeStoreDataScope.Filename);

                        defaultDataScopes.Add(defaultXmlDataTypeStoreDataScope);
                    }
                }

                xmlDataTypeStoreDataScopes = defaultDataScopes;
            }
            
            return new XmlDataTypeStore(dataTypeDescriptor, dataProviderHelperClassType, dataIdClassType, xmlDataTypeStoreDataScopes, dataTypeDescriptor.IsCodeGenerated);
        }
    }
}
