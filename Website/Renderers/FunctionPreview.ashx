<%@ WebHandler Language="C#" Class="Composite.Renderers.Phantom" %>

using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
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
            string cultureName = context.Request["lang"];
            int maxWidth = Int32.Parse(context.Request["width"] ?? "1024");
            
            if (maxWidth < 256) maxWidth = 256;
            if (maxWidth > 1920) maxWidth = 1920;
            
            string markup = UrlUtils.UnZipContent(context.Request["markup"]);

            var functionElement = XElement.Parse(markup);

            Guid pageId;
            Guid templateId;

            Guid.TryParse(pageIdStr, out pageId);
            Guid.TryParse(templateIdStr, out templateId);

            CultureInfo culture = cultureName != null
                ? new CultureInfo(cultureName)
                : DataLocalizationFacade.DefaultLocalizationCulture;
            
            IPage page = null;

            using (var c = new DataConnection(PublicationScope.Unpublished, culture))
            {
                if (pageId != Guid.Empty)
                {
                    page = c.Get<IPage>().FirstOrDefault(p => p.Id == pageId);
                }
                
                if(page == null)
                {
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
			bool isDebug = context.Request["debug"] == "1";

            placeholderDocument.Body.Add(
                BuildContainerFromCssSelector(
				cssSelector, new XElement(Namespaces.Xhtml + "functionpreview",
					                      new XAttribute("id", "CompositeC1FunctionPreview"),
										  new XAttribute("style", string.Format("max-width:{0}px; display: block;", maxWidth)),
										  functionElement)));

            string scriptFilePath = HostingEnvironment.MapPath("~/App_Data/Composite/PhantomJs/preview.js");
            string scriptLines = File.ReadAllText(scriptFilePath);

            // this script block will 
            //  - make all 'other' elements get opacity: 0;
            //  - fix max-width on elements wider than the max width in effect;
            //  - make elements inside a 'column-count = (n)' css block become straightened out (eliminate column flow)
            //  - finalize (call phantom and set debug markers) - pausing a bit if iframe's are present            
            
			placeholderDocument.Body.AddFirst(XElement.Parse(
                previewStagingJs.Replace("{$SCRIPT}", scriptLines)
                                .Replace("{$OPACITY}", isDebug ? "0.4" : "0")
                                .Replace("{$MAXWIDTH}", maxWidth.ToString()))
            );
			
			if (isDebug)
			{
				placeholderDocument.Body.AddFirst(XElement.Parse(debugElement));
			}
			            
            var contents = new List<IPagePlaceholderContent>();
            var content = DataFacade.BuildNew<IPagePlaceholderContent>();
            content.PageId = page.Id;
            content.VersionId = page.VersionId;
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



		const string previewStagingJs = @"
<script xmlns='http://www.w3.org/1999/xhtml'>    //<!--
    {$SCRIPT}
// -->
</script>
";
				
// debug js - adding &debug=1 will show stuff		
		
		const string debugElement = @"
<div xmlns='http://www.w3.org/1999/xhtml' id='previewMarker' style='border:10px dashed pink; position: absolute; z-index:9999; opacity:0.7'></div>
";

	}

}