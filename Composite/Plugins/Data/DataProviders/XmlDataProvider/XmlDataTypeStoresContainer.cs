using System;
using System.Collections.Generic;
using System.Text;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider
{
#warning MRJ: BM: Rethink the errors and configured part of this class
    internal sealed class XmlDataTypeStoresContainer
    {
        private readonly string _providerName;
        private readonly string _fileStoreDirectory;

        private readonly List<Type> _supportedInterface = new List<Type>();
        private readonly List<Type> _knownInterface = new List<Type>();
        private readonly List<Type> _generatedInterface = new List<Type>();

        // Data type -> XmlDataTypeStore
        private readonly Dictionary<Type, XmlDataTypeStore> _dataTypeStores = new Dictionary<Type, XmlDataTypeStore>();

        // Data type -> XmlDataTypeStore
        private readonly Dictionary<Type, List<string>> _dataTypeErrors = new Dictionary<Type, List<string>>();


        public XmlDataTypeStoresContainer(string providerName, string fileStoreDirectory)
        {
            _providerName = providerName;
            _fileStoreDirectory = fileStoreDirectory;
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

#warning MRJ: Display errors here??? Not on creation of the datatypoestore????
            List<string> errors = this.GetErrors(interfaceType);
            if (errors != null)
            {
                StringBuilder sb = new StringBuilder();
                sb.AppendLine(string.Format("The interface type '{0}' was not configured correctly with the following errors:", interfaceType));
                foreach (string error in errors)
                {
                    sb.AppendLine(error);
                }

                throw new InvalidOperationException(sb.ToString());
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

            if (xmlDataTypeStore.IsGeneretedDataType)
            {
                _generatedInterface.Add(interfaceType);
            }
        }



        internal void AddKnownInterface(Type interfaceType)
        {
            _knownInterface.Add(interfaceType);
        }








#warning MRJ: Clean this!!!!!!


        private List<string> GetErrors(Type interfaceType)
        {
            List<string> errors = null;

            foreach (KeyValuePair<Type, List<string>> kvp in _dataTypeErrors)
            {
                if (kvp.Key == interfaceType)
                {
                    if (errors == null)
                    {
                        errors = new List<string>();
                    }

                    errors.AddRange(kvp.Value);
                }
            }

            return errors;
        }






        internal void AddStoreError(Type interfaceType, List<string> errors)
        {
#warning MRJ: Implement this!
            /*   List<string> errorList = null;
            foreach (KeyValuePair<Type, List<string>> kvp in _dataTypeErrors)
            {
                if (kvp.Key == interfaceType)
                {
                    errorList = kvp.Value;
                }
            }

            if (errorList == null)
            {
                _dataTypeErrors.Add()
            }
            else
            {
                errorList.AddRange(errors);
            }*/
        }
    }
}
