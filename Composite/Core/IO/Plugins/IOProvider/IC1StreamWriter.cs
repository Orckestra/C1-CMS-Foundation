using System;
using System.IO;
using System.Text;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>
    /// Implementations of this interface is used by C1 through <see cref="IIOProvider"/> 
    /// to provide the behavior of <see cref="Composite.Core.IO.C1StreamWriter"/>.
    /// See <see cref="Composite.Core.IO.C1StreamWriter"/> for more information.
    /// </summary>
    public interface IC1StreamWriter : IDisposable
    {
        /// <summary>
        /// Writes a string to the stream.
        /// </summary>
        /// <param name="value">String to write.</param>
        void Write(string value);


        /// <summary>
        /// Writes a formatted string to the stream.
        /// </summary>
        /// <param name="format">String with formatting to write.</param>
        /// <param name="arg">String format arguments.</param>
        void Write(string format, params object[] arg);


        /// <summary>
        /// Writes a formatted string to the stream.
        /// </summary>
        /// <param name="format">String with formatting to write.</param>
        /// <param name="arg0">String format argument.</param>
        void Write(string format, object arg0);


        /// <summary>
        /// Writes a formatted string to the stream.
        /// </summary>
        /// <param name="format">String with formatting to write.</param>
        /// <param name="arg0">String format argument.</param>
        /// <param name="arg1">String format argument.</param>
        void Write(string format, object arg0, object arg1);


        /// <summary>
        /// Writes a formatted string to the stream.
        /// </summary>
        /// <param name="format">String with formatting to write.</param>
        /// <param name="arg0">String format argument.</param>
        /// <param name="arg1">String format argument.</param>
        /// <param name="arg2">String format argument.</param>
        void Write(string format, object arg0, object arg1, object arg2);


        /// <summary>
        /// Writes a char to the stream.
        /// </summary>
        /// <param name="value">The char value to write.</param>
        void Write(char value);


        /// <summary>
        /// Writes a char array to the stream.
        /// </summary>
        /// <param name="buffer">Char array to write.</param>
        void Write(char[] buffer);


        /// <summary>
        /// Writes a char array to the stream.
        /// </summary>
        /// <param name="buffer">Char array to write.</param>
        /// <param name="index">Start index in the buffer to start writing from.</param>
        /// <param name="count">Number of chars to write.</param>
        void Write(char[] buffer, int index, int count);


        /// <summary>
        /// Writes a boolean to the stream.
        /// </summary>
        /// <param name="value">Boolean value to write.</param>
        void Write(bool value);


        /// <summary>
        /// Writes an integer to the stream.
        /// </summary>
        /// <param name="value">Integer value to write.</param>
        void Write(int value);


        /// <summary>
        /// Writes an unsigned integer to the stream.
        /// </summary>
        /// <param name="value">Unsigned integer value to write</param>
        void Write(uint value);


        /// <summary>
        /// Writes a long to the stream.
        /// </summary>
        /// <param name="value">Long value to write.</param>
        void Write(long value);


        /// <summary>
        /// Writes an unsigned long to the stream.
        /// </summary>
        /// <param name="value">Unsigned long value to write.</param>
        void Write(ulong value);


        /// <summary>
        /// Writes a float to the stream.
        /// </summary>
        /// <param name="value">Float value to write.</param>
        void Write(float value);


        /// <summary>
        /// Writes a double to the stream.
        /// </summary>
        /// <param name="value">Double value to write.</param>
        void Write(double value);


        /// <summary>
        /// Writes a decimal to the stream.
        /// </summary>
        /// <param name="value">Decimal value to write.</param>
        void Write(decimal value);


        /// <summary>
        /// Write an object to the stream.
        /// </summary>
        /// <param name="value">Object value to write.</param>
        void Write(object value);


        /// <summary>
        /// Writes a line break to the stream.
        /// </summary>
        void WriteLine();


        /// <summary>
        /// Writes a string with a line break to the stream.
        /// </summary>
        /// <param name="value">String value to write.</param>
        void WriteLine(string value);


        /// <summary>
        /// Writes a string with a line break to the stream.
        /// </summary>
        /// <param name="format">String with formatting to write.</param>
        /// <param name="arg0">String format argument.</param>
        void WriteLine(string format, object arg0);


        /// <summary>
        /// Writes a string with a line break to the stream.
        /// </summary>
        /// <param name="format">String with formatting to write.</param>
        /// <param name="arg0">String format argument.</param>
        /// <param name="arg1">String format argument.</param>
        void WriteLine(string format, object arg0, object arg1);


        /// <summary>
        /// Writes a string with a line break to the stream.
        /// </summary>
        /// <param name="format">String with formatting to write.</param>
        /// <param name="arg0">String format argument.</param>
        /// <param name="arg1">String format argument.</param>
        /// <param name="arg2">String format argument.</param>
        void WriteLine(string format, object arg0, object arg1, object arg2);


        /// <summary>
        /// Writes a string with a line break to the stream.
        /// </summary>
        /// <param name="format">String with formatting to write.</param>
        /// <param name="arg">String format arguments.</param>
        void WriteLine(string format, params object[] arg);


        /// <summary>
        /// Writes a char with a line break to the stream.
        /// </summary>
        /// <param name="value">Char value to write.</param>
        void WriteLine(char value);


        /// <summary>
        /// Writes a char array with a line break to the stream.
        /// </summary>
        /// <param name="buffer">Char array to write.</param>
        void WriteLine(char[] buffer);


        /// <summary>
        /// Writes a char array with a line break to the stream.
        /// </summary>
        /// <param name="buffer">Char array to write.</param>
        /// <param name="index">Index in the char array to start writing from.</param>
        /// <param name="count">Number of chars to write.</param>
        void WriteLine(char[] buffer, int index, int count);


        /// <summary>
        /// Writes a bool with a line break to the stream.
        /// </summary>
        /// <param name="value">Bool value to write.</param>
        void WriteLine(bool value);


        /// <summary>
        /// Writes an integer with a line break to the stream.
        /// </summary>
        /// <param name="value">Integer value to write.</param>
        void WriteLine(int value);


        /// <summary>
        /// Writes an unsigned integer with a line break to the stream.
        /// </summary>
        /// <param name="value">Unsigned integer to write.</param>
        void WriteLine(uint value);


        /// <summary>
        /// Writes a long with a line break to the stream.
        /// </summary>
        /// <param name="value">Long value to write.</param>
        void WriteLine(long value);


        /// <summary>
        /// Writes an unsigned long with a line break to the stream.
        /// </summary>
        /// <param name="value">Unsigned long value to write.</param>
        void WriteLine(ulong value);


        /// <summary>
        /// Writes a float with a line break to the stream.
        /// </summary>
        /// <param name="value">Float value to write.</param>
        void WriteLine(float value);


        /// <summary>
        /// Writes a double with a line break to the stream.
        /// </summary>
        /// <param name="value">Double value to write.</param>
        void WriteLine(double value);


        /// <summary>
        /// Writes a decimal with a line break to the stream.
        /// </summary>
        /// <param name="value">Decimal value to write.</param>
        void WriteLine(decimal value);


        /// <summary>
        /// Writes an object with a line break to the stream.
        /// </summary>
        /// <param name="value">Object value to write.</param>
        void WriteLine(object value);


        /// <summary>
        /// Gets or sets the line break value.
        /// </summary>
        string NewLine { get; set; }


        /// <summary>
        /// Gets the format provider used.
        /// </summary>
        IFormatProvider FormatProvider { get; }


        /// <summary>
        /// Gets or sets whether the stream is auto flushed or not
        /// </summary>
        bool AutoFlush { get; set; }


        /// <summary>
        /// Flushes the stream.
        /// </summary>
        void Flush();


        /// <summary>
        /// Closes the stream.
        /// </summary>
        void Close();


        /// <summary>
        /// The base streawm.
        /// </summary>
        Stream BaseStream { get; }


        /// <summary>
        /// Gets the encoding used.
        /// </summary>
        Encoding Encoding { get; }
    }
}
