using System;
using System.Diagnostics;
using Composite.Instrumentation;
using Composite.Instrumentation.Plugin;
using Composite.Logging;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.StandardPlugins.Instrumentation.PerformanceCounterProviders.WindowsPerformanceCounterProvider
{

    [ConfigurationElementType(typeof(NonConfigurablePerformanceCounterProvider))]
    internal sealed class WindowsPerformanceCounterProvider : IPerformanceCounterProvider
    {
        private PerformanceCounter _systemStartupCount = null;
        private PerformanceCounter _elementResultCreationAverageTime = null;
        private PerformanceCounter _elementResultCreationAverageTimeBase = null;
        private PerformanceCounter _elementTotalCreationAverageTime = null;
        private PerformanceCounter _elementTotalCreationAverageTimeBase = null;
        private PerformanceCounter _aspNetControlCompileAverageTime = null;
        private PerformanceCounter _aspNetControlCompileAverageTimeBase = null;
        private PerformanceCounter _pageHookCreationAverageTime = null;
        private PerformanceCounter _pageHookCreationAverageTimeBase = null;
        private PerformanceCounter _entityTokenParentCacheHitCount = null;
        private PerformanceCounter _entityTokenParentCacheMissCount = null;



        public WindowsPerformanceCounterProvider()
        {
            _systemStartupCount = TryCreateCounter(PerformanceNames.SystemStartupCountName);
            _elementResultCreationAverageTime = TryCreateCounter(PerformanceNames.ElementResultCreationAverageTimeName);
            _elementResultCreationAverageTimeBase = TryCreateCounter(PerformanceNames.ElementResultCreationAverageTimeBaseName);
            _elementTotalCreationAverageTime = TryCreateCounter(PerformanceNames.ElementTotalCreationAverageTimeName);
            _elementTotalCreationAverageTimeBase = TryCreateCounter(PerformanceNames.ElementTotalCreationAverageTimeBaseName);
            _aspNetControlCompileAverageTime = TryCreateCounter(PerformanceNames.AspNetControlCompileAverageTimeName);
            _aspNetControlCompileAverageTimeBase = TryCreateCounter(PerformanceNames.AspNetControlCompileAverageTimeBaseName);
            _pageHookCreationAverageTime = TryCreateCounter(PerformanceNames.PageHookCreationAverageTimeName);
            _pageHookCreationAverageTimeBase = TryCreateCounter(PerformanceNames.PageHookCreationAverageTimeBaseName);
            _entityTokenParentCacheHitCount = TryCreateCounter(PerformanceNames.EntityTokenParentCacheHitCountName);
            _entityTokenParentCacheMissCount = TryCreateCounter(PerformanceNames.EntityTokenParentCacheMissCountName);
        }



        public void SystemStartupIncrement()
        {
            if (_systemStartupCount != null)
            {
                _systemStartupCount.Increment();
            }
        }



        public IPerformanceCounterToken BeginElementCreation()
        {
            WindowsPerformanceCounterProviderToken windowsPerformanceCounterProviderToken = new WindowsPerformanceCounterProviderToken();
            windowsPerformanceCounterProviderToken.Start();
            return windowsPerformanceCounterProviderToken;
        }



        public void EndElementCreation(IPerformanceCounterToken performanceToken, int resultElementCount, int totalElementCount)
        {
            WindowsPerformanceCounterProviderToken windowsPerformanceCounterProviderToken = (WindowsPerformanceCounterProviderToken)performanceToken;
            windowsPerformanceCounterProviderToken.Stop();

            if ((_elementResultCreationAverageTime != null) &&
                (_elementResultCreationAverageTime != null) &&
                (_elementResultCreationAverageTimeBase != null) &&
                (_elementTotalCreationAverageTimeBase != null))
            {
                _elementResultCreationAverageTime.IncrementBy(windowsPerformanceCounterProviderToken.StopTicks - windowsPerformanceCounterProviderToken.StartTicks);
                _elementTotalCreationAverageTime.IncrementBy(windowsPerformanceCounterProviderToken.StopTicks - windowsPerformanceCounterProviderToken.StartTicks);
                _elementResultCreationAverageTimeBase.IncrementBy(resultElementCount);
                _elementTotalCreationAverageTimeBase.IncrementBy(totalElementCount);
            }
        }



        public IPerformanceCounterToken BeginAspNetControlCompile()
        {
            WindowsPerformanceCounterProviderToken windowsPerformanceCounterProviderToken = new WindowsPerformanceCounterProviderToken();
            windowsPerformanceCounterProviderToken.Start();
            return windowsPerformanceCounterProviderToken;
        }



        public void EndAspNetControlCompile(IPerformanceCounterToken performanceToken, int controlsCompiledCount)
        {
            WindowsPerformanceCounterProviderToken windowsPerformanceCounterProviderToken = (WindowsPerformanceCounterProviderToken)performanceToken;
            windowsPerformanceCounterProviderToken.Stop();

            if ((_aspNetControlCompileAverageTime != null) &&
                (_aspNetControlCompileAverageTimeBase != null))
            {
                _aspNetControlCompileAverageTime.IncrementBy(windowsPerformanceCounterProviderToken.StopTicks - windowsPerformanceCounterProviderToken.StartTicks);
                _aspNetControlCompileAverageTimeBase.IncrementBy(controlsCompiledCount);
            }
        }



        public IPerformanceCounterToken BeginPageHookCreation()
        {
            WindowsPerformanceCounterProviderToken windowsPerformanceCounterProviderToken = new WindowsPerformanceCounterProviderToken();
            windowsPerformanceCounterProviderToken.Start();
            return windowsPerformanceCounterProviderToken;
        }



        public void EndPageHookCreation(IPerformanceCounterToken performanceToken, int pageCount)
        {
            WindowsPerformanceCounterProviderToken windowsPerformanceCounterProviderToken = (WindowsPerformanceCounterProviderToken)performanceToken;
            windowsPerformanceCounterProviderToken.Stop();

            if ((_pageHookCreationAverageTime != null) &&
                (_pageHookCreationAverageTimeBase != null))
            {
                _pageHookCreationAverageTime.IncrementBy(windowsPerformanceCounterProviderToken.StopTicks - windowsPerformanceCounterProviderToken.StartTicks);
                _pageHookCreationAverageTimeBase.IncrementBy(pageCount);
            }
        }



        public void EntityTokenParentCacheHitIncrement()
        {
            if (_entityTokenParentCacheHitCount != null)
            {
                _entityTokenParentCacheHitCount.Increment();
            }
        }



        public void EntityTokenParentCacheMissIncrement()
        {
            if (_entityTokenParentCacheMissCount != null)
            {
                _entityTokenParentCacheMissCount.Increment();
            }
        }



        private PerformanceCounter TryCreateCounter(string counterName)
        {
            PerformanceCounter performanceCounter = null;
            try
            {
                performanceCounter = new PerformanceCounter(PerformanceNames.CategoryName, counterName, GetInstanceName(), false);
            }
            catch(Exception ex)
            {
                LoggingService.LogWarning("WindowsPerformanceCounterProvider", ex);
            }

            return performanceCounter;
        }



        private static string GetInstanceName()
        {
            return RuntimeInformation.UniqueInstanceName;
        }



        private sealed class WindowsPerformanceCounterProviderToken : IPerformanceCounterToken
        {
            internal delegate void OnComplete();

            public long StartTicks { get; set; }
            public long StopTicks { get; set; }

            public void Start()
            {
                this.StartTicks = DateTime.Now.Ticks;
            }


            public void Stop()
            {
                this.StopTicks = DateTime.Now.Ticks; 
            }

            public void Dispose()
            {
            }
        }        
    }
}
