using System.Collections.Generic;
using System.IO;


namespace Composite.Core.IO.Zip
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public interface IZipFileSystem
	{
        /// <exclude />
        bool ContainsFile(string filePath);

        /// <exclude />
        bool ContainsDirectory(string directoryName);

        /// <exclude />
        IEnumerable<string> GetFilenames();

        /// <exclude />
        IEnumerable<string> GetFilenames(string directoryName);

        /// <exclude />
        IEnumerable<string> GetDirectoryNames();

        /// <exclude />
        Stream GetFileStream(string filename);

        /// <exclude />
        void WriteFileToDisk(string filename, string targetFilename);
	}
}
