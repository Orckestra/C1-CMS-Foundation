using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using Composite.Core;
using Composite.Core.IO;
using Composite.Functions;
using Composite.Functions.Plugins.FunctionProvider;

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
                    string ns = ExtractFunctionNamespace(file.FullName);
                    string name = Path.GetFileNameWithoutExtension(file.Name);

                    var virtualPath = CombineVirtualPath(VirtualPath, 
                                                         ns.Replace(".", "/"), 
                                                         name + "." + FileExtension);

                    if(ns == string.Empty)
                    {
                        ns = DefaultFunctionNamespace;
                    }

                    IFunction function;

                    try
                    {
                        function = InstantiateFunction(virtualPath, ns, name);
                    }
                    catch (ThreadAbortException)
                    {
                        throw;
                    }
                    catch (Exception ex)
                    {
                        Log.LogError(LogTitle, "Error instantiating {0} function", name);
                        Log.LogError(LogTitle, ex);

                        returnList.Add(new NotLoadedFileBasedFunction<FunctionType>(this, ns, name, virtualPath, ex));
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
	}
}
