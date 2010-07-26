using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Web;

using Composite.StringExtensions;

namespace Composite.WebClient
{
    public sealed class UrlString
    {
        private static readonly string IncorrectValueParam = "__***IncorrectValue***__";

        private string _pathInfo;
        private string _filePath;
        private List<KeyValuePair<string, string>> _queryParameters;

        public UrlString(string url)
        {
            _queryParameters = new List<KeyValuePair<string, string>>();

            int questionMarkIndex = url.IndexOf("?");
            if (questionMarkIndex < 0)
            {
                ExtractPathInfo(url, out _filePath, out _pathInfo);
                return;
            }

            ExtractPathInfo(url.Substring(0, questionMarkIndex), out _filePath, out _pathInfo);

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

                    string key = HttpUtility.UrlDecode(encodedKey);
                    string value = HttpUtility.UrlDecode(encodedValue);

                    badUrl = HttpUtility.UrlEncode(key) != encodedKey
                             || HttpUtility.UrlEncode(value) != encodedValue;

                    if (!badUrl)
                    {
                        _queryParameters.Add(new KeyValuePair<string, string>(key, value));
                        continue;
                    }
                }

                _queryParameters.Add(new KeyValuePair<string, string>(queryParam, IncorrectValueParam));
            }
        }

        private void ExtractPathInfo(string relativePath, out string filePath, out string pathInfo)
        {
            int aspxExtOffset = relativePath.IndexOf(".aspx");
            if (aspxExtOffset < 0 || aspxExtOffset == relativePath.Length - 5)
            {
                pathInfo = null;
                filePath = relativePath;
                return;
            }
            filePath = relativePath.Substring(0, aspxExtOffset + 5);
            pathInfo = relativePath.Substring(aspxExtOffset + 5);
        }

        public override string ToString()
        {
            // NOTE: StringBuilder shouldn't be used - it is to slow
            string queryString = QueryString;

            string result = _filePath;
            if (_pathInfo != null)
            {
                result += _pathInfo;
            }

            if (queryString != string.Empty)
            {
                result += "?" + queryString;
            }

            return result; // _filePath + _pathInfo + "?" + queryString
        }

        public void AddQueryParameters(NameValueCollection parameters)
        {
            foreach (string key in parameters)
            {
                this[key] = parameters[key];
            }
        }

        public NameValueCollection GetQueryParameters()
        {
            var result = new NameValueCollection();
            foreach (KeyValuePair<string, string> pair in _queryParameters)
            {
                result.Add(pair.Key, pair.Value);
            }
            return result;
        }

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

        public string ServerUrl
        {
            get
            {
                if (_filePath.IsNullOrEmpty())
                {
                    return string.Empty;
                }

                int index1 = _filePath.IndexOf("://");
                if (index1 <= 0 || _filePath.Length == index1 + 4)
                {
                    return string.Empty;
                }

                int index2 = _filePath.IndexOf("/", index1 + 3);
                if (index2 < 0)
                {
                    return string.Empty;
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
                        sb.Append(HttpUtility.UrlEncode(_queryParameters[i].Key));
                        sb.Append('=');
                        sb.Append(HttpUtility.UrlEncode(_queryParameters[i].Value));
                    }
                }

                return sb.ToString();
            }
        }
    }
}
