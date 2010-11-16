using System;
using System.Diagnostics;
using System.Globalization;
using System.Net;
using System.Security.Cryptography;
using System.Web;
using System.Web.Security;
using Composite.Core.Caching;
using Composite.Core.Extensions;
using Composite.Core.Logging;
using Composite.C1Console.Security.Plugins.LoginSessionStore;
using Composite.Core.Threading;
using Composite.Core.WebClient;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Plugins.Security.LoginSessionStores.HttpContextBasedLoginSessionStore
{
    [ConfigurationElementType(typeof(HttpContextBasedSessionDataProviderData))]
    internal sealed class HttpContextBasedLoginSessionStore : ILoginSessionStore
    {
        private static readonly string ContextKey = typeof(HttpContextBasedLoginSessionStore).FullName + "StoredUsername";

        private const string _authCookieName = ".CMSAUTH";

        public bool CanPersistAcrossSessions
        {
            get { return true; }
        }

        public void StoreUsername(string userName, bool persistAcrossSessions)
        {
            Verify.ArgumentNotNullOrEmpty(userName, "userName");

            userName = userName.ToLower(CultureInfo.InvariantCulture);

            int daysToLive = (persistAcrossSessions ? 365 : 2);

            FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(userName, persistAcrossSessions, (int)TimeSpan.FromDays(daysToLive).TotalMinutes);
            string encryptedTicket = FormsAuthentication.Encrypt(ticket);
            if (persistAcrossSessions)
            {
                CookieHandler.Set(_authCookieName, encryptedTicket, DateTime.Now.AddDays(daysToLive));
            }
            else
            {
                CookieHandler.Set(_authCookieName, encryptedTicket);
            }
        }



        public string StoredUsername
        {
            get
            {
                HttpContext context = HttpContext.Current;

                if (context == null
                    || !context.RequestIsAvaliable()
                    || context.Request == null)
                {
                    LoggingService.LogInformation("HttpContextBasedLoginSessionStore", "Unable to return stored username, no HttpContext");
                    return null;
                }

                ThreadDataManagerData threadDataManagerData = ThreadDataManager.GetCurrentNotNull();

                object value;
                if (threadDataManagerData.TryGetParentValue(ContextKey, out value) == false)
                {
                    try
                    {
                        value = GetUsernameFromCookie();

                        if (!string.IsNullOrEmpty(value as string))
                        {
                            threadDataManagerData.SetValue(ContextKey, value);
                        }                        
                    }
                    catch (CryptographicException)
                    {
                        return null;
                    }
                    catch (Exception ex)
                    {
                        LoggingService.LogWarning("HttpContextBasedLoginSessionStore", ex);
                        return null;
                    }
                }

                return value as string;
            }
        }


        [DebuggerStepThrough]
        private static string GetUsernameFromCookie()
        {
            try
            {
                string cookieValue = CookieHandler.Get(_authCookieName);

                if (!string.IsNullOrEmpty(cookieValue))
                {
                    FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(cookieValue);
                    return ticket.Name;
                }
            }
            catch (CryptographicException)
            {
            }
            return null;
        }


        public void FlushUsername()
        {
            CookieHandler.Set(_authCookieName, "", DateTime.Now.AddYears(-10));

            string key = typeof(HttpContextBasedLoginSessionStore) + "StoredUsername";
            if (RequestLifetimeCache.HasKey(key))
            {
                RequestLifetimeCache.ClearAll();
            }
        }



        public IPAddress UserIpAddress
        {
            get
            {
                return IPAddress.Parse(HttpContext.Current.Request.UserHostAddress);
            }
        }


        private string AuthCookieName
        {
            get
            {
                return CookieHandler.GetApplicationSpecificCookieName(_authCookieName);
            }
        }
    }



    [Assembler(typeof(NonConfigurableSessionDataProviderAssembler))]
    internal sealed class HttpContextBasedSessionDataProviderData : LoginSessionStoreData
    {
    }
}
