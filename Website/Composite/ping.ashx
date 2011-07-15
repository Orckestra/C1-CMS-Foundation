<%@ WebHandler Language="C#" Class="PingTester" %>
using System;
using System.Web;
using Composite.Core.Configuration;
using Composite.Core.WebClient.Setup;

public class PingTester : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        if (SystemSetupFacade.IsSystemFirstTimeInitialized)
        {
            return;
        }
        
        context.Response.ContentType = "text/plain";

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