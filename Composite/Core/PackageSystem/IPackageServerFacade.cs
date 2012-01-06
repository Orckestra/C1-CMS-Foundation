using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;


namespace Composite.Core.PackageSystem
{
    internal interface IPackageServerFacade
    {
        ServerUrlValidationResult ValidateServerUrl(string packageServerUrl);
        IEnumerable<PackageDescription> GetPackageDescriptions(string packageServerUrl, Guid installationId, CultureInfo userCulture);
        string GetEulaText(string packageServerUrl, Guid eulaId, CultureInfo userCulture);
        Stream GetInstallFileStream(string packageFileDownloadUrl);

        void RegisterPackageInstallationCompletion(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp);
        void RegisterPackageInstallationFailure(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp, string exceptionString);

        void RegisterPackageUninstall(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp);

        void ClearCache();
    }
}
