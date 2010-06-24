<%@ WebHandler Language="C#" Class="HelpHandler" %>

using System;
using System.Text;
using System.IO;
using System.Net;
using System.Xml.Linq;
using System.Web;
using System.Xml;
using System.Xml.Xsl;
using System.Xml.XPath;

public class HelpHandler : IHttpHandler 
{
    public void ProcessRequest (HttpContext context) 
    {

        if (context.Request.UserAgent.IndexOf("Gecko") > -1){
            context.Response.ContentType = "application/xhtml+xml";
        }

        string urlfragment = context.Request.QueryString["id"];
        if (urlfragment == null){
            urlfragment = "_contents.xml";
        }

        string file = System.Web.HttpContext.Current.Server.MapPath("~/Composite/help/content/" + urlfragment);
        string xslt = System.Web.HttpContext.Current.Server.MapPath("~/Composite/help/help.xsl");

        XmlDocument doc = new XmlDocument();
        XslCompiledTransform transform = new XslCompiledTransform();
        XmlReaderSettings settings = new XmlReaderSettings();
        settings.IgnoreComments = true;
           
        /*
         * Transform.
         */
        using (XmlReader reader = XmlReader.Create(file, settings)){
            StringBuilder sb = new StringBuilder();
            XmlWriter writer = XmlWriter.Create(sb);
            transform.Load(xslt);
            transform.Transform(reader, writer);
            doc.LoadXml(sb.ToString());
        }
        
        /*
         * Prettyprint.
         */
        using (XmlNodeReader nodeReader = new XmlNodeReader(doc)){
            nodeReader.MoveToContent();
            XDocument xdoc = XDocument.Load(nodeReader);
            context.Response.Write( "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" + xdoc.ToString());
        }
    }
 
    public bool IsReusable 
    {
        get 
        {
            return false;
        }
    }

}