using System;
using System.Collections.Generic;
using System.Xml.Linq;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Core_PackageSystem_PackageFragmentInstallers;

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

        /// <summary>
        /// Gets a single configuration element. Elements other than the specified one will cause validation errors.
        /// </summary>
        internal static XElement GetSingleConfigurationElement(this XElement configurationElement,  string elementName, IList<PackageFragmentValidationResult> validationResult, bool required)
        {
            XElement result = null;

            foreach (var element in configurationElement.Elements())
            {
                if (element.Name.LocalName != elementName)
                {
                    validationResult.AddFatal(Texts.PackageFragmentInstaller_IncorrectElement(element.Name.LocalName, elementName), element);
                    continue;
                }
                 
                if (result != null)
                {
                    validationResult.AddFatal(Texts.PackageFragmentInstaller_OnlyOneElementAllowed(elementName));
                    return null;
                }

                result = element;
            }

            if (required && result == null)
            {
                validationResult.AddFatal(Texts.PackageFragmentInstaller_MissingElement(elementName));
            }

            return result;
        }

        /// <summary>
        /// Gets a child configuration elements. Elements with names other than the specified one will cause validation errors.
        /// </summary>
        internal static IEnumerable<XElement> GetConfigurationElements(this XElement configurationElement, string elementName, IList<PackageFragmentValidationResult> validationResult)
        {
            var result = new List<XElement>();

            foreach (var element in configurationElement.Elements())
            {
                if (element.Name.LocalName != elementName)
                {
                    validationResult.AddFatal(Texts.PackageFragmentInstaller_IncorrectElement(element.Name.LocalName, elementName), element);
                    continue;
                }

                result.Add(element);
            }

            return result;
        }
    }
}
