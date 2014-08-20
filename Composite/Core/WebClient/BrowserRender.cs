// #define BrowserRender_NoCache

using System;
using System.IO;
using System.Web;
using Composite.C1Console.Events;
using Composite.Core.Application;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.PackageSystem;
using Composite.Data.Plugins.DataProvider.Streams;
using Timer = System.Timers.Timer;
using System.Threading.Tasks;

namespace Composite.Core.WebClient
{
    internal class BrowserRenderException : InvalidOperationException
    {
        public BrowserRenderException(string message)
            : base(message)
        {
        }
    }

    internal static partial class BrowserRender
    {
        private static readonly string CacheImagesFolder = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.CacheDirectory), "PreviewImages");

        static BrowserRender()
        {
            GlobalEventSystemFacade.SubscribeToShutDownEvent(a => ShutdownPhantomJsExeSilent());
            PackageInstaller.OnPackageInstallation += ShutdownPhantomJsExeSilent;

            FileChangeNotificator.Subscribe(PhantomServer.ScriptFilePath, (a, b) => PhantomServer.ShutDown());
        }

        private static Timer _recycleTimer;
        private static DateTime _lastUsageDate = DateTime.MinValue;
        private static readonly TimeSpan RecycleOnIdleInterval = TimeSpan.FromMinutes(9.75);
        private const int RecycleTimerInterval_ms = 10000;

        private static volatile bool Enabled = true;
        private static volatile bool ServerAvailabilityChecked;

        public class RenderingResult
        {
            public string FilePath { get; set; }
            public string Output { get; set; }
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
        /// Renders a url and return a full path to a rendered image, or <value>null</value> when rendering process is failing or inaccessable.
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
            string output;

            if (C1File.Exists(outputImageFileName) || C1File.Exists(outputFileName))
            {
#if BrowserRender_NoCache
                File.Delete(outputFileName);
#else
                if (C1File.Exists(outputFileName))
                {
                    output = C1File.ReadAllText(outputFileName);
                }
                else
                {
                    output = null;
                }

                return new RenderingResult { FilePath = outputImageFileName, Output = output };
#endif
            }

            if (!Enabled)
            {
                return null;
            }

            try
            {
                output = MakePreviewRequest(context, url, outputImageFileName, mode);
            }
            catch (BrowserRenderException ex)
            {
                C1File.WriteAllText(errorFileName, ex.Message);

                throw;
            }

            if (!Enabled && output == null)
            {
                return null;
            }

            C1File.WriteAllText(outputFileName, output);

            return new RenderingResult { FilePath = outputImageFileName, Output = output };
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

        private static string MakePreviewRequest(HttpContext context, string url, string outputFileName, string mode)
        {
            HttpCookie authenticationCookie = context.Request.Cookies[CookieHandler.GetApplicationSpecificCookieName(".CMSAUTH")];

            string output;

            CheckServerAvailability(context, authenticationCookie);

            if (!Enabled)
            {
                return null;
            }

            _lastUsageDate = DateTime.Now;

            try
            {
                PhantomServer.RenderUrl(authenticationCookie, url, outputFileName, mode, out output);
            }
            catch (Exception ex)
            {
                Log.LogWarning("BrowserRenderer", ex);
                throw;
            }

            return output;
        }

        private static void CheckServerAvailability(HttpContext context, HttpCookie authenticationCookie)
        {
            if (ServerAvailabilityChecked) return;

            try
            {
                string testUrl = UrlUtils.Combine(new UrlBuilder(context.Request.Url.ToString()).ServerUrl, UrlUtils.AdminRootPath) + "/blank.aspx";


                SetupRecycleTimer();

                string output;
                string outputFileName = Path.Combine(TempDirectoryFacade.TempDirectoryPath, "phantomtest.png");

                PhantomServer.RenderUrl(authenticationCookie, testUrl, outputFileName, "test", out output);
            }
            catch (Exception ex)
            {
                Log.LogWarning("BrowserRender", "PhantomJs server unable to complete HTTP requests, preventing C1 Function preview images from being generated. " + Environment.NewLine + ex);
                Enabled = false;

                PhantomServer.ShutDown();
            }
            finally
            {
                ServerAvailabilityChecked = true;
            }
        }


        private static void ShutdownPhantomJsExeSilent()
        {
            Enabled = false;
            try
            {
                PhantomServer.ShutDown();
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

            var timer = new Timer(RecycleTimerInterval_ms);
            timer.AutoReset = true;
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

            PhantomServer.ShutDown();
        }
    }
}
