using System;
using Composite.Core.Application;
using Composite.Core.Configuration;
using Composite.Core.Instrumentation;
using Composite.Core.Logging;
using Composite.Core.Threading;
using Composite.Core.Types;
using Composite.Core.Extensions;
using System.Web;

namespace Composite.Core.WebClient
{
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class ApplicationLevelEventHandlers
    {
        readonly static object _syncRoot = new object();
        private static bool _systemIsFinalized = false;
        private static bool _systemIsInitialized = false;


        public static bool LogRequestDetails { get; set; }
        public static bool LogApplicationLevelErrors { get; set; }

        public static void Application_Start(object sender, EventArgs e)
        {
            if (SystemSetupFacade.IsSystemFirstTimeInitialized == false)
            {
                return;
            }

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
                if (_systemIsInitialized == true) return;

                ApplicationStartInitialize(Composite.RuntimeInformation.IsDebugBuild);

                _systemIsInitialized = true;
            }
        }



        public static void Application_End(object sender, EventArgs e)
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
                        if (Composite.RuntimeInformation.IsDebugBuild)
                        {
                            LogShutDownReason();
                        }
                        Composite.C1Console.Events.GlobalEventSystemFacade.ShutDownTheSystem();

                        // Checking if another app domain holds the lock
                        bool haveLock = true;
                        try
                        {
                            AppDomainLocker.EnsureLock(TimeSpan.FromMilliseconds(1));
                        }
                        catch (Exception)
                        {
                            haveLock = false;
                            LoggingService.LogWarning("Global.asax", "Failed to obtain the lock for updating Composite.Generated.dll");
                        }

                        if (haveLock)
                        {
                            Composite.Core.Types.BuildManager.FinalizeCachingSytem();
                            TempDirectoryFacade.OnApplicationEnd();
                        }

                        LoggingService.LogVerbose("Global.asax",
                                                  string.Format("--- Web Application End, {0} Id = {1}---",
                                                                DateTime.Now.ToLongTimeString(),
                                                                AppDomain.CurrentDomain.Id));
                    }
                    catch (Exception ex)
                    {
                        if (RuntimeInformation.IsDebugBuild)
                        {
                            LoggingService.LogCritical("Global.asax", ex);
                        }

                        throw;
                    }
                    finally
                    {
                        AppDomainLocker.ReleaseAnyLock();
                        _systemIsFinalized = true;
                    }
                }
            }
        }


        public static void Application_BeginRequest(object sender, EventArgs e)
        {
            ThreadDataManager.InitializeThroughHttpContext(true);

            if (LogRequestDetails == true)
            {
                // LoggingService.LogVerbose("Begin request", string.Format("{0}", Request.Path));
                HttpContext.Current.Items.Add("Global.asax timer", Environment.TickCount);
            }
        }


        public static void Application_EndRequest(object sender, EventArgs e)
        {
            try
            {
                if (LogRequestDetails == true && HttpContext.Current.Items.Contains("Global.asax timer"))
                {
                    int startTimer = (int)HttpContext.Current.Items["Global.asax timer"];
                    string requesrPath = HttpContext.Current.Request.Path;
                    LoggingService.LogVerbose("End request", string.Format("{0} - took {1} ms", requesrPath, (Environment.TickCount - startTimer)));
                }
            }
            finally
            {
                ThreadDataManager.FinalizeThroughHttpContext();
            }
        }



        public static void Application_Error(object sender, EventArgs e)
        {
            if (LogApplicationLevelErrors)
            {

                Exception exception = HttpContext.Current.Server.GetLastError();

                System.Diagnostics.TraceEventType eventType = System.Diagnostics.TraceEventType.Critical;

                if (exception is HttpException && ((HttpException)exception).GetHttpCode() == 404)
                {
                    LoggingService.LogWarning("Application Error", exception.Message);
                    return;
                }

                var request = HttpContext.Current.Request;
                if (request != null)
                {
                    string origianalUrl = request.RawUrl;
                    LoggingService.LogError("Application Error", "Failed to process '{0}' request to url '{1}'".FormatWith(request.RequestType ?? string.Empty, origianalUrl ?? string.Empty));
                }


                while (exception != null)
                {
                    LoggingService.LogEntry("Application Error", exception.ToString(), LoggingService.Category.General, eventType);
                    exception = exception.InnerException;
                }
            }
        }



        internal static void ApplicationStartInitialize(bool displayDebugInfo = false)
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



        private static void LogShutDownReason()
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

    }
}
