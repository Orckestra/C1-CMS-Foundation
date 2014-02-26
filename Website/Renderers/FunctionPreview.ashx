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
            placeholderDocument.Body.Add(
                BuildContainerFromCssSelector(
				cssSelector, new XElement(Namespaces.Xhtml + "functionpreview",
					                      new XAttribute("id", "CompositeC1FunctionPreview"),
										  new XAttribute("style", "max-width:1024px; "),
										  functionElement)));
			bool isDebug = context.Request["debug"] == "1";
			
			placeholderDocument.Body.AddFirst(XElement.Parse(opacityFixJs.Replace("{$OPACITY}", isDebug ? "0.4" : "0")));
			
			if (isDebug)
			{
				placeholderDocument.Body.AddFirst(XElement.Parse(debugElement));
				placeholderDocument.Body.Add(XElement.Parse(debugJs));
			}
			            
            var contents = new List<IPagePlaceholderContent>();
            var content = DataFacade.BuildNew<IPagePlaceholderContent>();
            content.PageId = page.Id;
            content.PlaceHolderId = !string.IsNullOrEmpty(placeholderName) ? placeholderName : templateInfo.DefaultPlaceholderId;
            content.Content = placeholderDocument.ToString();
            contents.Add(content);

            string output = PagePreviewBuilder.RenderPreview(page, contents, RenderingReason.ScreenshotGeneration);

            if (output != String.Empty)
            {
                context.Response.ContentType = "text/html";
                context.Response.Write(output);
            }
		}

		private XElement BuildContainerFromCssSelector(string cssSelector, XElement innerElement)
		{
			XElement currentElement = null;

			foreach (var cssSelectorPart in cssSelector.Split(new[] { " " }, StringSplitOptions.RemoveEmptyEntries))
			{
				if (cssSelectorPart != "p")
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
			}

			if (currentElement == null)
			{
				return innerElement;
			}

			currentElement.Add(innerElement.Attributes());
			currentElement.Add(innerElement.Elements());

			return currentElement.AncestorsAndSelf().Last();
		}

        public bool IsReusable
        {
            get { return true; }
        }
		const string debugElement = @"
<div xmlns='http://www.w3.org/1999/xhtml' id='previewMarker' style='border:10px dashed pink; position: absolute; z-index:9999; opacity:0.7'></div>
";

		// this script block will make all 'other' elements get opacity: 0;
		const string opacityFixJs = @"
<script xmlns='http://www.w3.org/1999/xhtml'>//<!--
window.addEventListener('load', function() { 
	var element = document.getElementById('CompositeC1FunctionPreview');
	while (element!=null && element != document.body) {
		sibling = element.parentNode.firstChild;
		while (sibling != null ) {
			if (sibling!=element && sibling.nodeType === 1 ) sibling.style.opacity = {$OPACITY};
			sibling = sibling.nextElementSibling || sibling.nextSibling
		}
		element = element.parentNode;		
	}
});
// -->
</script>
";
				
	const string debugJs = @"
<script xmlns='http://www.w3.org/1999/xhtml'>//<!--
function getFunctionPreviewClientRect(previewElementId) {
    var element = document.getElementById(previewElementId);

    if (element == null || element.innerHTML == '') {
        return null;
    }
				    
    var children = element.getElementsByTagName('*');
    if (children.lenght == 0) {
        return null;
    }

    var top, right, bottom, left, sizeSet = false;
    for (i = 0; i < children.length; i++) {
        var childNode = children[i]; 

        var rect = childNode.getBoundingClientRect();
        if (rect.width == 0 || rect.height == 0) {
            continue;
        }
				        
        if (!sizeSet) {
            top = rect.top;
            right = rect.right;
            bottom = rect.bottom;
            left = rect.left;

            sizeSet = true;
        } else {
            top = top < rect.top ? top : rect.top;
            bottom = bottom > rect.bottom ? bottom : rect.bottom;
            left = left < rect.left ? left : rect.left;
            right = right > rect.right ? right : rect.right;
        }
    }

    // Checking is there's a child node that is a text node
    var childNodes = element.childNodes;
    for (var i = 0; childNode = childNodes[i]; i++)
    {
        if (childNode.toString() == '[object Text]') {
            rect = element.getBoundingClientRect();

            if (!sizeSet) {
                top = rect.top;
                right = rect.right;
                bottom = rect.bottom;
                left = rect.left;

                sizeSet = true;
            } else {
                top = top < rect.top ? top : rect.top;
                bottom = bottom > rect.bottom ? bottom : rect.bottom;
                left = left < rect.left ? left : rect.left;
                right = right > rect.right ? right : rect.right;
            }

            break;
        }
    }

    if (!sizeSet) {
        return null;
    }

    return {
        left: left,
        top: top,
        height: bottom - top,
        width: right - left
    };
}

window.addEventListener('load', function() { 
	var bounds = getFunctionPreviewClientRect('CompositeC1FunctionPreview');
	var previewMarkerElement = document.getElementById('previewMarker');
	document.body.insertBefore(previewMarkerElement,document.body.firstChild);

	previewMarkerElement.style.left = bounds.left + 'px';
	previewMarkerElement.style.top = bounds.top + 'px';
	previewMarkerElement.style.width = bounds.width + 'px';
	previewMarkerElement.style.height = bounds.height + 'px';
	previewMarkerElement.style.opacity = 0.5;
});
// -->
</script>
";
	}

}