using System;
using System.Collections.Generic;
using System.Reflection;
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
        private Dictionary<string, DataTypeDescriptor> _pendingDataTypeDescriptors = new Dictionary<string, DataTypeDescriptor>();
        private List<Type> _pendingDataTypes = new List<Type>();
        private List<Assembly> _pendingAssemblies = new List<Assembly>();
        private List<CultureInfo> _pendingLocales = new List<CultureInfo>();


        internal PackageInstallerContext(IZipFileSystem zipFileSystem, string tempDirectory, PackageInformation packageInformation)
        {
            if (zipFileSystem == null) throw new ArgumentNullException("zipFileSystem");
            if (string.IsNullOrEmpty(tempDirectory) == true) throw new ArgumentNullException("tempDirectory");
            if (packageInformation == null) throw new ArgumentNullException("packageInformation");

            this.ZipFileSystem = zipFileSystem;
            this.TempDirectory = tempDirectory;

#pragma warning disable 618
            this.AddOnInformation = packageInformation;
#pragma warning restore 618
            this.PackageInformation = packageInformation;
        }



        /// <exclude />
        public IZipFileSystem ZipFileSystem { get; private set; }

        /// <exclude />
        public string TempDirectory { get; private set; }

        /// <exclude />
        [Obsolete("Use PackageInformation")]
        public PackageInformation AddOnInformation { get; private set; }

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
            if (string.IsNullOrEmpty(interfaceName) == true) throw new ArgumentNullException("interfaceName");
            if (dataTypeDescriptor == null) throw new ArgumentNullException("dataTypeDescriptor");

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
            if (string.IsNullOrEmpty(interfaceName) == true) throw new ArgumentNullException("interfaceName");

            DataTypeDescriptor dataTypeDescriptor;

            _pendingDataTypeDescriptors.TryGetValue(interfaceName, out dataTypeDescriptor);

            return dataTypeDescriptor;
        }



        /// <exclude />
        public void AddPendingDataType(Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");

            if (_pendingDataTypes.Contains(interfaceType) == false)
            {
                _pendingDataTypes.Add(interfaceType);
            }
        }



        /// <exclude />
        public bool IsDataTypePending(Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");

            return _pendingDataTypes.Contains(interfaceType);
        }



        /// <exclude />
        public void AddPendingLocale(CultureInfo locale)
        {
            if (locale == null) throw new ArgumentNullException("locale");

            _pendingLocales.Add(locale);
        }



        /// <exclude />
        public bool IsLocalePending(CultureInfo locale)
        {
            if (locale == null) throw new ArgumentNullException("locale");

            return _pendingLocales.Contains(locale);
        }
    }
}
