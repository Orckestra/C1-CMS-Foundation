using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using Composite.C1Console.Events;
using Composite.Core.Types.Foundation;


namespace Composite.Core.PackageSystem
{
    internal static class PackageAssemblyHandler
    {
        private static bool _initialized = false;
        private static readonly object _lock = new object();
        private static AssemblyFilenameCollection _loadedAssemblyFilenames = new AssemblyFilenameCollection();


        public static void Initialize()
        {
            if (!_initialized)
            {
                lock (_lock)
                {
                    if (!_initialized)
                    {
                        GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);

                        AppDomain.CurrentDomain.AssemblyResolve += OnAssemblyResolve;

                        _initialized = true;
                    }
                }
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



        private static Assembly OnAssemblyResolve(object sender, ResolveEventArgs args)
        {
            string filename = args.Name;

            // Why can the system not load the "System.Web.Extensions" assembly? 
            // And "Composite.Core.XmlSerializers" <-- Licensing?
            // For now ignore it, so no exception is thrown /MRJ
            if ((filename == "System.Web.Extensions") ||
                (filename.StartsWith("Composite.Core.XmlSerializers") == true))
            {
                return null;
            }

            string fn = filename;
            if (fn.Contains(",") == true)
            {
                fn = fn.Remove(fn.IndexOf(",")).Trim();
            }

            if (_loadedAssemblyFilenames.ContainsAssemblyName(fn) == true)
            {
                filename = _loadedAssemblyFilenames.GetFilenameByAssemblyName(fn);
            }

            Assembly assembly = null;
            if (filename.Contains(@":\"))
            {
                try
                {
                    assembly = Assembly.LoadFile(filename);
                }
                catch (Exception ex)
                {
                    Log.LogError("PackageAssemblyHandler", ex);
                }
            }

            return assembly;
        }


        public static void ClearAssemblyList()
        {
            Flush();
        }


        private static void Flush()
        {
            lock (_lock)
            {
                _loadedAssemblyFilenames = new AssemblyFilenameCollection();
            }
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }
    }
}
