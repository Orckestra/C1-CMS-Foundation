using System;
using System.Linq;
using System.Collections.Generic;
using System.Globalization;


namespace Composite.Core.Configuration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class CachingSettings
    {
        public const int DefaultCacheSize = -1;
        public const int NoCacheSize = 0;


        internal CachingSettings(bool enabled, int size)
        {
            this.Enabled = enabled;
            this.Size = size;
        }


        public bool Enabled { get; private set; }


        /// <summary>
        /// One of three values:
        /// NoCacheSize: The caller should use not use caching
        /// DefaultCacheSize: The caller should use its own default size
        /// All other values (> 0): The caller should use this sizee
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


        public static string ApplicationName
        {
            get
            {
                return _globalSettingsFacade.ApplicationName;
            }
        }



        public static CultureInfo DefaultCultureInfo
        {
            get
            {
                return _globalSettingsFacade.DefaultCultureInfo;
            }
        }



        public static string DefaultCultureName
        {
            get
            {
                return _globalSettingsFacade.DefaultCultureName;
            }
        }



        [Obsolete("Dont use any more. This is pending deletion")]
        public static CultureInfo DefaultLocalizationCultureInfo
        {
            get
            {
                return _globalSettingsFacade.DefaultLocalizationCultureInfo;
            }
        }



        public static string ConfigurationDirectory
        {
            get
            {
                return _globalSettingsFacade.ConfigurationDirectory;
            }
        }



        public static string GeneratedAssembliesDirectory
        {
            get
            {
                return _globalSettingsFacade.GeneratedAssembliesDirectory;
            }
        }



        public static string SerializedWorkflowsDirectory
        {
            get
            {
                return _globalSettingsFacade.SerializedWorkflowsDirectory;
            }
        }



        public static string SerializedConsoleMessagesDirectory
        {
            get
            {
                return _globalSettingsFacade.SerializedConsoleMessagesDirectory;
            }
        }

        public static string AppCodeDirectory
        {
            get
            {
                return _globalSettingsFacade.AppCodeDirectory;
            }
        }

        public static string BinDirectory
        {
            get
            {
                return _globalSettingsFacade.BinDirectory;
            }
        }



        public static string TempDirectory
        {
            get
            {
                return _globalSettingsFacade.TempDirectory;
            }
        }



        public static string PackageDirectory
        {
            get
            {
                return _globalSettingsFacade.PackageDirectory;
            }
        }



        public static string AutoPackageInstallDirectory
        {
            get
            {
                return _globalSettingsFacade.AutoPackageInstallDirectory;
            }
        }



        public static string TreeDefinitionsDirectory
        {
            get
            {
                return _globalSettingsFacade.TreeDefinitionsDirectory;
            }
        }



        public static string DataMetaDataDirectory
        {
            get
            {
                return _globalSettingsFacade.DataMetaDataDirectory;
            }
        }



        public static string InlineCSharpFunctionDirectory
        {
            get
            {
                return _globalSettingsFacade.InlineCSharpFunctionDirectory;
            }
        }

        

        public static IResourceCacheSettings ResourceCacheSettings
        {
            get
            {
                return _globalSettingsFacade.ResourceCacheSettings;
            }
        }



        public static IEnumerable<string> NonProbableAssemblyNames
        {
            get
            {
                return _globalSettingsFacade.NonProbableAssemblyNames;
            }
        }



        public static void AddNonProbableAssemblyName(string assemblyNamePatern)
        {
            _globalSettingsFacade.AddNonProbableAssemblyName(assemblyNamePatern);
        }



        public static void RemoveNonProbableAssemblyName(string assemblyNamePatern)
        {
            _globalSettingsFacade.RemoveNonProbableAssemblyName(assemblyNamePatern);
        }



        public static IEnumerable<CultureInfo> ApplicationCultures
        {
            get
            {
                return _globalSettingsFacade.ApplicationCultures;
            }
        }



        public static int ConsoleMessageQueueItemSecondToLive
        {
            get
            {
                return _globalSettingsFacade.ConsoleMessageQueueItemSecondToLive;
            }
        }


        public static bool EnableDataTypesAutoUpdate
        {
            get
            {
                return _globalSettingsFacade.EnableDataTypesAutoUpdate;
            }
        }


        public static bool BroadcastConsoleElementChanges
        {
            get
            {
                return _globalSettingsFacade.BroadcastConsoleElementChanges;
            }
        }


        public static string AutoCreatedAdministratorUserName
        {
            get
            {
                return _globalSettingsFacade.AutoCreatedAdministratorUserName;
            }
        }



        public static TimeSpan WorkflowTimeout
        {
            get
            {
                return _globalSettingsFacade.WorkflowTimeout;
            }
        }



        public static TimeSpan ConsoleTimeout
        {
            get
            {
                return _globalSettingsFacade.ConsoleTimeout;
            }
        }


        public static TimeSpan DefaultReaderLockWaitTimeout
        {
            get
            {
                return TimeSpan.FromMinutes(5);
            }
        }


        public static TimeSpan DefaultWriterLockWaitTimeout
        {
            get
            {
                return TimeSpan.FromMinutes(5);
            }
        }



        public static ICachingSettings Caching
        {
            get
            {
                return _globalSettingsFacade.Caching;
            }
        }



        // Overload
        public static CachingSettings GetNamedCaching(string name)
        {
            ICacheSettings cacheSettings = Caching.Caches.Where(f => f.Name == name).FirstOrDefault();

            bool enabled = Caching.Enabled;
            int size = CachingSettings.DefaultCacheSize;
            if ((enabled == true) && (cacheSettings != null))
            {
                enabled = cacheSettings.Enabled && cacheSettings.Size != CachingSettings.NoCacheSize;
                size = cacheSettings.Size;
            }

            CachingSettings cachingSettings = new CachingSettings(enabled, size);

            return cachingSettings;
        }
    }
}
