using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Xml;
using System.Xml.Linq;
using System.Xml.XPath;
using Composite.Functions;
using Composite.Core.Logging;
using Composite.Plugins.Functions.XslExtensionsProviders.ConfigBasedXslExtensionsProvider;
using Composite.Core.Extensions;
using Composite.Core.Xml;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.Functions.XslExtensionsProviders
{
    [ConfigurationElementType(typeof(ConfigBasedXslExtensionInfo))]
	internal class StandardExtension
	{
	    public static readonly string XmlNamespace = "http://c1.composite.net/StandardFunctions";

        private static readonly string EmailAddressRegex =
            @"^([a-zA-Z0-9_\-\+\.]+)@((\[[0-9]{1,3}" +
            @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
            @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";

        private static readonly Regex _emailValidationRegex = new Regex(EmailAddressRegex);

        public object CacheFunctionCall(XPathNodeIterator nodeIterator, string cacheKey, int expirationInSeconds)
        {
            Verify.ArgumentNotNullOrEmpty(cacheKey, "cacheKey");

            var cache = HttpRuntime.Cache;

            object value = cache[cacheKey];
            if (value == null)
            {
                value = CallFunction(nodeIterator);

                cache.Add(cacheKey, value, null,
                          DateTime.Now.AddSeconds(expirationInSeconds),
                          TimeSpan.Zero,
                          System.Web.Caching.CacheItemPriority.Default,
                          null);
            }

            return value;
        }

        public object CallFunction(XPathNodeIterator nodeIterator)
        {
            Verify.ArgumentNotNull(nodeIterator, "nodeIterator");

            if (!nodeIterator.MoveNext())
            {
                return string.Empty;
            }

            XPathNavigator navigator = nodeIterator.Current;

            XElement functionNode = GetXElement(navigator);

            if (functionNode == null)
            {
                LoggingService.LogWarning("StandardXslExtendion", "Failed to get a function definition.");
                return string.Empty;
            }


            BaseRuntimeTreeNode runtimeTreeNode = FunctionTreeBuilder.Build(functionNode);

            object result = runtimeTreeNode.GetValue(new FunctionContextContainer());

            if (result is XElement)
            {
                return (result as XElement).CreateNavigator();
            }

            if (result is IEnumerable<XElement>)
            {
                return new FunctionResultNodeIterator(result as IEnumerable<XElement>);
            }

            if(result is XhtmlDocument)
            {
                return (result as XhtmlDocument).Root.CreateNavigator();
            }

            return result;
        }

        /// <summary>
        /// Checks whether an email address is valid.
        /// </summary>
        /// <param name="email">The email address.</param>
        /// <returns></returns>
        public bool IsEmailValid(string email)
        {
            if (email.IsNullOrEmpty())
            {
                return false;
            }
            return _emailValidationRegex.IsMatch(email.Trim());
        }
 
        /// <summary>
        /// Checks whether an email list  is valid.
        /// </summary>
        /// <param name="emailList">The email list.</param>
        /// <returns></returns>
        public bool IsEmailListValid(string emailList)
        {
            var emails = emailList.Split(new[] {',', ';'});
            return !emails.Any(email => !IsEmailValid(email.Trim()));
        }

        /// <summary>
        /// Gets an http form post value.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <returns></returns>
        public string GetFormData(string key)
        {
            var httpContext = HttpContext.Current;
            if (httpContext == null
                || httpContext.Request == null
                || httpContext.Request.Form == null)
            {
                return string.Empty;
            }

            return httpContext.Request.Form[key] ?? string.Empty;
        }

        /// <summary>
        /// Gets a query string parameter value.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <returns></returns>
        public string GetQueryStringValue(string key)
        {
            var httpContext = HttpContext.Current;
            if (httpContext == null
                || httpContext.Request == null
                || httpContext.Request.QueryString == null)
            {
                return string.Empty;
            }
            return httpContext.Request.QueryString[key] ?? string.Empty;
        }

        /// <summary>
        /// Gets a cookie's value.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <returns></returns>
        public string GetCookieValue(string key)
        {
            var httpContext = HttpContext.Current;
            if (httpContext == null
                || httpContext.Request == null
                || httpContext.Request.Cookies == null)
            {
                return string.Empty;
            }

            var cookie = httpContext.Request.Cookies[key];
            return cookie != null ? cookie.Value : string.Empty;
        }


        protected static XElement GetXElement(XPathNavigator navigator)
        {
            XDocument xDoc = new XDocument();

            using (XmlWriter xmlWriter = xDoc.CreateWriter())

                navigator.WriteSubtree(xmlWriter);

            return xDoc.Root;
        }

	    protected static XElement GetXElement(XmlNode node)
        {
            XDocument xDoc = new XDocument();

            using (XmlWriter xmlWriter = xDoc.CreateWriter())

                node.WriteTo(xmlWriter);

            return xDoc.Root;
        }

        protected static XmlNode GetXmlNode(XElement element)
        {

            using (XmlReader xmlReader = element.CreateReader())
            {

                XmlDocument xmlDoc = new XmlDocument();

                xmlDoc.Load(xmlReader);

                return xmlDoc;
            }
        }

        #region Nested classes

        internal class FunctionResultNodeIterator: XPathNodeIterator
        {
            private readonly IEnumerable<XElement> _innerEnumerable;
            private readonly IEnumerator<XElement> _iterator;
            private int _position;

            public FunctionResultNodeIterator(IEnumerable<XElement> innerEnumerable)
            {
                _innerEnumerable = innerEnumerable;
                _iterator = innerEnumerable.GetEnumerator();
            }

            public override XPathNodeIterator Clone()
            {
                return new FunctionResultNodeIterator(_innerEnumerable);
            }

            public override XPathNavigator Current
            {
                get { return GetXmlNode(_iterator.Current).CreateNavigator(); }
            }

            public override int CurrentPosition
            {
                get { return _position; }
            }

            public override bool MoveNext()
            {
                bool result = _iterator.MoveNext();
                if(result)
                {
                    _position++;
                }
                return result;
            }
        }

        #endregion
    }
}
