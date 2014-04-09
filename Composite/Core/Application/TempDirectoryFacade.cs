using System;
using System.IO;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.WebClient;


namespace Composite.Core.Application
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class TempDirectoryFacade
    {
        private static TimeSpan TemporaryFileExpirationTimeSpan = TimeSpan.FromHours(24.0);

        /// <exclude />
        public static string CreateTempDirectory()
        {
            string directory = Path.Combine(TempDirectoryPath, UrlUtils.CompressGuid(Guid.NewGuid()));

            C1Directory.CreateDirectory(directory);

            return directory;
        }


        internal static string GetTempFileName(string extension)
        {
            return Path.Combine(TempDirectoryPath, UrlUtils.CompressGuid(Guid.NewGuid()).Substring(0, 8)) + (extension ?? "");
        }

        /// <exclude />
        public static void OnApplicationStart()
        {
            string tempDirectoryName = TempDirectoryPath;

            if (!C1Directory.Exists(tempDirectoryName))
            {
                C1Directory.CreateDirectory(tempDirectoryName);
            }
        }


        /// <exclude />
        public static void OnApplicationEnd()
        {
            // Deleting everything that is older than 24 hours
            string tempDirectoryName = TempDirectoryPath;

            if (!C1Directory.Exists(tempDirectoryName))
            {
                return;
            }

            

            foreach (string filename in C1Directory.GetFiles(tempDirectoryName))
            {
                try
                {
                    if (DateTime.Now > C1File.GetLastWriteTime(filename) + TemporaryFileExpirationTimeSpan)
                    {
                        C1File.Delete(filename);
                    }
                }
                catch 
                {
                }
            }

            foreach (string directoryPath in C1Directory.GetDirectories(tempDirectoryName))
            {
                try
                {
                    if (DateTime.Now > C1Directory.GetCreationTime(directoryPath) + TemporaryFileExpirationTimeSpan)
                    {
                        C1Directory.Delete(directoryPath, true);
                    }
                }
                catch 
                {
                }
            }
        }

        internal static string TempDirectoryPath
        {
            get { return PathUtil.Resolve(GlobalSettingsFacade.TempDirectory); }
        }
    }
}
