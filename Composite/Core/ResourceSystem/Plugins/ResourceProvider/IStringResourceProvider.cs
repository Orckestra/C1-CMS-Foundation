using System.Collections.Generic;
using System.Globalization;


namespace Composite.Core.ResourceSystem.Plugins.ResourceProvider
{
	internal interface IStringResourceProvider : IResourceProvider
	{
        string GetStringValue(string stringId, CultureInfo cultureInfo);

        /// <summary>
        /// A dictionary of stringId -> stringValue
        /// </summary>
        /// <returns></returns>
        IDictionary<string, string> GetAllStrings(CultureInfo cultureInfo);

        IEnumerable<CultureInfo> GetSupportedCultures();
	}
}
