<%@ WebHandler Language="C#" Class="PingTester" %>
using System;
using System.Net;
using System.Web;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.WebClient.Setup;
using Composite.C1Console.Users;

public class PingTester : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        
        if (SystemSetupFacade.IsSystemFirstTimeInitialized)
        {
            try
            {
                if (string.IsNullOrEmpty(UserSettings.Username))
                {
                    context.Response.Write("Log in to use this feature\n");
                    return;
                }
            }
            catch (Exception)
            {
                context.Response.Write("Log in to use this feature\n");
                return;
            }
            
            context.Response.Write("This Orckestra CMS site has been initialized (info)\n\n");
        }

        IPHostEntry packageServerAddress;

        const string packageServerHostName = "package.composite.net";
        
        try
        {
            packageServerAddress = Dns.GetHostEntry(packageServerHostName);
        }
        catch (Exception ex)
        {
            context.Response.Write("Failed to resolve IP address of '{0}'\n".FormatWith(packageServerHostName) + ex);
            return;
        }

        context.Response.Write("IP address{0}: ".FormatWith(packageServerAddress.AddressList.Length > 1 ? "es" : string.Empty));
        foreach(var address in packageServerAddress.AddressList)
        {
            context.Response.Write(address + "; ");
        }
        
        context.Response.Write("\n");

        bool pingSuccessful;
        
        try
        {
            // This is expected to return either 'true' or throw an exception
            pingSuccessful = SetupServiceFacade.PingServer();
        }
        catch(Exception ex)
        {
            context.Response.Write(ex.ToString());
            return;
        }
        
        context.Response.Write("Ping result: " + pingSuccessful);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}