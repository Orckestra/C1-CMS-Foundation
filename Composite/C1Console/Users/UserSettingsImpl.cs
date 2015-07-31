using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using Composite.Core.Caching;
using Composite.Data;
using Composite.Data.Caching;
using Composite.Data.Types;
using Composite.Core.Configuration;
using Composite.C1Console.Security;
using Composite.C1Console.Security.Foundation.PluginFacades;


namespace Composite.C1Console.Users
{
    internal class UserSettingsImpl : IUserSettingsFacade
    {
        private static readonly object _lock = new object();

        private static readonly Cache<string, IUserSettings> _userSettingsCache = new Cache<string, IUserSettings>("User settings", 100);

        static UserSettingsImpl()
        {
            DataEventSystemFacade.SubscribeToDataAfterAdd<IUserSettings>(OnUserSettingsChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IUserSettings>(OnUserSettingsChanged, true);
            DataEventSystemFacade.SubscribeToDataDeleted<IUserSettings>(OnUserSettingsChanged, true);
            DataEventSystemFacade.SubscribeToStoreChanged<IUserSettings>(OnUserStoreChanged, true);
        }



        private static void OnUserStoreChanged(object sender, StoreEventArgs storeEventArgs)
        {
            if (!storeEventArgs.DataEventsFired)
            {
                lock (_lock)
                {
                    _userSettingsCache.Clear();
                }
            }
        }

        private static void OnUserSettingsChanged(object sender, DataEventArgs dataEventArgs)
        {
            IUserSettings settings = dataEventArgs.Data as IUserSettings;
            if(settings != null)
            {
                lock (_lock)
                {
                    _userSettingsCache.Remove(settings.Username);
                }
            }
        }

        public string Username
        {
            get
            {
                return UserValidationFacade.GetUsername();
            }
        }



        public CultureInfo CultureInfo
        {
            get
            {
                if (UserProfileDataAvailable)
                {
                    return CultureInfo.CreateSpecificCulture(GetSettings(UserSettings.Username, true).CultureName);
                }
                return GlobalSettingsFacade.DefaultCultureInfo;
            }
            set
            {
                IUserSettings settings = GetSettings(UserSettings.Username, false);
                settings.CultureName = value.ToString();
                DataFacade.Update(settings);
            }
        }



        public CultureInfo C1ConsoleUiLanguage
        {
            get
            {
                if (UserProfileDataAvailable)
                {
                    return CultureInfo.CreateSpecificCulture(GetSettings(UserSettings.Username, true).C1ConsoleUiLanguage);
                }
                return GlobalSettingsFacade.DefaultCultureInfo;
            }
            set
            {
                IUserSettings settings = GetSettings(UserSettings.Username, false);
                settings.C1ConsoleUiLanguage = value.ToString();
                DataFacade.Update(settings);
            }
        }



        public CultureInfo GetUserCultureInfo(string username)
        {
            IUserSettings settings = GetSettings(username, true);
            return CultureInfo.CreateSpecificCulture(settings.CultureName);
        }



        public void SetUserCultureInfo(string username, CultureInfo cultureInfo)
        {
            IUserSettings settings = GetSettings(username, false);           
            settings.CultureName = cultureInfo.Name;
            DataFacade.Update(settings);
        }



        public CultureInfo GetUserC1ConsoleUiLanguage(string username)
        {
            IUserSettings settings = GetSettings(username, true);
            return CultureInfo.CreateSpecificCulture(settings.C1ConsoleUiLanguage);
        }



        public void SetUserC1ConsoleUiLanguage(string username, CultureInfo cultureInfo)
        {
            IUserSettings settings = GetSettings(username, false);
            settings.C1ConsoleUiLanguage = cultureInfo.Name;
            DataFacade.Update(settings);
        }



        public CultureInfo GetCurrentActiveLocaleCultureInfo(string username)
        {
            IUserSettings settings = GetSettings(username, true);
            if (settings.CurrentActiveLocaleCultureName != null)
            {
                return CultureInfo.CreateSpecificCulture(settings.CurrentActiveLocaleCultureName);                
            }
            return DataLocalizationFacade.DefaultLocalizationCulture;
        }



        public void SetCurrentActiveLocaleCultureInfo(string username, CultureInfo cultureInfo)
        {
            IUserSettings settings = GetSettings(username, false);
            settings.CurrentActiveLocaleCultureName = cultureInfo.Name;
            DataFacade.Update(settings);
        }



        public CultureInfo GetForeignLocaleCultureInfo(string username)
        {
            IUserSettings settings = GetSettings(username, true);
            if (settings.ForeignLocaleCultureName != null)
            {
                return CultureInfo.CreateSpecificCulture(settings.ForeignLocaleCultureName);
            }
            return null;
        }



        public void SetForeignLocaleCultureInfo(string username, CultureInfo cultureInfo)
        {
            IUserSettings settings = GetSettings(username, false);
            if (cultureInfo != null)
            {
                settings.ForeignLocaleCultureName = cultureInfo.Name;
            }
            else
            {
                settings.ForeignLocaleCultureName = null;
            }
            DataFacade.Update(settings);
        }



        public void AddActiveLocaleCultureInfo(string username, CultureInfo cultureInfo)
        {
            bool exists =
                (from ual in DataFacade.GetData<IUserActiveLocale>()
                 where ual.Username == username &&
                       ual.CultureName == cultureInfo.Name
                 select ual).Any();

            if (exists) return;

            GetSettings(username, true); // Ensure that we have usersettings 

            var userActiveLocale = DataFacade.BuildNew<IUserActiveLocale>();
            userActiveLocale.Id = Guid.NewGuid();
            userActiveLocale.Username = username;
            userActiveLocale.CultureName = cultureInfo.Name;
            DataFacade.AddNew<IUserActiveLocale>(userActiveLocale);
        }



        public void RemoveActiveLocaleCultureInfo(string username, CultureInfo cultureInfo)
        {
            Guid id =
                (from ual in DataFacade.GetData<IUserActiveLocale>()
                 where ual.Username == username &&
                       ual.CultureName == cultureInfo.Name
                 select ual.Id).SingleOrDefault();

            if (id != Guid.Empty)
            {
                IUserSettings userSettings = DataFacade.GetData<IUserSettings>().SingleOrDefault(f => f.Username == username);
                if (userSettings != null)
                {
                    if (userSettings.CurrentActiveLocaleCultureName == cultureInfo.Name)
                    {
                        userSettings.CurrentActiveLocaleCultureName = null;
                        DataFacade.Update(userSettings);
                    }
                }

                DataFacade.Delete<IUserActiveLocale>(f => f.Id == id);
            }
        }



        public IEnumerable<CultureInfo> GetActiveLocaleCultureInfos(string username)
        {
            IEnumerable<string> cultureInfoNames =
                (from ual in DataFacade.GetData<IUserActiveLocale>()
                 where ual.Username == username                        
                 select ual.CultureName);

            foreach (string cultureInfoName in cultureInfoNames)
            {
                yield return CultureInfo.CreateSpecificCulture(cultureInfoName);
            }
        }



        public string LastSpecifiedNamespace
        {
            get 
            {
                return UserProfileDataAvailable ? GetDeveloperSettings().LastSpecifiedNamespace : "";
            }
            set
            {
                IUserDeveloperSettings settings = GetDeveloperSettings();
                settings.LastSpecifiedNamespace = value;
                DataFacade.Update(settings);
            }
        }



        public IPAddress UserIPAddress
        {
            get
            {
                return LoginSessionStorePluginFacade.UserIpAddress;
            }
        }              



        private bool UserProfileDataAvailable
        {
            get
            {
                return
                    GlobalInitializerFacade.SystemCoreInitialized &&
                    UserValidationFacade.IsLoggedIn();
            }
        }



        private IUserSettings GetSettings(string username, bool readonlyUsage)
        {
            // "Readonly" values are cached
            if(readonlyUsage)
            {
                IUserSettings cachedValue = _userSettingsCache.Get(username);

                if (cachedValue != null)
                {
                    return cachedValue;
                }
            }
            
            IUserSettings settings;

            lock (_lock)
            {
                settings = DataFacade.GetData<IUserSettings>(f => f.Username == username, false).FirstOrDefault() ??
                    CreateUserSettings(username);

                if(readonlyUsage)
                {
                    _userSettingsCache.Add(username, settings);
                }
            }

            return settings;
        }



        private IUserDeveloperSettings GetDeveloperSettings()
        {
            if (RequestLifetimeCache.HasKey(typeof(IUserDeveloperSettings)))
            {
                return RequestLifetimeCache.TryGet<IUserDeveloperSettings>(typeof(IUserDeveloperSettings));
            }

            IUserDeveloperSettings settings = DataFacade.GetData<IUserDeveloperSettings>(f => f.Username == UserSettings.Username).FirstOrDefault();

            if (settings == null)
            {
                settings = CreateUserDeveloperSettings();
            }

            RequestLifetimeCache.Add(typeof(IUserDeveloperSettings), settings);

            return settings;
        }



        private IUserSettings CreateUserSettings(string username)
        {
            var settings = DataFacade.BuildNew<IUserSettings>();

            settings.Username = username;
            settings.CultureName = GlobalSettingsFacade.DefaultCultureName;
            settings.C1ConsoleUiLanguage = GlobalSettingsFacade.DefaultCultureName;

            return DataFacade.AddNew<IUserSettings>(settings);
        }



        private IUserDeveloperSettings CreateUserDeveloperSettings()
        {
            var settings = DataFacade.BuildNew<IUserDeveloperSettings>();

            settings.Username = Username;
            settings.LastSpecifiedNamespace = "";

            return DataFacade.AddNew<IUserDeveloperSettings>(settings);
        }
    }
}
