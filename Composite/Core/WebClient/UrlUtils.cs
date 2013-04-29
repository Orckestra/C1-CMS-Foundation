using System;
using System.IO;
using System.IO.Compression;
using System.Text;
using System.Web;
using System.Web.Hosting;
using System.Collections.Generic;
using Composite.Core.Extensions;


namespace Composite.Core.WebClient
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class UrlUtils
	{
        private static readonly string _adminFolderName = "Composite";
        private static readonly string _renderersFolderName = "Renderers";
        private static readonly string _applicationVirtualPath;
        private static readonly string[] UrlStartMarkers = new[] { "\"", "\'", "&#39;", "&#34;" };

        static UrlUtils()
        {
            if (HostingEnvironment.ApplicationVirtualPath != null)
            {
                string appPath = HostingEnvironment.ApplicationVirtualPath;

                if (appPath.EndsWith("/") || appPath.EndsWith(@"\"))
                {
                    appPath = appPath.Remove(appPath.Length - 1, 1);
                }

                _applicationVirtualPath = appPath;
            }
            else
            {
                _applicationVirtualPath = "";
            }
        }


        /// <exclude />
        public static string ResolveAdminUrl(string adminRelativePath)
        {
            if (adminRelativePath == null) throw new ArgumentNullException("adminRelativePath");
            if (adminRelativePath.IndexOf('~') > -1 || adminRelativePath.StartsWith("/") )
            {
                throw new ArgumentException("The relative URL may not be rooted or contain '~'");
            }

            string[] split = adminRelativePath.Split('?');
            string checkForBackSlashes = split[0];
            if (checkForBackSlashes.Contains(@"\"))
            {
                Log.LogWarning("ResolveAdminUrl", string.Format(@"The url '{0}' contains '\' which is not allowed.", checkForBackSlashes));
            }

            return string.Format("{0}/{1}/{2}", _applicationVirtualPath, _adminFolderName, adminRelativePath);
        }


        /// <exclude />
        public static string ResolvePublicUrl(string publicRelativePath)
        {
            if (publicRelativePath == null) throw new ArgumentNullException("publicRelativePath");

            if (publicRelativePath.StartsWith("/"))
            {
                throw new ArgumentException("The relative URL may not be rooted or contain '~'");
            }

            if (publicRelativePath.StartsWith("~/"))
            {
                publicRelativePath = publicRelativePath.Remove(0, 2);
            }

            return string.Format("{0}/{1}", _applicationVirtualPath, publicRelativePath);
        }


        /// <exclude />
        public static string PublicRootPath
        {
            get
            {
                return _applicationVirtualPath;
            }
        }


        /// <exclude />
        public static string AdminRootPath
        {
            get
            {
                return string.Format("{0}/{1}", _applicationVirtualPath, _adminFolderName);
            }
        }


        /// <summary>
        /// Determines whether currect request is administration console request. 
        /// (Requests to [/virtual path]/Composite/*)
        /// </summary>
        internal static bool IsAdminConsoleRequest(HttpContext httpContext)
        {
            string relativeUrl = httpContext.Request.Path;

            return IsAdminConsoleRequest(relativeUrl);
        }

        /// <summary>
        /// Determines whether currect request is administration console request. 
        /// (Requests to [/virtual path]/Composite/*)
        /// </summary>
        internal static bool IsAdminConsoleRequest(string requestPath)
        {
            return string.Compare(requestPath, UrlUtils.AdminRootPath, StringComparison.OrdinalIgnoreCase) == 0
                   || requestPath.StartsWith(UrlUtils.AdminRootPath + "/", StringComparison.OrdinalIgnoreCase);
        }

        /// <exclude />
        public static string RenderersRootPath
        {
            get
            {
                return string.Format("{0}/{1}", _applicationVirtualPath, _renderersFolderName);
            }
        }

        /// <exclude />
        public static string Combine( string path1, string path2 )
        {
            if (string.IsNullOrEmpty(path1)) return path2;
            if (string.IsNullOrEmpty(path2)) return path1;

            bool path1EndsWithSlash = path1.EndsWith("/");
            bool path2StartsWithSlash = path2.StartsWith("/");

            if (path1EndsWithSlash != path2StartsWithSlash)
            {
                return path1 + path2;
            }

            if (path1EndsWithSlash)
            {
                return path1 + path2.Substring(1);
            }

            return path1 + "/" + path2;
        }

        internal class UrlMatch
        {
            public int Index;
            public string Value;
        }

        /// <summary>
        /// Finds all the urls that start with <paramref name="urlPrefix"/>.
        /// We assume that each url ends before one of the following strings:
        /// double quote, single quote, or &#39; which is single quote mark (') encoded in xml attribute 
        /// </summary>
        /// <param name="html">The html content.</param>
        /// <param name="urlPrefix">The url prefix</param>
        /// <returns>List of urls, sorted by the order they appear</returns>
        internal static List<UrlMatch> FindUrlsInHtml(string html, string urlPrefix)
        {
            var result = new List<UrlMatch>();

            int startIndex = 0;

            while (true)
            {
                int urlOffset = html.IndexOf(urlPrefix, startIndex, StringComparison.OrdinalIgnoreCase);
                if (urlOffset < 5) break;

                int prefixEndOffset = urlOffset + urlPrefix.Length;
                int endOffset = -1;

                char lastQuoteSymbol = html[urlOffset - 1];

                // If starts with a quote symbol- should end with the same quote symbol
                if (lastQuoteSymbol == '\''
                    || lastQuoteSymbol == '\"')
                {
                    endOffset = html.IndexOf(lastQuoteSymbol, prefixEndOffset);
                }
                else if (lastQuoteSymbol == ';' && urlOffset > 5)
                {
                    string fiveCharsPrefix = html.Substring(urlOffset - 5, 5);

                    if (fiveCharsPrefix == "&#34;" 
                        || fiveCharsPrefix == "&#39;")
                    {
                        endOffset = html.IndexOf(fiveCharsPrefix, prefixEndOffset, StringComparison.Ordinal);
                    }
                }

                // Skippnig match if the quotes aren't defined
                if(endOffset < 0)
                {
                    startIndex = prefixEndOffset;
                    continue;
                }

                // Skipping html anchors 
                int hashSignIndex = html.IndexOf('#', prefixEndOffset, endOffset - prefixEndOffset);
                if (hashSignIndex > 0)
                {
                    endOffset = hashSignIndex;
                }

                result.Add(new UrlMatch
                {
                    Index = urlOffset,
                    Value = html.Substring(urlOffset, endOffset - urlOffset)
                });

                startIndex = endOffset;
            }

            return result;
        }

        internal static string ReplaceUrlPrefix(string html, string oldPrefix, string newPrefix)
        {
            foreach (string urlStartMarker in UrlStartMarkers)
            {
                html = html.Replace(urlStartMarker + oldPrefix, urlStartMarker + newPrefix);
            }

            return html;
        }


        /// <exclude />
        public static string ZipContent(string text)
        {
            if (text.IsNullOrEmpty()) return text;

            byte[] bytes = UTF8Encoding.UTF8.GetBytes(text);

            byte[] newBytes;

            using (var compressStream = new MemoryStream())
            using (var compressor = new DeflateStream(compressStream, CompressionMode.Compress))
            {
                compressor.Write(bytes, 0, bytes.Length);
                compressor.Close();
                newBytes = compressStream.ToArray();
            }

            string base64 = Convert.ToBase64String(newBytes);

            string urlFriendlyBase64 = base64.Replace("+", "_").Replace("/", ".").Replace("=", "-");
            return urlFriendlyBase64;
        }

        /// <exclude />
        public static string UnZipContent(string zippedContent)
        {
            if (zippedContent.IsNullOrEmpty()) return zippedContent;

            string base64 = zippedContent.Replace("_", "+").Replace(".", "/").Replace("-", "=");

            byte[] bytes = Convert.FromBase64String(base64);

            using (var ms = new MemoryStream(bytes))
            using (var result = new MemoryStream())
            using (var deflateStream = new DeflateStream(ms, CompressionMode.Decompress))
            {
                deflateStream.CopyTo(result);
                deflateStream.Close();

                return Encoding.UTF8.GetString(result.ToArray());                
            }
        }
    }
}
