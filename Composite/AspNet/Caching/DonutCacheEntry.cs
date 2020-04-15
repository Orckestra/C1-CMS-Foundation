using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Caching;
using System.Xml.Linq;

namespace Composite.AspNet.Caching
{
    [Serializable]
    internal class DonutCacheEntry
    {
        private XDocument _document;

        public DonutCacheEntry()
        {
        }

        public DonutCacheEntry(HttpContext context, XDocument document)
        {
            Document = new XDocument(document);

            var headers = context.Response.Headers;

            var headersCopy = new List<HeaderElement>(headers.Count);
            foreach (var name in headers.AllKeys)
            {
                headersCopy.Add(new HeaderElement(name, headers[name]));
            }

            OutputHeaders = headersCopy;
        }

        public XDocument Document
        {
            get => new XDocument(_document);
            set => _document = value;
        }

        public IReadOnlyCollection<HeaderElement> OutputHeaders { get; set; }
    }
}
