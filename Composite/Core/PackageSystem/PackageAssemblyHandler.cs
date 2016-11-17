using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.C1Console.Events;
using Composite.Core.Types.Foundation;


namespace Composite.Core.PackageSystem
{
    internal static class PackageAssemblyHandler
    {
        private static bool _initialized;
        private static readonly object _lock = new object();
        private static AssemblyFilenameCollection _loadedAssemblyFilenames = new AssemblyFilenameCollection();
        private static List<Assembly> _inMemoryAssemblies = new List<Assembly>();

        public static void Initialize()
        {
            if (_initialized) return;

            lock (_lock)
            {
                if (_initialized) return;

                GlobalEventSystemFacade.SubscribeToFlushEvent(args => ClearAssemblyList());

                AppDomain.CurrentDomain.AssemblyResolve += OnAssemblyResolve;
                AppDomain.CurrentDomain.AssemblyLoad += OnAssemblyLoad;

                _initialized = true;
            }
        }

        private static void OnAssemblyLoad(object sender, AssemblyLoadEventArgs args)
        {
            var asm = args.LoadedAssembly;
            if (!asm.IsDynamic)
            {
                Log.LogVerbose(nameof(PackageAssemblyHandler), $"Assembly loaded: {asm.Location}");
            }
        }


        public static void AddAssembly(string assemblyFilePath)
        {
            Initialize();

            lock (_lock)
            {
                _loadedAssemblyFilenames.Add(assemblyFilePath);
            }
        }


        public static Assembly TryGetAlreadyLoadedAssembly(string assemblyFileName)
        {
            string assemblyName = AssemblyFilenameCollection.GetAssemblyName(assemblyFileName);

            lock (_lock)
            {
                return _inMemoryAssemblies.FirstOrDefault(asm => asm.GetName().Name == assemblyName);
            }
        }


        private static Assembly OnAssemblyResolve(object sender, ResolveEventArgs args)
        {
            string filename = args.Name;

            string fn = filename;
            if (fn.Contains(","))
            {
                fn = fn.Remove(fn.IndexOf(',')).Trim();
            }

            if (_loadedAssemblyFilenames.ContainsAssemblyName(fn))
            {
                filename = _loadedAssemblyFilenames.GetFilenameByAssemblyName(fn);
            }

            Assembly assembly = null;
            if (filename.Contains(@":\"))
            {
                try
                {
                    assembly = Assembly.LoadFrom(filename);
                }
                catch (Exception ex)
                {
                    Log.LogError(nameof(PackageAssemblyHandler), ex);
                }

                lock (_lock)
                {
                    _inMemoryAssemblies.Add(assembly);
                }
            }

            return assembly;
        }


        public static void ClearAssemblyList()
        {
            lock (_lock)
            {
                _loadedAssemblyFilenames = new AssemblyFilenameCollection();
                _inMemoryAssemblies = new List<Assembly>();
            }
        }
    }
}
