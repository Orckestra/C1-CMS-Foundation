using System.Collections.Generic;


namespace Composite.Core.Configuration
{
    public class FileConfigurationSourceImplementation : Microsoft.Practices.EnterpriseLibrary.Common.Configuration.BaseFileConfigurationSourceImplementation
    {
        private string configurationFilepath;
        private System.Configuration.ExeConfigurationFileMap fileMap;
        private System.Configuration.Configuration cachedConfiguration;
        private object cachedConfigurationLock = new object();



        public FileConfigurationSourceImplementation(string configurationFilepath)
            : this(configurationFilepath, true)
        {
        }

       

        public FileConfigurationSourceImplementation(string configurationFilepath, bool refresh)
            : base(configurationFilepath, refresh)
        {
            this.configurationFilepath = configurationFilepath;
            this.fileMap = new System.Configuration.ExeConfigurationFileMap();
            fileMap.ExeConfigFilename = configurationFilepath;
        }

        

        public override System.Configuration.ConfigurationSection GetSection(string sectionName)
        {
            System.Configuration.Configuration configuration = GetConfiguration();

            System.Configuration.ConfigurationSection configurationSection = configuration.GetSection(sectionName) as System.Configuration.ConfigurationSection;

            SetConfigurationWatchers(sectionName, configurationSection);

            return configurationSection;
        }

       

        protected override void RefreshAndValidateSections(IDictionary<string, string> localSectionsToRefresh, IDictionary<string, string> externalSectionsToRefresh, out ICollection<string> sectionsToNotify, out IDictionary<string, string> sectionsWithChangedConfigSource)
        {
            UpdateCache();

            sectionsToNotify = new List<string>();
            sectionsWithChangedConfigSource = new Dictionary<string, string>();

            // refresh local sections and determine what to do.
            foreach (KeyValuePair<string, string> sectionMapping in localSectionsToRefresh)
            {
                System.Configuration.ConfigurationSection section = cachedConfiguration.GetSection(sectionMapping.Key) as System.Configuration.ConfigurationSection;
                string refreshedConfigSource = section != null ? section.SectionInformation.ConfigSource : NullConfigSource;
                if (!sectionMapping.Value.Equals(refreshedConfigSource))
                {
                    sectionsWithChangedConfigSource.Add(sectionMapping.Key, refreshedConfigSource);
                }

                // notify anyway, since it might have been updated.
                sectionsToNotify.Add(sectionMapping.Key);
            }

            // refresh external sections and determine what to do.
            foreach (KeyValuePair<string, string> sectionMapping in externalSectionsToRefresh)
            {
                System.Configuration.ConfigurationSection section = cachedConfiguration.GetSection(sectionMapping.Key) as System.Configuration.ConfigurationSection;
                string refreshedConfigSource = section != null ? section.SectionInformation.ConfigSource : NullConfigSource;
                if (!sectionMapping.Value.Equals(refreshedConfigSource))
                {
                    sectionsWithChangedConfigSource.Add(sectionMapping.Key, refreshedConfigSource);

                    // notify only if che config source changed
                    sectionsToNotify.Add(sectionMapping.Key);
                }
            }
        }

        

        protected override void RefreshExternalSections(string[] sectionsToRefresh)
        {
            UpdateCache();
        }



        private System.Configuration.Configuration GetConfiguration()
        {
            if (cachedConfiguration == null)
            {
                lock (cachedConfigurationLock)
                {
                    if (cachedConfiguration == null)
                    {
                        cachedConfiguration = System.Configuration.ConfigurationManager.OpenMappedExeConfiguration(fileMap, System.Configuration.ConfigurationUserLevel.None);
                    }
                }
            }

            return cachedConfiguration;
        }



        internal void UpdateCache()
        {
            System.Configuration.Configuration newConfiguration
                = System.Configuration.ConfigurationManager.OpenMappedExeConfiguration(fileMap, System.Configuration.ConfigurationUserLevel.None);
            lock (cachedConfigurationLock)
            {
                cachedConfiguration = newConfiguration;
            }
        }
    }
}
