using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;
using Composite.Core.IO;
using Composite.Core.IO.Plugins.IOProvider;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// Implementation of <see cref="Composite.Core.IO.C1StreamReader"/>.
    /// </summary>
    public class C1StreamReaderImplementation : IDisposable
    {
        private IC1StreamReader _streamReader;


        /// <summary>
        /// See <see cref="Composite.Core.IO.C1StreamReader"/>.
        /// </summary>
        /// <param name="path"></param>
        /// <param name="encoding"></param>
        /// <param name="detectEncodingFromByteOrderMarks"></param>
        /// <param name="bufferSize"></param>
        public C1StreamReaderImplementation(string path, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            _streamReader = IOFacade.CreateC1StreamReader(path, encoding, detectEncodingFromByteOrderMarks, bufferSize);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1StreamReader"/>.
        /// </summary>
        /// <param name="stream"></param>
        /// <param name="encoding"></param>
        /// <param name="detectEncodingFromByteOrderMarks"></param>
        /// <param name="bufferSize"></param>
        public C1StreamReaderImplementation(Stream stream, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            _streamReader = IOFacade.CreateC1StreamReader(stream, encoding, detectEncodingFromByteOrderMarks, bufferSize);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1StreamReader"/>.
        /// </summary>
        /// <returns></returns>
        public virtual int Read()
        {
            return _streamReader.Read();
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1StreamReader"/>.
        /// </summary>
        /// <param name="buffer"></param>
        /// <param name="index"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public virtual int Read(char[] buffer, int index, int count)
        {
            return _streamReader.Read(buffer, index, count);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1StreamReader"/>.
        /// </summary>
        /// <returns></returns>
        public virtual string ReadLine()
        {
            return _streamReader.ReadLine();
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1StreamReader"/>.
        /// </summary>
        /// <returns></returns>
        public virtual string ReadToEnd()
        {
            return _streamReader.ReadToEnd();
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1StreamReader"/>.
        /// </summary>
        /// <param name="buffer"></param>
        /// <param name="index"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public virtual int ReadBlock(char[] buffer, int index, int count)
        {
            return _streamReader.ReadBlock(buffer, index, count);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1StreamReader"/>.
        /// </summary>
        /// <returns></returns>
        public virtual int Peek()
        {
            return _streamReader.Peek();
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1StreamReader"/>.
        /// </summary>
        public virtual bool EndOfStream
        {
            get
            {
                return _streamReader.EndOfStream;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1StreamReader"/>.
        /// </summary>
        public virtual void Close()
        {
            _streamReader.Close();
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1StreamReader"/>.
        /// </summary>
        public virtual Stream BaseStream
        {
            get
            {
                return _streamReader.BaseStream;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1StreamReader"/>.
        /// </summary>
        public virtual Encoding CurrentEncoding
        {
            get
            {
                return _streamReader.CurrentEncoding;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1StreamReader"/>.
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
#if LeakCheck
            GC.SuppressFinalize(this);
#endif
        }



#if LeakCheck
        private string stack = Environment.StackTrace;
        /// <exclude />
        ~C1StreamReaderImplementation()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            Dispose(false);
        }
#endif


        /// <summary>
        /// See <see cref="Composite.Core.IO.C1StreamReader"/>.
        /// </summary>
        /// <param name="disposing"></param>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _streamReader.Dispose();
            }
        }
    }
}
