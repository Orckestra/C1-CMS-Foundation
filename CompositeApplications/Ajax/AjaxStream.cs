using System;
using System.IO;
using System.Text;
using System.Web;


namespace Composite.Ajax
{
	internal class AjaxStream: Stream
	{
        private static readonly string ScriptManagerJS = "UpdateManager.xhtml = null;";

	    private readonly Stream _innerStream;
        private MemoryStream _ms = new MemoryStream();

	    public AjaxStream(Stream innerOuputStream)
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
            if(!_ms.CanWrite)
            {
                // Reopening stream if it was empty
                _ms = new MemoryStream();
            }
            _ms.Write(buffer, offset, count);
        }

        public override void Close()
        {
            // Checking if the stream was already closed
            if(!_ms.CanSeek)
            {
                return;
            }

            _ms.Seek(0, SeekOrigin.Begin);

            var bytes = _ms.ToArray();

            string str = Encoding.UTF8.GetString(bytes);

            bool changed = false;

            int jsCodePosition = str.IndexOf(ScriptManagerJS);
            if (jsCodePosition > -1)
            {
                // Removing encoding symbol
                if (str[0] != '<') // Method StartsWith(...) doesn't work correctly here
                {
                    str = str.Substring(1);
                    jsCodePosition--;
                }

                string encodedText = HttpContext.Current.Server.UrlEncode(str).Replace("+", "%20"); //EncodeJsString(str);

                str = string.Format("{0}UpdateManager.xhtml = \"{1}\";{2}",
                                    str.Substring(0, jsCodePosition),
                                    encodedText,
                                    str.Substring(jsCodePosition + ScriptManagerJS.Length));
                changed = true;
            }

            if (changed)
            {
                bytes = Encoding.UTF8.GetBytes(str);
            }

            _innerStream.Write(bytes, 0, bytes.Length);

            _innerStream.Close();
            _ms.Close();
        }
	}
}
