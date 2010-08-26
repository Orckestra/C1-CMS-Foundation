using Composite.Core.Application;
using Composite.Core.Instrumentation;
using Composite.Core.Threading;
using Composite.Core.Types;
using Composite.Core.Logging;
using System;


namespace Composite.Core.WebClient
{
    /// <summary>
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class GlobalAsaxHelper
    {
        public static void ApplicationStartInitialize(bool displayDebugInfo = false)
        {
            ThreadDataManager.InitializeThroughHttpContext();

            if (displayDebugInfo == true)
            {
                LoggingService.LogVerbose("Global.asax", "cmd_clear_view");
                LoggingService.LogVerbose("Global.asax", string.Format("--- Web Application Start, {0} Id = {1} ---", DateTime.Now.ToLongTimeString(), AppDomain.CurrentDomain.Id));    
            }

            PerformanceCounterFacade.SystemStartupIncrement();
            ApplicationStartupFacade.FireBeforeSystemInitialize();

            TempDirectoryFacade.OnApplicationStart();
            BuildManager.InitializeCachingSytem();

            ApplicationStartupFacade.FireSystemInitialized();

            ThreadDataManager.FinalizeThroughHttpContext();
        }
    }
}
