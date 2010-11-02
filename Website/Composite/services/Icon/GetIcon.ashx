<%@ WebHandler Language="C#" Class="GetIcon" %>

using System;
using Composite.Core.IO;
using System.Web;
using System.Drawing.Imaging;
using System.Drawing;
using System.Threading;

using Composite.Core.Configuration;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.Core.Collections.Generic;

public class GetIcon : IHttpHandler
{
    private const string sizeQueryStringParameterName = "size"; // normal, large, xlarge
    private const string resourceNameQueryStringParameterName = "resourceName";
    private const string resourceNamespaceQueryStringParameterName = "resourceNamespace";
    private const int SyncTimeout = 10000;        

    private static ReaderWriterLock _fileLock = new ReaderWriterLock();

    private static bool _folderExistanceChecked = false;

    public void ProcessRequest(HttpContext context)
    {
        ResourceHandle rh = GetResourceHandleFromRequest(context);
        IconSize iconSize = GetIconSizeFromRequest(context);


        WriteBitmapToResponseSteam(context, rh, iconSize);
    }

    
    
    private void WriteBitmapToResponseSteam(HttpContext context, ResourceHandle resourceHandle, IconSize iconSize)
    {
        string iconFilePath = GetCachePathForFile(context, resourceHandle, iconSize);

        context.Response.Expires = GlobalSettingsFacade.ResourceCacheSettings.ClientCacheMinutes;
        context.Response.ContentType = "image/png";

        EnsureCacheFolder(context);

        _fileLock.AcquireReaderLock(SyncTimeout);
        try
        {
            EnsureLocalFile(iconFilePath, resourceHandle, iconSize);

            context.Response.WriteFile(iconFilePath);
        }
        finally
        {
            _fileLock.ReleaseReaderLock();
        }
    }

    private void EnsureLocalFile(string iconFilePath, ResourceHandle resourceHandle, IconSize iconSize)
    {
        bool fileExist = File.Exists(iconFilePath);

        DateTime lastWriteTime = DateTime.MinValue;

        if (fileExist)
        {
            lastWriteTime = File.GetLastWriteTime(iconFilePath);
        }

        if (fileExist && (DateTime.Now - lastWriteTime).Minutes < GlobalSettingsFacade.ResourceCacheSettings.ServerCacheMinutes)
        {
            return;
        }

        LockCookie cookie =  _fileLock.UpgradeToWriterLock(SyncTimeout);
        try
        {
            // Checking if a file was created/updated by another thread
            if (!fileExist && File.Exists(iconFilePath)) return;

            if (fileExist && lastWriteTime != File.GetLastWriteTime(iconFilePath)) return;


            using (Bitmap sourceIcon = IconResourceSystemFacade.GetIcon(resourceHandle, iconSize))
            {
                using (Bitmap bm3 = new Bitmap(sourceIcon))
                {
                    bm3.Save(iconFilePath);
                }
            }
        }
        finally
        {
            _fileLock.DowngradeFromWriterLock(ref cookie);
        }
    }
    
    private string GetCachePathForFile(HttpContext context, ResourceHandle resourceHandle, IconSize iconSize)
    {
        
        string fileName = string.Format("{0}.{1}.{2}.png", resourceHandle.ResourceNamespace, resourceHandle.ResourceName, iconSize);
        string relativePath = System.IO.Path.Combine(GlobalSettingsFacade.ResourceCacheSettings.CachePath, fileName);
        return context.Server.MapPath(relativePath);
    }
    
    
    private ResourceHandle GetResourceHandleFromRequest(HttpContext context)
    {
        string resourceName = context.Request.QueryString[resourceNameQueryStringParameterName];
        string resourceNamespace = context.Request.QueryString[resourceNamespaceQueryStringParameterName];
        if (String.IsNullOrEmpty(resourceName) == true) throw new ArgumentException("QueryString '" + resourceNameQueryStringParameterName + "' required");
        if (String.IsNullOrEmpty(resourceNamespace) == true) throw new ArgumentException("QueryString '" + resourceNamespaceQueryStringParameterName + "' required");

        return new ResourceHandle(resourceNamespace, resourceName);
    }

    
    
    private IconSize GetIconSizeFromRequest(HttpContext context)
    {
        string iconSizeName = context.Request.QueryString[sizeQueryStringParameterName];

        if (String.IsNullOrEmpty(iconSizeName))
        {
            return IconSize.Normal;
        }

        try
        {
            IconSize iconSize = (IconSize)Enum.Parse(typeof(IconSize), iconSizeName, true);

            return iconSize;
        }
        catch (ArgumentException ex)
        {
            throw new ArgumentException("Invalid icon size string", ex);
        }
    }

    
    
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

    private void EnsureCacheFolder(HttpContext context)
    {
        _fileLock.AcquireWriterLock(SyncTimeout);
        
        try
        {
            if (_folderExistanceChecked == false)
            {
                // ensure cache folder exists
                string folderPath = context.Server.MapPath(GlobalSettingsFacade.ResourceCacheSettings.CachePath);
                if (Directory.Exists(folderPath) == false)
                {
                    Directory.CreateDirectory(folderPath);
                }
            }

            _folderExistanceChecked = true;
        }
        finally
        {
            _fileLock.ReleaseWriterLock();
        }
    }
}