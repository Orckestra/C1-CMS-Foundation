<%@ Application Language="C#" %>
<%@ Import Namespace="Composite" %>
<%@ Import Namespace="Composite.Core.Extensions" %>
<%@ Import Namespace="Composite.Core.Logging" %>
<%@ Import Namespace="Composite.Core.Application" %>
<%@ Import Namespace="Composite.Core.Instrumentation" %>
<%@ Import Namespace="Composite.Core.Threading" %>
<%@ Import Namespace="Composite.Core.Types" %>
<%@ Import Namespace="Composite.Core.WebClient" %>

<script RunAt="server">
       
    readonly static object _syncRoot = new object();
    private static bool _systemIsFinalized;
    private static bool _systemIsInitialized;           
       
    void Application_Start(object sender, EventArgs e)
    {
        if (Composite.Core.Configuration.SystemSetupFacade.IsSystemFirstTimeInitialized == false)
        {
            return;
        }

        if (_systemIsInitialized == true) return;        

        if (AppDomain.CurrentDomain.BaseDirectory.Length > 70)
        {
            throw new InvalidOperationException("Windows limitation problem detected! You have installed the website at a place where the total path length of the file with the longest filename exceeds the maximum allowed in Windows. See http://msdn.microsoft.com/en-us/library/aa365247%28VS.85%29.aspx#paths");
        }

        lock (_syncRoot)
        {
            if (_systemIsInitialized == true) return;

            GlobalAsaxHelper.ApplicationStartInitialize();

            _systemIsInitialized = true;
        }
    }


    void Application_End(object sender, EventArgs e)
    {
        if (Composite.Core.Configuration.SystemSetupFacade.IsSystemFirstTimeInitialized == false)
        {
            return;
        }


        if (_systemIsFinalized == true) return;

        lock (_syncRoot)
        {
            if (_systemIsFinalized == true) return;    
    
            using (ThreadDataManager.Initialize())
            {
                try
                {
                    Composite.C1Console.Events.GlobalEventSystemFacade.PrepareForShutDown();
                    Composite.C1Console.Events.GlobalEventSystemFacade.ShutDownTheSystem();

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
                        Composite.Core.Types.BuildManager.FinalizeCachingSytem();
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

