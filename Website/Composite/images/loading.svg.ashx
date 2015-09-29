<%@ WebHandler Language="C#" Class="loading" %>

using System;
using System.Web;

public class loading : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        TimeSpan cacheDuration = TimeSpan.FromDays(7);
        
        context.Response.Cache.SetCacheability(HttpCacheability.Private);
        context.Response.Cache.SetExpires(DateTime.Now.Add(cacheDuration));
        context.Response.Cache.SetMaxAge(cacheDuration);
        context.Response.CacheControl = HttpCacheability.Private.ToString();
        context.Response.Cache.SetValidUntilExpires(true);

        HttpBrowserCapabilities browser = context.Request.Browser;

		if (browser.Browser == "IE" || browser.Browser == "InternetExplorer" || context.Request.UserAgent.IndexOf("Edge") > -1) // IE or Microsoft Edge
        {
            context.Response.ContentType = "image/gif";
            context.Response.WriteFile(context.Request.MapPath("loading.gif"));
        }
        else
        {
            context.Response.ContentType = "image/svg+xml";
            context.Response.WriteFile(context.Request.MapPath("loading.svg"));
        }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}