using System;
using System.Collections.Generic;
using System.Globalization;
using Composite.Core.Extensions;
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
        private readonly Dictionary<Type, Dictionary<DataScopeIdentifier, Dictionary<CultureInfo, List<DataKeyPropertyCollection>>>> _dataPendingForDeletion 
            = new Dictionary<Type, Dictionary<DataScopeIdentifier, Dictionary<CultureInfo, List<DataKeyPropertyCollection>>>>();


        private readonly HashSet<Type> _typesToBeDeleted = new HashSet<Type>();

        internal PackageUninstallerContext(IZipFileSystem zipFileSystem, string packageDirectory, PackageInformation packageInformation)
        {
            Verify.ArgumentNotNull(zipFileSystem, "zipFileSystem");

            this.ZipFileSystem = zipFileSystem;
            this.PackageDirectory = packageDirectory;
            this.PackageInformation = packageInformation;
        }


        /// <exclude />
        public IZipFileSystem ZipFileSystem { get; private set; }

        /// <exclude />
        public string PackageDirectory { get; private set; }

        /// <exclude />
        public PackageInformation PackageInformation { get; private set; }


        /// <exclude />
        public void AddPendingForDeletionData(Type interfaceType, DataScopeIdentifier dataScopeIdentifier, CultureInfo locale, DataKeyPropertyCollection dataKeyPropertyCollection)
        {
            Verify.ArgumentNotNull(interfaceType, "interfaceType");
            Verify.ArgumentNotNull(dataScopeIdentifier, "dataScopeIdentifier");
            Verify.ArgumentNotNull(dataKeyPropertyCollection, "dataKeyPropertyCollection");

            List<DataKeyPropertyCollection> dataKeyPropertyCollections = GetDataKeyPropertyCollection(interfaceType, dataScopeIdentifier, locale);

            if (dataKeyPropertyCollections.Contains(dataKeyPropertyCollection))
            {
                throw new ArgumentException(string.Format("The data item of type '{0}' with the key '{1}' has already been added", interfaceType, dataKeyPropertyCollection));
            }

            dataKeyPropertyCollections.Add(dataKeyPropertyCollection);
        }



        /// <exclude />
        public bool IsPendingForDeletionData(IData data)
        {
            Verify.ArgumentNotNull(data, "data");

            if (_typesToBeDeleted.Contains(data.DataSourceId.InterfaceType))
            {
                return true;
            }

            DataKeyPropertyCollection dataKeyPropertyCollection = data.CreateDataKeyPropertyCollection();

            return IsPendingForDeletionData(data.DataSourceId.InterfaceType, data.DataSourceId.DataScopeIdentifier, data.DataSourceId.LocaleScope, dataKeyPropertyCollection);
        }



        /// <exclude />
        public bool IsPendingForDeletionData(Type interfaceType, DataScopeIdentifier dataScopeIdentifier, CultureInfo locale, DataKeyPropertyCollection dataKeyPropertyCollection)
        {
            Verify.ArgumentNotNull(interfaceType, "interfaceType");
            Verify.ArgumentNotNull(dataScopeIdentifier, "dataScopeIdentifier");
            Verify.ArgumentNotNull(dataKeyPropertyCollection, "dataKeyPropertyCollection");

            List<DataKeyPropertyCollection> dataKeyPropertyCollections = GetDataKeyPropertyCollection(interfaceType, dataScopeIdentifier, locale);

            return dataKeyPropertyCollections.Contains(dataKeyPropertyCollection);
        }



        private List<DataKeyPropertyCollection> GetDataKeyPropertyCollection(Type interfaceType, DataScopeIdentifier dataScopeIdentifier, CultureInfo locale)
        {
            if (locale == null)
            {
                locale = CultureInfo.InvariantCulture;
            }

            return _dataPendingForDeletion
                .GetOrAdd(interfaceType, () => new Dictionary<DataScopeIdentifier, Dictionary<CultureInfo, List<DataKeyPropertyCollection>>>())
                .GetOrAdd(dataScopeIdentifier, () => new Dictionary<CultureInfo, List<DataKeyPropertyCollection>>())
                .GetOrAdd(locale, () => new List<DataKeyPropertyCollection>());
        }

        internal void AddPendingForDeletionDataType(Type intefaceType)
        {
            _typesToBeDeleted.Add(intefaceType);
        }
    }
}
