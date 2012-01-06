using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using Composite.Core.IO;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.Core.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum ServerUrlValidationResult
    {
        /// <exclude />
        Http = 0,

        /// <exclude />
        Https = 1,

        /// <exclude />
        Invalid = 2
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class PackageServerFacade 
	{
        private static IPackageServerFacade _packageServerFacade;


        /// <exclude />
        static PackageServerFacade()
        {
            string testFilePath = Path.Combine(PathUtil.Resolve(PathUtil.BaseDirectory), "App_Data/Composite/PackageDescriptions.xml");
            if (C1File.Exists(testFilePath) == true)
            {
                _packageServerFacade = new PackageServerFacadeLocalMock(testFilePath);
            }
            else
            {
                _packageServerFacade = new PackageServerFacadeImpl();
            }
        }



        internal static IPackageServerFacade Implementation { get { return _packageServerFacade; } set { _packageServerFacade = value; } }

        /// <summary>
        /// Connects to the server using either https or http and 
        /// checks to see if it supports the needed services
        /// </summary>
        /// <param name="packageServerUrl">
        /// Cleaned url (ex: www.composite.net)
        /// </param>
        /// <returns>
        /// </returns>
        public static ServerUrlValidationResult ValidateServerUrl(string packageServerUrl)
        {
            return _packageServerFacade.ValidateServerUrl(packageServerUrl);
        }



        /// <summary>
        /// Given a cleaned url, returns a series of PackageDescriptions 
        /// </summary>
        /// <param name="packageServerUrl">
        /// Cleaned url (ex: www.composite.net)
        /// </param>
        /// <param name="installationId"></param>
        /// <param name="userCulture"></param>
        /// <returns></returns>
        public static IEnumerable<PackageDescription> GetPackageDescriptions(string packageServerUrl, Guid installationId, CultureInfo userCulture)
        {
            return _packageServerFacade.GetPackageDescriptions(packageServerUrl, installationId, userCulture);
        }



        // Overload
        /// <exclude />
        public static IEnumerable<PackageDescription> GetAllPackageDescriptions(Guid installationId, CultureInfo userCulture)
        {
            List<IPackageServerSource> packageServerSources = DataFacade.GetData<IPackageServerSource>().ToList();

            foreach (IPackageServerSource packageServerSource in packageServerSources)
            {
                foreach (PackageDescription packageDescription in GetPackageDescriptions(packageServerSource.Url, installationId, userCulture))
                {
                    yield return packageDescription;
                }
            }
        }



        /// <exclude />
        public static string GetEulaText(string packageServerUrl, Guid eulaId, CultureInfo userCulture)
        {
            return _packageServerFacade.GetEulaText(packageServerUrl, eulaId, userCulture);
        }



        /// <exclude />
        public static Stream GetInstallFileStream(string packageFileDownloadUrl)
        {
            return _packageServerFacade.GetInstallFileStream(packageFileDownloadUrl);
        }



        /// <exclude />
        public static void RegisterPackageInstallationCompletion(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp)
        {
            _packageServerFacade.RegisterPackageInstallationCompletion(packageServerUrl, installationId, packageId, localUserName, localUserIp);
        }



        /// <exclude />
        public static void RegisterPackageInstallationFailure(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp, string exceptionString)
        {
            _packageServerFacade.RegisterPackageInstallationFailure(packageServerUrl, installationId, packageId, localUserName, localUserIp, exceptionString);
        }



        /// <exclude />
        public static void RegisterPackageUninstall(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp)
        {
            _packageServerFacade.RegisterPackageUninstall(packageServerUrl, installationId, packageId, localUserName, localUserIp);
        }



        /// <exclude />
        public static void ClearServerCache()
        {
            _packageServerFacade.ClearCache();
        }
	}
}
