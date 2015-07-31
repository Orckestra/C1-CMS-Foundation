using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Localization;
using Composite.Core.Xml;
using Composite.Data;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Core_PackageSystem_PackageFragmentInstallers;

namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// Adds a content language to console. 
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class LocalePackageFragmentInstaller : BasePackageFragmentInstaller
    {
        private static readonly string LogTitle = typeof (LocalePackageFragmentInstaller).Name;

        List<Tuple<CultureInfo, string, bool>> _localesToInstall;


        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            var validationResult = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Count(f => f.Name == "Locales") > 1)
            {
                validationResult.AddFatal(Texts.PackageFragmentInstaller_OnlyOneElementAllowed("Locales"));
                return validationResult;
            }

            XElement areasElement = this.Configuration.SingleOrDefault(f => f.Name == "Locales");

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
                        validationResult.AddFatal(Texts.PackageFragmentInstaller_MissingAttribute("name"), localeElement);
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
                        validationResult.AddFatal(Texts.PackageFragmentInstaller_MissingAttribute("name"), nameAttribute);
                        continue;
                    }

                    if (LocalizationFacade.IsLocaleInstalled(cultureInfo))
                    {
                        continue; // Skip it, it is installed
                    }

                    if (_localesToInstall.Any(f => f.Item1.Equals(cultureInfo)))
                    {
                        // Already installed or going to be installed
                        validationResult.AddFatal(Texts.PackageFragmentInstaller_MissingAttribute("name"), nameAttribute);
                        continue;
                    }

                    string urlMappingName = cultureInfo.Name;
                    if (urlMappingNameAttribute != null)
                    {
                        urlMappingName = urlMappingNameAttribute.Value;
                    }

                    if (LocalizationFacade.IsUrlMappingNameInUse(urlMappingName) || _localesToInstall.Any(f => f.Item2 == urlMappingName))
                    {
                        // Url mapping name already used or going to be used
                        validationResult.AddFatal(Texts.PackageFragmentInstaller_MissingAttribute("urlMappingName"), urlMappingNameAttribute);
                        continue;
                    }

                    bool isDefault = false;
                    if (defaultAttribute != null)
                    {
                        if (!defaultAttribute.TryGetBoolValue(out isDefault))
                        {
                            // Wrong attribute value
                            validationResult.AddFatal(Texts.PackageFragmentInstaller_MissingAttribute("default"), defaultAttribute);
                            continue;
                        }
                    }

                    if (isDefault && _localesToInstall.Any(f => f.Item3))
                    {
                        // More than one is specified as default
                        validationResult.AddFatal(Texts.PackageFragmentInstaller_MissingAttribute("default"), defaultAttribute);
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
            Verify.IsNotNull(_localesToInstall, typeof(LocalePackageFragmentInstaller).Name + " has not been validated");

            XAttribute oldDefaultAttribute = null;
            if (DataLocalizationFacade.DefaultLocalizationCulture != null)
            {
                oldDefaultAttribute = new XAttribute("oldDefault", DataLocalizationFacade.DefaultLocalizationCulture.Name);
            }
            
            var localeElements = new List<XElement>();

            foreach (Tuple<CultureInfo, string, bool> tuple in _localesToInstall)
            {
                Log.LogVerbose(LogTitle, "Adding the locale '{0}'", tuple.Item1);

                LocalizationFacade.AddLocale(tuple.Item1, tuple.Item2, true, false);

                if (tuple.Item3)
                {
                    Log.LogVerbose(LogTitle, "Setting new default locale to '{0}'", tuple.Item1);

                    LocalizationFacade.SetDefaultLocale(tuple.Item1);
                }

                localeElements.Add(new XElement("Locale", new XAttribute("name", tuple.Item1.Name)));
            }

            var element = new XElement("Locales", localeElements);
            
            if (oldDefaultAttribute != null)
            {
                element.Add(oldDefaultAttribute);
            }
            
            yield return element;
        }
    }
}
