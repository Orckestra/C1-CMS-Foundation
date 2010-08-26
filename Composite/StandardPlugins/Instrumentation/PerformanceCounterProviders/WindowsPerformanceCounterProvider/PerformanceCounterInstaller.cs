using System;
using System.Collections;
using System.ComponentModel;
using System.Diagnostics;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.Manageability;


namespace Composite.Plugins.Instrumentation.PerformanceCounterProviders.WindowsPerformanceCounterProvider
{
    /// <summary>
    /// Use Installutil.exe to install performance counters
    /// </summary>
    [RunInstallerAttribute(true)]
    internal sealed class PerformanceCounterInstaller : Installer
	{
        public override void Install(IDictionary stateSaver)
        {
            base.Install(stateSaver);

            if (PerformanceCounterCategory.Exists(PerformanceNames.CategoryName) == true) throw new InvalidOperationException("Already installed");

            CounterCreationDataCollection collection = new CounterCreationDataCollection();
            collection.Add(new CounterCreationData(PerformanceNames.SystemStartupCountName, PerformanceNames.SystemStartupCountDescription, PerformanceCounterType.NumberOfItems32));
            collection.Add(new CounterCreationData(PerformanceNames.ElementResultCreationAverageTimeName, PerformanceNames.ElementResultCreationAverageTimeDescription, PerformanceCounterType.AverageTimer32));
            collection.Add(new CounterCreationData(PerformanceNames.ElementResultCreationAverageTimeBaseName, PerformanceNames.ElementResultCreationAverageTimeBaseDescription, PerformanceCounterType.AverageBase));
            collection.Add(new CounterCreationData(PerformanceNames.ElementTotalCreationAverageTimeName, PerformanceNames.ElementTotalCreationAverageTimeDescription, PerformanceCounterType.AverageTimer32));
            collection.Add(new CounterCreationData(PerformanceNames.ElementTotalCreationAverageTimeBaseName, PerformanceNames.ElementTotalCreationAverageTimeBaseDescription, PerformanceCounterType.AverageBase));
            collection.Add(new CounterCreationData(PerformanceNames.AspNetControlCompileAverageTimeName, PerformanceNames.AspNetControlCompileAverageTimeDescription, PerformanceCounterType.AverageTimer32));
            collection.Add(new CounterCreationData(PerformanceNames.AspNetControlCompileAverageTimeBaseName, PerformanceNames.AspNetControlCompileAverageTimeBaseDescription, PerformanceCounterType.AverageBase));
            collection.Add(new CounterCreationData(PerformanceNames.PageHookCreationAverageTimeName, PerformanceNames.PageHookCreationAverageTimeDescription, PerformanceCounterType.AverageCount64));
            collection.Add(new CounterCreationData(PerformanceNames.PageHookCreationAverageTimeBaseName, PerformanceNames.PageHookCreationAverageTimeBaseDescription, PerformanceCounterType.AverageBase));
            collection.Add(new CounterCreationData(PerformanceNames.EntityTokenParentCacheHitCountName, PerformanceNames.EntityTokenParentCacheHitCountDescription, PerformanceCounterType.NumberOfItems32));
            collection.Add(new CounterCreationData(PerformanceNames.EntityTokenParentCacheMissCountName, PerformanceNames.EntityTokenParentCacheMissCountDescription, PerformanceCounterType.NumberOfItems32));

            PerformanceCounterCategory.Create(PerformanceNames.CategoryName, PerformanceNames.CategoryDescription, PerformanceCounterCategoryType.MultiInstance, collection);
        }



        public override void Uninstall(IDictionary savedState)
        {
            base.Uninstall(savedState);

            if (PerformanceCounterCategory.Exists(PerformanceNames.CategoryName) == true)
            {
                PerformanceCounterCategory.Delete(PerformanceNames.CategoryName);
            }
        }
	}
}
