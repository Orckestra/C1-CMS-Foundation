using System;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using Composite.Core.Application;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Parallelization;

namespace Composite.Core.WebClient 
{
    internal static partial class BrowserRender
    {
        /// <summary> 
        /// Contains information about currently running instance of a PhantomJS server
        /// </summary>
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

            private static PhantomServer _instance;
            private static readonly AsyncLock _instanceAsyncLock = new AsyncLock();

            [SuppressMessage("Composite.IO", "Composite.DotNotUseStreamWriterClass:DotNotUseStreamWriterClass")]
            private PhantomServer()
            {
                _process = new Process
                {
                    StartInfo =
                    {
                        WorkingDirectory = _phantomJsFolder,
                        FileName = "\"" + _phantomJsPath + "\"",
                        Arguments = string.Format("--config={0} {1}", ConfigFileName, ScriptFileName),
                        RedirectStandardOutput = true,
                        RedirectStandardError = true,
                        RedirectStandardInput = true,
                        CreateNoWindow = true,
                        StandardOutputEncoding = Encoding.UTF8,
                        UseShellExecute = false,
                        WindowStyle = ProcessWindowStyle.Hidden
                    }
                };

                _process.Start();

                _stdin = _process.StandardInput;
                _stdout = _process.StandardOutput;
                _stderror = _process.StandardError;
                _stdin.AutoFlush = true;

                _job = new Job();
                _job.AddProcess(_process.Handle);
            }


            public static void ShutDown(bool alreadyLocked, bool silent = false)
            {
                PhantomServer ps;

                using (alreadyLocked ? null : _instanceAsyncLock.Lock())
                {
                    if (_instance == null)
                    {
                        return;
                    }

                    ps = _instance;
                    _instance = null;
                }

                ps.DisposeInternal(silent);
                GC.SuppressFinalize(ps);
            }


            // Ensures that an instance have been started
            //public async static Task StartAsync()
            //{
            //    using (await _instanceAsyncLock.LockAsync())
            //    {
            //        var instance = PhantomServer.Instance;
            //    }
            //}


            private static PhantomServer Instance
            {
                get
                {
                    return _instance ?? (_instance = new PhantomServer());
                }
            }


            public static async Task<string> RenderUrlAsync(HttpCookie authenticationCookie, string url, string tempFilePath, string mode)
            {
                using (await _instanceAsyncLock.LockAsync())
                {
                    try
                    {
                        _lastUsageDate = DateTime.Now;
                        string output;
                        Instance.RenderUrlImpl(authenticationCookie, url, tempFilePath, mode, out output);
                        return output;
                    }
                    catch (BrowserRenderException)
                    {
                        ShutDown(true);
                        throw;
                    }
                }
            }


            private void RenderUrlImpl(HttpCookie authenticationCookie, string url, string tempFilePath, string mode, out string output)
            {
                Verify.ArgumentNotNull(authenticationCookie, "authenticationCookie");

                string cookieDomain = new Uri(url).Host;
                string cookieInfo = authenticationCookie.Name + "," + authenticationCookie.Value + "," + cookieDomain;

                string requestLine = cookieInfo + "|" + url + "|" + tempFilePath + "|" + mode;



                Task<string> readerTask = Task.Run(async () =>
                {
                    _stdin.WriteLine(requestLine);
                    return await _stdout.ReadLineAsync();
                });

                double timeout = (DateTime.Now - _process.StartTime).TotalSeconds < 120 ? 65 : 30;

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

                DisposeInternal(false);
            }

            void DisposeInternal(bool silent)
            {
                bool proccessHasExited;

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
                }

                Task<string> errorFeedbackTask = Task.Factory.StartNew(() =>
                {
                    try
                    {
                        string stdOut = _stdout.ReadToEnd();
                        string stdError = _stderror.ReadToEnd();
                        return string.Format("output: '{0}', error: '{1}'", stdOut, stdError);
                    }
                    catch (Exception ex)
                    {
                        return ex.Message;
                    }
                });

                errorFeedbackTask.Wait(500);

                string errorFeedback = errorFeedbackTask.Status == TaskStatus.RanToCompletion ? errorFeedbackTask.Result : "Process Hang";

                int exitCode = -1;

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
                    _stdin.Close();
                    _stdout.Close();
                    _stderror.Close();
                    _process.Kill();
                    _process.WaitForExit(500);
                }

                exitCode = _process.ExitCode;

                _stdin.Dispose();
                _stdout.Dispose();
                _stderror.Dispose();


                _process.Dispose();
                _job.Dispose();

                if (!silent && exitCode != 0 || errorFeedbackTask.Status != TaskStatus.RanToCompletion)
                {
                    throw new InvalidOperationException("Error executing PhantomJs.exe. Exit code: {0}, {1}".FormatWith(exitCode, errorFeedback));
                }
            }
        }
    }
}
