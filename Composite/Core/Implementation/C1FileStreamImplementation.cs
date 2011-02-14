using System;
using System.IO;
using System.Runtime.InteropServices;
using Composite.Core.IO;
using Composite.Core.IO.Plugins.IOProvider;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public class C1FileStreamImplementation : IDisposable
    {
        private IC1FileStream _fileStream;


        /// <summary>
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
        /// </summary>
        public virtual string Name
        {
            get
            {
                return _fileStream.Name;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual long Length
        {
            get
            {
                return _fileStream.Length;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void SetLength(long value)
        {
            _fileStream.SetLength(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
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
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        public virtual int ReadByte()
        {
            return _fileStream.ReadByte();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="array"></param>
        /// <param name="offset"></param>
        /// <param name="count"></param>
        public virtual void Write(byte[] array, int offset, int count)
        {
            _fileStream.Write(array, offset, count);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        public virtual void WriteByte(byte value)
        {
            _fileStream.WriteByte(value);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="offset"></param>
        /// <param name="origin"></param>
        /// <returns></returns>
        public virtual long Seek(long offset, SeekOrigin origin)
        {
            return _fileStream.Seek(offset, origin);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual bool CanRead
        {
            get
            {
                return _fileStream.CanRead;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual bool CanSeek
        {
            get
            {
                return _fileStream.CanSeek;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual bool CanWrite
        {
            get
            {
                return _fileStream.CanWrite;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual void Flush()
        {
            _fileStream.Flush();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="flushToDisk"></param>
        public virtual void Flush(bool flushToDisk)
        {
            _fileStream.Flush(flushToDisk);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual void Close()
        {
            _fileStream.Close();
        }



        /// <exclude />
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }



        /// <exclude />
        ~C1FileStreamImplementation()
        {
            Dispose(false);
        }



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
