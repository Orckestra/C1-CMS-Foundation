using System;
using System.IO;
using Composite.Core.Configuration;
using Composite.Core.IO;


namespace Composite.Core.Application
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class TempDirectoryFacade
    {
        /// <exclude />
        public static string CreateTempDirectory()
        {
            string directory = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TempDirectory), Guid.NewGuid().ToString());

            C1Directory.CreateDirectory(directory);

            return directory;
        }


        /// <exclude />
        public static void OnApplicationStart()
        {
            string tempDirectoryName = PathUtil.Resolve(GlobalSettingsFacade.TempDirectory);

            if (!C1Directory.Exists(tempDirectoryName))
            {
                C1Directory.CreateDirectory(tempDirectoryName);
            }
        }


        /// <exclude />
        public static void OnApplicationEnd()
        {
            // Deleting everything this is older than 24 hours
            string tempDirectoryName = PathUtil.Resolve(GlobalSettingsFacade.TempDirectory);

            if (!C1Directory.Exists(tempDirectoryName))
            {
                return;
            }

            var temporaryFileExpirationSpan = TimeSpan.FromHours(24.0);

            foreach (string filename in C1Directory.GetFiles(tempDirectoryName))
            {
                try
                {
                    if (DateTime.Now > C1File.GetLastWriteTime(filename) + temporaryFileExpirationSpan)
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
                    if (DateTime.Now > C1Directory.GetCreationTime(directoryPath) + temporaryFileExpirationSpan)
                    {
                        C1Directory.Delete(directoryPath, true);
                    }
                }
                catch 
                {
                }
            }
        }
    }
}
