using System;
using System.Collections.Generic;
using Composite.Core.NewIO;


namespace Composite.Core.Configuration
{
    internal class FileConfigurationSource : Microsoft.Practices.EnterpriseLibrary.Common.Configuration.IConfigurationSource, Microsoft.Practices.EnterpriseLibrary.Common.Configuration.IProtectedConfigurationSource
	{
		private static Dictionary<string, FileConfigurationSourceImplementation> implementationByFilepath = new Dictionary<string, FileConfigurationSourceImplementation>(StringComparer.OrdinalIgnoreCase);
		private string configurationFilepath;
		private static object lockObject = new object();



		public FileConfigurationSource(string configurationFilepath)
        {
#warning MRJ: Fix this exception
            if (string.IsNullOrEmpty(configurationFilepath)) throw new ArgumentException("Resources.ExceptionStringNullOrEmpty", "configurationFilepath");
			this.configurationFilepath = RootConfigurationFilePath(configurationFilepath);

#warning MRJ: Fix this exception
            if (!File.Exists(this.configurationFilepath)) throw new System.IO.FileNotFoundException(string.Format("", "Resources.ExceptionConfigurationLoadFileNotFound", this.configurationFilepath));
			EnsureImplementation(this.configurationFilepath);
		}

		

		
		public System.Configuration.ConfigurationSection GetSection(string sectionName)
		{
			return implementationByFilepath[configurationFilepath].GetSection(sectionName);
		}

		


        public void AddSectionChangeHandler(string sectionName, Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ConfigurationChangedEventHandler handler)
		{
			implementationByFilepath[configurationFilepath].AddSectionChangeHandler(sectionName, handler);
		}

		


        public void RemoveSectionChangeHandler(string sectionName, Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ConfigurationChangedEventHandler handler)
		{
			implementationByFilepath[configurationFilepath].RemoveSectionChangeHandler(sectionName, handler);
		}

		


		public void Save(string fileName, string section, System.Configuration.ConfigurationSection configurationSection)
		{
            ValidateArgumentsAndFileExists(fileName, section, configurationSection);

            InternalSave(fileName, section, configurationSection, string.Empty);
		}

     

        public void Save(string fileName, string section, System.Configuration.ConfigurationSection configurationSection, string protectionProvider)
        {
            ValidateArgumentsAndFileExists(fileName, section, configurationSection);
#warning MRJ: Fix this exception
            if (string.IsNullOrEmpty(protectionProvider)) throw new ArgumentException("Resources.ExceptionStringNullOrEmpty", "protectionProvider");

            InternalSave(fileName, section, configurationSection, protectionProvider);
        }

        private void InternalSave(string fileName, string section, System.Configuration.ConfigurationSection configurationSection, string protectionProvider)
        {
            System.Configuration.ExeConfigurationFileMap fileMap = new System.Configuration.ExeConfigurationFileMap();
            fileMap.ExeConfigFilename = fileName;
            System.Configuration.Configuration config = System.Configuration.ConfigurationManager.OpenMappedExeConfiguration(fileMap, System.Configuration.ConfigurationUserLevel.None);
            if (typeof(System.Configuration.ConnectionStringsSection) == configurationSection.GetType())
            {
                config.Sections.Remove(section);
                UpdateConnectionStrings(section, configurationSection, config, protectionProvider);
            }
            else if (typeof(System.Configuration.AppSettingsSection) == configurationSection.GetType())
            {
                UpdateApplicationSettings(section, configurationSection, config, protectionProvider);
            }
            else
            {
                config.Sections.Remove(section);
                config.Sections.Add(section, configurationSection);
                ProtectConfigurationSection(configurationSection, protectionProvider);
            }

            config.Save();

            UpdateImplementation(fileName);
        }



        private static void ProtectConfigurationSection(System.Configuration.ConfigurationSection configurationSection, string protectionProvider)
        {
            if (!string.IsNullOrEmpty(protectionProvider))
            {
                if(configurationSection.SectionInformation.ProtectionProvider == null
                    || configurationSection.SectionInformation.ProtectionProvider.Name != protectionProvider)
                {
                    configurationSection.SectionInformation.ProtectSection(protectionProvider);
                }
            }
            else
            {
                if(configurationSection.SectionInformation.ProtectionProvider != null)
                {
                    configurationSection.SectionInformation.UnprotectSection();
                }
            }
        }
        


        private void UpdateApplicationSettings(string section, System.Configuration.ConfigurationSection configurationSection, System.Configuration.Configuration config, string protectionProvider)
        {
            System.Configuration.AppSettingsSection current = config.AppSettings;
            if (current == null)
            {
                config.Sections.Add(section, configurationSection);
                ProtectConfigurationSection(configurationSection, protectionProvider);
            }
            else
            {
                System.Configuration.AppSettingsSection newApplicationSettings = configurationSection as System.Configuration.AppSettingsSection;
                if (current.File != newApplicationSettings.File)
                {
                    current.File = newApplicationSettings.File;
                }

                List<string> newKeys = new List<string>(newApplicationSettings.Settings.AllKeys);
                List<string> currentKeys = new List<string>(current.Settings.AllKeys);

                foreach (string keyInCurrent in currentKeys)
                {
                    if (!newKeys.Contains(keyInCurrent))
                    {
                        current.Settings.Remove(keyInCurrent);
                    }
                }

                foreach (string newKey in newKeys)
                {
                    if (!currentKeys.Contains(newKey))
                    {
                        current.Settings.Add(newKey, newApplicationSettings.Settings[newKey].Value);
                    }
                    else
                    {
                        if (current.Settings[newKey].Value != newApplicationSettings.Settings[newKey].Value)
                        {
                            current.Settings[newKey].Value = newApplicationSettings.Settings[newKey].Value;
                        }
                    }
                }
                ProtectConfigurationSection(current, protectionProvider);
            }

        }



		private void UpdateConnectionStrings(string section, System.Configuration.ConfigurationSection configurationSection, System.Configuration.Configuration config, string protectionProvider)
		{
			System.Configuration.ConnectionStringsSection current = config.ConnectionStrings;
			if (current == null)
			{
				config.Sections.Add(section, configurationSection);
                ProtectConfigurationSection(configurationSection, protectionProvider);
			}
			else
			{
				System.Configuration.ConnectionStringsSection newConnectionStrings = (System.Configuration.ConnectionStringsSection)configurationSection;
				foreach (System.Configuration.ConnectionStringSettings connectionString in newConnectionStrings.ConnectionStrings)
				{
					if (current.ConnectionStrings[connectionString.Name] == null)
					{
						current.ConnectionStrings.Add(connectionString);
					}
				}
                ProtectConfigurationSection(current, protectionProvider);
			}
		}

		

		public void Remove(string fileName, string section)
        {
#warning MRJ: Fix this exception
            if (string.IsNullOrEmpty(fileName)) throw new ArgumentException("Resources.ExceptionStringNullOrEmpty", "fileName");
#warning MRJ: Fix this exception
            if (string.IsNullOrEmpty(section)) throw new ArgumentException("Resources.ExceptionStringNullOrEmpty", "section");

			System.Configuration.ExeConfigurationFileMap fileMap = new System.Configuration.ExeConfigurationFileMap();
			fileMap.ExeConfigFilename = fileName;
			System.Configuration.Configuration config = System.Configuration.ConfigurationManager.OpenMappedExeConfiguration(fileMap, System.Configuration.ConfigurationUserLevel.None);
			if (config.Sections.Get(section) != null)
			{
				config.Sections.Remove(section);
				config.Save();
				UpdateImplementation(fileName);
			}
		}

		


        public void Add(Microsoft.Practices.EnterpriseLibrary.Common.Configuration.IConfigurationParameter saveParameter, string sectionName, System.Configuration.ConfigurationSection configurationSection)
		{
            Microsoft.Practices.EnterpriseLibrary.Common.Configuration.FileConfigurationParameter parameter = saveParameter as Microsoft.Practices.EnterpriseLibrary.Common.Configuration.FileConfigurationParameter;
#warning MRJ: Fix this exception
            if (null == parameter) throw new ArgumentException(string.Format("", "Resources.ExceptionUnexpectedType", typeof(Microsoft.Practices.EnterpriseLibrary.Common.Configuration.FileConfigurationParameter).Name), "saveParameter");

			Save(parameter.FileName, sectionName, configurationSection);
		}


      

        public void Add(Microsoft.Practices.EnterpriseLibrary.Common.Configuration.IConfigurationParameter saveParameter, string sectionName, System.Configuration.ConfigurationSection configurationSection, string protectionProviderName)
        {
            Microsoft.Practices.EnterpriseLibrary.Common.Configuration.FileConfigurationParameter parameter = saveParameter as Microsoft.Practices.EnterpriseLibrary.Common.Configuration.FileConfigurationParameter;
#warning MRJ: Fix this exception
            if (null == parameter) throw new ArgumentException(string.Format("", "Resources.ExceptionUnexpectedType", typeof(Microsoft.Practices.EnterpriseLibrary.Common.Configuration.FileConfigurationParameter).Name), "saveParameter");

            Save(parameter.FileName, sectionName, configurationSection, protectionProviderName);
            
        }

	


		public void Remove(Microsoft.Practices.EnterpriseLibrary.Common.Configuration.IConfigurationParameter removeParameter, string sectionName)
		{
            Microsoft.Practices.EnterpriseLibrary.Common.Configuration.FileConfigurationParameter parameter = removeParameter as Microsoft.Practices.EnterpriseLibrary.Common.Configuration.FileConfigurationParameter;
#warning MRJ: Fix this exception
            if (null == parameter) throw new ArgumentException(string.Format("", "Resources.ExceptionUnexpectedType", typeof(Microsoft.Practices.EnterpriseLibrary.Common.Configuration.FileConfigurationParameter).Name), "saveParameter");

			Remove(parameter.FileName, sectionName);
		}
        


		public static void ResetImplementation(string configurationFilepath, bool refreshing)
		{
			string rootedConfigurationFilepath = RootConfigurationFilePath(configurationFilepath);
			FileConfigurationSourceImplementation currentImplementation = null;
			implementationByFilepath.TryGetValue(rootedConfigurationFilepath, out currentImplementation);
			implementationByFilepath[rootedConfigurationFilepath] = new FileConfigurationSourceImplementation(rootedConfigurationFilepath, refreshing);

			if (currentImplementation != null)
			{
				currentImplementation.Dispose();
			}
		}



        internal Microsoft.Practices.EnterpriseLibrary.Common.Configuration.BaseFileConfigurationSourceImplementation Implementation
		{
			get { return implementationByFilepath[configurationFilepath]; }
		}



        internal static Microsoft.Practices.EnterpriseLibrary.Common.Configuration.BaseFileConfigurationSourceImplementation GetImplementation(string configurationFilepath)
		{
			string rootedConfigurationFilepath = RootConfigurationFilePath(configurationFilepath);
			EnsureImplementation(rootedConfigurationFilepath);
			return implementationByFilepath[rootedConfigurationFilepath];
		}



		private static void ValidateArgumentsAndFileExists(string fileName, string section, System.Configuration.ConfigurationSection configurationSection)
        {
#warning MRJ: Fix this exception
            if (string.IsNullOrEmpty(fileName)) throw new ArgumentException("Resources.ExceptionStringNullOrEmpty", "fileName");
			if (string.IsNullOrEmpty(section)) throw new ArgumentException("Resources.ExceptionStringNullOrEmpty", "section");
#warning MRJ: Fix this exception
            if (null == configurationSection) throw new ArgumentNullException("configurationSection");

			if (!File.Exists(fileName)) throw new System.IO.FileNotFoundException(string.Format("", "Resources.ExceptionConfigurationFileNotFound", section), fileName);
		}



		private static string RootConfigurationFilePath(string configurationFile)
		{
			string rootedConfigurationFile = (string)configurationFile.Clone();
			if (!System.IO.Path.IsPathRooted(rootedConfigurationFile))
			{
				rootedConfigurationFile = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, rootedConfigurationFile);
			}
			return rootedConfigurationFile;
		}



		private static void EnsureImplementation(string rootedConfigurationFile)
		{
			if (!implementationByFilepath.ContainsKey(rootedConfigurationFile))
			{
				lock (lockObject)
				{
					if (!implementationByFilepath.ContainsKey(rootedConfigurationFile))
					{
						FileConfigurationSourceImplementation implementation = new FileConfigurationSourceImplementation(rootedConfigurationFile);
						implementationByFilepath.Add(rootedConfigurationFile, implementation);
					}
				}
			}
		}



		private static void UpdateImplementation(string fileName)
		{
			FileConfigurationSourceImplementation implementation;
			implementationByFilepath.TryGetValue(fileName, out implementation);
			if (implementation != null)
			{
				implementation.UpdateCache();
			}
		}
    }
}
