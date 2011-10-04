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
using Composite.Data.Foundation;


namespace Composite.C1Console.Users
{
    internal class UserSettingsImpl : IUserSettingsFacade
    {
        private static object _lock = new object();

        private static readonly Cache<string, IUserSettings> _userSettingsCache = new Cache<string, IUserSettings>("User settings", 100);

        static UserSettingsImpl()
        {
            DataEventSystemFacade.SubscribeToDataAfterAdd<IUserSettings>(OnUserSettingsChanged, true);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IUserSettings>(OnUserSettingsChanged, true);
            DataEventSystemFacade.SubscribeToDataDeleted<IUserSettings>(OnUserSettingsChanged, true);
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

            if (exists == false)
            {
                GetSettings(username, true); // Ensure that we have usersettings 

                IUserActiveLocale userActiveLocale = DataFacade.BuildNew<IUserActiveLocale>();
                userActiveLocale.Id = Guid.NewGuid();
                userActiveLocale.Username = username;
                userActiveLocale.CultureName = cultureInfo.Name;
                DataFacade.AddNew<IUserActiveLocale>(userActiveLocale);
            }
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
                IUserSettings userSettings = DataFacade.GetData<IUserSettings>().Where(f => f.Username == username).SingleOrDefault();
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
                if (UserProfileDataAvailable == true)
                {
                    return GetDeveloperSettings().LastSpecifiedNamespace;
                }
                else
                {
                    return "";
                }
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
            IUserSettings settings = DataFacade.BuildNew<IUserSettings>();

            settings.Username = username.ToLowerInvariant();
            settings.CultureName = GlobalSettingsFacade.DefaultCultureName;

            return DataFacade.AddNew<IUserSettings>(settings);
        }



        private IUserDeveloperSettings CreateUserDeveloperSettings()
        {
            IUserDeveloperSettings settings = DataFacade.BuildNew<IUserDeveloperSettings>();

            settings.Username = Username;
            settings.LastSpecifiedNamespace = "";

            return DataFacade.AddNew<IUserDeveloperSettings>(settings);
        }
    }
}
