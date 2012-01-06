using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel;
using System.IO;
using System.Linq;


namespace Composite.Core.Types
{
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    internal static class AssemblyLocationExtensions
    {
        /// <summary>
        /// Adds assembly locations to a string collection of the collection does not already has them.
        /// Note: Case insensitive
        /// </summary>
        /// <param name="stringCollection"></param>
        /// <param name="assemblyLocations"></param>
        /// <exclude />
        public static void AddRangeIfNotContained(this StringCollection stringCollection, IEnumerable<string> assemblyLocations)
        {
            foreach (string assemblyLocation in assemblyLocations)
            {
                AddIfNotContained(stringCollection, assemblyLocation);
            }
        }


        /// <summary>
        /// Adds a assembly location to a string collection of the collection does not already has it.
        /// Note: Case insensitive
        /// </summary>
        /// <param name="stringCollection"></param>
        /// <param name="assemblyLocation"></param>
        /// <exclude />
        public static void AddIfNotContained(this StringCollection stringCollection, string assemblyLocation)
        {
            string assemblyFileName = Path.GetFileName(assemblyLocation);

            bool isContained = stringCollection.
                OfType<string>().
                Where(f => f.IndexOf(assemblyFileName, StringComparison.InvariantCultureIgnoreCase) >= 0).
                Any();

            if (!isContained)
            {
                stringCollection.Add(assemblyLocation);
            }
        }
    }
}
