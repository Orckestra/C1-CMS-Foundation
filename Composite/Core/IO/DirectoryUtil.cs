using System.IO;
using System.Text;
using Composite.Core.Logging;


namespace Composite.Core.IO
{
    internal static class DirectoryUtil
    {
        /// <summary>
        /// Ensures that the directories in the path exists and if they dont they will be created
        /// </summary>
        public static void EnsurePath(string filePath)
        {
            string directory = Path.GetDirectoryName(filePath);

            EnsureDirectoryExists(directory);
        }

        /// <summary>
        /// Ensures that the directory exists 
        /// </summary>
        public static void EnsureDirectoryExists(string directory)
        {
            string[] directories = directory.Split(Path.DirectorySeparatorChar);

            if (directories.Length == 2) return;

            string currentPath = string.Format("{0}{1}", directories[0], Path.DirectorySeparatorChar);

            for (int i = 1; i < directories.Length; ++i)
            {
                currentPath = string.Format("{0}{1}{2}", currentPath, directories[i], Path.DirectorySeparatorChar);

                if (currentPath.ToLower().StartsWith(PathUtil.BaseDirectory.ToLower())) // don't touch dirs outside our own folder!
                {
                    if (C1Directory.Exists(currentPath) == false)
                    {
                        C1Directory.CreateDirectory(currentPath);
                    }
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
            LoggingService.LogVerbose("DirectoryUtil", string.Format("Deleting file '{0}'", path));
            C1File.Delete(path);

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
                    if (C1Directory.GetFiles(currentPath).Length == 0)
                    {
                        LoggingService.LogVerbose("DirectoryUtil", string.Format("Deleting directory '{0}'", currentPath));
                        C1Directory.Delete(currentPath);
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
            foreach (string file in C1Directory.GetFiles(directoryPath))
            {
                C1File.Delete(file);
            }

            foreach (string directory in C1Directory.GetDirectories(directoryPath))
            {
                DeleteFilesRecursively(directory);
            }
        }
    }
}
