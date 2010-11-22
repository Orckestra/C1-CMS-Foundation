using System;
using System.IO;
using System.Text;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public interface IC1StreamWriter : IDisposable
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void Write(string value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg"></param>
        void Write(string format, params object[] arg);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg0"></param>
        void Write(string format, object arg0);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg0"></param>
        /// <param name="arg1"></param>
        void Write(string format, object arg0, object arg1);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg0"></param>
        /// <param name="arg1"></param>
        /// <param name="arg2"></param>
        void Write(string format, object arg0, object arg1, object arg2);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void Write(char value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="buffer"></param>
        void Write(char[] buffer);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="buffer"></param>
        /// <param name="index"></param>
        /// <param name="count"></param>
        void Write(char[] buffer, int index, int count);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void Write(bool value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void Write(int value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void Write(uint value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void Write(long value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void Write(ulong value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void Write(float value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void Write(double value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void Write(decimal value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void Write(object value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        void WriteLine();


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void WriteLine(string value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg0"></param>
        void WriteLine(string format, object arg0);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg0"></param>
        /// <param name="arg1"></param>
        void WriteLine(string format, object arg0, object arg1);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg0"></param>
        /// <param name="arg1"></param>
        /// <param name="arg2"></param>
        void WriteLine(string format, object arg0, object arg1, object arg2);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="format"></param>
        /// <param name="arg"></param>
        void WriteLine(string format, params object[] arg);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void WriteLine(char value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="buffer"></param>
        void WriteLine(char[] buffer);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="buffer"></param>
        /// <param name="index"></param>
        /// <param name="count"></param>
        void WriteLine(char[] buffer, int index, int count);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void WriteLine(bool value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void WriteLine(int value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void WriteLine(uint value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void WriteLine(long value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void WriteLine(ulong value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void WriteLine(float value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void WriteLine(double value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void WriteLine(decimal value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="value"></param>
        void WriteLine(object value);


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        string NewLine { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        IFormatProvider FormatProvider { get; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        bool AutoFlush { get; set; }


        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        void Flush();


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
        Encoding Encoding { get; }
    }
}
