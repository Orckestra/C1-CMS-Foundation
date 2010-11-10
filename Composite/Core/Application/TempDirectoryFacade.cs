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
        public static string CreateTempDirectory()
        {
            string directory = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TempDirectory), Guid.NewGuid().ToString());

            C1Directory.CreateDirectory(directory);

            return directory;
        }


        public static void OnApplicationStart()
        {
            string tempDirectoryName = PathUtil.Resolve(GlobalSettingsFacade.TempDirectory);

            if (C1Directory.Exists(tempDirectoryName) == false)
            {
                C1Directory.CreateDirectory(tempDirectoryName);
            }
        }


        public static void OnApplicationEnd()
        {
            string tempDirectoryName = PathUtil.Resolve(GlobalSettingsFacade.TempDirectory);

            if (C1Directory.Exists(tempDirectoryName) == true)
            {
                foreach (string filename in C1Directory.GetFiles(tempDirectoryName))
                {
                    try
                    {
                        if (C1File.GetCreationTime(filename) > DateTime.Now + TimeSpan.FromHours(24.0))
                        {
                            C1File.Delete(filename);
                        }
                    }
                    catch (Exception)
                    {
                    }
                }

                foreach (string directoryPath in C1Directory.GetDirectories(tempDirectoryName))
                {
                    try
                    {

                        if (C1Directory.GetCreationTime(directoryPath) > DateTime.Now + TimeSpan.FromHours(24.0))
                        {
                            C1Directory.Delete(directoryPath, true);
                        }
                    }
                    catch (Exception)
                    {
                    }
                }
            }
        }
    }
}
