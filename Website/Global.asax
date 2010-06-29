<%@ Application Language="C#" %>
<%@ Import Namespace="Composite" %>
<%@ Import Namespace="Composite.Extensions" %>
<%@ Import Namespace="Composite.Logging" %>
<%@ Import Namespace="Composite.Application" %>
<%@ Import Namespace="Composite.Instrumentation" %>
<%@ Import Namespace="Composite.Threading" %>


<script RunAt="server">
    
    /*
     * 
     *  Remember to add non-debug changes to ReleaseBuild.Global.asax 
     * 
     * 
     */

    readonly static object _syncRoot = new object();
    private static bool _systemIsFinalized;
    private static bool _systemIsInitialized;    
    
    private const bool _logRequestDetails = false;

    void Application_Start(object sender, EventArgs e)
    {
        if (_systemIsInitialized == true)
        {
            return;
        }

        if (AppDomain.CurrentDomain.BaseDirectory.Length > 70)
        {
            throw new InvalidOperationException("Windows limitation problem detected! You have installed the website at a place where the total path length of the file with the longest filename exceeds the maximum allowed in Windows. See http://msdn.microsoft.com/en-us/library/aa365247%28VS.85%29.aspx#paths");
        }
        
        lock (_syncRoot)
        {            
            if (_systemIsInitialized == true)
            {
                return;
            }

            ThreadDataManager.InitializeThroughHttpContext();

            LoggingService.LogVerbose("Global.asax", "cmd_clear_view");
            LoggingService.LogVerbose("Global.asax",
                                      string.Format("--- Web Application Start, {0} Id = {1} ---",
                                                    DateTime.Now.ToLongTimeString(), AppDomain.CurrentDomain.Id));    
            
            //Thread aspNetControlCompileThread = new Thread(delegate()
            //{
            //    int t1 = Environment.TickCount;
            //    ControlCompilerService.CompileAll();
            //    int t2 = Environment.TickCount;

            //    LoggingService.LogVerbose("RGB(180, 180, 255)Global.asax", string.Format("Compiling asp.net controls done in {0} ms", t2 - t1));
            //});
            //aspNetControlCompileThread.Start();

            
            PerformanceCounterFacade.SystemStartupIncrement();
            ApplicationStartupFacade.FireBeforeSystemInitialize();

            TempDirectoryFacade.OnApplicationStart();
            Composite.Types.BuildManager.InitializeCachingSytem();            

            ApplicationStartupFacade.FireSystemInitialized();

            ThreadDataManager.FinalizeThroughHttpContext();

            _systemIsInitialized = true;
        }
    }


    void Application_End(object sender, EventArgs e)
    {
        if (_systemIsFinalized == true) return;
            

        lock (_syncRoot)
        {
            if (_systemIsFinalized == true) return;

            using (ThreadDataManager.Initialize())
            {
                try
                {
                    Composite.EventSystem.GlobalEventSystemFacade.PrepareForShutDown();
                    LogShutDownReason();
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

                    LoggingService.LogVerbose("Global.asax",
                                              string.Format("--- Web Application End, {0} Id = {1}---",
                                                            DateTime.Now.ToLongTimeString(),
                                                            AppDomain.CurrentDomain.Id));
                }
                catch (Exception ex)
                {
                    LoggingService.LogCritical("Global.asax", ex);
                }
                finally
                {
                    AppDomainLocker.ReleaseAnyLock();
                    _systemIsFinalized = true;
                }
            }
        }
    }


    void Application_BeginRequest(object sender, EventArgs e)
    {
        ThreadDataManager.InitializeThroughHttpContext(true);

        if (_logRequestDetails == true)
        {
            // LoggingService.LogVerbose("Begin request", string.Format("{0}", Request.Path));
            HttpContext.Current.Items.Add("Global.asax timer", Environment.TickCount);
        }
    }


    void Application_EndRequest(object sender, EventArgs e)
    {
        try
        {
            if (_logRequestDetails == true && HttpContext.Current.Items.Contains("Global.asax timer"))
            {
                int startTimer = (int)HttpContext.Current.Items["Global.asax timer"];
                LoggingService.LogVerbose("End request", string.Format("{0} - took {1} ms", Request.Path, (Environment.TickCount - startTimer)));
            }
        }
        finally
        {
            ThreadDataManager.FinalizeThroughHttpContext();
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


    private void LogShutDownReason()
    {
        HttpRuntime runtime = (HttpRuntime)typeof(System.Web.HttpRuntime).InvokeMember("_theRuntime",
                                                                                    System.Reflection.BindingFlags.NonPublic |
                                                                                    System.Reflection.BindingFlags.Static |
                                                                                    System.Reflection.BindingFlags.GetField,
                                                                                    null, null, null);

        if (runtime == null)
        {
            LoggingService.LogWarning("ASP.NET Shut Down", "Unable to determine cause of shut down");
            return;
        }

        string shutDownMessage = (string)runtime.GetType().InvokeMember("_shutDownMessage",
                                                                     System.Reflection.BindingFlags.NonPublic |
                                                                     System.Reflection.BindingFlags.Instance |
                                                                     System.Reflection.BindingFlags.GetField,
                                                                     null, runtime, null);

        string shutDownStack = (string)runtime.GetType().InvokeMember("_shutDownStack",
                                                                   System.Reflection.BindingFlags.NonPublic |
                                                                   System.Reflection.BindingFlags.Instance |
                                                                   System.Reflection.BindingFlags.GetField,
                                                                   null, runtime, null);

        LoggingService.LogInformation("ASP.NET Shut Down", String.Format("_shutDownMessage=\n{0}\n\n_shutDownStack=\n{1}",
                                     shutDownMessage.Replace("\n", "   \n"),
                                     shutDownStack));
    }

</script>

