using System.Collections.Generic;
using System.Xml.Linq;

namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    internal static class PackageFragmentValidationExtension
    {
        internal static PackageFragmentValidationResult AddFatal(this IList<PackageFragmentValidationResult> validationResults, string message)
        {
            return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, message);
        }

        internal static PackageFragmentValidationResult AddFatal(this IList<PackageFragmentValidationResult> validationResults, string message, XObject configurationObject)
        {
            return new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, message, configurationObject);
        }
    }
}
