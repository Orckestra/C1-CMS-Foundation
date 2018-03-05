<%@ WebHandler Language="C#" Class="DownloadFile" %>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.Versioning;
using System.Runtime.InteropServices;
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

        bool isDllPreview = false;

        if (isPreview)
        {
            var extension = Path.GetExtension(fullFilePath);
            string mimeType = MimeTypeInfo.GetCanonicalFromExtension(extension);

            if (!MimeTypeInfo.IsBrowserPreviewableFile(mimeType))
            {
                if (extension.Equals(".dll", StringComparison.OrdinalIgnoreCase))
                {
                    isDllPreview = true;
                }
                else if (!MimeTypeInfo.IsTextFile(mimeType))
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

        if (isDllPreview)
        {
            OutputDllPreviewInformation(context, fullFilePath);
        }
        else
        {
            context.Response.TransmitFile(fullFilePath);
        }

        context.ApplicationInstance.CompleteRequest();
    }

    private void OutputDllPreviewInformation(HttpContext context, string fullFilePath)
    {
        FileVersionInfo fileVersion = null;
        try
        {
            fileVersion = FileVersionInfo.GetVersionInfo(fullFilePath);
        }
        catch(Exception)
        {
        }

        var assemblyInfo = AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(asm =>
        {
            try
            {
                return !asm.IsDynamic
                       && !string.IsNullOrEmpty(asm.CodeBase)
                       && ("file:///" + fullFilePath).Replace("\\", "/")
                          .Equals(asm.CodeBase, StringComparison.InvariantCultureIgnoreCase);
            }
            catch
            {
                return false;
            }
        });

        var fileInfo = new FileInfo(fullFilePath);

        var lines = new List<string>();

        if (assemblyInfo != null)
        {
            var attributes = assemblyInfo.CustomAttributes;

            lines.AddRange(new []
            {
                "--------- Version and metadata ---------",
                "",
                "Assembly Name       : " + assemblyInfo.GetName().Name,
                "Version             : " + assemblyInfo.GetName().Version,
                "Is Debug Dll        : " + attributes.Any(
                    a => a.AttributeType == typeof(DebuggableAttribute)
                         && a.ConstructorArguments.Any(
                             attr => attr.ArgumentType == typeof(DebuggableAttribute.DebuggingModes)
                                     && ((DebuggableAttribute.DebuggingModes)attr.Value & DebuggableAttribute.DebuggingModes.DisableOptimizations) > 0)
                ),
                "ImageRuntimeVersion : " + assemblyInfo.ImageRuntimeVersion,
                "Full Name           : " + assemblyInfo.FullName
            });

            var guidAttribute = attributes.FirstOrDefault(attr => attr.AttributeType == typeof(GuidAttribute));
            if (guidAttribute != null)
            {
                lines.Add("Guid                : " + (string) guidAttribute.ConstructorArguments.First().Value);
            }

            var targetFrameworkAttr = attributes.FirstOrDefault(attr => attr.AttributeType == typeof(TargetFrameworkAttribute));
            if (targetFrameworkAttr != null)
            {
                lines.Add("Target Framework    : " + (string) targetFrameworkAttr.ConstructorArguments.First().Value);
            }
        }
        else
        {
            lines.Add("The dll file is not loaded in the current AppDomain or is not a managed assembly");
        }

        lines.Add("");
        lines.Add("------------- File version -------------");
        lines.Add("");

        if (fileVersion != null)
        {
            if (!string.IsNullOrWhiteSpace(fileVersion.ProductName))
            {
                lines.Add("Product Name        : " + fileVersion.ProductName);
            }

            if (!string.IsNullOrWhiteSpace(fileVersion.CompanyName))
            {
                lines.Add("Company Name        : " + fileVersion.CompanyName);
            }

            lines.AddRange(new[]
            {
                "Product Version     : " + fileVersion.ProductVersion,
                "File    Version     : " + fileVersion.FileVersion
            });

            if (!string.IsNullOrWhiteSpace(fileVersion.Comments))
            {
                lines.Add("");
                lines.Add(fileVersion.Comments);
            }
        }
        else
        {
            lines.Add("Failed to get extract FileVersionInfo");
        }


        lines.AddRange(new[]
        {
            "",
            "----------------------------------------",
            "",
            "Last Modified       : " + fileInfo.LastWriteTime.ToString("O"),
            "Last Modified, UTC  : " + fileInfo.LastWriteTimeUtc.ToString("O"),
            "Creation Time       : " + fileInfo.CreationTime.ToString("O"),
            "Creation Time, UTC  : " + fileInfo.CreationTimeUtc.ToString("O")
        });



        var text = string.Join(Environment.NewLine, lines);

        context.Response.Write(text);
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