// #define BrowserRender_NoCache

using System;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Hosting;
using Composite.C1Console.Events;
using Composite.Core.Application;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.PackageSystem;
using Composite.Core.Parallelization;
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

    internal static class BrowserRender
    {
        private static readonly string CacheImagesFolder = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.CacheDirectory), "PreviewImages");

        static BrowserRender()
        {
            GlobalEventSystemFacade.SubscribeToShutDownEvent(a => ShutdownPhantomJsExeSilent());
            PackageInstaller.OnPackageInstallation += ShutdownPhantomJsExeSilent;

            FileChangeNotificator.Subscribe(PhantomServer.ScriptFilePath, (a, b)  => RecyclePhantomJsExe());
        }

        private static readonly AsyncLock _requestAsyncLock = new AsyncLock();
        private static readonly ConcurrentDictionary<string, object> _clearCacheSyncRoots = new ConcurrentDictionary<string, object>();
        private static PhantomServer _server;
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

        private static string GetCacheFolder(string mode)
        {
            return CacheImagesFolder + "\\" + mode;
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
        /// Renders a url and return a full path to a rendered image
        /// </summary>
        public static async Task<RenderingResult> RenderUrl(HttpContext context, string url, string mode)
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
                
                return new RenderingResult { FilePath = outputImageFileName, Output = output};
#endif
            }

            if (!Enabled)
            {
                return null;
            }

            try
            {
                output = await MakePreviewRequest(context, url, outputImageFileName, mode);
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

        private static async Task<string> MakePreviewRequest(HttpContext context, string url, string outputFileName, string mode)
        {
            HttpCookie authenticationCookie = context.Request.Cookies[CookieHandler.GetApplicationSpecificCookieName(".CMSAUTH")];

            string output;

            using(await _requestAsyncLock.LockAsync())
            {
                CheckServerAvailability(context, authenticationCookie);

                if (!Enabled)
                {
                    return null;
                }

                if (_server == null)
                {
                    _server = new PhantomServer();
                    SetupRecycleTimer();
                }
                else
                {
                    // Recycling PhantomJS if it isn't available for 15 seconds
                    bool available = await _server.OutputLock.WaitAsync(15 * 1000);
                    if (available)
                    {
                        _server.OutputLock.Release();
                    }
                    else
                    {
                        _server.Dispose();
                        _server = null;
                        _server = new PhantomServer();
                    }
                }

                _lastUsageDate = DateTime.Now;

                try
                {
                    _server.RenderUrl(authenticationCookie, url, outputFileName, mode, out output);
                }
                catch (Exception)
                {
                    if (_server.HasCrashed())
                    {
                        Log.LogWarning("BrowserRenderer", "PhantomJs server crashed.");
                        _server = null;
                    }

                    throw;
                }
            }

            return output;
        }

        private static void CheckServerAvailability(HttpContext context, HttpCookie authenticationCookie)
        {
            if (ServerAvailabilityChecked) return;

            try
            {
                string testUrl = UrlUtils.Combine(new UrlBuilder(context.Request.Url.ToString()).ServerUrl, UrlUtils.AdminRootPath) + "/blank.aspx";

                _server = new PhantomServer();
                SetupRecycleTimer();

                string output;
                string outputFileName = Path.Combine(TempDirectoryFacade.TempDirectoryPath, "phantomtest.png");

                _server.RenderUrl(authenticationCookie, testUrl, outputFileName, "test", out output);
            }
            catch (Exception ex)
            {
                Log.LogWarning("BrowserRender", "PhantomJs server unable to complete HTTP requests, preventing C1 Function preview images from being generated. " + Environment.NewLine + ex);
                Enabled = false;

                if (_server != null)
                {
                    try
                    {
                        _server.Dispose();
                    }
                    catch
                    {
                    }
                
                    _server = null;
                }
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
                RecyclePhantomJsExe();
            }
            catch
            {
            }
        }

        private static void RecyclePhantomJsExe()
        {
            using (_requestAsyncLock.Lock())
            {
                RecyclePhantomJsExeNoLock();
            }
        }

        private static void RecyclePhantomJsExeNoLock()
        {
            if (_server != null)
            {
                _server.Dispose();
                _server = null;
            }
        }

        public static void ClearCache(string renderingMode)
        {
            var folder = GetCacheFolder(renderingMode);

            if (C1Directory.Exists(folder))
            {
                Task.Run(() => ClearCacheInt(folder));
            }
        }

        private static void ClearCacheInt(string folder)
        {
            object syncRoot = _clearCacheSyncRoots.GetOrAdd(folder, _ => new object());

            bool entered = false;

            try
            {
                Monitor.TryEnter(syncRoot, 0, ref entered);
                if (!entered)
                {
                    return;
                }

                using (_requestAsyncLock.Lock())
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
            }
            finally
            {
                if (entered)
                {
                    Monitor.Exit(syncRoot);
                }
            }
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
            if (_server == null || DateTime.Now - _lastUsageDate < RecycleOnIdleInterval)
            {
                return;
            }

            bool lockTaken = false;
            try
            {
                lockTaken = _requestAsyncLock.Wait(0);

                if (lockTaken)
                {
                    RecyclePhantomJsExeNoLock();
                }
            }
            finally
            {
                if (lockTaken)
                {
                    _requestAsyncLock.Release();
                }
            }
        }


        private class PhantomServer : IDisposable
        {
            const string ConfigFileName = "config.json";
            const string ScriptFileName = "renderingServer.js";
            static readonly string _phantomJsFolder = HostingEnvironment.MapPath("~/App_Data/Composite/PhantomJs");
            static readonly string _phantomJsPath = Path.Combine(_phantomJsFolder, "phantomjs.exe");
            

            private readonly StreamWriter _stdin;
            private readonly StreamReader _stdout;
            private readonly StreamReader _stderror;

            private readonly Process _process;
            private readonly Job _job;

            public readonly AsyncLock OutputLock = new AsyncLock();

            [SuppressMessage("Composite.IO", "Composite.DotNotUseStreamWriterClass:DotNotUseStreamWriterClass")]
            public PhantomServer()
            {
                _process = new Process();

                _process.StartInfo.WorkingDirectory = _phantomJsFolder;
                _process.StartInfo.FileName = "\"" + _phantomJsPath + "\"";
                _process.StartInfo.Arguments = string.Format("--config={0} {1}", ConfigFileName, ScriptFileName);
                _process.StartInfo.RedirectStandardOutput = true;
                _process.StartInfo.RedirectStandardError = true;
                _process.StartInfo.RedirectStandardInput = true;
                _process.StartInfo.CreateNoWindow = true;
                _process.StartInfo.StandardOutputEncoding = Encoding.UTF8;
                _process.StartInfo.UseShellExecute = false;
                _process.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
                _process.Start();

                _stdin = _process.StandardInput;
                _stdout = _process.StandardOutput;
                _stderror = _process.StandardError;
                _stdin.AutoFlush = true;

                _job = new Job();
                _job.AddProcess(_process.Handle);
            }

            public void RenderUrl(HttpCookie authenticationCookie, string url, string tempFilePath, string mode, out string output)
            {
                Verify.ArgumentNotNull(authenticationCookie, "authenticationCookie");

                string cookieDomain = new Uri(url).Host;
                string cookieInfo = authenticationCookie.Name + "," + authenticationCookie.Value + "," + cookieDomain;

                string requestLine = cookieInfo + "|" + url + "|" + tempFilePath + "|" + mode;

                _stdin.WriteLine(requestLine);

                Task<string> readerTask = Task.Factory.StartNew(() =>
                {
                    using (OutputLock.Lock())
                    {
                        return _stdout.ReadLine();
                    }
                });

                double timeout = (DateTime.Now - _process.StartTime).TotalSeconds < 60 ? 30 : 6;

                readerTask.Wait(TimeSpan.FromSeconds(timeout));
                switch (readerTask.Status)
                {
                    case TaskStatus.RanToCompletion:
                        output = readerTask.Result;
                        break;
                    default:
                        // nuke the exe process here - stuff is likely fucked up.
                        throw new BrowserRenderException(Environment.NewLine + "Request failed to complete within expected time: " + requestLine);
                }


                if (!C1File.Exists(tempFilePath))
                {
                    if (output == null)
                    {
                        output = _stderror.ReadToEnd();
                    }

                    throw new BrowserRenderException(output + Environment.NewLine + "Request: " + requestLine);
                }
            }

            public bool HasCrashed()
            {
                try
                {
                    return _process.HasExited;
                }
                catch (Exception)
                {
                    return true;                
                }
            }

            public static string ScriptFilePath
            {
                get { return Path.Combine(_phantomJsFolder, ScriptFileName); }
            }

            public void Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }

            ~PhantomServer()
            {
                // Finalizer calls Dispose(false)
                Dispose(false);
            }

            void Dispose(bool disposing)
            {
                if (!disposing)
                {
                    return;
                }

                string output;
                string error;

                bool proccessHasExited = true;

                try
                {
                    proccessHasExited = _process.HasExited;
                }
                catch (Exception)
                {
                    proccessHasExited = true;
                }

                if (!proccessHasExited)
                {
                    _stdin.WriteLine("exit");
                    output = _stdout.ReadToEnd();
                    error = _stderror.ReadToEnd();

                    _stdin.Close();
                    _stdout.Close();
                    _stderror.Close();
                }
                else
                {
                    output = _stdout.ReadToEnd();
                    error = _stderror.ReadToEnd();
                }

                _stdin.Dispose();
                _stdout.Dispose();
                _stderror.Dispose();

                int exitCode = _process.ExitCode;

                _process.Dispose();
                _job.Dispose();

                if (exitCode != 0)
                {
                    throw new InvalidOperationException("Error executing PhantomJs.exe. Exit code: {0}, output: '{1}', error: '{2}'".FormatWith(exitCode, output, error));
                }
            }
        }
    }
}
