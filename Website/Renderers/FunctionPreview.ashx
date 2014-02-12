<%@ WebHandler Language="C#" Class="Composite.Renderers.Phantom" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using Composite.C1Console.Security;
using Composite.Core.PageTemplates;
using Composite.Core.WebClient;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Renderers
{
    /// <summary>
    /// Summary description for Phantom
    /// </summary>
    public class Phantom : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            if (!UserValidationFacade.IsLoggedIn())
            {
                context.Response.StatusCode = 401; // "Unauthorized"
                return;
            }

            string pageIdStr = context.Request["page"];
            string placeholderName = context.Request["ph"];
            
            string markup = UrlUtils.UnZipContent(context.Request["markup"]);

            var functionElement = XElement.Parse(markup);

            
            IPage page;

            using (var c = new DataConnection())
            {
                Guid pageId;
                if (!string.IsNullOrEmpty(pageIdStr) && Guid.TryParse(pageIdStr, out pageId))
                {
                    page = c.Get<IPage>().Single(p => p.Id == pageId);
                }
                else
                {
                    page = c.Get<IPage>().First();
                }
            }

            var templateInfo = PageTemplateFacade.GetPageTemplate(page.TemplateId);

            var placeholderDocument = new XhtmlDocument();
            placeholderDocument.Body.Add(new XElement(Namespaces.Xhtml + "functionpreview", 
                new XAttribute("id", "CompositeC1FunctionPreview"), 
                new XAttribute("style", "display:inline-block;"),
                functionElement));
            
            var contents = new List<IPagePlaceholderContent>();
            var content = DataFacade.BuildNew<IPagePlaceholderContent>();
            content.PageId = page.Id;
            content.PlaceHolderId = !string.IsNullOrEmpty(placeholderName) ? placeholderName : templateInfo.DefaultPlaceholderId;
            content.Content = placeholderDocument.ToString();
            contents.Add(content);

            string output = PagePreviewBuilder.RenderPreview(page, contents);

            if (output != String.Empty)
            {
                context.Response.ContentType = "text/html";
                context.Response.Write(output);
            }
        }
    
        public bool IsReusable
        {
            get { return true; }
        }
    }
}