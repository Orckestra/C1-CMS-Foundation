using System.Collections.Generic;
using System.Globalization;


namespace Composite.Core.ResourceSystem.Plugins.ResourceProvider
{
	internal interface ILocalizationProvider : IResourceProvider
	{
	    IEnumerable<string> GetSections();

        string GetString(string section, string stringId, CultureInfo cultureInfo);

        /// <summary>
        /// A dictionary of stringId -> stringValue
        /// </summary>
        /// <returns></returns>
        IDictionary<string, string> GetAllStrings(string section, CultureInfo cultureInfo);

        IEnumerable<CultureInfo> GetSupportedCultures();
	}
}
