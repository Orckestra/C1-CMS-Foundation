using System.Collections.Generic;
using System.Xml.Linq;

namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    internal static class PackageFragmentValidationExtension
    {
        internal static void AddFatal(this IList<PackageFragmentValidationResult> validationResults, string message)
        {
            validationResults.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, message));
        }

        internal static void AddFatal(this IList<PackageFragmentValidationResult> validationResults, string message, XObject configurationObject)
        {
            validationResults.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, message, configurationObject));
        }
    }
}
