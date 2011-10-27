using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Localization;
using Composite.Core.ResourceSystem;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Core.Logging;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class LocalePackageFragmentInstaller : BasePackageFragmentInstaller
    {
        List<Tuple<CultureInfo, string, bool>> _localesToInstall = null;


        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            List<PackageFragmentValidationResult> validationResult = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Where(f => f.Name == "Locales").Count() > 1)
            {
                validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, StringResourceSystemFacade.GetString("Composite.Core.PackageSystem.PackageFragmentInstallers", "VirtualElementProviderNodeAddOnFragmentInstaller.OnlyOneElement")));
                return validationResult;
            }

            XElement areasElement = this.Configuration.Where(f => f.Name == "Locales").SingleOrDefault();

            _localesToInstall = new List<Tuple<CultureInfo, string, bool>>();

            if (areasElement != null)
            {
                foreach (XElement localeElement in areasElement.Elements("Locale"))
                {
                    XAttribute nameAttribute = localeElement.Attribute("name");
                    XAttribute urlMappingNameAttribute = localeElement.Attribute("urlMappingName");
                    XAttribute defaultAttribute = localeElement.Attribute("default");

                    if (nameAttribute == null)
                    {
                        // Missing attribute
                        validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.Core.PackageSystem.PackageFragmentInstallers", "FileAddOnFragmentInstaller.MissingAttribute"), "order"), localeElement));
                        continue;
                    }

                    CultureInfo cultureInfo;
                    try
                    {
                        cultureInfo = CultureInfo.CreateSpecificCulture(nameAttribute.Value);
                    }
                    catch
                    {
                        // Name error
                        validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.Core.PackageSystem.PackageFragmentInstallers", "FileAddOnFragmentInstaller.MissingAttribute"), "order"), nameAttribute));
                        continue;
                    }

                    if (LocalizationFacade.IsLocaleInstalled(cultureInfo) == true)
                    {
                        continue; // Skip it, it is installed
                    }

                    if (_localesToInstall.Where(f => f.Item1.Equals(cultureInfo)).Any() == true)
                    {
                        // Already installed or going to be installed
                        validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.Core.PackageSystem.PackageFragmentInstallers", "FileAddOnFragmentInstaller.MissingAttribute"), "order"), nameAttribute));
                        continue;
                    }

                    string urlMappingName = cultureInfo.Name;
                    if (urlMappingNameAttribute != null)
                    {
                        urlMappingName = urlMappingNameAttribute.Value;
                    }

                    if ((LocalizationFacade.IsUrlMappingNameInUse(urlMappingName) == true) || (_localesToInstall.Where(f => f.Item2 == urlMappingName).Any() == true))
                    {
                        // Url mapping name alread used or going to be used
                        validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.Core.PackageSystem.PackageFragmentInstallers", "FileAddOnFragmentInstaller.MissingAttribute"), "order"), urlMappingNameAttribute));
                        continue;
                    }

                    bool isDefault = false;
                    if (defaultAttribute != null)
                    {
                        if (defaultAttribute.TryGetBoolValue(out isDefault) == false)
                        {
                            // Wrong attribute value
                            validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.Core.PackageSystem.PackageFragmentInstallers", "FileAddOnFragmentInstaller.MissingAttribute"), "order"), defaultAttribute));
                            continue;
                        }
                    }

                    if ((isDefault == true) && (_localesToInstall.Where(f => f.Item3 == true).Any() == true))
                    {
                        // More than one is specified as default
                        validationResult.Add(new PackageFragmentValidationResult(PackageFragmentValidationResultType.Fatal, string.Format(StringResourceSystemFacade.GetString("Composite.Core.PackageSystem.PackageFragmentInstallers", "FileAddOnFragmentInstaller.MissingAttribute"), "order"), defaultAttribute));
                        continue;
                    }

                    _localesToInstall.Add(new Tuple<CultureInfo, string, bool>(cultureInfo, urlMappingName, isDefault));

                    this.InstallerContext.AddPendingLocale(cultureInfo);
                }
            }


            if (validationResult.Count > 0)
            {
                _localesToInstall = null;
            }

            return validationResult;
        }



        /// <exclude />
        public override IEnumerable<XElement> Install()
        {
            if (_localesToInstall == null) throw new InvalidOperationException("LocalePackageFragmentInstaller has not been validated");

            XAttribute oldDefaultAttribute = null;
            if (DataLocalizationFacade.DefaultLocalizationCulture != null)
            {
                oldDefaultAttribute = new XAttribute("oldDefault", DataLocalizationFacade.DefaultLocalizationCulture.Name);
            }

            List<XElement> localeElements = new List<XElement>();

            foreach (Tuple<CultureInfo, string, bool> tuple in _localesToInstall)
            {
                LoggingService.LogVerbose("LocalePackageFragmentInstaller", string.Format("Adding the locale '{0}'", tuple.Item1));

                LocalizationFacade.AddLocale(tuple.Item1, tuple.Item2, true, false);

                if (tuple.Item3 == true)
                {
                    LoggingService.LogVerbose("LocalePackageFragmentInstaller", string.Format("Setting new default locale to '{0}'", tuple.Item1));

                    LocalizationFacade.SetDefaultLocale(tuple.Item1);
                }

                localeElements.Add(new XElement("Locale", new XAttribute("name", tuple.Item1.Name)));
            }

            XElement element = new XElement("Locales", localeElements);
            
            if (oldDefaultAttribute != null)
            {
                element.Add(oldDefaultAttribute);
            }
            
            yield return element;
        }
    }
}
