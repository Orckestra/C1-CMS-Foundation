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


            public static async Task<RenderingResult> RenderUrlAsync(HttpCookie authenticationCookie, string url, string outputImageFilePath, string mode)
            {
                using (await _instanceAsyncLock.LockAsync())
                {
                    _lastUsageDate = DateTime.Now;
                    var renderingResult = Instance.RenderUrlImpl(authenticationCookie, url, outputImageFilePath, mode);

                    if (renderingResult.Status == RenderingResultStatus.PhantomServerTimeout
                        || renderingResult.Status == RenderingResultStatus.PhantomServerIncorrectResponse)
                    {
                        Log.LogWarning("PhantomServer", "Shutting down PhantomJs server. Reason: {0}, Output: {1}", renderingResult.Status, renderingResult.Output);

                        try
                        {
                            ShutDown(true);
                        }
                        catch (Exception shutdownException)
                        {
                            Log.LogError("PhantomServer", shutdownException);
                        }
                    }
                    
                    return renderingResult;
                }
            }


            private RenderingResult RenderUrlImpl(HttpCookie authenticationCookie, string url, string outputImageFilePath, string mode)
            {
                Verify.ArgumentNotNull(authenticationCookie, "authenticationCookie");

                string cookieDomain = new Uri(url).Host;
                string cookieInfo = authenticationCookie.Name + "," + authenticationCookie.Value + "," + cookieDomain;

                string requestLine = cookieInfo + "|" + url + "|" + outputImageFilePath + "|" + mode;

                // Async way:
                //Task<string> readerTask = Task.Run(async () =>
                //{
                //    await _stdin.WriteLineAsync(requestLine);
                //    return await _stdout.ReadLineAsync();
                //});

                Task<string> readerTask = Task.Run(() =>
                {
                    _stdin.WriteLine(requestLine);
                    return _stdout.ReadLine();
                });

                double timeout = (DateTime.Now - _process.StartTime).TotalSeconds < 120 ? 65 : 30;

                readerTask.Wait(TimeSpan.FromSeconds(timeout));

                string output;

                switch (readerTask.Status)
                {
                    case TaskStatus.RanToCompletion:
                        output = readerTask.Result;
                        break;
                    default:
                        return new RenderingResult
                        {
                            Status = RenderingResultStatus.PhantomServerTimeout,
                            Output = "Request failed to complete within expected time: " +
#if DEBUG
                                requestLine
#else
                                url + " " + mode
#endif
                        };
                }

                if (C1File.Exists(outputImageFilePath))
                {
                    return new RenderingResult 
                    { 
                        Status = RenderingResultStatus.Success, 
                        Output = output,
                        FilePath = outputImageFilePath
                    };
                }

                const string redirectResponsePrefix = "REDIRECT: ";
                if (output.StartsWith(redirectResponsePrefix))
                {
                    return new RenderingResult
                    {
                        Status = RenderingResultStatus.Redirect,
                        Output = output,
                        RedirectUrl = output.Substring(redirectResponsePrefix.Length)
                    };
                }

                const string timeoutResponsePrefix = "TIMEOUT: ";
                if (output.StartsWith(timeoutResponsePrefix))
                {
                    return new RenderingResult
                    {
                        Status = RenderingResultStatus.Timeout,
                        Output = output,
                        RedirectUrl = output.Substring(timeoutResponsePrefix.Length)
                    };
                }

                const string errorResponsePrefix = "ERROR: ";
                if (output.StartsWith(errorResponsePrefix))
                {
                    return new RenderingResult
                    {
                        Status = RenderingResultStatus.Error,
                        Output = output,
                        RedirectUrl = output.Substring(errorResponsePrefix.Length)
                    };
                }

                return new RenderingResult
                {
                    Status = RenderingResultStatus.PhantomServerIncorrectResponse,
                    Output = output
                };
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
                bool processHasExited;

                try
                {
                    processHasExited = _process.HasExited;
                }
                catch (Exception)
                {
                    processHasExited = true;
                }

                if (!processHasExited)
                {
                    _stdin.WriteLine("exit");
                }

                Task<string> errorFeedbackTask = Task.Factory.StartNew(() =>
                {
                    try
                    {
                        string stdOut = _stdout.ReadToEnd();
                        string stdError = _stderror.ReadToEnd();

                        string result = !string.IsNullOrEmpty(stdOut) ? "output: '{0}'".FormatWith(stdOut) : "";

                        if (!string.IsNullOrEmpty(stdError))
                        {
                            if (result.Length > 0) { result += ", ";}

                            result += string.Format("error: '{0}'", stdError);
                        }

                        return result;
                    }
                    catch (Exception ex)
                    {
                        return ex.Message;
                    }
                });

                
                errorFeedbackTask.Wait(500);

                string errorFeedback = errorFeedbackTask.Status == TaskStatus.RanToCompletion ? errorFeedbackTask.Result : "Process Hang";

                if (!processHasExited)
                {
                    try
                    {
                        processHasExited = _process.HasExited;
                    }
                    catch (Exception)
                    {
                        processHasExited = true;
                    }

                    if (!processHasExited)
                    {
                        _stdin.Close();
                        _stdout.Close();
                        _stderror.Close();
                        _process.Kill();
                        _process.WaitForExit(500);
                    }
                }

                int exitCode = _process.ExitCode;

                _stdin.Dispose();
                _stdout.Dispose();
                _stderror.Dispose();

                _process.Dispose();
                _job.Dispose();

                bool meaningfullExitCode = exitCode != 0 && exitCode != -1073741819 /* Access violation, the ExitCode property returns this value by default for some reason */;

                if (!silent && (meaningfullExitCode || errorFeedbackTask.Status != TaskStatus.RanToCompletion))
                {
                    string errorMessage = "Error executing PhantomJs.exe";
                    if (meaningfullExitCode) errorMessage += "; Exit code: {0}".FormatWith(exitCode);

                    if (!string.IsNullOrEmpty(errorFeedback))
                    {
                        errorMessage += ", " + errorMessage;
                    }
                    throw new InvalidOperationException(errorMessage);
                }
            }
        }
    }
}
