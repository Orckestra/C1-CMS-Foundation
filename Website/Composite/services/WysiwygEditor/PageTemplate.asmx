<%@ WebService Language="C#" Class="Composite.Services.PageTemplateService" %>

using System;
using System.Web.Services;
using System.Web.Services.Protocols;
using Composite.Core.WebClient;
using Composite.Core.WebClient.Services.WysiwygEditor;

namespace Composite.Services
{

    public class TemplatePreviewInformation
    {
        public string PreviewImageUrl { get; set; }
        public PageTemplatePreview.PlaceholderInformation[] Placeholders { get; set; }
    }

    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    public class PageTemplateService : WebService
    {
        [WebMethod]
        public TemplatePreviewInformation GetTemplatePreviewInformation(Guid pageId, Guid templateId)
        {
            string _imagePath;
            PageTemplatePreview.PlaceholderInformation[] _placeholders;

            PageTemplatePreview.GetPreviewInformation(Context, pageId, templateId, out _imagePath, out _placeholders);

            string previewUrl = UrlUtils.RenderersRootPath + "/TemplatePreviewImage?p=" + pageId + "&t=" + templateId;

            return new TemplatePreviewInformation
            {
                PreviewImageUrl = previewUrl,
                Placeholders = _placeholders
            };
        }
    }
}