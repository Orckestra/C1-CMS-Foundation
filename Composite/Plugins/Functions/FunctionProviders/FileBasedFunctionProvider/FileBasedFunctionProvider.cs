using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading;
using Composite.Core;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.Types;
using Composite.Functions;
using Composite.Functions.Plugins.FunctionProvider;
using Composite.Core.Application;

namespace Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider
{
    internal abstract class FileBasedFunctionProvider<FunctionType> : IFunctionProvider 
        where FunctionType : FileBasedFunction<FunctionType> 
	{
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

                if(!C1Directory.Exists(PhysicalPath))
                {
                    return returnList;
                }

				var files = new C1DirectoryInfo(PhysicalPath)
                    .GetFiles("*." + FileExtension, SearchOption.AllDirectories)
                    .Where(f => !f.Name.StartsWith("_", StringComparison.Ordinal));

				foreach (var file in files)
				{
                    string @namespace = ExtractFunctionNamespace(file.FullName);
                    string name = Path.GetFileNameWithoutExtension(file.Name);

                    var virtualPath = CombineVirtualPath(VirtualPath, 
                                                         @namespace.Replace(".", "/"), 
                                                         name + "." + FileExtension);

                    if(@namespace == string.Empty)
                    {
                        @namespace = DefaultFunctionNamespace;
                    }

                    IFunction function;

                    DateTime creationTimeUtc = file.CreationTimeUtc;

                    try
                    {
                        CachedFunctionInformation cachedFunctionInfo;

                        if (!GetCachedFunctionInformation(@namespace, name, creationTimeUtc, out cachedFunctionInfo))
                        {
                            function = InstantiateFunction(virtualPath, @namespace, name);

                            // Not caching functions that failed to load
                            var initializationInfo = function as IFunctionInitializationInfo;

                            if (initializationInfo == null || initializationInfo.FunctionInitializedCorrectly)
                            {
                                CacheFunctionInformation(@namespace, name, creationTimeUtc, function);
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
                                                                    cachedFunctionInfo.Description);
                        }
                    }
                    catch (ThreadAbortException)
                    {
                        throw;
                    }
                    catch (Exception ex)
                    {
                        // supressing error messages while in offline mode - we are installing stuff here.
                        if (ApplicationOnlineHandlerFacade.IsApplicationOnline)
                        {
                            Log.LogError(LogTitle, "Error instantiating {0} function", name);
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

        private static string GetCacheFilePath(string @namespace, string name)
        {
            string nameHash = (@namespace + "." + name).GetHashCode().ToString(CultureInfo.InvariantCulture);

            return Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TempDirectory), "function" + nameHash);
        }

        private void CacheFunctionInformation(string @namespace, string name, DateTime creationTimeUtc, IFunction function)
        {
            string cacheFileName = GetCacheFilePath(@namespace, name);

            var lines = new List<string>();

            if (function != null)
            {
                lines.Add(TypeManager.SerializeType(function.ReturnType));
                lines.AddRange(function.Description.Split(new [] { Environment.NewLine }, StringSplitOptions.None));
            }

            try
            {
                C1File.WriteAllLines(cacheFileName, lines);
                C1File.SetCreationTimeUtc(cacheFileName, creationTimeUtc);
            }
            catch (Exception ex)
            {
                Log.LogWarning(LogTitle, "Failed to cache function info. Function: '{0}.{1}'", @namespace, name);
                Log.LogWarning(LogTitle, ex);
            }
        }

        private bool GetCachedFunctionInformation(string @namespace, string name, DateTime creationTimeUtc, out CachedFunctionInformation cachedFunctionInformation)
        {
            string cacheFileName = GetCacheFilePath(@namespace, name);

            try
            {
                if (!C1File.Exists(cacheFileName) || C1File.GetCreationTimeUtc(cacheFileName) != creationTimeUtc)
                {
                    cachedFunctionInformation = null;
                    return false;
                }

                var lines = C1File.ReadAllLines(cacheFileName);
                if (lines == null || lines.Length == 0)
                {
                    cachedFunctionInformation = null;
                }
                else
                {
                    string dynamicTypeName = lines[0];
                    string description = string.Join(Environment.NewLine, lines.Skip(1));

                    cachedFunctionInformation = new CachedFunctionInformation { Description = description, ReturnType = dynamicTypeName };
                }
            }
            catch (Exception ex)
            {
                Log.LogWarning(LogTitle, "Failed to load function info from cache. File: '{0}'", cacheFileName);
                Log.LogWarning(LogTitle, ex);

                cachedFunctionInformation = null;
                return false;
            }
            return true;
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

			_watcher = new C1FileSystemWatcher(PhysicalPath, "*")
			{
				IncludeSubdirectories = true
			};

            _watcher.Created += Watcher_OnChanged;
            _watcher.Deleted += Watcher_OnChanged;
            _watcher.Changed += Watcher_OnChanged;
            _watcher.Renamed += Watcher_OnChanged;

			_watcher.EnableRaisingEvents = true;
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
        /// <param name="cachedReturnType">Cached value of return type.</param>
        /// <param name="cachedDescription">Cached value of the description.</param>
        /// <returns></returns>
        protected virtual IFunction InstantiateFunctionFromCache(
            string virtualPath,
            string @namespace,
            string name,
            string cachedReturnType,
            string cachedDescription)
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
            public string ReturnType { get; set; }
            public string Description { get; set; }
        }
	}
}
