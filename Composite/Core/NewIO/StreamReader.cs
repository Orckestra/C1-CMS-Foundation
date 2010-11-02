using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.InteropServices;
using System.Runtime;
using System.Security;

namespace Composite.Core.NewIO
{
    /// <summary>
    /// This should be a part of the I/O layer
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public class StreamReader : System.IO.TextReader, IDisposable
    {
        private System.IO.StreamReader _streamReader;

        //[TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamReaderClass:DotNotUseStreamReaderClass", Justification = "The implementation may use it")]
        public StreamReader(System.IO.Stream stream)
        {
            _streamReader = new System.IO.StreamReader(stream);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamReaderClass:DotNotUseStreamReaderClass", Justification = "The implementation may use it")]
        public StreamReader(string path)
        {
            _streamReader = new System.IO.StreamReader(path);
        }

        //public StreamReader(System.IO.Stream stream, bool detectEncodingFromByteOrderMarks){ throw new NotImplementedException(); }
        //[TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DotNotUseStreamReaderClass:DotNotUseStreamReaderClass", Justification = "The implementation may use it")]
        public StreamReader(System.IO.Stream stream, Encoding encoding)
        {
            _streamReader = new System.IO.StreamReader(stream, encoding);
        }

        //[SecuritySafeCritical]
        //public StreamReader(string path, bool detectEncodingFromByteOrderMarks){ throw new NotImplementedException(); }

        //[SecuritySafeCritical, TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        //public StreamReader(string path, Encoding encoding){ throw new NotImplementedException(); }

        //[TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        //public StreamReader(System.IO.Stream stream, Encoding encoding, bool detectEncodingFromByteOrderMarks){ throw new NotImplementedException(); }

        //[SecuritySafeCritical, TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        //public StreamReader(string path, Encoding encoding, bool detectEncodingFromByteOrderMarks){ throw new NotImplementedException(); }

        //public StreamReader(System.IO.Stream stream, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize){ throw new NotImplementedException(); }

        //[SecuritySafeCritical]
        //public StreamReader(string path, Encoding encoding, bool detectEncodingFromByteOrderMarks, int bufferSize){ throw new NotImplementedException(); }

        public override void Close()
        {
            _streamReader.Close();
        }

        //public void DiscardBufferedData(){ throw new NotImplementedException(); }

        public override int Peek()
        {
            return _streamReader.Peek();
        }

        public override int Read()
        {
            return _streamReader.Read();
        }

        public override int Read([In, Out] char[] buffer, int index, int count) 
        {
            return _streamReader.Read(buffer, index, count); 
        }

        public override string ReadLine() 
        {
            return _streamReader.ReadLine();
        }

        public override string ReadToEnd() 
        {
            return _streamReader.ReadToEnd(); 
        }

        //public virtual System.IO.Stream BaseStream { [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")] get{ throw new NotImplementedException(); } }
        //public virtual Encoding CurrentEncoding { [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")] get{ throw new NotImplementedException(); } }
        //public bool EndOfStream { [SecuritySafeCritical] get{ throw new NotImplementedException(); } }      
    
      

        ~StreamReader()
        {
            Dispose(false);
        }



        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _streamReader.Dispose();
            }
        }
    }
}
