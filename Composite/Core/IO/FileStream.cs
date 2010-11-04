using System;
using System.Runtime;
using System.Runtime.InteropServices;
using System.Security;

namespace Composite.Core.IO
{
    /// <summary>
    /// This should be a part of the I/O layer
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]    
    public class FileStream : System.IO.Stream, IDisposable
    {
        private System.IO.FileStream _fileStream;


        //[SecuritySafeCritical, TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        //public FileStream(SafeFileHandle handle, System.IO.FileAccess access) { throw new NotImplementedException(); }
        //[Obsolete("This constructor has been deprecated.  Please use new FileStream(SafeFileHandle handle, System.IO.FileAccess access) instead.  http://go.microsoft.com/fwlink/?linkid=14202"), SecuritySafeCritical, TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        //public FileStream(IntPtr handle, System.IO.FileAccess access) { throw new NotImplementedException(); }
        //[SecuritySafeCritical]


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass", Justification = "The implementation may use it")]
        public FileStream(string path, System.IO.FileMode mode)
        {
            _fileStream = new System.IO.FileStream(path, mode);
        }



        //[SecuritySafeCritical, TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        //public FileStream(SafeFileHandle handle, System.IO.FileAccess access, int bufferSize) { throw new NotImplementedException(); }
        //[SecuritySafeCritical, Obsolete("This constructor has been deprecated.  Please use new FileStream(SafeFileHandle handle, System.IO.FileAccess access) instead, and optionally make a new SafeFileHandle with ownsHandle=false if needed.  http://go.microsoft.com/fwlink/?linkid=14202"), TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        //public FileStream(IntPtr handle, System.IO.FileAccess access, bool ownsHandle) { throw new NotImplementedException(); }
        //[SecuritySafeCritical]


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass", Justification = "The implementation may use it")]
        public FileStream(string path, System.IO.FileMode mode, System.IO.FileAccess access)
        {
            _fileStream = new System.IO.FileStream(path, mode, access);
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass", Justification = "The implementation may use it")]
        internal FileStream(System.IO.FileStream fileStream)
        {
            _fileStream = fileStream;
        }



        //[SecuritySafeCritical, SecurityPermission(SecurityAction.Demand, Flags = SecurityPermissionFlag.UnmanagedCode)]
        //public FileStream(SafeFileHandle handle, System.IO.FileAccess access, int bufferSize, bool isAsync) { throw new NotImplementedException(); }
        //[SecuritySafeCritical, Obsolete("This constructor has been deprecated.  Please use new FileStream(SafeFileHandle handle, System.IO.FileAccess access, int bufferSize) instead, and optionally make a new SafeFileHandle with ownsHandle=false if needed.  http://go.microsoft.com/fwlink/?linkid=14202"), TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        //public FileStream(IntPtr handle, System.IO.FileAccess access, bool ownsHandle, int bufferSize) { throw new NotImplementedException(); }
        //[SecuritySafeCritical]



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass", Justification = "The implementation may use it")]
        public FileStream(string path, System.IO.FileMode mode, System.IO.FileAccess access, System.IO.FileShare share) 
        {
            _fileStream = new System.IO.FileStream(path, mode, access, share); 
        }



        //[Obsolete("This constructor has been deprecated.  Please use new FileStream(SafeFileHandle handle, System.IO.FileAccess access, int bufferSize, bool isAsync) instead, and optionally make a new SafeFileHandle with ownsHandle=false if needed.  http://go.microsoft.com/fwlink/?linkid=14202"), SecuritySafeCritical, SecurityPermission(SecurityAction.Demand, Flags = SecurityPermissionFlag.UnmanagedCode)]
        //public FileStream(IntPtr handle, System.IO.FileAccess access, bool ownsHandle, int bufferSize, bool isAsync) { throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public FileStream(string path, System.IO.FileMode mode, System.IO.FileAccess access, System.IO.FileShare share, int bufferSize) { throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public FileStream(string path, System.IO.FileMode mode, System.IO.FileAccess access, System.IO.FileShare share, int bufferSize, bool useAsync) { throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public FileStream(string path, System.IO.FileMode mode, System.IO.FileAccess access, System.IO.FileShare share, int bufferSize, System.IO.FileOptions options) { throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public FileStream(string path, System.IO.FileMode mode, FileSystemRights rights, System.IO.FileShare share, int bufferSize, System.IO.FileOptions options) { throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public FileStream(string path, System.IO.FileMode mode, FileSystemRights rights, System.IO.FileShare share, int bufferSize, System.IO.FileOptions options, FileSecurity fileSecurity) { throw new NotImplementedException(); }
        //[SecuritySafeCritical, HostProtection(SecurityAction.LinkDemand, ExternalThreading = true)]
        //public override IAsyncResult BeginRead(byte[] array, int offset, int numBytes, AsyncCallback userCallback, object stateObject) { throw new NotImplementedException(); }
        //[SecuritySafeCritical, HostProtection(SecurityAction.LinkDemand, ExternalThreading = true)]
        //public override IAsyncResult BeginWrite(byte[] array, int offset, int numBytes, AsyncCallback userCallback, object stateObject) { throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public override int EndRead(IAsyncResult asyncResult) { throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public override void EndWrite(IAsyncResult asyncResult) { throw new NotImplementedException(); }
        //[SecuritySafeCritical, TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]



        public override void Flush()
        {
            _fileStream.Flush();
        }



        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass", Justification = "The implementation may use it")]
        public virtual void Flush(bool flushToDisk) 
        {
            _fileStream.Flush(flushToDisk);
        }


        public override void Close()
        {
            _fileStream.Close();
        }
        

        //[SecuritySafeCritical]
        //public FileSecurity GetAccessControl() { throw new NotImplementedException(); }
        //[SecuritySafeCritical]
        //public virtual void Lock(long position, long length) { throw new NotImplementedException(); }
        //[SecuritySafeCritical]

        public override int Read([In, Out] byte[] array, int offset, int count)
        {
            return _fileStream.Read(array, offset, count);
        }



        public override int ReadByte()
        {
            return _fileStream.ReadByte();
        }



        public override long Seek(long offset, System.IO.SeekOrigin origin)
        {
            return _fileStream.Seek(offset, origin);
        }



        //[SecuritySafeCritical]
        //public void SetAccessControl(FileSecurity fileSecurity) { throw new NotImplementedException(); }
        //[SecuritySafeCritical]



        public override void SetLength(long value)
        {
            _fileStream.SetLength(value);
        }



        //[SecuritySafeCritical]
        //public virtual void Unlock(long position, long length) { throw new NotImplementedException(); }
        //[SecuritySafeCritical]



        public override void Write(byte[] array, int offset, int count)
        {
            _fileStream.Write(array, offset, count);
        }



        public override void WriteByte(byte value)
        {
            _fileStream.WriteByte(value);
        }



        public override bool CanRead
        {
            [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen imagetiur boundaries")]
            get
            {
                return _fileStream.CanRead;
            }
        }



        public override bool CanSeek
        {
            [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
            get
            {
                return _fileStream.CanSeek;
            }
        }



        public override bool CanWrite
        {
            [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
            get
            {
                return _fileStream.CanWrite;
            }
        }



        //[Obsolete("This property has been deprecated.  Please use FileStream's SafeFileHandle property instead.  http://go.microsoft.com/fwlink/?linkid=14202")]
        //public virtual IntPtr Handle { [SecurityCritical, SecurityPermission(SecurityAction.InheritanceDemand, Flags = SecurityPermissionFlag.UnmanagedCode)] get { throw new NotImplementedException(); } }
        //public virtual bool IsAsync { [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")] get { throw new NotImplementedException(); } }



        public override long Length
        {
            [SecuritySafeCritical]
            get
            {
                return _fileStream.Length;
            }
        }



        //public string Name { [SecuritySafeCritical] get { throw new NotImplementedException(); } }
        //internal string NameInternal { get { throw new NotImplementedException(); } }



        public override long Position
        {
            [SecuritySafeCritical]
            get
            {
                return _fileStream.Position;
            }
            [SecuritySafeCritical]
            set
            {
                _fileStream.Position = value;
            }
        }



        //public virtual SafeFileHandle SafeFileHandle { [SecurityCritical, SecurityPermission(SecurityAction.InheritanceDemand, Flags = SecurityPermissionFlag.UnmanagedCode)] get { throw new NotImplementedException(); } }

        //public void Dispose()
        //{
        //    Dispose(true);
        //    GC.SuppressFinalize(this);
        //}



        ~FileStream()
        {
            Dispose(false);
        }



        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _fileStream.Dispose();
            }
        }
    }
}
