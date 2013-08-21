using System;
using System.IO;
using System.Text;
using System.Web;
using System.Web.UI;
using Composite.Core.Types;
using System.Web.WebPages;


namespace Composite.Core.WebClient.HttpModules
{
    internal class AdministrativeResponseFilterHttpModule : IHttpModule
    {
        private static readonly Pair<string, string>[] ReplacementRules = new []
       {
           new Pair<string, string>(@" xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance""", @""), 
           new Pair<string, string>(@" xmlns:xsd=""http://www.w3.org/2001/XMLSchema""", @""),
           new Pair<string, string>(@"xmlns:ui=""http://www.composite.net/ns/ui/1.0""", @"xmlns:ui=""http://www.w3.org/1999/xhtml""")
        };

        public void Init(HttpApplication context)
        {
            context.PostMapRequestHandler += AttachFilter;
        }

        private static void AttachFilter(object sender, EventArgs e)
        {
            var httpContext = HttpContext.Current;

            if (
                (httpContext.Handler is Page || httpContext.Handler is WebPageHttpHandler)
                && UrlUtils.IsAdminConsoleRequest(httpContext))
            {
                httpContext.Response.Filter = new ReplacementStream(httpContext.Response.Filter);
            }
        }

        public void Dispose()
        {
        }

        internal class ReplacementStream : Utf8StringTransformationStream
        {
            public ReplacementStream(Stream innerStream) : base(innerStream) {}

            public override string Process(string str)
            {
                var sb = new StringBuilder(str);

                foreach(var kvp in ReplacementRules)
                {
                    sb.Replace(kvp.First, kvp.Second);
                }

                return sb.ToString();
            }
        }
    }
}
