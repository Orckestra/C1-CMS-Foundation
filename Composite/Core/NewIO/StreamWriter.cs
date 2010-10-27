using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security;
using System.Runtime;
using System.Runtime.InteropServices;

namespace Composite.Core.NewIO
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public class StreamWriter : System.IO.TextWriter, IDisposable
    {
        private System.IO.StreamWriter _streamWriter;

        public StreamWriter(System.IO.Stream stream)
        {
            _streamWriter = new System.IO.StreamWriter(stream);
        }

        public StreamWriter(string path)
        {
            _streamWriter = new System.IO.StreamWriter(path);
        }

        //[SecuritySafeCritical, TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        //public StreamWriter(System.IO.Stream stream, Encoding encoding){throw new NotImplementedException();}
        //[SecuritySafeCritical]
        //public StreamWriter(string path, bool append){throw new NotImplementedException();}
        //[SecuritySafeCritical]
        //public StreamWriter(System.IO.Stream stream, Encoding encoding, int bufferSize){throw new NotImplementedException();}
        //[SecuritySafeCritical, TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        //public StreamWriter(string path, bool append, Encoding encoding){throw new NotImplementedException();}
        //[SecuritySafeCritical]
        //public StreamWriter(string path, bool append, Encoding encoding, int bufferSize){throw new NotImplementedException();}

        public override void Close()
        {
            _streamWriter.Close();
        }

        //[TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]

        public override void Flush()
        {
            _streamWriter.Flush();
        }

        public override void Write(char value)
        {
            _streamWriter.Write(value);
        }

        public override void Write(char[] buffer)
        {
            _streamWriter.Write(buffer);
        }

        public override void Write(string value)
        {
            _streamWriter.Write(value);
        }

        public override void Write(char[] buffer, int index, int count)
        {
            _streamWriter.Write(buffer, index, count);
        }

        //// Properties
        //public virtual bool AutoFlush { [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")] get{throw new NotImplementedException();} set{throw new NotImplementedException();} }
        //public virtual System.IO.Stream BaseStream { [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")] get{throw new NotImplementedException();} }
        public override Encoding Encoding 
        { 
            [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")] 
            get 
            { 
                return _streamWriter.Encoding; 
            } 
        }




        ~StreamWriter()
        {
            Dispose(false);
        }



        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _streamWriter.Dispose();
            }
        }
    }
}
