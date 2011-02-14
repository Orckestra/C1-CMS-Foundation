using System;
using System.IO;
using System.Linq;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class IFileServices
    {
        /// <exclude />
        public static T GetFile<T>(string filePath)
            where T : class, IFile
        {
            string folderPath = Path.GetDirectoryName(filePath);
            string fileName = Path.GetFileName(filePath);

            var foundFile =
                (from file in DataFacade.GetData<T>()
                 where file.FolderPath.ToLower() == folderPath.ToLower() && file.FileName.ToLower() == fileName.ToLower()
                 select file).ToList();

            if (foundFile.Count == 0) throw new InvalidOperationException(string.Format("Missing file '{0}'", filePath));
            if (foundFile.Count > 1) throw new InvalidOperationException(string.Format("More than one file named '{0}'", filePath));

            return foundFile[0];
        }



        /// <exclude />
        public static T TryGetFile<T>(string filePath)
            where T : class, IFile
        {
            string folderPath = Path.GetDirectoryName(filePath);
            string fileName = Path.GetFileName(filePath);

            var foundFile =
                (from file in DataFacade.GetData<T>()
                 where file.FolderPath.ToLower() == folderPath.ToLower() && file.FileName.ToLower() == fileName.ToLower()
                 select file).ToList();

            if (foundFile.Count == 0) return null;
            if (foundFile.Count > 1) return null;

            return foundFile[0];
        }
    }
}
