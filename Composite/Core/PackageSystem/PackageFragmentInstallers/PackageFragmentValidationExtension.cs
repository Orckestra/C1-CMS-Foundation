using System;
using System.Collections.Generic;
using System.Xml.Linq;

namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <exclude />
    public static class PackageFragmentValidationExtension
    {
        internal static void AddFatal(this IList<PackageFragmentValidationResult> validationResults, Exception exception)
        {
            validationResults.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, exception));
        }

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
