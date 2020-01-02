//===============================================================================
// Microsoft patterns & practices Enterprise Library
// Core
//===============================================================================
// Copyright © Microsoft Corporation.  All rights reserved.
// THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE.
//===============================================================================

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using System.Collections.Generic;


namespace Composite.Core.Configuration
{
    /// <summary>
    /// This should be a part of the I/O layer
    /// </summary>
    internal class FileConfigurationSourceImplementation : Microsoft.Practices.EnterpriseLibrary.Common.Configuration.BaseFileConfigurationSourceImplementation
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



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "The implementation may use it")]
        public override System.Configuration.ConfigurationSection GetSection(string sectionName)
        {
            System.Configuration.Configuration configuration = GetConfiguration();
            System.Configuration.ConfigurationSection configurationSection;

            try
            {
                configurationSection = configuration.GetSection(sectionName) as System.Configuration.ConfigurationSection;
            }
            catch (System.Configuration.ConfigurationException ex)
            {
                // retry once
                UpdateCache();
                configuration = GetConfiguration();
                configurationSection = configuration.GetSection(sectionName) as System.Configuration.ConfigurationSection;
            }

            SetConfigurationWatchers(sectionName, configurationSection);

            return configurationSection;
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationClass:DoNotUseConfigurationClass", Justification = "The implementation may use it")]
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




        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationManagerClass:DoNotUseConfigurationManagerClass", Justification = "The implementation may use it")]
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



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseConfigurationManagerClass:DoNotUseConfigurationManagerClass", Justification = "The implementation may use it")]
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
