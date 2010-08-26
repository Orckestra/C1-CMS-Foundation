using System;
using System.Collections.Generic;
using System.Globalization;
using Composite.Core.Configuration.Foundation.PluginFacades;


namespace Composite.Core.Configuration
{
    internal sealed class GlobalSettingsFacadeImpl : IGlobalSettingsFacade
    {
        private List<string> _addedNonProbableAssemblyNames = new List<string>();
        private object _lock = new object();


        public string ApplicationName
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.ApplicationName;
            }
        }



        public CultureInfo DefaultCultureInfo
        {
            get
            {
                string defaultCultureName = GlobalSettingsProviderPluginFacade.DefaultCultureName;

                return CultureInfo.CreateSpecificCulture(defaultCultureName);
            }
        }



        public string DefaultCultureName
        {
            get
            {
                string defaultCultureName = GlobalSettingsProviderPluginFacade.DefaultCultureName;

                CultureInfo defaultCulture = CultureInfo.CreateSpecificCulture(defaultCultureName);

                return defaultCulture.Name;
            }
        }



        public CultureInfo DefaultLocalizationCultureInfo
        {
            get
            {
                string defaultLocalizationCultureName = GlobalSettingsProviderPluginFacade.DefaultLocalizationCultureName;

                return CultureInfo.CreateSpecificCulture(defaultLocalizationCultureName);
            }
        }



        public string ConfigurationDirectory
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.ConfigurationDirectory;
            }
        }



        public string GeneratedAssembliesDirectory
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.GeneratedAssembliesDirectory;
            }
        }



        public string SerializedWorkflowsDirectory
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.SerializedWorkflowsDirectory;
            }
        }



        public string SerializedConsoleMessagesDirectory
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.SerializedConsoleMessagesDirectory;
            }
        }


        public string AppCodeDirectory
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.AppCodeDirectory;
            }
        }


        public string BinDirectory
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.BinDirectory;
            }
        }



        public string TempDirectory
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.TempDirectory;
            }
        }



        public string PackageDirectory
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.PackageDirectory;
            }
        }



        public string AutoPackageInstallDirectory
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.AutoPackageInstallDirectory;
            }
        }



        public string TreeDefinitionsDirectory
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.TreeDefinitionsDirectory;
            }
        }



        public string DataMetaDataDirectory
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.DataMetaDataDirectory;
            }
        }



        public IResourceCacheSettings ResourceCacheSettings
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.ResourceCacheSettings;
            }
        }


        public IEnumerable<string> NonProbableAssemblyNames
        {
            get
            {
                foreach (string nonProbableAssemblyName in GlobalSettingsProviderPluginFacade.NonProbableAssemblyNames)
                {
                    yield return nonProbableAssemblyName;
                }
                lock (_lock)
                {
                    foreach (string nonProbableAssemblyName in _addedNonProbableAssemblyNames)
                    {
                        yield return nonProbableAssemblyName;
                    }
                }
            }
        }


        public void AddNonProbableAssemblyName(string assemblyNamePatern)
        {
            lock (_lock)
            {
                _addedNonProbableAssemblyNames.Add(assemblyNamePatern);
            }
        }


        public void RemoveNonProbableAssemblyName(string assemblyNamePatern)
        {
            lock (_lock)
            {
                if (_addedNonProbableAssemblyNames.Contains(assemblyNamePatern) == false) throw new InvalidOperationException("The assembly name pattern has not been added");
                _addedNonProbableAssemblyNames.Remove(assemblyNamePatern);
            }
        }


        public IEnumerable<CultureInfo> ApplicationCultures
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.ApplicationCultures;
            }
        }



        public int ConsoleMessageQueueItemSecondToLive
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.ConsoleMessageQueueItemSecondToLive;
            }
        }


        public bool EnableDataTypesAutoUpdate
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.EnableDataTypesAutoUpdate;
            }
        }


        public bool BroadcastConsoleElementChanges 
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.BroadcastConsoleElementChanges;
            }
        }


        public string AutoCreatedAdministratorUserName
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.AutoCreatedAdministratorUserName;
            }
        }



        public TimeSpan WorkflowTimeout
        {
            get 
            {
                return TimeSpan.Parse(GlobalSettingsProviderPluginFacade.WorkflowTimeout); 
            }
        }



        public TimeSpan ConsoleTimeout
        {
            get 
            {
                return TimeSpan.Parse(GlobalSettingsProviderPluginFacade.ConsoleTimeout);
            }
        }

        #region IGlobalSettingsFacade Members


        public ICachingSettings Caching
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.Caching;
            }
        }

        #endregion
    }
}
