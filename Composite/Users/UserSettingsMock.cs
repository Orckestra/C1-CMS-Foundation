using System;
using System.Collections.Generic;
using Composite.GlobalSettings;
using Composite.Security;

namespace Composite.Users
{
	internal class UserSettingsMock: IUserSettingsFacade
	{
        #region IUserSettingsFacade Members

        public string Username
        {
            get { return UserValidationFacade.GetUsername(); }
        }

        public System.Globalization.CultureInfo CultureInfo
        {
            get
            {
                return GlobalSettingsFacade.DefaultCultureInfo;
            }
            set
            {
            }
        }

        public System.Globalization.CultureInfo GetUserCultureInfo(string username)
        {
            throw new NotImplementedException();
        }

        public void SetUserCultureInfo(string username, System.Globalization.CultureInfo cultureInfo)
        {
            throw new NotImplementedException();
        }

        public System.Globalization.CultureInfo GetCurrentActiveLocaleCultureInfo(string username)
        {
            throw new NotImplementedException();
        }

        public void SetCurrentActiveLocaleCultureInfo(string username, System.Globalization.CultureInfo cultureInfo)
        {
            throw new NotImplementedException();
        }

        public void AddActiveLocaleCultureInfo(string username, System.Globalization.CultureInfo cultureInfo)
        {
            throw new NotImplementedException();
        }

        public void RemoveActiveLocaleCultureInfo(string username, System.Globalization.CultureInfo cultureInfo)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<System.Globalization.CultureInfo> GetActiveLocaleCultureInfos(string username)
        {
            throw new NotImplementedException();
        }

        public System.Globalization.CultureInfo GetForeignLocaleCultureInfo(string username)
        {
            throw new NotImplementedException();
        }

        public void SetForeignLocaleCultureInfo(string username, System.Globalization.CultureInfo cultureInfo)
        {
        }

        public string LastSpecifiedNamespace
        {
            get
            {
                return string.Empty;
            }
            set
            {
            }
        }

        public System.Net.IPAddress UserIPAddress
        {
            get { throw new NotImplementedException(); }
        }

        #endregion
    }
}
