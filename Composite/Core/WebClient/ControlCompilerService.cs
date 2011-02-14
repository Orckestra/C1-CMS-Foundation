using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Core.Configuration;
using Composite.C1Console.Forms.Flows.Plugins.UiContainerFactory;
using Composite.C1Console.Forms.Flows.Plugins.UiContainerFactory.Runtime;
using Composite.C1Console.Forms.Plugins.UiControlFactory;
using Composite.C1Console.Forms.Plugins.UiControlFactory.Runtime;
using Composite.Core.Instrumentation;
using Composite.Core.Logging;
using System.Collections;


namespace Composite.Core.WebClient
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ControlCompilerService
    {
        /// <exclude />
        public static IEnumerable<string> GetControlPaths()
        {
            UiControlFactorySettings uiControlFactorySettings = ConfigurationServices.ConfigurationSource.GetSection(UiControlFactorySettings.SectionName) as UiControlFactorySettings;

            foreach (Composite.C1Console.Forms.Plugins.UiControlFactory.Runtime.ChannelConfigurationElement channelElement in uiControlFactorySettings.Channels)
            {
                foreach (NamespaceConfigurationElement namespaceElement in channelElement.Namespaces)
                {
                    foreach (UiControlFactoryData uiControlFactoryData in namespaceElement.Factories)
                    {
                        PropertyInfo propertyInfo = uiControlFactoryData.GetType().GetProperty("UserControlVirtualPath");
                        if (propertyInfo != null)
                        {
                            string path = (string)propertyInfo.GetValue(uiControlFactoryData, null);

                            yield return path;
                        }
                    }
                }
            }


            UiContainerFactorySettings uiContainerFactorySettings = ConfigurationServices.ConfigurationSource.GetSection(UiContainerFactorySettings.SectionName) as UiContainerFactorySettings;

            foreach (Composite.C1Console.Forms.Flows.Plugins.UiContainerFactory.Runtime.ChannelConfigurationElement channelElement in uiContainerFactorySettings.Channels)
            {
                foreach (UiContainerFactoryData uiControlFactoryData in channelElement.Factories)
                {
                    PropertyInfo propertyInfo = uiControlFactoryData.GetType().GetProperty("UserControlVirtualPath");
                    if (propertyInfo != null)
                    {
                        string path = (string)propertyInfo.GetValue(uiControlFactoryData, null);

                        yield return path;
                    }
                }
            }
        }



        /// <exclude />
        public static void CompileAll()
        {
            FieldInfo theBuildManagerFieldInfo = typeof(System.Web.Compilation.BuildManager).GetField("_theBuildManager", BindingFlags.NonPublic | BindingFlags.Static);
            FieldInfo cachesManagerFieldInfo = typeof(System.Web.Compilation.BuildManager).GetField("_caches", BindingFlags.NonPublic | BindingFlags.Instance);

            object currentBuilderManager = theBuildManagerFieldInfo.GetValue(null);
            IEnumerable caches = cachesManagerFieldInfo.GetValue(currentBuilderManager) as IEnumerable;

            Type standardDiskBuildResultCacheType = caches.OfType<object>().Where(f => f.GetType().FullName == "System.Web.Compilation.StandardDiskBuildResultCache").Select(f => f.GetType()).Single();
            FieldInfo maxRecompilationsFieldInfo = standardDiskBuildResultCacheType.BaseType.GetField("s_maxRecompilations", BindingFlags.NonPublic | BindingFlags.Static);

            object oldValue = maxRecompilationsFieldInfo.GetValue(null);
            maxRecompilationsFieldInfo.SetValue(null, 500);

            IEnumerable<string> paths = GetControlPaths();

            IPerformanceCounterToken performanceCounterToken = PerformanceCounterFacade.BeginAspNetControlCompile();

            // ParallelFacade.ForEach(paths, path => // Call to parallelization facade causes a deadlock while starting-up!!!
            foreach (string path in paths)
            {
                int t1 = Environment.TickCount;
                Type type = System.Web.Compilation.BuildManager.GetCompiledType(path);
                int t2 = Environment.TickCount;

                LoggingService.LogVerbose("RGB(180, 180, 255)ControlCompilerService", string.Format("{0} compiled in {1} ms", path, t2 - t1));
            }

            PerformanceCounterFacade.EndAspNetControlCompile(performanceCounterToken, paths.Count());

           // maxRecompilationsFieldInfo.SetValue(null, oldValue);
        }
    }
}
