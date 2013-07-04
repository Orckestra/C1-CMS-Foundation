using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using ICSharpCode.SharpZipLib.Zip;


namespace Composite.Core.IO.Zip
{
    internal sealed class ZipFileSystem : IZipFileSystem
    {
        private Dictionary<string, ZipEntry> _existingFilenamesInZip = new Dictionary<string, ZipEntry>();
        private string ZipFilename { get; set; }


        public ZipFileSystem(string zipFilename)
        {
            if (string.IsNullOrEmpty(zipFilename)) throw new ArgumentNullException("zipFilename");

            this.ZipFilename = zipFilename;

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
            foreach (string filename in _existingFilenamesInZip.Values.Where(f => f.IsDirectory == false).Select(f => f.Name))
            {
                yield return string.Format("~/{0}", filename);
            }
        }



        public IEnumerable<string> GetFilenames(string directoryName)
        {
            directoryName = directoryName.Replace('\\', '/');

            foreach (string filename in _existingFilenamesInZip.Values.Where(f => f.IsDirectory == false).Select(f => f.Name))
            {
                string resultFilename = string.Format("~/{0}", filename);

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
            string parstedFilename = ParseFilename(filename);

            if (_existingFilenamesInZip.ContainsKey(parstedFilename) == false) throw new ArgumentException(string.Format("The file {0} does not exist in the zip", filename));

            ZipInputStream zipInputStream = new ZipInputStream(C1File.Open(this.ZipFilename, FileMode.Open, FileAccess.Read));

            ZipEntry zipEntry;
            while ((zipEntry = zipInputStream.GetNextEntry()) != null)
            {
                if (zipEntry.Name == parstedFilename) break;
            }

            return zipInputStream;
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
            using (Stream stream = GetFileStream(filename))
            {
                using (C1FileStream fileStream = new C1FileStream(targetFilename, FileMode.Create, FileAccess.Write))
                {
                    byte[] buffer = new byte[4096];

                    int readBytes;
                    while ((readBytes = stream.Read(buffer, 0, 4096)) > 0)
                    {
                        fileStream.Write(buffer, 0, readBytes);
                    }
                }
            }
        }



        private void Initialize()
        {
            using (C1FileStream fileStream = C1File.Open(this.ZipFilename, FileMode.Open, FileAccess.Read))
            {
                using (ZipInputStream zipInputStream = new ZipInputStream(fileStream))
                {
                    ZipEntry zipEntry;
                    while ((zipEntry = zipInputStream.GetNextEntry()) != null)
                    {
                        _existingFilenamesInZip.Add(zipEntry.Name, zipEntry);
                    }
                }
            }
        }



        private static string ParseFilename(string filename)
        {
            if (filename.StartsWith("~") == false) throw new ArgumentException("filename should start with a '~/' or '~\\'");

            filename = filename.Remove(0, 1);
            filename = filename.Replace('\\', '/');

            if (filename.StartsWith("/") == false) throw new ArgumentException("filename should start with a '~/' or '~\\'");

            filename = filename.Remove(0, 1);

            return filename;
        }
    }
}
