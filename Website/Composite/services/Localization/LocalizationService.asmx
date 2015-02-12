<%@ WebService Language="C#" Class="Composite.Services.LocalizationService" %>

using System.Linq;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Collections.Generic;
using System.Globalization;
using Composite.Core.Routing;
using Composite.Data;
using Composite.Core;
using Composite.Core.WebClient.Services.LocalizationServiceObjects;
using Composite.C1Console.Users;
using Composite.Core.WebClient.FlowMediators;
using Composite.C1Console.Workflow;
using Composite.C1Console.Security;
using Composite.Data.Types;


namespace Composite.Services
{
    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    public class LocalizationService : System.Web.Services.WebService
    {
        private static PermissionType[] _changeOwnActiveLocalePermissionType = new PermissionType[] { };



        public LocalizationService()
        {
        }



        [WebMethod]
        public ClientLocales GetLocales(bool dummy)
        {
            ClientLocales clientLocales = new ClientLocales();

            if (UserSettings.ActiveLocaleCultureInfos.Count() >= 2)
            {
                if (UserSettings.ActiveLocaleCultureInfo != null) clientLocales.ActiveLocaleName = DataLocalizationFacade.GetCultureTitle(UserSettings.ActiveLocaleCultureInfo);
                if (UserSettings.ForeignLocaleCultureInfo != null) clientLocales.ForeignLocaleName = DataLocalizationFacade.GetCultureTitle(UserSettings.ForeignLocaleCultureInfo);
            }

            return clientLocales;
        }



        [WebMethod]
        public List<ClientLocale> GetActiveLocales(bool dummy)
        {
            List<ClientLocale> clientLocales = new List<ClientLocale>();

            foreach (CultureInfo cultureInfo in UserSettings.ActiveLocaleCultureInfos)
            {
                ClientLocale clientLocale = new ClientLocale();

                clientLocale.Name = DataLocalizationFacade.GetCultureTitle(cultureInfo);
                clientLocale.IsoName = cultureInfo.Name;
                clientLocale.UrlMappingName = DataLocalizationFacade.GetUrlMappingName(cultureInfo);
                clientLocale.IsCurrent = cultureInfo.Equals(UserSettings.ActiveLocaleCultureInfo);

                ActionToken actionToken = new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Users.Workflows.ChangeOwnActiveLocaleWorkflow"), _changeOwnActiveLocalePermissionType) { Payload = cultureInfo.Name };
                clientLocale.SerializedActionToken = ActionTokenSerializer.Serialize(actionToken, true);

                clientLocales.Add(clientLocale);
            }

            return clientLocales;
        }



        [WebMethod]
        public List<string> GetLocaleAwarePerspectiveElements(bool dummy)
        {
            return TreeServicesFacade.GetLocaleAwarePerspectiveElements();
        }



        [WebMethod]
        public List<PageLocale> GetPageOtherLocales(string url)
        {
            var pageUrl = PageUrls.ParseUrl(url);
            if (pageUrl == null)
            {
                return new List<PageLocale>();
            }

            var urlBuilder = new UrlBuilder(url);

            List<PageLocale> pageLocales = new List<PageLocale>();

            foreach (CultureInfo locale in UserSettings.ActiveLocaleCultureInfos)
            {
                bool exists;
                using (DataConnection dataConnection = new DataConnection(pageUrl.PublicationScope, locale))
                {
                    exists = dataConnection.Get<IPage>().Any(page => page.Id == pageUrl.PageId);
                }

                if (!exists) continue;

                PageLocale pageLocale = new PageLocale();

                pageLocale.Name = DataLocalizationFacade.GetCultureTitle(locale);
                pageLocale.IsoName = locale.Name;
                pageLocale.UrlMappingName = DataLocalizationFacade.GetUrlMappingName(locale);
                pageLocale.IsCurrent = locale.Equals(pageUrl.LocalizationScope);

                PageUrlData pageUrl2 = new PageUrlData(pageUrl.PageId, pageUrl.PublicationScope, locale);

                var urlSpace = new UrlSpace();

                string newUrl = PageUrls.BuildUrl(pageUrl2, UrlKind.Public, urlSpace)
                                ?? PageUrls.BuildUrl(pageUrl2, UrlKind.Renderer, urlSpace);

                UrlBuilder newUrlBuilder = new UrlBuilder(newUrl);
                newUrlBuilder.ServerUrl = urlBuilder.ServerUrl;

                pageLocale.Url = newUrlBuilder.ToString();

                pageLocales.Add(pageLocale);
            }

            return pageLocales;
        }

		[WebMethod]
		public string GetTextDirection(bool dummy)
		{
			return UserSettings.ActiveLocaleCultureInfo.TextInfo.IsRightToLeft ? "rtl" : "ltr";
		}

		[WebMethod]
		public string GetUITextDirection(bool dummy)
		{
			return UserSettings.C1ConsoleUiLanguage.TextInfo.IsRightToLeft ? "rtl" : "ltr";
		}
    }
}