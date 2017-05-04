<%@ WebHandler Language="C#" Class="DownloadFile" %>

using System;
using System.IO;
using System.Web;
using Composite;
using Composite.Core.IO;
using Composite.C1Console.Security;
using Composite.Core.Extensions;
using Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider;


public class DownloadFile : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        bool actionAllowed = false;

        string fullFilePath = null;
        bool isPreview = false;

        if(UserValidationFacade.IsLoggedIn())
        {
            string file = context.Request.QueryString["file"];
            string providerName = context.Request.QueryString["provider"];
            isPreview = context.Request.QueryString["preview"] == "true";


            if (file.IsNullOrEmpty() || providerName.IsNullOrEmpty())
            {
                SetResponseCode(context, /* Bad request */ 400);
                return;
            }

            string basePath = Path.GetDirectoryName(PathUtil.BaseDirectory);

            fullFilePath = basePath + file;

            var fileEntityToken = new WebsiteFileElementProviderEntityToken(providerName, fullFilePath, basePath);

            actionAllowed = UserHasRightToDownload(fileEntityToken);
        }

        if(!actionAllowed)
        {
            SetResponseCode(context, /* Forbidden */ 403);
            return;
        }

        context.Response.Cache.SetExpires(DateTime.Now.AddYears(-1));

        Verify.IsNotNull(fullFilePath, "Unexpected exception");

        if (isPreview)
        {
            var extension = Path.GetExtension(fullFilePath);
            string mimeType = MimeTypeInfo.GetCanonicalFromExtension(extension);

            if (!MimeTypeInfo.IsBrowserPreviewableFile(mimeType))
            {
                if (!MimeTypeInfo.IsTextFile(mimeType))
                {
                    return;
                }

                mimeType = "text/plain";
            }

            context.Response.ContentType = mimeType;
        }
        else
        {
            string fileName = HttpUtility.UrlEncode(Path.GetFileName(fullFilePath));
            context.Response.AddHeader("Content-Disposition", "attachment;filename=" + fileName);
        }

        context.Response.TransmitFile(fullFilePath);
        context.ApplicationInstance.CompleteRequest();
    }

    private bool UserHasRightToDownload(EntityToken file)
    {
        var userToken = UserValidationFacade.GetUserToken();
        var userPermissionDefinitions = PermissionTypeFacade.GetUserPermissionDefinitions(userToken.Username);
        var userGroupPermissionDefinitions = PermissionTypeFacade.GetUserGroupPermissionDefinitions(userToken.Username);

        var requiredPermissions = new [] { PermissionType.Administrate, PermissionType.Edit };
        return SecurityResolver.Resolve(userToken, requiredPermissions, file, userPermissionDefinitions, userGroupPermissionDefinitions)
               == SecurityResult.Allowed;
    }

    private void SetResponseCode(HttpContext context, int responseCode)
    {
        context.Response.StatusCode = responseCode;
        context.ApplicationInstance.CompleteRequest();
    }

    public bool IsReusable
    {
        get { return true; }
    }
}