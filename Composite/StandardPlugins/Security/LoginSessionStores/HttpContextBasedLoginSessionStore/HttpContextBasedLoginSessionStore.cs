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

            HttpCookie authCookie = FormsAuthentication.GetAuthCookie(userName, persistAcrossSessions);
            authCookie.Name = this.AuthCookieName;
            HttpContext.Current.Response.SetCookie(authCookie);
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
                    return null;
                }

                ThreadDataManagerData threadDataManagerData = ThreadDataManager.GetCurrentNotNull();

                object value;
                if (threadDataManagerData.TryGetParentValue(ContextKey, out value) == false)
                {
                    try
                    {
                        value = DecryptCookie(context, AuthCookieName);

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
        private static string DecryptCookie(HttpContext context, string authCookieName)
        {
            try
            {
                HttpCookie authCookie = context.Request.Cookies[authCookieName];

                if (authCookie != null && !authCookie.Value.IsNullOrEmpty())
                {
                    FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
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
            HttpCookie resetCookie = new HttpCookie(this.AuthCookieName, "");
            resetCookie.Expires = DateTime.Now.AddYears(-10);
            HttpContext.Current.Response.Cookies.Set(resetCookie);

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
                if (HttpContext.Current!=null && HttpContext.Current.Request!=null)
                {

                    return string.Format("{0}_{1}_{2}", _authCookieName, HttpContext.Current.Request.Url.Port, UrlUtils.PublicRootPath.GetHashCode());
                }
                else
                {
                    return _authCookieName;
                }
            }
        }
    }



    [Assembler(typeof(NonConfigurableSessionDataProviderAssembler))]
    internal sealed class HttpContextBasedSessionDataProviderData : LoginSessionStoreData
    {
    }
}
