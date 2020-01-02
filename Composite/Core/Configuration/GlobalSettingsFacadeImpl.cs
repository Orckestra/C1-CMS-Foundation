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


        public string ApplicationName => GlobalSettingsProviderPluginFacade.ApplicationName;

        public string ApplicationShortName => GlobalSettingsProviderPluginFacade.ApplicationShortName;

        public string BrandedVersionAssemblySource => GlobalSettingsProviderPluginFacade.BrandedVersionAssemblySource;


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

                var defaultCulture = CultureInfo.CreateSpecificCulture(defaultCultureName);

                return defaultCulture.Name;
            }
        }



        public string ConfigurationDirectory => GlobalSettingsProviderPluginFacade.ConfigurationDirectory;


        public string GeneratedAssembliesDirectory => GlobalSettingsProviderPluginFacade.GeneratedAssembliesDirectory;


        public string SerializedWorkflowsDirectory => GlobalSettingsProviderPluginFacade.SerializedWorkflowsDirectory;


        public string SerializedConsoleMessagesDirectory => GlobalSettingsProviderPluginFacade.SerializedConsoleMessagesDirectory;


        public string AppCodeDirectory => GlobalSettingsProviderPluginFacade.AppCodeDirectory;


        public string BinDirectory => GlobalSettingsProviderPluginFacade.BinDirectory;


        public string TempDirectory => GlobalSettingsProviderPluginFacade.TempDirectory;


        public string CacheDirectory => GlobalSettingsProviderPluginFacade.CacheDirectory;


        public string PackageDirectory => GlobalSettingsProviderPluginFacade.PackageDirectory;


        public string AutoPackageInstallDirectory => GlobalSettingsProviderPluginFacade.AutoPackageInstallDirectory;


        public string TreeDefinitionsDirectory => GlobalSettingsProviderPluginFacade.TreeDefinitionsDirectory;


        public string PageTemplateFeaturesDirectory => GlobalSettingsProviderPluginFacade.PageTemplateFeaturesDirectory;


        public string DataMetaDataDirectory => GlobalSettingsProviderPluginFacade.DataMetaDataDirectory;


        public string InlineCSharpFunctionDirectory => GlobalSettingsProviderPluginFacade.InlineCSharpFunctionDirectory;


        public string PackageLicenseDirectory => GlobalSettingsProviderPluginFacade.PackageLicenseDirectory;


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
                if (!_addedNonProbableAssemblyNames.Contains(assemblyNamePatern))
                {
                    throw new InvalidOperationException("The assembly name pattern has not been added");
                }
                _addedNonProbableAssemblyNames.Remove(assemblyNamePatern);
            }
        }


        public int ConsoleMessageQueueItemSecondToLive => GlobalSettingsProviderPluginFacade.ConsoleMessageQueueItemSecondToLive;


        public bool EnableDataTypesAutoUpdate => GlobalSettingsProviderPluginFacade.EnableDataTypesAutoUpdate;


        public bool BroadcastConsoleElementChanges => GlobalSettingsProviderPluginFacade.BroadcastConsoleElementChanges;


        public string AutoCreatedAdministratorUserName => GlobalSettingsProviderPluginFacade.AutoCreatedAdministratorUserName;


        public TimeSpan WorkflowTimeout => TimeSpan.Parse(GlobalSettingsProviderPluginFacade.WorkflowTimeout);


        public TimeSpan ConsoleTimeout => TimeSpan.Parse(GlobalSettingsProviderPluginFacade.ConsoleTimeout);

        public bool OnlyTranslateWhenApproved => GlobalSettingsProviderPluginFacade.OnlyTranslateWhenApproved;


        public ICachingSettings Caching => GlobalSettingsProviderPluginFacade.Caching;


        public int ImageQuality => GlobalSettingsProviderPluginFacade.ImageQuality;

        public bool PrettifyPublicMarkup => GlobalSettingsProviderPluginFacade.PrettifyPublicMarkup;

        public bool PrettifyRenderFunctionExceptions => GlobalSettingsProviderPluginFacade.PrettifyRenderFunctionExceptions;

        public bool FunctionPreviewEnabled => GlobalSettingsProviderPluginFacade.FunctionPreviewEnabled;

        public TimeZoneInfo TimeZone => GlobalSettingsProviderPluginFacade.TimeZone;

        public bool InheritGlobalReadPermissionOnHiddenPerspectives =>
            GlobalSettingsProviderPluginFacade.InheritGlobalReadPermissionOnHiddenPerspectives;
    }
}