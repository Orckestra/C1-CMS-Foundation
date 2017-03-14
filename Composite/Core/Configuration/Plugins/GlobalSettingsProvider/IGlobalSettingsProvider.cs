using System;
using System.Collections.Generic;
using Composite.Core.Configuration.Plugins.GlobalSettingsProvider.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.Configuration.Plugins.GlobalSettingsProvider
{
    [CustomFactory(typeof(GlobalSettingsProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(GlobalSettingsProviderDefaultNameRetriever))]
    internal interface IGlobalSettingsProvider
    {        
        string ApplicationName { get; }

        string ApplicationShortName { get; }

        string BrandedVersionAssemblySource { get; }

        string DefaultCultureName { get; }

        string ConfigurationDirectory { get; }

        string GeneratedAssembliesDirectory { get; }

        string SerializedWorkflowsDirectory { get; }

        string SerializedConsoleMessagesDirectory { get; }

        string AppCodeDirectory { get; }

        string BinDirectory { get; }

        string TempDirectory { get; }

        string CacheDirectory { get; }

        string PackageDirectory { get; }

        string AutoPackageInstallDirectory { get; }

        string TreeDefinitionsDirectory { get; }

        string PageTemplateFeaturesDirectory { get; }

        string DataMetaDataDirectory { get; }

        string InlineCSharpFunctionDirectory { get; }

        string PackageLicenseDirectory { get; }

        IResourceCacheSettings ResourceCacheSettings { get; }

        /// <summary>
        /// List of assembly names to exclude from type probing. Use "*" as wildcard, like. "System.*"
        /// </summary>
        IEnumerable<string> NonProbableAssemblyNames { get; }

        int ConsoleMessageQueueItemSecondToLive { get; }

        bool EnableDataTypesAutoUpdate { get; }

        bool BroadcastConsoleElementChanges { get; }

        /// <summary>
        /// If specified, the system will accept this user with any password on a clean system, that has a writeable login provider
        /// The user will then be created.
        /// </summary>
        string AutoCreatedAdministratorUserName { get; }

        string WorkflowTimeout { get; }

        string ConsoleTimeout { get; }

        /// <summary>
        /// When <value>true</value> only pages that are published or awaiting publication can be translated in console.
        /// </summary>
        bool OnlyTranslateWhenApproved { get;  }

        ICachingSettings Caching { get; }

        int ImageQuality { get; }

        bool PrettifyPublicMarkup { get; }

        bool PrettifyRenderFunctionExceptions { get; }

        bool FunctionPreviewEnabled { get; }

        TimeZoneInfo TimeZone { get; }

        bool InheritGlobalReadPermissionOnHiddenPerspectives { get; }
    }
}
