using System;
using System.Linq;
using System.Collections.Generic;
using Composite.Data;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider
{
    internal sealed class XmlDataTypeStoresContainer
    {
        private readonly string _providerName;

        private readonly List<Type> _supportedInterfaces = new List<Type>();
        private readonly List<Type> _knownInterfaces = new List<Type>();
        private readonly List<Type> _generatedInterfaces = new List<Type>();

        // Data type -> XmlDataTypeStore
        private readonly Dictionary<Type, XmlDataTypeStore> _dataTypeStores = new Dictionary<Type, XmlDataTypeStore>();


        public XmlDataTypeStoresContainer(string providerName)
        {
            _providerName = providerName;
        }


        /// <summary>
        /// All working data types 
        /// </summary>
        public IEnumerable<Type> SupportedInterfaces => _supportedInterfaces;


        /// <summary>
        /// All data types, including non working due to config error or something else
        /// </summary>
        public IEnumerable<Type> KnownInterfaces => _knownInterfaces;


        /// <summary>
        /// All working generated data types
        /// </summary>
        public IEnumerable<Type> GeneratedInterfaces => _generatedInterfaces;


        public XmlDataTypeStore GetDataTypeStore(Type interfaceType)
        {
            XmlDataTypeStore result;

            if (!_dataTypeStores.TryGetValue(interfaceType, out result))
            {
                throw new ArgumentException($"The interface type '{interfaceType}' is not supported by the XmlDataProvider named '{_providerName}");
            }

            return result;
        }



        /// <summary>
        /// This method adds the support of the given data interface type to the xml data provider.
        /// </summary>
        /// <param name="interfaceType"></param>
        /// <param name="xmlDataTypeStore"></param>
        internal void AddSupportedDataTypeStore(Type interfaceType, XmlDataTypeStore xmlDataTypeStore)
        {
            Verify.That(!_dataTypeStores.ContainsKey(interfaceType), $"Interface type {interfaceType.FullName} has already been registered");

            _dataTypeStores.Add(interfaceType, xmlDataTypeStore);

            _supportedInterfaces.Add(interfaceType);
            AddKnownInterface(interfaceType);

            if (xmlDataTypeStore.IsGeneratedDataType)
            {
                _generatedInterfaces.Add(interfaceType);
            }
        }



        internal void UpdateSupportedDataTypeStore(Type interfaceType, XmlDataTypeStore xmlDataTypeStore)
        {
            Guid typeId = interfaceType.GetImmutableTypeId();
            Type type = _dataTypeStores.Where(f => f.Value.DataTypeDescriptor.DataTypeId == typeId).Select(f => f.Key).Single();

            _dataTypeStores.Remove(type);
            _dataTypeStores.Add(interfaceType, xmlDataTypeStore);

            _supportedInterfaces.Remove(type);
            _supportedInterfaces.Add(interfaceType);

            _knownInterfaces.Remove(type);
            _knownInterfaces.Add(interfaceType);
        }



        internal void AddKnownInterface(Type interfaceType)
        {
            _knownInterfaces.Add(interfaceType);
        }
    }
}
