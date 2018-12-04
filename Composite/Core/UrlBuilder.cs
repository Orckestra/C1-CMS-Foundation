using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Web;
using Composite.Core.Extensions;
using Composite.Core.Routing.Pages;


namespace Composite.Core
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class UrlBuilder
    {
        private static readonly string IncorrectValueParam = "__***IncorrectValue***__";

        private string _pathInfo;
        private string _filePath;
        private string _anchor;
        private readonly List<KeyValuePair<string, string>> _queryParameters;


        /// <exclude />
        public UrlBuilder(string url)
        {
            Verify.ArgumentNotNull(url, nameof(url));

            _queryParameters = new List<KeyValuePair<string, string>>();

            int anchorIndex = url.IndexOf('#');
            if(anchorIndex > -1)
            {
                Anchor = (anchorIndex == url.Length - 1) ? string.Empty : url.Substring(anchorIndex + 1);

                url = url.Substring(0, anchorIndex);
            }

            int questionMarkIndex = url.IndexOf('?');
            if (questionMarkIndex < 0)
            {
                ExtractPathInfo(url, url, out _filePath, out _pathInfo);
                return;
            }

            ExtractPathInfo(url, url.Substring(0, questionMarkIndex), out _filePath, out _pathInfo);

            if (questionMarkIndex + 1 == url.Length)
            {
                return;
            }

            string queryParamStr = url.Substring(questionMarkIndex + 1, url.Length - questionMarkIndex - 1);

            foreach (string queryParam in queryParamStr.Split(new[] { "&amp;", "&" }, StringSplitOptions.RemoveEmptyEntries))
            {
                string[] parts = queryParam.Split(new[] { '=' });

                bool badUrl = parts.Length != 2;
                if (!badUrl)
                {
                    string encodedKey = parts[0];
                    string encodedValue = parts[1];

                    string key = DefaultHttpEncoder.UrlDecode(encodedKey);
                    string value = DefaultHttpEncoder.UrlDecode(encodedValue);

                    badUrl = DefaultHttpEncoder.UrlEncode(key) != encodedKey.Replace("%20", "+")
                             || DefaultHttpEncoder.UrlEncode(value) != encodedValue.Replace("%20", "+");

                    if (!badUrl)
                    {
                        _queryParameters.Add(new KeyValuePair<string, string>(key, value));
                        continue;
                    }
                }

                _queryParameters.Add(new KeyValuePair<string, string>(queryParam, IncorrectValueParam));
            }
        }

        internal static class DefaultHttpEncoder
        {
            public static string UrlEncode(string urlPart)
            {
                using (new NoHttpContext())
                {
                    return HttpUtility.UrlEncode(urlPart);
                }
            }

            public static string UrlPathEncode(string urlPart)
            {
                using (new NoHttpContext())
                {
                    return HttpUtility.UrlPathEncode(urlPart);
                }
            }

            public static string UrlDecode(string urlPart)
            {
                using (new NoHttpContext())
                {
                    return HttpUtility.UrlDecode(urlPart);
                }
            }

            private class NoHttpContext : IDisposable
            {
                private readonly HttpContext _context;

                public NoHttpContext()
                {
                    _context = HttpContext.Current;
                    HttpContext.Current = null;
                }

                public void Dispose()
                {
                    HttpContext.Current = _context;
#if LeakCheck
                    GC.SuppressFinalize(this);
#endif
                }

#if LeakCheck
                private string stack = Environment.StackTrace;
                /// <exclude />
                ~NoHttpContext()
                {
                    Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
                }
#endif
            }
        }

        private static void ExtractPathInfo(string originalUrl, string relativePath, out string filePath, out string pathInfo)
        {
            // Checking if pageInfo has already been extracted by C1PageRoute. It enables backward compatibility with some modules
            var httpContext = HttpContext.Current;
            if(httpContext != null
               && httpContext.RequestIsAvaliable()
               && originalUrl == httpContext.Request.RawUrl
               && C1PageRoute.PageUrlData != null)
            {
                pathInfo = C1PageRoute.PageUrlData.PathInfo;

                int pathInfoLength = (pathInfo ?? string.Empty).Length;
                filePath = relativePath.Substring(0, relativePath.Length - pathInfoLength);
                return;
            }

            int aspxExtOffset = relativePath.IndexOf(".aspx", StringComparison.Ordinal);
            if (aspxExtOffset < 0 || aspxExtOffset == relativePath.Length - 5)
            {
                pathInfo = null;
                filePath = relativePath;
                return;
            }
            filePath = relativePath.Substring(0, aspxExtOffset + 5);
            pathInfo = relativePath.Substring(aspxExtOffset + 5);
        }



        /// <exclude />
        public override string ToString()
        {
            // NOTE: StringBuilder shouldn't be used here - it is to slow
            string queryString = QueryString;

            string result = _filePath;
            if (_pathInfo != null)
            {
                // TODO: encode symbols in path info
                result += _pathInfo;
            }

            if (queryString != string.Empty)
            {
                result += "?" + queryString;
            }

            if(_anchor != null)
            {
                result += "#" + _anchor;
            }

            return result; // _filePath + _pathInfo + "?" + queryString + ("#" + _anchor)"
        }



        /// <exclude />
        public void AddQueryParameters(NameValueCollection parameters)
        {
            foreach (string key in parameters)
            {
                this[key] = parameters[key];
            }
        }



        /// <exclude />
        public NameValueCollection GetQueryParameters()
        {
            var result = new NameValueCollection();
            foreach (KeyValuePair<string, string> pair in _queryParameters)
            {
                result.Add(pair.Key, pair.Value);
            }
            return result;
        }



        /// <exclude />
        public string this[string key]
        {
            get
            {
                string value = _queryParameters.Where(pair => pair.Key == key).Select(pair => pair.Value).FirstOrDefault();
                return value ?? string.Empty;
            }
            set
            {
                for (int i = 0; i < _queryParameters.Count; i++)
                {
                    if (_queryParameters[i].Key == key)
                    {
                        if (value == null)
                        {
                            _queryParameters.RemoveAt(i);
                        }
                        else
                        {
                            _queryParameters[i] = new KeyValuePair<string, string>(key, value);
                        }

                        return;
                    }
                }

                if (value != null)
                {
                    _queryParameters.Add(new KeyValuePair<string, string>(key, value));
                }
            }
        }


        /// <exclude />
        public string PathInfo
        {
            get
            {
                return _pathInfo ?? string.Empty;
            }
            set
            {
                _pathInfo = value;
            }
        }


        /// <exclude />
        public string FilePath
        {
            get
            {
                return _filePath;
            }
            set
            {
                Verify.ArgumentNotNull(value, "value");
                _filePath = value;
            }
        }

        /// <summary>
        /// Returns FilePath + PathInfo 
        /// </summary>
        /// <exclude />
        internal string FullPath
        {
            get
            {
                return (_filePath ?? string.Empty) + (_pathInfo ?? string.Empty);
            }
        }

        /// <exclude />
        public string RelativeFilePath
        {
            get 
            { 
                string serverUrl = ServerUrl;
                return (serverUrl == string.Empty) ? _filePath : _filePath.Substring(serverUrl.Length - 1);
            }
        }

        /// <exclude />
        public string ServerUrl
        {
            get
            {
                if (_filePath.IsNullOrEmpty())
                {
                    return string.Empty;
                }

                int index1 = _filePath.IndexOf("://", StringComparison.Ordinal);
                if (index1 <= 0 || _filePath.Length == index1 + 4)
                {
                    return string.Empty;
                }

                int index2 = _filePath.IndexOf('/', index1 + 3);
                if (index2 < 0)
                {
                    // Urls like "http://ww.composite.net"
                    return _filePath;
                }

                return _filePath.Substring(0, index2 + 1);
            }
            set
            {
                if (!ServerUrl.IsNullOrEmpty())
                {
                    throw new NotImplementedException();
                }

                if (value.IsNullOrEmpty()) return;

                Verify.IsTrue(value.EndsWith("/"), "Wrong server url string");

                if (_filePath.StartsWith("/")) _filePath = _filePath.Substring(1);

                _filePath = value + _filePath;
            }
        }


        /// <exclude />
        public string QueryString
        {
            get
            {
                if (_queryParameters.Count == 0)
                {
                    return string.Empty;
                }

                var sb = new StringBuilder();
                for (int i = 0; i < _queryParameters.Count; i++)
                {
                    if (i != 0)
                    {
                        sb.Append("&");
                    }

                    if (_queryParameters[i].Value == IncorrectValueParam)
                    {
                        sb.Append(_queryParameters[i].Key);
                    }
                    else
                    {
                        sb.Append(DefaultHttpEncoder.UrlEncode(_queryParameters[i].Key));
                        sb.Append('=');
                        sb.Append(DefaultHttpEncoder.UrlEncode(_queryParameters[i].Value));
                    }
                }

                return sb.ToString();
            }
        }


        /// <exclude />
        public static implicit operator string(UrlBuilder builder)
        {
            return builder.ToString();
        }


        /// <exclude />
        public string Anchor
        {
            get
            {
                return _anchor;
            }
            set
            {
                _anchor = value;
            }
        }
    }
}
