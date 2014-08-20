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
            private static readonly object _instanceLock = new object();

            [SuppressMessage("Composite.IO", "Composite.DotNotUseStreamWriterClass:DotNotUseStreamWriterClass")]
            private PhantomServer()
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


            public static void ShutDown()
            {
                PhantomServer ps;

                lock (_instanceLock)
                {
                    if (_instance == null)
                    {
                        return;
                    }

                    ps = _instance;
                    _instance = null;
                }

                ps.Dispose();
            }



            private static PhantomServer Instance
            {
                get
                {
                    return _instance ?? (_instance = new PhantomServer());
                }
            }


            public static void RenderUrl(HttpCookie authenticationCookie, string url, string tempFilePath, string mode, out string output)
            {
                lock (_instanceLock)
                {
                    try
                    {
                        Instance.RenderUrlImpl(authenticationCookie, url, tempFilePath, mode, out output);
                    }
                    catch (BrowserRenderException)
                    {
                        ShutDown();
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



                Task<string> readerTask = Task.Factory.StartNew(() =>
                {
                    _stdin.WriteLine(requestLine);
                    return _stdout.ReadLine();
                });

                double timeout = (DateTime.Now - _process.StartTime).TotalSeconds < 20 ? 20 : 6;

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

                errorFeedbackTask.Wait(250);

                string errorFeedback = errorFeedbackTask.Status == TaskStatus.RanToCompletion ? errorFeedbackTask.Result : "Process Hang";

                int exitCode = -1;

                if (!proccessHasExited)
                {
                    _stdin.Close();
                    _stdout.Close();
                    _stderror.Close();
                }
                else
                {
                    exitCode = _process.ExitCode;
                }

                _stdin.Dispose();
                _stdout.Dispose();
                _stderror.Dispose();


                _process.Dispose();
                _job.Dispose();

                if (exitCode != 0 || errorFeedbackTask.Status != TaskStatus.RanToCompletion)
                {
                    Log.LogWarning("BrowserRenderer", "Error executing PhantomJs.exe. Exit code: {0}, {1}".FormatWith(exitCode, errorFeedback));
                    throw new InvalidOperationException("Error executing PhantomJs.exe. Exit code: {0}, {1}".FormatWith(exitCode, errorFeedback));
                }
            }
        }
    }
}
