using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.C1Console.Users;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.Types;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataPackageFragmentInstaller : BasePackageFragmentInstaller
    {
        private List<DataType> _dataTypes;
        private List<PackageFragmentValidationResult> _validationResult;

        private Dictionary<Type, TypeKeyInstallationData> _dataKeysToBeInstalled;
        private Dictionary<Type, HashSet<KeyValuePair<string, object>>> _missingDataReferences;

        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            _validationResult = new List<PackageFragmentValidationResult>();
            _dataKeysToBeInstalled = new Dictionary<Type, TypeKeyInstallationData>();
            _missingDataReferences = new Dictionary<Type, HashSet<KeyValuePair<string, object>>>();

            if (this.Configuration.Count(f => f.Name == "Types") > 1)
            {
                _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.OnlyOneElement"));
                return _validationResult;
            }

            _dataTypes = new List<DataType>();

            ValidateConfiguration();

            foreach (DataType dataType in _dataTypes)
            {
                dataType.InterfaceType = TypeManager.TryGetType(dataType.InterfaceTypeName);


                if (dataType.IsDynamicAdded || this.InstallerContext.IsDataTypePending(dataType.InterfaceTypeName))
                {
                    ValidateDynamicAddedType(dataType);
                }
                else
                {
                    ValidateNonDynamicAddedType(dataType);
                }
            }

            if (_validationResult.Count > 0)
            {
                _dataTypes = null;
            }

            return _validationResult;
        }



        /// <exclude />
        public override IEnumerable<XElement> Install()
        {
            Verify.IsNotNull(_dataTypes, "DataPackageFragmentInstaller has not been validated");

            List<XElement> typeElements = new List<XElement>();
            foreach (DataType dataType in _dataTypes)
            {
                Log.LogVerbose("DataPackageFragmentInstaller", string.Format("Installing data for the type '{0}'", dataType.InterfaceType));

                if (dataType.IsDynamicAdded || dataType.InterfaceType == null)
                {
                    dataType.InterfaceType = this.InstallerContext.IsDataTypePending(dataType.InterfaceTypeName)
                        ? this.InstallerContext.GetPendingDataType(dataType.InterfaceTypeName)
                        : TypeManager.GetType(dataType.InterfaceTypeName);

                    Verify.IsNotNull(dataType.InterfaceType, "Failed to get interface type by name: '{0}'", dataType.InterfaceTypeName);
                }

                XElement typeElement = new XElement("Type",
                    new XAttribute("type", TypeManager.SerializeType(dataType.InterfaceType)),
                    new XAttribute("dataScopeIdentifier", dataType.DataScopeIdentifier));


                using (new DataScope(dataType.DataScopeIdentifier))
                {
                    if (dataType.AddToAllLocales)
                    {
                        foreach (CultureInfo locale in DataLocalizationFacade.ActiveLocalizationCultures)
                        {
                            using (new DataScope(locale))
                            {
                                XElement element = AddData(dataType, locale);
                                typeElement.Add(element);
                            }
                        }
                    }
                    else if (dataType.AddToCurrentLocale)
                    {
                        using (new DataScope(UserSettings.ActiveLocaleCultureInfo))
                        {
                            XElement element = AddData(dataType, UserSettings.ActiveLocaleCultureInfo);
                            typeElement.Add(element);
                        }
                    }
                    else if (dataType.Locale != null)
                    {
                        if (DataLocalizationFacade.ActiveLocalizationCultures.Contains(dataType.Locale))
                        {
                            using (new DataScope(dataType.Locale))
                            {
                                XElement element = AddData(dataType, dataType.Locale);
                                typeElement.Add(element);
                            }
                        }
                    }
                    else
                    {
                        using (new DataScope(UserSettings.ActiveLocaleCultureInfo))
                        {
                            XElement element = AddData(dataType, null);
                            typeElement.Add(element);
                        }
                    }
                }

                typeElements.Add(typeElement);
            }

            yield return new XElement("Types", typeElements);
        }


        private static Type GetInstalledVersionOfPendingType(Type interfaceType, IData data)
        {
            return data.GetType().GetInterfaces().FirstOrDefault(i => i.FullName == interfaceType.FullName);
        }


        private static XElement AddData(DataType dataType, CultureInfo cultureInfo)
        {
            XElement datasElement = new XElement("Datas");

            if (cultureInfo != null)
            {
                datasElement.Add(new XAttribute("locale", cultureInfo.Name));
            }

            foreach (XElement addElement in dataType.Dataset)
            {
                IData data = DataFacade.BuildNew(dataType.InterfaceType);

                if (!dataType.InterfaceType.IsInstanceOfType(data))
                {
                    dataType.InterfaceType = GetInstalledVersionOfPendingType(dataType.InterfaceType, data);
                }

                foreach (XAttribute attribute in addElement.Attributes())
                {
                    if (IsObsoleteField(dataType, attribute.Name.LocalName))
                    {
                        continue;
                    }

                    PropertyInfo propertyInfo = dataType.InterfaceType.GetPropertiesRecursively().Single(f => f.Name == attribute.Name);

                    propertyInfo.SetValue(data, ValueTypeConverter.Convert(attribute.Value, propertyInfo.PropertyType), null);
                }

                ILocalizedControlled localizedControlled = data as ILocalizedControlled;
                if (localizedControlled != null)
                {
                    localizedControlled.SourceCultureName = LocalizationScopeManager.MapByType(dataType.InterfaceType).Name;
                }

                DataFacade.AddNew(data, false, true, false); // Ignore validation, this should have been done in the validation face

                XElement keysElement = new XElement("Keys");

                foreach (PropertyInfo propertyInfo in data.GetKeyProperties())
                {
                    string keyName = propertyInfo.Name;
                    object keyValue = propertyInfo.GetValue(data, null);

                    XElement keyElement = new XElement("Key",
                        new XAttribute("name", keyName),
                        new XAttribute("value", keyValue));

                    keysElement.Add(keyElement);
                }

                datasElement.Add(keysElement);
            }

            return datasElement;
        }



        private void ValidateConfiguration()
        {
            XElement typesElement = this.Configuration.SingleOrDefault(f => f.Name == "Types");
            if (typesElement == null)
            {
                _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingElement"));
            }

            if (typesElement == null) return;

            foreach (XElement typeElement in typesElement.Elements("Type"))
            {
                string interfaceTypeName = null;


                XAttribute typeAttribute = typeElement.Attribute("type");
                if (typeAttribute == null)
                {
                    _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingAttribute").FormatWith("type"), typeElement);
                    continue;
                }
                
                interfaceTypeName = typeAttribute.Value;

                interfaceTypeName = TypeManager.FixLegasyTypeName(interfaceTypeName);

                foreach (XElement dataElement in typeElement.Elements("Data"))
                {
                    XAttribute dataScopeIdentifierAttribute = dataElement.Attribute("dataScopeIdentifier");
                    if (dataScopeIdentifierAttribute == null)
                    {
                        _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingAttribute").FormatWith("dataScopeIdentifier"), typeElement);
                        continue;
                    }

                    DataScopeIdentifier dataScopeIdentifier;
                    try
                    {
                        dataScopeIdentifier = DataScopeIdentifier.Deserialize(dataScopeIdentifierAttribute.Value);
                    }
                    catch (Exception)
                    {
                        _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.WrongDataScopeIdentifier").FormatWith(dataScopeIdentifierAttribute.Value), dataScopeIdentifierAttribute);
                        continue;
                    }



                    CultureInfo locale = null; // null => do not use localization
                    bool allLocales = false;
                    bool currentLocale = false;
                    XAttribute localeAttribute = dataElement.Attribute("locale");
                    if (localeAttribute != null)
                    {
                        if (localeAttribute.Value == "*")
                        {
                            allLocales = true;
                        }
                        else if (localeAttribute.Value == "?")
                        {
                            currentLocale = true;
                        }
                        else
                        {
                            try
                            {
                                locale = CultureInfo.CreateSpecificCulture(localeAttribute.Value);
                            }
                            catch (Exception)
                            {
                                _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.WrongLocale").FormatWith(localeAttribute.Value), localeAttribute);
                                continue;
                            }
                        }
                    }


                    XAttribute dataFilenameAttribute = dataElement.Attribute("dataFilename");
                    if (dataFilenameAttribute == null)
                    {
                        _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingAttribute").FormatWith("dataFilename"), typeElement);
                        continue;
                    }


                    if (this.InstallerContext.ZipFileSystem.ContainsFile(dataFilenameAttribute.Value) == false)
                    {
                        _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingFile").FormatWith(dataFilenameAttribute.Value), dataFilenameAttribute);
                        continue;
                    }


                    XDocument doc = null;
                    try
                    {
                        using (C1StreamReader sr = new C1StreamReader(this.InstallerContext.ZipFileSystem.GetFileStream(dataFilenameAttribute.Value)))
                        {
                            doc = XDocument.Load(sr);
                        }
                    }
                    catch (Exception ex)
                    {
                        _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, ex));
                        continue;
                    }


                    XAttribute isDynamicAddedAttribute = typeElement.Attribute("isDynamicAdded");

                    bool isDynamicAdded = isDynamicAddedAttribute != null && (bool)isDynamicAddedAttribute;

                    DataType dataType = new DataType()
                    {
                        InterfaceTypeName = interfaceTypeName,
                        DataScopeIdentifier = dataScopeIdentifier,
                        Locale = locale,
                        AddToAllLocales = allLocales,
                        AddToCurrentLocale = currentLocale,
                        IsDynamicAdded = isDynamicAdded,
                        Dataset = doc.Root.Elements("Add")
                    };

                    _dataTypes.Add(dataType);
                }
            }
        }

        private static string GetText(string stringId)
        {
            return StringResourceSystemFacade.GetString("Composite.Core.PackageSystem.PackageFragmentInstallers", stringId);
        }

        private void ValidateNonDynamicAddedType(DataType dataType)
        {
            if (dataType.InterfaceType == null)
            {
                _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.TypeNotConfigured").FormatWith(dataType.InterfaceTypeName));
                return;
            }
            

            if (!typeof(IData).IsAssignableFrom(dataType.InterfaceType))
            {
                _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.TypeNotInheriting").FormatWith(dataType.InterfaceType, typeof(IData)));
                return;
            }

            bool dataTypeLocalized = DataLocalizationFacade.IsLocalized(dataType.InterfaceType);
            if (!ValidateTargetLocaleInfo(dataType, dataTypeLocalized))
            {
                return;
            }

            int itemsAlreadePresentInDatabase = 0;


            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.BuildNewDataTypeDescriptor(dataType.InterfaceType);

            List<string> requiredPropertyNames =
                (from dfd in dataTypeDescriptor.Fields
                where !dfd.IsNullable
                select dfd.Name).ToList();

            List<string> nonRequiredPropertyNames =
                (from dfd in dataTypeDescriptor.Fields
                where dfd.IsNullable
                select dfd.Name).ToList();


            foreach (XElement addElement in dataType.Dataset)
            {
                DataKeyPropertyCollection dataKeyPropertyCollection = new DataKeyPropertyCollection();

                bool propertyValidationPassed = true;
                var assignedPropertyNames = new List<string>();
                var fieldValues = new Dictionary<string, object>();

                foreach (XAttribute attribute in addElement.Attributes())
                {
                    PropertyInfo propertyInfo = dataType.InterfaceType.GetPropertiesRecursively().FirstOrDefault(f => f.Name == attribute.Name);
                    if (propertyInfo == null)
                    {
                        // A compatibility fix
                        if (IsObsoleteField(dataType, attribute.Name.LocalName))
                        {
                            continue;
                        }

                        _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingProperty").FormatWith(dataType.InterfaceType, attribute.Name));
                        propertyValidationPassed = false;
                        continue;
                    }

                    if (propertyInfo.CanWrite == false)
                    {
                        _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingWritableProperty").FormatWith(dataType.InterfaceType, attribute.Name));
                        propertyValidationPassed = false;
                        continue;
                    }

                    object fieldValue;
                    try
                    {
                        fieldValue = ValueTypeConverter.Convert(attribute.Value, propertyInfo.PropertyType);
                    }
                    catch (Exception)
                    {
                        _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.ConversionFailed").FormatWith(attribute.Value, propertyInfo.PropertyType));
                        propertyValidationPassed = false;
                        continue;
                    }
                    string fieldName = attribute.Name.LocalName;

                    if (dataType.InterfaceType.GetKeyPropertyNames().Contains(fieldName))
                    {
                        dataKeyPropertyCollection.AddKeyProperty(fieldName, fieldValue);
                    }

                    assignedPropertyNames.Add(attribute.Name.LocalName);
                    fieldValues.Add(fieldName, fieldValue);
                }

                if (!propertyValidationPassed)
                {
                    continue;
                }


                var notAssignedRequiredProperties = requiredPropertyNames.Except(assignedPropertyNames.Except(nonRequiredPropertyNames)).ToArray();
                if (notAssignedRequiredProperties.Any())
                {
                    foreach (string propertyName in notAssignedRequiredProperties)
                    {
                        PropertyInfo propertyInfo = dataType.InterfaceType.GetPropertiesRecursively().Single(f => f.Name == propertyName);

                        // Made for backward compatibility
                        if (propertyInfo.ReflectedType == typeof(IChangeHistory))
                        {
                            continue;
                        }

                        if (propertyInfo.CanWrite)
                        {
                            _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingPropertyVaule").FormatWith(propertyName, dataType.InterfaceType));
                        }
                    }
                    continue;
                }


                // Validating keys already present    
                if (!DataLocalizationFacade.IsLocalized(dataType.InterfaceType) 
                    || (!dataType.AddToAllLocales && !dataType.AddToCurrentLocale) 
                    || (dataType.Locale != null && !this.InstallerContext.IsLocalePending(dataType.Locale)))
                {
                    using (new DataScope(dataType.DataScopeIdentifier, dataType.Locale))
                    {
                        IData data = DataFacade.TryGetDataByUniqueKey(dataType.InterfaceType, dataKeyPropertyCollection);

                        if (data != null)
                        {
                            itemsAlreadePresentInDatabase++;
                        }
                    }
                }

                RegisterKeyToBeAdded(dataType, dataKeyPropertyCollection);

                // Checking foreign key references
                foreach (var foreignKeyProperty in DataAttributeFacade.GetDataReferenceProperties(dataType.InterfaceType))
                {
                    if(!fieldValues.ContainsKey(foreignKeyProperty.SourcePropertyName)) continue;

                    object propertyValue = fieldValues[foreignKeyProperty.SourcePropertyName];
                    
                    if (propertyValue == null || propertyValue == foreignKeyProperty.NullReferenceValue)
                    {
                        continue;
                    }

                    Type referenceType;
                    string keyPropertyName;
                    object referenceKey;
                    
                    MapReference(foreignKeyProperty.TargetType, foreignKeyProperty.TargetKeyPropertyName, propertyValue, out referenceType, out keyPropertyName, out referenceKey);

                    // Checking key in the keys to be installed
                    var keyValuePair = new KeyValuePair<string, object>(keyPropertyName, referenceKey);

                    if (!_missingDataReferences.ContainsKey(dataType.InterfaceType) 
                        || !_missingDataReferences[dataType.InterfaceType].Contains(keyValuePair))
                    {
                        if (_dataKeysToBeInstalled.ContainsKey(referenceType))
                        {
                            if (_dataKeysToBeInstalled[referenceType].KeyRegistered(dataType, keyValuePair))
                            {
                                continue;
                            }
                        }

                        using (GetDataScopeFromDataTypeElement(dataType))
                        {
                            if (DataFacade.TryGetDataByUniqueKey(foreignKeyProperty.TargetType, propertyValue) == null)
                            {
                                _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.ReferencedDataMissing")
                                    .FormatWith(foreignKeyProperty.TargetType.FullName, foreignKeyProperty.TargetKeyPropertyName, propertyValue));

                                if (!_missingDataReferences.ContainsKey(dataType.InterfaceType))
                                {
                                    _missingDataReferences.Add(dataType.InterfaceType, new HashSet<KeyValuePair<string, object>>());
                                }

                                _missingDataReferences[dataType.InterfaceType].Add(keyValuePair);
                                continue;
                            }
                        }
                    }
                }
            }

            if(itemsAlreadePresentInDatabase > 0)
            {
                _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.DataExists").FormatWith(dataType.InterfaceType, itemsAlreadePresentInDatabase));
            }
        }

        private static bool IsObsoleteField(DataType dataType, string fieldName)
        {
            return typeof(ILocalizedControlled).IsAssignableFrom(dataType.InterfaceType) && fieldName == "CultureName";
        }

        private void MapReference(Type type, string propertyName, object key, out Type referenceType, out string keyPropertyName, out object referenceKey)
        {
            if ((type == typeof(IImageFile) || type == typeof(IMediaFile))
                && ((string)key).StartsWith("MediaArchive:")
                && propertyName == "KeyPath")
            {
                referenceType = typeof(IMediaFileData);
                referenceKey = new Guid(((string)key).Substring("MediaArchive:".Length));
                keyPropertyName = "Id";
                return;
            }

            referenceType = type;
            keyPropertyName = propertyName;
            referenceKey = key;
        }



        private DataScope GetDataScopeFromDataTypeElement(DataType dataType)
        {
            CultureInfo locale = dataType.Locale ?? LocalizationScopeManager.CurrentLocalizationScope;
            
            return new DataScope(dataType.DataScopeIdentifier, locale);
        }

        private void RegisterKeyToBeAdded(DataType dataType, DataKeyPropertyCollection dataKeyPropertyCollection)
        {
            if (dataKeyPropertyCollection.Count != 1) return;

            if (!_dataKeysToBeInstalled.ContainsKey(dataType.InterfaceType))
            {
                _dataKeysToBeInstalled.Add(dataType.InterfaceType, new TypeKeyInstallationData(dataType.InterfaceType));
            }

            var keyValuePair = dataKeyPropertyCollection.KeyProperties.First();

            _dataKeysToBeInstalled[dataType.InterfaceType].RegisterKeyUsage(dataType, keyValuePair);
        }


        private void ValidateDynamicAddedType(DataType dataType)
        {
            DataTypeDescriptor dataTypeDescriptor = this.InstallerContext.GetPendingDataTypeDescriptor(dataType.InterfaceTypeName);

            if (dataTypeDescriptor == null)
            {
                _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingTypeDescriptor").FormatWith(dataType.InterfaceTypeName));
                return;
            }

            bool dataTypeLocalized = dataTypeDescriptor.SuperInterfaces.Contains(typeof (ILocalizedControlled));

            if (!ValidateTargetLocaleInfo(dataType, dataTypeLocalized))
            {
                return;
            }

            foreach (XElement addElement in dataType.Dataset)
            {
                foreach (XAttribute attribute in addElement.Attributes())
                {
                    // A compatibility fix
                    if (IsObsoleteField(dataType, attribute.Name.LocalName))
                    {
                        continue;
                    }

                    DataFieldDescriptor dataFieldDescriptor = dataTypeDescriptor.Fields[attribute.Name.LocalName];

                    if (dataFieldDescriptor == null)
                    {
                        _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingProperty").FormatWith(dataTypeDescriptor, attribute.Name));
                    }
                    else
                    {
                        try
                        {
                            ValueTypeConverter.Convert(attribute.Value, dataFieldDescriptor.InstanceType);
                        }
                        catch (Exception)
                        {
                            _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.ConversionFailed").FormatWith(attribute.Value, dataFieldDescriptor.InstanceType));
                        }
                    }
                }
            }
        }

        private bool ValidateTargetLocaleInfo(DataType dataType, bool dataTypeLocalized)
        {
            bool localeInfoSpecified = dataType.Locale != null || dataType.AddToAllLocales || dataType.AddToCurrentLocale;

            if (dataTypeLocalized)
            {
                if (!localeInfoSpecified)
                {
                    _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.TypeLocalizedWithoutLocale").FormatWith(dataType.InterfaceType));
                    return false;
                }
            }
            else
            {
                if (localeInfoSpecified)
                {
                    _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.TypeNonLocalizedWithLocale").FormatWith(dataType.InterfaceType));
                    return false;
                }
            }

            return true;
        }

        [DebuggerDisplay("{InterfaceTypeName}")]
        private sealed class DataType
        {
            public string InterfaceTypeName { get; set; }
            public Type InterfaceType { get; set; }
            public DataScopeIdentifier DataScopeIdentifier { get; set; }
            public CultureInfo Locale { get; set; }
            public bool AddToAllLocales { get; set; }
            public bool AddToCurrentLocale { get; set; }
            public bool IsDynamicAdded { get; set; }
            public IEnumerable<XElement> Dataset { get; set; }
        }

        /// <summary>
        /// Information about data keys to be installed for a gived data type
        /// </summary>
        [DebuggerDisplay("TypeKeyInstallationData {_type.FullName} . DataScopes: {_dataScopes.Count}")]
        private class TypeKeyInstallationData
        {
            private const string AllLocalesKey = "all";

            private readonly bool _isLocalized;
            private readonly bool _isPublishable;
            private readonly Type _type;
            private readonly Dictionary<string, HashSet<KeyValuePair<string, object>>> _dataScopes = new Dictionary<string, HashSet<KeyValuePair<string, object>>>();

            public TypeKeyInstallationData(Type type)
            {
                _isLocalized = DataLocalizationFacade.IsLocalized(type);
                _isPublishable = typeof(IPublishControlled).IsAssignableFrom(type);
                _type = type;
            }

            public void RegisterKeyUsage(DataType dataType, KeyValuePair<string, object> keyValuePair)
            {
                var dataScopeIdentifier = dataType.DataScopeIdentifier;

                if (!_isLocalized)
                {
                    RegisterKeyUsage(dataType, "", dataScopeIdentifier, keyValuePair);
                    return;
                }

                if (dataType.AddToCurrentLocale)
                {
                    RegisterKeyUsage(dataType, LocalizationScopeManager.CurrentLocalizationScope.Name, dataScopeIdentifier, keyValuePair);
                    return;
                }

                if (dataType.Locale != null)
                {
                    RegisterKeyUsage(dataType, dataType.Locale.Name, dataScopeIdentifier, keyValuePair);
                    return;
                }

                if (dataType.AddToAllLocales)
                {
                    RegisterKeyUsage(dataType, AllLocalesKey, dataScopeIdentifier, keyValuePair);
                    return;
                }

                throw new InvalidOperationException("Type is localized but no localization info specified");
            }

            private void RegisterKeyUsage(DataType dataType, string localeName, DataScopeIdentifier publicationScope, KeyValuePair<string, object> keyValuePair)
            {
                string dataScopeKey = GetDataScopeKey(publicationScope, localeName);

                if (!_dataScopes.ContainsKey(dataScopeKey))
                {
                    _dataScopes.Add(dataScopeKey, new HashSet<KeyValuePair<string, object>>());
                }

                var hashset = _dataScopes[dataScopeKey];

                Verify.That(!hashset.Contains(keyValuePair), "Item with the same key present twice. Data type: '{0}', field '{1}', value '{2}'",
                    dataType.InterfaceTypeName ?? "null", keyValuePair.Key, keyValuePair.Value ?? "null");

                hashset.Add(keyValuePair);
            }

            public bool KeyRegistered(DataType referencedDataType, KeyValuePair<string, object> keyValuePair)
            {
                var dataScopeIdentifier = referencedDataType.DataScopeIdentifier;

                if (!_isLocalized)
                {
                    return KeyRegistered(dataScopeIdentifier, "", keyValuePair);
                }

                if (referencedDataType.Locale != null)
                {
                    return KeyRegistered(referencedDataType.DataScopeIdentifier, referencedDataType.Locale.Name, keyValuePair);
                }

                if (referencedDataType.AddToCurrentLocale)
                {
                    var currentLocale = LocalizationScopeManager.CurrentLocalizationScope;
                    return KeyRegistered(referencedDataType.DataScopeIdentifier, currentLocale.Name, keyValuePair);
                }

                return KeyRegistered(referencedDataType.DataScopeIdentifier, AllLocalesKey, keyValuePair);
            }

            public bool KeyRegistered(DataScopeIdentifier publicationScope, string languageName, KeyValuePair<string, object> keyValuePair)
            {
                HashSet<KeyValuePair<string, object>> hashset;

                if (languageName != AllLocalesKey && _isLocalized)
                {
                    hashset = GetDataset(publicationScope, languageName);
                    if (hashset != null && hashset.Contains(keyValuePair))
                    {
                        return true;
                    }
                }

                hashset = GetDataset(publicationScope, AllLocalesKey);
                return hashset != null && hashset.Contains(keyValuePair);
            }

            private HashSet<KeyValuePair<string, object>> GetDataset(DataScopeIdentifier publicationScope, string localizationScope)
            {
                string key = GetDataScopeKey(publicationScope, localizationScope);

                return _dataScopes.ContainsKey(key) ? _dataScopes[key] : null;
            }

            private string GetDataScopeKey(DataScopeIdentifier publicationScope, string languageName)
            {
                string publicationScopeKey = _isPublishable ? publicationScope.Name : string.Empty;
                string languageScopeKey = _isLocalized ? languageName : string.Empty;

                return publicationScopeKey + languageScopeKey;
            }
        }
    }
}