using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;


namespace Composite.Core.Configuration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class Configuration
    {
        System.Configuration.Configuration _configuration;

        public static Configuration Load(string path)
        {
            ExeConfigurationFileMap map = new ExeConfigurationFileMap();
            map.ExeConfigFilename = path;
            System.Configuration.Configuration configuration = ConfigurationManager.OpenMappedExeConfiguration(map, ConfigurationUserLevel.None);

            return new Configuration(configuration);
        }



        protected Configuration(System.Configuration.Configuration configuration)
        {
            _configuration = configuration;
        }



        public ConfigurationSectionCollection Sections
        {
            get
            {
                return _configuration.Sections;
            }
        }



        public ConfigurationSection GetSection(string sectionName)
        {
            return _configuration.GetSection(sectionName);
        }



        public void Save()
        {
            _configuration.Save();
        }
    }
}
