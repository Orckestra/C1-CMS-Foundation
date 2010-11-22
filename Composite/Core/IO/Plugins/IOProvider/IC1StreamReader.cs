using System;
using System.IO;
using System.Text;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public interface IC1StreamReader : IDisposable
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        int Read();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="buffer"></param>
        /// <param name="index"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        int Read(char[] buffer, int index, int count);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        string ReadLine();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        string ReadToEnd();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="buffer"></param>
        /// <param name="index"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        int ReadBlock(char[] buffer, int index, int count);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <returns></returns>
        int Peek();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        bool EndOfStream { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        void Close();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        Stream BaseStream { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        Encoding CurrentEncoding { get; }
    }
}
