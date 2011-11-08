using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;


namespace Composite.Core.PackageSystem
{
    internal interface IPackageServerFacade
    {
        ServerUrlValidationResult ValidateServerUrl(string packageServerUrl);
        IEnumerable<PackageDescription> GetAddOnDescriptions(string packageServerUrl, Guid installationId, CultureInfo userCulture);
        string GetEulaText(string packageServerUrl, Guid eulaId, CultureInfo userCulture);
        Stream GetInstallFileStream(string packageFileDownloadUrl);

        void RegisterAddonInstallationCompletion(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp);
        void RegisterAddonInstallationFailure(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp, string exceptionString);

        void RegisterAddOnUninstall(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp);

        void ClearCache();
    }
}
