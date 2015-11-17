using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.C1Console.Events;
using Composite.Core.Configuration.BuildinPlugins.GlobalSettingsProvider;
using Composite.Core.Configuration.Plugins.GlobalSettingsProvider;
using Composite.Core.Configuration.Plugins.GlobalSettingsProvider.Runtime;


namespace Composite.Core.Configuration.Foundation.PluginFacades
{
    internal sealed class GlobalSettingsProviderPluginFacade
    {
        private static readonly ResourceLocker<Resources> _resourceLocker = 
            new ResourceLocker<Resources>(new Resources(), Resources.Initialize, false);

        static GlobalSettingsProviderPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlush);
        }



        public static string ApplicationName
        {
            get
            {
                return UseReaderLock(provider => provider.ApplicationName);
            }
        }



        public static string BrandedVersionAssemblySource
        {
            get
            {
                return UseReaderLock(provider => provider.BrandedVersionAssemblySource);
            }
        }



        public static string AutoCreatedAdministratorUserName
        {
            get
            {
                return UseReaderLock(provider => provider.AutoCreatedAdministratorUserName);
            }
        }



        public static string DefaultCultureName
        {
            get
            {
                return UseReaderLock(provider => provider.DefaultCultureName);
            }
        }



        public static string ConfigurationDirectory
        {
            get
            {
                return UseReaderLock(provider => provider.ConfigurationDirectory);
            }
        }


        public static string GeneratedAssembliesDirectory
        {
            get
            {
                return UseReaderLock(provider => provider.GeneratedAssembliesDirectory);
            }
        }



        public static string SerializedWorkflowsDirectory
        {
            get
            {
                return UseReaderLock(provider => provider.SerializedWorkflowsDirectory);
            }
        }



        public static string SerializedConsoleMessagesDirectory
        {
            get
            {
                return UseReaderLock(provider => provider.SerializedConsoleMessagesDirectory);
            }
        }


        public static string AppCodeDirectory
        {
            get
            {
                return UseReaderLock(provider => provider.AppCodeDirectory);
            }
        }


        public static string BinDirectory
        {
            get
            {
                return UseReaderLock(provider => provider.BinDirectory);
            }
        }



        public static string TempDirectory
        {
            get
            {
                return UseReaderLock(provider => provider.TempDirectory);
            }
        }
        

        public static string CacheDirectory
        {
            get
            {
                return UseReaderLock(provider => provider.CacheDirectory);
            }
        }


        public static string PackageDirectory
        {
            get
            {
                return UseReaderLock(provider => provider.PackageDirectory);
            }
        }



        public static string AutoPackageInstallDirectory
        {
            get
            {
                return UseReaderLock(provider => provider.AutoPackageInstallDirectory);
            }
        }



        public static string TreeDefinitionsDirectory
        {
            get
            {
                return UseReaderLock(provider => provider.TreeDefinitionsDirectory);
            }
        }



        public static string PageTemplateFeaturesDirectory
        {
            get
            {
                return UseReaderLock(provider => provider.PageTemplateFeaturesDirectory);
            }
        }



        public static string DataMetaDataDirectory
        {
            get
            {
                return UseReaderLock(provider => provider.DataMetaDataDirectory);
            }
        }



        public static string InlineCSharpFunctionDirectory
        {
            get
            {
                return UseReaderLock(provider => provider.InlineCSharpFunctionDirectory);
            }
        }



        public static string PackageLicenseDirectory
        {
            get
            {
                return UseReaderLock(provider => provider.PackageLicenseDirectory);
            }
        }
        


        public static IResourceCacheSettings ResourceCacheSettings
        {
            get
            {
                return UseReaderLock(provider => provider.ResourceCacheSettings);
            }
        }



        public static IEnumerable<string> NonProbableAssemblyNames
        {
            get
            {
                return UseReaderLock(provider => provider.NonProbableAssemblyNames);
            }
        }



        public static int ConsoleMessageQueueItemSecondToLive
        {
            get
            {
                return UseReaderLock(provider => provider.ConsoleMessageQueueItemSecondToLive);
            }
        }



        public static bool EnableDataTypesAutoUpdate
        {
            get
            {
                return UseReaderLock(provider => provider.EnableDataTypesAutoUpdate);
            }
        }


        public static bool BroadcastConsoleElementChanges
        {
            get
            {
                return UseReaderLock(provider => provider.BroadcastConsoleElementChanges);
            }
        }


        public static bool OnlyTranslateWhenApproved
        {
            get
            {
                return UseReaderLock(provider => provider.OnlyTranslateWhenApproved);
            }
        } 
        


        public static string WorkflowTimeout
        {
            get
            {
                return UseReaderLock(provider => provider.WorkflowTimeout);
            }
        }



        public static string ConsoleTimeout
        {
            get
            {
                return UseReaderLock(provider => provider.ConsoleTimeout);
            }
        }

        public static ICachingSettings Caching
        {
            get
            {
                return UseReaderLock(provider => provider.Caching);
            }
        }


        public static int ImageQuality
        {
            get
            {
                return UseReaderLock(provider => provider.ImageQuality);
            }
        }


        public static bool PrettifyPublicMarkup
        {
            get
            {
                return UseReaderLock(provider => provider.PrettifyPublicMarkup);
            }
        }


        public static bool PrettifyRenderFunctionExceptions
        {
            get
            {
                return UseReaderLock(provider => provider.PrettifyRenderFunctionExceptions);
            }
        }


        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }



        private static void OnFlush(FlushEventArgs args)
        {
            Flush();
        }



        private static void HandleConfigurationError(Exception ex)
        {
            Flush();

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", GlobalSettingsProviderSettings.SectionName), ex);
        }

        private delegate T ExecuteDelegate<T>(IGlobalSettingsProvider provider);
        private static T UseReaderLock<T>(ExecuteDelegate<T> function)
        {
            using (_resourceLocker.ReadLocker)
            {
                return function(_resourceLocker.Resources.Provider);
            }
        }


        private sealed class Resources
        {
            public GlobalSettingsProviderFactory Factory { get; set; }
            public IGlobalSettingsProvider Provider { get; set; }

            public static void Initialize(Resources resources)
            {
                if ((RuntimeInformation.IsDebugBuild) &&
                            ((ConfigurationServices.ConfigurationSource == null) ||
                             (ConfigurationServices.ConfigurationSource.GetSection(GlobalSettingsProviderSettings.SectionName) == null)))
                {
                    resources.Provider = new BuildinGlobalSettingsProvider();
                }
                else
                {
                    try
                    {
                        resources.Factory = new GlobalSettingsProviderFactory();
                        resources.Provider = resources.Factory.CreateDefault();
                    }
                    catch (ArgumentException ex)
                    {
                        HandleConfigurationError(ex);
                    }
                    catch (ConfigurationErrorsException ex)
                    {
                        HandleConfigurationError(ex);
                    }
                }
            }
        }
    }
}
