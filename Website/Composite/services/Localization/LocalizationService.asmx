<%@ WebService Language="C#" Class="LocalizationService" %>

using System;
using System.Collections;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;
using Composite.WebClient.Services.LocalizationServiceObjects;
using Composite.Users;
using Composite.ResourceSystem;
using Composite.WebClient;
using Composite.WebClient.FlowMediators;
using Composite.Data;
using Composite.Workflow;
using Composite.Security;
using Composite.Data.Types;
using Composite.Renderings.Page;


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

            ActionToken actionToken = new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Users.Workflows.ChangeOwnActiveLocaleWorkflow"), _changeOwnActiveLocalePermissionType) { Payload = cultureInfo.Name };
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
        var pageUrlOptions = PageUrlHelper.ParseUrl(url);
        if (pageUrlOptions == null)
        {
            return new List<PageLocale>(); 
        }

        var urlString = new UrlString(url);
        
        List<PageLocale> pageLocales = new List<PageLocale>();

        foreach (CultureInfo locale in UserSettings.ActiveLocaleCultureInfos)
        {
            bool exists = false;
            using (new DataScope(pageUrlOptions.DataScopeIdentifier, locale))
            {
                exists = DataFacade.GetData<IPage>(f => f.Id == pageUrlOptions.PageId).Any();
            }

            if (!exists) continue;

            PageLocale pageLocale = new PageLocale();

            pageLocale.Name = StringResourceSystemFacade.GetString("Composite.Cultures", locale.Name);
            pageLocale.IsoName = locale.Name;
            pageLocale.UrlMappingName = DataLocalizationFacade.GetUrlMappingName(locale);
            pageLocale.IsCurrent = locale.Equals(pageUrlOptions.Locale);

            var options = new PageUrlOptions(pageUrlOptions.DataScopeIdentifierName, locale, pageUrlOptions.PageId);
            UrlString newPageUrl = PageUrlHelper.BuildUrl(UrlType.Public, options)
                ?? PageUrlHelper.BuildUrl(UrlType.Internal, options);

            newPageUrl.ServerUrl = urlString.ServerUrl;
            pageLocale.Url = newPageUrl.ToString();

            pageLocales.Add(pageLocale);
        }
        
        return pageLocales;
    }
}