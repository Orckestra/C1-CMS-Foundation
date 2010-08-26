using System.Collections.Generic;
using System.Globalization;
using System.Net;


namespace Composite.C1Console.Users
{
    internal interface IUserSettingsFacade
    {
        string Username { get; }
        CultureInfo CultureInfo { get; set; }

        CultureInfo GetUserCultureInfo(string username);
        void SetUserCultureInfo(string username, CultureInfo cultureInfo);
        
        CultureInfo GetCurrentActiveLocaleCultureInfo(string username);
        void SetCurrentActiveLocaleCultureInfo(string username, CultureInfo cultureInfo);
        void AddActiveLocaleCultureInfo(string username, CultureInfo cultureInfo);
        void RemoveActiveLocaleCultureInfo(string username, CultureInfo cultureInfo);
        IEnumerable<CultureInfo> GetActiveLocaleCultureInfos(string username);

        CultureInfo GetForeignLocaleCultureInfo(string username);
        void SetForeignLocaleCultureInfo(string username, CultureInfo cultureInfo);

        string LastSpecifiedNamespace { get; set;}
        IPAddress UserIPAddress { get; }
    }
}
