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

            string pageIdStr = context.Request["p"] ?? "";
            string templateIdStr = context.Request["t"] ?? "";
            string placeholderName = context.Request["ph"];
            string cssSelector = context.Request["css"] ?? "";
            
            string markup = UrlUtils.UnZipContent(context.Request["markup"]);

            var functionElement = XElement.Parse(markup);

            Guid pageId;
            Guid templateId;

            Guid.TryParse(pageIdStr, out pageId);
            Guid.TryParse(templateIdStr, out templateId);            
            
            IPage page;
            
            using (var c = new DataConnection(PublicationScope.Unpublished))
            {
                if (pageId != Guid.Empty)
                {
                    page = c.Get<IPage>().Single(p => p.Id == pageId);
                }
                else
                {
                    page = null;

                    if (templateId != Guid.Empty)
                    {
                        page = c.Get<IPage>().FirstOrDefault(p => p.TemplateId == templateId);
                    }
                    
                    page = page ?? c.Get<IPage>().First();
                }
            }
            
            if (templateId != Guid.Empty)
            {
                page.TemplateId = templateId;
            }
            
            var templateInfo = PageTemplateFacade.GetPageTemplate(page.TemplateId);

            var placeholderDocument = new XhtmlDocument();
            placeholderDocument.Body.Add(new XElement(Namespaces.Xhtml + "functionpreview", 
                new XAttribute("id", "CompositeC1FunctionPreview"),
                BuildContainerFromCssSelector(cssSelector, functionElement)));
            
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

        private XElement BuildContainerFromCssSelector(string cssSelector, XElement innerElement)
        {
            XElement currentElement = null;

            foreach (var cssSelectorPart in cssSelector.Split(new [] {" "}, StringSplitOptions.RemoveEmptyEntries))
            {
                string[] parts = cssSelectorPart.Split('.');
                string elementName = parts[0];

                var newElement = new XElement(Namespaces.Xhtml + elementName);
                if (parts.Length > 1)
                {
                    newElement.Add(new XAttribute("class", string.Join(" ", parts.Skip(1))));
                }

                if (currentElement != null)
                {
                    currentElement.Add(newElement);
                }
                currentElement = newElement;
            }
            
            if (currentElement == null)
            {
                return innerElement;
            }
            
            currentElement.Add(innerElement);
            
            return innerElement.Ancestors().Last();
        }

        public bool IsReusable
        {
            get { return true; }
        }
    }
}