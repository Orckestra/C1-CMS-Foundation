using System;
using System.Linq;
using System.Collections.Generic;
using System.Globalization;
using Composite.Core.PageTemplates;
using Composite.Plugins.PageTemplates.Razor;


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
        public bool Enabled { get; }


        /// <summary>
        /// One of three values:
        /// NoCacheSize: The caller should use not use caching
        /// DefaultCacheSize: The caller should use its own default size
        /// All other values (> 0): The caller should use this size
        /// See <see cref="GetSize"/>
        /// </summary>
        public int Size { get; }


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


        internal static IGlobalSettingsFacade Implementation
        {
            get => _globalSettingsFacade;
            set => _globalSettingsFacade = value;
        }


        /// <summary>
        /// The name of the application to be displayed in the UI.
        /// </summary>
        public static string ApplicationName => _globalSettingsFacade.ApplicationName;

        /// <summary>
        /// The short name of the application to be displayed in the UI.
        /// </summary>
        public static string ApplicationShortName => _globalSettingsFacade.ApplicationShortName;

        /// <summary>
        /// Name of an assembly file, which version should displayed as a product version in UI.
        /// </summary>
        public static string BrandedVersionAssemblySource => _globalSettingsFacade.BrandedVersionAssemblySource;


        /// <exclude />
        public static CultureInfo DefaultCultureInfo => _globalSettingsFacade.DefaultCultureInfo;


        /// <exclude />
        public static string DefaultCultureName => _globalSettingsFacade.DefaultCultureName;


        /// <exclude />
        public static string ConfigurationDirectory => _globalSettingsFacade.ConfigurationDirectory;


        /// <exclude />
        public static string GeneratedAssembliesDirectory => _globalSettingsFacade.GeneratedAssembliesDirectory;


        /// <exclude />
        public static string SerializedWorkflowsDirectory => _globalSettingsFacade.SerializedWorkflowsDirectory;


        /// <exclude />
        public static string SerializedConsoleMessagesDirectory => _globalSettingsFacade.SerializedConsoleMessagesDirectory;


        /// <exclude />
        public static string AppCodeDirectory => _globalSettingsFacade.AppCodeDirectory;


        /// <exclude />
        public static string BinDirectory => _globalSettingsFacade.BinDirectory;


        /// <exclude />
        public static string TempDirectory => _globalSettingsFacade.TempDirectory;


        /// <exclude />
        public static string CacheDirectory => _globalSettingsFacade.CacheDirectory;


        /// <exclude />
        public static string PackageDirectory => _globalSettingsFacade.PackageDirectory;


        /// <exclude />
        public static string AutoPackageInstallDirectory => _globalSettingsFacade.AutoPackageInstallDirectory;


        /// <exclude />
        public static string TreeDefinitionsDirectory => _globalSettingsFacade.TreeDefinitionsDirectory;


        /// <exclude />
        public static string PageTemplateFeaturesDirectory => _globalSettingsFacade.PageTemplateFeaturesDirectory;


        /// <exclude />
        public static string DataMetaDataDirectory => _globalSettingsFacade.DataMetaDataDirectory;


        /// <exclude />
        public static string InlineCSharpFunctionDirectory => _globalSettingsFacade.InlineCSharpFunctionDirectory;


        /// <exclude />
        public static string PackageLicenseDirectory => _globalSettingsFacade.PackageLicenseDirectory;


        /// <exclude />
        public static IEnumerable<string> NonProbableAssemblyNames => _globalSettingsFacade.NonProbableAssemblyNames;


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
        public static int ConsoleMessageQueueItemSecondToLive => _globalSettingsFacade.ConsoleMessageQueueItemSecondToLive;


        /// <exclude />
        public static bool EnableDataTypesAutoUpdate => _globalSettingsFacade.EnableDataTypesAutoUpdate;


        /// <exclude />
        public static bool BroadcastConsoleElementChanges => _globalSettingsFacade.BroadcastConsoleElementChanges;


        /// <exclude />
        public static string AutoCreatedAdministratorUserName => _globalSettingsFacade.AutoCreatedAdministratorUserName;


        /// <exclude />
        public static TimeSpan WorkflowTimeout => _globalSettingsFacade.WorkflowTimeout;


        /// <exclude />
        public static TimeSpan ConsoleTimeout => _globalSettingsFacade.ConsoleTimeout;


        /// <exclude />
        public static TimeSpan DefaultReaderLockWaitTimeout => TimeSpan.FromMinutes(5);


        /// <exclude />
        public static TimeSpan DefaultWriterLockWaitTimeout => TimeSpan.FromMinutes(5);


        /// <exclude />
        public static ICachingSettings Caching => _globalSettingsFacade.Caching;


        /// <exclude />
        public static int ImageQuality => _globalSettingsFacade.ImageQuality;

        /// <summary>
        /// When <value>true</value> only pages that are published or awaiting publication can be translated in console.
        /// </summary>
        public static bool OnlyTranslateWhenApproved => _globalSettingsFacade.OnlyTranslateWhenApproved;

        /// <summary>
        /// The maximum number of characters the path to the application root (like 'C:\InetPub\MySite') can contain.
        /// C1 CMS create files below this path, some of which have very long paths - if the root path is long enough the combined length
        /// can exceed a limitation in Microsoft Windows - see http://msdn.microsoft.com/en-us/library/aa365247%28VS.85%29.aspx#paths
        /// </summary>
        public static int MaximumRootPathLength => 90;

        /// <summary>
        /// When <value>true</value> the output XHTML markup  will be formatted. 
        /// </summary>
        public static bool PrettifyPublicMarkup => _globalSettingsFacade.PrettifyPublicMarkup;

        /// <summary>
        /// When true exceptions thrown by C1 Functions during a page rendering will be prettified - ensuring the rest of the page render okay.
        /// For unauthenticated requests this will become "error", while authenticated users get error info.
        /// </summary>
        public static bool PrettifyRenderFunctionExceptions => _globalSettingsFacade.PrettifyRenderFunctionExceptions;

        /// <exclude />
        public static bool FunctionPreviewEnabled => _globalSettingsFacade.FunctionPreviewEnabled;

        /// <exclude />
        public static TimeZoneInfo TimeZone => _globalSettingsFacade.TimeZone;

        /// <exclude />
        public static bool InheritGlobalReadPermissionOnHiddenPerspectives
            => _globalSettingsFacade.InheritGlobalReadPermissionOnHiddenPerspectives;

        /// <summary>
        /// When <value>true</value>, a page request handler that doesn't support UserControl functions will be used.
        /// Applicable for <see cref="IPageTemplateProvider" />-s, that return renderer-s implementing <see cref="ISlimPageRenderer"/> interface
        /// (f.e. <see cref="RazorPageTemplateProvider"/>).
        /// </summary>
        public static bool OmitAspNetWebFormsSupport => _globalSettingsFacade.OmitAspNetWebFormsSupport;

        // Overload
        /// <exclude />
        public static CachingSettings GetNamedCaching(string name)
        {
            ICacheSettings cacheSettings = Caching.Caches.FirstOrDefault(f => f.Name == name);

            bool enabled = Caching.Enabled;
            int size = CachingSettings.DefaultCacheSize;
            if (enabled && cacheSettings != null)
            {
                enabled = cacheSettings.Enabled && cacheSettings.Size != CachingSettings.NoCacheSize;
                size = cacheSettings.Size;
            }

            var cachingSettings = new CachingSettings(enabled, size);

            return cachingSettings;
        }
    }
}