using System;
using System.Linq;
using Composite.Core.Collections.Generic;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Functions
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class FunctionCallEditorManager
    {
        private static readonly Hashtable<string, string> _customEditorUrls = new Hashtable<string, string>();

        /// <summary>
        /// Returns a relative path a to a custom funtion call editor for the specified function.
        /// </summary>
        /// <param name="functionName">The function name</param>
        /// <returns>A relative path to a custom call editor, or <value>null</value> if no custom editor was defined.</returns>
        public static string GetCustomEditorPath(string functionName)
        {
            var result = _customEditorUrls[functionName];

            if (result != null) return result;

            using (var c = new DataConnection())
            {
                return c.Get<ICustomFunctionCallEditorMapping>()
                        .Where(e => e.FunctionName == functionName)
                        .Select(e => e.CustomEditorPath)
                        .FirstOrDefault();
            }
        }

        /// <summary>
        /// Registers the custom call editor.
        /// </summary>
        /// <param name="functionName">Name of the function.</param>
        /// <param name="relativePath">The relative path.</param>
        public static void RegisterCustomCallEditor(string functionName, string relativePath)
        {
            lock (_customEditorUrls)
            {
                _customEditorUrls[functionName] = relativePath;
            }
        }
    }
}
