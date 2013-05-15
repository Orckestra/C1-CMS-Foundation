using System.IO;
using System.Web.Hosting;
using Composite.Core.IO;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.Streams;


namespace Composite.Data.Types
{
    /// <summary>
    /// Extension methods for IFile
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class IFileExtensions
    {
        /// <exclude />
        public static Stream GetReadStream(this IFile file)
        {
            IFileStreamManager manager = FileStreamManagerLocator.GetFileStreamManager(file.GetType());

            return manager.GetReadStream(file);
        }



        /// <exclude />
        public static Stream GetNewWriteStream(this IFile file)
        {
            IFileStreamManager manager = FileStreamManagerLocator.GetFileStreamManager(file.GetType());

            return manager.GetNewWriteStream(file);
        }



        /// <exclude />
        public static void SubscribeOnChanged(this IFile file, OnFileChangedDelegate handler)
        {
            IFileStreamManager manager = FileStreamManagerLocator.GetFileStreamManager(file.GetType());

            manager.SubscribeOnFileChanged(file, handler);
        }

        /// <summary>
        /// Returns all text from the stream associated with the provided IFile
        /// </summary>
        public static string ReadAllText(this IFile file)
        {
            using (Stream fileStream = GetReadStream(file))
            {
                using (C1StreamReader sr = new C1StreamReader(fileStream))
                {
                    return sr.ReadToEnd();
                }
            }
        }



        /// <summary>
        /// Replaces the all files content with some new content
        /// </summary>
        /// <param name="file"></param>
        /// <param name="newContent"></param>
        public static void SetNewContent(this IFile file, string newContent)
        {
            using (C1StreamWriter sw = new C1StreamWriter(GetNewWriteStream(file)))
            {
                sw.Write(newContent);
            }
        }

        internal static string GetFilePath(this IFile file)
        {
            return (file is FileSystemFileBase) ? (file as FileSystemFileBase).SystemPath : null;
        }

        internal static string GetRelativeFilePath(this IFile file)
        {
            string filePath = GetFilePath(file);
            if (filePath == null) return null;

            return filePath.StartsWith(PathUtil.BaseDirectory) ? filePath.Substring(PathUtil.BaseDirectory.Length) : filePath;
        }
    }
}