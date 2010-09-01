<%@ WebService Language="C#" Class="LocalizationService" %>

using System;
using System.Linq;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Collections.Generic;
using System.Globalization;
using Composite;
using Composite.Data;
using Composite.Core;
using Composite.Core.WebClient.Services.LocalizationServiceObjects;
using Composite.C1Console.Users;
using Composite.Core.ResourceSystem;
using Composite.Core.WebClient.FlowMediators;
using Composite.Data;
using Composite.C1Console.Workflow;
using Composite.C1Console.Security;
using Composite.Data.Types;


[WebService(Namespace = "http://www.composite.net/ns/management")]
[SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
public class LocalizationService : System.Web.Services.WebService
{
    private static PermissionType[]  _changeOwnActiveLocalePermissionType = new PermissionType[] { };

    
    
    public LocalizationService()
    {
    }

    

    [WebMethod]
    public ClientLocales GetLocales(bool dummy)
    {
        ClientLocales clientLocales = new ClientLocales();

        if (UserSettings.ActiveLocaleCultureInfos.Count() >= 2)
        {
            if (UserSettings.ActiveLocaleCultureInfo != null) clientLocales.ActiveLocaleName = StringResourceSystemFacade.GetString("Composite.Cultures", UserSettings.ActiveLocaleCultureInfo.Name);
            if (UserSettings.ForeignLocaleCultureInfo != null) clientLocales.ForeignLocaleName = StringResourceSystemFacade.GetString("Composite.Cultures", UserSettings.ForeignLocaleCultureInfo.Name);
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

            clientLocale.Name = StringResourceSystemFacade.GetString("Composite.Cultures", cultureInfo.Name);
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
        return TreeServicesFacade.GetLocaleAwarePerspectiveElements(null);
    }



    [WebMethod]
    public List<PageLocale> GetPageOtherLocales(string url)
    {
        var pageUrl = PageUrl.Parse(url);
        if (pageUrl == null)
        {
            return new List<PageLocale>(); 
        }

        var urlBuilder = new UrlBuilder(url);
        
        List<PageLocale> pageLocales = new List<PageLocale>();

        foreach (CultureInfo locale in UserSettings.ActiveLocaleCultureInfos)
        {
            bool exists = false;
            using (var storage = Storage.Open(pageUrl.PublicationScope, locale))
            {
                exists = storage.Get<IPage>().Any(page => page.Id == pageUrl.PageId);
            }

            if (!exists) continue;

            PageLocale pageLocale = new PageLocale();

            pageLocale.Name = StringResourceSystemFacade.GetString("Composite.Cultures", locale.Name);
            pageLocale.IsoName = locale.Name;
            pageLocale.UrlMappingName = DataLocalizationFacade.GetUrlMappingName(locale);
            pageLocale.IsCurrent = locale.Equals(pageUrl.Locale);

            PageUrl pageUrl2 = new PageUrl(pageUrl.PublicationScope, locale, pageUrl.PageId);

            UrlBuilder newUrlBuilder = pageUrl2.Build(PageUrlType.Published) ?? pageUrl2.Build(PageUrlType.Unpublished);
            newUrlBuilder.ServerUrl = urlBuilder.ServerUrl;
            
            pageLocale.Url = newUrlBuilder.ToString();

            pageLocales.Add(pageLocale);
        }
        
        return pageLocales;
    }
}