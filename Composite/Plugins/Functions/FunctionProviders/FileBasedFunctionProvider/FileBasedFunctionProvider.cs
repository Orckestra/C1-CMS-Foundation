using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web.Hosting;
using Composite.Core;
using Composite.Core.Caching;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Types;
using Composite.Functions;
using Composite.Functions.Plugins.FunctionProvider;
using Composite.Core.Application;
using Composite.Core.Configuration;

namespace Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider
{
    internal abstract class FileBasedFunctionProvider<FunctionType> : IFunctionProvider 
        where FunctionType : FileBasedFunction<FunctionType> 
	{
        static readonly FileRelatedDataCache<CachedFunctionInformation> _functionInfoCache =
            new FileRelatedDataCache<CachedFunctionInformation>(
                "Functions", "fileBasedFunction", CachedFunctionInformation.Serialize, CachedFunctionInformation.Deserialize);

        private static readonly string LogTitle = "FileBasedFunctionProvider";
		private static readonly object _lock = new object();

        private const int FunctionReloadDelayMilliseconds = 200;

        private readonly C1FileSystemWatcher _watcher;
		private DateTime? _lastFunctionReloadTime = DateTime.Now;
        private readonly string _name;

		protected abstract string FileExtension { get; }
        protected abstract string DefaultFunctionNamespace { get; }

		public FunctionNotifier FunctionNotifier { private get; set; }
		public string VirtualPath { get; private set; }
		public string PhysicalPath { get; private set; }

        public string Name
        {
            get { return _name; }
        }

        /// <summary>
        /// </summary>
        /// <exclude />
		public IEnumerable<IFunction> Functions
		{
			get
			{
                var returnList = new List<IFunction>();

                if (!C1Directory.Exists(PhysicalPath) || !(SystemSetupFacade.IsSystemFirstTimeInitialized && !SystemSetupFacade.SetupIsRunning))
                {
                    return returnList;
                }

				var files = new C1DirectoryInfo(PhysicalPath)
                    .GetFiles("*." + FileExtension, SearchOption.AllDirectories)
                    .Where(f => !f.Name.StartsWith("_", StringComparison.Ordinal));

				foreach (var file in files)
				{
				    string filePath = file.FullName;
                    string @namespace = ExtractFunctionNamespace(file.FullName);
                    string name = Path.GetFileNameWithoutExtension(file.Name);

                    var virtualPath = CombineVirtualPath(VirtualPath, 
                                                         @namespace.Replace(".", "/"), 
                                                         name + "." + FileExtension);

                    if(@namespace == string.Empty)
                    {
                        @namespace = DefaultFunctionNamespace;
                    }

				    string fullFunctionName = @namespace + "." + name;

                    IFunction function;

                    try
                    {
                        CachedFunctionInformation cachedFunctionInfo;

                        if (!_functionInfoCache.Get(fullFunctionName, filePath, out cachedFunctionInfo))
                        {
                            function = InstantiateFunction(virtualPath, @namespace, name);

                            // Not caching functions that failed to load
                            var initializationInfo = function as IFunctionInitializationInfo;
                            bool functionFailedToCompile = initializationInfo != null && !initializationInfo.FunctionInitializedCorrectly;

                            if ((function == null && !HostingEnvironment.ApplicationHost.ShutdownInitiated())
                                || (function != null && !functionFailedToCompile))
                            {
                                _functionInfoCache.Add(fullFunctionName, filePath,
                                    function != null ? new CachedFunctionInformation(function) : null);
                            }
                        }
                        else
                        {
                            if (cachedFunctionInfo == null)
                            {
                                continue;
                            }

                            function = InstantiateFunctionFromCache(virtualPath, @namespace, name,
                                                                    cachedFunctionInfo.ReturnType,
                                                                    cachedFunctionInfo.Description,
                                                                    cachedFunctionInfo.PreventCaching);
                        }
                    }
                    catch (ThreadAbortException)
                    {
                        throw;
                    }
                    catch (Exception ex)
                    {
                        // supressing error messages while in offline mode - we are installing stuff here.
                        if (ApplicationOnlineHandlerFacade.IsApplicationOnline && !HostingEnvironment.ApplicationHost.ShutdownInitiated())
                        {
                            Log.LogError(LogTitle, "Error instantiating function {0} ", @namespace + "." + name);
                            Log.LogError(LogTitle, ex);
                        }

                        returnList.Add(new NotLoadedFileBasedFunction<FunctionType>(this, @namespace, name, virtualPath, ex));
                        continue;
                    }

                    if (function == null)
                    {
                        continue;
                    }

                    returnList.Add(function);
				}

				return returnList;
			}
		}

        private static string CombineVirtualPath(params string[] parts)
        {
            return string.Join("/", parts).Replace('\\', '/').Replace("///", "/").Replace("//", "/");
        }

        private string ExtractFunctionNamespace(string filePath)
        {
            Verify.That(filePath.StartsWith(PhysicalPath, StringComparison.OrdinalIgnoreCase), "File path should start with folder path");

            string directoryPath = Path.GetDirectoryName(filePath);
            string relativeDirectoryPath = directoryPath.Substring(PhysicalPath.Length);

            return string.Join(".", relativeDirectoryPath.Split(new[] { Path.DirectorySeparatorChar }, StringSplitOptions.RemoveEmptyEntries));
        }

		protected FileBasedFunctionProvider(string name, string folder)
		{
			_name = name;

			VirtualPath = folder;
			PhysicalPath = PathUtil.Resolve(VirtualPath);

            if (!C1Directory.Exists(PhysicalPath))
            {
                return;
            }

		    string folderToWatch = PhysicalPath;

		    try
		    {
		        if (ReparsePointUtils.DirectoryIsReparsePoint(folderToWatch))
		        {
                    folderToWatch = ReparsePointUtils.GetDirectoryReparsePointTarget(folderToWatch);
		        }

		        _watcher = new C1FileSystemWatcher(folderToWatch, "*")
		        {
		            IncludeSubdirectories = true
		        };

		        _watcher.Created += Watcher_OnChanged;
		        _watcher.Deleted += Watcher_OnChanged;
		        _watcher.Changed += Watcher_OnChanged;
		        _watcher.Renamed += Watcher_OnChanged;

		        _watcher.EnableRaisingEvents = true;
		    }
		    catch (Exception ex)
		    {
		        Log.LogWarning(LogTitle, "Failed to create a file system watcher for path '{0}'", folderToWatch);
		        Log.LogWarning(LogTitle, ex);
		    }
		}

        /// <summary>
        /// Instantiates the function from the file.
        /// </summary>
        /// <param name="virtualPath">The virtual path.</param>
        /// <param name="namespace">The namespace.</param>
        /// <param name="name">The name.</param>
        /// <returns></returns>
		protected abstract IFunction InstantiateFunction(string virtualPath, string @namespace, string name);

        /// <summary>
        /// Instantiates the function from the file and additional cached information.
        /// </summary>
        /// <param name="virtualPath">The virtual path.</param>
        /// <param name="namespace">The namespace.</param>
        /// <param name="name">The name.</param>
        /// <param name="returnType">Cached value of return type.</param>
        /// <param name="cachedDescription">Cached value of the description.</param>
        /// <param name="preventCaching">Cached PreventFunctionOutputCache property value.</param>
        /// <returns></returns>
        protected virtual IFunction InstantiateFunctionFromCache(
            string virtualPath,
            string @namespace,
            string name,
            Type returnType,
            string cachedDescription,
            bool preventCaching)
        {
            return InstantiateFunction(virtualPath, @namespace, name);
        }

		protected abstract bool HandleChange(string path);


        public void ReloadFunctions()
        {
            Thread.Sleep(FunctionReloadDelayMilliseconds);

            try
            {
                FunctionNotifier.FunctionsUpdated();
            }
            catch (ThreadAbortException)
            {
                throw;
            }
            catch(Exception ex)
            {
                Log.LogError(LogTitle, "Failed to reload functions");
                Log.LogError(LogTitle, ex);
            }
        }

		private void Watcher_OnChanged(object sender, FileSystemEventArgs e)
		{
		    if (SystemSetupFacade.SetupIsRunning)
		    {
		        return;
		    }

            // Reloading functions only after a certain delay as otherwise edited in VS function won't be loaded if files are accessed through a network drive
			if (FunctionNotifier != null && HandleChange(e.FullPath))
			{
                var timeSpan = DateTime.Now - _lastFunctionReloadTime.Value;
                if (timeSpan.TotalMilliseconds < FunctionReloadDelayMilliseconds) {
                    return;
                }

                lock (_lock)
                {
                    var now = DateTime.Now;
                    timeSpan = now - _lastFunctionReloadTime.Value;
                    if (timeSpan.TotalMilliseconds < FunctionReloadDelayMilliseconds) {
                        return;
                    }

                    _lastFunctionReloadTime = now;

                    new Thread(ReloadFunctions).Start();
                }
			}
		}

        private class CachedFunctionInformation
        {
            public Type ReturnType { get; private set; }
            public string Description { get; private set; }
            public bool PreventCaching { get; private set; }

            private CachedFunctionInformation() {}

            public CachedFunctionInformation(IFunction function)
            {
                ReturnType = function.ReturnType;
                Description = function.Description;
                PreventCaching = function is IDynamicFunction dynamicFunction
                                 && dynamicFunction.PreventFunctionOutputCaching;
            }

            public static void Serialize(CachedFunctionInformation data, string filePath)
            {
                var lines = new List<string>();

                if (data != null)
                {
                    lines.Add(TypeManager.SerializeType(data.ReturnType));
                    lines.Add(data.PreventCaching.ToString());
                    lines.AddRange(data.Description.Split(new [] { Environment.NewLine }, StringSplitOptions.None));
                }

                C1File.WriteAllLines(filePath, lines);
            }

            public static CachedFunctionInformation Deserialize(string filePath)
            {
                var lines = C1File.ReadAllLines(filePath);
                if (lines == null || lines.Length == 0)
                {
                    return null;
                }
                
                Type type = TypeManager.TryGetType(lines[0]);
                if (type == null) return null;

                bool preventCaching = bool.Parse(lines[1]);
                string description = string.Join(Environment.NewLine, lines.Skip(2));

                return new CachedFunctionInformation
                {
                    Description = description,
                    PreventCaching = preventCaching,
                    ReturnType = type
                };
            }
        }
	}
}
