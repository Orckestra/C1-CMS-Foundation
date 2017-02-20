using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.Linq;
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
        private const string SiteMapNamespace = "http://www.sitemaps.org/schemas/sitemap/0.9";

        private Uri _requestUrl;

        bool IHttpHandler.IsReusable => false;

        void IHttpHandler.ProcessRequest(HttpContext context)
        {
            _requestUrl = context.Request.Url;

            context.Response.ContentType = "text/xml";
            context.Response.ContentEncoding = Encoding.UTF8;

            var provider = SiteMap.Provider;

            var writer = XmlWriter.Create(context.Response.OutputStream, 
                new XmlWriterSettings {Encoding = Encoding.UTF8, Indent = true});

            writer.WriteStartDocument();

            if (IsRootRequest(context.Request.RawUrl))
            {
                var rootNodes = ((CmsPageSiteMapProvider) provider).GetRootNodes();

                if (rootNodes.Count > 1)
                {
                    WriteSiteMapList(writer, rootNodes);
                }
                else
                {
                    var rootNode = rootNodes.FirstOrDefault();

                    if (rootNode != null)
                    {
                        using (new DataScope(rootNode.Culture))
                        {
                            WriteFullSiteMap(writer, provider);
                        }
                    }
                }
            }
            else
            {
                IPage rootPage = ExtractRootPageFromSiteMapUrl(context.Request.RawUrl);

                if(rootPage == null)
                {
                    Write404(context.Response);
                    return;
                }

                using(new SiteMapContext(rootPage))
                {
                    WriteFullSiteMap(writer, provider);
                }
            }

            writer.WriteEndDocument();

            writer.Flush();
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

        private void Write404(HttpResponse response)
        {
            response.Clear();
            response.StatusCode = 404;
        }

        private CultureInfo GetActiveCulture(string languageCode)
        {
            return DataLocalizationFacade.ActiveLocalizationCultures
                .FirstOrDefault(culture => culture.Name.Equals(languageCode, StringComparison.OrdinalIgnoreCase));
        }


        private bool MatchHostname(IHostnameBinding binding)
        {
            var host = _requestUrl.Host;

            if (binding.Hostname == host)
            {
                return true;
            }

            return binding.Aliases
                          .Split(new[] {Environment.NewLine}, StringSplitOptions.RemoveEmptyEntries)
                          .Any(alias => alias == host);
        }

        private void WriteSiteMapList(XmlWriter writer, IEnumerable<CmsPageSiteMapNode> rootNodes)
        {
            writer.WriteStartElement("sitemapindex", SiteMapNamespace);

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
                    IPage page = PageManager.GetPageById(node.Page.Id);
                    if(page != null)
                    {
                        urlTitle = page.UrlTitle;
                    }
                }

                IHostnameBinding binding = FindMatchingBinding(node, bindings);

                writer.WriteStartElement("sitemap");

                writer.WriteStartElement("loc");

                string hostnameUrl;

                if (binding == null || MatchHostname(binding))
                {
                    hostnameUrl = "{0}://{1}{2}".FormatWith(
                        _requestUrl.Scheme,
                        _requestUrl.Host,
                        _requestUrl.IsDefaultPort ? string.Empty : ":" + _requestUrl.Port);
                }
                else
                {
                    hostnameUrl = "http://" + binding.Hostname;
                }

                writer.WriteString(hostnameUrl + "{0}/{1}{2}/sitemap.xml".FormatWith(
                                    UrlUtils.PublicRootPath,
                                    node.Culture,
                                    urlTitle.IsNullOrEmpty() ? string.Empty : "/" + urlTitle));
                writer.WriteEndElement();

                writer.WriteEndElement();
            }

            writer.WriteEndElement();
        }

        private IHostnameBinding FindMatchingBinding(CmsPageSiteMapNode sitemapNode, List<IHostnameBinding> bindings)
        {
            Guid homePageId = Guid.Parse(sitemapNode.Key);
            string cultureName = sitemapNode.Culture.Name;

            var bestMatch = FindMatch(bindings, homePageId, cultureName);
            if (bestMatch != null)
            {
                return bestMatch;
            }

            string defaultCulture = DataLocalizationFacade.DefaultLocalizationCulture.Name;
            var secondBestMatch = FindMatch(bindings, homePageId, defaultCulture);
            if (secondBestMatch != null)
            {
                return secondBestMatch;
            }

            return  bindings.OrderBy(b => b.Hostname).FirstOrDefault(h => h.HomePageId == homePageId);
        }

        private IHostnameBinding FindMatch(IEnumerable<IHostnameBinding> bindings, Guid homePageId, string cultureName)
        {
            return bindings.Where(h => h.HomePageId == homePageId && h.Culture == cultureName)
                .SingleOrDefaultOrException("There are multiple hostname bindings refering to the same home page id '{0}' and the same culture '{1}'",
                    homePageId, cultureName);
        }

        private void WriteFullSiteMap(XmlWriter writer, SiteMapProvider provider)
        {
            writer.WriteStartElement("urlset", SiteMapNamespace);

            WriteElement(writer, provider.RootNode, new HashSet<string>());

            writer.WriteEndElement();
        }

        private bool IsRootRequest(string relativeUrl)
        {
            return string.Equals(relativeUrl, UrlUtils.PublicRootPath + "/sitemap.xml", StringComparison.OrdinalIgnoreCase);
        }

        private void WriteElement(XmlWriter writer, SiteMapNode node, HashSet<string> alreadyVisitedNodes)
        {
            if (alreadyVisitedNodes.Contains(node.Key))
            {
                Log.LogError(nameof(SiteMapHandler), $"Loop in sitemap nodes detected. Node key: '{node.Key}'");
                return;
            }
            alreadyVisitedNodes.Add(node.Key);

            writer.WriteStartElement("url");

            writer.WriteStartElement("loc");
            writer.WriteString($"{_requestUrl.Scheme}://{_requestUrl.Host}{node.Url}");
            writer.WriteEndElement();

            var baseNode = node as CmsPageSiteMapNode;
            if (baseNode != null)
            {
                var lastEdited = baseNode.LastModified;
                writer.WriteStartElement("lastmod");
                writer.WriteString(lastEdited.ToUniversalTime().ToString("u").Replace(" ", "T"));
                writer.WriteEndElement();

                var changeFrequency = baseNode.ChangeFrequency;
                if (changeFrequency.HasValue)
                {
                    writer.WriteStartElement("changefreq");
                    writer.WriteString(changeFrequency.Value.ToString().ToLowerInvariant());
                    writer.WriteEndElement();
                }

                var priority = baseNode.Priority;
                if (priority.HasValue)
                {
                    if (priority > 1 && priority < 10)
                    {
                        writer.WriteStartElement("priority");
                        writer.WriteString(((decimal) priority.Value/10).ToString("0.0", CultureInfo.InvariantCulture));
                        writer.WriteEndElement();
                    }
                }
            }

            writer.WriteEndElement();

            foreach (SiteMapNode child in node.ChildNodes)
            {
                WriteElement(writer, child, alreadyVisitedNodes);
            }
        }
    }
}
