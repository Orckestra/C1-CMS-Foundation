using System;
using System.Collections.Generic;
using System.Globalization;


namespace Composite.Core.PackageSystem
{
    internal interface IPackageServerFacade
    {
        ServerUrlValidationResult ValidateServerUrl(string packageServerUrl);
        IEnumerable<PackageDescription> GetAddOnDescriptions(string packageServerUrl, Guid installationId, CultureInfo userCulture);
        string GetEulaText(string packageServerUrl, Guid eulaId, CultureInfo userCulture);
        System.IO.Stream GetInstallFileStream(string packageFileDownloadUrl);

        bool RequestLicenseUpdate(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp);
        void RegisterAddonInstallationCompletion(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp);
        void RegisterAddonInstallationFailure(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp, string exceptionString);

        void RegisterAddOnUninstall(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp);

        void ClearCache();
    }
}
