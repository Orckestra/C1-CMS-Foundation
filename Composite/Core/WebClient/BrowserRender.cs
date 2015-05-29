// #define BrowserRender_NoCache

using System;
using System.IO;
using System.Web;
using Composite.C1Console.Events;
using Composite.Core.Application;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.PackageSystem;
using Composite.Core.Parallelization;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Plugins.Security.LoginSessionStores.HttpContextBasedLoginSessionStore;
using Timer = System.Timers.Timer;
using System.Threading.Tasks;

namespace Composite.Core.WebClient
{
    internal static partial class BrowserRender
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
        private const int EnsureReadinessDelay_ms = 3000;

        private static volatile bool Enabled = true;
        private static volatile bool ServerAvailabilityChecked;
        private static readonly AsyncLock _serverAvailabilityCheckLock = new AsyncLock();

        public enum RenderingResultStatus
        {
            Success = 0,
            Redirect = 1,
            Error = 2,
            Timeout = 3,
            PhantomServerTimeout = 4,
            PhantomServerIncorrectResponse = 5
        }

        public class RenderingResult
        {
            public RenderingResultStatus Status { get; set; }
            public string FilePath { get; set; }
            public string Output { get; set; }
            public string RedirectUrl { get; set; }
        }

        /// <summary>
        /// Ensures that the BrowserRenderer service is launched, without blocking the current thread
        /// </summary>
        public static void EnsureReadiness()
        {
            _lastUsageDate = DateTime.Now;
            if (ServerAvailabilityChecked) return;

            var context = HttpContext.Current;

            HttpCookie authenticationCookie = GetAuthenticationCooke(context);
            Task.Factory.StartNew(async () =>
            {
                await Task.Delay(EnsureReadinessDelay_ms);
                await CheckServerAvailabilityAsync(context, authenticationCookie);
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
            string errorFileName = Path.Combine(dropFolder, urlHash + ".error");

            if (C1File.Exists(outputImageFileName) || C1File.Exists(outputFileName))
            {
#if BrowserRender_NoCache
                File.Delete(outputFileName);
#else
                string output = C1File.Exists(outputFileName) ? C1File.ReadAllText(outputFileName) : null;

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
                C1File.WriteAllText(errorFileName, result.Output);
            }

            if (!Enabled)
            {
                return null;
            }

            if (result.Status == RenderingResultStatus.Success)
            {
                C1File.WriteAllText(outputFileName, result.Output);
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
            var authenticationCookie = GetAuthenticationCooke(context);
            await CheckServerAvailabilityAsync(context, authenticationCookie);

            if (!Enabled)
            {
                return null;
            }

            _lastUsageDate = DateTime.Now;

            return await PhantomServer.RenderUrlAsync(authenticationCookie, url, outputFileName, mode);
        }

        private static HttpCookie GetAuthenticationCooke(HttpContext context)
        {
            // TODO: generate a short life cookie
            string authenticationCookieName = CookieHandler.GetApplicationSpecificCookieName(HttpContextBasedLoginSessionStore.AuthCookieName);

            return context.Request.Cookies[authenticationCookieName];
        }


        private static bool SystemFullyOnline
        {
            get
            {
                return (ApplicationOnlineHandlerFacade.IsApplicationOnline && GlobalInitializerFacade.SystemCoreInitialized && !GlobalInitializerFacade.SystemCoreInitializing && SystemSetupFacade.IsSystemFirstTimeInitialized);
            }
        }


        private static async Task CheckServerAvailabilityAsync(HttpContext context, HttpCookie authenticationCookie)
        {
            if (ServerAvailabilityChecked || authenticationCookie == null) return;

            using (await _serverAvailabilityCheckLock.LockAsync())
            {
                if (ServerAvailabilityChecked) return;

                if (!SystemFullyOnline) return;

                try
                {
                    string testUrl = UrlUtils.Combine(new UrlBuilder(context.Request.Url.ToString()).ServerUrl, UrlUtils.PublicRootPath);

                    SetupRecycleTimer();

                    string outputFileName = Path.Combine(TempDirectoryFacade.TempDirectoryPath, "phantomtest.png");

                    await PhantomServer.RenderUrlAsync(authenticationCookie, testUrl, outputFileName, "test");
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
