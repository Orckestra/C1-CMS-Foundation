using System;
using System.Collections.Generic;
using System.Threading;
using Composite.Core.Configuration.Plugins.GlobalSettingsProvider;


namespace Composite.Core.Configuration.BuildinPlugins.GlobalSettingsProvider
{
    internal sealed class BuildinGlobalSettingsProvider : IGlobalSettingsProvider
    {
        private string _applicationName = "Composite C1";
        private string _applicationShortName = "C1";
        private string _brandedVersionAssemblySource = "Composite";
        private string _configurationDirectory = "~";
        private string _generatedAssembliesDirectory = "~/GeneratedAssemblies";
        private string _serializedWorkflowsDirectory = "~";
        private string _appCodeDirectory = "App_Code";
        private string _binDirectory = "~";
        private string _tempDirectory = "~/Temp";
        private string _cacheDirectory = "~/Cache/Startup";
        private string _packageDirectory = "~/Packages";
        private string _autoPackageInstallDirectory = "~/AutoInstallPackages";
        private string _treeDefinitionsDirectory = "~/TreeDefinitions";
        private string _pageTemplateFeaturesDirectory = "~/PageTemplateFeaturesDirectory";
        private string _dataMetaDataDirectory = "~/DataMetaData";
        private string _inlineCSharpFunctionDirectory = "~/InlineCSharpFunctions";
        private string _packageLicenseDirectory = "~/PackageLicenses";
        private readonly IResourceCacheSettings _resourceCacheSettings = new BuildinResourceCacheSettings();
        private readonly ICachingSettings _cachingSettings = new BuildinCachingSettings();
        private readonly List<string> _nonProbableAssemblyNames = new List<string>();
        private readonly int _consoleMessageQueueSecondToLive = TimeSpan.FromMinutes(10).Seconds;
        private bool _enableDataTypesAutoUpdate = false;
        private bool _broadcastConsoleElementChanges = true;
        private bool _prettifyPublicMarkup = true;
        private bool _prettifyRenderFunctionExceptions = true;
        private bool _functionPreviewEnabled = false;
        private TimeZoneInfo _timezone = TimeZoneInfo.Local;

        public string ApplicationName => _applicationName;

        public string ApplicationShortName => _applicationShortName;

        public string BrandedVersionAssemblySource => _brandedVersionAssemblySource;


        public string DefaultCultureName => Thread.CurrentThread.CurrentCulture.Name;


        public string ConfigurationDirectory
        {
            get
            {
                return string.Format("{0}/{1}", _configurationDirectory, Guid.NewGuid());
            }
        }



        public string GeneratedAssembliesDirectory => _generatedAssembliesDirectory;


        public string SerializedWorkflowsDirectory
        {
            get
            {
                return string.Format("{0}/{1}", _serializedWorkflowsDirectory, Guid.NewGuid());

            }
        }


        public string AppCodeDirectory => _appCodeDirectory;


        public string BinDirectory => _binDirectory;


        public string TempDirectory => _tempDirectory;


        public string CacheDirectory => _cacheDirectory;


        public string PackageDirectory => _packageDirectory;


        public string AutoPackageInstallDirectory => _autoPackageInstallDirectory;


        public string TreeDefinitionsDirectory => _treeDefinitionsDirectory;


        public string PageTemplateFeaturesDirectory => _pageTemplateFeaturesDirectory;


        public string DataMetaDataDirectory => _dataMetaDataDirectory;


        public string InlineCSharpFunctionDirectory => _inlineCSharpFunctionDirectory;


        public string PackageLicenseDirectory => _packageLicenseDirectory;


        public IResourceCacheSettings ResourceCacheSettings => _resourceCacheSettings;


        public IEnumerable<string> NonProbableAssemblyNames => _nonProbableAssemblyNames;


        public int ConsoleMessageQueueItemSecondToLive => _consoleMessageQueueSecondToLive;


        public bool EnableDataTypesAutoUpdate => _enableDataTypesAutoUpdate;


        public bool BroadcastConsoleElementChanges => _broadcastConsoleElementChanges;


        public string AutoCreatedAdministratorUserName => null;


        public string SerializedConsoleMessagesDirectory => $"{_serializedWorkflowsDirectory}/{Guid.NewGuid()}";


        public string WorkflowTimeout => "7.00:00:00";


        public string ConsoleTimeout => "00:01:00";

        public bool OnlyTranslateWhenApproved => false;

        public ICachingSettings Caching => _cachingSettings;

        public int ImageQuality => 80;

        public bool PrettifyPublicMarkup => _prettifyPublicMarkup;

        public bool PrettifyRenderFunctionExceptions => _prettifyRenderFunctionExceptions;

        public bool FunctionPreviewEnabled => _functionPreviewEnabled;

        public TimeZoneInfo TimeZone => _timezone;
    }
}
