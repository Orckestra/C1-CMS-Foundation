using System;
using System.Globalization;
using System.Web;
using Composite.C1Console.Events;
using Composite.Core.Application;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.Instrumentation;
using Composite.Core.Logging;
using Composite.Core.Routing;
using Composite.Core.Threading;
using Composite.Core.Types;
using System.Diagnostics;


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
        private static DateTime _startTime;
        private static bool _systemIsInitialized = false;

        /// <exclude />
        public static bool LogRequestDetails { get; set; }

        /// <exclude />
        public static bool LogApplicationLevelErrors { get; set; }


        

        /// <exclude />
        public static void Application_Start(object sender, EventArgs e)
        {
            _startTime = DateTime.Now;
            if (RuntimeInformation.IsDebugBuild)
            {
                Log.LogInformation(_verboseLogEntryTitle, "AppDomain {0} started at {1} in process {2}", AppDomain.CurrentDomain.Id, _startTime.ToString("HH:mm:ss:ff"), Process.GetCurrentProcess().Id);
            }

            SystemSetupFacade.SetFirstTimeStart();

            if (!SystemSetupFacade.IsSystemFirstTimeInitialized)
            {
                return;
            }

            if (_systemIsInitialized)
            {
                return;
            }

            if (AppDomain.CurrentDomain.BaseDirectory.Length > GlobalSettingsFacade.MaximumRootPathLength)
            {
                throw new InvalidOperationException("Windows limitation problem detected! You have installed the website at a place where the total path length of the file with the longest filename exceeds the maximum allowed in Windows. See http://msdn.microsoft.com/en-us/library/aa365247%28VS.85%29.aspx#paths");
            }

            
            AppDomain.CurrentDomain.DomainUnload += CurrentDomain_DomainUnload;


            lock (_syncRoot)
            {
                if (_systemIsInitialized) return;

                ApplicationStartInitialize(RuntimeInformation.IsDebugBuild);

                _systemIsInitialized = true;
            }
        }
        


        /// <exclude />
        public static void Application_End(object sender, EventArgs e)
        {
            if (RuntimeInformation.IsDebugBuild)
            {
                Log.LogInformation(_verboseLogEntryTitle, "AppDomain {0} ended at {1} in process {2}", AppDomain.CurrentDomain.Id, DateTime.Now.ToString("HH:mm:ss:ff"), Process.GetCurrentProcess().Id);
            }

            if (!SystemSetupFacade.IsSystemFirstTimeInitialized)
            {
                return;
            }


            using (ThreadDataManager.Initialize())
            {
                try
                {
                    CodeGenerationManager.ValidateCompositeGenerate(_startTime);
                    CodeGenerationManager.GenerateCompositeGeneratedAssembly();
                }
                catch (Exception ex)
                {
                    Log.LogCritical("Global.asax", "Error updating Composite.Generated.dll");
                    Log.LogCritical("Global.asax", ex);
                }               

                try
                {
                    GlobalEventSystemFacade.PrepareForShutDown();
                    if (RuntimeInformation.IsDebugBuild)
                    {
                        LogShutDownReason();
                    }
                    GlobalEventSystemFacade.ShutDownTheSystem();
                    
                    TempDirectoryFacade.OnApplicationEnd();
                }
                catch (Exception ex)
                {
                    Log.LogCritical("Global.asax", ex);

                    throw;
                }

                Log.LogVerbose("Global.asax", string.Format("--- Web Application End, {0} Id = {1}---",
                              DateTime.Now.ToLongTimeString(),
                              AppDomain.CurrentDomain.Id));
            }
        }


        /// <exclude />
        public static void Application_BeginRequest(object sender, EventArgs e)
        {
            ThreadDataManager.InitializeThroughHttpContext(true);

            if (LogRequestDetails)
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
                if (LogRequestDetails && HttpContext.Current.Items.Contains("Global.asax timer"))
                {
                    int startTimer = (int)HttpContext.Current.Items["Global.asax timer"];
                    string requesrPath = HttpContext.Current.Request.Path;
                    Log.LogVerbose("End request", string.Format("{0} - took {1} ms", requesrPath, (Environment.TickCount - startTimer)));
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
            var httpApplication = (sender as HttpApplication);
            Exception exception = httpApplication.Server.GetLastError();

            TraceEventType eventType = TraceEventType.Error;

            var httpContext = httpApplication.Context;

            if (httpContext != null)
            {
                bool is404 = (exception is HttpException && ((HttpException)exception).GetHttpCode() == 404);

                if (is404)
                {
                    string customPageNotFoundUrl = HostnameBindingsFacade.GetCustomPageNotFoundUrl();

                    if (!customPageNotFoundUrl.IsNullOrEmpty())
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

                    eventType = TraceEventType.Verbose;
                }

                // Logging request url
                if (LogApplicationLevelErrors)
                {
                    HttpRequest request = null;

                    try
                    {
                        request = httpContext.Request;
                    }
                    catch
                    {
                        // Request may not be available at this point
                    }

                    if (request != null)
                    {
                        LoggingService.LogEntry("Application Error",
                                            "Failed to process '{0}' request to url '{1}'"
                                            .FormatWith(request.RequestType, request.RawUrl),
                                            LoggingService.Category.General, eventType);
                    }
                }
            }

            if (LogApplicationLevelErrors)
            {
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
                string rawUrl = context.Request.RawUrl;

                UrlKind urlKind;
                var pageUrl = PageUrls.UrlProvider.ParseUrl(rawUrl, new UrlSpace(context), out urlKind);

                if (pageUrl != null)
                {
                    var page = pageUrl.GetPage();
                    if (page != null)
                    {
                        string pageCacheKey = page.ChangeDate.ToString(CultureInfo.InvariantCulture);

                        // Adding the relative path from RawUrl as a part of cache key to make ASP.NET cache respect casing of urls
                        pageCacheKey += new UrlBuilder(rawUrl).RelativeFilePath;

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


        /// <exclude />
        public static void ApplicationStartInitialize(bool displayDebugInfo = false)
        {
            ThreadDataManager.InitializeThroughHttpContext();

            if (displayDebugInfo)
            {
                Log.LogVerbose("Global.asax", "--- Web Application Start, {0} Id = {1} ---", DateTime.Now.ToLongTimeString(), AppDomain.CurrentDomain.Id);
            }

            PerformanceCounterFacade.SystemStartupIncrement();
            ApplicationStartupFacade.FireBeforeSystemInitialize();

            TempDirectoryFacade.OnApplicationStart();

            HostnameBindingsFacade.Initialize();

            ApplicationStartupFacade.FireSystemInitialized();

            ThreadDataManager.FinalizeThroughHttpContext();
        }



        private static void CurrentDomain_DomainUnload(object sender, EventArgs e)
        {
            if (RuntimeInformation.IsDebugBuild)
            {
                Log.LogInformation(_verboseLogEntryTitle, "AppDomain {0} unloaded at {1}", AppDomain.CurrentDomain.Id, DateTime.Now.ToString("HH:mm:ss:ff"));
            }
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
                Log.LogWarning("ASP.NET Shut Down", "Unable to determine cause of shut down");
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

            Log.LogVerbose("RGB(250,50,50)ASP.NET Shut Down", String.Format("_shutDownMessage=\n{0}\n\n_shutDownStack=\n{1}",
                                         shutDownMessage.Replace("\n", "   \n"),
                                         shutDownStack));

        }
    }
}
