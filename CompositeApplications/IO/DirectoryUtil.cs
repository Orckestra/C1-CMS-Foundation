using System.IO;
using System.Text;
using Composite.Logging;


namespace Composite.IO
{
    public static class DirectoryUtil
    {
        /// <summary>
        /// Ensures that the directories in the path exists and if they dont they will be created
        /// </summary>
        public static void EnsurePath(string path)
        {
            string directory = Path.GetDirectoryName(path);

            string[] directories = directory.Split(Path.DirectorySeparatorChar);

            if (directories.Length == 2) return;

            string currentPath = string.Format("{0}{1}", directories[0], Path.DirectorySeparatorChar);

            for (int i = 1; i < directories.Length; ++i)
            {
                currentPath = string.Format("{0}{1}{2}", currentPath, directories[i], Path.DirectorySeparatorChar);

                if (Directory.Exists(currentPath) == false)
                {
                    Directory.CreateDirectory(currentPath);
                }                
            }
        }



        /// <summary>
        /// Delete a file. If the deleteEmptyDirectoresRecursively is true all empty directories
        /// from buttom up are also deleted.
        /// </summary>
        /// <param name="path"></param>
        /// <param name="deleteEmptyDirectoresRecursively"></param>
        public static void DeleteFile(string path, bool deleteEmptyDirectoresRecursively)
        {
            LoggingService.LogVerbose( "DirectoryUtil", string.Format("Deleting file '{0}'", path) );
            File.Delete(path);

            if (deleteEmptyDirectoresRecursively == true)
            {
                string directory = Path.GetDirectoryName(path);

                string[] directories = directory.Split(Path.DirectorySeparatorChar);

                for (int i = directories.Length; i > 1; --i)
                {
                    StringBuilder stringBuilder = new StringBuilder();

                    for (int j = 0; j < i; ++j)
                    {
                        stringBuilder.Append(directories[j]);
                        stringBuilder.Append(Path.DirectorySeparatorChar);
                    }

                    string currentPath = stringBuilder.ToString();
                    if (Directory.GetFiles(currentPath).Length == 0)
                    {
                        LoggingService.LogVerbose( "DirectoryUtil", string.Format("Deleting directory '{0}'", currentPath) );
                        Directory.Delete(currentPath);
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }



        /// <summary>
        /// Deletes all files recursively leaving all sub directories.
        /// </summary>
        /// <param name="directoryPath"></param>
        public static void DeleteFilesRecursively(string directoryPath)
        {
            foreach (string file in Directory.GetFiles(directoryPath))
            {
                File.Delete(file);
            }

            foreach (string directory in Directory.GetDirectories(directoryPath))
            {
                DeleteFilesRecursively(directory);
            }
        }
    }
}
