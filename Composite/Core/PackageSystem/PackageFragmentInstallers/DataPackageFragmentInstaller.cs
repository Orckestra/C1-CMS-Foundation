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

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Core_PackageSystem_PackageFragmentInstallers;

namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataPackageFragmentInstaller : BasePackageFragmentInstaller
    {
        private static readonly string LogTitle = nameof(DataPackageFragmentInstaller);

        private List<DataType> _dataTypes;
        private List<PackageFragmentValidationResult> _validationResult;

        private Dictionary<Type, TypeKeyInstallationData> _dataKeysToBeInstalled;
        private Dictionary<Type, HashSet<KeyValuePair<string, object>>> _missingDataReferences;

        private static Dictionary<Guid, Guid> _pageVersionIds = new Dictionary<Guid, Guid>();

        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            _validationResult = new List<PackageFragmentValidationResult>();
            _dataKeysToBeInstalled = new Dictionary<Type, TypeKeyInstallationData>();
            _missingDataReferences = new Dictionary<Type, HashSet<KeyValuePair<string, object>>>();

            if (this.Configuration.Count(f => f.Name == "Types") > 1)
            {
                _validationResult.AddFatal(Texts.DataPackageFragmentInstaller_OnlyOneElement);
                return _validationResult;
            }

            _dataTypes = new List<DataType>();

            ValidateAndLoadConfiguration();

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
                Log.LogVerbose(LogTitle, $"Installing data for the type '{dataType.InterfaceType}'");

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


        private XElement AddData(DataType dataType, CultureInfo cultureInfo)
        {
            XElement datasElement = new XElement("Datas");

            if (cultureInfo != null)
            {
                datasElement.Add(new XAttribute("locale", cultureInfo.Name));
            }

            foreach (XElement addElement in dataType.Dataset)
            {
                var interfaceType = dataType.InterfaceType;

                IData data = DataFacade.BuildNew(interfaceType);

                if (!dataType.InterfaceType.IsInstanceOfType(data))
                {
                    dataType.InterfaceType = GetInstalledVersionOfPendingType(interfaceType, data);
                }


                var dataKey = CopyFieldValues(dataType, data, addElement);

                if (dataType.AllowOverwrite || dataType.OnlyUpdate)
                {
                    IData existingData = DataFacade.TryGetDataByUniqueKey(interfaceType, dataKey);

                    if (existingData != null)
                    {
                        CopyFieldValues(dataType, existingData, addElement);
                        DataFacade.Update(existingData, false, true, false);

                        continue;
                    }

                    if (dataType.OnlyUpdate)
                    {
                        continue;
                    }
                }

                ILocalizedControlled localizedControlled = data as ILocalizedControlled;
                if (localizedControlled != null)
                {
                    localizedControlled.SourceCultureName = LocalizationScopeManager.MapByType(interfaceType).Name;
                }

                if (data is IVersioned)
                {
                    UpdateVersionId((IVersioned)data);
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


        private void UpdateVersionId(IVersioned data)
        {
            if (data.VersionId != Guid.Empty)
            {
                return;
            }

            if (data is IPage)
            {
                var page = (IPage)data;

                Guid versionId;

                if (_pageVersionIds.TryGetValue(page.Id, out versionId))
                {
                    page.VersionId = versionId;
                }
                else
                {
                    page.VersionId = Guid.NewGuid();
                    _pageVersionIds[page.Id] = page.VersionId;
                }
            }

            else if (data is IPagePlaceholderContent)
            {
                Guid pageId = ((IPagePlaceholderContent)data).PageId;
                Guid versionId;

                if (_pageVersionIds.TryGetValue(pageId, out versionId))
                {
                    data.VersionId = versionId;
                }
            }
            else if (data is IPageData)
            {
                Guid pageId = ((IPageData)data).PageId;
                Guid versionId;

                if (_pageVersionIds.TryGetValue(pageId, out versionId))
                {
                    data.VersionId = versionId;
                }
            }
        }


        private static DataKeyPropertyCollection CopyFieldValues(DataType dataType, IData data, XElement addElement)
        {
            var dataKeyPropertyCollection = new DataKeyPropertyCollection();

            var properties = GetDataTypeProperties(dataType.InterfaceType);

            foreach (XAttribute attribute in addElement.Attributes())
            {
                string fieldName = attribute.Name.LocalName;
                if (IsObsoleteField(dataType, fieldName))
                {
                    continue;
                }

                PropertyInfo propertyInfo = properties[fieldName];

                object fieldValue = ValueTypeConverter.Convert(attribute.Value, propertyInfo.PropertyType);
                propertyInfo.SetValue(data, fieldValue, null);

                if (dataType.InterfaceType.GetKeyPropertyNames().Contains(fieldName))
                {
                    dataKeyPropertyCollection.AddKeyProperty(fieldName, fieldValue);
                }
            }

            return dataKeyPropertyCollection;
        } 

        private void ValidateAndLoadConfiguration()
        {
            XElement typesElement = this.Configuration.SingleOrDefault(f => f.Name == "Types");
            if (typesElement == null)
            {
                _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingElement"));
            }

            if (typesElement == null) return;

            foreach (XElement typeElement in typesElement.Elements("Type"))
            {
                var typeAttribute = typeElement.Attribute("type");
                if (typeAttribute == null)
                {
                    _validationResult.AddFatal(Texts.DataPackageFragmentInstaller_MissingAttribute("type"), typeElement);
                    continue;
                }

                XAttribute allowOverwriteAttribute = typeElement.Attribute("allowOverwrite");
                XAttribute onlyUpdateAttribute = typeElement.Attribute("onlyUpdate");

                bool allowOverwrite = allowOverwriteAttribute != null && (bool)allowOverwriteAttribute;
                bool onlyUpdate = onlyUpdateAttribute != null && (bool)onlyUpdateAttribute;

                string interfaceTypeName = typeAttribute.Value;

                interfaceTypeName = TypeManager.FixLegasyTypeName(interfaceTypeName);

                foreach (XElement dataElement in typeElement.Elements("Data"))
                {
                    XAttribute dataScopeIdentifierAttribute = dataElement.Attribute("dataScopeIdentifier");
                    if (dataScopeIdentifierAttribute == null)
                    {
                        _validationResult.AddFatal(Texts.DataPackageFragmentInstaller_MissingAttribute("dataScopeIdentifier"), typeElement);
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
                        _validationResult.AddFatal(Texts.DataPackageFragmentInstaller_MissingAttribute("dataFilename"), typeElement);
                        continue;
                    }


                    if (!this.InstallerContext.ZipFileSystem.ContainsFile(dataFilenameAttribute.Value))
                    {
                        _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingFile").FormatWith(dataFilenameAttribute.Value), dataFilenameAttribute);
                        continue;
                    }


                    XDocument doc;
                    try
                    {
                        using (var stream = this.InstallerContext.ZipFileSystem.GetFileStream(dataFilenameAttribute.Value))
                        using (var reader = new C1StreamReader(stream))
                        {
                            doc = XDocument.Load(reader);
                        }
                    }
                    catch (Exception ex)
                    {
                        _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, ex));
                        continue;
                    }


                    XAttribute isDynamicAddedAttribute = typeElement.Attribute("isDynamicAdded");

                    bool isDynamicAdded = isDynamicAddedAttribute != null && (bool)isDynamicAddedAttribute;

                    var dataType = new DataType
                    {
                        InterfaceTypeName = interfaceTypeName,
                        DataScopeIdentifier = dataScopeIdentifier,
                        Locale = locale,
                        AddToAllLocales = allLocales,
                        AddToCurrentLocale = currentLocale,
                        IsDynamicAdded = isDynamicAdded,
                        AllowOverwrite = allowOverwrite,
                        OnlyUpdate = onlyUpdate,
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

            int itemsAlreadyPresentInDatabase = 0;


            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.BuildNewDataTypeDescriptor(dataType.InterfaceType);


            bool isVersionedDataType = typeof (IVersioned).IsAssignableFrom(dataType.InterfaceType);

            var requiredPropertyNames = 
                (from dfd in dataTypeDescriptor.Fields
                where !dfd.IsNullable && !(isVersionedDataType && dfd.Name == nameof(IVersioned.VersionId)) // Compatibility fix
                select dfd.Name).ToList();

            var nonRequiredPropertyNames = dataTypeDescriptor.Fields.Select(f => f.Name)
                                            .Except(requiredPropertyNames).ToList();


            foreach (XElement addElement in dataType.Dataset)
            {
                var dataKeyPropertyCollection = new DataKeyPropertyCollection();

                bool propertyValidationPassed = true;
                var assignedPropertyNames = new List<string>();
                var fieldValues = new Dictionary<string, object>();

                var properties = GetDataTypeProperties(dataType.InterfaceType);

                foreach (XAttribute attribute in addElement.Attributes())
                {
                    string fieldName = attribute.Name.LocalName;

                    PropertyInfo propertyInfo;
                    if (!properties.TryGetValue(fieldName, out propertyInfo))
                    {
                        // A compatibility fix
                        if (IsObsoleteField(dataType, fieldName))
                        {
                            continue;
                        }

                        _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingProperty").FormatWith(dataType.InterfaceType, fieldName));
                        propertyValidationPassed = false;
                        continue;
                    }

                    if (!propertyInfo.CanWrite)
                    {
                        _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingWritableProperty").FormatWith(dataType.InterfaceType, fieldName));
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

                    if (dataType.InterfaceType.GetKeyPropertyNames().Contains(fieldName))
                    {
                        dataKeyPropertyCollection.AddKeyProperty(fieldName, fieldValue);
                    }

                    assignedPropertyNames.Add(fieldName);
                    fieldValues.Add(fieldName, fieldValue);
                }

                if (!propertyValidationPassed)
                {
                    continue;
                }


                var notAssignedRequiredProperties = requiredPropertyNames.Except(assignedPropertyNames.Except(nonRequiredPropertyNames)).ToArray();
                if (notAssignedRequiredProperties.Any())
                {
                    bool missingValues = false;
                    foreach (string propertyName in notAssignedRequiredProperties)
                    {
                        PropertyInfo propertyInfo = dataType.InterfaceType.GetPropertiesRecursively().Single(f => f.Name == propertyName);

                        if (propertyInfo.CanWrite)
                        {
                            var defaultValueAttribute = propertyInfo.GetCustomAttributesRecursively<NewInstanceDefaultFieldValueAttribute>().SingleOrDefault();
                            if (defaultValueAttribute == null || !defaultValueAttribute.HasValue)
                            {
                                _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingPropertyVaule").FormatWith(propertyName, dataType.InterfaceType));
                                missingValues = true;
                            }
                        }
                    }
                    if (missingValues) continue;
                }


                // Validating keys already present    
                if (!dataType.AllowOverwrite && !dataType.OnlyUpdate)
                {
                    bool dataLocaleExists = 
                        !DataLocalizationFacade.IsLocalized(dataType.InterfaceType)
                        || (!dataType.AddToAllLocales && !dataType.AddToCurrentLocale)
                        || (dataType.Locale != null && !this.InstallerContext.IsLocalePending(dataType.Locale));

                    if(dataLocaleExists)
                    {
                        using (new DataScope(dataType.DataScopeIdentifier, dataType.Locale))
                        {
                            IData data = DataFacade.TryGetDataByUniqueKey(dataType.InterfaceType, dataKeyPropertyCollection);

                            if (data != null)
                            {
                                itemsAlreadyPresentInDatabase++;
                            }
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

                    CheckForBrokenReference(dataType, foreignKeyProperty.TargetType, foreignKeyProperty.TargetKeyPropertyName, propertyValue);
                }
            }

            if(itemsAlreadyPresentInDatabase > 0)
            {
                _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.DataExists").FormatWith(dataType.InterfaceType, itemsAlreadyPresentInDatabase));
            }
        }

        private void CheckForBrokenReference(DataType refereeType, Type type, string propertyName, object propertyValue)
        {
            Type referredType;
            string keyPropertyName;
            object referenceKey;

            MapReference(type, propertyName, propertyValue, out referredType, out keyPropertyName, out referenceKey);

            // Checking key in the keys to be installed
            var keyValuePair = new KeyValuePair<string, object>(keyPropertyName, referenceKey);

            if (_missingDataReferences.ContainsKey(referredType) && _missingDataReferences[referredType].Contains(keyValuePair))
            {
                return;
            }

            if (_dataKeysToBeInstalled.ContainsKey(referredType) && _dataKeysToBeInstalled[referredType].KeyRegistered(refereeType, keyValuePair))
            {   
                return;
            }

            using (GetDataScopeFromDataTypeElement(refereeType))
            {
                if (DataFacade.TryGetDataByUniqueKey(type, propertyValue) == null)
                {
                    _validationResult.AddFatal(Texts.DataPackageFragmentInstaller_ReferencedDataMissing(
                        type.FullName, propertyName, propertyValue));

                    var missingReferences = _missingDataReferences.GetOrAdd(referredType,
                        () => new HashSet<KeyValuePair<string, object>>());

                    missingReferences.Add(keyValuePair);
                }
            }
        }

        private static bool IsObsoleteField(DataType dataType, string fieldName)
        {
            return typeof(ILocalizedControlled).IsAssignableFrom(dataType.InterfaceType) && fieldName == "CultureName";
        }


        private static Dictionary<string, PropertyInfo> GetDataTypeProperties(Type type)
        {
            return type.GetPropertiesRecursively().Where(property => !IsObsoleteProperty(property)).ToDictionary(prop => prop.Name);
        }

        private static bool IsObsoleteProperty(PropertyInfo propertyInfo)
        {
            return propertyInfo.Name == "PageId" && propertyInfo.DeclaringType == typeof(IPageData);
        }

        private static bool IsObsoleteField(DataTypeDescriptor dataTypeDescriptor, string fieldName)
        {
            return dataTypeDescriptor.SuperInterfaces.Any(type => type == typeof(ILocalizedControlled)) 
                    && fieldName == "CultureName";
        }

        private static void MapReference(Type type, string propertyName, object key, out Type referenceType, out string keyPropertyName, out object referenceKey)
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


            var typeKeyInstallationData = _dataKeysToBeInstalled.GetOrAdd(dataType.InterfaceType,
                    () => new TypeKeyInstallationData(dataType.InterfaceType));

            var keyValuePair = dataKeyPropertyCollection.KeyProperties.First();

            typeKeyInstallationData.RegisterKeyUsage(dataType, keyValuePair);
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
                var dataKeyPropertyCollection = new DataKeyPropertyCollection();
                bool propertyValidationPassed = true;
                var fieldValues = new Dictionary<string, object>();

                foreach (XAttribute attribute in addElement.Attributes())
                {
                    string fieldName = attribute.Name.LocalName;

                    // A compatibility fix
                    if (IsObsoleteField(dataTypeDescriptor, fieldName))
                    {
                        continue;
                    }

                    DataFieldDescriptor dataFieldDescriptor = dataTypeDescriptor.Fields[fieldName];

                    if (dataFieldDescriptor == null)
                    {
                        _validationResult.AddFatal(Texts.DataPackageFragmentInstaller_MissingProperty(dataTypeDescriptor, fieldName));
                        propertyValidationPassed = false;
                        continue;
                    }

                    object fieldValue;
                    try
                    {
                        fieldValue = ValueTypeConverter.Convert(attribute.Value, dataFieldDescriptor.InstanceType);
                    }
                    catch (Exception)
                    {
                        _validationResult.AddFatal(Texts.DataPackageFragmentInstaller_ConversionFailed(attribute.Value, dataFieldDescriptor.InstanceType));
                        propertyValidationPassed = false;
                        continue;
                    }

                    if (dataTypeDescriptor.KeyPropertyNames.Contains(fieldName))
                    {
                        dataKeyPropertyCollection.AddKeyProperty(fieldName, fieldValue);
                    }

                    fieldValues.Add(fieldName, fieldValue);
                }

                if (!propertyValidationPassed)
                {
                    continue;
                }

                if (!dataType.AllowOverwrite && !dataType.OnlyUpdate)
                {
                    // TODO: implement check if the same key has already been added
                }

                // TODO: to be implemented for dynamic types
                // RegisterKeyToBeAdded(dataType, dataKeyPropertyCollection);

                // Checking foreign key references
                foreach (var referenceField in dataTypeDescriptor.Fields.Where(f => f.ForeignKeyReferenceTypeName != null))
                {
                    object propertyValue;
                    if (!fieldValues.TryGetValue(referenceField.Name, out propertyValue) 
                        || propertyValue == null
                        || (propertyValue is Guid && (Guid)propertyValue == Guid.Empty) 
                        || propertyValue is string && (string)propertyValue == "")
                    {
                        continue;
                    }

                    string referredTypeName = referenceField.ForeignKeyReferenceTypeName;
                    var referredType = TypeManager.TryGetType(referredTypeName);
                    if (referredType == null)
                    {
                        // TODO: implement reference check for dynamic types as well
                        continue;
                    }

                    string targetKeyPropertyName = referredType.GetKeyPropertyNames().SingleOrDefault();

                    CheckForBrokenReference(dataType, referredType, targetKeyPropertyName, propertyValue);
                }
            }
        }

        private bool ValidateTargetLocaleInfo(DataType dataType, bool dataTypeLocalized)
        {
            bool localeInfoSpecified = dataType.Locale != null || dataType.AddToAllLocales || dataType.AddToCurrentLocale;

            if (dataTypeLocalized && !localeInfoSpecified)
            {
                _validationResult.AddFatal(Texts.DataPackageFragmentInstaller_TypeLocalizedWithoutLocale(dataType.InterfaceType));
                return false;
            }
            
            if (!dataTypeLocalized && localeInfoSpecified)
            {
                _validationResult.AddFatal(Texts.DataPackageFragmentInstaller_TypeNonLocalizedWithLocale(dataType.InterfaceType));
                return false;
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
            public bool OnlyUpdate { get; set; }
            public bool AllowOverwrite { get; set; }
            public IEnumerable<XElement> Dataset { get; set; }
        }

        /// <summary>
        /// Information about data keys to be installed for a given data type
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

            public bool KeyRegistered(DataType refereeDataType, KeyValuePair<string, object> keyValuePair)
            {
                var dataScopeIdentifier = refereeDataType.DataScopeIdentifier;

                if (!_isLocalized)
                {
                    return KeyRegistered(dataScopeIdentifier, "", keyValuePair);
                }

                if (KeyRegistered(refereeDataType.DataScopeIdentifier, AllLocalesKey, keyValuePair))
                {
                    return true;
                }

                if (refereeDataType.Locale != null)
                {
                    return KeyRegistered(refereeDataType.DataScopeIdentifier, refereeDataType.Locale.Name, keyValuePair);
                }

                var currentLocale = LocalizationScopeManager.CurrentLocalizationScope;

                if (refereeDataType.AddToCurrentLocale)
                {
                    return KeyRegistered(refereeDataType.DataScopeIdentifier, currentLocale.Name, keyValuePair);
                }

                if (DataLocalizationFacade.ActiveLocalizationCultures.Count() == 1
                    && KeyRegistered(refereeDataType.DataScopeIdentifier, currentLocale.Name, keyValuePair))
                {
                    return true;
                }

                return false;
            }

            private bool KeyRegistered(DataScopeIdentifier publicationScope, string languageName, KeyValuePair<string, object> keyValuePair)
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