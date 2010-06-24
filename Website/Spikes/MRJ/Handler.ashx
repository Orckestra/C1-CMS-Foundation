<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using Composite.Security;
using System.Collections.Generic;

public class Handler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/xml";


        List<EntityToken> parents = HookingFacade.GetParentHookers().ToList();

        XElement root = new XElement("Result");
        
        foreach (EntityToken parent in parents)
        {
            XElement hooker = new XElement("Hooker", new XElement("EntityToken", parent.ToString()));

            foreach (EntityToken child in HookingFacade.GetParentToChildHooks(parent))
            {
                hooker.Add(new XElement("Hook", new XElement("EntityToken", child.ToString())));
            }

            root.Add(hooker);                       
        }

        context.Response.Write(root.ToString());    
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}