using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Hosting;
using Composite.C1Console.Events;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;

namespace Composite.Core.WebClient
{
    internal static class BrowserRender
    {
        private static readonly string ImagesDropFolder = PathUtil.Resolve(GlobalSettingsFacade.TempDirectory);

        static BrowserRender()
        {
            GlobalEventSystemFacade.SubscribeToShutDownEvent(a =>
            {
                lock (_syncRoot)
                {
                    if (_server != null)
                    {
                        _server.Dispose();
                        _server = null;
                    }
                }
            });
        }

        private static readonly object _syncRoot = new object();
        private static PhantomServer _server;

        public static string RenderUrl(HttpContext context, string url)
        {
            string tempFileName = "functionPreview" + url.GetHashCode() + ".png";
            string tempFilePath = Path.Combine(ImagesDropFolder, tempFileName);

            if (File.Exists(tempFilePath))
            {
                return tempFilePath;
            }


            HttpCookie authenticationCookie = context.Request.Cookies[CookieHandler.GetApplicationSpecificCookieName(".CMSAUTH")];

            lock (_syncRoot)
            {
                if (_server == null)
                {
                    _server = new PhantomServer();
                }

                try
                {
                    return _server.RenderUrl(authenticationCookie, url, tempFilePath);
                }
                catch (Exception)
                {
                    if (_server.HasCrashed())
                    {
                        _server.Dispose();
                        _server = null;
                    }

                    throw;
                }
            }
        }

        private class PhantomServer : IDisposable
        {
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
                _process.StartInfo.Arguments = "renderingServer.js";
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

                _stdin.WriteLine(cookieInfo + "|" + url + "|" + tempFilePath);

                string output = _stdout.ReadLine();

                if (!File.Exists(tempFilePath))
                {
                    throw new InvalidOperationException(output);
                }

                return tempFilePath;
            }

            public bool HasCrashed()
            {
                return !_process.HasExited;
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

                string error;

                if (!_process.HasExited)
                {
                    _stdin.WriteLine("exit");
                    error = _stderror.ReadToEnd();

                    _stdin.Close();
                    _stdout.Close();
                    _stderror.Close();
                }
                else
                {
                    error = _stderror.ReadToEnd();
                }

                _stdin.Dispose();
                _stdout.Dispose();
                _stderror.Dispose();

                int exitCode = _process.ExitCode;

                _process.Dispose();

                if (exitCode != 0)
                {
                    throw new InvalidOperationException("Error executing PhantomJs.exe. Exit code: {0}, error: '{1}'".FormatWith(exitCode, error));
                }
            }
        }
    }
}
