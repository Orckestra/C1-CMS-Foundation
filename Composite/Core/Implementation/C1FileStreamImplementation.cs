using System;
using System.IO;
using System.Runtime.InteropServices;
using Composite.Core.IO;
using Composite.Core.IO.Plugins.IOProvider;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// Implementation of <see cref="Composite.Core.IO.C1FileStream"/>.
    /// </summary>
    public class C1FileStreamImplementation : IDisposable
    {
        private IC1FileStream _fileStream;


        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileStream"/>.
        /// </summary>
        /// <param name="path"></param>
        /// <param name="mode"></param>
        /// <param name="access"></param>
        /// <param name="share"></param>
        /// <param name="bufferSize"></param>
        /// <param name="options"></param>
        public C1FileStreamImplementation(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize, FileOptions options)
        {
            _fileStream = IOFacade.CreateC1FileStream(path, mode, access, share, bufferSize, options);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileStream"/>.
        /// </summary>
        public virtual string Name
        {
            get
            {
                return _fileStream.Name;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileStream"/>.
        /// </summary>
        public virtual long Length
        {
            get
            {
                return _fileStream.Length;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileStream"/>.
        /// </summary>
        /// <param name="value"></param>
        public virtual void SetLength(long value)
        {
            _fileStream.SetLength(value);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileStream"/>.
        /// </summary>
        public virtual long Position
        {
            get
            {
                return _fileStream.Position;
            }
            set
            {
                _fileStream.Position = value;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileStream"/>.
        /// </summary>
        /// <param name="array"></param>
        /// <param name="offset"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public virtual int Read(byte[] array, int offset, int count)
        {
            return _fileStream.Read(array, offset, count);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileStream"/>.
        /// </summary>
        /// <returns></returns>
        public virtual int ReadByte()
        {
            return _fileStream.ReadByte();
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileStream"/>.
        /// </summary>
        /// <param name="array"></param>
        /// <param name="offset"></param>
        /// <param name="count"></param>
        public virtual void Write(byte[] array, int offset, int count)
        {
            _fileStream.Write(array, offset, count);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileStream"/>.
        /// </summary>
        /// <param name="value"></param>
        public virtual void WriteByte(byte value)
        {
            _fileStream.WriteByte(value);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileStream"/>.
        /// </summary>
        /// <param name="offset"></param>
        /// <param name="origin"></param>
        /// <returns></returns>
        public virtual long Seek(long offset, SeekOrigin origin)
        {
            return _fileStream.Seek(offset, origin);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileStream"/>.
        /// </summary>
        public virtual bool CanRead
        {
            get
            {
                return _fileStream.CanRead;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileStream"/>.
        /// </summary>
        public virtual bool CanSeek
        {
            get
            {
                return _fileStream.CanSeek;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileStream"/>.
        /// </summary>
        public virtual bool CanWrite
        {
            get
            {
                return _fileStream.CanWrite;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileStream"/>.
        /// </summary>
        public virtual void Flush()
        {
            _fileStream.Flush();
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileStream"/>.
        /// </summary>
        /// <param name="flushToDisk"></param>
        public virtual void Flush(bool flushToDisk)
        {
            _fileStream.Flush(flushToDisk);
        }



        /// <summary>
        /// See <see cref="Composite.Core.IO.C1FileStream"/>.
        /// </summary>
        public virtual void Close()
        {
            _fileStream.Close();
        }



        /// <exclude />
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
        ~C1FileStreamImplementation()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            Dispose(false);
        }
#endif



        /// <exclude />
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _fileStream.Dispose();
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



        //public virtual FileSecurity GetAccessControl() 
        //{ 
        //    throw new NotImplementedException(); 
        //}



        //public virtual void SetAccessControl(FileSecurity fileSecurity) 
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
