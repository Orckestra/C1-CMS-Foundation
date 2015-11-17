using System;
using System.Collections.Generic;
using System.Threading;
using Composite.Core.Configuration.Plugins.GlobalSettingsProvider;


namespace Composite.Core.Configuration.BuildinPlugins.GlobalSettingsProvider
{
    internal sealed class BuildinGlobalSettingsProvider : IGlobalSettingsProvider
    {
        private string _applicationName = "Freja";
        private string _brandedVersionAssemblySource = "Composite";
        private string _configurationDirectory = "~";
        private string _generatedAssembliesDirectory = "~";
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

        public string ApplicationName
        {
            get { return _applicationName; }
        }

        public string BrandedVersionAssemblySource
        {
            get { return _brandedVersionAssemblySource; }
        }


        public string DefaultCultureName
        {
            get { return Thread.CurrentThread.CurrentCulture.Name; }
        }




        public string ConfigurationDirectory
        {
            get
            {
                return string.Format("{0}/{1}", _configurationDirectory, Guid.NewGuid());
            }
        }



        public string GeneratedAssembliesDirectory
        {
            get
            {
                return string.Format("{0}/{1}", _generatedAssembliesDirectory, Guid.NewGuid());
            }
        }



        public string SerializedWorkflowsDirectory
        {
            get
            {
                return string.Format("{0}/{1}", _serializedWorkflowsDirectory, Guid.NewGuid());

            }
        }


        public string AppCodeDirectory
        {
            get
            {
                return _appCodeDirectory;
            }
        }


        public string BinDirectory
        {
            get
            {
                return _binDirectory;
            }
        }



        public string TempDirectory
        {
            get
            {
                return _tempDirectory;
            }
        }



        public string CacheDirectory
        {
            get { return _cacheDirectory; }
        }



        public string PackageDirectory
        {
            get
            {
                return _packageDirectory;
            }
        }



        public string AutoPackageInstallDirectory
        {
            get
            {
                return _autoPackageInstallDirectory;
            }
        }



        public string TreeDefinitionsDirectory
        {
            get
            {
                return _treeDefinitionsDirectory;
            }
        }



        public string PageTemplateFeaturesDirectory
        {
            get
            {
                return _pageTemplateFeaturesDirectory;
            }
        }



        public string DataMetaDataDirectory
        {
            get
            {
                return _dataMetaDataDirectory;
            }
        }


        public string InlineCSharpFunctionDirectory
        {
            get 
            {
                return _inlineCSharpFunctionDirectory;
            }
        }


        public string PackageLicenseDirectory
        {
            get 
            {
                return _packageLicenseDirectory;
            }
        }        


        public IResourceCacheSettings ResourceCacheSettings
        {
            get { return _resourceCacheSettings; }
        }



        public IEnumerable<string> NonProbableAssemblyNames
        {
            get { return _nonProbableAssemblyNames; }
        }



        public int ConsoleMessageQueueItemSecondToLive
        {
            get { return _consoleMessageQueueSecondToLive; }
        }


        public bool EnableDataTypesAutoUpdate
        {
            get { return _enableDataTypesAutoUpdate; }
        }



        public bool BroadcastConsoleElementChanges
        {
            get { return _broadcastConsoleElementChanges; }
        }


        public string AutoCreatedAdministratorUserName
        {
            get { return null; }
        }


        public string SerializedConsoleMessagesDirectory
        {
            get
            {
                return string.Format("{0}/{1}", _serializedWorkflowsDirectory, Guid.NewGuid());
            }
        }


        public string WorkflowTimeout
        {
            get { return "7.00:00:00"; }
        }


        public string ConsoleTimeout
        {
            get { return "00:01:00"; }
        }

        public bool OnlyTranslateWhenApproved { 
            get { return false; } }

        public ICachingSettings Caching
        {
            get { return _cachingSettings; }
        }

        public int ImageQuality
        {
            get
            {
                return 80;
            }
        }

        public bool PrettifyPublicMarkup
        {
            get { return _prettifyPublicMarkup; }
        }

        public bool PrettifyRenderFunctionExceptions
        {
            get { return _prettifyRenderFunctionExceptions; }
        }
    }
}
