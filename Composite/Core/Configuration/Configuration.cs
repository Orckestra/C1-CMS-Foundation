using System.Configuration;


namespace Composite.Core.Configuration
{
   /* /// <summary>
    /// This should be a part of the I/O layer
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class C1Configuration
    {
        System.Configuration.Configuration _configuration;


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationManagerClass:DoNotUseConfigurationManagerClass", Justification = "The implementation may use it")]
        public static C1Configuration Load(string path)
        {            
            ExeConfigurationFileMap map = new ExeConfigurationFileMap();
            map.ExeConfigFilename = path;
            System.Configuration.Configuration configuration = ConfigurationManager.OpenMappedExeConfiguration(map, ConfigurationUserLevel.None);            

            return new C1Configuration(configuration);
        }



        protected C1Configuration(System.Configuration.Configuration configuration)
        {
            _configuration = configuration;
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "The implementation may use it")]
        public ConfigurationSectionCollection Sections
        {
            get
            {
                return _configuration.Sections;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "The implementation may use it")]
        public ConfigurationSection GetSection(string sectionName)
        {
            return _configuration.GetSection(sectionName);
        }




        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "The implementation may use it")]
        public void Save()
        {
            _configuration.Save();
        }
    }*/
}
