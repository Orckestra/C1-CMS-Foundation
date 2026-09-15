using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.Util;
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

                    // For media URLs we need to support "/" character in a query parameter value
                    badUrl = DefaultHttpEncoder.UrlEncode(key) != encodedKey.Replace("%20", "+")
                             || DefaultHttpEncoder.UrlEncode(value) != encodedValue.Replace("%20", "+").Replace("/", "%2f");

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
            private static readonly Func<string, string> _urlPathEncodeFunc;
            private static readonly Func<string, Encoding, string> _urlDecodeFunc;
            private static readonly Func<byte[], int, int, byte[]> _urlEncodeFunc;

            static DefaultHttpEncoder()
            {
                HttpEncoder defaultHttpEncoder;
                using (new NoHttpContext())
                {
                    defaultHttpEncoder = HttpEncoder.Current;
                }

                var instanceExpression = Expression.Constant(defaultHttpEncoder);

                // Compiling: str => _defaultHttpEncoder.UrlPathEncode(str)
                {
                    var stringParam = Expression.Parameter(typeof(string));
                    var methodInfo = typeof(HttpEncoder)
                        .GetMethod("UrlPathEncode", BindingFlags.Instance | BindingFlags.NonPublic, null, new []{typeof(string)}, null);
                    Verify.IsNotNull(methodInfo, "Failed to get method 'UrlPathEncode' from " + typeof(HttpEncoder).FullName);
                    var methodCallExpression = Expression.Call(instanceExpression, methodInfo, stringParam);
                    _urlPathEncodeFunc = Expression.Lambda<Func<string, string>>(methodCallExpression, stringParam).Compile();
                }

                // Compiling: (str, encoding) => _defaultHttpEncoder.UrlDecode(str, encoding);
                {
                    var stringParam = Expression.Parameter(typeof(string));
                    var encodingParam = Expression.Parameter(typeof(Encoding));
                    var methodInfo = typeof(HttpEncoder)
                        .GetMethod("UrlDecode", BindingFlags.Instance | BindingFlags.NonPublic, null, new []{ typeof(string), typeof(Encoding) }, null);
                    Verify.IsNotNull(methodInfo, "Failed to get method 'UrlDecode' from " + typeof(HttpEncoder).FullName);

                    var methodCallExpression = Expression.Call(instanceExpression, methodInfo, stringParam, encodingParam);
                    _urlDecodeFunc = Expression.Lambda<Func<string, Encoding, string>>(
                        methodCallExpression, stringParam, encodingParam).Compile();
                }

                // Compiling: (bytes, offset, length) => _defaultHttpEncoder.UrlEncode(str, bytes, offset, length);
                {
                    var bytesParam = Expression.Parameter(typeof(byte[]));
                    var offsetParam = Expression.Parameter(typeof(int));
                    var lengthParam = Expression.Parameter(typeof(int));
                    var methodInfo = typeof(HttpEncoder)
                        .GetMethod("UrlEncode", BindingFlags.Instance | BindingFlags.NonPublic, null,
                            new[] { typeof(byte[]), typeof(int), typeof(int) }, null);
                    Verify.IsNotNull(methodInfo, "Failed to get method 'UrlDecode' from " + typeof(HttpEncoder).FullName);

                    var methodCallExpression = Expression.Call(instanceExpression, methodInfo, bytesParam, offsetParam, lengthParam);
                    _urlEncodeFunc = Expression.Lambda<Func<byte[], int, int, byte[]>>(
                        methodCallExpression, bytesParam, offsetParam, lengthParam).Compile();
                }
            }

            private static byte[] UrlEncodeToBytes(string str, Encoding e)
            {
                if (str == null)
                {
                    return null;
                }
                byte[] bytes = e.GetBytes(str);

                return _urlEncodeFunc(bytes, 0, bytes.Length);
            }


            public static string UrlEncode(string urlPart)
            {
                if (urlPart == null)
                {
                    return null;
                }

                return Encoding.ASCII.GetString(UrlEncodeToBytes(urlPart, Encoding.UTF8));
            }



            public static string UrlPathEncode(string urlPart)
            {
                return _urlPathEncodeFunc(urlPart);
            }

            public static string UrlDecode(string urlPart)
            {
                return _urlDecodeFunc(urlPart, Encoding.UTF8);
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
