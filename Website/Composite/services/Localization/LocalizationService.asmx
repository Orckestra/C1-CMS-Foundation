<%@ WebService Language="C#" Class="Composite.Services.LocalizationService" %>

using System;
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
using Composite.C1Console.Users.Workflows;
using Composite.Data.Types;


namespace Composite.Services
{
	[WebService(Namespace = "http://www.composite.net/ns/management")]
	[SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
	public class LocalizationService : System.Web.Services.WebService
	{
		private static PermissionType[] _changeOwnActiveLocalePermissionType = new PermissionType[] { };


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
			var clientLocales = new List<ClientLocale>();

			var switchLanguageWorkflow = typeof(ChangeOwnActiveLocaleWorkflow);

			foreach (var cultureInfo in UserSettings.ActiveLocaleCultureInfos)
			{
				var clientLocale = new ClientLocale
				{
					Name = DataLocalizationFacade.GetCultureTitle(cultureInfo),
					IsoName = cultureInfo.Name,
					UrlMappingName = DataLocalizationFacade.GetUrlMappingName(cultureInfo),
					IsCurrent = cultureInfo.Equals(UserSettings.ActiveLocaleCultureInfo)
				};

				ActionToken actionToken = new WorkflowActionToken(switchLanguageWorkflow, _changeOwnActiveLocalePermissionType)
				{
					Payload = cultureInfo.Name
				};
				clientLocale.SerializedActionToken = ActionTokenSerializer.Serialize(actionToken, true);

				clientLocales.Add(clientLocale);
			}

			clientLocales.Sort((a,b) => string.Compare(a.Name, b.Name, StringComparison.CurrentCultureIgnoreCase));

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

			var pageLocales = new List<PageLocale>();

			foreach (CultureInfo locale in UserSettings.ActiveLocaleCultureInfos)
			{
				bool exists;
				using (var dataConnection = new DataConnection(pageUrl.PublicationScope, locale))
				{
					exists = dataConnection.Get<IPage>().Any(page => page.Id == pageUrl.PageId);
				}

				if (!exists) continue;

				var pageLocale = new PageLocale
				{
					Name = DataLocalizationFacade.GetCultureTitle(locale),
					IsoName = locale.Name,
					UrlMappingName = DataLocalizationFacade.GetUrlMappingName(locale),
					IsCurrent = locale.Equals(pageUrl.LocalizationScope)
				};


				PageUrlData pageUrl2 = new PageUrlData(pageUrl.PageId, pageUrl.PublicationScope, locale);

				var urlSpace = new UrlSpace();

				string newUrl = PageUrls.BuildUrl(pageUrl2, UrlKind.Public, urlSpace)
								?? PageUrls.BuildUrl(pageUrl2, UrlKind.Renderer, urlSpace);

			    var newUrlBuilder = new UrlBuilder(newUrl)
			    {
			        ServerUrl = urlBuilder.ServerUrl
			    };

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