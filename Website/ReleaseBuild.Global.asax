<%@ Application Language="C#" %>
<%@ Import Namespace="Composite" %>
<%@ Import Namespace="Composite.Extensions" %>
<%@ Import Namespace="Composite.Logging" %>
<%@ Import Namespace="Composite.Application" %>
<%@ Import Namespace="Composite.Instrumentation" %>
<%@ Import Namespace="Composite.Threading" %>


<script RunAt="server">
       
    readonly static object _syncRoot = new object();
    private static bool _systemIsFinalized;
    private static bool _systemIsInitialized;           
       
    void Application_Start(object sender, EventArgs e)
    {
        if (_systemIsInitialized == false) return;        

        lock (_syncRoot)
        {
            if (_systemIsInitialized == false) return;

            ThreadDataManager.InitializeThroughHttpContext();
            
            PerformanceCounterFacade.SystemStartupIncrement();
            ApplicationStartupFacade.FireBeforeSystemInitialize();

            TempDirectoryFacade.OnApplicationStart();
            Composite.Types.BuildManager.InitializeCachingSytem();

            Composite.GlobalInitializerFacade.InitializeTheSystem();
            LoggingService.LogInformation("Global.asax", "Application started");
            
            ApplicationStartupFacade.FireSystemInitialized();

            ThreadDataManager.FinalizeThroughHttpContext();

            _systemIsInitialized = true;
        }
    }


    void Application_End(object sender, EventArgs e)
    {
        if (_systemIsFinalized == false) return;

        lock (_syncRoot)
        {
            if (_systemIsFinalized == false) return;    
    
            using (ThreadDataManager.Initialize())
            {
                try
                {
                    Composite.EventSystem.GlobalEventSystemFacade.PrepareForShutDown();
                    Composite.EventSystem.GlobalEventSystemFacade.ShutDownTheSystem();

                    // Checking if another app domain holds the lock
                    bool haveLock = true;
                    try
                    {
                        AppDomainLocker.EnsureLock(TimeSpan.FromMilliseconds(1));
                    }
                    catch(Exception)
                    {
                        haveLock = false;
                        LoggingService.LogWarning("Global.asax", "Failed to obtain the lock for updating Composite.Generated.dll");
                    }
                        
                    if(haveLock)
                    {
                        Composite.Types.BuildManager.FinalizeCachingSytem();
                        TempDirectoryFacade.OnApplicationEnd();
                    }
                    
                    LoggingService.LogVerbose("Global.asax", string.Format("--- Web Application End, {0} Id = {1}---", DateTime.Now.ToLongTimeString(), AppDomain.CurrentDomain.Id));
                }
                finally
                {
                    AppDomainLocker.ReleaseAnyLock();
                   _systemIsFinalized = true;
                }
            }
        }        
    }
    

    protected void Application_Error(object sender, EventArgs e)
    {
        Exception exception = Server.GetLastError();
        
        System.Diagnostics.TraceEventType eventType = System.Diagnostics.TraceEventType.Critical;

        if (exception is HttpException && ((HttpException)exception).GetHttpCode() == 404)
        {
            LoggingService.LogWarning("Application Error", exception.Message);
            return;
        }
        
        var request = this.Context.Request;
        if (request != null)
        {
            string origianalUrl = request.RawUrl;
            LoggingService.LogError("Application Error", "Failed to process '{0}' request to url '{1}'".FormatWith(request.RequestType ?? string.Empty, origianalUrl ?? string.Empty));
        }
        
        
        while(exception != null)
        {
            LoggingService.LogEntry("Application Error", exception.ToString(), LoggingService.Category.General, eventType);
            exception = exception.InnerException;
        }
    }

    
    void Application_BeginRequest(object sender, EventArgs e)
    {
        ThreadDataManager.InitializeThroughHttpContext(true);        
    }
    
    
    void Application_EndRequest(object sender, EventArgs e)
    {
        ThreadDataManager.FinalizeThroughHttpContext();
    }
</script>

