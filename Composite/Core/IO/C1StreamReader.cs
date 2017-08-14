using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;
using Composite.Core.Implementation;


namespace Composite.Core.IO
{
    /// <summary>
    /// This class is a almost one to one version of System.IO.StreamReader. Using this implementation instead 
    /// of System.IO.StreamReader, will ensure that your code will work both on Standard Windows deployment 
    /// and Windows Azure deployment.
    /// See System.IO.StreamReader for more documentation on the methods of this class.
    /// See <see cref="Composite.Core.IO.Plugins.IOProvider.IC1StreamReader"/>.
    /// </summary>
    public class C1StreamReader : TextReader, IDisposable
    {
        private ImplementationContainer<C1StreamReaderImplementation> _implementation;


        /// <summary>
        /// Creates a C1StreamReader.
        /// </summary>
        /// <param name="path">Path to file.</param>
        public C1StreamReader(string path)
            : this(path, Encoding.UTF8, true, 1024)
        {
        }



        /// <summary>
        /// Creates a C1StreamReader.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="detectEncodingFromByteOrderMarks">If true, the encoding will be deteced by the content of the file.</param>
        public C1StreamReader(string path, bool detectEncodingFromByteOrderMarks)
            : this(path, Encoding.UTF8, detectEncodingFromByteOrderMarks, 1024)
        {
        }



        /// <summary>
        /// Creates a C1StreamReader.
        /// </summary>
        /// <param name="path">Path to the file.</param>
        /// <param name="encoding">Encoding to use.</param>
        public C1StreamReader(string path, Encoding encoding)
            : this(path, encoding, true, 1024)
        {
        }



        /// <summary>
        /// Creates a C1StreamReader.
        /// </summary>
        /// <param name="path">Path to the file.</param>
        /// <param name="encoding">Encoding to use.</param>
        /// <param name="detectEncodingFromByteOrderMarks">If true, the encoding will be deteced by the content of the file.</param>
        public C1StreamReader(string path, Encoding encoding, bool detectEncodingFromByteOrderMarks)
            : this(path, encoding, detectEncodingFromByteOrderMarks, 1024)
        {
        }



        /// <summary>
        /// Creates a C1StreamReader.
        /// </summary>
        /// <param name="path">Path to the file.</param>
        /// <param name="encoding">Encoding to use.</param>
        /// <param name="detectEncodingFromByteOrderMarks">If true, the encoding will be deteced by the content of the file.</param>
        /// <param name="bufferSize">Buffer size to use.</param>
        public C1StreamReader(string path, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            _implementation = new ImplementationContainer<C1StreamReaderImplementation>(() => ImplementationFactory.CurrentFactory.CreateC1StreamReader(path, encoding, detectEncodingFromByteOrderMarks, bufferSize));
        }



        /// <summary>
        /// Creates a C1StreamReader.
        /// </summary>
        /// <param name="stream">Stream to ream from.</param>
        public C1StreamReader(Stream stream)
            : this(stream, Encoding.UTF8, true, 1024)
        {
        }



        /// <summary>
        /// Creates a C1StreamReader.
        /// </summary>
        /// <param name="stream">Stream to ream from.</param>
        /// <param name="detectEncodingFromByteOrderMarks">If true, the encoding will be deteced by the content of the file.</param>
        public C1StreamReader(Stream stream, bool detectEncodingFromByteOrderMarks)
            : this(stream, Encoding.UTF8, detectEncodingFromByteOrderMarks, 1024)
        {
        }



        /// <summary>
        /// Creates a C1StreamReader.
        /// </summary>
        /// <param name="stream">Stream to ream from.</param>
        /// <param name="encoding">Encoding to use.</param>
        public C1StreamReader(Stream stream, Encoding encoding)
            : this(stream, encoding, true, 1024)
        {
        }



        /// <summary>
        /// Creates a C1StreamReader.
        /// </summary>
        /// <param name="stream">Stream to ream from.</param>
        /// <param name="encoding">Encoding to use.</param>
        /// <param name="detectEncodingFromByteOrderMarks">If true, the encoding will be deteced by the content of the file.</param>
        public C1StreamReader(Stream stream, Encoding encoding, bool detectEncodingFromByteOrderMarks)
            : this(stream, encoding, detectEncodingFromByteOrderMarks, 1024)
        {
        }



        /// <summary>
        /// Creates a C1StreamReader.
        /// </summary>
        /// <param name="stream">Stream to ream from.</param>
        /// <param name="encoding">Encoding to use.</param>
        /// <param name="detectEncodingFromByteOrderMarks">If true, the encoding will be deteced by the content of the file.</param>
        /// <param name="bufferSize">Buffer size to use.</param>
        public C1StreamReader(Stream stream, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            _implementation = new ImplementationContainer<C1StreamReaderImplementation>(() => ImplementationFactory.CurrentFactory.CreateC1StreamReader(stream, encoding, detectEncodingFromByteOrderMarks, bufferSize));
        }



        /// <summary>
        /// Reads a byte from the stream.
        /// </summary>
        /// <returns>Returns the read byte.</returns>
        public override int Read()
        {
            return _implementation.Implementation.Read();
        }



        /// <summary>
        /// Reads a block from the file.
        /// </summary>
        /// <param name="buffer">Buffer to read into.</param>
        /// <param name="index">Index in buffer to start storing bytes.</param>
        /// <param name="count">Number of bytes to read.</param>
        /// <returns>Returns the number read bytes.</returns>
        public override int Read(char[] buffer, int index, int count)
        {
            return _implementation.Implementation.Read(buffer, index, count);
        }



        /// <summary>
        /// Read a line from the file.
        /// </summary>
        /// <returns>Returns the read line.</returns>
        public override string ReadLine()
        {
            return _implementation.Implementation.ReadLine();
        }



        /// <summary>
        /// Read all the content of the file into a strng.
        /// </summary>
        /// <returns>The content of the file.</returns>
        public override string ReadToEnd()
        {
            return _implementation.Implementation.ReadToEnd();
        }



        /// <summary>
        /// Reads a block from the file.
        /// </summary>
        /// <param name="buffer">Buffer to store read chars.</param>
        /// <param name="index">Index in buffer to start storing chars.</param>
        /// <param name="count">Number of chars to read.</param>
        /// <returns>Returns the number of read chars.</returns>
        public override int ReadBlock(char[] buffer, int index, int count)
        {
            return _implementation.Implementation.ReadBlock(buffer, index, count);
        }



        /// <summary>
        /// Peeks the current byte.
        /// </summary>
        /// <returns>The current byte.</returns>
        public override int Peek()
        {
            return _implementation.Implementation.Peek();
        }



        /// <summary>
        /// Returns true if the stream is at the end of stream.
        /// </summary>
        public bool EndOfStream
        {
            get
            {
                return _implementation.Implementation.EndOfStream;
            }
        }



        /// <summary>
        /// Closes the stream.
        /// </summary>
        public override void Close()
        {
            _implementation.Implementation.Close();
        }



        /// <summary>
        /// Returns the base stream.
        /// </summary>
        public virtual Stream BaseStream
        {
            get
            {
                return _implementation.Implementation.BaseStream;
            }
        }



        /// <summary>
        /// Returns the current encoding of the stream.
        /// </summary>
        public virtual Encoding CurrentEncoding
        {
            get
            {
                return _implementation.Implementation.CurrentEncoding;
            }
        }


#if LeakCheck
        private string stack = Environment.StackTrace;
        /// <summary>
        /// Destructor.
        /// </summary>
        ~C1StreamReader()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            Dispose(false);
        }
#endif


        /// <summary>
        /// Disposes the stream.
        /// </summary>
        /// <param name="disposing">Ttrue if the stream is disposing.</param>
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
