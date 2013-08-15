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
    /// <summary>
    /// Handles requests to XML Sitemaps: */sitemap.xml
    /// </summary>
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

                _writer = XmlWriter.Create(ms, new XmlWriterSettings {Encoding = Encoding.UTF8, Indent = true});

                _writer.WriteStartDocument();

                if (IsRootRequest())
                {
                    var rootNodes = ((CompositeC1SiteMapProvider) provider).GetRootNodes().ToList();

                    if (rootNodes.Count > 1)
                    {
                        WriteSiteMapList(rootNodes);
                    }
                    else
                    {
                        var rootNode = rootNodes.FirstOrDefault();

                        if (rootNode != null)
                        {
                            Thread.CurrentThread.CurrentCulture = rootNode.Culture;
                            WriteFullSiteMap(provider);
                        }
                    }
                }
                else
                {
                    IPage rootPage = ExtractRootPageFromSiteMapUrl(context.Request.RawUrl);

                    if(rootPage == null)
                    {
                        Write404();
                        return;
                    }

                    using(new SiteMapContext(rootPage))
                    {
                        WriteFullSiteMap(provider);
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

        private IPage ExtractRootPageFromSiteMapUrl(string relativeUrl)
        {
            Verify.That(relativeUrl.StartsWith(UrlUtils.PublicRootPath, StringComparison.OrdinalIgnoreCase), "Incorrect url prefix");


            string[] requestParts = relativeUrl.Substring(UrlUtils.PublicRootPath.Length)
                                               .Split(new[] {'/'}, StringSplitOptions.RemoveEmptyEntries);
            
            Verify.That(requestParts.Length > 0, "error parsing url");
            string languageCode = requestParts[0];

            string urlTitle = requestParts.Length > 2 ? requestParts[1] : string.Empty;
            
            CultureInfo culture = GetActiveCulture(languageCode);
            if(culture == null)
            {
                return null;
            }


            using(new DataScope(PublicationScope.Published, culture))
            {
                foreach(Guid rootPageId in PageManager.GetChildrenIDs(Guid.Empty))
                {
                    var page = PageManager.GetPageById(rootPageId);
                    if (page == null) continue;
                    
                    if(string.Equals(urlTitle, page.UrlTitle, StringComparison.OrdinalIgnoreCase))
                    {
                        return page;
                    }
                }
            }
            return null;
        }

        private void Write404()
        {
            _context.Response.Clear();
            _context.Response.StatusCode = 404;
        }

        private CultureInfo GetActiveCulture(string languageCode)
        {
            foreach (var culture in DataLocalizationFacade.ActiveLocalizationCultures)
            {
                if (culture.Name.Equals(languageCode, StringComparison.OrdinalIgnoreCase))
                {
                    return culture;
                }
            }

            return null;
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

            List<IHostnameBinding> bindings;

            using (var data = new DataConnection())
            {
                bindings = data.Get<IHostnameBinding>().ToList();
            }

            foreach (var node in rootNodes)
            {
                string urlTitle = null;

                using(new DataScope(PublicationScope.Published, node.Culture))
                {
                    IPage page = PageManager.GetPageById(node.PageNode.Id);
                    if(page != null)
                    {
                        urlTitle = page.UrlTitle;
                    }
                }

                IHostnameBinding binding = FindMatchingBinding(node, bindings);

                _writer.WriteStartElement("sitemap");

                var uri = _context.Request.Url;

                _writer.WriteStartElement("loc");

                string hostnameUrl;

                if (binding == null || MatchHostname(binding))
                {
                    hostnameUrl = "{0}://{1}{2}".FormatWith(
                        uri.Scheme,
                        uri.Host,
                        uri.IsDefaultPort ? string.Empty : ":" + uri.Port);
                }
                else
                {
                    hostnameUrl = "http://" + binding.Hostname;
                }

                _writer.WriteString(hostnameUrl + "{0}/{1}{2}/sitemap.xml".FormatWith(
                                    UrlUtils.PublicRootPath,
                                    node.Culture,
                                    urlTitle.IsNullOrEmpty() ? string.Empty : "/" + urlTitle));
                _writer.WriteEndElement();

                _writer.WriteEndElement();
            }

            _writer.WriteEndElement();
        }

        private IHostnameBinding FindMatchingBinding(CompositeC1SiteMapNode sitemapNode, List<IHostnameBinding> bindings)
        {
            Guid homePageId = Guid.Parse(sitemapNode.Key);
            string cultureName = sitemapNode.Culture.Name;

            var bestMatch = bindings.SingleOrDefault(h => h.HomePageId == homePageId && h.Culture == cultureName);
            if (bestMatch != null)
            {
                return bestMatch;
            }

            string defaultCulture = DataLocalizationFacade.DefaultLocalizationCulture.Name;
            var secondBestMatch = bindings.SingleOrDefault(h => h.HomePageId == homePageId && h.Culture == defaultCulture);
            if (secondBestMatch != null)
            {
                return secondBestMatch;
            }

            return  bindings.OrderBy(b => b.Hostname).FirstOrDefault(h => h.HomePageId == homePageId);
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
