using System.Collections.Generic;
using System.Globalization;
using System.Net;


namespace Composite.Users
{
    public static class UserSettings
    {
        private static IUserSettingsFacade _implementation = new UserSettingsImpl();

        internal static IUserSettingsFacade Implementation { get { return _implementation; } set { _implementation = value; } }



        public static string Username
        {
            get
            {
                return _implementation.Username;
            }
        }



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



        public static CultureInfo GetUserCultureInfo(string username)
        {
            return _implementation.GetUserCultureInfo(username);
        }



        public static void SetUserCultureInfo(string username, CultureInfo cultureInfo)
        {
            _implementation.SetUserCultureInfo(username, cultureInfo);
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



        public static CultureInfo GetCurrentActiveLocaleCultureInfo(string username)
        {
            return _implementation.GetCurrentActiveLocaleCultureInfo(username);
        }



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



        public static CultureInfo GetForeignLocaleCultureInfo(string username)
        {
            return _implementation.GetForeignLocaleCultureInfo(username);
        }



        public static void SetForeignLocaleCultureInfo(string username, CultureInfo cultureInfo)
        {
            _implementation.SetForeignLocaleCultureInfo(username, cultureInfo);
        }



        public static void AddActiveLocaleCultureInfo(string username, CultureInfo cultureInfo)
        {
            _implementation.AddActiveLocaleCultureInfo(username, cultureInfo);
        }



        public static void RemoveActiveLocaleCultureInfo(string username, CultureInfo cultureInfo)
        {
            _implementation.RemoveActiveLocaleCultureInfo(username, cultureInfo);
        }



        // Overload
        /// <summary>
        /// This is an overload for GetActiveLocaleCultureInfos(string username)
        /// using the current username.
        /// </summary>
        public static IEnumerable<CultureInfo> ActiveLocaleCultureInfos
        {
            get
            {
                return GetActiveLocaleCultureInfos(UserSettings.Username);
            }
        }



        public static IEnumerable<CultureInfo> GetActiveLocaleCultureInfos(string username)
        {
            return _implementation.GetActiveLocaleCultureInfos(username);
        }



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



        public static IPAddress UserIPAddress
        {
            get
            {
                return _implementation.UserIPAddress;
            }
        }
    }
}

