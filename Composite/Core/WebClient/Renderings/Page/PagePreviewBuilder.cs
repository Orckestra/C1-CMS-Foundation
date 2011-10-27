using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Hosting;
using Composite.Data.Types;
using System.Web.Caching;
using Composite.C1Console.Security;
using System.Web.SessionState;
using System.Reflection;

namespace Composite.Core.WebClient.Renderings.Page
{
    /// <summary>
    /// Allow previewing a page 'in mem' in a simulated GET request. Limited information is passed from original client to this request when 
    /// running in 'classic mode'. In pipeline mode the original context is available for the preview rendering.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public class PagePreviewBuilder
    {
        /// <summary>
        /// Execute an 'im mem' preview request of the provided page and content. The execution depends on the hosting environment.
        /// Then running in pipeline mode the current HttpContext is 
        /// </summary>
        /// <param name="selectedPage">Page to render. Functionality reading the rendered page ID will get the ID from this object.</param>
        /// <param name="contents">Content to render on the page</param>
        /// <returns>The page html as a string when running in classic mode. In Pipeline mode the content is written directly to the HttpContext and an empty string is returned.</returns>
        public static string RenderPreview(IPage selectedPage, IList<IPagePlaceholderContent> contents)
        {
            HttpContext ctx = HttpContext.Current;
            string key = string.Format("{0}/{1}/{2}", UserValidationFacade.GetUsername(), DateTime.Now.Ticks.ToString(), selectedPage.Id);
            string query = string.Format("previewKey={0}", key);

            ctx.Cache.Add(key + "_SelectedPage", selectedPage, null, Cache.NoAbsoluteExpiration, new TimeSpan(0, 20, 0), CacheItemPriority.NotRemovable, null);
            ctx.Cache.Add(key + "_SelectedContents", contents, null, Cache.NoAbsoluteExpiration, new TimeSpan(0, 20, 0), CacheItemPriority.NotRemovable, null);

            if (HttpRuntime.UsingIntegratedPipeline)
            {
                ctx.Server.TransferRequest("~/Renderers/Page.aspx?"+ query, false, "GET", null);

            }
            else
            {
                var sb = new StringBuilder();
                var writer = new StringWriter(sb);

                var wr = new PreviewWorkerRequest(query, ctx, writer);

                AllowChildRequestSessionAccess(ctx);
                HttpRuntime.ProcessRequest(wr);

                return sb.ToString();
            }

            return String.Empty;
        }


        /// <summary>
        /// sigh - this fixes a fucked up issue, where previewing pages containing code writing to Session, 
        /// will breake all subsequent page previews regardless of content. Should you obtain the wisdom as
        /// to what exactly is the trick here, I'd love to now. I will leave it as "well, this fix the issue 
        /// and pass testing. Hurray for Harry Potter and magic!". Oh how I loathe doing that :(
        /// </summary>
        /// <param name="ctx">the Http context that will be shared between master and child process</param>
        private static void AllowChildRequestSessionAccess(HttpContext ctx)
        {
            SessionIDManager manager = new SessionIDManager();
            string oldId = manager.GetSessionID(ctx);
            string newId = manager.CreateSessionID(ctx);
            bool isAdd = false, isRedir = false;

            manager.SaveSessionID(ctx, newId, out isRedir, out isAdd);
            HttpApplication ctx2 = (HttpApplication)HttpContext.Current.ApplicationInstance;
            HttpModuleCollection mods = ctx2.Modules;
            SessionStateModule ssm = (SessionStateModule)mods.Get("Session");
            System.Reflection.FieldInfo[] fields = ssm.GetType().GetFields(BindingFlags.NonPublic | BindingFlags.Instance);
            SessionStateStoreProviderBase store = null;
            System.Reflection.FieldInfo rqIdField = null, rqLockIdField = null, rqStateNotFoundField = null;
            foreach (System.Reflection.FieldInfo field in fields)
            {
                if (field.Name.Equals("_store")) store = (SessionStateStoreProviderBase)field.GetValue(ssm);
                if (field.Name.Equals("_rqId")) rqIdField = field;
                if (field.Name.Equals("_rqLockId")) rqLockIdField = field;
                if (field.Name.Equals("_rqSessionStateNotFound")) rqStateNotFoundField = field;
            }
            object lockId = rqLockIdField.GetValue(ssm);
            if ((lockId != null) && (oldId != null)) store.ReleaseItemExclusive(ctx, oldId, lockId);
            rqStateNotFoundField.SetValue(ssm, true);
            rqIdField.SetValue(ssm, newId);
        }

        private class PreviewWorkerRequest : SimpleWorkerRequest
        {
            private string _callingUA;
            private string _cookie;
            private TextWriter _outputTextWriter;

            public PreviewWorkerRequest(string query, HttpContext callerContext, TextWriter output)
                : base(@"Renderers\Page.aspx", query, output)
            {
                _callingUA = callerContext.Request.Headers["User-Agent"];
                _cookie = callerContext.Request.Headers["Cookie"];
                _outputTextWriter = output;
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

            public override void SendResponseFromMemory(byte[] data, int length)
            {
                _outputTextWriter.Write(Encoding.UTF8.GetString(data,0, length));
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
