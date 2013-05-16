using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Collections.Generic;
using Composite.Core.IO;
using Composite.Core.Logging;
using Composite.Core.ResourceSystem.Plugins.ResourceProvider;
using Composite.Core.Xml;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.ResourceSystem.XmlStringResourceProvider
{
    [ConfigurationElementType(typeof(XmlStringResourceProviderData))]
    internal sealed class XmlStringResourceProvider : IStringResourceProvider
    {
        private ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize, false);
        private string _providerName;



        public XmlStringResourceProvider(string defaultCultureName, Dictionary<CultureInfo, string> cultureToFileLookup, Dictionary<CultureInfo, bool> watchForFileChanges, string providerName)
        {
            using (_resourceLocker.Locker)
            {
                _providerName = providerName;

                _resourceLocker.Resources.DefaultCulture = new CultureInfo(defaultCultureName);
                _resourceLocker.Resources.CultureToFileLookup = cultureToFileLookup;

                foreach (CultureInfo watchedCulture in watchForFileChanges.Where(f => f.Value).Select(f => f.Key))
                {
                    string unresolvedFileName;
                    if (_resourceLocker.Resources.CultureToFileLookup.TryGetValue(watchedCulture, out unresolvedFileName))
                    {
                        string resolvedFileName = PathUtil.Resolve(unresolvedFileName);
                        DateTime lastWrite = C1File.GetLastWriteTime(resolvedFileName);

                        _resourceLocker.Resources.CultureFileLastUpdated.Add(watchedCulture, lastWrite);
                    }
                }
            }
        }



        public string GetStringValue(string stringId, CultureInfo cultureInfo)
        {
            Dictionary<string, string> stringDictionary; 

            try
            {
                stringDictionary = GetStringsForCulture(cultureInfo);
            }
            catch (FileNotFoundException ex)
            {
                return string.Format("*** FILE '{0}' NOT FOUND ***", ex.FileName);
            }

            using (_resourceLocker.ReadLocker)
            {
                if (stringDictionary == null)
                {
                    if (cultureInfo != _resourceLocker.Resources.DefaultCulture)
                    {
                        return GetStringValue(stringId, _resourceLocker.Resources.DefaultCulture);
                    }
                    else
                    {
                        LoggingService.LogError("XmlStringResourceProvider", "String provider misconfigured. No string file available for default culture.");
                        return "*** STRING NOT FOUND ***";
                    }
                }
                else
                {
                    string result;

                    if (stringDictionary.TryGetValue(stringId, out result) == false)
                    {
                        if (cultureInfo != _resourceLocker.Resources.DefaultCulture)
                        {
                            return GetStringValue(stringId, _resourceLocker.Resources.DefaultCulture);
                        }
                        else
                        {
                            LoggingService.LogError("XmlStringResourceProvider", string.Format("String not found: '{0}' for provider '{1}'", stringId, _providerName));
                            return "*** STRING NOT FOUND ***";
                        }
                    }
                    else
                    {
                        return result;
                    }
                }
            }
        }



        public IDictionary<string, string> GetAllStrings(CultureInfo cultureInfo)
        {
            IDictionary<string, string> currentCultureStrings = GetStringsForCulture(cultureInfo);

            using (_resourceLocker.ReadLocker)
            {
                if (currentCultureStrings == null) return GetStringsForCulture(_resourceLocker.Resources.DefaultCulture);
                if (cultureInfo == _resourceLocker.Resources.DefaultCulture) return currentCultureStrings;

                IDictionary<string, string> defaultCultureStrings = GetStringsForCulture(_resourceLocker.Resources.DefaultCulture);

                if (defaultCultureStrings.Count == currentCultureStrings.Count) return currentCultureStrings;

                return currentCultureStrings.Union(defaultCultureStrings.Where(f => currentCultureStrings.ContainsKey(f.Key) == false)).ToDictionary(f => f.Key, f => f.Value);
            }
        }






        public IEnumerable<CultureInfo> GetSupportedCultures()
        {
            using (_resourceLocker.Locker)
            {
                foreach (CultureInfo cultureInfo in _resourceLocker.Resources.CultureToFileLookup.Keys.Distinct())
                {
                    yield return cultureInfo;
                }
            }
        }

        
        
        /// <summary>
        /// Returns strings for the specified culture or null if no strings exists.
        /// </summary>
        private Dictionary<string, string> GetStringsForCulture(CultureInfo cultureInfo)
        {
            Dictionary<string, string> stringDictionary;

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.CultureFileLastUpdated.ContainsKey(cultureInfo))
                {
                    string unresolvedFileName = _resourceLocker.Resources.CultureToFileLookup[cultureInfo];
                    string resolvedFileName = PathUtil.Resolve(unresolvedFileName);

                    DateTime lastWrite = C1File.GetLastWriteTime(resolvedFileName);
                    double secondsSinceLastWrite = (DateTime.Now - lastWrite).TotalSeconds;

                    if (secondsSinceLastWrite < 300 || lastWrite > _resourceLocker.Resources.CultureFileLastUpdated[cultureInfo])
                    {
                        _resourceLocker.Resources.CultureToTranslation.Remove(cultureInfo);
                        _resourceLocker.Resources.CultureFileLastUpdated[cultureInfo] = lastWrite;
                    }
                }

                if (_resourceLocker.Resources.CultureToTranslation.TryGetValue(cultureInfo, out stringDictionary) == false)
                {
                    string unresolvedFileName;
                    if (_resourceLocker.Resources.CultureToFileLookup.TryGetValue(cultureInfo, out unresolvedFileName) == false)
                    {
                        return null;
                    }

                    string resolvedFileName = PathUtil.Resolve(unresolvedFileName);
                    XElement strings = XElementUtils.Load(resolvedFileName);

                    stringDictionary = new Dictionary<string, string>();

                    foreach (XElement stringElement in strings.Elements())
                    {
                        XAttribute keyAttribute = stringElement.Attribute("key");
                        XAttribute valueAttribute = stringElement.Attribute("value");

                        if (keyAttribute != null && valueAttribute != null)
                        {
                            if (stringDictionary.ContainsKey(keyAttribute.Value))
                            {
                                throw new InvalidOperationException(string.Format("Duplicate string resource key '{0}' in XML file '{1}'", keyAttribute.Value, unresolvedFileName));
                            }
                            stringDictionary.Add(keyAttribute.Value, valueAttribute.Value);
                        }
                        else
                        {
                            LoggingService.LogError("XmlStringResourceProvider", string.Format("Invalid entry '{0}' in file '{1}'", stringElement.ToString(SaveOptions.DisableFormatting), unresolvedFileName));
                        }
                    }

                    _resourceLocker.Resources.CultureToTranslation.Add(cultureInfo, stringDictionary);
                }
            }

            return stringDictionary;
        }




        private sealed class Resources
        {
            public CultureInfo DefaultCulture { get; set; }
            public Dictionary<CultureInfo, string> CultureToFileLookup { get; set; }
            public Dictionary<CultureInfo, Dictionary<string, string>> CultureToTranslation { get; set; }
            public Dictionary<CultureInfo, DateTime> CultureFileLastUpdated { get; set; }

            public static void Initialize(Resources resources)
            {
                resources.CultureToTranslation = new Dictionary<CultureInfo, Dictionary<string, string>>();
                resources.CultureFileLastUpdated = new Dictionary<CultureInfo, DateTime>();
            }
        }
    }


    [Assembler(typeof(XmlStringResourceProviderAssembler))]
    internal sealed class XmlStringResourceProviderData : ResourceProviderData
    {
        private const string _defaultCultureNameProperty = "defaultCultureName";
        [ConfigurationProperty(_defaultCultureNameProperty, IsRequired = true)]
        public string DefaultCultureName
        {
            get { return (string)base[_defaultCultureNameProperty]; }
            set { base[_defaultCultureNameProperty] = value; }
        }



        private const string _culturesProperty = "Cultures";
        [ConfigurationProperty(_culturesProperty)]
        public CultureElementCollection Cultures
        {
            get
            {
                return (CultureElementCollection)base[_culturesProperty];
            }
        }
    }



    internal sealed class CulturenameConfigurationElement : ConfigurationElement
    {
        private const string _cultureNameProperty = "cultureName";
        [ConfigurationProperty(_cultureNameProperty, IsKey = true)]
        public string CultureName
        {
            get { return (string)base[_cultureNameProperty]; }
            set { base[_cultureNameProperty] = value; }
        }



        private const string _xmlFileProperty = "xmlFile";
        [ConfigurationProperty(_xmlFileProperty)]
        public string XmlFile
        {
            get { return (string)base[_xmlFileProperty]; }
            set { base[_xmlFileProperty] = value; }
        }



        private const string _monitorFileChanges = "monitorFileChanges";
        [ConfigurationProperty(_monitorFileChanges)]
        public bool MonitorFileChanges
        {
            get { return (bool)base[_monitorFileChanges]; }
            set { base[_monitorFileChanges] = value; }
        }
    }



    internal sealed class CultureElementCollection : ConfigurationElementCollection
    {
        public void Add(CulturenameConfigurationElement element)
        {
            BaseAdd(element);
        }

        protected override ConfigurationElement CreateNewElement()
        {
            return new CulturenameConfigurationElement();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            return ((CulturenameConfigurationElement)element).CultureName;
        }
    }



    internal sealed class XmlStringResourceProviderAssembler : IAssembler<IResourceProvider, ResourceProviderData>
    {
        public IResourceProvider Assemble(IBuilderContext context, ResourceProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            XmlStringResourceProviderData data = (XmlStringResourceProviderData)objectConfiguration;

            IEnumerable<CulturenameConfigurationElement> cultureElements = data.Cultures.Cast<CulturenameConfigurationElement>();

            Dictionary<CultureInfo, string> cultureFiles = cultureElements.ToDictionary(k => new CultureInfo(k.CultureName), f => f.XmlFile);
            Dictionary<CultureInfo, bool> cultureFileWatches = cultureElements.ToDictionary(k => new CultureInfo(k.CultureName), f => f.MonitorFileChanges);

            XmlStringResourceProvider provider =
                new XmlStringResourceProvider(data.DefaultCultureName, cultureFiles, cultureFileWatches, data.Name);

            return provider;
        }
    }
}
