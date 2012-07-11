using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Web;
using System.Xml;
using Composite.Core.Extensions;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.AspNet
{
    public class SiteMapHandler : IHttpHandler
    {
        private const string _ns = "http://www.sitemaps.org/schemas/sitemap/0.9";

        private HttpContext _context;
        private XmlWriter _writer;

        bool IHttpHandler.IsReusable
        {
            get { return false; }
        }

        void IHttpHandler.ProcessRequest(HttpContext context)
        {
            _context = context;

            string content;

            using (var ms = new MemoryStream())
            {
                var provider = SiteMap.Provider;

                _writer = XmlWriter.Create(ms, new XmlWriterSettings() {Encoding = Encoding.UTF8, Indent = true});

                _writer.WriteStartDocument();

                if (IsRootRequest())
                {
                    var rootNodes = ((CompositeC1SiteMapProvider) provider).GetRootNodes();
                    var rootNodesFiltered = FilterOutOtherDomains(rootNodes).ToList();

                    if (rootNodesFiltered.Count > 1)
                    {
                        WriteSiteMapList(rootNodesFiltered);
                    }
                    else
                    {
                        WriteFullSiteMap(provider);
                    }
                }
                else
                {
                    CultureInfo requestCulture = Thread.CurrentThread.CurrentCulture;

                    try
                    {
                        Thread.CurrentThread.CurrentCulture = ExtractCultureFromSiteMapUrl(context.Request.RawUrl);

                        WriteFullSiteMap(provider);
                    }
                    finally
                    {
                        Thread.CurrentThread.CurrentCulture = requestCulture;
                    }
                }

                _writer.WriteEndDocument();

                _writer.Flush();

                content = Encoding.UTF8.GetString(ms.ToArray());
            }

            _context.Response.Clear();

            _context.Response.ContentType = "text/xml";
            _context.Response.ContentEncoding = Encoding.UTF8;

            _context.Response.Write(content);
        }

        private CultureInfo ExtractCultureFromSiteMapUrl(string relativeUrl)
        {
            Verify.That(relativeUrl.StartsWith(UrlUtils.PublicRootPath, StringComparison.OrdinalIgnoreCase), "Incorrect url prefix");

            string[] requestParts = relativeUrl.Substring(UrlUtils.PublicRootPath.Length)
                                               .Split(new[] {'/'}, StringSplitOptions.RemoveEmptyEntries);
            
            Verify.That(requestParts.Length > 0, "error parsing url");
            string languageCode = requestParts[0];

            foreach(var culture in DataLocalizationFacade.ActiveLocalizationCultures)
            {
                if(culture.Name.Equals(languageCode, StringComparison.OrdinalIgnoreCase))
                {
                    return culture;
                }
            }

            return Thread.CurrentThread.CurrentCulture;
        }

        private IEnumerable<CompositeC1SiteMapNode> FilterOutOtherDomains(IEnumerable<CompositeC1SiteMapNode> rootNodes)
        {
            List<IHostnameBinding> bindings;

            using (var data = new DataConnection())
            {
                bindings = data.Get<IHostnameBinding>().ToList();
            }

            foreach (var node in rootNodes)
            {
                var hostname = bindings.SingleOrDefault(h => h.HomePageId == Guid.Parse(node.Key) && h.Culture == node.Culture.Name);
                if (hostname == null || MatchHostname(hostname))
                {
                    yield return node;
                }
            }
        }

        private bool MatchHostname(IHostnameBinding binding)
        {
            var host = _context.Request.Url.Host;

            if (binding.Hostname == host)
            {
                return true;
            }

            return binding.Aliases
                          .Split(new[] {Environment.NewLine}, StringSplitOptions.RemoveEmptyEntries)
                          .Any(alias => alias == host);
        }

        private void WriteSiteMapList(IEnumerable<CompositeC1SiteMapNode> rootNodes)
        {
            _writer.WriteStartElement("sitemapindex", _ns);

            foreach (var node in rootNodes)
            {
                _writer.WriteStartElement("sitemap");

                _writer.WriteStartElement("loc");
                _writer.WriteString("{0}://{1}{2}/{3}/sitemap.xml".FormatWith(
                                    _context.Request.Url.Scheme,
                                    UrlUtils.PublicRootPath,
                                    _context.Request.Url.Host, 
                                    node.Culture));
                _writer.WriteEndElement();

                _writer.WriteEndElement();
            }

            _writer.WriteEndElement();
        }

        private void WriteFullSiteMap(SiteMapProvider provider)
        {
            _writer.WriteStartElement("urlset", _ns);

            WriteElement(provider.RootNode);

            _writer.WriteEndElement();
        }

        private bool IsRootRequest()
        {
            string url = _context.Request.RawUrl;

            return string.Equals(url, UrlUtils.PublicRootPath + "/sitemap.xml", StringComparison.OrdinalIgnoreCase);
        }

        private void WriteElement(SiteMapNode node)
        {
            _writer.WriteStartElement("url");

            _writer.WriteStartElement("loc");
            _writer.WriteString(String.Format("{0}://{1}{2}", _context.Request.Url.Scheme, _context.Request.Url.Host, node.Url));
            _writer.WriteEndElement();

            var baseNode = node as CompositeC1SiteMapNode;
            if (baseNode != null)
            {
                var lastEdited = baseNode.LastModified;
                _writer.WriteStartElement("lastmod");
                _writer.WriteString(lastEdited.ToUniversalTime().ToString("u").Replace(" ", "T"));
                _writer.WriteEndElement();

                var changeFrequency = baseNode.ChangeFrequency;
                if (changeFrequency.HasValue)
                {
                    _writer.WriteStartElement("changefreq");
                    _writer.WriteString(changeFrequency.Value.ToString().ToLowerInvariant());
                    _writer.WriteEndElement();
                }

                var priority = baseNode.Priority;
                if (priority.HasValue)
                {
                    if (priority > 1 && priority < 10)
                    {
                        _writer.WriteStartElement("priority");
                        _writer.WriteString(((decimal) priority.Value/10).ToString("0.0", CultureInfo.InvariantCulture));
                        _writer.WriteEndElement();
                    }
                }
            }

            _writer.WriteEndElement();

            foreach (SiteMapNode child in node.ChildNodes)
            {
                WriteElement(child);
            }
        }
    }
}
