using System;
using System.Web;
using Composite.Core.Application;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.Instrumentation;
using Composite.Core.Logging;
using Composite.Core.Routing;
using Composite.Core.Threading;
using Composite.Core.Types;
using System.IO;
using Composite.Core.IO;


namespace Composite.Core.WebClient
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class ApplicationLevelEventHandlers
    {
        private const string _verboseLogEntryTitle = "RGB(205, 92, 92)ApplicationEventHandler";
        readonly static object _syncRoot = new object();
        private static bool _systemIsInitialized = false;
        private static bool _haveAppDomainLock = false;
        private static EventHandler _domainUnloadedEventHandler = null;

        /// <exclude />
        public static bool LogRequestDetails { get; set; }

        /// <exclude />
        public static bool LogApplicationLevelErrors { get; set; }


        private static DateTime _startTime;

        /// <exclude />
        public static void Application_Start(object sender, EventArgs e)
        {
            DateTime startTime = DateTime.Now;
            _startTime = DateTime.Now;
            Log.LogVerbose(_verboseLogEntryTitle, "AppDomain {0} started at {1}", AppDomain.CurrentDomain.Id, _startTime.ToString("HH:mm:ss:ff"));

            SystemSetupFacade.SetFirstTimeStart();

            if (SystemSetupFacade.IsSystemFirstTimeInitialized == false)
            {
                return;
            }

            if (_systemIsInitialized == true)
            {
                return;
            }

            if (AppDomain.CurrentDomain.BaseDirectory.Length > GlobalSettingsFacade.MaximumRootPathLength)
            {
                throw new InvalidOperationException("Windows limitation problem detected! You have installed the website at a place where the total path length of the file with the longest filename exceeds the maximum allowed in Windows. See http://msdn.microsoft.com/en-us/library/aa365247%28VS.85%29.aspx#paths");
            }


#warning MRJ: BM: Cleanup logging here!
            //_haveAppDomainLock = AppDomainLocker.AcquireLock(10000);
            //if (!_haveAppDomainLock)
            //{
            //    Log.LogInformation("AppDomainLocker", "Failed to get the lock");

            //    AppDomainLocker.ReleaseLock(forceRelease: true);
            //    _haveAppDomainLock = AppDomainLocker.AcquireLock(0);

            //    if (!_haveAppDomainLock)
            //    {
            //        Log.LogInformation("AppDomainLocker", "Failed to release the lock and get it");
            //    }
            //}
            
            AppDomain.CurrentDomain.DomainUnload += new EventHandler(CurrentDomain_DomainUnload);            

       //     CodeGenerationManager.ValidateCompositeGenerate(startTime);


            lock (_syncRoot)
            {
                if (_systemIsInitialized == true) return;

                ApplicationStartInitialize(Composite.RuntimeInformation.IsDebugBuild);

                _systemIsInitialized = true;
            }
        }
        


        /// <exclude />
        public static void Application_End(object sender, EventArgs e)
        {
            Log.LogVerbose(_verboseLogEntryTitle, "AppDomain {0} ended at {1}", AppDomain.CurrentDomain.Id, DateTime.Now.ToString("HH:mm:ss:ff"));

            if (Composite.Core.Configuration.SystemSetupFacade.IsSystemFirstTimeInitialized == false)
            {
                return;
            }


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

                    CodeGenerationManager.ValidateCompositeGenerate(_startTime);
                    CodeGenerationManager.GenerateCompositeGeneratedAssembly();
                    TempDirectoryFacade.OnApplicationEnd();

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
//                    if (_haveAppDomainLock)
//                    {
//                        try
//                        {
//                            if (AppDomainLocker.AcquireLock(0, false))
//                            {
//                                AppDomainLocker.ReleaseLock();
//                                AppDomainLocker.ReleaseLock();
//                            }
//                            else
//                            {
//#warning MRJ: BM: Cleanup logging here!
//                                Log.LogInformation("AppDomainLocker", "Another AppDomain released the lock for this AppDomain");   
//                            }
//                        }
//                        catch(Exception)
//                        {
//                            // Ignore
//                        }
//                    }
                }
            }

            //System.Threading.Thread.Sleep(10000);
        }


        /// <exclude />
        public static void Application_BeginRequest(object sender, EventArgs e)
        {
            ThreadDataManager.InitializeThroughHttpContext(true);

            if (LogRequestDetails == true)
            {
                // LoggingService.LogVerbose("Begin request", string.Format("{0}", Request.Path));
                HttpContext.Current.Items.Add("Global.asax timer", Environment.TickCount);
            }
        }


        /// <exclude />
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



        /// <exclude />
        public static void Application_Error(object sender, EventArgs e)
        {
            var httpContext = (sender as HttpApplication).Context;
            Exception exception = httpContext.Server.GetLastError();

            if (exception is HttpException && ((HttpException)exception).GetHttpCode() == 404)
            {
                string customPageNotFoundUrl = HostnameBindingsFacade.GetCustomPageNotFoundUrl();

                if (customPageNotFoundUrl != null)
                {
                    string rawUrl = httpContext.Request.RawUrl;

                    if (rawUrl == customPageNotFoundUrl)
                    {
                        throw new HttpException(500, "'Page not found' url isn't handled. Url: '{0}'".FormatWith(rawUrl));
                    }

                    httpContext.Server.ClearError();
                    httpContext.Response.Clear();

                    httpContext.Response.Redirect(customPageNotFoundUrl, true);

                    return;
                }
            }

            if (LogApplicationLevelErrors)
            {
                System.Diagnostics.TraceEventType eventType = System.Diagnostics.TraceEventType.Critical;

                var request = httpContext.Request;
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


        /// <exclude />
        public static string GetVaryByCustomString(HttpContext context, string custom)
        {
            if (custom == "C1Page")
            {
                UrlKind urlKind;
                var pageUrl = PageUrls.UrlProvider.ParseUrl(context.Request.RawUrl, new UrlSpace(context), out urlKind);

                if (pageUrl != null)
                {
                    var page = pageUrl.GetPage();
                    if (page != null)
                    {
                        string pageCacheKey = page.ChangeDate.ToString();

                        if(context.Request.IsSecureConnection)
                        {
                            pageCacheKey += "https";
                        }

                        if(!string.IsNullOrEmpty(pageUrl.PathInfo))
                        {
                            pageCacheKey += pageUrl.PathInfo;
                        }

                        return pageCacheKey;
                    }
                }
                return string.Empty;
            }

            return null;
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

            Routing.Routes.Register();

            HostnameBindingsFacade.Initialize();

            ApplicationStartupFacade.FireSystemInitialized();

            ThreadDataManager.FinalizeThroughHttpContext();
        }


        private static void CurrentDomain_DomainUnload(object sender, EventArgs e)
        {
            Log.LogVerbose(_verboseLogEntryTitle, "AppDomain {0} unloaded at {1}", AppDomain.CurrentDomain.Id, DateTime.Now.ToString("HH:mm:ss:ff"));
           // if (!AppDomainLocker.CurrentAppDomainHasLock) return;
            
            //AppDomainLocker.ReleaseLock(); // This is for VS dev server, it does not always call Application_End :S /MRJ
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

            LoggingService.LogVerbose("RGB(250,50,50)ASP.NET Shut Down", String.Format("_shutDownMessage=\n{0}\n\n_shutDownStack=\n{1}",
                                         shutDownMessage.Replace("\n", "   \n"),
                                         shutDownStack));

        }
    }
}
