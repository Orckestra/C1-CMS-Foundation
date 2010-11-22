using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;
using Composite.Core.Implementation;


namespace Composite.Core.IO
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public class C1StreamReader : TextReader, IDisposable
    {
        private ImplementationContainer<C1StreamReaderImplementation> _implementation;


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        public C1StreamReader(string path)
            : this(path, Encoding.UTF8, true, 1024)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="detectEncodingFromByteOrderMarks"></param>
        public C1StreamReader(string path, bool detectEncodingFromByteOrderMarks)
            : this(path, Encoding.UTF8, detectEncodingFromByteOrderMarks, 1024)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="encoding"></param>
        public C1StreamReader(string path, Encoding encoding)
            : this(path, encoding, true, 1024)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="encoding"></param>
        /// <param name="detectEncodingFromByteOrderMarks"></param>
        public C1StreamReader(string path, Encoding encoding, bool detectEncodingFromByteOrderMarks)
            : this(path, encoding, detectEncodingFromByteOrderMarks, 1024)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="encoding"></param>
        /// <param name="detectEncodingFromByteOrderMarks"></param>
        /// <param name="bufferSize"></param>
        public C1StreamReader(string path, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            _implementation = new ImplementationContainer<C1StreamReaderImplementation>(() => ImplementationFactory.CurrentFactory.CreateC1StreamReader(path, encoding, detectEncodingFromByteOrderMarks, bufferSize));
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="stream"></param>
        public C1StreamReader(Stream stream)
            : this(stream, Encoding.UTF8, true, 1024)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="stream"></param>
        /// <param name="detectEncodingFromByteOrderMarks"></param>
        public C1StreamReader(Stream stream, bool detectEncodingFromByteOrderMarks)
            : this(stream, Encoding.UTF8, detectEncodingFromByteOrderMarks, 1024)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="stream"></param>
        /// <param name="encoding"></param>
        public C1StreamReader(Stream stream, Encoding encoding)
            : this(stream, encoding, true, 1024)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="stream"></param>
        /// <param name="encoding"></param>
        /// <param name="detectEncodingFromByteOrderMarks"></param>
        public C1StreamReader(Stream stream, Encoding encoding, bool detectEncodingFromByteOrderMarks)
            : this(stream, encoding, detectEncodingFromByteOrderMarks, 1024)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="stream"></param>
        /// <param name="encoding"></param>
        /// <param name="detectEncodingFromByteOrderMarks"></param>
        /// <param name="bufferSize"></param>
        public C1StreamReader(Stream stream, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            _implementation = new ImplementationContainer<C1StreamReaderImplementation>(() => ImplementationFactory.CurrentFactory.CreateC1StreamReader(stream, encoding, detectEncodingFromByteOrderMarks, bufferSize));
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public override int Read()
        {
            return _implementation.Implementation.Read();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="buffer"></param>
        /// <param name="index"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public override int Read([In, Out] char[] buffer, int index, int count)
        {
            return _implementation.Implementation.Read(buffer, index, count);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public override string ReadLine()
        {
            return _implementation.Implementation.ReadLine();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public override string ReadToEnd()
        {
            return _implementation.Implementation.ReadToEnd();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="buffer"></param>
        /// <param name="index"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public override int ReadBlock(char[] buffer, int index, int count)
        {
            return _implementation.Implementation.ReadBlock(buffer, index, count);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public override int Peek()
        {
            return _implementation.Implementation.Peek();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public bool EndOfStream
        {
            get
            {
                return _implementation.Implementation.EndOfStream;
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
        public virtual Encoding CurrentEncoding
        {
            get
            {
                return _implementation.Implementation.CurrentEncoding;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        ~C1StreamReader()
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



        //public void DiscardBufferedData()
        //{ 
        //    throw new NotImplementedException(); 
        //}
    }
}
