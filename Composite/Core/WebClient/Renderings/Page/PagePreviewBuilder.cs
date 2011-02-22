using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Hosting;
using Composite.Data.Types;

namespace Composite.Core.WebClient.Renderings.Page
{
    /// <summary>
    /// Allow previewing a page 'in mem' in a simulated GET request. Limited information is passed from original client to this request.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public class PagePreviewBuilder
    {
        public static string RenderPreview(IPage selectedPage, List<IPagePlaceholderContent> contents)
        {
            var ctx = HttpContext.Current;
            var sb = new StringBuilder();

            var response = ctx.Response;
            response.Filter = new FixLinksFilter(response.Filter);

            HttpRuntime.ProcessRequest(new PreviewWorkerRequest(selectedPage, contents, ctx, sb));
            return sb.ToString();
        }


        private class PreviewWorkerRequest : SimpleWorkerRequest
        {
            private string _callingUA;
            private string _cookie;
            private IPage _page;
            private IList<IPagePlaceholderContent> _contents;

            public PreviewWorkerRequest(IPage page, IList<IPagePlaceholderContent> contents, HttpContext callerContext, StringBuilder output)
                : base(@"Renderers\Page.aspx", String.Empty, new StringWriter(output))
            {
                _page = page;
                _contents = contents;
                _callingUA = callerContext.Request.Headers["User-Agent"];
                _cookie = callerContext.Request.Headers["Cookie"];
            }

            public override string GetFilePath()
            {
                var itms = HttpContext.Current.Items;

                itms.Add("SelectedPage", _page);
                itms.Add("SelectedContents", _contents);

                return base.GetFilePath();
            }

            public override string GetKnownRequestHeader(int index)
            {
                if (index == HttpWorkerRequest.HeaderUserAgent)
                {
                    return _callingUA;
                }

                if (index == HttpWorkerRequest.HeaderCookie)
                {
                    return _cookie;
                }

                return base.GetKnownRequestHeader(index);
            }
        }



        private class FixLinksFilter : System.IO.Stream
        {
            private readonly System.IO.Stream _innerStream;
            private System.IO.MemoryStream _ms = new System.IO.MemoryStream();

            public FixLinksFilter(System.IO.Stream innerOuputStream)
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
                get
                {
                    throw new NotImplementedException();
                }
                set
                {
                    throw new NotImplementedException();
                }
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

                string html = Encoding.UTF8.GetString(bytes);

                string newHtml = PageUrlHelper.ChangeRenderingPageUrlsToPublic(html);

                if (html != newHtml)
                {
                    bytes = Encoding.UTF8.GetBytes(newHtml);
                }

                _innerStream.Write(bytes, 0, bytes.Length);

                _innerStream.Close();
                _ms.Close();
            }
        }

    }
}
