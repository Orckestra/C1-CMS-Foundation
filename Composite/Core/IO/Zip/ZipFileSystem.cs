using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;

namespace Composite.Core.IO.Zip
{
    internal sealed class ZipFileSystem : IZipFileSystem
    {
        private const int CopyBufferSize = 4096;

        private readonly HashSet<string> _entryNames = new HashSet<string>();
        private string ZipFilename { get; set; }

        public ZipFileSystem(string zipFilename)
        {
            Verify.ArgumentNotNullOrEmpty(zipFilename, "zipFilename");

            ZipFilename = zipFilename;

            Initialize();
        }



        public bool ContainsFile(string filename)
        {
            filename = filename.Replace('\\', '/');

            return GetFilenames().Any(f => f.Equals(filename, StringComparison.OrdinalIgnoreCase));
        }



        public bool ContainsDirectory(string directoryName)
        {
            directoryName = directoryName.Replace('\\', '/');

            return GetDirectoryNames().Any(f => f.Equals(directoryName, StringComparison.OrdinalIgnoreCase));
        }



        public IEnumerable<string> GetFilenames()
        {
            foreach (var filename in _entryNames.Where(s => !s.EndsWith("/")))
            {
                yield return $"~/{filename}";
            }
        }



        public IEnumerable<string> GetFilenames(string directoryName)
        {
            directoryName = directoryName.Replace('\\', '/');

            foreach (var filename in GetFilenames())
            {
                if (filename.StartsWith(directoryName))
                {
                    yield return filename;
                }
            }
        }



        public IEnumerable<string> GetDirectoryNames()
        {
            foreach (string directoryName in _entryNames.Where(e => e.EndsWith("/")))
            {
                yield return $"~/{directoryName}";
            }
        }



        /// <summary>
        ///
        /// </summary>
        /// <param name="filename">
        /// Format:
        ///     ~\Filename.txt
        ///     ~\Directory1\Directory2\Filename.txt
        ///     ~/Filename.txt
        ///     ~/Directory1/Directory2/Filename.txt
        /// </param>
        /// <returns></returns>
        public Stream GetFileStream(string filename)
        {
            var parstedFilename = ParseFilename(filename);

            if (!_entryNames.Contains(parstedFilename))
            {
                string note = "";

                var entryWithAnotherCasing = _entryNames
                    .FirstOrDefault(en => en.Equals(parstedFilename, StringComparison.InvariantCultureIgnoreCase));

                if (entryWithAnotherCasing != null)
                {
                    note =  $" There's another entry with different casing '{entryWithAnotherCasing}'.";
                }

                throw new ArgumentException($"The file '{filename}' does not exist in the zip." + note);
            }

            var zipArchive = new ZipArchive(C1File.Open(ZipFilename, FileMode.Open, FileAccess.Read));

            var entryPath = filename.Substring(2).Replace('\\', '/');

            var entry = zipArchive.GetEntry(entryPath);
            if (entry == null)
            {
                zipArchive.Dispose();

                throw new InvalidOperationException($"Entry '{entryPath}' not found");
            }
            
            return new StreamWrapper(entry.Open(), () => zipArchive.Dispose());
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="filename">
        /// Format:
        ///     ~\Filename.txt
        ///     ~\Directory1\Directory2\Filename.txt
        ///     ~/Filename.txt
        ///     ~/Directory1/Directory2/Filename.txt
        /// </param>
        /// <param name="targetFilename">
        /// </param>
        /// <returns></returns>
        public void WriteFileToDisk(string filename, string targetFilename)
        {
            using (var stream = GetFileStream(filename))
            {
                using (var fileStream = new C1FileStream(targetFilename, FileMode.Create, FileAccess.Write))
                {
                    var buffer = new byte[CopyBufferSize];

                    int readBytes;
                    while ((readBytes = stream.Read(buffer, 0, CopyBufferSize)) > 0)
                    {
                        fileStream.Write(buffer, 0, readBytes);
                    }
                }
            }
        }



        private void Initialize()
        {
            using (var fileStream = C1File.Open(ZipFilename, FileMode.Open, FileAccess.Read))
            {
                using (var zipArchive = new ZipArchive(fileStream))
                {
                    foreach (var entry in zipArchive.Entries)
                    {
                        _entryNames.Add(entry.FullName);
                    }
                }
            }
        }



        private static string ParseFilename(string filename)
        {
            if (!filename.StartsWith("~"))
            {
                throw new ArgumentException("filename should start with a '~/' or '~\\'");
            }

            filename = filename.Remove(0, 1);
            filename = filename.Replace('\\', '/');

            if (!filename.StartsWith("/"))
            {
                throw new ArgumentException("filename should start with a '~/' or '~\\'");
            }

            filename = filename.Remove(0, 1);

            return filename;
        }

        private class StreamWrapper : Stream, IDisposable
        {
            private readonly Stream _innerStream;
            private readonly Action _disposeAction;

            public StreamWrapper(Stream innerStream, Action disposeAction)
            {
                _innerStream = innerStream;
                _disposeAction = disposeAction;
            }


            public override void Flush()
            {
                _innerStream.Flush();
            }

            public override long Seek(long offset, SeekOrigin origin)
            {
                return _innerStream.Seek(offset, origin);
            }

            public override void SetLength(long value)
            {
                _innerStream.SetLength(value);
            }

            public override int Read(byte[] buffer, int offset, int count)
            {
                return _innerStream.Read(buffer, offset, count);
            }

            public override void Write(byte[] buffer, int offset, int count)
            {
                _innerStream.Write(buffer, offset, count);
            }

            public override bool CanRead => _innerStream.CanRead;
            public override bool CanSeek => _innerStream.CanSeek;
            public override bool CanWrite => _innerStream.CanWrite;
            public override long Length => _innerStream.Length;

            public override long Position
            {
                get {  return _innerStream.Position; }
                set { _innerStream.Position = value; }
            } 


            void IDisposable.Dispose()
            {
                _innerStream.Dispose();

                _disposeAction();
#if LeakCheck
                GC.SuppressFinalize(this);
#endif
            }

#if LeakCheck
            private string stack = Environment.StackTrace;
            /// <exclude />
            ~StreamWrapper()
            {
                Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            }
#endif
        }
    }
}
