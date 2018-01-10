using System.IO;
using System.Text;
using Composite.Core.IO.Plugins.IOProvider;


namespace Composite.Plugins.IO.IOProviders.LocalIOProvider
{
    internal class LocalC1StreamReader : IC1StreamReader
    {
        private StreamReader _streamReader;


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamReaderClass:DotNotUseStreamReaderClass")]
        public LocalC1StreamReader(string path, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            _streamReader = new StreamReader(path, encoding, detectEncodingFromByteOrderMarks, bufferSize);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamReaderClass:DotNotUseStreamReaderClass")]
        public LocalC1StreamReader(Stream stream, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize)
        {
            _streamReader = new StreamReader(stream, encoding, detectEncodingFromByteOrderMarks, bufferSize);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamReaderClass:DotNotUseStreamReaderClass")]
        public int Read()
        {
            return _streamReader.Read();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamReaderClass:DotNotUseStreamReaderClass")]
        public int Read(char[] buffer, int index, int count)
        {
            return _streamReader.Read(buffer, index, count);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamReaderClass:DotNotUseStreamReaderClass")]
        public string ReadLine()
        {
            return _streamReader.ReadLine();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamReaderClass:DotNotUseStreamReaderClass")]
        public string ReadToEnd()
        {
            return _streamReader.ReadToEnd();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamReaderClass:DotNotUseStreamReaderClass")]
        public int ReadBlock(char[] buffer, int index, int count)
        {
            return _streamReader.ReadBlock(buffer, index, count);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamReaderClass:DotNotUseStreamReaderClass")]
        public int Peek()
        {
            return _streamReader.Peek();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamReaderClass:DotNotUseStreamReaderClass")]
        public bool EndOfStream
        {
            get
            {
                return _streamReader.EndOfStream;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamReaderClass:DotNotUseStreamReaderClass")]
        public void Close()
        {
            _streamReader.Close();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamReaderClass:DotNotUseStreamReaderClass")]
        public Stream BaseStream
        {
            get
            {
                return _streamReader.BaseStream;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamReaderClass:DotNotUseStreamReaderClass")]
        public Encoding CurrentEncoding
        {
            get
            {
                return _streamReader.CurrentEncoding;
            }
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamReaderClass:DotNotUseStreamReaderClass")]
        public void Dispose()
        {
            _streamReader.Dispose();
#if LeakCheck
            System.GC.SuppressFinalize(this);
#endif
        }

#if LeakCheck
        private string stack = System.Environment.StackTrace;
        /// <exclude />
        ~LocalC1StreamReader()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
        }
#endif
    }
}
