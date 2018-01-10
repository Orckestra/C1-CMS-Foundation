using System;
using System.Collections.Generic;
using System.Globalization;


namespace Composite.Core.Configuration
{
    internal interface IGlobalSettingsFacade
    {
        string ApplicationName { get; }
        string ApplicationShortName { get; }
        string BrandedVersionAssemblySource { get; }
        CultureInfo DefaultCultureInfo { get; }
        string DefaultCultureName { get; }
        string ConfigurationDirectory { get; }
        string GeneratedAssembliesDirectory { get; }
        string SerializedWorkflowsDirectory { get; }
        string SerializedConsoleMessagesDirectory { get; }
        string BinDirectory { get; }
        string AppCodeDirectory { get; }
        string TempDirectory { get; }
        string CacheDirectory { get; }
        string PackageDirectory { get; }
        string AutoPackageInstallDirectory { get; }
        string TreeDefinitionsDirectory { get; }
        string PageTemplateFeaturesDirectory { get; }
        string DataMetaDataDirectory { get; }
        string InlineCSharpFunctionDirectory { get; }
        string PackageLicenseDirectory { get; }
        IEnumerable<string> NonProbableAssemblyNames { get; }
        void AddNonProbableAssemblyName(string assemblyNamePatern);
        void RemoveNonProbableAssemblyName(string assemblyNamePatern);
        int ConsoleMessageQueueItemSecondToLive { get; }
        bool EnableDataTypesAutoUpdate { get; }
        bool BroadcastConsoleElementChanges { get; }
        string AutoCreatedAdministratorUserName { get; }
        TimeSpan WorkflowTimeout { get; }
        TimeSpan ConsoleTimeout { get; }
        bool OnlyTranslateWhenApproved { get; }
        ICachingSettings Caching { get; }
        int ImageQuality { get; }
        bool PrettifyPublicMarkup { get; }
        bool PrettifyRenderFunctionExceptions { get; }
        bool FunctionPreviewEnabled { get; }
        TimeZoneInfo TimeZone { get; }
        bool InheritGlobalReadPermissionOnHiddenPerspectives { get; }
    }
}
