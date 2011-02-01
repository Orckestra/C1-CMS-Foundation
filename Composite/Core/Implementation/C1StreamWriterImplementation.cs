using System;
using System.IO;
using System.Text;
using Composite.Core.IO;
using Composite.Core.IO.Plugins.IOProvider;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public class C1StreamWriterImplementation : IDisposable
    {
        private IC1StreamWriter _streamWriter;



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="append"></param>
        /// <param name="encoding"></param>
        /// <param name="bufferSize"></param>
        public C1StreamWriterImplementation(string path, bool append, Encoding encoding, int bufferSize)
        {
            _streamWriter = IOFacade.CreateC1StreamWriter(path, append, encoding, bufferSize);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="stream"></param>
        /// <param name="encoding"></param>
        /// <param name="bufferSize"></param>
        public C1StreamWriterImplementation(Stream stream, Encoding encoding, int bufferSize)
        {
            _streamWriter = IOFacade.CreateC1StreamWriter(stream, encoding, bufferSize);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void Write(string value)
        {
            _streamWriter.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg0"></param>
        public virtual void Write(string format, object arg0)
        {
            _streamWriter.Write(format, arg0);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg0"></param>
        /// <param name="arg1"></param>
        public virtual void Write(string format, object arg0, object arg1)
        {
            _streamWriter.Write(format, arg0, arg1);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg0"></param>
        /// <param name="arg1"></param>
        /// <param name="arg2"></param>
        public virtual void Write(string format, object arg0, object arg1, object arg2)
        {
            _streamWriter.Write(format, arg0, arg1, arg2);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg"></param>
        public virtual void Write(string format, params object[] arg)
        {
            _streamWriter.Write(format, arg);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void Write(char value)
        {
            _streamWriter.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="buffer"></param>
        public virtual void Write(char[] buffer)
        {
            _streamWriter.Write(buffer);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="buffer"></param>
        /// <param name="index"></param>
        /// <param name="count"></param>
        public virtual void Write(char[] buffer, int index, int count)
        {
            _streamWriter.Write(buffer, index, count);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void Write(bool value)
        {
            _streamWriter.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void Write(int value)
        {
            _streamWriter.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void Write(uint value)
        {
            _streamWriter.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void Write(long value)
        {
            _streamWriter.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void Write(ulong value)
        {
            _streamWriter.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void Write(float value)
        {
            _streamWriter.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void Write(double value)
        {
            _streamWriter.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void Write(decimal value)
        {
            _streamWriter.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void Write(object value)
        {
            _streamWriter.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual void WriteLine()
        {
            _streamWriter.WriteLine();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void WriteLine(string value)
        {
            _streamWriter.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg0"></param>
        public virtual void WriteLine(string format, object arg0)
        {
            _streamWriter.WriteLine(format, arg0);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg0"></param>
        /// <param name="arg1"></param>
        public virtual void WriteLine(string format, object arg0, object arg1)
        {
            _streamWriter.WriteLine(format, arg0, arg1);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg0"></param>
        /// <param name="arg1"></param>
        /// <param name="arg2"></param>
        public virtual void WriteLine(string format, object arg0, object arg1, object arg2)
        {
            _streamWriter.WriteLine(format, arg0, arg1, arg2);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg"></param>
        public virtual void WriteLine(string format, params object[] arg)
        {
            _streamWriter.WriteLine(format, arg);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void WriteLine(char value)
        {
            _streamWriter.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="buffer"></param>
        public virtual void WriteLine(char[] buffer)
        {
            _streamWriter.WriteLine(buffer);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="buffer"></param>
        /// <param name="index"></param>
        /// <param name="count"></param>
        public virtual void WriteLine(char[] buffer, int index, int count)
        {
            _streamWriter.WriteLine(buffer, index, count);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void WriteLine(bool value)
        {
            _streamWriter.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void WriteLine(int value)
        {
            _streamWriter.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void WriteLine(uint value)
        {
            _streamWriter.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void WriteLine(long value)
        {
            _streamWriter.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void WriteLine(ulong value)
        {
            _streamWriter.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void WriteLine(float value)
        {
            _streamWriter.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void WriteLine(double value)
        {
            _streamWriter.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void WriteLine(decimal value)
        {
            _streamWriter.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void WriteLine(object value)
        {
            _streamWriter.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual string NewLine
        {
            get
            {
                return _streamWriter.NewLine;
            }
            set
            {
                _streamWriter.NewLine = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual IFormatProvider FormatProvider
        {
            get
            {
                return _streamWriter.FormatProvider;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual void Flush()
        {
            _streamWriter.Flush();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual bool AutoFlush
        {
            get
            {
                return _streamWriter.AutoFlush;
            }
            set
            {
                _streamWriter.AutoFlush = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual void Close()
        {
            _streamWriter.Close();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual Stream BaseStream
        {
            get
            {
                return _streamWriter.BaseStream;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual Encoding Encoding
        {
            get
            {
                return _streamWriter.Encoding;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }



        ~C1StreamWriterImplementation()
        {
            Dispose(false);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="disposing"></param>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _streamWriter.Dispose();
            }
        }
    }
}
