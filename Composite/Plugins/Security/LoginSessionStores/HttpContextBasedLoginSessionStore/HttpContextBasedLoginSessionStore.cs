using System;
using System.Diagnostics;
using System.Globalization;
using System.Net;
using System.Security.Cryptography;
using System.Web;
using System.Web.Security;
using Composite.C1Console.Security.Plugins.LoginSessionStore;
using Composite.Core.Caching;
using Composite.Core.Extensions;
using Composite.Core.Threading;
using Composite.Core.WebClient;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Plugins.Security.LoginSessionStores.HttpContextBasedLoginSessionStore
{
    [ConfigurationElementType(typeof(HttpContextBasedSessionDataProviderData))]
    internal sealed class HttpContextBasedLoginSessionStore : ILoginSessionStore
    {
        private static readonly TimeSpan TempTicketMaxAge = TimeSpan.FromDays(5);
        private static readonly TimeSpan TempTicketMinAge = TimeSpan.FromDays(4); // auto renew tickets younger than this

        private static readonly string ContextKey = typeof(HttpContextBasedLoginSessionStore).FullName + "StoredUsername";

        internal const string AuthCookieName = ".CMSAUTH";

        public bool CanPersistAcrossSessions
        {
            get { return true; }
        }

        public void StoreUsername(string userName, bool persistAcrossSessions)
        {
            StoreUsernameImpl(userName, persistAcrossSessions);
        }

        private static void StoreUsernameImpl(string userName, bool persistAcrossSessions)
        {
            Verify.ArgumentNotNullOrEmpty(userName, "userName");

            userName = userName.ToLower(CultureInfo.InvariantCulture);

            TimeSpan timeToLive = (persistAcrossSessions ? TimeSpan.FromDays(365) : TempTicketMaxAge);

            var ticket = new FormsAuthenticationTicket(userName, persistAcrossSessions, (int)timeToLive.TotalMinutes);
            string encryptedTicket = FormsAuthentication.Encrypt(ticket);

            var cookie = CookieHandler.SetCookieInternal(AuthCookieName, encryptedTicket);
            cookie.HttpOnly = true;

            var context = HttpContext.Current;
            if (context != null)
            {
                if (context.Request.IsSecureConnection)
                {
                    cookie.Secure = true;
                }
                else if (cookie.Secure)
                {
                    throw new InvalidOperationException(
                        "A login attempt over a not secure connection, when system.web/httpCookies/@requireSSL is set to 'true'. " +
                        "Either secure connection should be required for console login, or SSL should not be required for cookies.");
                }
            }

            if (persistAcrossSessions)
            {
                cookie.Expires = DateTime.Now + timeToLive;
            }
        }


        
        public string StoredUsername
        {
            [DebuggerStepThrough]
            get
            {
                HttpContext context = HttpContext.Current;

                if (context == null || !context.RequestIsAvaliable())
                {
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
                    catch (Exception)
                    {
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
                string cookieValue = CookieHandler.Get(AuthCookieName);

                if (!string.IsNullOrEmpty(cookieValue))
                {
                    FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(cookieValue);

                    if (!ticket.Expired && (ticket.Expiration - DateTime.Now) < TempTicketMinAge)
                    {
                        StoreUsernameImpl(ticket.Name, false); 
                    }
                    
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
            CookieHandler.Set(AuthCookieName, "", DateTime.Now.AddYears(-10));

            string key = typeof(HttpContextBasedLoginSessionStore) + "StoredUsername";
            if (RequestLifetimeCache.HasKey(key))
            {
                RequestLifetimeCache.Remove(key);
            }
        }



        public IPAddress UserIpAddress
        {
            get
            {
                string ipString = HttpContext.Current.Request.UserHostAddress;
                return ipString != null ? IPAddress.Parse(ipString) : null;
            }
        }
    }



    [Assembler(typeof(NonConfigurableSessionDataProviderAssembler))]
    internal sealed class HttpContextBasedSessionDataProviderData : LoginSessionStoreData
    {
    }
}
