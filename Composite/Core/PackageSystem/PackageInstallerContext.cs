using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data.DynamicTypes;
using Composite.Core.IO.Zip;
using System.Globalization;


namespace Composite.Core.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class PackageInstallerContext
    {
        private readonly Dictionary<string, DataTypeDescriptor> _pendingDataTypeDescriptors = new Dictionary<string, DataTypeDescriptor>();
        private readonly List<Type> _pendingDataTypes = new List<Type>();
        private readonly List<CultureInfo> _pendingLocales = new List<CultureInfo>();


        internal PackageInstallerContext(IZipFileSystem zipFileSystem, string packageDirectory, string tempDirectory, PackageInformation packageInformation)
        {
            Verify.ArgumentNotNull(zipFileSystem, "zipFileSystem");
            Verify.ArgumentNotNullOrEmpty(tempDirectory, "tempDirectory");
            Verify.ArgumentNotNull(packageInformation, "packageInformation");

            this.ZipFileSystem = zipFileSystem;
            this.PackageDirectory = packageDirectory;
            this.TempDirectory = tempDirectory;
            this.PackageInformation = packageInformation;
        }



        /// <exclude />
        public IZipFileSystem ZipFileSystem { get; private set; }

        /// <exclude />
        public string PackageDirectory { get; private set; }
        
        /// <exclude />
        public string TempDirectory { get; private set; }

        /// <exclude />
        public PackageInformation PackageInformation { get; private set; }



        /// <summary>
        /// Use this method to register data type descriptors that have been validated and will be 
        /// intstalled.
        /// </summary>
        /// <param name="interfaceName"></param>
        /// <param name="dataTypeDescriptor"></param>
        public void AddPendingDataTypeDescritpor(string interfaceName, DataTypeDescriptor dataTypeDescriptor)
        {
            Verify.ArgumentNotNullOrEmpty(interfaceName, "interfaceName");
            Verify.ArgumentNotNull(dataTypeDescriptor, "dataTypeDescriptor");

            _pendingDataTypeDescriptors.Add(interfaceName, dataTypeDescriptor);
        }



        /// <summary>
        /// This method returns data type descriptors for dynamic types this is pending 
        /// installation (Has passed validaion).
        /// </summary>
        /// <param name="interfaceName"></param>
        /// <returns></returns>
        public DataTypeDescriptor GetPendingDataTypeDescriptor(string interfaceName)
        {
            Verify.ArgumentNotNullOrEmpty(interfaceName, "interfaceName");
            

            DataTypeDescriptor dataTypeDescriptor;

            if (_pendingDataTypeDescriptors.TryGetValue(interfaceName, out dataTypeDescriptor))
            {
                return dataTypeDescriptor;
            }

            Type interfaceType = _pendingDataTypes.FirstOrDefault(type => type.FullName == interfaceName);
            if (interfaceType == null) return null;

            return DynamicTypeManager.BuildNewDataTypeDescriptor(interfaceType);
        }



        /// <exclude />
        public void AddPendingDataType(Type interfaceType)
        {
            Verify.ArgumentNotNull(interfaceType, "interfaceType");

            if (_pendingDataTypes.Contains(interfaceType) == false)
            {
                _pendingDataTypes.Add(interfaceType);
            }
        }



        /// <exclude />
        public bool IsDataTypePending(Type interfaceType)
        {
            Verify.ArgumentNotNull(interfaceType, "interfaceType");

            return _pendingDataTypes.Contains(interfaceType);
        }


        /// <exclude />
        public bool IsDataTypePending(string typeName)
        {
            Verify.ArgumentNotNull(typeName, "typeName");

            return _pendingDataTypes.Any(type => type.FullName == typeName);
        }


        /// <exclude />
        public Type GetPendingDataType(string typeName)
        {
            return _pendingDataTypes.FirstOrDefault(type => type.FullName == typeName);
        }


        /// <exclude />
        public void AddPendingLocale(CultureInfo locale)
        {
            Verify.ArgumentNotNull(locale, "locale");

            _pendingLocales.Add(locale);
        }



        /// <exclude />
        public bool IsLocalePending(CultureInfo locale)
        {
            Verify.ArgumentNotNull(locale, "locale");

            return _pendingLocales.Contains(locale);
        }
    }
}
