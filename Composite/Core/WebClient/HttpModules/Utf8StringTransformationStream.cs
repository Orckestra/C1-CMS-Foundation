using System;
using System.IO;
using System.Text;

namespace Composite.Core.WebClient.HttpModules
{
    internal abstract class Utf8StringTransformationStream : Stream
    {
        private readonly Stream _innerStream;
        private MemoryStream _ms = new MemoryStream();

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

        public override long Seek(long offset, SeekOrigin origin)
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
                _ms = new MemoryStream();
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
