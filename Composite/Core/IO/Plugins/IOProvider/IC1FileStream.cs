using System;
using System.IO;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// Implementations of this interface is used by C1 through <see cref="IIOProvider"/> 
    /// to provide the behavior of <see cref="Composite.Core.IO.C1FileStream"/>.
    /// See <see cref="Composite.Core.IO.C1FileStream"/> for more information.
    /// </summary>
    public interface IC1FileStream : IDisposable
    {
        /// <summary>
        /// Name of the file.
        /// </summary>
        string Name { get; }


        /// <summary>
        /// Size of the file in bytes.
        /// </summary>
        long Length { get; }


        /// <summary>
        /// Sets the length of the file in bytes.
        /// </summary>
        /// <param name="value">New length of file stream.</param>
        void SetLength(long value);


        /// <summary>
        /// Gets or sets the current read/write position in the file stream.
        /// </summary>
        long Position { get; set; }


        /// <summary>
        /// Reads a block of bytes from the file stream.
        /// </summary>
        /// <param name="array">Target buffer of read bytes.</param>
        /// <param name="offset">Offset in the buffer to put read bytes.</param>
        /// <param name="count">Number of bytes to read.</param>
        /// <returns>Number of bytes read.</returns>
        int Read(byte[] array, int offset, int count);


        /// <summary>
        /// Reads a byte form the file stream.
        /// </summary>
        /// <returns>The read byte value.</returns>
        int ReadByte();


        /// <summary>
        /// Writes a block of bytes to the file stream.
        /// </summary>
        /// <param name="array">Bytes to write to the file.</param>
        /// <param name="offset">Offset in buffer to write from.</param>
        /// <param name="count">Number of bytes to write.</param>
        void Write(byte[] array, int offset, int count);


        /// <summary>
        /// Writes a byte to the file stream.
        /// </summary>
        /// <param name="value">Byte value to write.</param>
        void WriteByte(byte value);


        /// <summary>
        /// Seeks to a position in the file stream.
        /// </summary>
        /// <param name="offset">Offset to seek.</param>
        /// <param name="origin">Origin to seek from.</param>
        /// <returns>The new position in the stream.</returns>
        long Seek(long offset, SeekOrigin origin);


        /// <summary>
        /// Returns true if its possible to read from the stream.
        /// </summary>
        bool CanRead { get; }


        /// <summary>
        /// Returns true if its possible to seek in the stream.
        /// </summary>
        bool CanSeek { get; }


        /// <summary>
        /// Returns true if its possible to write to the stream.
        /// </summary>
        bool CanWrite { get; }


        /// <summary>
        /// Flushes the buffered bytes to the file.
        /// </summary>
        void Flush();


        /// <summary>
        /// Flushes the buffered bytes to the file.
        /// </summary>
        /// <param name="flushToDisk"></param>
        void Flush(bool flushToDisk);


        /// <summary>
        /// Closes the file stream.
        /// </summary>
        void Close();
    }
}
