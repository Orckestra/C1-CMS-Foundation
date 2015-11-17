using System;
using System.Collections.Generic;
using System.Globalization;
using Composite.Core.Configuration.Foundation.PluginFacades;


namespace Composite.Core.Configuration
{
    internal sealed class GlobalSettingsFacadeImpl : IGlobalSettingsFacade
    {
        private readonly List<string> _addedNonProbableAssemblyNames = new List<string>();
        private readonly object _lock = new object();


        public string ApplicationName
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.ApplicationName;
            }
        }

        public string BrandedVersionAssemblySource
        {
            get { return GlobalSettingsProviderPluginFacade.BrandedVersionAssemblySource; }
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



        public string CacheDirectory
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.CacheDirectory;
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


        public string PageTemplateFeaturesDirectory
        {
            get 
            {
                return GlobalSettingsProviderPluginFacade.PageTemplateFeaturesDirectory;
            }
        }



        public string DataMetaDataDirectory
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.DataMetaDataDirectory;
            }
        }



        public string InlineCSharpFunctionDirectory
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.InlineCSharpFunctionDirectory;
            }
        }



        public string PackageLicenseDirectory
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.PackageLicenseDirectory;
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

        public bool OnlyTranslateWhenApproved
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.OnlyTranslateWhenApproved;
            }
        }


        public ICachingSettings Caching
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.Caching;
            }
        }


        public int ImageQuality
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.ImageQuality;
            }
        }

        public bool PrettifyPublicMarkup
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.PrettifyPublicMarkup;
            }
        }

        public bool PrettifyRenderFunctionExceptions
        {
            get
            {
                return GlobalSettingsProviderPluginFacade.PrettifyRenderFunctionExceptions;
            }
        }
    }
}
