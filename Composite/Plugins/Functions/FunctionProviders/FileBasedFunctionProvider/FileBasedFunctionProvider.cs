using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Threading;
using Composite.Functions;
using Composite.Functions.Plugins.FunctionProvider;

namespace Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider
{
    internal abstract class FileBasedFunctionProvider<FunctionType> : IFunctionProvider where FunctionType : FileBasedFunction<FunctionType>
	{
        private static readonly string LogTitle = "FileBasedFunctionProvider";
		private static readonly object _lock = new object();

        private readonly C1FileSystemWatcher _watcher;
		private DateTime _lastUpdateTime;
        private readonly string _rootFolder;
        private readonly string _name;

		protected abstract string FileExtension { get; }
        protected abstract string DefaultFunctionNamespace { get; }
		protected abstract Type BaseType { get; }

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

				var files = new C1DirectoryInfo(PhysicalPath)
                    .GetFiles("*." + FileExtension, SearchOption.AllDirectories)
                    .Where(f => !f.Name.StartsWith("_", StringComparison.Ordinal));

				foreach (var file in files)
				{
                    string ns = ExtractFuctionNamespace(file.FullName);
                    string name = Path.GetFileNameWithoutExtension(file.Name);

                    var virtualPath = CombineVirtualPath(VirtualPath, 
                                                         ns.Replace(".", "/"), 
                                                         name + "." + FileExtension);

                    if(ns == string.Empty)
                    {
                        ns = DefaultFunctionNamespace;
                    }

					object obj;

					try
					{
						obj = InstantiateFile(virtualPath);
					}
					catch (Exception ex)
					{
                        Log.LogError(LogTitle, "Error instantiating {0} function", name);
                        Log.LogError(LogTitle, ex);

                        returnList.Add(new NotLoadedFileBasedFunction<FunctionType>(this, ns, name, virtualPath, ex));
						continue;
					}

                    if(!BaseType.IsInstanceOfType(obj))
                    {
                        continue;
                    }

					var parameters = GetParameters(obj);
					var returnType = GetReturnType(obj);
					var description = GetDescription(obj);
                    var function = (FileBasedFunction<FunctionType>)typeof(FunctionType)
                        .GetConstructors().First()
                        .Invoke(new object[] { ns, name, description, parameters, returnType, virtualPath, this });

					returnList.Add(function);
				}

				return returnList;
			}
		}

        private static string CombineVirtualPath(params string[] parts)
        {
            return string.Join("/", parts).Replace('\\', '/').Replace("///", "/").Replace("//", "/");
        }

        private string ExtractFuctionNamespace(string filePath)
        {
            Verify.That(filePath.StartsWith(PhysicalPath, StringComparison.OrdinalIgnoreCase), "File path should start with folder path");

            string directoryPath = Path.GetDirectoryName(filePath);
            string relativeDirectoryPath = directoryPath.Substring(PhysicalPath.Length);

            return string.Join(".", relativeDirectoryPath.Split(new[] { Path.DirectorySeparatorChar }, StringSplitOptions.RemoveEmptyEntries));
        }

		public FileBasedFunctionProvider(string name, string folder)
		{
			_name = name;

			VirtualPath = folder;
			PhysicalPath = PathUtil.Resolve(VirtualPath);

			_rootFolder = PhysicalPath.Split(new[] { Path.DirectorySeparatorChar }).Last();

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

		protected abstract Type GetReturnType(object obj);
		protected abstract object InstantiateFile(string virtualPath);
		protected abstract bool HandleChange(string path);

		private IDictionary<string, FunctionParameterHolder> GetParameters(object obj)
		{
			var dict = new Dictionary<string, FunctionParameterHolder>();

			var type = obj.GetType();
            while (type != BaseType && type != null)
			{
				var properties = type.GetProperties(BindingFlags.Instance | BindingFlags.Public | BindingFlags.SetProperty | BindingFlags.DeclaredOnly);
				foreach (var prop in properties)
				{
                    // Skipping overriden base properties
                    if (prop.GetAccessors()[0].GetBaseDefinition().DeclaringType == BaseType) continue;

					var propType = prop.PropertyType;
					var name = prop.Name;
					var att = prop.GetCustomAttributes(typeof(FunctionParameterAttribute), false).Cast<FunctionParameterAttribute>().FirstOrDefault();
					WidgetFunctionProvider widgetProvider = null;

					if (att != null && att.HasWidgetMarkup)
					{
                        try
                        {
                            widgetProvider = att.GetWidgetFunctionProvider(type, prop);
                        }
						catch(Exception ex)
					    {
					        Log.LogWarning(LogTitle, "Failed to get widget function provider for parameter property {0}"
                                                     .FormatWith(prop.Name));
					        Log.LogWarning(LogTitle, ex);
					    }
					}

					if (!dict.ContainsKey(name))
					{
						dict.Add(name, new FunctionParameterHolder(name, propType, att, widgetProvider));
					}
				}

				type = type.BaseType;
			}

			return dict;
		}

		protected virtual string GetDescription(object obj)
		{
			var attr = obj.GetType().GetCustomAttributes(typeof(FunctionAttribute), false).Cast<FunctionAttribute>().FirstOrDefault();
			if (attr != null)
			{
				return attr.Description;
			}

			return String.Format("A {0} function", _name);
		}

        public void ReloadFunctions()
        {
            lock (_lock)
            {
                using (ThreadDataManager.EnsureInitialize())
                {
                    FunctionNotifier.FunctionsUpdated();
                }

                _lastUpdateTime = DateTime.Now;
            }
   
        }

		private void Watcher_OnChanged(object sender, FileSystemEventArgs e)
		{
			if (FunctionNotifier != null && HandleChange(e.FullPath))
			{
                lock (_lock)
                {
                    var timeSpan = DateTime.Now - _lastUpdateTime;
                    if (timeSpan.TotalMilliseconds < 100)
                    {
                        return;
                    }

                    ReloadFunctions();
                }
			}
		}
	}
}
