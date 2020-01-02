using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Transactions;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Types;
using Composite.Data.Transactions;
using Composite.C1Console.Users;


namespace Composite.Core.Localization
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class LocalizationFacade
    {
        /// <summary>
        /// Returns true if the given locale is already installed
        /// </summary>
        /// <param name="cultureName"></param>
        /// <returns></returns>
        public static bool IsLocaleInstalled(string cultureName)
        {
            return IsLocaleInstalled(CultureInfo.CreateSpecificCulture(cultureName));
        }



        /// <summary>
        /// Returns true if the given locale is already installed
        /// </summary>
        /// <param name="cultureInfo"></param>
        /// <returns></returns>
        public static bool IsLocaleInstalled(CultureInfo cultureInfo)
        {
            return DataFacade.GetData<ISystemActiveLocale>().Any(f => f.CultureName == cultureInfo.Name);
        }



        /// <summary>
        /// Returns true if the given url mapping name has already been used
        /// </summary>
        /// <param name="urlMappingName"></param>
        /// <returns></returns>
        public static bool IsUrlMappingNameInUse(string urlMappingName)
        {
            return DataLocalizationFacade.UrlMappingNames.Contains(urlMappingName);
        }



        /// <summary>
        /// Returns true if the given url mapping name has already been used
        /// </summary>
        /// <param name="cultureInfoToExclude">This locale is disregarding when checking if url mapping is already used. 
        /// This is usefull when renaming the url mapping name for a given locale</param>
        /// <param name="urlMappingName"></param>
        /// <returns></returns>
        public static bool IsUrlMappingNameInUse(CultureInfo cultureInfoToExclude, string urlMappingName)
        {
            return IsUrlMappingNameInUse(cultureInfoToExclude.Name, urlMappingName);
        }



        /// <summary>
        /// Returns true if the given url mapping name has already been used
        /// </summary>
        /// <param name="cultureNameToExclude">This locale is disregarding when checking if url mapping is already used. 
        /// This is usefull when renaming the url mapping name for a given locale</param>
        /// <param name="urlMappingName"></param>
        /// <returns></returns>
        public static bool IsUrlMappingNameInUse(string cultureNameToExclude, string urlMappingName)
        {
            return DataFacade.GetData<ISystemActiveLocale>()
                             .Any(f => f.CultureName != cultureNameToExclude && f.UrlMappingName == urlMappingName);
        }     



        /// <summary>
        /// Adds a locale to the system. Throws exception if the given locale has already been installed or
        /// if the given url mapping name has already been used. If the given locale is the first, its set 
        /// to be the default locale.
        /// </summary>
        /// <param name="cultureName"></param>
        /// <param name="urlMappingName"></param>
        /// <param name="addAccessToAllUsers"></param>
        public static void AddLocale(string cultureName, string urlMappingName, bool addAccessToAllUsers = true)
        {
            AddLocale(CultureInfo.CreateSpecificCulture(cultureName), urlMappingName, addAccessToAllUsers);
        }



        /// <summary>
        /// Use this method to rename the url mapping name of a given installed locale. Throws exception if
        /// the given locale is not installed or if the given url mapping name is already used.
        /// </summary>
        /// <param name="cultureName"></param>
        /// <param name="newUrlMappingName"></param>
        public static void RenameUrlMappingNameForLocale(string cultureName, string newUrlMappingName)
        {
            Verify.That(IsLocaleInstalled(cultureName), "The locale '{0}' is not installed and the url mapping name can not be renamed", cultureName);
            Verify.That(!IsUrlMappingNameInUse(cultureName, newUrlMappingName), "The url mapping '{0}' is already used", newUrlMappingName);

            ISystemActiveLocale systemActiveLocale = DataFacade.GetData<ISystemActiveLocale>().Single(f => f.CultureName == cultureName);            
            systemActiveLocale.UrlMappingName = newUrlMappingName;
            DataFacade.Update(systemActiveLocale);
        }



        /// <summary>
        /// Adds a locale to the system. Throws exception if the given locale has already been installed or
        /// if the given url mapping name has already been used. If the given locale is the first, its set 
        /// to be the default locale.
        /// </summary>
        /// <param name="cultureInfo"></param>
        /// <param name="urlMappingName"></param>
        /// <param name="addAccessToAllUsers"></param>
        /// <param name="makeFlush"></param>
        public static void AddLocale(CultureInfo cultureInfo, string urlMappingName, bool addAccessToAllUsers = true, bool makeFlush = true)
        {
            AddLocale(cultureInfo, urlMappingName, addAccessToAllUsers, makeFlush, false);
        }




        /// <summary>
        /// Adds a locale to the system. Throws exception if the given locale has already been installed or
        /// if the given url mapping name has already been used. If the given locale is the first, its set 
        /// to be the default locale.
        /// </summary>
        /// <param name="cultureInfo"></param>
        /// <param name="urlMappingName"></param>
        /// <param name="addAccessToAllUsers"></param>
        /// <param name="makeFlush"></param>
        /// <param name="isDefault"></param>
        internal static void AddLocale(CultureInfo cultureInfo, string urlMappingName, bool addAccessToAllUsers, bool makeFlush, bool isDefault)
        {
            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                Verify.That(!IsLocaleInstalled(cultureInfo), "The locale '{0}' has already been added to the system", cultureInfo);
                Verify.That(!IsUrlMappingNameInUse(urlMappingName), "The url mapping name '{0}' has already been used in the system", urlMappingName);

                if (!DataLocalizationFacade.ActiveLocalizationCultures.Any())
                {
                    addAccessToAllUsers = true;
                }

                var systemActiveLocale = DataFacade.BuildNew<ISystemActiveLocale>();
                systemActiveLocale.Id = Guid.NewGuid();
                systemActiveLocale.CultureName = cultureInfo.Name;
                systemActiveLocale.UrlMappingName = urlMappingName;
                systemActiveLocale.IsDefault = isDefault;
                DataFacade.AddNew(systemActiveLocale);

                if (addAccessToAllUsers)
                {
                    List<string> usernames =
                        (from u in DataFacade.GetData<IUser>()
                         select u.Username).ToList();

                    foreach (string username in usernames)
                    {
                        UserSettings.AddActiveLocaleCultureInfo(username, cultureInfo);

                        if (UserSettings.GetCurrentActiveLocaleCultureInfo(username) == null)
                        {
                            UserSettings.SetCurrentActiveLocaleCultureInfo(username, cultureInfo);
                            UserSettings.SetForeignLocaleCultureInfo(username, cultureInfo);
                        }
                    }

                    List<Guid> usergroupids =
                        (from u in DataFacade.GetData<IUserGroup>()
                         select u.Id).ToList();

                    foreach (Guid usergroupid in usergroupids)
                    {
                        var groupLang = DataFacade.BuildNew<IUserGroupActiveLocale>();
                        groupLang.Id = Guid.NewGuid();
                        groupLang.CultureName = cultureInfo.ToString();
                        groupLang.UserGroupId = usergroupid;
                        DataFacade.AddNew(groupLang);
                    }
                }

                if (DataLocalizationFacade.DefaultLocalizationCulture == null)
                {
                    DataLocalizationFacade.DefaultLocalizationCulture = cultureInfo;
                }

                transactionScope.Complete();
            }

            DynamicTypeManager.AddLocale(cultureInfo);

            if (makeFlush)
            {
                C1Console.Events.GlobalEventSystemFacade.FlushTheSystem(false);
            }
        }



        /// <summary>
        /// Sets the given locale as default locale. Returns true if setted, false if the given locale is already the default locale.
        /// </summary>
        /// <param name="cultureInfo"></param>
        /// <returns></returns>
        public static bool SetDefaultLocale(CultureInfo cultureInfo)
        {
            Verify.That(IsLocaleInstalled(cultureInfo), "The locale '{0}' is not installed and can not be set as default", cultureInfo);
            
            if (!IsDefaultLocale(cultureInfo))
            {
                DataLocalizationFacade.DefaultLocalizationCulture = cultureInfo;
                return true;
            }

            return false;
        }



        /// <summary>
        /// Returns true if the given locale is default. Default locales can not be removed.
        /// </summary>
        /// <param name="cultureInfo"></param>
        /// <returns></returns>
        public static bool IsDefaultLocale(CultureInfo cultureInfo)
        {
            return IsDefaultLocale(cultureInfo.Name);
        }



        /// <summary>
        /// Returns true if the given locale is default. Default locales can not be removed.
        /// </summary>
        /// <param name="cultureName"></param>
        /// <returns></returns>
        public static bool IsDefaultLocale(string cultureName)
        {
            return DataLocalizationFacade.DefaultLocalizationCulture != null && cultureName == DataLocalizationFacade.DefaultLocalizationCulture.Name;
        }



        /// <summary>
        /// Returns true if only one installed locale is left. The last locale can not be removed.
        /// </summary>
        /// <returns></returns>
        public static bool IsLastLocale()
        {
            return DataFacade.GetData<ISystemActiveLocale>().Count() == 1;
        }



        /// <summary>
        /// Returns true if any types is localized.
        /// </summary>
        /// <returns></returns>
        public static bool IsTypesUsingLocalization()
        {
            return DataFacade.GetAllInterfaces().Any(DataLocalizationFacade.IsLocalized);
        }


        /// <summary>
        /// Returns true if the given locale is the only active locale for any user. 
        /// If this is the case, the locale can not be removed
        /// </summary>
        /// <param name="cultureName"></param>
        /// <returns></returns>
        public static bool IsOnlyActiveLocaleForSomeUsers(string cultureName)
        {
            return IsOnlyActiveLocaleForSomeUsers(CultureInfo.CreateSpecificCulture(cultureName));
        }



        /// <summary>
        /// Returns true if the given locale is the only active locale for any user. 
        /// If this is the case, the locale can not be removed
        /// </summary>
        /// <param name="cultureInfo"></param>
        /// <returns></returns>
        public static bool IsOnlyActiveLocaleForSomeUsers(CultureInfo cultureInfo)
        {
            List<string> usernames =
                (from u in DataFacade.GetData<IUser>()
                 select u.Username).ToList();

            foreach (string username in usernames)
            {
                List<CultureInfo> activeLocales = UserSettings.GetActiveLocaleCultureInfos(username).ToList();

                if (activeLocales.Count == 1 && activeLocales[0].Equals(cultureInfo))
                {
                    return true;
                }
            }

            return false;
        }



        /// <summary>
        /// Removes the given locale, all data is lost
        /// </summary>
        /// <param name="cultureName"></param>
        public static void RemoveLocale(string cultureName)
        {
            RemoveLocale(CultureInfo.CreateSpecificCulture(cultureName));
        }




        /// <summary>
        /// Removes the given locale, all data is lost
        /// </summary>
        /// <param name="cultureInfo"></param>
        /// <param name="makeFlush"></param>
        public static void RemoveLocale(CultureInfo cultureInfo, bool makeFlush = true)
        {
            Verify.That(!IsDefaultLocale(cultureInfo), "The locale '{0}' is the default locale and can not be removed", cultureInfo);
            Verify.That(!IsOnlyActiveLocaleForSomeUsers(cultureInfo), "The locale '{0}' is the only locale for some user(s) and can not be removed", cultureInfo);

            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                string cultureName = cultureInfo.Name;

                var systemActiveLocale = DataFacade.GetData<ISystemActiveLocale>().SingleOrDefault(f => f.CultureName == cultureName);

                Verify.IsNotNull(systemActiveLocale, "The locale '{0}' has not beed added and can not be removed", cultureInfo);

                List<string> usernames =
                    (from u in DataFacade.GetData<IUser>()
                     select u.Username).ToList();

                foreach (string username in usernames)
                {
                    if (cultureInfo.Equals(UserSettings.GetCurrentActiveLocaleCultureInfo(username)))
                    {
                        CultureInfo fallbackCultureInfo = UserSettings.GetActiveLocaleCultureInfos(username).First(f => !f.Equals(cultureInfo));

                        UserSettings.SetCurrentActiveLocaleCultureInfo(username, fallbackCultureInfo);
                    }

                    if (cultureInfo.Equals(UserSettings.GetForeignLocaleCultureInfo(username)))
                    {
                        UserSettings.SetForeignLocaleCultureInfo(username, null);
                    }

                    UserSettings.RemoveActiveLocaleCultureInfo(username, cultureInfo);
                }

                DataFacade.Delete<ISystemActiveLocale>(systemActiveLocale);

                transactionScope.Complete();
            }

            DynamicTypeManager.RemoveLocale(cultureInfo);
        }
    }
}
