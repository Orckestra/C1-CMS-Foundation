using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using Composite.Core;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.PageTemplates;

namespace Composite.Plugins.PageTemplates.Common
{
    internal static class PageTemplateCache
    {
        private static readonly string LogTitle = typeof(PageTemplateCache).Name;

        private static string GetCacheFilePath(string virtualPath)
        {
            string nameHash = virtualPath.GetHashCode().ToString(CultureInfo.InvariantCulture);

            return Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TempDirectory), "pagetemplate" + nameHash);
        }

        public static void AddToCache(string virtualPath, DateTime lastModifiedUtc, PageTemplateDescriptor pageTemplate)
        {
            string cacheFileName = GetCacheFilePath(virtualPath);

            var lines = new List<string>();

            if (pageTemplate != null)
            {
                lines.Add(pageTemplate.Id.ToString());
                lines.Add(pageTemplate.Title);
            }

            try
            {
                C1File.WriteAllLines(cacheFileName, lines);
                C1File.SetCreationTimeUtc(cacheFileName, lastModifiedUtc);
            }
            catch (Exception ex)
            {
                Log.LogWarning(LogTitle, "Failed to cache master page information. Path: '{0}'", virtualPath);
                Log.LogWarning(LogTitle, ex);
            }
        }

        public static bool GetFromCache(string virtualPath, DateTime lastModifiedUtc, out TemplateInformation cachedTemplateInformation)
        {
            string cacheFileName = GetCacheFilePath(virtualPath);

            try
            {
                if (!C1File.Exists(cacheFileName) || C1File.GetCreationTimeUtc(cacheFileName) != lastModifiedUtc)
                {
                    cachedTemplateInformation = null;
                    return false;
                }

                var lines = C1File.ReadAllLines(cacheFileName);
                if (lines == null || lines.Length == 0)
                {
                    cachedTemplateInformation = null;
                }
                else
                {
                    Guid templateId = Guid.Parse(lines[0]);
                    string title = string.Join(Environment.NewLine, lines.Skip(1));

                    cachedTemplateInformation = new TemplateInformation { TemplateId = templateId, Title = title };
                }
            }
            catch (Exception ex)
            {
                Log.LogWarning(LogTitle, "Failed to load master page information from cache. File: '{0}'", cacheFileName);
                Log.LogWarning(LogTitle, ex);

                cachedTemplateInformation = null;
                return false;
            }
            return true;
        }

        public class TemplateInformation
        {
            public Guid TemplateId { get; set; }
            public string Title { get; set; }
        }
    }
}
