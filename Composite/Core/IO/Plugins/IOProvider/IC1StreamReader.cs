using System;
using System.IO;
using System.Text;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// Implementations of this interface is used by C1 through <see cref="IIOProvider"/> 
    /// to provide the behavior of <see cref="Composite.Core.IO.C1StreamReader"/>.
    /// See <see cref="Composite.Core.IO.C1StreamReader"/> for more information.
    /// </summary>
    public interface IC1StreamReader : IDisposable
    {
        /// <summary>
        /// Reads a byte from the stream.
        /// </summary>
        /// <returns>Returns the read byte.</returns>
        int Read();


        /// <summary>
        /// Reads a block from the file.
        /// </summary>
        /// <param name="buffer">Buffer to read into.</param>
        /// <param name="index">Index in buffer to start storing bytes.</param>
        /// <param name="count">Number of bytes to read.</param>
        /// <returns>Returns the number read bytes.</returns>
        int Read(char[] buffer, int index, int count);


        /// <summary>
        /// Read a line from the file.
        /// </summary>
        /// <returns>Returns the read line.</returns>
        string ReadLine();


        /// <summary>
        /// Read all the content of the file into a strng.
        /// </summary>
        /// <returns>The content of the file.</returns>
        string ReadToEnd();


        /// <summary>
        /// Reads a block from the file.
        /// </summary>
        /// <param name="buffer">Buffer to store read chars.</param>
        /// <param name="index">Index in buffer to start storing chars.</param>
        /// <param name="count">Number of chars to read.</param>
        /// <returns>Returns the number of read chars.</returns>
        int ReadBlock(char[] buffer, int index, int count);


        /// <summary>
        /// Peeks the current byte.
        /// </summary>
        /// <returns>The current byte.</returns>
        int Peek();


        /// <summary>
        /// Returns true if the stream is at the end of stream.
        /// </summary>
        bool EndOfStream { get; }


        /// <summary>
        /// Closes the stream.
        /// </summary>
        void Close();


        /// <summary>
        /// Returns the base stream.
        /// </summary>
        Stream BaseStream { get; }


        /// <summary>
        /// Returns the current encoding of the stream.
        /// </summary>
        Encoding CurrentEncoding { get; }
    }
}
