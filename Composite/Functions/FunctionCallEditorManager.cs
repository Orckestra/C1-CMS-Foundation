using System;
using System.Linq;
using Composite.Core.Collections.Generic;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.IO;

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
            var sourcePath = _customEditorUrls[functionName];

            if (sourcePath == null)
            {
                using (var c = new DataConnection())
                {
                    sourcePath = c.Get<ICustomFunctionCallEditorMapping>()
                            .Where(e => e.FunctionName == functionName)
                            .Select(e => e.CustomEditorPath)
                            .FirstOrDefault();
                }
            }

            if (sourcePath == null)
            {
                return null;
            }

            return PathUtil.Resolve(sourcePath);
        }

        /// <summary>
        /// Registers the custom call editor.
        /// </summary>
        /// <param name="functionName">Name of the function.</param>
        /// <param name="tildeBasedPath">A tilde based website path, like ~/Composite/custom.aspx</param>
        public static void RegisterCustomCallEditor(string functionName, string tildeBasedPath)
        {
            Verify.ArgumentCondition(tildeBasedPath.StartsWith("~"), "tildeBasedPath", "Must start with tilde (~)");

            lock (_customEditorUrls)
            {
                _customEditorUrls[functionName] = tildeBasedPath;
            }
        }
    }
}
