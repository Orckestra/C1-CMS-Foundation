using System.Linq;
using Composite.Core.Collections.Generic;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.WebClient;

namespace Composite.Functions
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class FunctionCallEditorManager
    {
        private static readonly Hashtable<string, FunctionCallEditorSettings> _customEditorSettings = new Hashtable<string, FunctionCallEditorSettings>();

        /// <summary>
        /// Returns a relative path a to a custom funtion call editor for the specified function.
        /// </summary>
        /// <param name="functionName">The function name</param>
        /// <returns>A relative path to a custom call editor, or <value>null</value> if no custom editor was defined.</returns>
        public static FunctionCallEditorSettings GetCustomEditorSettings(string functionName)
        {
            var settings = _customEditorSettings[functionName];
            if (settings != null)
            {
                return settings;
            }

            using (var c = new DataConnection())
            {
                var mapping = c.Get<ICustomFunctionCallEditorMapping>().FirstOrDefault(e => e.FunctionName == functionName);

                if (mapping != null)
                {
                    return new FunctionCallEditorSettings
                    {
                        Url = UrlUtils.ResolvePublicUrl(mapping.CustomEditorPath),
                        Width = mapping.Width,
                        Height = mapping.Height
                    };
                }
            }

            return null;
        }

        /// <summary>
        /// Registers the custom call editor.
        /// </summary>
        /// <param name="functionName">Name of the function.</param>
        /// <param name="tildeBasedPath">A tilde based website path, like ~/Composite/custom.aspx</param>
        public static void RegisterCustomCallEditor(string functionName, string tildeBasedPath)
        {
            RegisterCustomCallEditor(functionName, tildeBasedPath, null, null);
        }

        /// <summary>
        /// Registers the custom call editor.
        /// </summary>
        /// <param name="functionName">Name of the function.</param>
        /// <param name="tildeBasedPath">A tilde based website path, like ~/Composite/custom.aspx</param>
        /// <param name="width">The width.</param>
        /// <param name="height">The height.</param>
        public static void RegisterCustomCallEditor(string functionName, string tildeBasedPath, int? width, int? height)
        {
            Verify.ArgumentCondition(tildeBasedPath.StartsWith("~"), "tildeBasedPath", "Must start with tilde (~)");

            lock (_customEditorSettings)
            {
                _customEditorSettings[functionName] = new FunctionCallEditorSettings
                    {
                        Url = UrlUtils.ResolvePublicUrl(tildeBasedPath),
                        Width = width,
                        Height = height
                    };
            }
        }
    }
}
