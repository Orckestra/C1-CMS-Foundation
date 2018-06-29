using Composite.Core.IO;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Compilation;
using System.Web.Hosting;
using System.Xml.Linq;
using Composite.Core.Extensions;

namespace Composite.Core.WebClient
{
    internal static class BuildManagerHelper
    {
        private static DateTime? _delayPreloadTo = null;
        private static TimeSpan PreloadDelay = TimeSpan.FromSeconds(2);
        private static TimeSpan InitializationDelay = TimeSpan.FromSeconds(30);

        private static readonly string LogTitle = typeof (BuildManagerHelper).Name;
        private static int _preloadingInitiated;

        /// <summary>
        /// Preloading (compiling) all the controls. Speeds up first time editing in console.
        /// </summary>
        public static void InitializeControlPreLoading()
        {
            if (_preloadingInitiated == 0 && Interlocked.Increment(ref _preloadingInitiated) == 1)
            {
                Task.Factory.StartNew(LoadAllControls);
            }
        }

        private static bool IsRestarting => HostingEnvironment.ApplicationHost.ShutdownInitiated();

        private static void LoadAllControls()
        {
            try
            {
                const int waitSlice = 500;
                for (int i = 0; i < InitializationDelay.TotalMilliseconds / waitSlice; i++)
                {
                    if(IsRestarting) return;
                    Thread.Sleep(waitSlice);
                }

                const string configFileFilePath = "~/App_Data/Composite/Composite.config";
                var config = XDocument.Load(PathUtil.Resolve(configFileFilePath));

                var controlPathes = from element in config.Descendants()
                    let userControlVirtualPath = (string) element.Attribute("userControlVirtualPath")
                    where userControlVirtualPath != null
                    select userControlVirtualPath;

                var controlsToCompile = new List<string>();

                foreach (var controlPath in controlPathes)
                {
                    if (!C1File.Exists(PathUtil.Resolve(controlPath)))
                    {
                        Log.LogWarning(LogTitle, $"Missing a control file '{controlPath}' referenced in '{configFileFilePath}'");
                        continue;
                    }

                    controlsToCompile.Add(controlPath);
                }


                Func<string, bool> isAshxAsmxPath = f => f == ".ashx" || f == ".asmx";
                Func<string, bool> isAspNetPath = f => f == ".aspx" || isAshxAsmxPath(f);
                var aspnetPaths = DirectoryUtils.GetFilesRecursively(PathUtil.Resolve("~/Composite")).Where(f => isAshxAsmxPath(Path.GetExtension(f)))
                    .Concat(DirectoryUtils.GetFilesRecursively(PathUtil.Resolve("~/Renderers")).Where(f => isAspNetPath(Path.GetExtension(f))))
                    .Select(PathUtil.GetWebsitePath)
                    .ToList();

                var compileGroups = new List<Tuple<string, ICollection<string>>>()
                {
                    new Tuple<string, ICollection<string>>("ASP.NET controls", controlsToCompile),
                    new Tuple<string, ICollection<string>>("ASP.NET pages and handlers", aspnetPaths),
                };


                foreach (var compileGroup in compileGroups)
                {
                    if (HostingEnvironment.ApplicationHost.ShutdownInitiated()) return;

                    Log.LogVerbose(LogTitle, "Preloading " + compileGroup.Item1);

                    var stopWatch = new Stopwatch();
                    stopWatch.Start();

                    foreach (var virtualPath in compileGroup.Item2)
                    {
                        while (true)
                        {
                            if (IsRestarting) return;

                            Thread.MemoryBarrier();
                            var waitUntil = _delayPreloadTo;
                            var now = DateTime.Now;

                            if (waitUntil == null || waitUntil <= now)
                            {
                                break;
                            }

                            Thread.Sleep(waitUntil.Value - now);
                        }

                        try
                        {
                            using (new DisableUrlMedataScope())
                            {
                                BuildManager.GetCompiledType(virtualPath);
                            }
                        }
                        catch (ThreadAbortException)
                        {
                            // this exception is automatically rethrown after this catch
                        }
                        catch (Exception ex)
                        {
                            Log.LogWarning(LogTitle, ex);
                        }
                    }

                    stopWatch.Stop();

                    Log.LogVerbose(LogTitle, $"Preloading {compileGroup.Item1} completed in {stopWatch.ElapsedMilliseconds} ms");
                }
            }
            catch (ThreadAbortException)
            {
            }
            catch (Exception ex)
            {
                Log.LogWarning(LogTitle, ex);
            }
        }

        /// <summary>
        /// Gets a user control. Prevents an exception that appears in Visual Studio while debugging
        /// </summary>
        /// <param name="virtualPath"></param>
        /// <returns></returns>
        public static Type GetCompiledType(string virtualPath)
        {
            using (DisableUrlMetadataCachingScope())
            {
                return BuildManager.GetCompiledType(virtualPath);
            }
        }

        /// <summary>
        /// Disabling the "url metadata caching" prevents <see cref="System.Web.HttpException" /> in debugger 
        /// </summary>
        /// <param name="disableCaching"></param>
        public static void DisableUrlMetadataCaching(bool disableCaching)
        {
            if (!RuntimeInformation.IsDebugBuild)
            {
                return;
            }

            var systemWeb = typeof(System.Web.TraceMode).Assembly;
            Type cachedPathData = systemWeb.GetType("System.Web.CachedPathData", false);

            var field = cachedPathData?.GetField("s_doNotCacheUrlMetadata", BindingFlags.Static | BindingFlags.NonPublic);

            field?.SetValue(null, disableCaching);
        }

        /// <summary>
        /// Disabling the "url metadata caching" prevents <see cref="System.Web.HttpException" /> in debugger 
        /// </summary>
        public static IDisposable DisableUrlMetadataCachingScope()
        {
            _delayPreloadTo = DateTime.Now.Add(PreloadDelay);

            return new DisableUrlMedataScope();
        }

        internal class DisableUrlMedataScope : IDisposable
        {
            public DisableUrlMedataScope()
            {
                DisableUrlMetadataCaching(true);
            }

            public void Dispose()
            {
                DisableUrlMetadataCaching(false);
#if LeakCheck
                GC.SuppressFinalize(this);
#endif
            }

#if LeakCheck
            private string stack = Environment.StackTrace;
            /// <exclude />
            ~DisableUrlMedataScope()
            {
                Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            }
#endif
        }
    }
}
