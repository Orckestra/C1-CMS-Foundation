using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace Composite.IO.Zip
{
	public interface IZipFileSystem
	{
        bool ContainsFile(string filePath);
        bool ContainsDirectory(string directoryName);
        IEnumerable<string> GetFilenames();
        IEnumerable<string> GetFilenames(string directoryName);
        IEnumerable<string> GetDirectoryNames();
        Stream GetFileStream(string filename);
        void WriteFileToDisk(string filename, string targetFilename);
	}
}
