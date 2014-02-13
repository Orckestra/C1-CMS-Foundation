//#define BrowserRender_NoCache

using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Hosting;
using Composite.C1Console.Events;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.PackageSystem;
using Composite.Data.Plugins.DataProvider.Streams;
using Timer = System.Timers.Timer;

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
        private static readonly string ImagesDropFolder = PathUtil.Resolve(GlobalSettingsFacade.TempDirectory);

        static BrowserRender()
        {
            GlobalEventSystemFacade.SubscribeToShutDownEvent(a => RecyclePhantomJsExe());
            PackageInstaller.OnPackageInstallation += RecyclePhantomJsExe;

            FileChangeNotificator.Subscribe(PhantomServer.ScriptFilePath, (a, b)  => RecyclePhantomJsExe());
        }

        private static readonly object _syncRoot = new object();
        private static PhantomServer _server;
        private static Timer _recycleTimer;
        private static DateTime _lastUsageDate = DateTime.MinValue;
        private static readonly TimeSpan RecycleOnIdleInterval = TimeSpan.FromMinutes(10.0);
        private const int RecycleTimerInterval_ms = 10000;


        public static string RenderUrl(HttpContext context, string url)
        {
            string tempFileName = "functionPreview" + url.GetHashCode() + ".png";
            string tempFilePath = Path.Combine(ImagesDropFolder, tempFileName);

            if (File.Exists(tempFilePath))
            {
#if BrowserRender_NoCache
                File.Delete(tempFileName);
#else
                return tempFilePath;
#endif
            }


            HttpCookie authenticationCookie = context.Request.Cookies[CookieHandler.GetApplicationSpecificCookieName(".CMSAUTH")];

            lock (_syncRoot)
            {
                if (_server == null)
                {
                    _server = new PhantomServer();
                    SetupRecycleTimer();
                }

                _lastUsageDate = DateTime.Now;

                try
                {
                    return _server.RenderUrl(authenticationCookie, url, tempFilePath);
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
        }


        private static void RecyclePhantomJsExe()
        {
            lock (_syncRoot)
            {
                if (_server != null)
                {
                    _server.Dispose();
                    _server = null;
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
                Monitor.TryEnter(_syncRoot, 0, ref lockTaken);

                if (lockTaken)
                {
                    RecyclePhantomJsExe();
                }
            }
            finally
            {
                if (lockTaken)
                {
                    Monitor.Exit(_syncRoot);
                }
            }
        }


        private class PhantomServer : IDisposable
        {
            const string ScriptFileName = "renderingServer.js";
            static readonly string _phantomJsFolder = HostingEnvironment.MapPath("~/App_Data/Composite/PhantomJs");
            static readonly string _phantomJsPath = Path.Combine(_phantomJsFolder, "phantomjs.exe");
            

            private readonly StreamWriter _stdin;
            private readonly StreamReader _stdout;
            private readonly StreamReader _stderror;

            private readonly Process _process;

            public PhantomServer()
            {
                _process = new Process();
                _process.StartInfo.WorkingDirectory = _phantomJsFolder;
                _process.StartInfo.FileName = "\"" + _phantomJsPath + "\"";
                _process.StartInfo.Arguments = ScriptFileName;
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
            }

            public string RenderUrl(HttpCookie authenticationCookie, string url, string tempFilePath)
            {
                string cookieDomain = new Uri(url).Host;
                string cookieInfo = authenticationCookie.Name + "," + authenticationCookie.Value + "," + cookieDomain;

                string requestLine = cookieInfo + "|" + url + "|" + tempFilePath;

                _stdin.WriteLine(requestLine);

                string output = _stdout.ReadLine();

                if (!File.Exists(tempFilePath))
                {
                    if (output == null)
                    {
                        output = _stderror.ReadToEnd();
                    }

                    throw new BrowserRenderException(output);
                }

                return tempFilePath;
            }

            public bool HasCrashed()
            {
                return _process.HasExited;
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

                if (!_process.HasExited)
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

                if (exitCode != 0)
                {
                    throw new InvalidOperationException("Error executing PhantomJs.exe. Exit code: {0}, output: '{1}', error: '{2}'".FormatWith(exitCode, output, error));
                }
            }
        }
    }
}
