using System;
using System.Collections.Generic;
using Composite.C1Console.Elements;

namespace Composite.Core.PageTemplates
{
    /// <summary>
    /// Contains information about a code file shared between page template.
    /// </summary>
    public class SharedFile
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SharedFile"/> class.
        /// </summary>
        /// <param name="filePath">The file path.</param>
        public SharedFile(string relativeFilePath)
        {
            RelativeFilePath = relativeFilePath;
            DefaultEditAction = true;
        }

        /// <summary>
        /// Full path to the code file.
        /// </summary>
        public string RelativeFilePath { get; set; }

        /// <summary>
        /// Indicating whether the default edit action should be shown.
        /// </summary>
        public bool DefaultEditAction { get; set; }


        /// <summary>
        /// Gets the custom element actions.
        /// </summary>
        /// <returns></returns>
        public virtual IEnumerable<ElementAction> GetActions()
        {
            return new ElementAction[0];
        }
    }
}
