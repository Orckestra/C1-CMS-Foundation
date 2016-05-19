using System;
using System.Text.RegularExpressions;
using Composite.Core.Extensions;
using Composite.Core.WebClient;

namespace Composite.VersionPublishing
{
    public static class VersionNameUrlHelper
    {
        const string Pattern = @"\bc1version\b\((.*?)\)";
        private static readonly Regex CompiledRegex = new Regex(Pattern, RegexOptions.IgnoreCase | RegexOptions.Compiled);

        public static string ResolveVersionName(string pathInfo)
        {
            if (pathInfo.IsNullOrEmpty())
            {
                return null;
            }
                
            var matches = CompiledRegex.Matches(pathInfo);
            if (matches.Count != 1)
            {
                return null;
            }

            var versionString = matches[0].Value;
            return versionString.Substring(10, versionString.Length - 11);
        }

        public static bool CheckIfAdminUrl(string pathInfo)
        {
            if (pathInfo.IsNullOrEmpty())
            {
                return false;
            }

            var adminRootPath = UrlUtils.AdminRootPath;
            if (!adminRootPath.EndsWith("/"))
            {
                adminRootPath = $"{adminRootPath}/";
            }

            return pathInfo.StartsWith(adminRootPath, StringComparison.InvariantCultureIgnoreCase);
        }

        public static string VersionNameToUrl(string versionName)
        {
            return $"/c1version({Uri.EscapeDataString(versionName)})";
        }
    }
}