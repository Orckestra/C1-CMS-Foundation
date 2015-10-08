<%@ WebHandler Language="C#" Class="Composite.Renderers.Phantom" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.Core.PageTemplates;
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
			try
			{

				if (!UserValidationFacade.IsLoggedIn())
				{
					context.Response.StatusCode = 401; // "Unauthorized"
					return;
				}

				string pageIdStr = context.Request["p"] ?? "";
				string templateIdStr = context.Request["t"] ?? "";

				Guid pageId;
				Guid templateId;

				Guid.TryParse(pageIdStr, out pageId);
				Guid.TryParse(templateIdStr, out templateId);

				IPage page = null;

				using (var c = new DataConnection(PublicationScope.Unpublished, UserSettings.ActiveLocaleCultureInfo))
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

				var contents = new List<IPagePlaceholderContent>();

				bool previewStagingJsAppended = false;

				foreach (var placeholder in templateInfo.PlaceholderDescriptions)
				{
					var placeholderDocument = new XhtmlDocument();
					placeholderDocument.Body.Add(new XElement(Namespaces.Xhtml + "placeholderpreview",
						new XAttribute("id", "ph_" + placeholder.Id),
						new XAttribute("style", string.Format("background-color: lightgray; display: block; width: 100%; min-height: {0}px; height: 100%",
							placeholder.Id == templateInfo.DefaultPlaceholderId ? 600 : 300)),
						new XElement(Namespaces.Xhtml + "h1", placeholder.Title)));

					if (!previewStagingJsAppended)
					{
						placeholderDocument.Body.Add(XElement.Parse(PreviewStagingJs));
						previewStagingJsAppended = true;
					}

					var content = DataFacade.BuildNew<IPagePlaceholderContent>();
					content.PageId = page.Id;
					content.PlaceHolderId = placeholder.Id;
					content.Content = placeholderDocument.ToString();
					contents.Add(content);
				}



				string output = PagePreviewBuilder.RenderPreview(page, contents, RenderingReason.ScreenshotGeneration);

                // NOTE: output is always empty in integrated mode, as RenderPreview() does a request transfer.
				if (output != String.Empty)
				{
					context.Response.ContentType = "text/html";
					context.Response.Write(output);
                    if (!previewStagingJsAppended || !output.Contains(PreviewStagingJsMarker))
					{
                        context.Response.Write(PreviewStagingJs);
					}

				}
			}
			catch (Exception ex)
			{
				Composite.Core.Log.LogError("TemplatePreview", ex);
				throw;
			}
		}

		public bool IsReusable
		{
			get { return true; }
		}

		// this script block will 
		//  - finalize (call phantom)
		const string PreviewStagingJs = @"
<script xmlns='http://www.w3.org/1999/xhtml'>    //<!--
    window.addEventListener('load', function () {
		window.setTimeout( function() {
				finalize();
		}, 200);
    });

	function finalize()
	{
		if (window.callPhantom!=null)
			window.callPhantom('load');
	}

    window.previewJsInitialized = true;

// -->
</script>
";

	    private const string PreviewStagingJsMarker = "window.callPhantom('load')";

	}
}