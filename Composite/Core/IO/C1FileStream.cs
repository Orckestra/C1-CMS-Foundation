using System;
using System.IO;
using Composite.Core.Implementation;


namespace Composite.Core.IO
{
    /// <summary>
    /// This class is a almost one to one version of System.IO.FileStream. Using this implementation instead 
    /// of System.IO.FileStream, will ensure that your code will work both on Standard Windows deployment 
    /// and Windows Azure deployment.
    /// See System.IO.FileStream for more documentation on the methods of this class.
    /// See <see cref="Composite.Core.IO.Plugins.IOProvider.IC1FileStream"/>. 
    /// </summary>
    public class C1FileStream : Stream
    {
        private bool _disposed;
        private readonly ImplementationContainer<C1FileStreamImplementation> _implementation;



        /// <summary>
        /// Creates a new C1FileStream.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="mode">File mode to use.</param>
        public C1FileStream(string path, FileMode mode)
            : this(path, mode, (mode == FileMode.Append) ? FileAccess.Write : FileAccess.ReadWrite, FileShare.Read, 4096, FileOptions.None)
        {
        }



        /// <summary>
        /// Creates a new C1FileStream.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="mode">File mode to use.</param>
        /// <param name="access">File access to use.</param>
        public C1FileStream(string path, FileMode mode, FileAccess access)
            : this(path, mode, access, FileShare.Read, 4096, FileOptions.None)
        {
        }



        /// <summary>
        /// Creates a new C1FileStream.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="mode">File mode to use.</param>
        /// <param name="access">File access to use.</param>
        /// <param name="share">File share to use.</param>
        public C1FileStream(string path, FileMode mode, FileAccess access, FileShare share)
            : this(path, mode, access, share, 4096, FileOptions.None)
        {
        }



        /// <summary>
        /// Creates a new C1FileStream.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="mode">File mode to use.</param>
        /// <param name="access">File access to use.</param>
        /// <param name="share">File share to use.</param>
        /// <param name="bufferSize">Buffer size to use.</param>
        public C1FileStream(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize)
            : this(path, mode, access, share, bufferSize, FileOptions.None)
        {
        }



        /// <summary>
        /// Creates a new C1FileStream.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="mode">File mode to use.</param>
        /// <param name="access">File access to use.</param>
        /// <param name="share">File share to use.</param>
        /// <param name="bufferSize">Buffer size to use.</param>
        /// <param name="options">File options to use.</param>
        public C1FileStream(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize, FileOptions options)
        {
            _implementation = new ImplementationContainer<C1FileStreamImplementation>(() => ImplementationFactory.CurrentFactory.CreateC1FileStream(path, mode, access, share, bufferSize, options));
            _implementation.CreateImplementation();
        }



        /// <summary>
        /// Name of the file.
        /// </summary>
        public string Name => _implementation.Implementation.Name;


        /// <summary>
        /// Size of the file in bytes.
        /// </summary>
        public override long Length => _implementation.Implementation.Length;


        /// <summary>
        /// Sets the length of the file in bytes.
        /// </summary>
        /// <param name="value">New length of file stream.</param>
        public override void SetLength(long value)
        {
            _implementation.Implementation.SetLength(value);
        }



        /// <summary>
        /// Gets or sets the current read/write position in the file stream.
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
        /// Reads a block of bytes from the file stream.
        /// </summary>
        /// <param name="array">Target buffer of read bytes.</param>
        /// <param name="offset">Offset in the buffer to put read bytes.</param>
        /// <param name="count">Number of bytes to read.</param>
        /// <returns>Number of bytes read.</returns>
        public override int Read(byte[] array, int offset, int count)
        {
            return _implementation.Implementation.Read(array, offset, count);
        }



        /// <summary>
        /// Reads a byte form the file stream.
        /// </summary>
        /// <returns>The read byte value.</returns>
        public override int ReadByte()
        {
            return _implementation.Implementation.ReadByte();
        }



        /// <summary>
        /// Writes a block of bytes to the file stream.
        /// </summary>
        /// <param name="array">Bytes to write to the file.</param>
        /// <param name="offset">Offset in buffer to write from.</param>
        /// <param name="count">Number of bytes to write.</param>
        public override void Write(byte[] array, int offset, int count)
        {
            _implementation.Implementation.Write(array, offset, count);
        }



        /// <summary>
        /// Writes a byte to the file stream.
        /// </summary>
        /// <param name="value">Byte value to write.</param>
        public override void WriteByte(byte value)
        {
            _implementation.Implementation.WriteByte(value);
        }



        /// <summary>
        /// Seeks to a position in the file stream.
        /// </summary>
        /// <param name="offset">Offset to seek.</param>
        /// <param name="origin">Origin to seek from.</param>
        /// <returns>The new position in the stream.</returns>
        public override long Seek(long offset, SeekOrigin origin)
        {
            return _implementation.Implementation.Seek(offset, origin);
        }



        /// <summary>
        /// Returns true if its possible to read from the stream.
        /// </summary>
        public override bool CanRead => _implementation.Implementation.CanRead;


        /// <summary>
        /// Returns true if its possible to seek in the stream.
        /// </summary>
        public override bool CanSeek => _implementation.Implementation.CanSeek;


        /// <summary>
        /// Returns true if its possible to write to the stream.
        /// </summary>
        public override bool CanWrite => _implementation.Implementation.CanWrite;


        /// <summary>
        /// Flushes the buffered bytes to the file.
        /// </summary>
        public override void Flush()
        {
            _implementation.Implementation.Flush();
        }



        /// <summary>
        /// Flushes the buffered bytes to the file.
        /// </summary>
        /// <param name="flushToDisk"></param>
        public virtual void Flush(bool flushToDisk)
        {
            _implementation.Implementation.Flush(flushToDisk);
        }



        /// <summary>
        /// Disposes the file stream.
        /// </summary>
        /// <param name="disposing"></param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && !_disposed)
            {
                _disposed = true;
                _implementation.DisposeImplementation();
            }
        }
    }
}
