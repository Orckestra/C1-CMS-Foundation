using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.ProcessControlled;
using Composite.Logging;
using Composite.ResourceSystem;
using Composite.Types;
using Composite.Users;


namespace Composite.PackageSystem.PackageFragmentInstallers
{
    public sealed class DataPackageFragmentInstaller : BasePackageFragmentInstaller
    {
        private List<DataType> _dataTypes = null;
        private List<PackageFragmentValidationResult> _validationResult = null;



        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            _validationResult = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Where(f => f.Name == "Types").Count() > 1)
            {
                _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.OnlyOneElement")));
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



        public override IEnumerable<XElement> Install()
        {
            if (_dataTypes == null) throw new InvalidOperationException("Has not been validated");

            List<XElement> typeElements = new List<XElement>();
            foreach (DataType dataType in _dataTypes)
            {
                LoggingService.LogVerbose("DataAddOnFragmentInstaller", string.Format("Installing data for the type '{0}'", dataType.InterfaceType));

                if (dataType.IsDynamicAdded == true)
                {
                    dataType.InterfaceType = TypeManager.GetType(dataType.InterfaceTypeName);
                }

                XElement typeElement = new XElement("Type",
                    new XAttribute("type", TypeManager.SerializeType(dataType.InterfaceType)),
                    new XAttribute("dataScopeIdentifier", dataType.DataScopeIdentifier));


                using (DataScope dataScope = new DataScope(dataType.DataScopeIdentifier))
                {
                    if (dataType.AddToAllLocales == true)
                    {
                        foreach (CultureInfo locale in DataLocalizationFacade.ActiveLocalizationCultures)
                        {
                            using (DataScope localeScope = new DataScope(locale))
                            {
                                XElement element = AddDatas(dataType, locale);
                                typeElement.Add(element);
                            }
                        }
                    }
                    else if (dataType.AddToCurrentLoacle == true)
                    {
                        using (DataScope localeScope = new DataScope(UserSettings.ActiveLocaleCultureInfo))
                        {
                            XElement element = AddDatas(dataType, UserSettings.ActiveLocaleCultureInfo);
                            typeElement.Add(element);
                        }
                    }
                    else if (dataType.Locale != null)
                    {
                        if (DataLocalizationFacade.ActiveLocalizationCultures.Contains(dataType.Locale) == true)
                        {
                            using (DataScope localeScope = new DataScope(dataType.Locale))
                            {
                                XElement element = AddDatas(dataType, dataType.Locale);
                                typeElement.Add(element);
                            }
                        }
                    }
                    else
                    {
                        XElement element = AddDatas(dataType, null);
                        typeElement.Add(element);
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

            foreach (XElement addElement in dataType.Datas)
            {
                IData data = DataFacade.BuildNew(dataType.InterfaceType);

                foreach (XAttribute attribute in addElement.Attributes())
                {
                    PropertyInfo propertyInfo = dataType.InterfaceType.GetPropertiesRecursively().Where(f => f.Name == attribute.Name).Single();

                    propertyInfo.SetValue(data, ValueTypeConverter.Convert(attribute.Value, propertyInfo.PropertyType), null);
                }

                ILocalizedControlled localizedControlled = data as ILocalizedControlled;
                if (localizedControlled != null)
                {
                    localizedControlled.CultureName = LocalizationScopeManager.MapByType(dataType.InterfaceType).Name;
                    localizedControlled.SourceCultureName = LocalizationScopeManager.MapByType(dataType.InterfaceType).Name;
                }

                DataFacade.AddNew(data);

                XElement keysElement = new XElement("Keys");

                foreach (PropertyInfo propertyInfo in data.GetKeyPropertyInfoes())
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
            XElement typesElement = this.Configuration.Where(f => f.Name == "Types").SingleOrDefault();
            if (typesElement == null)
            {
                _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.MissingElement")));
            }

            if (typesElement == null) return;

            foreach (XElement typeElement in typesElement.Elements("Type"))
            {
                string interfaceTypeName = null;


                XAttribute typeAttribute = typeElement.Attribute("type");
                if (typeAttribute == null)
                {
                    _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.MissingAttribute"), "type"), typeElement));
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
                        _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.MissingAttribute"), "dataScopeIdentifier"), typeElement));
                        continue;
                    }

                    try
                    {
                        dataScopeIdentifier = DataScopeIdentifier.Deserialize(dataScopeIdentifierAttribute.Value);
                    }
                    catch (Exception)
                    {
                        _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.WrongDataScopeIdentifier"), dataScopeIdentifierAttribute.Value), dataScopeIdentifierAttribute));
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
                                _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.WrongLocale"), localeAttribute.Value), localeAttribute));
                                continue;
                            }
                        }
                    }


                    XAttribute dataFilenameAttribute = dataElement.Attribute("dataFilename");
                    if (dataFilenameAttribute == null)
                    {
                        _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.MissingAttribute"), "dataFilename"), typeElement));
                        continue;
                    }


                    if (this.AddOnInstallerContex.ZipFileSystem.ContainsFile(dataFilenameAttribute.Value) == false)
                    {
                        _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.MissingFile"), dataFilenameAttribute.Value), dataFilenameAttribute));
                        continue;
                    }


                    XDocument doc = null;
                    try
                    {
                        using (StreamReader sr = new StreamReader(this.AddOnInstallerContex.ZipFileSystem.GetFileStream(dataFilenameAttribute.Value)))
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

                    bool isDynamicAdded = isDynamicAddedAttribute != null ? (bool)isDynamicAddedAttribute : false;

                    DataType dataType = new DataType()
                    {
                        InterfaceTypeName = interfaceTypeName,
                        DataScopeIdentifier = dataScopeIdentifier,
                        Locale = locale,
                        AddToAllLocales = allLocales,
                        AddToCurrentLoacle = currentLocale,
                        IsDynamicAdded = isDynamicAdded,
                        Datas = doc.Root.Elements("Add")
                    };

                    _dataTypes.Add(dataType);
                }
            }
        }



        private void ValidateNonDynamicAddedType(DataType dataType)
        {
            if (dataType.InterfaceType == null)
            {
                _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.TypeNotConfigured"), dataType.InterfaceTypeName)));
                return;
            }
            else if ((DataFacade.GetAllInterfaces().Contains(dataType.InterfaceType) == false) &&
                     (this.AddOnInstallerContex.IsDataTypePending(dataType.InterfaceType) == false))
            {
                _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.TypeNotConfigured"), dataType.InterfaceType)));
                return;
            }

            if (typeof(IData).IsAssignableFrom(dataType.InterfaceType) == false)
            {
                _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.TypeNotInheriting"), dataType.InterfaceType, typeof(IData))));
                return;
            }

            if (DataLocalizationFacade.IsLocalized(dataType.InterfaceType) == false)
            {
                if ((dataType.Locale != null) || (dataType.AddToAllLocales == true) || (dataType.AddToCurrentLoacle == true))
                {
                    _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.TypeNonLocalizedWithLocale"), dataType.InterfaceType)));
                    return;
                }
            }
            else
            {
                if ((dataType.Locale == null) && (dataType.AddToAllLocales == false) && (dataType.AddToCurrentLoacle == false))
                {
                    _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.TypeLocalizedWithoutLocale"), dataType.InterfaceType, typeof(IData))));
                    return;

                }
            }



            foreach (XElement addElement in dataType.Datas)
            {
                DataKeyPropertyCollection dataKeyPropertyCollection = new DataKeyPropertyCollection();

                bool validated = true;
                List<string> assignedPropertyNames = new List<string>();
                foreach (XAttribute attribute in addElement.Attributes())
                {
                    PropertyInfo propertyInfo = dataType.InterfaceType.GetPropertiesRecursively().Where(f => f.Name == attribute.Name).FirstOrDefault();
                    if (propertyInfo == null)
                    {
                        _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.MissingProperty"), dataType.InterfaceType, attribute.Name)));
                        validated = false;
                        continue;
                    }
                    else if (propertyInfo.CanWrite == false)
                    {
                        _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.MissingWritableProperty"), dataType.InterfaceType, attribute.Name)));
                        validated = false;
                        continue;
                    }
                    else
                    {
                        try
                        {
                            ValueTypeConverter.Convert(attribute.Value, propertyInfo.PropertyType);
                        }
                        catch (Exception)
                        {
                            _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.ConversionFailed"), attribute.Value, propertyInfo.PropertyType)));
                            validated = false;
                            continue;
                        }

                        if (dataType.InterfaceType.GetKeyPropertyNames().Contains(attribute.Name.LocalName) == true)
                        {
                            object value = ValueTypeConverter.Convert(attribute.Value, propertyInfo.PropertyType);
                            dataKeyPropertyCollection.AddKeyProperty(attribute.Name.LocalName, value);
                        }

                        assignedPropertyNames.Add(attribute.Name.LocalName);
                    }
                }

                if (validated == true)
                {
                    DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.BuildNewDataTypeDescriptor(dataType.InterfaceType);
                    IEnumerable<string> requiredPropertyNames =
                        from dfd in dataTypeDescriptor.Fields
                        where dfd.IsNullable == false
                        select dfd.Name;

                    IEnumerable<string> nonRequiredPropertyNames =
                        from dfd in dataTypeDescriptor.Fields
                        where dfd.IsNullable == true
                        select dfd.Name;

                    if (requiredPropertyNames.Except(assignedPropertyNames.Except(nonRequiredPropertyNames)).Count() > 0)
                    {
                        foreach (string propertyName in requiredPropertyNames.Except(assignedPropertyNames.Except(nonRequiredPropertyNames)))
                        {
                            PropertyInfo propertyInfo = dataType.InterfaceType.GetPropertiesRecursively().Where(f => f.Name == propertyName).Single();

                            // Made for backward compatibility
                            if (propertyInfo.ReflectedType == typeof(IChangeHistory))
                            {
                                continue;
                            }

                            if (propertyInfo.CanWrite == true)
                            {
                                _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.MissingPropertyVaule"), propertyName, dataType.InterfaceType)));
                            }
                        }
                        continue;
                    }

                    using (DataScope dataScope = new DataScope(dataType.DataScopeIdentifier, dataType.Locale))
                    {
                        IData data = DataFacade.TryGetDataByUniqueKey(dataType.InterfaceType, dataKeyPropertyCollection);

                        if (data != null)
                        {
                            _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.DataExists"), dataType.InterfaceType)));
                        }
                    }
                }
            }
        }



        private void ValidateDynamicAddedType(DataType dataType)
        {
            DataTypeDescriptor dataTypeDescriptor = this.AddOnInstallerContex.GetPendingDataTypeDescriptor(dataType.InterfaceTypeName);

            if (dataTypeDescriptor == null)
            {
                _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.MissingTypeDescriptor"), dataType.InterfaceTypeName)));
                return;
            }

            if (dataTypeDescriptor.SuperInterfaces.Contains(typeof(ILocalizedControlled)) == false)
            {
                if ((dataType.Locale != null) || (dataType.AddToAllLocales == true) || (dataType.AddToCurrentLoacle == true))
                {
                    _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.TypeNonLocalizedWithLocale"), dataType.InterfaceType, typeof(IData))));
                    return;
                }
            }
            else
            {
                if ((dataType.Locale == null) && (dataType.AddToAllLocales == false) && (dataType.AddToCurrentLoacle == false))
                {
                    _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.TypeLocalizedWithoutLocale"), dataType.InterfaceType, typeof(IData))));
                    return;

                }
            }

            foreach (XElement addElement in dataType.Datas)
            {
                foreach (XAttribute attribute in addElement.Attributes())
                {
                    DataFieldDescriptor dataFieldDescriptor = dataTypeDescriptor.Fields[attribute.Name.LocalName];

                    if (dataFieldDescriptor == null)
                    {
                        _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.MissingProperty"), dataTypeDescriptor, attribute.Name)));
                    }
                    else
                    {
                        try
                        {
                            ValueTypeConverter.Convert(attribute.Value, dataFieldDescriptor.InstanceType);
                        }
                        catch (Exception)
                        {
                            _validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.PackageSystem.PackageFragmentInstallers", "DataAddOnFragmentInstaller.ConversionFailed"), attribute.Value, dataFieldDescriptor.InstanceType)));
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
            public bool AddToCurrentLoacle { get; set; }
            public bool IsDynamicAdded { get; set; }
            public IEnumerable<XElement> Datas { get; set; }
        }
    }
}
