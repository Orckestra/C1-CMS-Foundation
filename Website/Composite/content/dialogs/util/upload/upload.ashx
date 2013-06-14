<%@ WebHandler Language="C#" Class="Upload" %>

using System.IO;
using System.Linq;
using System.Web;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.Types;
using Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider;

public class Upload : IHttpHandler
{
	public void ProcessRequest(HttpContext context)
	{
		context.Response.ContentType = "text/plain";
		var fileName = context.Request.Headers["X-FileName"];
		var folderPath = context.Request.Headers["X-FolderPath"]??"/";
		var mw = context.Request.Headers["X-MaxWidth"];
		var mh = context.Request.Headers["X-MaxHeight"];

		var file = new WorkflowMediaFile
			{
				FileName = Path.GetFileName(fileName),
				FolderPath = folderPath,
				Title = fileName,
				Description = string.Empty,
				Culture = Composite.C1Console.Users.UserSettings.ActiveLocaleCultureInfo.Name,
				Length = (int) context.Request.InputStream.Length,
				MimeType = MimeTypeInfo.GetCanonicalFromExtension(Path.GetExtension(fileName))
			};

		int counter = 0;
		string extension = Path.GetExtension(file.FileName);
		string name = file.FileName.GetNameWithoutExtension();
		while (Exists(file))
		{
			counter++;
			file.FileName = name + counter.ToString() + extension;
		}

		using (var readStream = context.Request.InputStream)
		{
			using (var writeStream = file.GetNewWriteStream())
			{
				readStream.CopyTo(writeStream);
			}
		}

		IMediaFile addedFile = DataFacade.AddNew<IMediaFile>(file);
		if (IsImage(addedFile))
		{
			var qs = "";
			if (mw != null && mh != null)
			{
				qs = string.Format("?mw={0}&amp;mw={1}", mw, mh);
			}
			else if (mw != null)
			{
				qs = string.Format("?mw={0}", mw);
			}
			else if (mh != null)
			{
				qs = string.Format("?mh={0}", mh);
			}
			context.Response.Write(string.Format(@" <img src=""{0}{1}"" /> ", UrlUtils.ResolvePublicUrl( MediaUrlHelper.GetUrl(addedFile, true)), qs));
		}
		else
		{
			context.Response.Write(string.Format(@" <a href=""{0}"" >{1}</a> ", UrlUtils.ResolvePublicUrl( MediaUrlHelper.GetUrl(addedFile, true, true)), fileName));
		};

	}

	private static bool Exists(IMediaFile file)
	{
		return DataFacade.GetData<IMediaFile>().Any(x => x.FolderPath == file.FolderPath && x.FileName == file.FileName);
	}

	private static bool IsImage(IMediaFile file)
	{
		return DataFacade.GetData<IImageFile>().Any(x => x.Id == file.Id);
	}

	public bool IsReusable
	{
		get
		{
			return false;
		}
	}
}
