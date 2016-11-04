using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using Composite.Core.Application;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Parallelization;

namespace Composite.Core.WebClient.PhantomJs
{
    /// <summary> 
    /// Contains information about currently running instance of a PhantomJS server
    /// </summary>
    internal class PhantomServer : IDisposable
    {
        private const string LogTitle = nameof(PhantomServer);
        private const string EndOfReplyMarker = "END_OF_REPLY";

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
            var tempDirectory = PathUtil.Resolve(GlobalSettingsFacade.TempDirectory);
            var cachePath = Path.Combine(tempDirectory, "phantomjs_cache");
            var localStoragePath = Path.Combine(tempDirectory, "phantomjs_ls");

            _process = new Process
            {
                StartInfo =
                    {
                        WorkingDirectory = _phantomJsFolder,
                        FileName = "\"" + _phantomJsPath + "\"",
                        Arguments = $"\"--local-storage-path={localStoragePath}\" \"--disk-cache-path={cachePath}\" --config={ConfigFileName} {ScriptFileName}",
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


        public static async Task<RenderingResult> RenderUrlAsync(HttpCookie[] cookies, string url, string outputImageFilePath, string mode)
        {
            url = url.Replace(" ", "%20"); // Preventing a redirect in PhantomJS

            using (await _instanceAsyncLock.LockAsync())
            {
                var renderingResult = Instance.RenderUrlImpl(cookies, url, outputImageFilePath, mode);

                if (renderingResult.Status == RenderingResultStatus.PhantomServerTimeout
                    || renderingResult.Status == RenderingResultStatus.PhantomServerIncorrectResponse
                    || renderingResult.Status == RenderingResultStatus.PhantomServerNoOutput)
                {
                    Log.LogWarning(LogTitle, "Shutting down PhantomJs server. Reason: {0}, Output: {1}", 
                        renderingResult.Status, string.Join(Environment.NewLine, renderingResult.Output));

                    try
                    {
                        ShutDown(true);
                    }
                    catch (Exception shutdownException)
                    {
                        Log.LogError(LogTitle, shutdownException);
                    }
                }

                return renderingResult;
            }
        }

        private bool IsEndOfReply(string line)
        {
            return line.StartsWith(EndOfReplyMarker);
        }


        private RenderingResult RenderUrlImpl(HttpCookie[] cookies, string url, string outputImageFilePath, string mode)
        {
            Verify.ArgumentNotNull(cookies, nameof(cookies));

            string cookieDomain = new Uri(url).Host;

            var request = new RenderPreviewRequest
            {
                requestId = "1",
                mode = mode,
                url = url,
                outputFilePath = outputImageFilePath,
                cookies = cookies.Select(cookie => new CookieInformation
                {
                    name = cookie.Name,
                    value = cookie.Value,
                    domain = cookieDomain
                }).ToArray()
            };

            var ms = new MemoryStream();
            var ser = new DataContractJsonSerializer(typeof(RenderPreviewRequest));
            ser.WriteObject(ms, request);

            var json = Encoding.UTF8.GetString(ms.ToArray());

            var output = new List<string>();

            Task readerTask = Task.Run(() =>
            {
                _stdin.WriteLine(json);

                string line;

                do
                {
                    line = _stdout.ReadLine();
                    lock (output)
                    {
                        output.Add(line);
                    }

                } while (!IsEndOfReply(line));
            });

            var secondsSinceStartup = (DateTime.Now - _process.StartTime).TotalSeconds;
            double timeout = secondsSinceStartup < 120 || mode == "test" ? 65 : 30;

            readerTask.Wait(TimeSpan.FromSeconds(timeout));

            // TODO: check for theother task statuses
            switch (readerTask.Status)
            {
                case TaskStatus.RanToCompletion:
                    if (output.Count == 0)
                    {
                        return new RenderingResult
                        {
                            Status = RenderingResultStatus.PhantomServerNoOutput,
                            Output = new [] { "(null)" }
                        };
                    }
                    break;
                default:
                    string[] outputCopy;
                    lock (output)
                    {
                        outputCopy = output.ToArray();
                    }

                    string logMessage = "Request failed to complete within expected time: " +
#if DEBUG
                        json
#else
                                url + " " + mode
#endif
                        ;


                    return new RenderingResult
                    {
                        Status = RenderingResultStatus.PhantomServerTimeout,
                        Output = new [] { logMessage}.Concat(outputCopy).ToArray(),
                        FilePath = outputImageFilePath
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

            var lastMessage = output.Last();

            if (!lastMessage.StartsWith(EndOfReplyMarker))
            {
                Log.LogError(LogTitle, $"Missing {EndOfReplyMarker} in the response");
            }

            string redirectUrl = null;
            RenderingResultStatus? status = null;

            foreach (var line in output)
            {
                const string redirectResponsePrefix = "REDIRECT: ";

                if (line == "SUCCESS")
                {
                    status = RenderingResultStatus.Success;
                }
                else if (line.StartsWith(redirectResponsePrefix))
                {
                    status = RenderingResultStatus.Redirect;
                    redirectUrl = line.Substring(redirectResponsePrefix.Length);
                }
                else if (line.StartsWith("TIMEOUT: "))
                {
                    status = RenderingResultStatus.Timeout;
                }
                else if (line.StartsWith("ERROR: "))
                {
                    status = RenderingResultStatus.Error;
                }
            }

            status = status ?? RenderingResultStatus.PhantomServerIncorrectResponse;

            return new RenderingResult
            {
                Status = status.Value,
                Output = output,
                RedirectUrl = redirectUrl
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

            bool streamsClosed = false;

            Task<string> errorFeedbackTask = null;
            string processOutputSummary = null;

            if (!silent)
            {
                errorFeedbackTask = Task.Factory.StartNew(() =>
                {
                    try
                    {
                        if (streamsClosed)
                        {
                            // Simplifies debugging
                            return null;
                        }

                        string stdOut = _stdout.ReadToEnd();
                        string stdError = _stderror.ReadToEnd();

                        string result = !string.IsNullOrEmpty(stdOut) ? $"stdout: '{stdOut}'" : "";

                        if (!string.IsNullOrWhiteSpace(stdError))
                        {
                            if (result.Length > 0) { result += Environment.NewLine; }

                            result += $"stderr: {stdError}";
                        }

                        return result;
                    }
                    catch (Exception ex)
                    {
                        return ex.Message;
                    }
                });


                errorFeedbackTask.Wait(500);

                processOutputSummary = errorFeedbackTask.Status == TaskStatus.RanToCompletion ? errorFeedbackTask.Result : "Process Hang";
            }

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
                    streamsClosed = true;

                    _stdin.Close();
                    _stdout.Close();
                    _stderror.Close();
                    _process.Kill();
                    _process.WaitForExit(500);
                }
            }

            int exitCode = _process.ExitCode;

            streamsClosed = true;

            _stdin.Dispose();
            _stdout.Dispose();
            _stderror.Dispose();

            _process.Dispose();
            _job.Dispose();

            bool meaningfullExitCode = exitCode != 0 && exitCode != -1073741819 /* Access violation, the ExitCode property returns this value by default for some reason */;

            if (silent)
            {
                return;
            }

            if (meaningfullExitCode
                || errorFeedbackTask.Status != TaskStatus.RanToCompletion
                || !string.IsNullOrEmpty(processOutputSummary))
            {
                string errorMessage = "Error executing PhantomJs.exe";
                if (meaningfullExitCode) errorMessage += "; Exit code: {0}".FormatWith(exitCode);

                if (!string.IsNullOrEmpty(processOutputSummary))
                {
                    errorMessage += Environment.NewLine + processOutputSummary;
                }
                throw new InvalidOperationException(errorMessage);
            }
        }
    }
}
