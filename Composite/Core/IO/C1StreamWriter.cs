using System;
using System.IO;
using System.Text;
using Composite.Core.Implementation;


namespace Composite.Core.IO
{
    /// <summary>
    /// This class is a almost one to one version of System.IO.StreamWriter. Using this implementation instead 
    /// of System.IO.StreamWriter, will ensure that your code will work both on Standard Windows deployment 
    /// and Windows Azure deployment.
    /// See System.IO.StreamWriter for more documentation on the methods of this class.
    /// See <see cref="Composite.Core.IO.Plugins.IOProvider.IC1StreamWriter"/>.
    /// </summary>
    public class C1StreamWriter : TextWriter, IDisposable
    {
        private ImplementationContainer<C1StreamWriterImplementation> _implementation;


        /// <summary>
        /// Creates a C1StreamWriter.
        /// </summary>
        /// <param name="path">Path to file.</param>
        public C1StreamWriter(string path)
            : this(path, false, Encoding.UTF8, 1024)
        {
        }



        /// <summary>
        /// Creates a C1StreamWriter.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="append">If this is true, any writing will be appended to the file.</param>
        public C1StreamWriter(string path, bool append)
            : this(path, append, Encoding.UTF8, 1024)
        {
        }



        /// <summary>
        /// Creates a C1StreamWriter.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="append">If this is true, any writing will be appended to the file.</param>
        /// <param name="encoding">Encoding to use.</param>
        public C1StreamWriter(string path, bool append, Encoding encoding)
            : this(path, append, encoding, 1024)
        {
        }



        /// <summary>
        /// Creates a C1StreamWriter.
        /// </summary>
        /// <param name="path">Path to file.</param>
        /// <param name="append">If this is true, any writing will be appended to the file.</param>
        /// <param name="encoding">Encoding to use.</param>
        /// <param name="bufferSize">Buffer size to use.</param>
        public C1StreamWriter(string path, bool append, Encoding encoding, int bufferSize)
        {
            _implementation = new ImplementationContainer<C1StreamWriterImplementation>(() => ImplementationFactory.CurrentFactory.CreateC1StreamWriter(path, append, encoding, bufferSize));
        }



        /// <summary>
        /// Creates a C1StreamWriter.
        /// </summary>
        /// <param name="stream">Stream to use.</param>
        public C1StreamWriter(Stream stream)
            : this(stream, Encoding.UTF8, 1024)
        {
        }



        /// <summary>
        /// Creates a C1StreamWriter.
        /// </summary>
        /// <param name="stream">Stream to use.</param>
        /// <param name="encoding">Encoding to use.</param>
        public C1StreamWriter(Stream stream, Encoding encoding)
            : this(stream, encoding, 1024)
        {
        }



        /// <summary>
        /// Creates a C1StreamWriter.
        /// </summary>
        /// <param name="stream">Stream to use.</param>
        /// <param name="encoding">Encoding to use.</param>
        /// <param name="bufferSize">Buffer size to use.</param>
        public C1StreamWriter(Stream stream, Encoding encoding, int bufferSize)
        {
            _implementation = new ImplementationContainer<C1StreamWriterImplementation>(() => ImplementationFactory.CurrentFactory.CreateC1StreamWriter(stream, encoding, bufferSize));
        }



        /// <summary>
        /// Writes a string to the stream.
        /// </summary>
        /// <param name="value">String to write.</param>
        public override void Write(string value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// Writes a formatted string to the stream.
        /// </summary>
        /// <param name="format">String with formatting to write.</param>
        /// <param name="arg0">String format argument.</param>
        public override void Write(string format, object arg0)
        {
            _implementation.Implementation.Write(format, arg0);
        }



        /// <summary>
        /// Writes a formatted string to the stream.
        /// </summary>
        /// <param name="format">String with formatting to write.</param>
        /// <param name="arg0">String format argument.</param>
        /// <param name="arg1">String format argument.</param>
        public override void Write(string format, object arg0, object arg1)
        {
            _implementation.Implementation.Write(format, arg0, arg1);
        }



        /// <summary>
        /// Writes a formatted string to the stream.
        /// </summary>
        /// <param name="format">String with formatting to write.</param>
        /// <param name="arg0">String format argument.</param>
        /// <param name="arg1">String format argument.</param>
        /// <param name="arg2">String format argument.</param>
        public override void Write(string format, object arg0, object arg1, object arg2)
        {
            _implementation.Implementation.Write(format, arg0, arg1, arg2);
        }



        /// <summary>
        /// Writes a formatted string to the stream.
        /// </summary>
        /// <param name="format">String with formatting to write.</param>
        /// <param name="arg">String format arguments.</param>
        public override void Write(string format, params object[] arg)
        {
            _implementation.Implementation.Write(format, arg);
        }



        /// <summary>
        /// Writes a char to the stream.
        /// </summary>
        /// <param name="value">The char value to write.</param>
        public override void Write(char value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// Writes a char array to the stream.
        /// </summary>
        /// <param name="buffer">Char array to write.</param>
        public override void Write(char[] buffer)
        {
            _implementation.Implementation.Write(buffer);
        }



        /// <summary>
        /// Writes a char array to the stream.
        /// </summary>
        /// <param name="buffer">Char array to write.</param>
        /// <param name="index">Start index in the buffer to start writing from.</param>
        /// <param name="count">Number of chars to write.</param>
        public override void Write(char[] buffer, int index, int count)
        {
            _implementation.Implementation.Write(buffer, index, count);
        }



        /// <summary>
        /// Writes a boolean to the stream.
        /// </summary>
        /// <param name="value">Boolean value to write.</param>
        public override void Write(bool value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// Writes an integer to the stream.
        /// </summary>
        /// <param name="value">Integer value to write.</param>
        public override void Write(int value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// Writes an unsigned integer to the stream.
        /// </summary>
        /// <param name="value">Unsigned integer value to write</param>
        public override void Write(uint value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// Writes a long to the stream.
        /// </summary>
        /// <param name="value">Long value to write.</param>
        public override void Write(long value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// Writes an unsigned long to the stream.
        /// </summary>
        /// <param name="value">Unsigned long value to write.</param>
        public override void Write(ulong value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// Writes a float to the stream.
        /// </summary>
        /// <param name="value">Float value to write.</param>
        public override void Write(float value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// Writes a double to the stream.
        /// </summary>
        /// <param name="value">Double value to write.</param>
        public override void Write(double value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// Writes a decimal to the stream.
        /// </summary>
        /// <param name="value">Decimal value to write.</param>
        public override void Write(decimal value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// Write an object to the stream.
        /// </summary>
        /// <param name="value">Object value to write.</param>
        public override void Write(object value)
        {
            _implementation.Implementation.Write(value);
        }



        /// <summary>
        /// Writes a line break to the stream.
        /// </summary>
        public override void WriteLine()
        {
            _implementation.Implementation.WriteLine();
        }



        /// <summary>
        /// Writes a string with a line break to the stream.
        /// </summary>
        /// <param name="value">String value to write.</param>
        public override void WriteLine(string value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// Writes a string with a line break to the stream.
        /// </summary>
        /// <param name="format">String with formatting to write.</param>
        /// <param name="arg0">String format argument.</param>
        public override void WriteLine(string format, object arg0)
        {
            _implementation.Implementation.WriteLine(format, arg0);
        }



        /// <summary>
        /// Writes a string with a line break to the stream.
        /// </summary>
        /// <param name="format">String with formatting to write.</param>
        /// <param name="arg0">String format argument.</param>
        /// <param name="arg1">String format argument.</param>
        public override void WriteLine(string format, object arg0, object arg1)
        {
            _implementation.Implementation.WriteLine(format, arg0, arg1);
        }



        /// <summary>
        /// Writes a string with a line break to the stream.
        /// </summary>
        /// <param name="format">String with formatting to write.</param>
        /// <param name="arg0">String format argument.</param>
        /// <param name="arg1">String format argument.</param>
        /// <param name="arg2">String format argument.</param>
        public override void WriteLine(string format, object arg0, object arg1, object arg2)
        {
            _implementation.Implementation.WriteLine(format, arg0, arg1, arg2);
        }



        /// <summary>
        /// Writes a string with a line break to the stream.
        /// </summary>
        /// <param name="format">String with formatting to write.</param>
        /// <param name="arg">String format arguments.</param>
        public override void WriteLine(string format, params object[] arg)
        {
            _implementation.Implementation.WriteLine(format, arg);
        }



        /// <summary>
        /// Writes a char with a line break to the stream.
        /// </summary>
        /// <param name="value">Char value to write.</param>
        public override void WriteLine(char value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// Writes a char array with a line break to the stream.
        /// </summary>
        /// <param name="buffer">Char array to write.</param>
        public override void WriteLine(char[] buffer)
        {
            _implementation.Implementation.WriteLine(buffer);
        }



        /// <summary>
        /// Writes a char array with a line break to the stream.
        /// </summary>
        /// <param name="buffer">Char array to write.</param>
        /// <param name="index">Index in the char array to start writing from.</param>
        /// <param name="count">Number of chars to write.</param>
        public override void WriteLine(char[] buffer, int index, int count)
        {
            _implementation.Implementation.WriteLine(buffer, index, count);
        }



        /// <summary>
        /// Writes a bool with a line break to the stream.
        /// </summary>
        /// <param name="value">Bool value to write.</param>
        public override void WriteLine(bool value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// Writes an integer with a line break to the stream.
        /// </summary>
        /// <param name="value">Integer value to write.</param>
        public override void WriteLine(int value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// Writes an unsigned integer with a line break to the stream.
        /// </summary>
        /// <param name="value">Unsigned integer to write.</param>
        public override void WriteLine(uint value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// Writes a long with a line break to the stream.
        /// </summary>
        /// <param name="value">Long value to write.</param>
        public override void WriteLine(long value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// Writes an unsigned long with a line break to the stream.
        /// </summary>
        /// <param name="value">Unsigned long value to write.</param>
        public override void WriteLine(ulong value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// Writes a float with a line break to the stream.
        /// </summary>
        /// <param name="value">Float value to write.</param>
        public override void WriteLine(float value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// Writes a double with a line break to the stream.
        /// </summary>
        /// <param name="value">Double value to write.</param>
        public override void WriteLine(double value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// Writes a decimal with a line break to the stream.
        /// </summary>
        /// <param name="value">Decimal value to write.</param>
        public override void WriteLine(decimal value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// Writes an object with a line break to the stream.
        /// </summary>
        /// <param name="value">Object value to write.</param>
        public override void WriteLine(object value)
        {
            _implementation.Implementation.WriteLine(value);
        }



        /// <summary>
        /// Gets or sets the line break value.
        /// </summary>
        public override string NewLine
        {
            get
            {
                return _implementation.Implementation.NewLine;
            }
            set
            {
                _implementation.Implementation.NewLine = value;
            }
        }



        /// <summary>
        /// Gets the format provider used.
        /// </summary>
        public override IFormatProvider FormatProvider
        {
            get
            {
                return _implementation.Implementation.FormatProvider;
            }
        }



        /// <summary>
        /// Flushes the stream.
        /// </summary>
        public override void Flush()
        {
            _implementation.Implementation.Flush();
        }



        /// <summary>
        /// Gets or sets whether the stream is auto flushed or not
        /// </summary>
        public virtual bool AutoFlush
        {
            get
            {
                return _implementation.Implementation.AutoFlush;
            }
            set
            {
                _implementation.Implementation.AutoFlush = value;
            }
        }



        /// <summary>
        /// Closes the stream.
        /// </summary>
        public override void Close()
        {
            _implementation.Implementation.Close();
        }



        /// <summary>
        /// The base streawm.
        /// </summary>
        public virtual Stream BaseStream
        {
            get
            {
                return _implementation.Implementation.BaseStream;
            }
        }



        /// <summary>
        /// Gets the encoding used.
        /// </summary>
        public override Encoding Encoding
        {
            get
            {
                return _implementation.Implementation.Encoding;
            }
        }



#if LeakCheck
        private string stack = Environment.StackTrace;
        /// <summary>
        /// Desctructor.
        /// </summary>
        ~C1StreamWriter()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            Dispose(false);
        }
#endif

        /// <summary>
        /// Disposes the stream.
        /// </summary>
        /// <param name="disposing">True if the stream is disposing.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _implementation.DisposeImplementation();
            }
        }
    }
}
