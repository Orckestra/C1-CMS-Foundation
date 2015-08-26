using System;
using System.Linq;
using System.Collections.Generic;
using Composite.Data;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider
{
    internal sealed class XmlDataTypeStoresContainer
    {
        private readonly string _providerName;

        private readonly List<Type> _supportedInterface = new List<Type>();
        private readonly List<Type> _knownInterface = new List<Type>();
        private readonly List<Type> _generatedInterface = new List<Type>();

        // Data type -> XmlDataTypeStore
        private readonly Dictionary<Type, XmlDataTypeStore> _dataTypeStores = new Dictionary<Type, XmlDataTypeStore>();        


        public XmlDataTypeStoresContainer(string providerName)
        {
            _providerName = providerName;
        }


        /// <summary>
        /// All working data types 
        /// </summary>
        public IEnumerable<Type> SupportedInterface { get { return _supportedInterface; } }


        /// <summary>
        /// All data types, including non working due to config error or something else
        /// </summary>
        public IEnumerable<Type> KnownInterfaces { get { return _knownInterface; } }


        /// <summary>
        /// All working generated data types
        /// </summary>
        public IEnumerable<Type> GeneratedInterfaces { get { return _generatedInterface; } }



        public XmlDataTypeStore GetDataTypeStore(Type interfaceType)
        {
            XmlDataTypeStore result;

            if (_dataTypeStores.TryGetValue(interfaceType, out result) == false)
            {
                throw new ArgumentException(string.Format("The interface type '{0}' is not supported by the XmlDataProvider named '{1}", interfaceType, _providerName));
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
            _dataTypeStores.Add(interfaceType, xmlDataTypeStore);

            _supportedInterface.Add(interfaceType);
            AddKnownInterface(interfaceType);

            if (xmlDataTypeStore.IsGeneratedDataType)
            {
                _generatedInterface.Add(interfaceType);
            }
        }



        internal void UpdateSupportedDataTypeStore(Type interfaceType, XmlDataTypeStore xmlDataTypeStore)
        {
            Type type = _dataTypeStores.Where(f => f.Value.DataTypeDescriptor.DataTypeId == interfaceType.GetImmutableTypeId()).Select(f => f.Key).Single();
            _dataTypeStores.Remove(type);
            _dataTypeStores.Add(interfaceType, xmlDataTypeStore);

            _supportedInterface.Remove(type);
            _supportedInterface.Add(interfaceType);

            _knownInterface.Remove(type);
            _knownInterface.Add(interfaceType);
        }



        internal void AddKnownInterface(Type interfaceType)
        {
            _knownInterface.Add(interfaceType);
        }
    }
}
