using System;
using System.IO;
using System.Runtime.InteropServices;
using Composite.Core.Implementation;


namespace Composite.Core.IO
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public class C1FileStream : Stream, IDisposable
    {
        private ImplementationContainer<C1FileStreamImplementation> _implementation;



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        public C1FileStream(string path, FileMode mode)
            : this(path, mode, (mode == FileMode.Append) ? FileAccess.Write : FileAccess.ReadWrite, FileShare.Read, 4096, FileOptions.None)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        public C1FileStream(string path, FileMode mode, FileAccess access)
            : this(path, mode, access, FileShare.Read, 4096, FileOptions.None)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        /// <param name="share"></param>
        public C1FileStream(string path, FileMode mode, FileAccess access, FileShare share)
            : this(path, mode, access, share, 4096, FileOptions.None)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        /// <param name="share"></param>
        /// <param name="bufferSize"></param>
        public C1FileStream(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize)
            : this(path, mode, access, share, bufferSize, FileOptions.None)
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        /// <param name="share"></param>
        /// <param name="bufferSize"></param>
        /// <param name="options"></param>
        public C1FileStream(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize, FileOptions options)
        {
            _implementation = new ImplementationContainer<C1FileStreamImplementation>(() => ImplementationFactory.CurrentFactory.CreateC1FileStream(path, mode, access, share, bufferSize, options));
            _implementation.CreateImplementation();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public string Name
        {
            get
            {
                return _implementation.Implementation.Name;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override long Length
        {
            get
            {
                return _implementation.Implementation.Length;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void SetLength(long value)
        {
            _implementation.Implementation.SetLength(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override long Position
        {
            get
            {
                return _implementation.Implementation.Position;
            }
            set
            {
                _implementation.Implementation.Position = value;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="array"></param>
        /// <param name="offset"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public override int Read([In, Out] byte[] array, int offset, int count)
        {
            return _implementation.Implementation.Read(array, offset, count);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public override int ReadByte()
        {
            return _implementation.Implementation.ReadByte();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="array"></param>
        /// <param name="offset"></param>
        /// <param name="count"></param>
        public override void Write(byte[] array, int offset, int count)
        {
            _implementation.Implementation.Write(array, offset, count);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public override void WriteByte(byte value)
        {
            _implementation.Implementation.WriteByte(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="offset"></param>
        /// <param name="origin"></param>
        /// <returns></returns>
        public override long Seek(long offset, SeekOrigin origin)
        {
            return _implementation.Implementation.Seek(offset, origin);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override bool CanRead
        {
            get
            {
                return _implementation.Implementation.CanRead;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override bool CanSeek
        {
            get
            {
                return _implementation.Implementation.CanSeek;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override bool CanWrite
        {
            get
            {
                return _implementation.Implementation.CanWrite;
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
        /// <param name="flushToDisk"></param>
        public virtual void Flush(bool flushToDisk)
        {
            _implementation.Implementation.Flush(flushToDisk);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public override void Close()
        {
            base.Close();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        ~C1FileStream()
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



        //public virtual bool IsAsync 
        //{ 
        //    get 
        //    { 
        //        throw new NotImplementedException(); 
        //    } 
        //}



        ////[Obsolete("This property has been deprecated.  Please use FileStream's SafeFileHandle property instead.  http://go.microsoft.com/fwlink/?linkid=14202")]
        //public virtual IntPtr Handle 
        //{ 
        //    get 
        //    { 
        //        throw new NotImplementedException(); 
        //    } 
        //}



        //public FileSecurity GetAccessControl() 
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public void SetAccessControl(FileSecurity fileSecurity) 
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual void Lock(long position, long length) 
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual void Unlock(long position, long length) 
        //{ 
        //    throw new NotImplementedException(); 
        //}
    }
}
