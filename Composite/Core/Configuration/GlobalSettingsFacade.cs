using System;
using System.Linq;
using System.Collections.Generic;
using System.Globalization;
using Composite.Core.ResourceSystem;


namespace Composite.Core.Configuration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class CachingSettings
    {
        /// <exclude />
        public const int DefaultCacheSize = -1;

        /// <exclude />
        public const int NoCacheSize = 0;


        internal CachingSettings(bool enabled, int size)
        {
            this.Enabled = enabled;
            this.Size = size;
        }


        /// <exclude />
        public bool Enabled { get; private set; }


        /// <summary>
        /// One of three values:
        /// NoCacheSize: The caller should use not use caching
        /// DefaultCacheSize: The caller should use its own default size
        /// All other values (> 0): The caller should use this size
        /// See <see cref="GetSize"/>
        /// </summary>
        public int Size { get; private set; }        


        /// <summary>
        /// Returns the configured size or if the configured size is default size, then it uses
        /// the <paramref name="defaultSize"/> value.
        /// </summary>
        /// <param name="defaultSize"></param>
        /// <returns></returns>
        public int GetSize(int defaultSize)
        {
            if (this.Size == DefaultCacheSize) return defaultSize;

            return this.Size;
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class GlobalSettingsFacade
    {
        private static IGlobalSettingsFacade _globalSettingsFacade = new GlobalSettingsFacadeImpl();


        internal static IGlobalSettingsFacade Implementation { get { return _globalSettingsFacade; } set { _globalSettingsFacade = value; } }


        /// <summary>
        /// The name of the application to be displayed in the UI.
        /// </summary>
        public static string ApplicationName
        {
            get
            {
                return _globalSettingsFacade.ApplicationName;
            }
        }

        /// <summary>
        /// The short name of the application to be displayed in the UI.
        /// </summary>
        public static string ApplicationShortName
        {
            get
            {
                return _globalSettingsFacade.ApplicationShortName;
            }
        }

        /// <summary>
        /// Name of an assembly file, which version should displayed as a product version in UI.
        /// </summary>
        public static string BrandedVersionAssemblySource => _globalSettingsFacade.BrandedVersionAssemblySource;


        /// <exclude />
        public static CultureInfo DefaultCultureInfo
        {
            get
            {
                return _globalSettingsFacade.DefaultCultureInfo;
            }
        }



        /// <exclude />
        public static string DefaultCultureName
        {
            get
            {
                return _globalSettingsFacade.DefaultCultureName;
            }
        }



        /// <exclude />
        public static string ConfigurationDirectory
        {
            get
            {
                return _globalSettingsFacade.ConfigurationDirectory;
            }
        }



        /// <exclude />
        public static string GeneratedAssembliesDirectory
        {
            get
            {
                return _globalSettingsFacade.GeneratedAssembliesDirectory;
            }
        }



        /// <exclude />
        public static string SerializedWorkflowsDirectory
        {
            get
            {
                return _globalSettingsFacade.SerializedWorkflowsDirectory;
            }
        }



        /// <exclude />
        public static string SerializedConsoleMessagesDirectory
        {
            get
            {
                return _globalSettingsFacade.SerializedConsoleMessagesDirectory;
            }
        }



        /// <exclude />
        public static string AppCodeDirectory
        {
            get
            {
                return _globalSettingsFacade.AppCodeDirectory;
            }
        }



        /// <exclude />
        public static string BinDirectory
        {
            get
            {
                return _globalSettingsFacade.BinDirectory;
            }
        }



        /// <exclude />
        public static string TempDirectory
        {
            get
            {
                return _globalSettingsFacade.TempDirectory;
            }
        }


        /// <exclude />
        public static string CacheDirectory
        {
            get
            {
                return _globalSettingsFacade.CacheDirectory;
            }
        }


        /// <exclude />
        public static string PackageDirectory
        {
            get
            {
                return _globalSettingsFacade.PackageDirectory;
            }
        }



        /// <exclude />
        public static string AutoPackageInstallDirectory
        {
            get
            {
                return _globalSettingsFacade.AutoPackageInstallDirectory;
            }
        }



        /// <exclude />
        public static string TreeDefinitionsDirectory
        {
            get
            {
                return _globalSettingsFacade.TreeDefinitionsDirectory;
            }
        }



        /// <exclude />
        public static string PageTemplateFeaturesDirectory
        {
            get
            {
                return _globalSettingsFacade.PageTemplateFeaturesDirectory;
            }
        }



        /// <exclude />
        public static string DataMetaDataDirectory
        {
            get
            {
                return _globalSettingsFacade.DataMetaDataDirectory;
            }
        }



        /// <exclude />
        public static string InlineCSharpFunctionDirectory
        {
            get
            {
                return _globalSettingsFacade.InlineCSharpFunctionDirectory;
            }
        }



        /// <exclude />
        public static string PackageLicenseDirectory
        {
            get
            {
                return _globalSettingsFacade.PackageLicenseDirectory;
            }
        }



        /// <exclude />
        public static IResourceCacheSettings ResourceCacheSettings
        {
            get
            {
                return _globalSettingsFacade.ResourceCacheSettings;
            }
        }



        /// <exclude />
        public static IEnumerable<string> NonProbableAssemblyNames
        {
            get
            {
                return _globalSettingsFacade.NonProbableAssemblyNames;
            }
        }



        /// <exclude />
        public static void AddNonProbableAssemblyName(string assemblyNamePatern)
        {
            _globalSettingsFacade.AddNonProbableAssemblyName(assemblyNamePatern);
        }



        /// <exclude />
        public static void RemoveNonProbableAssemblyName(string assemblyNamePatern)
        {
            _globalSettingsFacade.RemoveNonProbableAssemblyName(assemblyNamePatern);
        }



        /// <exclude />
        public static int ConsoleMessageQueueItemSecondToLive
        {
            get
            {
                return _globalSettingsFacade.ConsoleMessageQueueItemSecondToLive;
            }
        }



        /// <exclude />
        public static bool EnableDataTypesAutoUpdate
        {
            get
            {
                return _globalSettingsFacade.EnableDataTypesAutoUpdate;
            }
        }



        /// <exclude />
        public static bool BroadcastConsoleElementChanges
        {
            get
            {
                return _globalSettingsFacade.BroadcastConsoleElementChanges;
            }
        }



        /// <exclude />
        public static string AutoCreatedAdministratorUserName
        {
            get
            {
                return _globalSettingsFacade.AutoCreatedAdministratorUserName;
            }
        }



        /// <exclude />
        public static TimeSpan WorkflowTimeout
        {
            get
            {
                return _globalSettingsFacade.WorkflowTimeout;
            }
        }



        /// <exclude />
        public static TimeSpan ConsoleTimeout
        {
            get
            {
                return _globalSettingsFacade.ConsoleTimeout;
            }
        }



        /// <exclude />
        public static TimeSpan DefaultReaderLockWaitTimeout
        {
            get
            {
                return TimeSpan.FromMinutes(5);
            }
        }


        /// <exclude />
        public static TimeSpan DefaultWriterLockWaitTimeout
        {
            get
            {
                return TimeSpan.FromMinutes(5);
            }
        }



        /// <exclude />
        public static ICachingSettings Caching
        {
            get
            {
                return _globalSettingsFacade.Caching;
            }
        }



        /// <exclude />
        public static int ImageQuality
        {
            get
            {
                return _globalSettingsFacade.ImageQuality;
            }
        }

        /// <summary>
        /// When <value>true</value> only pages that are published or awaiting publication can be translated in console.
        /// </summary>
        public static bool OnlyTranslateWhenApproved
        {
            get
            {
                return _globalSettingsFacade.OnlyTranslateWhenApproved;
            }
        }

        /// <summary>
        /// The maximum number of characters the path to the application root (like 'C:\InetPub\MySite') can contain.
        /// C1 CMS create files below this path, some of which have very long paths - if the root path is long enough the combined length
        /// can exceed a limitation in Microsoft Windows - see http://msdn.microsoft.com/en-us/library/aa365247%28VS.85%29.aspx#paths
        /// </summary>
        public static int MaximumRootPathLength
        {
            get
            {
                return 90;
            }
        }

        /// <summary>
        /// When <value>true</value> the output XHTML markup  will be formatted. 
        /// </summary>
        public static bool PrettifyPublicMarkup
        {
            get
            {
                return _globalSettingsFacade.PrettifyPublicMarkup;
            }
        }

        /// <summary>
        /// When true exceptions thrown by C1 Functions during a page rendering will be prettified - ensuring the rest of the page render okay.
        /// For unauthenticated requests this will become "error", while authenticated users get error info.
        /// </summary>
        public static bool PrettifyRenderFunctionExceptions
        {
            get
            {
                return _globalSettingsFacade.PrettifyRenderFunctionExceptions;
            }
        }

        /// <exclude />
        public static bool FunctionPreviewEnabled => _globalSettingsFacade.FunctionPreviewEnabled;

        /// <exclude />
        public static TimeZoneInfo TimeZone => _globalSettingsFacade.TimeZone;

        // Overload
        /// <exclude />
        public static CachingSettings GetNamedCaching(string name)
        {
            ICacheSettings cacheSettings = Caching.Caches.FirstOrDefault(f => f.Name == name);

            bool enabled = Caching.Enabled;
            int size = CachingSettings.DefaultCacheSize;
            if ((enabled) && (cacheSettings != null))
            {
                enabled = cacheSettings.Enabled && cacheSettings.Size != CachingSettings.NoCacheSize;
                size = cacheSettings.Size;
            }

            CachingSettings cachingSettings = new CachingSettings(enabled, size);

            return cachingSettings;
        }
    }
}
