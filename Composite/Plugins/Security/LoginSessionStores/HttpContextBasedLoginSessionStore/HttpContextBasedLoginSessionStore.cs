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
        private static readonly string ContextKey = typeof(HttpContextBasedLoginSessionStore).FullName + "StoredUsername";

        private const string AuthCookieName = ".CMSAUTH";

        public bool CanPersistAcrossSessions
        {
            get { return true; }
        }

        public void StoreUsername(string userName, bool persistAcrossSessions)
        {
            Verify.ArgumentNotNullOrEmpty(userName, "userName");

            userName = userName.ToLower(CultureInfo.InvariantCulture);

            int daysToLive = (persistAcrossSessions ? 365 : 2);

            var ticket = new FormsAuthenticationTicket(userName, persistAcrossSessions, (int)TimeSpan.FromDays(daysToLive).TotalMinutes);
            string encryptedTicket = FormsAuthentication.Encrypt(ticket);

            var cookie = CookieHandler.SetCookieInternal(AuthCookieName, encryptedTicket);
            cookie.HttpOnly = true;

            if (persistAcrossSessions)
            {
                cookie.Expires = DateTime.Now.AddDays(daysToLive);
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
