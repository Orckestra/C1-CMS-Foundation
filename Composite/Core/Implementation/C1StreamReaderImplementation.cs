using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;
using Composite.Core.IO;
using Composite.Core.IO.Plugins.IOProvider;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public class C1StreamReaderImplementation : IDisposable
    {
        private IC1StreamReader _streamReader;


        /// <summary>
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public virtual int Read()
        {
            return _streamReader.Read();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="buffer"></param>
        /// <param name="index"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public virtual int Read([In, Out] char[] buffer, int index, int count)
        {
            return _streamReader.Read(buffer, index, count);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public virtual string ReadLine()
        {
            return _streamReader.ReadLine();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public virtual string ReadToEnd()
        {
            return _streamReader.ReadToEnd();
        }



        /// <summary>
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public virtual int Peek()
        {
            return _streamReader.Peek();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual bool EndOfStream
        {
            get
            {
                return _streamReader.EndOfStream;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual void Close()
        {
            _streamReader.Close();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual Stream BaseStream
        {
            get
            {
                return _streamReader.BaseStream;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual Encoding CurrentEncoding
        {
            get
            {
                return _streamReader.CurrentEncoding;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        ~C1StreamReaderImplementation()
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
                _streamReader.Dispose();
            }
        }
    }
}
