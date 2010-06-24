<%@ WebHandler Language="C#" Class="ExecuteFunction" %>

using System;

using System.Xml.Linq;
using System.Text;
using System.Web;
using System.Collections.Generic;

using Composite.Functions;


public class ExecuteFunction : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        string functionName = context.Request["f"];
        
        IFunction f = FunctionFacade.GetFunction(functionName);

        object result = f.Execute<object>(context.Request.Params);

        if (result is IEnumerable<XElement>)
            result = new XElement("List", result);
        
        StringBuilder sb = new StringBuilder();

        if (result is XNode)
        {
            if (result is Composite.Xml.XhtmlDocument)
                context.Response.ContentType = "text/html";
            else
                context.Response.ContentType = "text/xml";

            sb.Append(((XNode)result).ToString(SaveOptions.DisableFormatting));
        }
        else if (result is IEnumerable<XElement>)
        {
            throw new InvalidCastException();
        }
        else
        {
            context.Response.ContentType = "text/plain";
            sb.Append(result.ToString());
        }

        context.Response.Write(sb.ToString());
    }

    
    
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}