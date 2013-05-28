using System;
using System.IO;
using System.Text;
using System.Web;

namespace Composite.Core.WebClient.HttpModules
{
    internal abstract class Utf8StringTransformationStream : Stream
    {
        private readonly Stream _innerStream;
        private MemoryStream _ms = new MemoryStream();

        private bool? _responseIsHtml;

        public Utf8StringTransformationStream(Stream innerOuputStream)
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
            get { throw new NotSupportedException(); }
        }

        public override long Position
        {
            get { throw new NotSupportedException(); }
            set { throw new NotSupportedException(); }
        }

        public override int Read(byte[] buffer, int offset, int count)
        {
            throw new NotSupportedException();
        }

        public override long Seek(long offset, SeekOrigin origin)
        {
            throw new NotSupportedException();
        }

        public override void SetLength(long value)
        {
            throw new NotSupportedException();
        }

        public override void Write(byte[] buffer, int offset, int count)
        {
            if (_responseIsHtml == null)
            {
                var context = HttpContext.Current;
                _responseIsHtml = context.Response.Headers["Content-Type"].Contains("html");
            }

            if (!_responseIsHtml.Value)
            {
                _innerStream.Write(buffer, offset, count);
                return;
            }

            if (!_ms.CanWrite)
            {
                // Reopening stream if it was empty
                _ms = new MemoryStream();
            }
            _ms.Write(buffer, offset, count);
        }

        public override void Close()
        {
            if (_responseIsHtml == null || !_responseIsHtml.Value)
            {
                _innerStream.Close();
                return;
            }

            // Checking if the stream was already closed
            if (!_ms.CanSeek)
            {
                return;
            }

            _ms.Seek(0, SeekOrigin.Begin);

            var bytes = _ms.ToArray();

            string str = Encoding.UTF8.GetString(bytes);

            string newValue = Process(str);

            if (newValue != str)
            {
                bytes = Encoding.UTF8.GetBytes(newValue);
            }

            _innerStream.Write(bytes, 0, bytes.Length);

            _innerStream.Close();
            _ms.Close();
        }

        public abstract string Process(string str);
    }
}
