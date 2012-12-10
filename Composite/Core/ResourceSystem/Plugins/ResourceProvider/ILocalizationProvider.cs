using System.Collections.Generic;
using System.Globalization;
using Composite.Core.Collections.Generic;


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
        ReadOnlyDictionary<string, string> GetAllStrings(string section, CultureInfo cultureInfo);

        IEnumerable<CultureInfo> GetSupportedCultures();
	}
}
