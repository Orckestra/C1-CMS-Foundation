using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation;
using System.Xml.Linq;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider
{
    /// <summary>
    /// This class contains information used by the XmlDataProvider 
    /// when handling CRUD operations.
    /// There exists one of these per data type. 
    /// This class contains one entry per data-scope/locale-scope that contains
    /// the filename and element name.
    /// </summary>
    [DebuggerDisplay("{" + nameof(DataTypeDescriptor) + "}")]
    internal sealed class XmlDataTypeStore
    {
        private IXmlDataProviderHelper _helper;

        private readonly IEnumerable<XmlDataTypeStoreDataScope> _xmlDateTypeStoreDataScopes;


        public XmlDataTypeStore(DataTypeDescriptor dataTypeDescriptor, Type dataProviderHelperType, Type dataIdClassType, IEnumerable<XmlDataTypeStoreDataScope> xmlDateTypeStoreDataScopes, bool isGeneratedDataType)
        {
            DataTypeDescriptor =  dataTypeDescriptor ?? throw new ArgumentNullException(nameof(dataTypeDescriptor));
            DataProviderHelperType = dataProviderHelperType ?? throw new ArgumentNullException(nameof(dataProviderHelperType));
            DataIdClassType = dataIdClassType ?? throw new ArgumentNullException(nameof(dataIdClassType));
            IsGeneratedDataType = isGeneratedDataType;

            _xmlDateTypeStoreDataScopes = xmlDateTypeStoreDataScopes.Evaluate();

            var ordering = new List<Func<XElement, IComparable>>();
            foreach (string key in dataTypeDescriptor.KeyPropertyNames)
            {
                XName localKey = key;
                ordering.Add(f => (string)f.Attribute(localKey) ?? "");
            }
            Func<IEnumerable<XElement>, IOrderedEnumerable<XElement>> orderer = f => ordering.Skip(1).Aggregate(f.OrderBy(ordering.First()), Enumerable.ThenBy); 

            foreach (XmlDataTypeStoreDataScope xmlDataTypeStoreDataScope in _xmlDateTypeStoreDataScopes)
            {
                DataScopeIdentifier dataScopeIdentifier = DataScopeIdentifier.Deserialize(xmlDataTypeStoreDataScope.DataScopeName);
                CultureInfo culture = CultureInfo.CreateSpecificCulture(xmlDataTypeStoreDataScope.CultureName);
                Type dataType = dataTypeDescriptor.GetInterfaceType();

                Action cacheFlush = () => DataEventSystemFacade.FireExternalStoreChangedEvent(dataType, dataScopeIdentifier.ToPublicationScope(), culture);
                XmlDataProviderDocumentCache.RegisterExternalFileChangeAction(xmlDataTypeStoreDataScope.Filename, cacheFlush);

                XmlDataProviderDocumentWriter.RegisterFileOrderer(xmlDataTypeStoreDataScope.Filename, orderer);
            }
        }


        public DataTypeDescriptor DataTypeDescriptor { get; }

        /// <summary>
        /// This is a implementation of <see cref="IXmlDataProviderHelper"/> and <see cref="Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration.DataProviderHelperBase"/>
        /// </summary>
        public Type DataProviderHelperType { get; }

        public Type DataIdClassType { get; }

        public bool IsGeneratedDataType { get; }


        public bool HasDataScopeName(DataScopeIdentifier dataScopeIdentifier)
        {
            return _xmlDateTypeStoreDataScopes.Any(f => f.DataScopeName == dataScopeIdentifier.Name);
        }


        public XmlDataTypeStoreDataScope GetDataScopeForType(Type type)
        {
            var currentDataScope = DataScopeManager.MapByType(type);
            var culture = LocalizationScopeManager.MapByType(type);

            return GetDataScope(currentDataScope, culture, type);
        }

        public XmlDataTypeStoreDataScope GetDataScope(DataScopeIdentifier dataScope, CultureInfo culture, Type type)
        {
            string dataScopeName = dataScope.Name;
            Verify.That(HasDataScopeName(dataScope), "The store named '{0}' is not supported for data type '{1}'", dataScopeName, type);

            string cultureName = culture.Name;

            XmlDataTypeStoreDataScope dateTypeStoreDataScope =
                _xmlDateTypeStoreDataScopes.SingleOrDefault(f => f.DataScopeName == dataScopeName && f.CultureName == cultureName);

            if (dateTypeStoreDataScope == null)
            {
                if (culture.Equals(CultureInfo.InvariantCulture) && DataLocalizationFacade.IsLocalized(type))
                {
                    throw new InvalidOperationException($"Failed to get data for type '{type.FullName}', no localization scope is provided for a localized type.");
                }

                throw new InvalidOperationException("Failed to get '{0}' data for data scope ({1}, {2})"
                    .FormatWith(type.FullName, dataScopeName, culture.Equals(CultureInfo.InvariantCulture) ? "invariant" : cultureName));
            }

            return dateTypeStoreDataScope;
        }


        internal IEnumerable<XmlDataTypeStoreDataScope> XmlDataTypeStoreDataScopes => _xmlDateTypeStoreDataScopes;


        public IXmlDataProviderHelper Helper
        {
            get
            {
                if (_helper == null)
                {
                    _helper = (IXmlDataProviderHelper)Activator.CreateInstance(this.DataProviderHelperType);
                }

                return _helper;
            }
        }
    }
}
