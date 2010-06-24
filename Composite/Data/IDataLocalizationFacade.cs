using System;
using System.Collections.Generic;
using System.Globalization;
using Composite.Data.ProcessControlled;


namespace Composite.Data
{
	internal interface IDataLocalizationFacade
	{
        /// <summary>
        /// This method return true if the system should use localization functionallity.
        /// In ohter words, if there are two or more languages added then localization functionallity
        /// should be used.
        /// </summary>
        bool UseLocalization { get; }

        IEnumerable<CultureInfo> WhiteListedLocales { get; }

        CultureInfo DefaultLocalizationCulture { get; set; }
        CultureInfo DefaultUrlMappingCulture { get; }
        IEnumerable<string> ActiveLocalizationNames { get; }

        string GetUrlMappingName(CultureInfo cultureInfo);
        CultureInfo GetCultureInfoByUrlMappingName(string urlMappingName);
        IEnumerable<string> UrlMappingNames { get; }

        bool IsLocalized(Type type);
        bool IsLocalizable(Type type);

        IEnumerable<ReferenceFailingPropertyInfo> GetReferencingLocalizeFailingProperties(ILocalizedControlled data);
	}
}
