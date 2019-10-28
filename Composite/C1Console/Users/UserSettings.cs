using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using Composite.C1Console.Security;
using Composite.Core.Caching;
using Composite.Data;


namespace Composite.C1Console.Users
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class UserSettings
    {
        private static IUserSettingsFacade _implementation = new UserSettingsImpl();

        internal static IUserSettingsFacade Implementation { get { return _implementation; } set { _implementation = value; } }


        /// <exclude />
        public static string Username
        {
            get
            {
                return _implementation.Username;
            }
        }

        /// <summary>
        /// A language to which C1 console UI is translated to.
        /// </summary>
        public static CultureInfo C1ConsoleUiLanguage
        {
            get
            {
                return _implementation.C1ConsoleUiLanguage;
            }
            set
            {
                _implementation.C1ConsoleUiLanguage = value;
            }
        }

        /// <summary>
        /// Culture used in console UI for date/number formatting.
        /// </summary>
        public static CultureInfo CultureInfo
        {
            get
            {
                return _implementation.CultureInfo;
            }
            set
            {
                _implementation.CultureInfo = value;
            }
        }


        /// <exclude />
        public static CultureInfo GetUserCultureInfo(string username)
        {
            return _implementation.GetUserCultureInfo(username);
        }


        /// <exclude />
        public static CultureInfo GetUserC1ConsoleUiLanguage(string username)
        {
            return _implementation.GetUserC1ConsoleUiLanguage(username);
        }


        /// <exclude />
        public static void SetUserCultureInfo(string username, CultureInfo cultureInfo)
        {
            _implementation.SetUserCultureInfo(username, cultureInfo);
        }



        /// <exclude />
        public static void SetUserC1ConsoleUiLanguage(string username, CultureInfo cultureInfo)
        {
            _implementation.SetUserC1ConsoleUiLanguage(username, cultureInfo);
        }



        // Overload
        /// <summary>
        /// This is an overload for GetCurrentActiveLocaleCultureInfo(string username)
        /// using the current username.
        /// </summary>
        public static CultureInfo ActiveLocaleCultureInfo
        {
            get
            {
                return GetCurrentActiveLocaleCultureInfo(UserSettings.Username);
            }
            set
            {
                SetCurrentActiveLocaleCultureInfo(UserSettings.Username, value);
            }
        }


        /// <exclude />
        public static CultureInfo GetCurrentActiveLocaleCultureInfo(string username)
        {
            var key = "CurrentActiveCulture" + username;
            if (RequestLifetimeCache.HasKey(key)) return RequestLifetimeCache.TryGet<CultureInfo>(key);

            var cultureInfo = _implementation.GetCurrentActiveLocaleCultureInfo(username);
            var allowedCultures = GetActiveLocaleCultureInfos(username, true);

            if( !allowedCultures.Contains(cultureInfo)) cultureInfo = allowedCultures.FirstOrDefault();

            if (cultureInfo != null && !RequestLifetimeCache.HasKey(key)) RequestLifetimeCache.Add(key, cultureInfo);

            return cultureInfo ?? CultureInfo.InvariantCulture;
        }


        /// <exclude />
        public static void SetCurrentActiveLocaleCultureInfo(string username, CultureInfo cultureInfo)
        {
            _implementation.SetCurrentActiveLocaleCultureInfo(username, cultureInfo);
        }



        // Overload
        /// <summary>
        /// This is an overload for GetForeignLocaleCultureInfo(string username)
        /// using the current username.
        /// </summary>
        public static CultureInfo ForeignLocaleCultureInfo
        {
            get
            {
                return GetForeignLocaleCultureInfo(UserSettings.Username);
            }
            set
            {
                SetForeignLocaleCultureInfo(UserSettings.Username, value);
            }
        }


        /// <exclude />
        public static CultureInfo GetForeignLocaleCultureInfo(string username)
        {
            return _implementation.GetForeignLocaleCultureInfo(username);
        }


        /// <exclude />
        public static void SetForeignLocaleCultureInfo(string username, CultureInfo cultureInfo)
        {
            _implementation.SetForeignLocaleCultureInfo(username, cultureInfo);
        }


        /// <exclude />
        public static void AddActiveLocaleCultureInfo(string username, CultureInfo cultureInfo)
        {
            _implementation.AddActiveLocaleCultureInfo(username, cultureInfo);
        }


        /// <exclude />
        public static void RemoveActiveLocaleCultureInfo(string username, CultureInfo cultureInfo)
        {
            _implementation.RemoveActiveLocaleCultureInfo(username, cultureInfo);
        }



        // Overload
        /// <summary>
        /// This is an overload for GetActiveLocaleCultureInfos(string username, includeGroupAssignedCultures = true)
        /// using the current username.
        /// </summary>
        public static IEnumerable<CultureInfo> ActiveLocaleCultureInfos
        {
            get
            {
                return GetActiveLocaleCultureInfos(UserSettings.Username, true);
            }
        }


        /// <exclude />
        public static IEnumerable<CultureInfo> GetActiveLocaleCultureInfos(string username, bool includeGroupAssignedCultures = true)
        {
            return includeGroupAssignedCultures ?
                _implementation.GetActiveLocaleCultureInfos(username).Union(UserGroupFacade.GetUserGroupActiveCultures(username)) :
                _implementation.GetActiveLocaleCultureInfos(username);
        }


        /// <exclude />
        public static string LastSpecifiedNamespace
        {
            get
            {
                return _implementation.LastSpecifiedNamespace;
            }
            set
            {
                _implementation.LastSpecifiedNamespace = value;
            }
        }


        /// <exclude />
        public static IPAddress UserIPAddress
        {
            get
            {
                return _implementation.UserIPAddress;
            }
        }
    }
}

