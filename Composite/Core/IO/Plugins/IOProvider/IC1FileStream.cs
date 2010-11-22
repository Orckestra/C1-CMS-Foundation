using System;
using System.IO;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public interface IC1FileStream : IDisposable
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        string Name { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        long Length { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void SetLength(long value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        long Position { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="array"></param>
        /// <param name="offset"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        int Read(byte[] array, int offset, int count);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        int ReadByte();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="array"></param>
        /// <param name="offset"></param>
        /// <param name="count"></param>
        void Write(byte[] array, int offset, int count);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void WriteByte(byte value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="offset"></param>
        /// <param name="origin"></param>
        /// <returns></returns>
        long Seek(long offset, SeekOrigin origin);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        bool CanRead { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        bool CanSeek { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        bool CanWrite { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        void Flush();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="flushToDisk"></param>
        void Flush(bool flushToDisk);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        void Close();
    }
}
