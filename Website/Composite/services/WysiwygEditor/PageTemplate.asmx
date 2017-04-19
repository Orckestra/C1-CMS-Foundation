<%@ WebService Language="C#" Class="Composite.Services.PageTemplateService" %>

using System;
using System.Activities.Statements;
using System.Threading;
using System.Web.Services;
using System.Web.Services.Protocols;
using Composite.Core;
using Composite.Core.Configuration;
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
		    if (!GlobalSettingsFacade.FunctionPreviewEnabled)
		    {
		        return EmptyPreviewInformation();
		    }

			string _imagePath;
			PageTemplatePreview.PlaceholderInformation[] _placeholders;

			try
			{
				bool success = PageTemplatePreview.GetPreviewInformation(Context, pageId, templateId, out _imagePath, out _placeholders);
				if (!success)
				{
					return EmptyPreviewInformation();
				}
			}
			catch (ThreadAbortException)
			{
				throw;
			}
			catch (Exception ex)
			{
				Log.LogError("PageTemplateService", ex);
				return EmptyPreviewInformation();
			}

			string previewUrl = UrlUtils.RenderersRootPath + "/TemplatePreviewImage?p=" + pageId + "&t=" + templateId;

			return new TemplatePreviewInformation
			{
				PreviewImageUrl = previewUrl,
				Placeholders = _placeholders
			};
		}

		private TemplatePreviewInformation EmptyPreviewInformation()
		{
			return new TemplatePreviewInformation
			{
				PreviewImageUrl = "",
				Placeholders = new PageTemplatePreview.PlaceholderInformation[0]
			};
		}
	}
}