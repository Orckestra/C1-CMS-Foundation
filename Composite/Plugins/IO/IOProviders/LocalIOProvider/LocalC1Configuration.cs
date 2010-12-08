using System.Configuration;
using Composite.Core.IO.Plugins.IOProvider;


namespace Composite.Plugins.IO.IOProviders.LocalIOProvider
{
    public class LocalC1Configuration : IC1Configuration
    {
        private Configuration _configuration;


        public LocalC1Configuration(string path)
        {
            ExeConfigurationFileMap map = new ExeConfigurationFileMap();
            map.ExeConfigFilename = path;
            _configuration = ConfigurationManager.OpenMappedExeConfiguration(map, ConfigurationUserLevel.None);
        }



        public string FilePath
        {
            get
            {
                return _configuration.FilePath;
            }
        }



        public bool HasFile
        {
            get
            {
                return _configuration.HasFile;
            }
        }



        public AppSettingsSection AppSettings
        {
            get
            {
                return _configuration.AppSettings;
            }
        }



        public ConnectionStringsSection ConnectionStrings
        {
            get
            {
                return _configuration.ConnectionStrings;
            }
        }



        public ConfigurationSectionCollection Sections
        {
            get
            {
                return _configuration.Sections;
            }
        }



        public ConfigurationSectionGroup RootSectionGroup
        {
            get
            {
                return _configuration.RootSectionGroup;
            }
        }



        public ConfigurationSectionGroupCollection SectionGroups
        {
            get
            {
                return _configuration.SectionGroups;
            }
        }



        public ConfigurationSection GetSection(string sectionName)
        {
            return _configuration.GetSection(sectionName);
        }



        public ConfigurationSectionGroup GetSectionGroup(string sectionGroupName)
        {
            return _configuration.GetSectionGroup(sectionGroupName);
        }



        public void Save()
        {
            _configuration.Save();
        }



        public void Save(ConfigurationSaveMode saveMode)
        {
            _configuration.Save(saveMode);
        }



        public void Save(ConfigurationSaveMode saveMode, bool forceSaveAll)
        {
            _configuration.Save(saveMode, forceSaveAll);
        }



        public void SaveAs(string filename)
        {
            _configuration.SaveAs(filename);
        }



        public void SaveAs(string filename, ConfigurationSaveMode saveMode)
        {
            _configuration.SaveAs(filename, saveMode);
        }



        public void SaveAs(string filename, ConfigurationSaveMode saveMode, bool forceSaveAll)
        {
            _configuration.SaveAs(filename, saveMode, forceSaveAll);
        }
    }
}
