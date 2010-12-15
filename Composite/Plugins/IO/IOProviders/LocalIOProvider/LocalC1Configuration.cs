using System.Configuration;
using Composite.Core.IO.Plugins.IOProvider;


namespace Composite.Plugins.IO.IOProviders.LocalIOProvider
{
    public class LocalC1Configuration : IC1Configuration
    {
        private Configuration _configuration;


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "IO implementation")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationManagerClass:DoNotUseConfigurationManagerClass", Justification = "IO implementation")]
        public LocalC1Configuration(string path)
        {
            ExeConfigurationFileMap map = new ExeConfigurationFileMap();
            map.ExeConfigFilename = path;
            _configuration = ConfigurationManager.OpenMappedExeConfiguration(map, ConfigurationUserLevel.None);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "IO implementation")]
        public string FilePath
        {
            get
            {
                return _configuration.FilePath;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "IO implementation")]
        public bool HasFile
        {
            get
            {
                return _configuration.HasFile;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "IO implementation")]
        public AppSettingsSection AppSettings
        {
            get
            {
                return _configuration.AppSettings;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "IO implementation")]
        public ConnectionStringsSection ConnectionStrings
        {
            get
            {
                return _configuration.ConnectionStrings;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "IO implementation")]
        public ConfigurationSectionCollection Sections
        {
            get
            {
                return _configuration.Sections;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "IO implementation")]
        public ConfigurationSectionGroup RootSectionGroup
        {
            get
            {
                return _configuration.RootSectionGroup;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "IO implementation")]
        public ConfigurationSectionGroupCollection SectionGroups
        {
            get
            {
                return _configuration.SectionGroups;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "IO implementation")]
        public ConfigurationSection GetSection(string sectionName)
        {
            return _configuration.GetSection(sectionName);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "IO implementation")]
        public ConfigurationSectionGroup GetSectionGroup(string sectionGroupName)
        {
            return _configuration.GetSectionGroup(sectionGroupName);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "IO implementation")]
        public void Save()
        {
            _configuration.Save();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "IO implementation")]
        public void Save(ConfigurationSaveMode saveMode)
        {
            _configuration.Save(saveMode);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "IO implementation")]
        public void Save(ConfigurationSaveMode saveMode, bool forceSaveAll)
        {
            _configuration.Save(saveMode, forceSaveAll);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "IO implementation")]
        public void SaveAs(string filename)
        {
            _configuration.SaveAs(filename);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "IO implementation")]
        public void SaveAs(string filename, ConfigurationSaveMode saveMode)
        {
            _configuration.SaveAs(filename, saveMode);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "IO implementation")]
        public void SaveAs(string filename, ConfigurationSaveMode saveMode, bool forceSaveAll)
        {
            _configuration.SaveAs(filename, saveMode, forceSaveAll);
        }
    }
}
