using System;
using System.Collections.Generic;
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


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataPackageFragmentInstaller : BasePackageFragmentInstaller
    {
        private List<DataType> _dataTypes = null;
        private List<PackageFragmentValidationResult> _validationResult = null;


        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            _validationResult = new List<PackageFragmentValidationResult>();

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


                if (dataType.IsDynamicAdded == false)
                {
                    ValidateNonDynamicAddedType(dataType);
                }
                else
                {
                    ValidateDynamicAddedType(dataType);
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
            if (_dataTypes == null) throw new InvalidOperationException("DataPackageFragmentInstaller has not been validated");

            List<XElement> typeElements = new List<XElement>();
            foreach (DataType dataType in _dataTypes)
            {
                Log.LogVerbose("DataPackageFragmentInstaller", string.Format("Installing data for the type '{0}'", dataType.InterfaceType));

                if (dataType.IsDynamicAdded == true)
                {
                    dataType.InterfaceType = TypeManager.GetType(dataType.InterfaceTypeName);
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
                                XElement element = AddDatas(dataType, locale);
                                typeElement.Add(element);
                            }
                        }
                    }
                    else if (dataType.AddToCurrentLocale)
                    {
                        using (new DataScope(UserSettings.ActiveLocaleCultureInfo))
                        {
                            XElement element = AddDatas(dataType, UserSettings.ActiveLocaleCultureInfo);
                            typeElement.Add(element);
                        }
                    }
                    else if (dataType.Locale != null)
                    {
                        if (DataLocalizationFacade.ActiveLocalizationCultures.Contains(dataType.Locale) == true)
                        {
                            using (new DataScope(dataType.Locale))
                            {
                                XElement element = AddDatas(dataType, dataType.Locale);
                                typeElement.Add(element);
                            }
                        }
                    }
                    else
                    {
                        using (new DataScope(UserSettings.ActiveLocaleCultureInfo))
                        {
                            XElement element = AddDatas(dataType, null);
                            typeElement.Add(element);
                        }
                    }
                }

                typeElements.Add(typeElement);
            }

            yield return new XElement("Types", typeElements);
        }



        private static XElement AddDatas(DataType dataType, CultureInfo cultureInfo)
        {
            XElement datasElement = new XElement("Datas");

            if (cultureInfo != null)
            {
                datasElement.Add(new XAttribute("locale", cultureInfo.Name));
            }

            foreach (XElement addElement in dataType.Dataset)
            {
                IData data = DataFacade.BuildNew(dataType.InterfaceType);

                foreach (XAttribute attribute in addElement.Attributes())
                {
                    PropertyInfo propertyInfo = dataType.InterfaceType.GetPropertiesRecursively().Single(f => f.Name == attribute.Name);

                    propertyInfo.SetValue(data, ValueTypeConverter.Convert(attribute.Value, propertyInfo.PropertyType), null);
                }

                ILocalizedControlled localizedControlled = data as ILocalizedControlled;
                if (localizedControlled != null)
                {
                    localizedControlled.CultureName = LocalizationScopeManager.MapByType(dataType.InterfaceType).Name;
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
                else
                {
                    interfaceTypeName = typeAttribute.Value;
                }

                foreach (XElement dataElement in typeElement.Elements("Data"))
                {
                    DataScopeIdentifier dataScopeIdentifier = null;
                    XAttribute dataScopeIdentifierAttribute = dataElement.Attribute("dataScopeIdentifier");
                    if (dataScopeIdentifierAttribute == null)
                    {
                        _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingAttribute").FormatWith("dataScopeIdentifier"), typeElement);
                        continue;
                    }

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
            

            if (typeof(IData).IsAssignableFrom(dataType.InterfaceType) == false)
            {
                _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.TypeNotInheriting").FormatWith(dataType.InterfaceType, typeof(IData)));
                return;
            }

            if (DataLocalizationFacade.IsLocalized(dataType.InterfaceType) == false)
            {
                if ((dataType.Locale != null) || dataType.AddToAllLocales || dataType.AddToCurrentLocale)
                {
                    _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.TypeNonLocalizedWithLocale").FormatWith(dataType.InterfaceType));
                    return;
                }
            }
            else
            {
                if ((dataType.Locale == null) && (dataType.AddToAllLocales == false) && (dataType.AddToCurrentLocale == false))
                {
                    _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.TypeLocalizedWithoutLocale").FormatWith(dataType.InterfaceType, typeof(IData)));
                    return;

                }
            }

            int itemsAlreadePresentInDatabase = 0;

            foreach (XElement addElement in dataType.Dataset)
            {
                DataKeyPropertyCollection dataKeyPropertyCollection = new DataKeyPropertyCollection();

                bool validated = true;
                List<string> assignedPropertyNames = new List<string>();
                foreach (XAttribute attribute in addElement.Attributes())
                {
                    PropertyInfo propertyInfo = dataType.InterfaceType.GetPropertiesRecursively().FirstOrDefault(f => f.Name == attribute.Name);
                    if (propertyInfo == null)
                    {
                        _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingProperty").FormatWith(dataType.InterfaceType, attribute.Name));
                        validated = false;
                        continue;
                    }

                    if (propertyInfo.CanWrite == false)
                    {
                        _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingWritableProperty").FormatWith(dataType.InterfaceType, attribute.Name));
                        validated = false;
                        continue;
                    }
                    
                    try
                    {
                        ValueTypeConverter.Convert(attribute.Value, propertyInfo.PropertyType);
                    }
                    catch (Exception)
                    {
                        _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.ConversionFailed").FormatWith(attribute.Value, propertyInfo.PropertyType));
                        validated = false;
                        continue;
                    }

                    if (dataType.InterfaceType.GetKeyPropertyNames().Contains(attribute.Name.LocalName))
                    {
                        object value = ValueTypeConverter.Convert(attribute.Value, propertyInfo.PropertyType);
                        dataKeyPropertyCollection.AddKeyProperty(attribute.Name.LocalName, value);
                    }

                    assignedPropertyNames.Add(attribute.Name.LocalName);
                }

                if (validated)
                {
                    DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.BuildNewDataTypeDescriptor(dataType.InterfaceType);
                    IEnumerable<string> requiredPropertyNames =
                        from dfd in dataTypeDescriptor.Fields
                        where !dfd.IsNullable
                        select dfd.Name;

                    IEnumerable<string> nonRequiredPropertyNames =
                        from dfd in dataTypeDescriptor.Fields
                        where dfd.IsNullable
                        select dfd.Name;


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
                }
            }

            if(itemsAlreadePresentInDatabase > 0)
            {
                _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.DataExists")
                                           .FormatWith(dataType.InterfaceType, itemsAlreadePresentInDatabase));
            }
        }



        private void ValidateDynamicAddedType(DataType dataType)
        {
            DataTypeDescriptor dataTypeDescriptor = this.InstallerContext.GetPendingDataTypeDescriptor(dataType.InterfaceTypeName);

            if (dataTypeDescriptor == null)
            {
                _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.MissingTypeDescriptor").FormatWith(dataType.InterfaceTypeName));
                return;
            }

            if (dataTypeDescriptor.SuperInterfaces.Contains(typeof(ILocalizedControlled)) == false)
            {
                if ((dataType.Locale != null) || dataType.AddToAllLocales || dataType.AddToCurrentLocale)
                {
                    _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.TypeNonLocalizedWithLocale").FormatWith(dataType.InterfaceType, typeof(IData)));
                    return;
                }
            }
            else
            {
                if ((dataType.Locale == null) && (dataType.AddToAllLocales == false) && (dataType.AddToCurrentLocale == false))
                {
                    _validationResult.AddFatal(GetText("DataPackageFragmentInstaller.TypeLocalizedWithoutLocale").FormatWith(dataType.InterfaceType, typeof(IData)));
                    return;

                }
            }

            foreach (XElement addElement in dataType.Dataset)
            {
                foreach (XAttribute attribute in addElement.Attributes())
                {
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
    }
}