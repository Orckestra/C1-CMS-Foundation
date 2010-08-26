using System;
using System.Collections.Generic;
using System.Globalization;
using Composite.Data;
using Composite.Core.IO.Zip;


namespace Composite.Core.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class PackageUninstallerContext
    {
        private Dictionary<Type, Dictionary<DataScopeIdentifier, Dictionary<CultureInfo, List<DataKeyPropertyCollection>>>> _dataPendingForDeletion = new Dictionary<Type, Dictionary<DataScopeIdentifier, Dictionary<CultureInfo, List<DataKeyPropertyCollection>>>>();


        internal PackageUninstallerContext(IZipFileSystem zipFileSystem)
        {
            if (zipFileSystem == null) throw new ArgumentNullException("zipFileSystem");

            this.ZipFileSystem = zipFileSystem;
        }


        public IZipFileSystem ZipFileSystem { get; private set; }


        public void AddPendingForDeletionData(Type interfaceType, DataScopeIdentifier dataScopeIdentifier, CultureInfo locale, DataKeyPropertyCollection dataKeyPropertyCollection)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (dataScopeIdentifier == null) throw new ArgumentNullException("dataScopeIdentifier");
            if (dataKeyPropertyCollection == null) throw new ArgumentNullException("dataKeyPropertyCollection");

            List<DataKeyPropertyCollection> dataKeyPropertyCollections = GetDataKeyPropertyCollections(interfaceType, dataScopeIdentifier, locale);

            if (dataKeyPropertyCollections.Contains(dataKeyPropertyCollection) == true)
            {
                throw new ArgumentException(string.Format("The data item of type '{0}' with the key '{1}' has already been added", interfaceType, dataKeyPropertyCollection));
            }

            dataKeyPropertyCollections.Add(dataKeyPropertyCollection);
        }



        public bool IsPendingForDeletionData(IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            DataKeyPropertyCollection dataKeyPropertyCollection = data.CreateDataKeyPropertyCollection();

            return IsPendingForDeletionData(data.DataSourceId.InterfaceType, data.DataSourceId.DataScopeIdentifier, data.DataSourceId.LocaleScope, dataKeyPropertyCollection);
        }



        public bool IsPendingForDeletionData(Type interfaceType, DataScopeIdentifier dataScopeIdentifier, CultureInfo locale, DataKeyPropertyCollection dataKeyPropertyCollection)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (dataScopeIdentifier == null) throw new ArgumentNullException("dataScopeIdentifier");
            if (dataKeyPropertyCollection == null) throw new ArgumentNullException("dataKeyPropertyCollection");

            List<DataKeyPropertyCollection> dataKeyPropertyCollections = GetDataKeyPropertyCollections(interfaceType, dataScopeIdentifier, locale);

            return dataKeyPropertyCollections.Contains(dataKeyPropertyCollection);
        }



        private List<DataKeyPropertyCollection> GetDataKeyPropertyCollections(Type interfaceType, DataScopeIdentifier dataScopeIdentifier, CultureInfo locale)
        {
            Dictionary<DataScopeIdentifier, Dictionary<CultureInfo, List<DataKeyPropertyCollection>>> dataKeyPropertyCollectionDataScopes;
            if (_dataPendingForDeletion.TryGetValue(interfaceType, out dataKeyPropertyCollectionDataScopes) == false)
            {
                dataKeyPropertyCollectionDataScopes = new Dictionary<DataScopeIdentifier, Dictionary<CultureInfo, List<DataKeyPropertyCollection>>>();
                _dataPendingForDeletion.Add(interfaceType, dataKeyPropertyCollectionDataScopes);
            }

            Dictionary<CultureInfo, List<DataKeyPropertyCollection>> dataKeyPropertyCollectionsLoclaes;
            if (dataKeyPropertyCollectionDataScopes.TryGetValue(dataScopeIdentifier, out dataKeyPropertyCollectionsLoclaes) == false)
            {
                dataKeyPropertyCollectionsLoclaes = new Dictionary<CultureInfo, List<DataKeyPropertyCollection>>();
                dataKeyPropertyCollectionDataScopes.Add(dataScopeIdentifier, dataKeyPropertyCollectionsLoclaes);
            }

            if (locale == null)
            {
                locale = CultureInfo.InvariantCulture;
            }

            List<DataKeyPropertyCollection> dataKeyPropertyCollections;
            if (dataKeyPropertyCollectionsLoclaes.TryGetValue(locale, out dataKeyPropertyCollections) == false)
            {
                dataKeyPropertyCollections = new List<DataKeyPropertyCollection>();
                dataKeyPropertyCollectionsLoclaes.Add(locale, dataKeyPropertyCollections);
            }

            return dataKeyPropertyCollections;
        }
    }
}
