// #define BrowserRender_NoCache

using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using Composite.C1Console.Events;
using Composite.Core.Application;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.PackageSystem;
using Composite.Core.Parallelization;
using Composite.Data.Plugins.DataProvider.Streams;
using Timer = System.Timers.Timer;
using System.Threading.Tasks;
using Composite.Core.WebClient.PhantomJs;

namespace Composite.Core.WebClient
{
    internal static class BrowserRender
    {
        private static readonly string LogTitle = typeof (BrowserRender).Name;
        private static readonly string CacheImagesFolder = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.CacheDirectory), "PreviewImages");

        static BrowserRender()
        {
            GlobalEventSystemFacade.SubscribeToShutDownEvent(a => ShutdownPhantomJsExeSilent());
            PackageInstaller.OnPackageInstallation += ShutdownPhantomJsExeSilent;

            FileChangeNotificator.Subscribe(PhantomServer.ScriptFilePath, (a, b) => PhantomServer.ShutDown(false));
        }

        private static Timer _recycleTimer;
        private static DateTime _lastUsageDate = DateTime.MinValue;
        private static readonly TimeSpan RecycleOnIdleInterval = TimeSpan.FromSeconds(30); 
        private const int RecycleTimerInterval_ms = 10000;
        private const int EnsureReadinessDelay_ms = 30000;

        private static volatile bool Enabled = true;
        private static volatile bool ServerAvailabilityChecked;
        private static readonly AsyncLock _serverAvailabilityCheckLock = new AsyncLock();

        /// <summary>
        /// Ensures that the BrowserRenderer service is launched, without blocking the current thread
        /// </summary>
        public static void EnsureReadiness()
        {
            if (!GlobalSettingsFacade.FunctionPreviewEnabled) return;

            _lastUsageDate = DateTime.Now;
            if (ServerAvailabilityChecked) return;

            var context = HttpContext.Current;

            HttpCookie[] cookies = GetAuthenticationCookies(context);
            Task.Factory.StartNew(async () =>
            {
                const int delaySlice = 500;
                for (int i = 0; i < EnsureReadinessDelay_ms / delaySlice; i++)
                {
                    if (!SystemFullyOnline) return;
                    await Task.Delay(delaySlice);
                }
                
                await CheckServerAvailabilityAsync(context, cookies);
            });
        }


        public static DateTime GetLastCacheUpdateTime(string mode)
        {
            string folderPath = GetCacheFolder(mode);

            if (!C1Directory.Exists(folderPath))
            {
                C1Directory.CreateDirectory(folderPath);
            }

            return C1Directory.GetCreationTime(folderPath);
        }

        /// <summary>
        /// Renders a url and return a full path to a rendered image, or <value>null</value> when rendering process is failing or inaccessible.
        /// </summary>
        public static async Task<RenderingResult> RenderUrlAsync(HttpContext context, string url, string mode)
        {
            string dropFolder = GetCacheFolder(mode);

            if (!C1Directory.Exists(dropFolder))
            {
                C1Directory.CreateDirectory(dropFolder);
            }
            string urlHash = Convert.ToBase64String(BitConverter.GetBytes(url.GetHashCode())).Substring(0, 6).Replace('+', '-').Replace('/', '_');

            string outputImageFileName = Path.Combine(dropFolder, urlHash + ".png");
            string outputFileName = Path.Combine(dropFolder, urlHash + ".output");
            string redirectLogFileName = Path.Combine(dropFolder, urlHash + ".redirect");
            string errorFileName = Path.Combine(dropFolder, urlHash + ".error");

            if (C1File.Exists(outputImageFileName) || C1File.Exists(outputFileName))
            {
#if BrowserRender_NoCache
                File.Delete(outputFileName);
#else
                string[] output = C1File.Exists(outputFileName) ? C1File.ReadAllLines(outputFileName) : null;

                return new RenderingResult { FilePath = outputImageFileName, Output = output, Status = RenderingResultStatus.Success};
#endif
            }

            if (!Enabled)
            {
                return null;
            }

            var result = await MakePreviewRequestAsync(context, url, outputImageFileName, mode);

            if (result.Status >= RenderingResultStatus.Error)
            {
                C1File.WriteAllLines(errorFileName, result.Output);
            }

            if (!Enabled)
            {
                return null;
            }

            if (result.Status == RenderingResultStatus.Success)
            {
                C1File.WriteAllLines(outputFileName, result.Output);
            }
            else if (result.Status == RenderingResultStatus.Redirect)
            {
                C1File.WriteAllLines(redirectLogFileName, result.Output);
            }

            return result;
        }


        public static void ClearCache(string renderingMode)
        {
            var folder = GetCacheFolder(renderingMode);

            if (C1Directory.Exists(folder))
            {
                Task.Run(() => ClearCacheInt(folder));
            }
        }



        private static string GetCacheFolder(string mode)
        {
            return CacheImagesFolder + "\\" + mode;
        }

        private static async Task<RenderingResult> MakePreviewRequestAsync(HttpContext context, string url, string outputFileName, string mode)
        {
            var cookies = GetAuthenticationCookies(context);
            await CheckServerAvailabilityAsync(context, cookies);

            if (!Enabled)
            {
                return null;
            }

            _lastUsageDate = DateTime.Now;

            return await PhantomServer.RenderUrlAsync(cookies, url, outputFileName, mode);
        }

        private static HttpCookie[] GetAuthenticationCookies(HttpContext context)
        {
            var allCookies = context.Request.Cookies;
            var result = new List<HttpCookie>();

            foreach (string cookieName in allCookies)
            {
                var cookie = allCookies[cookieName];
                result.Add(cookie);
            }

            return result.ToArray();
        }


        private static bool SystemFullyOnline => 
            ApplicationOnlineHandlerFacade.IsApplicationOnline 
            && GlobalInitializerFacade.SystemCoreInitialized 
            && !GlobalInitializerFacade.SystemCoreInitializing 
            && SystemSetupFacade.IsSystemFirstTimeInitialized;


        private static async Task CheckServerAvailabilityAsync(HttpContext context, HttpCookie[] cookies)
        {
            if (ServerAvailabilityChecked || cookies == null) return;

            using (await _serverAvailabilityCheckLock.LockAsync())
            {
                if (ServerAvailabilityChecked) return;

                if (!SystemFullyOnline) return;

                try
                {
                    string testUrl = UrlUtils.Combine(new UrlBuilder(context.Request.Url.ToString()).ServerUrl, UrlUtils.PublicRootPath);

                    SetupRecycleTimer();

                    string outputFileName = Path.Combine(TempDirectoryFacade.TempDirectoryPath, "phantomtest.png");

                    var result = await PhantomServer.RenderUrlAsync(cookies, testUrl, outputFileName, "test");

                    if (result.Status == RenderingResultStatus.PhantomServerTimeout
                        || result.Status == RenderingResultStatus.PhantomServerIncorrectResponse
                        || result.Status == RenderingResultStatus.PhantomServerNoOutput)
                    {
                        Enabled = false;
                        Log.LogWarning(LogTitle, "The function preview feature will be turned off as PhantomJs server failed to complete a test HTTP request");
                    }
                }
                catch (Exception ex)
                {
                    Log.LogWarning(LogTitle, "PhantomJs server unable to complete HTTP requests, preventing C1 Function preview images from being generated. " + Environment.NewLine + ex);
                    Enabled = false;

                    PhantomServer.ShutDown(false);
                }
                finally
                {
                    ServerAvailabilityChecked = true;
                }
            }
        }


        private static void ShutdownPhantomJsExeSilent()
        {
            Enabled = false;
            try
            {
                PhantomServer.ShutDown(false, true);
            }
            catch
            {
            }
        }


        private static void ClearCacheInt(string folder)
        {
            foreach (var file in C1Directory.GetFiles(folder, "*.*"))
            {
                try
                {
                    C1File.Delete(file);
                }
                catch
                {
                }
            }

            C1Directory.SetCreationTime(folder, DateTime.Now);
        }


        private static void SetupRecycleTimer()
        {
            if (_recycleTimer != null) return;

            var timer = new Timer(RecycleTimerInterval_ms) {AutoReset = true};
            timer.Elapsed += (a, b) => RecycleIfNotUsed();
            timer.Start();

            _recycleTimer = timer;
        }


        private static void RecycleIfNotUsed()
        {
            if (DateTime.Now - _lastUsageDate < RecycleOnIdleInterval)
            {
                return;
            }

            PhantomServer.ShutDown(false);
        }
    }
}
