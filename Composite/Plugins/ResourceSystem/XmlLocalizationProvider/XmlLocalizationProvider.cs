using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.ResourceSystem.Plugins.ResourceProvider;
using Composite.Core.Xml;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;

namespace Composite.Plugins.ResourceSystem.XmlLocalizationProvider
{
    [ConfigurationElementType(typeof(XmlLocalizationProviderData))]
    internal class XmlLocalizationProvider: ILocalizationProvider
    {
        private static readonly string LogTitle = typeof (XmlLocalizationProvider).Name;

        readonly string _directory;
        readonly CultureInfo _defaultCulture;
        
        private State _state;
        private readonly object _syncRoot = new object();

        private readonly C1FileSystemWatcher _watcher;

        public XmlLocalizationProvider(string directoryVirtualPath, CultureInfo defaultCulture)
        {
            _defaultCulture = defaultCulture;
            _directory = PathUtil.Resolve(directoryVirtualPath);

            if(!C1Directory.Exists(_directory))
            {
                Log.LogVerbose(LogTitle, "Directory '{0}' does not exist", directoryVirtualPath);
                return;
            }

            _watcher = new C1FileSystemWatcher(_directory, "*.xml");

            _watcher.Created += (sender, args) => Reset();
            _watcher.Changed += (sender, args) => Reset();
            _watcher.Deleted += (sender, args) => Reset();

            _watcher.EnableRaisingEvents = true;
        }

        public IEnumerable<string> GetSections()
        {
            var state = GetState();

            return state.Sections.Keys;
        }

        public string GetString(string section, string stringId, CultureInfo cultureInfo)
        {
            var state = GetState();

            if(!state.Sections.ContainsKey(section))
            {
                return null;
            }

            var filesByCulture = state.Sections[section];

            if(filesByCulture.ContainsKey(cultureInfo))
            {
                var strings = filesByCulture[cultureInfo].GetStrings();

                if(strings.ContainsKey(stringId))
                {
                    return strings[stringId];
                }
            }

            // If not found - searching in default culture
            if(!cultureInfo.Equals(_defaultCulture) && filesByCulture.ContainsKey(_defaultCulture))
            {
                var strings = filesByCulture[_defaultCulture].GetStrings();

                if(strings.ContainsKey(stringId))
                {
                    return strings[stringId];
                }
            }

            return null;
        }

        public IDictionary<string, string> GetAllStrings(string section, CultureInfo cultureInfo)
        {
            var state = GetState();

            if (!state.Sections.ContainsKey(section))
            {
                return null;
            }

            var filesByCulture = state.Sections[section];

            return filesByCulture.ContainsKey(cultureInfo) ? filesByCulture[cultureInfo].GetStrings() : null;
        }

        public IEnumerable<CultureInfo> GetSupportedCultures()
        {
            var state = GetState();

            var result = new List<CultureInfo>();

            foreach(var section in state.Sections)
            {
                result.AddRange(section.Value.Keys);
            }

            return result.Distinct();
        }


        public IEnumerable<System.Globalization.CultureInfo> GetSupportedCultures(string section)
        {
            var state = GetState();

            if(!state.Sections.ContainsKey(section))
            {
                return new CultureInfo[0];
            }

            return state.Sections[section].Keys;
        }

        private State Initialize()
        {
            var sections = new Dictionary<string, Dictionary<CultureInfo, LocalizationFile>>();

            if (C1Directory.Exists(_directory))
            {
                foreach (string xmlFile in C1Directory.GetFiles(_directory, "*.xml", SearchOption.AllDirectories))
                {
                    // File names have format <section name>.<culture name>.xml

                    string fileName = Path.GetFileName(xmlFile);

                    fileName = fileName.Substring(0, fileName.Length - 4); // removing ".xml";

                    if (!fileName.Contains(".")) continue;

                    string cultureName = fileName.Substring(fileName.LastIndexOf(".", StringComparison.Ordinal) + 1);

                    CultureInfo cultureInfo;
                    try
                    {
                        cultureInfo = CultureInfo.GetCultureInfo(cultureName);
                    }
                    catch (CultureNotFoundException)
                    {
                        Log.LogInformation(LogTitle, "Skipping file '{0}' as '{1}' is not a valid culture name",
                                           Path.GetFileName(xmlFile), cultureName);
                        continue;
                    }

                    string sectionName = fileName.Substring(0, fileName.Length - cultureName.Length - 1);

                    if (!sections.ContainsKey(sectionName))
                    {
                        sections.Add(sectionName, new Dictionary<CultureInfo, LocalizationFile>());
                    }

                    var localizationFile = new LocalizationFile(xmlFile);
                    sections[sectionName].Add(cultureInfo, localizationFile);
                }
            }

            return new State { Sections = sections };
        }

        private void Reset()
        {
            lock(_syncRoot)
            {
                _state = null;
            }
        }

        private State GetState()
        {
            var state = _state;
            if(state == null)
            {
                lock (_syncRoot)
                {
                    state = _state;
                    if(state == null)
                    {
                        _state = state = Initialize();
                    }
                }
            }
            return state;
        }

        private static IDictionary<string, string> LoadStrings(string fileName)
        {
            XElement strings = XElementUtils.Load(fileName);

            var stringDictionary = new Dictionary<string, string>();

            foreach (XElement stringElement in strings.Elements())
            {
                XAttribute keyAttribute = stringElement.Attribute("key");
                XAttribute valueAttribute = stringElement.Attribute("value");

                if (keyAttribute != null && valueAttribute != null)
                {
                    if (stringDictionary.ContainsKey(keyAttribute.Value))
                    {
                        throw new InvalidOperationException("Duplicate string resource key '{0}' in XML file '{1}'"
                                                            .FormatWith(keyAttribute.Value, Path.GetFileName(fileName)));
                    }

                    stringDictionary.Add(keyAttribute.Value, valueAttribute.Value);
                }
                else
                {
                    Log.LogError(LogTitle, "Invalid entry '{0}' in file '{1}'"
                                          .FormatWith(stringElement.ToString(SaveOptions.DisableFormatting), Path.GetFileName(fileName)));
                }
            }

            return stringDictionary;
        }

        private class State
        {
            public IDictionary<string, Dictionary<CultureInfo, LocalizationFile>> Sections;
        }

        private class LocalizationFile
        {
            private readonly string _filePath;
            private volatile IDictionary<string, string> _strings;

            public LocalizationFile(string filePath)
            {
                _filePath = filePath;
            }

            public IDictionary<string, string> GetStrings()
            {
                if(_strings == null)
                {
                    lock(this)
                    {
                        if(_strings == null)
                        {
                            _strings = LoadStrings(_filePath);
                        }
                    }
                }

                return _strings;
            }
        }

        #region Configuration

        [Assembler(typeof(XmlLocalizationProviderAssembler))]
        internal sealed class XmlLocalizationProviderData : ResourceProviderData
        {
            private const string _defaultCultureNameProperty = "defaultCultureName";
            [ConfigurationProperty(_defaultCultureNameProperty, IsRequired = true)]
            public string DefaultCultureName
            {
                get { return (string)base[_defaultCultureNameProperty]; }
                set { base[_defaultCultureNameProperty] = value; }
            }

            private const string _directoryProperty = "directory";
            [ConfigurationProperty(_directoryProperty)]
            public string Directory
            {
                get
                {
                    return (string)base[_directoryProperty];
                }
            }
        }

        internal sealed class XmlLocalizationProviderAssembler : IAssembler<IResourceProvider, ResourceProviderData>
        {
            public IResourceProvider Assemble(IBuilderContext context, ResourceProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
            {
                var data = (XmlLocalizationProviderData)objectConfiguration;

                var defaultCulture = CultureInfo.GetCultureInfo(data.DefaultCultureName);
                string directoryVirtualPath = data.Directory;

                return new XmlLocalizationProvider(directoryVirtualPath, defaultCulture);
            }
        }

        #endregion Configuration
    }
}
