using System;
using System.Collections.Generic;
using System.Configuration;

using Composite.Core.Configuration;
using Composite.Core.Configuration.Plugins.GlobalSettingsProvider;
using Composite.Core.Extensions;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.GlobalSettings.GlobalSettingsProviders
{    
    [ConfigurationElementType(typeof(ConfigBasedGlobalSettingsProviderData))]
    internal sealed class ConfigBasedGlobalSettingsProvider : IGlobalSettingsProvider
    {
        private readonly ConfigBasedGlobalSettingsProviderData _configurationData;
        private readonly ICachingSettings _cachingSettings;
        private readonly List<string> _nonProbeableAssemblyNames;

        public ConfigBasedGlobalSettingsProvider(ConfigBasedGlobalSettingsProviderData configurationData)
        {
            _configurationData = configurationData;
            _cachingSettings = new ConfigCachingSettings(configurationData.Caching);

            string cleannonProbeString = _configurationData.NonProbeableAssemblyNames.Replace(" ", "");
            _nonProbeableAssemblyNames = new List<string>(cleannonProbeString.Split(','));
        }


        public string AppCodeDirectory
        {
            get { return _configurationData.AppCodeDirectory; }
        }


        public string ApplicationName
        {
            get { return _configurationData.ApplicationName; }
        }


        public string ApplicationShortName
        {
            get { return _configurationData.ApplicationShortName; }
        }


        public string BrandedVersionAssemblySource
        {
            get { return _configurationData.BrandedVersionAssemblySource; }
        }


        public string DefaultCultureName
        {
            get { return _configurationData.DefaultCultureName; }
        }



        public string ConfigurationDirectory
        {
            get { return _configurationData.ConfigurationDirectory; }
        }



        public string GeneratedAssembliesDirectory
        {
            get { return _configurationData.GeneratedAssembliesDirectory; }
        }



        public string SerializedWorkflowsDirectory
        {
            get { return _configurationData.SerializedWorkflowsDirectory; }
        }



        public string SerializedConsoleMessagesDirectory
        {
            get { return _configurationData.SerializedConsoleMessagesDirectory; }
        }



        public string BinDirectory
        {
            get { return _configurationData.BinDirectory; }
        }



        public string TempDirectory
        {
            get { return _configurationData.TempDirectory; }
        }


        public string CacheDirectory
        {
            get { return _configurationData.CacheDirectory; }
        }
        

        public string PackageDirectory
        {
            get { return _configurationData.PackageDirectory; }
        }



        public string AutoPackageInstallDirectory
        {
            get { return _configurationData.AutoPackageInstallDirectory; }
        }



        public string TreeDefinitionsDirectory
        {
            get { return _configurationData.TreeDefinitionsDirectory; }
        }



        public string PageTemplateFeaturesDirectory
        {
            get { return _configurationData.PageTemplateFeaturesDirectory; }
        }

        

        public string DataMetaDataDirectory
        {
            get { return _configurationData.DataMetaDataDirectory; }
        }


        public string InlineCSharpFunctionDirectory
        {
            get { return _configurationData.InlineCSharpFunctionDirectory; }
        }


        public string PackageLicenseDirectory
        {
            get { return _configurationData.PackageLicenseDirectory; }
        }
        

        public IResourceCacheSettings ResourceCacheSettings
        {
            get
            {
                return new ConfigResourceCacheSettings(_configurationData.ResourceCacheDirectory, _configurationData.ServerCacheMinutes, _configurationData.ClientCacheMinutes);
            }
        }

        public IEnumerable<string> NonProbableAssemblyNames
        {
            get { return _nonProbeableAssemblyNames; }
        }



        public int ConsoleMessageQueueItemSecondToLive
        {
            get { return _configurationData.ConsoleMessageQueueItemSecondToLive; }
        }


        public bool EnableDataTypesAutoUpdate
        {
            get { return _configurationData.EnableDataTypesAutoUpdate; }
        }


        public bool BroadcastConsoleElementChanges
        {
            get { return _configurationData.BroadcastConsoleElementChanges; }
        }


        public string AutoCreatedAdministratorUserName
        {
            get { return _configurationData.AutoCreatedAdministratorUserName; }
        }


        public bool OnlyTranslateWhenApproved
        {
            get { return _configurationData.OnlyTranslateWhenApproved; }
        }


        public string WorkflowTimeout
        {
            get { return _configurationData.WorkflowTimeout; }
        }



        public string ConsoleTimeout
        {
            get { return _configurationData.ConsoleTimeout; }
        }

        public ICachingSettings Caching
        {
            get { return _cachingSettings; }
        }

        public int ImageQuality
        {
            get
            {
                return _configurationData.ImageQuality;
            }
        }

        public bool PrettifyPublicMarkup
        {
            get
            {
                return _configurationData.PrettifyPublicMarkup;
            }
        }
        
        public bool PrettifyRenderFunctionExceptions
        {
            get
            {
                return _configurationData.PrettifyRenderFunctionExceptions;
            }
        }

        public bool FunctionPreviewEnabled => _configurationData.FunctionPreviewEnabled;

        public TimeZoneInfo TimeZone => TimeZoneInfo.FindSystemTimeZoneById(_configurationData.TimeZone.IsNullOrEmpty()?TimeZoneInfo.Local.Id: _configurationData.TimeZone);
    }

    internal class ConfigCachingSettings: ICachingSettings
    {
        private readonly CachingConfigurationElement _data;

        public ConfigCachingSettings(CachingConfigurationElement data)
        {
            _data = data;
        }

        public bool Enabled
        {
            get { return _data.Enabled; }
        }

        public IEnumerable<ICacheSettings> Caches
        {
            get
            {
                foreach(var element in _data)
                {
                    yield return new ConfigCacheSettings(element as CacheSettingsElement);
                }
            }
        }
    }

    
    
    internal class ConfigCacheSettings: ICacheSettings
    {
        public ConfigCacheSettings(CacheSettingsElement data)
        {
            Name = data.Name;
            Enabled = data.Enabled;           
            Size = data.Size;
        }

        public string Name { get; private set; }
        public bool Enabled { get; private set; }
        public int Size { get; private set; }
    }




    internal class ConfigResourceCacheSettings : IResourceCacheSettings
    {
        private readonly string _resourceCacheDirectory;
        private readonly int _serverChacheMinutes;
        private readonly int _clientCacheMinutes;

        internal ConfigResourceCacheSettings(string resourceCacheDirectory, int serverCacheMinutes, int clientCacheMinutes)
        {
            _resourceCacheDirectory = resourceCacheDirectory;
            _serverChacheMinutes = serverCacheMinutes;
            _clientCacheMinutes = clientCacheMinutes;
        }

        public string ResourceCacheDirectory
        {
            get { return _resourceCacheDirectory; }
            set { throw new NotSupportedException(GetType().ToString()); }
        }

        public int ServerCacheMinutes
        {
            get { return _serverChacheMinutes; }
            set { throw new NotSupportedException(GetType().ToString()); }
        }

        public int ClientCacheMinutes
        {
            get { return _clientCacheMinutes; }
            set { throw new NotSupportedException(GetType().ToString()); }
        }
    }




    internal sealed class ConfigBasedGlobalSettingsProviderAssembler : IAssembler<IGlobalSettingsProvider, GlobalSettingsProviderData>
    {
        public IGlobalSettingsProvider Assemble(IBuilderContext context, GlobalSettingsProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new ConfigBasedGlobalSettingsProvider((ConfigBasedGlobalSettingsProviderData)objectConfiguration);
        }
    }




    [Assembler(typeof(ConfigBasedGlobalSettingsProviderAssembler))]
    internal sealed class ConfigBasedGlobalSettingsProviderData : GlobalSettingsProviderData
    {
        private const string _applicationNamePropertyName = "applicationName";
        [ConfigurationProperty(_applicationNamePropertyName, IsRequired = true, DefaultValue = "Composite C1")]
        public string ApplicationName
        {
            get { return (string)base[_applicationNamePropertyName]; }
            set { base[_applicationNamePropertyName] = value; }
        }

        private const string _applicationShortNamePropertyName = "applicationShortName";
        [ConfigurationProperty(_applicationShortNamePropertyName, IsRequired = true, DefaultValue = "C1")]
        public string ApplicationShortName
        {
            get { return (string)base[_applicationShortNamePropertyName]; }
            set { base[_applicationShortNamePropertyName] = value; }
        }

        private const string _brandedVersionAssemblySourcePropertyName = "brandedVersionAssemblySource";
        [ConfigurationProperty(_brandedVersionAssemblySourcePropertyName, IsRequired = false, DefaultValue = "Composite")]
        public string BrandedVersionAssemblySource
        {
            get { return (string)base[_brandedVersionAssemblySourcePropertyName]; }
            set { base[_brandedVersionAssemblySourcePropertyName] = value; }
        }
        


        private const string _defaultCultureNamePropertyName = "defaultCultureName";
        [ConfigurationProperty(_defaultCultureNamePropertyName, DefaultValue = "en-US")]
        public string DefaultCultureName
        {
            get { return (string)base[_defaultCultureNamePropertyName]; }
            set { base[_defaultCultureNamePropertyName] = value; }
        }


        private const string _configurationDirectoryPropertyName = "customConfigurationDirectory";
        [ConfigurationProperty(_configurationDirectoryPropertyName, DefaultValue = "~")]
        public string ConfigurationDirectory
        {
            get { return (string)base[_configurationDirectoryPropertyName]; }
            set { base[_configurationDirectoryPropertyName] = value; }
        }


        private const string _generatedAssembliesDirectoryPropertyName = "generatedAssembliesDirectory";
        [ConfigurationProperty(_generatedAssembliesDirectoryPropertyName, DefaultValue = "~")]
        public string GeneratedAssembliesDirectory
        {
            get { return (string)base[_generatedAssembliesDirectoryPropertyName]; }
            set { base[_generatedAssembliesDirectoryPropertyName] = value; }
        }


        private const string _serializedWorkflowsDirectoryPropertyName = "serializedWorkflowsDirectory";
        [ConfigurationProperty(_serializedWorkflowsDirectoryPropertyName, DefaultValue = "~")]
        public string SerializedWorkflowsDirectory
        {
            get { return (string)base[_serializedWorkflowsDirectoryPropertyName]; }
            set { base[_serializedWorkflowsDirectoryPropertyName] = value; }
        }



        private const string _serializedConsoleMessagesDirectoryPropertyName = "serializedConsoleMessagesDirectory";
        [ConfigurationProperty(_serializedConsoleMessagesDirectoryPropertyName, DefaultValue = "~")]
        public string SerializedConsoleMessagesDirectory
        {
            get { return (string)base[_serializedConsoleMessagesDirectoryPropertyName]; }
            set { base[_serializedConsoleMessagesDirectoryPropertyName] = value; }
        }





        private const string _appCodeDirectoryPropertyName = "appCodeDirectory";
        [ConfigurationProperty(_appCodeDirectoryPropertyName, DefaultValue = "App_Code")]
        public string AppCodeDirectory
        {
            get { return (string)base[_appCodeDirectoryPropertyName]; }
            set { base[_appCodeDirectoryPropertyName] = value; }
        }


        private const string _binDirectoryPropertyName = "binDirectory";
        [ConfigurationProperty(_binDirectoryPropertyName, DefaultValue = "~")]
        public string BinDirectory
        {
            get { return (string)base[_binDirectoryPropertyName]; }
            set { base[_binDirectoryPropertyName] = value; }
        }



        private const string _tempDirectoryPropertyName = "tempDirectory";
        [ConfigurationProperty(_tempDirectoryPropertyName, DefaultValue = "~")]
        public string TempDirectory
        {
            get { return (string)base[_tempDirectoryPropertyName]; }
            set { base[_tempDirectoryPropertyName] = value; }
        }
        
        private const string _cacheDirectoryPropertyName = "cacheDirectory";
        [ConfigurationProperty(_cacheDirectoryPropertyName, DefaultValue = "~/App_Data/Composite/Cache")]
        public string CacheDirectory
        {
            get { return (string)base[_cacheDirectoryPropertyName]; }
            set { base[_cacheDirectoryPropertyName] = value; }
        }

        private const string _packageDirectoryPropertyName = "packageDirectory";
        [ConfigurationProperty(_packageDirectoryPropertyName, DefaultValue = "~")]
        public string PackageDirectory
        {
            get { return (string)base[_packageDirectoryPropertyName]; }
            set { base[_packageDirectoryPropertyName] = value; }
        }



        private const string _autoPackageInstallDirectoryPropertyName = "autoPackageInstallDirectory";
        [ConfigurationProperty(_autoPackageInstallDirectoryPropertyName, DefaultValue = "~")]
        public string AutoPackageInstallDirectory
        {
            get { return (string)base[_autoPackageInstallDirectoryPropertyName]; }
            set { base[_autoPackageInstallDirectoryPropertyName] = value; }
        }



        private const string _treeDefinitionsDirectoryPropertyName = "treeDefinitionsDirectory";
        [ConfigurationProperty(_treeDefinitionsDirectoryPropertyName, DefaultValue = "~")]
        public string TreeDefinitionsDirectory
        {
            get { return (string)base[_treeDefinitionsDirectoryPropertyName]; }
            set { base[_treeDefinitionsDirectoryPropertyName] = value; }
        }



        private const string _pageTemplateFeaturesDirectoryPropertyName = "pageTemplateFeaturesDirectory";
        [ConfigurationProperty(_pageTemplateFeaturesDirectoryPropertyName, DefaultValue = "~")]
        public string PageTemplateFeaturesDirectory
        {
            get { return (string)base[_pageTemplateFeaturesDirectoryPropertyName]; }
            set { base[_pageTemplateFeaturesDirectoryPropertyName] = value; }
        }



        private const string _dataMetaDataDirectoryPropertyName = "dataMetaDataDirectory";
        [ConfigurationProperty(_dataMetaDataDirectoryPropertyName, DefaultValue = "~")]
        public string DataMetaDataDirectory
        {
            get { return (string)base[_dataMetaDataDirectoryPropertyName]; }
            set { base[_dataMetaDataDirectoryPropertyName] = value; }
        }



        private const string _inlineCSharpFunctionDirectoryPropertyName = "inlineCSharpFunctionDirectory";
        [ConfigurationProperty(_inlineCSharpFunctionDirectoryPropertyName, DefaultValue = "~")]
        public string InlineCSharpFunctionDirectory
        {
            get { return (string)base[_inlineCSharpFunctionDirectoryPropertyName]; }
            set { base[_inlineCSharpFunctionDirectoryPropertyName] = value; }
        }



        private const string _packageLicenseDirectoryPropertyName = "packageLicenseDirectory";
        [ConfigurationProperty(_packageLicenseDirectoryPropertyName, DefaultValue = "~")]
        public string PackageLicenseDirectory
        {
            get { return (string)base[_packageLicenseDirectoryPropertyName]; }
            set { base[_packageLicenseDirectoryPropertyName] = value; }
        }
        

        private const int A_DAY_IN_MINUTES = 24*60;
        private const int A_WEEK_IN_MINUTES = 7*24*60;


        private const string _resourceCacheDirectory = "resourceCacheDirectory";
        [ConfigurationProperty(_resourceCacheDirectory, IsRequired = true)]
        public string ResourceCacheDirectory
        {
            get { return (string)base[_resourceCacheDirectory]; }
            set { base[_resourceCacheDirectory] = value; }
        }



        private const string _clientCacheMinutesProperty = "clientCacheMinutes";
        public static readonly int DefaultClientCacheMinutes = A_WEEK_IN_MINUTES;
        [ConfigurationProperty(_clientCacheMinutesProperty, IsRequired = false, DefaultValue = A_WEEK_IN_MINUTES)]
        public int ClientCacheMinutes
        {
            get { return (int)base[_clientCacheMinutesProperty]; }
            set { base[_clientCacheMinutesProperty] = value; }
        }



        private const string _serverCacheMinutesProperty = "serverCacheMinutes";
        public static readonly int DefaultServerCacheMinutes = A_DAY_IN_MINUTES;
        [ConfigurationProperty(_serverCacheMinutesProperty, IsRequired = false, DefaultValue = A_DAY_IN_MINUTES)]
        public int ServerCacheMinutes
        {
            get { return (int)base[_serverCacheMinutesProperty]; }
            set { base[_serverCacheMinutesProperty] = value; }
        }



        private const string _nonProbeableAssemblyNames = "nonProbeableAssemblyNames";
        [ConfigurationProperty(_nonProbeableAssemblyNames, IsRequired = false, DefaultValue = "")]
        public string NonProbeableAssemblyNames
        {
            get { return (string)base[_nonProbeableAssemblyNames]; }
            set { base[_nonProbeableAssemblyNames] = value; }
        }


        private const string _onlyTranslateWhenApproved = "onlyTranslateWhenApproved";
        [ConfigurationProperty(_onlyTranslateWhenApproved, IsRequired = false, DefaultValue = false)]
        public bool OnlyTranslateWhenApproved
        {
            get { return (bool)base[_onlyTranslateWhenApproved]; }
            set { base[_onlyTranslateWhenApproved] = value; }
        }


        private const string _applicationCultureNames = "applicationCultureNames";
        [ConfigurationProperty(_applicationCultureNames, IsRequired = false, DefaultValue = "da-DK,en-US")]
        [Obsolete("Preserved for compatibility with old language packages (versions older than C1 4.0)")]
        public string ApplicationCultureNames
        {
            get { return (string)base[_applicationCultureNames]; }
            set { base[_applicationCultureNames] = value; }
        }



        private const string _consoleMessageQueueItemSecondToLiveProperty = "consoleMessageQueueItemSecondToLive";
        public static readonly int DefaultConsoleMessageQueueItemSecondToLive = 600;
        [ConfigurationProperty(_consoleMessageQueueItemSecondToLiveProperty, IsRequired = false, DefaultValue = 600)]
        public int ConsoleMessageQueueItemSecondToLive
        {
            get { return (int)base[_consoleMessageQueueItemSecondToLiveProperty]; }
            set { base[_consoleMessageQueueItemSecondToLiveProperty] = value; }
        }


        private const string _enableDataTypesAutoUdpatePropertyName = "enableDataTypesAutoUpdate";
        [ConfigurationProperty(_enableDataTypesAutoUdpatePropertyName, DefaultValue = true)]
        public bool EnableDataTypesAutoUpdate
        {
            get { return (bool)base[_enableDataTypesAutoUdpatePropertyName]; }
            set { base[_enableDataTypesAutoUdpatePropertyName] = value; }
        }


        private const string _broadcastConsoleElementChangesPropertyName = "broadcastConsoleElementChanges";
        [ConfigurationProperty(_broadcastConsoleElementChangesPropertyName, DefaultValue = true)]
        public bool BroadcastConsoleElementChanges
        {
            get { return (bool)base[_broadcastConsoleElementChangesPropertyName]; }
            set { base[_broadcastConsoleElementChangesPropertyName] = value; }
        }
        


        private const string _autoCreatedAdministratorUserNamePropertyName = "autoCreatedAdministratorUserName";
        [ConfigurationProperty(_autoCreatedAdministratorUserNamePropertyName, DefaultValue = "")]
        public string AutoCreatedAdministratorUserName
        {
            get { return (string)base[_autoCreatedAdministratorUserNamePropertyName]; }
            set { base[_autoCreatedAdministratorUserNamePropertyName] = value; }
        }


        private const string _workflowTimeoutPropertyName = "workflowTimeout";
        [ConfigurationProperty(_workflowTimeoutPropertyName, DefaultValue = "7.00:00:00")]
        public string WorkflowTimeout
        {
            get { return (string)base[_workflowTimeoutPropertyName]; }
            set { base[_workflowTimeoutPropertyName] = value; }
        }


        private const string _consoleTimeoutPropertyName = "consoleTimeout";
        [ConfigurationProperty(_consoleTimeoutPropertyName, DefaultValue = "00:05:00")]
        public string ConsoleTimeout
        {
            get { return (string)base[_consoleTimeoutPropertyName]; }
            set { base[_consoleTimeoutPropertyName] = value; }
        }


        private const string _cachingElementName = "Caching";
        [ConfigurationProperty(_cachingElementName)]
        public CachingConfigurationElement Caching
        {
            get { return (CachingConfigurationElement)base[_cachingElementName]; }
            set { base[_cachingElementName] = value; }
        }


        private const string _imageQualityPropertyName = "imageQuality";
        [ConfigurationProperty(_imageQualityPropertyName, DefaultValue = 80)]
        public int ImageQuality
        {
            get { return (int)base[_imageQualityPropertyName]; }
            set { base[_imageQualityPropertyName] = value; }
        }

                
        private const string _prettifyPublicMarkupPropertyName = "prettifyPublicMarkup";
        [ConfigurationProperty(_prettifyPublicMarkupPropertyName, DefaultValue = true)]
        public bool PrettifyPublicMarkup
        {
            get { return (bool)base[_prettifyPublicMarkupPropertyName]; }
            set { base[_prettifyPublicMarkupPropertyName] = value; }
        }


        private const string _prettifyRenderFunctionExceptionsPropertyName = "prettifyRenderFunctionExceptions";
        [ConfigurationProperty(_prettifyRenderFunctionExceptionsPropertyName, DefaultValue = true)]
        public bool PrettifyRenderFunctionExceptions
        {
            get { return (bool)base[_prettifyRenderFunctionExceptionsPropertyName]; }
            set { base[_prettifyRenderFunctionExceptionsPropertyName] = value; }
        }

        private const string _functionPreviewEnabledPropertyName = "functionPreviewEnabled";
        [ConfigurationProperty(_functionPreviewEnabledPropertyName, DefaultValue = true)]
        public bool FunctionPreviewEnabled
        {
            get { return (bool)base[_functionPreviewEnabledPropertyName]; }
            set { base[_functionPreviewEnabledPropertyName] = value; }
        }

        private const string TimeZonePropertyName = "timezone";
        [ConfigurationProperty(TimeZonePropertyName, DefaultValue = null)]
        public string TimeZone {
            get
            {
                return (string)base[TimeZonePropertyName]; 
            }
            set { base[TimeZonePropertyName] = value; }
        }
    }


    internal sealed class CachingConfigurationElement : ConfigurationElementCollection
    {
        private const string _enabledPropertyName = "enabled";
        [ConfigurationProperty(_enabledPropertyName, DefaultValue = "true")]
        public bool Enabled
        {
            get { return (bool)base[_enabledPropertyName]; }
            set { base[_enabledPropertyName] = value; }
        }

        protected override ConfigurationElement CreateNewElement()
        {
            return new CacheSettingsElement();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            var cacheSettings = (CacheSettingsElement)element;
            return cacheSettings.Name;
        }
    }

    internal sealed class CacheSettingsElement: ConfigurationElement
    {
        private const string _namePropertyName = "name";
        [ConfigurationProperty(_namePropertyName)]
        public string Name
        {
            get { return (string)base[_namePropertyName]; }
            set { base[_namePropertyName] = value; }
        }

        private const string _sizePropertyName = "size";
        [ConfigurationProperty(_sizePropertyName, DefaultValue = "1000")]
        public int Size
        {
            get { return (int)base[_sizePropertyName]; }
            set { base[_sizePropertyName] = value; }
        }

        private const string _enabledPropertyName = "enabled";
        [ConfigurationProperty(_enabledPropertyName, DefaultValue = "true")]
        public bool Enabled
        {
            get { return (bool)base[_enabledPropertyName]; }
            set { base[_enabledPropertyName] = value; }
        }
    }
}



