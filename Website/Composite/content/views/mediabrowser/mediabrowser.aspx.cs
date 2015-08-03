using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Composite.Data;
using Composite.Data.Types;
using Composite.Plugins.Data.DataProviders.MediaFileProvider;
using Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider;


public partial class Composite_content_views_mediabrowser : System.Web.UI.Page
{
    private const string MediaElementProviderName = "MediaFileElementProvider";
    private const int MaxElementsShown = 500;

    private const int ListImage_MaxWidth = 290;
    private const int ListImage_MaxHeight = 198;

    private const int PreviewImage_MaxWidth = 700;
    private const int PreviewImage_MaxHeight = 500;

    protected void Page_PreRender(object sender, EventArgs e)
    {
        if (!UserValidationFacade.IsLoggedIn())
        {
            Response.StatusCode = 401;
            return;  
        }

        string file = Request["file"];
        string folder = Request["folder"];
        string storeId = Request["store"];

        if (!string.IsNullOrEmpty(file))
        {
            FileView(file);
        }
        else if (!string.IsNullOrEmpty(folder))
        {
            FolderView(folder);
        }
        else if (!string.IsNullOrEmpty(storeId))
        {
            RootView(storeId);
        }
        else
        {
            Response.StatusCode = 500;
            Context.ApplicationInstance.CompleteRequest();
        }
    }

    private void FileView(string keyPath)
    {
        IMediaFile mediaFile;

        using (var c = new DataConnection())
        {
            mediaFile = c.Get<IMediaFile>().FirstOrDefault(f => f.KeyPath == keyPath);
        }

        if (mediaFile == null)
        {
            Response.StatusCode = 404;
            return;
        }

        plhShowFile.Visible = true;
        txtFileName.Text = mediaFile.FileName;
        txtTitle.Text = !string.IsNullOrEmpty(mediaFile.Title) ? mediaFile.Title : mediaFile.FileName;
        txtDescription.Text = mediaFile.Description;


        if (IsImageFile(mediaFile))
        {
            imgViewFile.Visible = true;
            imgViewFile.Src = "~/media({0})?mw={1}&amp;mh={2}".FormatWith(keyPath, PreviewImage_MaxWidth, PreviewImage_MaxHeight);
        }
        else
        {
            divIconPreview.Visible = true;
            FileIconName = GetIcon(mediaFile).ResourceName;

            // TODO: preview non-image files?
        }
    }

    private bool IsImageFile(IMediaFile mediaFile)
    {
        string canonicalMimeType = MimeTypeInfo.GetCanonical(mediaFile.MimeType);

        return canonicalMimeType.StartsWith("image/");
    }

    private ResourceHandle GetIcon(IMediaFile mediaFile)
    {
        string canonicalMimeType = MimeTypeInfo.GetCanonical(mediaFile.MimeType);

        return MimeTypeInfo.GetResourceHandleFromMimeType(canonicalMimeType);
    }

    private void FolderView(string keyPath)
    {
        IMediaFileFolder mediaFolder;

        using (var c = new DataConnection())
        {
            mediaFolder = c.Get<IMediaFileFolder>().FirstOrDefault(f => f.KeyPath == keyPath);
        }

        if (mediaFolder == null)
        {
            Response.StatusCode = 404;
            return;
        }

        var folderEntityToken = mediaFolder.GetDataEntityToken();
        var elementHandle = new ElementHandle(MediaElementProviderName, folderEntityToken);

        var elements = ElementFacade.GetChildren(elementHandle, new SearchToken()).Take(MaxElementsShown).ToList();

        ListElements(elements, mediaFolder.StoreId, mediaFolder.Path);
    }

    private void RootView(string storeId)
    {
        var folderEntityToken = new MediaRootFolderProviderEntityToken(storeId);
        var elementHandle = new ElementHandle(MediaElementProviderName, folderEntityToken);

        var elements = ElementFacade.GetChildren(elementHandle, new SearchToken()).Take(MaxElementsShown).ToList();

        ListElements(elements, storeId, "/");
    }

    private void ListElements(ICollection<Element> elements, string storeId, string folderPath)
    {
        plhShowFolder.Visible = true;

        if (!elements.Any())
        {
            return;
        }

        Dictionary<Guid, IMediaFile> mediaFiles;
        using (var c = new DataConnection())
        {
            mediaFiles = c.Get<IMediaFile>().Where(f => f.StoreId == storeId && f.FolderPath == folderPath).ToDictionary(f => f.Id);
        }

        rptElements.DataSource = elements;
        rptElements.ItemDataBound += (sender, args) =>
        {
            var element = args.Item.DataItem as Element;

            var txtTitle = (Literal)args.Item.FindControl("txtTitle");

            txtTitle.Text = element.VisualData.Label;

            bool imagePreview = false;

            var dataEntityToken = element.ElementHandle.EntityToken as DataEntityToken;
            if (dataEntityToken != null && dataEntityToken.InterfaceType == typeof(IMediaFile) &&
                dataEntityToken.DataSourceId.DataId is MediaFileProvider.MediaDataId)
            {
                Guid mediaId = (dataEntityToken.DataSourceId.DataId as MediaFileProvider.MediaDataId).Id;

                IMediaFile mediaFile;
                if (mediaFiles.TryGetValue(mediaId, out mediaFile) && IsImageFile(mediaFile))
                {
                    imagePreview = true;
                    var imgPreview = (HtmlImage)args.Item.FindControl("imgPreview");

                    imgPreview.Visible = true;
                    imgPreview.Src = "~/media({0})?mw={1}&amp;mh={2}".FormatWith(mediaFile.KeyPath,
                        ListImage_MaxWidth, ListImage_MaxHeight);
                }
            }

            if (!imagePreview)
            {
                var divIconPreview = args.Item.FindControl("divIconPreview");
                divIconPreview.Visible = true;
            }
        };
        rptElements.DataBind();
    }

    protected string FileIconName { get; set; }
}
