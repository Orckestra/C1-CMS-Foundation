using System;
using System.Web;
using System.Web.Routing;
using Composite.C1Console.Security;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.WebClient.Services.WysiwygEditor;


namespace Composite.Core.WebClient
{
    internal class TemplatePreviewRoute : Route
    {
        // Adding "x" as a fictional paramter, so MVC wouldn't use this route for producing outbound links
        public TemplatePreviewRoute() : base("Renderers/TemplatePreviewImag{e}", new TemplatePreviewRouteHandler()) { }
    }

    
    internal class TemplatePreviewRouteHandler : IRouteHandler
    {
        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return new TemplatePreviewHttpHandler();
        }
    }


    /// <summary>
    /// Renders image that shows information about a function information in Visual Editor
    /// </summary>
    internal class TemplatePreviewHttpHandler : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            if (!UserValidationFacade.IsLoggedIn())
            {
                context.Response.ContentType = MimeTypeInfo.Text;
                context.Response.Write("No user logged in");
                context.Response.StatusCode = 401;
                return;
            }

            try
            {
                string t = context.Request["t"];
                Verify.That(!t.IsNullOrEmpty(), "Missing query string argument 't'");

                string p = context.Request["p"];
                Verify.That(!p.IsNullOrEmpty(), "Missing query string argument 'p'");

                Guid templateId = Guid.Parse(t);
                Guid pageId = Guid.Parse(p);


                PageTemplatePreview.GetPreviewInformation(context, pageId, templateId, out string filePath, out _);

                Verify.That(C1File.Exists(filePath), "Preview file missing");
                context.Response.ContentType = "image/png";
                context.Response.WriteFile(filePath);
            }
            catch (Exception ex)
            {
                Log.LogError(nameof(TemplatePreviewHttpHandler), ex);
                throw;
            }
        }


        public bool IsReusable => true;
    }
}
