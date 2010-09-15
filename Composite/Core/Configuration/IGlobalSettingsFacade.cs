using System;
using System.Collections.Generic;
using System.Globalization;


namespace Composite.Core.Configuration
{
    internal interface IGlobalSettingsFacade
    {
        string ApplicationName { get; }
        CultureInfo DefaultCultureInfo { get; }
        string DefaultCultureName { get; }
        CultureInfo DefaultLocalizationCultureInfo { get; }
        string ConfigurationDirectory { get; }
        string GeneratedAssembliesDirectory { get; }
        string SerializedWorkflowsDirectory { get; }
        string SerializedConsoleMessagesDirectory { get; }
        string BinDirectory { get; }
        string AppCodeDirectory { get; }
        string TempDirectory { get; }
        string PackageDirectory { get; }
        string AutoPackageInstallDirectory { get; }
        string TreeDefinitionsDirectory { get; }
        string DataMetaDataDirectory { get; }
        string InlineCSharpFunctionDirectory { get; }
        IResourceCacheSettings ResourceCacheSettings { get; }
        IEnumerable<string> NonProbableAssemblyNames { get; }
        void AddNonProbableAssemblyName(string assemblyNamePatern);
        void RemoveNonProbableAssemblyName(string assemblyNamePatern);
        IEnumerable<CultureInfo> ApplicationCultures { get; }
        int ConsoleMessageQueueItemSecondToLive { get; }
        bool EnableDataTypesAutoUpdate { get; }
        bool BroadcastConsoleElementChanges { get; }
        string AutoCreatedAdministratorUserName { get; }
        TimeSpan WorkflowTimeout { get; }
        TimeSpan ConsoleTimeout { get; }
        ICachingSettings Caching { get; }
    }
}
