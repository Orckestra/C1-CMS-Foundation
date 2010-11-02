using System;
using System.Text;
using System.Web;


namespace Composite.Core.WebClient.Ajax
{
	internal class AjaxStream: System.IO.Stream
	{
        private static readonly string ScriptManagerJS = "UpdateManager.xhtml = null;";

	    private readonly System.IO.Stream _innerStream;
        private System.IO.MemoryStream _ms = new System.IO.MemoryStream();

	    public AjaxStream(System.IO.Stream innerOuputStream)
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
            if(!_ms.CanWrite)
            {
                // Reopening stream if it was empty
                _ms = new System.IO.MemoryStream();
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

            _ms.Seek(0, System.IO.SeekOrigin.Begin);

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
