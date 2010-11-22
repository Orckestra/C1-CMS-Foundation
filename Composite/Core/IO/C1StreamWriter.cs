using System;
using System.IO;
using System.Text;
using Composite.Core.Implementation;


namespace Composite.Core.IO
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public class C1StreamWriter : TextWriter, IDisposable
    {
        private ImplementationContainer<C1StreamWriterImplementation> _implementation;


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        public C1StreamWriter(string path)
            : this(path, false, Encoding.UTF8, 1024)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="append"></param>
        public C1StreamWriter(string path, bool append)
            : this(path, append, Encoding.UTF8, 1024)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="append"></param>
        /// <param name="encoding"></param>
        public C1StreamWriter(string path, bool append, Encoding encoding)
            : this(path, append, encoding, 1024)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="append"></param>
        /// <param name="encoding"></param>
        /// <param name="bufferSize"></param>
        public C1StreamWriter(string path, bool append, Encoding encoding, int bufferSize)
        {
            _implementation = new ImplementationContainer<C1StreamWriterImplementation>(() => ImplementationFactory.CurrentFactory.CreateC1StreamWriter(path, append, encoding, bufferSize));
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="stream"></param>
        public C1StreamWriter(Stream stream)
            : this(stream, Encoding.UTF8, 1024)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="stream"></param>
        /// <param name="encoding"></param>
        public C1StreamWriter(Stream stream, Encoding encoding)
            : this(stream, encoding, 1024)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="stream"></param>
        /// <param name="encoding"></param>
        /// <param name="bufferSize"></param>
        public C1StreamWriter(Stream stream, Encoding encoding, int bufferSize)
        {
            _implementation = new ImplementationContainer<C1StreamWriterImplementation>(() => ImplementationFactory.CurrentFactory.CreateC1StreamWriter(stream, encoding, bufferSize));
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void Write(string value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg0"></param>
        public override void Write(string format, object arg0)
        {
            _implementation.Implementation.Write(format, arg0);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg0"></param>
        /// <param name="arg1"></param>
        public override void Write(string format, object arg0, object arg1)
        {
            _implementation.Implementation.Write(format, arg0, arg1);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg0"></param>
        /// <param name="arg1"></param>
        /// <param name="arg2"></param>
        public override void Write(string format, object arg0, object arg1, object arg2)
        {
            _implementation.Implementation.Write(format, arg0, arg1, arg2);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg"></param>
        public override void Write(string format, params object[] arg)
        {
            _implementation.Implementation.Write(format, arg);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void Write(char value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="buffer"></param>
        public override void Write(char[] buffer)
        {
            _implementation.Implementation.Write(buffer);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="buffer"></param>
        /// <param name="index"></param>
        /// <param name="count"></param>
        public override void Write(char[] buffer, int index, int count)
        {
            _implementation.Implementation.Write(buffer, index, count);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void Write(bool value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void Write(int value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void Write(uint value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void Write(long value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void Write(ulong value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void Write(float value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void Write(double value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void Write(decimal value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void Write(object value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override void WriteLine()
        {
            _implementation.Implementation.WriteLine();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void WriteLine(string value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg0"></param>
        public override void WriteLine(string format, object arg0)
        {
            _implementation.Implementation.WriteLine(format, arg0);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg0"></param>
        /// <param name="arg1"></param>
        public override void WriteLine(string format, object arg0, object arg1)
        {
            _implementation.Implementation.WriteLine(format, arg0, arg1);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg0"></param>
        /// <param name="arg1"></param>
        /// <param name="arg2"></param>
        public override void WriteLine(string format, object arg0, object arg1, object arg2)
        {
            _implementation.Implementation.WriteLine(format, arg0, arg1, arg2);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg"></param>
        public override void WriteLine(string format, params object[] arg)
        {
            _implementation.Implementation.WriteLine(format, arg);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void WriteLine(char value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="buffer"></param>
        public override void WriteLine(char[] buffer)
        {
            _implementation.Implementation.WriteLine(buffer);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="buffer"></param>
        /// <param name="index"></param>
        /// <param name="count"></param>
        public override void WriteLine(char[] buffer, int index, int count)
        {
            _implementation.Implementation.WriteLine(buffer, index, count);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void WriteLine(bool value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void WriteLine(int value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void WriteLine(uint value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void WriteLine(long value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void WriteLine(ulong value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void WriteLine(float value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void WriteLine(double value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void WriteLine(decimal value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void WriteLine(object value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override string NewLine
        {
            get
            {
                return _implementation.Implementation.NewLine;
            }
            set
            {
                _implementation.Implementation.NewLine = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override IFormatProvider FormatProvider
        {
            get
            {
                return _implementation.Implementation.FormatProvider;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override void Flush()
        {
            _implementation.Implementation.Flush();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual bool AutoFlush
        {
            get
            {
                return _implementation.Implementation.AutoFlush;
            }
            set
            {
                _implementation.Implementation.AutoFlush = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override void Close()
        {
            _implementation.Implementation.Close();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual Stream BaseStream
        {
            get
            {
                return _implementation.Implementation.BaseStream;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override Encoding Encoding
        {
            get
            {
                return _implementation.Implementation.Encoding;
            }
        }



        ~C1StreamWriter()
        {
            Dispose(false);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="disposing"></param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _implementation.DisposeImplementation();
            }
        }
    }
}
