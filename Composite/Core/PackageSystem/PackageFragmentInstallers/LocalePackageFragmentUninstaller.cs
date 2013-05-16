using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using System.Globalization;
using Composite.Core.Localization;


namespace Composite.Core.PackageSystem.PackageFragmentInstallers
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class LocalePackageFragmentUninstaller : BasePackageFragmentUninstaller
    {
        private List<CultureInfo> _culturesToUninstall = null;
        private CultureInfo _oldDefaultCultureInfo = null;


        /// <exclude />
        public override IEnumerable<PackageFragmentValidationResult> Validate()
        {
            List<PackageFragmentValidationResult> validationResults = new List<PackageFragmentValidationResult>();

            if (this.Configuration.Count(f => f.Name == "Locales") > 1)
            {
                validationResults.AddFatal(GetText("VirtualElementProviderNodePackageFragmentUninstaller.OnlyOneElement"));
                return validationResults;
            }

            XElement localesElement = this.Configuration.SingleOrDefault(f => f.Name == "Locales");

            _culturesToUninstall = new List<CultureInfo>();

            if (localesElement != null)
            {
                XAttribute oldDefaultAttribute = localesElement.Attribute("oldDefault");
                if (oldDefaultAttribute != null)
                {
                    _oldDefaultCultureInfo = CultureInfo.CreateSpecificCulture(oldDefaultAttribute.Value);
                }

                foreach (XElement localeElement in localesElement.Elements("Locale").Reverse())
                {
                    CultureInfo locale = CultureInfo.CreateSpecificCulture(localeElement.Attribute("name").Value);

                    if ((_oldDefaultCultureInfo == null) && (LocalizationFacade.IsDefaultLocale(locale)))
                    {
                        // Locale is default -> not possible to unintall
                        validationResults.AddFatal(GetText("VirtualElementProviderNodePackageFragmentUninstaller.OnlyOneElement"));
                        continue;
                    }

                    if (LocalizationFacade.IsOnlyActiveLocaleForSomeUsers(locale))
                    {
                        // only active for the a user
                        validationResults.AddFatal(GetText("VirtualElementProviderNodePackageFragmentUninstaller.OnlyOneElement"));
                        continue;
                    }

                    if (LocalizationFacade.IsLocaleInstalled(locale))
                    {
                        _culturesToUninstall.Add(locale);
                    }
                }
            }


            if (validationResults.Count > 0)
            {
                _culturesToUninstall = null;
                _oldDefaultCultureInfo = null;
            }

            return validationResults;
        }



        /// <exclude />
        public override void Uninstall()
        {
            if (_oldDefaultCultureInfo != null)
            {
                Log.LogVerbose("LocalePackageFragmentUninstaller", string.Format("Restoring default locale to '{0}'", _oldDefaultCultureInfo));

                LocalizationFacade.SetDefaultLocale(_oldDefaultCultureInfo);
            }


            foreach (CultureInfo locale in _culturesToUninstall.Reverse<CultureInfo>())
            {
                Log.LogVerbose("LocalePackageFragmentUninstaller", string.Format("Removing the locale '{0}'", locale));

                LocalizationFacade.RemoveLocale(locale, false);
            }
        }

        private static string GetText(string stringId)
        {
            return GetResourceString(stringId);
        }
    }
}
