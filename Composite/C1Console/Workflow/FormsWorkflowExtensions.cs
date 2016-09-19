using System.Collections.Generic;

namespace Composite.C1Console.Workflow
{
    public static class FormsWorkflowExtensions
    {
        private static readonly List<IFormsWorkflowExtension> _extensions = new List<IFormsWorkflowExtension>();

        public static void Register(IFormsWorkflowExtension extension) => _extensions.Add(extension);

        internal static ICollection<IFormsWorkflowExtension> GetExtensions() => _extensions;
    }
}
