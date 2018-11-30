using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using Composite.Core.Extensions;
using Composite.Data.Caching;
using Composite.Core.ResourceSystem.Foundation.PluginFacades;
using Composite.Core.Types;


namespace Composite.Core.ResourceSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class StringResourceSystemFacade
    {
        private static readonly string LogTitle = typeof (StringResourceSystemFacade).Name;
        private static Regex _regex = new Regex(@"\$\{(?<id>.+?)\}", RegexOptions.Compiled);

        private static readonly int ResourceCacheSize = 5000;
        private static readonly Cache<string, ExtendedNullable<string>> _resourceCache = new Cache<string, ExtendedNullable<string>>("Resource strings", ResourceCacheSize);

        private static readonly string Error_SectionNotDefined =  "*** SECTION NOT FOUND ***";
        private static readonly string Error_StringNotDefined = "*** STRING NOT FOUND ***";

        /// <exclude />
        public static void Initialize()
        {
        }



        /// <exclude />
        public static string GetString(string providerName, string stringName)
        {
            return GetString(providerName, stringName, true);
        }



        /// <exclude />
        public static string GetString(string section, string stringName, bool throwOnError)
        {
            Verify.ArgumentNotNullOrEmpty(section, "section");
            Verify.ArgumentNotNullOrEmpty(stringName, "stringName");

            var culture = Thread.CurrentThread.CurrentUICulture;

            string cacheKey = culture.Name + section + stringName;
            ExtendedNullable<string> cachedValue = _resourceCache.Get(cacheKey);
            if (cachedValue != null)
            {
                return cachedValue.Value;
            }

            if (throwOnError)
            {
                Verify.ArgumentCondition(!section.Contains(','), "section", "providerName may not contain ',' symbol");
                Verify.ArgumentCondition(!stringName.Contains(','), "stringName", "stringName may not contain ',' symbol");
            }


            string result = ResourceProviderPluginFacade.GetStringValue(section, stringName, culture);
            if(result != null)
            {
                _resourceCache.Add(cacheKey, new ExtendedNullable<string> {Value = result});
                return result;
            }

            if (!throwOnError)
            {
                return null;
            }

            if (!ResourceProviderPluginFacade.LocalizationSectionDefined(section))
            {
                Log.LogVerbose(LogTitle, "Localization section not defined '{0}:{1}'".FormatWith(section, stringName));

                return Error_SectionNotDefined;
            }


            Log.LogVerbose(LogTitle, "Localization string not defined '{0}:{1}'".FormatWith(section, stringName));

            return Error_StringNotDefined;
        }

        /// <summary>
        /// Returns a list of all defined localization sections
        /// </summary>
        /// <exclude />
        public static IEnumerable<string> GetLocalizationSectionNames()
        {
            return ResourceProviderPluginFacade.GetLocalizationSectionNames();
        }

        /// <exclude />
        public static bool TryGetString(string providerName, string stringName, out string resultString)
        {
            resultString = GetString(providerName, stringName, false);

            return resultString != null && (resultString != Error_SectionNotDefined) && (resultString != Error_StringNotDefined);
        }


        /// <exclude />
        public static List<KeyValuePair> GetLocalization(string providerName)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");
            Verify.ArgumentCondition(!providerName.Contains(','),  "providerName", "providerName may not contain ','");

            if (providerName == "XmlStringResourceProvider")
            {
                providerName = "Composite.Management";
            }

            IDictionary<string, string> translations = ResourceProviderPluginFacade.GetAllStrings(providerName);


            if(translations == null)
            {
                Log.LogVerbose(LogTitle, "Missing localization section: '{0}'".FormatWith(providerName));
                return new List<KeyValuePair>();
            }

            List<KeyValuePair> result = new List<KeyValuePair>();
            foreach (KeyValuePair<string, string> pair in translations)
            {
                result.Add(new KeyValuePair(pair.Key, pair.Value));
            }

            return result;
        }



        /// <exclude />
        public static IEnumerable<CultureInfo> GetSupportedCultures()
        {
            return ResourceProviderPluginFacade.GetSupportedStringCultures();
        }



        /// <exclude />
        public static CultureInfo GetDefaultStringCulture()
        {
            return CultureInfo.CreateSpecificCulture("en-US");
        }


        /// <summary>
        /// Returns a (localized) list of cultures, where the value is "(region) / (language)", where (language) is the language 
        /// application users will get, if they select the specified culture.
        /// </summary>
        /// <returns>A list of (culture name, region/language label) </returns>
        [Obsolete("Go call GetSupportedCulturesList()", true)]
        public static List<KeyValuePair> GetApplicationRegionAndLanguageList()
        {
            throw new NotImplementedException();
        }


        /// <summary>
        /// Returns a localized label for a culture. Fall back to system display name.
        /// </summary>
        /// <param name="culture">culture to get a localized label for</param>
        /// <returns>Label for the culture</returns>
        public static string GetCultureTitle(CultureInfo culture)
        {
            string localizedLanguageTitle;
            if (TryGetString("Composite.Cultures", culture.Name, out localizedLanguageTitle))
            {
                return localizedLanguageTitle;
            }

            return culture.DisplayName;
        }


        /// <summary>
        /// Returns a (localized) list of all cultures
        /// </summary>
        /// <returns>A dictionary of (culture name, region/language label) </returns>
        public static Dictionary<string, string> GetAllCultures()
        {
            var cultureInfos = CultureInfo.GetCultures(CultureTypes.SpecificCultures);
            Dictionary<string, string> cultures = cultureInfos.ToDictionary(f => f.Name, GetCultureTitle);
            return cultures.OrderBy(f => f.Value).ToDictionary(f => f.Key, f => f.Value);
        }


        /// <summary>
        /// Returns a (localized) list of cultures supported by the C1 Console 
        /// </summary>
        /// <returns>A list of (culture name, region/language label) </returns>
        public static List<KeyValuePair> GetSupportedCulturesList()
        {
            List<CultureInfo> supportedCultures = StringResourceSystemFacade.GetSupportedCultures().ToList();
            CultureInfo defaultCulture = StringResourceSystemFacade.GetDefaultStringCulture();

            List<KeyValuePair> translatedOptions = new List<KeyValuePair>();

            List<KeyValuePair> culturesLocalizedList = StringResourceSystemFacade.GetLocalization("Composite.Cultures");

            string defaultCultureDisplayName = culturesLocalizedList.Where(f => f.Key == defaultCulture.Name).Select(f => f.Value).FirstOrDefault();
            if (defaultCultureDisplayName == null) defaultCultureDisplayName = defaultCulture.EnglishName;

            foreach (CultureInfo culture in supportedCultures)
            {
                string cultureDisplayName = culturesLocalizedList.Where(f => f.Key == culture.Name).Select(f => f.Value).FirstOrDefault();
                if (cultureDisplayName == null) cultureDisplayName = culture.EnglishName;

                translatedOptions.Add(new KeyValuePair(culture.Name, cultureDisplayName));
            }

            translatedOptions = translatedOptions.OrderBy(f => f.Value).ToList();

            return translatedOptions;
        }



        /// <summary>
        /// Parses the <paramref name="stringToParse"/> for any localization strings
        /// if there is any matches and these have a value, then the string is replaced
        /// the result string is returned.
        /// </summary>
        /// <param name="stringToParse"></param>
        /// <returns></returns>
        public static string ParseString(string stringToParse)
        {
            if (stringToParse == null) return null;

            MatchCollection matchCollection = _regex.Matches(stringToParse);

            string currentString = stringToParse;
            foreach (Match match in matchCollection)
            {
                string compositeName = match.Groups["id"].Value;

                if (string.IsNullOrWhiteSpace(compositeName)) continue;

                int idx = compositeName.LastIndexOf(',');
                if (idx == -1) continue;

                string resourceStoreName = compositeName.Remove(idx);
                string stringName = compositeName.Remove(0, idx + 1).TrimStart(' ');

                string replacement = GetString(resourceStoreName, stringName);

                currentString = currentString.Replace(match.Value, replacement);
            }

            return currentString;
        }



        /// <exclude />
        public static IEnumerable<string> SplitParseableStrings(string stringToSplit, char separator)
        {
            if (string.IsNullOrEmpty(stringToSplit))
            {
                yield break;
            }

            bool isInIgnoreSeparatorMode = false;
            StringBuilder sb = new StringBuilder();

            foreach( char c in stringToSplit)
            {
                if (isInIgnoreSeparatorMode == false && c == separator)
                {
                    yield return sb.ToString();
                    sb = new StringBuilder();
                }
                else
                {
                    if (c == '}')
                    {
                        isInIgnoreSeparatorMode = false;
                    }

                    if (c == '$')
                    {
                        isInIgnoreSeparatorMode = true;
                    }

                    sb.Append(c);
                }
            }

            yield return sb.ToString();
        }
    }
}
