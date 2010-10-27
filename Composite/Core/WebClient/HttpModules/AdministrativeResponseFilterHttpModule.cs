using System;
using Composite.Core.NewIO;
using System.Text;
using System.Web;
using System.Web.UI;
using Composite.Core.Types;

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

            if (httpContext.Handler != null
                && httpContext.Handler is Page
                && httpContext.Request.Url.PathAndQuery.StartsWith(UrlUtils.AdminRootPath))
            {
                httpContext.Response.Filter = new ReplacementStream(httpContext.Response.Filter);
            }
        }

        public void Dispose()
        {
        }

        internal class ReplacementStream : System.IO.Stream
        {
            private readonly System.IO.Stream _innerStream;
            private System.IO.MemoryStream _ms = new System.IO.MemoryStream();

            public ReplacementStream(System.IO.Stream innerOuputStream)
            {
                _innerStream = innerOuputStream;
            }

            public override bool CanRead
            {
                get { return false; }
            }

            public override bool CanSeek
            {
                get { return false; }
            }

            public override bool CanWrite
            {
                get { return true; }
            }

            public override void Flush()
            {
                // DO NOTHING HERE
            }

            public override long Length
            {
                get { throw new NotImplementedException(); }
            }

            public override long Position
            {
                get { throw new NotImplementedException(); }
                set { throw new NotImplementedException(); }
            }

            public override int Read(byte[] buffer, int offset, int count)
            {
                throw new NotImplementedException();
            }

            public override long Seek(long offset, System.IO.SeekOrigin origin)
            {
                throw new NotImplementedException();
            }

            public override void SetLength(long value)
            {
                throw new NotImplementedException();
            }

            public override void Write(byte[] buffer, int offset, int count)
            {
                if (!_ms.CanWrite)
                {
                    // Reopening stream if it was empty
                    _ms = new System.IO.MemoryStream();
                }
                _ms.Write(buffer, offset, count);
            }

            public override void Close()
            {
                // Checking if the stream was already closed
                if (!_ms.CanSeek)
                {
                    return;
                }

                _ms.Seek(0, System.IO.SeekOrigin.Begin);

                var bytes = _ms.ToArray();

                string str = Encoding.UTF8.GetString(bytes);

                var sb = new StringBuilder(str);
                foreach(var kvp in ReplacementRules)
                {
                    sb.Replace(kvp.First, kvp.Second);
                }

                string newValue = sb.ToString();

                if (newValue != str)
                {
                    bytes = Encoding.UTF8.GetBytes(newValue);
                }

                _innerStream.Write(bytes, 0, bytes.Length);

                _innerStream.Close();
                _ms.Close();
            }
        }
    }
}
