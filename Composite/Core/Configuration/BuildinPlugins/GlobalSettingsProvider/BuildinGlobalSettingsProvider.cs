using System.Collections.Generic;
using Composite.Core.Configuration.Plugins.GlobalSettingsProvider;
using System;
using System.Threading;
using System.Globalization;
using System.Linq;


namespace Composite.Core.Configuration.BuildinPlugins.GlobalSettingsProvider
{
    internal sealed class BuildinGlobalSettingsProvider : IGlobalSettingsProvider
    {
        private string _applicationName = "Freja";
        private string _configurationDirectory = "~";
        private string _generatedAssembliesDirectory = "~";
        private string _serializedWorkflowsDirectory = "~";
        private string _appCodeDirectory = "App_Code";
        private string _binDirectory = "~";
        private string _tempDirectory = "~/Temp";
        private string _packageDirectory = "~/Packages";
        private string _autoPackageInstallDirectory = "~/AutoInstallPackages";
        private string _treeDefinitionsDirectory = "~/TreeDefinitions";
        private string _dataMetaDataDirectory = "~/DataMetaData";
        private string _inlineCSharpFunctionDirectory = "~/InlineCSharpFunctions";
        private string _packageLicenseDirectory = "~/PackageLicenses";
        private IResourceCacheSettings _resourceCacheSettings = new BuildinResourceCacheSettings();
        private ICachingSettings _cachingSettings = new BuildinCachingSettings();
        private List<string> _nonProbableAssemblyNames = new List<string>();
        private int _consoleMessageQueueSecondToLive = TimeSpan.FromMinutes(10).Seconds;
        private bool _enableDataTypesAutoUpdate = false;
        private bool _broadcastConsoleElementChanges = true;

        public string ApplicationName
        {
            get { return _applicationName; }
        }



        public string DefaultCultureName
        {
            get { return Thread.CurrentThread.CurrentCulture.Name; }
        }



        public string DefaultLocalizationCultureName
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


        public IEnumerable<CultureInfo> ApplicationCultures
        {
            get
            {
                return CultureInfo.GetCultures(CultureTypes.SpecificCultures).ToList();
            }
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

        public ICachingSettings Caching
        {
            get { return _cachingSettings; }
        }
    }
}
