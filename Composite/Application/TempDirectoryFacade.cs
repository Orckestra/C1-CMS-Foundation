using System;
using System.IO;
using Composite.GlobalSettings;
using Composite.IO;


namespace Composite.Application
{
    public static class TempDirectoryFacade
    {
        public static string CreateTempDirectory()
        {
            string directory = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TempDirectory), Guid.NewGuid().ToString());

            Directory.CreateDirectory(directory);

            return directory;
        }


        public static void OnApplicationStart()
        {
            string tempDirectoryName = PathUtil.Resolve(GlobalSettingsFacade.TempDirectory);

            if (Directory.Exists(tempDirectoryName) == false)
            {
                Directory.CreateDirectory(tempDirectoryName);
            }
        }


        public static void OnApplicationEnd()
        {
            string tempDirectoryName = PathUtil.Resolve(GlobalSettingsFacade.TempDirectory);

            if (Directory.Exists(tempDirectoryName) == true)
            {
                foreach (string filename in Directory.GetFiles(tempDirectoryName))
                {
                    try
                    {
                        if (File.GetCreationTime(filename) > DateTime.Now + TimeSpan.FromHours(24.0))
                        {
                            File.Delete(filename);
                        }
                    }
                    catch (Exception)
                    {
                    }
                }

                foreach (string directoryPath in Directory.GetDirectories(tempDirectoryName))
                {
                    try
                    {

                        if (Directory.GetCreationTime(directoryPath) > DateTime.Now + TimeSpan.FromHours(24.0))
                        {
                            Directory.Delete(directoryPath, true);
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
