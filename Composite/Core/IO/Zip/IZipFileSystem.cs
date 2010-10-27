using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Core.NewIO;

namespace Composite.Core.IO.Zip
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public interface IZipFileSystem
	{
        bool ContainsFile(string filePath);
        bool ContainsDirectory(string directoryName);
        IEnumerable<string> GetFilenames();
        IEnumerable<string> GetFilenames(string directoryName);
        IEnumerable<string> GetDirectoryNames();
        System.IO.Stream GetFileStream(string filename);
        void WriteFileToDisk(string filename, string targetFilename);
	}
}
