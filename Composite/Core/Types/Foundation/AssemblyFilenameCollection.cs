using System;
using System.Collections.Generic;
using System.IO;


namespace Composite.Core.Types.Foundation
{
    internal sealed class AssemblyFilenameCollection
    {
        private Dictionary<string, string> _assemblyFilenames = new Dictionary<string, string>();



        public bool ContainsAssemblyFilename(string assemblyFilename)
        {
            if (string.IsNullOrEmpty(assemblyFilename) == true) throw new ArgumentNullException("assemblyFilename");

            string assemblyName = GetAssemblyName(assemblyFilename);

            return _assemblyFilenames.ContainsKey(assemblyName);
        }



        public bool ContainsAssemblyName(string assemblyName)
        {
            if (string.IsNullOrEmpty(assemblyName) == true) throw new ArgumentNullException("assemblyName");

            return _assemblyFilenames.ContainsKey(assemblyName);
        }



        public void Add(string assemblyFilename)
        {
            if (string.IsNullOrEmpty(assemblyFilename) == true) throw new ArgumentNullException("assemblyFilename");

            string assemblyName = GetAssemblyName(assemblyFilename);

            _assemblyFilenames[assemblyName] = assemblyFilename;
        }



        public string GetFilenameByAssemblyName(string assemblyName)
        {
            if (string.IsNullOrEmpty(assemblyName) == true) throw new ArgumentNullException("assemblyName");

            string assemblyFilename;
            if (_assemblyFilenames.TryGetValue(assemblyName, out assemblyFilename) == false) throw new ArgumentException(string.Format("Does not contain the assembly name '{0}'", assemblyName));

            return assemblyFilename;
        }



        public static string GetAssemblyName(string assemblyFilename)
        {
            string filename = Path.GetFileName(assemblyFilename);

            string extension = Path.GetExtension(filename);

            filename = filename.Remove(filename.Length - extension.Length);

            return filename;
        }
    }
}
