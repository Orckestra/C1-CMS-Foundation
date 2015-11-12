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

        private readonly Dictionary<string, ZipArchiveEntry> _existingFilenamesInZip = new Dictionary<string, ZipArchiveEntry>();
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
            foreach (var filename in _existingFilenamesInZip.Values.Select(f => f.Name).Where(s => !s.EndsWith("/")))
            {
                yield return string.Format("~/{0}", filename);
            }
        }



        public IEnumerable<string> GetFilenames(string directoryName)
        {
            directoryName = directoryName.Replace('\\', '/');

            foreach (var filename in _existingFilenamesInZip.Values.Select(f => f.Name).Where(s => !s.EndsWith("/")))
            {
                var resultFilename = string.Format("~/{0}", filename);

                if (resultFilename.StartsWith(directoryName))
                {
                    yield return resultFilename;
                }
            }
        }



        public IEnumerable<string> GetDirectoryNames()
        {
            foreach (string directoryName in _existingFilenamesInZip.Values.Where(f => f.IsDirectory).Select(f => f.Name))
            {
                yield return string.Format("~/{0}", directoryName);
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

            if (!_existingFilenamesInZip.ContainsKey(parstedFilename))
            {
                throw new ArgumentException(string.Format("The file {0} does not exist in the zip", filename));
            }

            var zipArchive = new ZipArchive(C1File.Open(ZipFilename, FileMode.Open, FileAccess.Read));

            return zipArchive.GetEntry(filename).Open();
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
                        _existingFilenamesInZip.Add(entry.FullName, entry);
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
    }
}
