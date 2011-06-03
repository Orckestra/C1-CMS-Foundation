using System;
using System.Collections.Generic;
using System.Globalization;
using Composite.Core.ResourceSystem;
using Composite.Data.ProcessControlled;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class DataLocalizationFacade
    {
        private static IDataLocalizationFacade _dataLocalizationFacade = new DataLocalizationFacadeImpl();


        internal static IDataLocalizationFacade Implementation { get { return _dataLocalizationFacade; } set { _dataLocalizationFacade = value; } }


        /// <exclude />
        public static bool UseLocalization 
        {
            get
            {
                return _dataLocalizationFacade.UseLocalization;
            }
        }


        /// <exclude />
        public static IEnumerable<CultureInfo> WhiteListedLocales
        {
            get
            {
                return _dataLocalizationFacade.WhiteListedLocales;
            }
        }


        /// <exclude />
        public static CultureInfo DefaultUrlMappingCulture
        {
            get
            {
                return _dataLocalizationFacade.DefaultUrlMappingCulture;
            }
        }


        /// <exclude />
        public static CultureInfo DefaultLocalizationCulture
        {
            get
            {
                return _dataLocalizationFacade.DefaultLocalizationCulture;
            }
            internal set
            {
                _dataLocalizationFacade.DefaultLocalizationCulture = value;
            }
        }


        // Overload to ActiveLocalizationNames
        /// <exclude />
        public static IEnumerable<CultureInfo> ActiveLocalizationCultures
        {
            get
            {
                foreach (string cultureName in _dataLocalizationFacade.ActiveLocalizationNames)
                {
                    yield return CultureInfo.CreateSpecificCulture(cultureName);
                }
            }
        }


        /// <exclude />
        public static IEnumerable<string> ActiveLocalizationNames
        {
            get
            {
                return _dataLocalizationFacade.ActiveLocalizationNames;
            }
        }


        /// <exclude />
        public static string GetUrlMappingName(CultureInfo cultureInfo)
        {
            return _dataLocalizationFacade.GetUrlMappingName(cultureInfo);
        }


        /// <exclude />
        public static CultureInfo GetCultureInfoByUrlMappingName(string urlMappingName)
        {
            return _dataLocalizationFacade.GetCultureInfoByUrlMappingName(urlMappingName);
        }


        /// <exclude />
        public static IEnumerable<string> UrlMappingNames
        {
            get
            {
                return _dataLocalizationFacade.UrlMappingNames;
            }
        }


        // Overlaod
        /// <summary>
        /// Tells if a IData is currently localized or not
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static bool IsLocalized(this IData data)
        {
            if (data == null) throw new ArgumentNullException("data");
            
            return IsLocalized(data.DataSourceId.InterfaceType);
        }



        /// <summary>
        /// Tells if a IData is currently localized or not
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public static bool IsLocalized(Type type)
        {
            if (type == null) throw new ArgumentNullException("type");

            return _dataLocalizationFacade.IsLocalized(type);
        }



        // Overload
        /// <summary>
        /// Tells if a type can be localized. Currently is dynamic types and IPage that
        /// can be localized. This does not tell if the given type IS currently localized.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static bool IsLocalizable(this IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            return IsLocalizable(data.DataSourceId.InterfaceType);
        }



        /// <summary>
        /// Tells if a type can be localized. Currently is dynamic types and IPage that
        /// can be localized. This does not tell if the given type IS currently localized.
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public static bool IsLocalizable(Type type)
        {
            if (type == null) throw new ArgumentNullException("type");

            return _dataLocalizationFacade.IsLocalizable(type);
        }


        /// <exclude />
        public static IEnumerable<ReferenceFailingPropertyInfo> GetReferencingLocalizeFailingProperties(ILocalizedControlled data)
        {
            return _dataLocalizationFacade.GetReferencingLocalizeFailingProperties(data);
        }


        /// <exclude />
        public static string GetCultureTitle(CultureInfo culture)
        {
            return _dataLocalizationFacade.GetCultureTitle(culture);
        }
    }
}
