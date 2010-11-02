using System;
using System.Collections.Generic;
using System.Globalization;
using System.ServiceModel;
using Composite.Core.Logging;
using Composite.Core.PackageSystem.Foundation;
using Composite.Core.PackageSystem.WebServiceClient;


namespace Composite.Core.PackageSystem
{
    internal sealed class PackageServerFacadeImpl : IPackageServerFacade
    {
        private PackageServerFacadeImplCache _packageServerFacadeImplCache = new PackageServerFacadeImplCache();


        public ServerUrlValidationResult ValidateServerUrl(string packageServerUrl)
        {
            try
            {
                BasicHttpBinding basicHttpBinding = new BasicHttpBinding();
                basicHttpBinding.Security.Mode = BasicHttpSecurityMode.Transport;
                basicHttpBinding.MaxReceivedMessageSize = int.MaxValue;
                PackagesSoapClient client = new PackagesSoapClient(basicHttpBinding, new EndpointAddress(string.Format("https://{0}", packageServerUrl)));

                client.IsOperational();
                return ServerUrlValidationResult.Https;
            }
            catch (Exception)
            {
            }

            try
            {
                BasicHttpBinding basicHttpBinding = new BasicHttpBinding();
                basicHttpBinding.MaxReceivedMessageSize = int.MaxValue;
                PackagesSoapClient client = new PackagesSoapClient(new BasicHttpBinding(), new EndpointAddress(string.Format("http://{0}", packageServerUrl)));

                client.IsOperational();
                return ServerUrlValidationResult.Http;
            }
            catch (Exception)
            {
            }

            return ServerUrlValidationResult.Invalid;
        }



        public IEnumerable<PackageDescription> GetAddOnDescriptions(string packageServerUrl, Guid installationId, CultureInfo userCulture)
        {
            List<PackageDescription> packageDescriptions = _packageServerFacadeImplCache.GetCachedAddOnDescriptions(packageServerUrl, installationId, userCulture);
            if (packageDescriptions != null) return packageDescriptions;

            PackageDescriptor[] packageDescriptors = null;
            try
            {
                PackagesSoapClient client = CreateClient(packageServerUrl);

                packageDescriptors = client.GetPackageList(installationId, userCulture.ToString());
            }
            catch (Exception ex)
            {
                LoggingService.LogError("AddOnServerFacade", ex);
            }

            packageDescriptions = new List<PackageDescription>();
            if (packageDescriptors != null)
            {
                foreach (PackageDescriptor packageDescriptor in packageDescriptors)
                {
                    if (ValidatePackageDescriptor(packageDescriptor) == true)
                    {
                        packageDescriptions.Add(new PackageDescription
                        {
                            PackageFileDownloadUrl = packageDescriptor.PackageFileDownloadUrl,
                            PackageVersion = packageDescriptor.PackageVersion,
                            Description = packageDescriptor.Description,
                            EulaId = packageDescriptor.EulaId,
                            GroupName = packageDescriptor.GroupName,
                            Id = packageDescriptor.Id,
                            InstallationRequireLicenseFileUpdate = packageDescriptor.InstallationRequireLicenseFileUpdate,
                            IsFree = packageDescriptor.IsFree,
                            IsTrial = packageDescriptor.IsTrial,
                            LicenseRuleId = packageDescriptor.LicenseId,
                            MaxCompositeVersionSupported = packageDescriptor.MaxCompositeVersionSupported,
                            MinCompositeVersionSupported = packageDescriptor.MinCompositeVersionSupported,
                            Name = packageDescriptor.Name,
                            PriceAmmount = packageDescriptor.PriceAmmount,
                            PriceCurrency = packageDescriptor.PriceCurrency,
                            ReadMoreUrl = packageDescriptor.ReadMoreUrl,
                            TechicalDetails = packageDescriptor.TechicalDetails,
                            TrialPeriodDays = packageDescriptor.TrialPeriodDays,
                            UpgradeAgreementMandatory = packageDescriptor.UpgradeAgreementMandatory,
                            Vendor = packageDescriptor.Author
                        });
                    }
                }

                _packageServerFacadeImplCache.AddCachedAddOnDescriptions(packageServerUrl, installationId, userCulture, packageDescriptions);
            }            

            return packageDescriptions;
        }



        public string GetEulaText(string packageServerUrl, Guid eulaId, CultureInfo userCulture)
        {
            PackagesSoapClient client = CreateClient(packageServerUrl);

            string eulaText = client.GetEulaText(eulaId, userCulture.ToString());

            return eulaText;
        }



        public System.IO.Stream GetInstallFileStream(string packageFileDownloadUrl)
        {
            LoggingService.LogVerbose("AddOnServerFacade", string.Format("Downloading file: {0}", packageFileDownloadUrl));

            System.Net.WebClient client = new System.Net.WebClient();
            return client.OpenRead(packageFileDownloadUrl);
        }



        public bool RequestLicenseUpdate(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp)
        {
            PackagesSoapClient client = CreateClient(packageServerUrl);

            return client.RequestLicenseUpdate(installationId, packageId, localUserName, localUserIp);
        }



        public void RegisterAddonInstallationCompletion(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp)
        {
            PackagesSoapClient client = CreateClient(packageServerUrl);

            client.RegisterPackageInstallationCompletion(installationId, packageId, localUserName, localUserIp);
        }



        public void RegisterAddonInstallationFailure(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp, string exceptionString)
        {
            PackagesSoapClient client = CreateClient(packageServerUrl);

            client.RegisterPackageInstallationFailure(installationId, packageId, localUserName, localUserIp, exceptionString);
        }



        public void RegisterAddOnUninstall(string packageServerUrl, Guid installationId, Guid packageId, string localUserName, string localUserIp)
        {
            PackagesSoapClient client = CreateClient(packageServerUrl);

            client.RegisterPackageUninstall(installationId, packageId, localUserName, localUserIp);
        }



        public void ClearCache()
        {
            _packageServerFacadeImplCache.Clear();
        }



        private bool ValidatePackageDescriptor(PackageDescriptor packageDescriptor)
        {
            string newVersion;
            if (VersionStringHelper.ValidateVersion(packageDescriptor.PackageVersion, out newVersion) == false)
            {
                LoggingService.LogWarning("AddOnServerFacade", string.Format("The add on '{0}' ({1}) did not validate and is skipped", packageDescriptor.Name, packageDescriptor.Id));
                return false;
            }
            else
            {
                packageDescriptor.PackageVersion = newVersion;
            }

            if (VersionStringHelper.ValidateVersion(packageDescriptor.MinCompositeVersionSupported, out newVersion) == false)
            {
                LoggingService.LogWarning("AddOnServerFacade", string.Format("The add on '{0}' ({1}) did not validate and is skipped", packageDescriptor.Name, packageDescriptor.Id));
                return false;
            }
            else
            {
                packageDescriptor.MinCompositeVersionSupported = newVersion;
            }

            if (VersionStringHelper.ValidateVersion(packageDescriptor.MaxCompositeVersionSupported, out newVersion) == false)
            {
                LoggingService.LogWarning("AddOnServerFacade", string.Format("The add on '{0}' ({1}) did not validate and is skipped", packageDescriptor.Name, packageDescriptor.Id));
                return false;
            }
            else
            {
                packageDescriptor.MaxCompositeVersionSupported = newVersion;
            }

            return true;
        }
      


        private PackagesSoapClient CreateClient(string packageServerUrl)
        {
            BasicHttpBinding basicHttpBinding = new BasicHttpBinding();

            if (RuntimeInformation.IsDebugBuild == true)
            {
                basicHttpBinding.CloseTimeout = TimeSpan.FromSeconds(1);
                basicHttpBinding.OpenTimeout = TimeSpan.FromSeconds(1);
                basicHttpBinding.ReceiveTimeout = TimeSpan.FromSeconds(1);
                basicHttpBinding.SendTimeout = TimeSpan.FromSeconds(1);

                basicHttpBinding.CloseTimeout = TimeSpan.FromMinutes(2);
                basicHttpBinding.OpenTimeout = TimeSpan.FromMinutes(2);
                basicHttpBinding.ReceiveTimeout = TimeSpan.FromMinutes(2);
                basicHttpBinding.SendTimeout = TimeSpan.FromMinutes(2);
            }
            else
            {
                basicHttpBinding.CloseTimeout = TimeSpan.FromMinutes(1);
                basicHttpBinding.OpenTimeout = TimeSpan.FromMinutes(1);
                basicHttpBinding.ReceiveTimeout = TimeSpan.FromMinutes(1);
                basicHttpBinding.SendTimeout = TimeSpan.FromMinutes(1);
            }

            if (packageServerUrl.StartsWith("https") == true)
            {
                basicHttpBinding.Security.Mode = BasicHttpSecurityMode.Transport;
            }

            basicHttpBinding.MaxReceivedMessageSize = int.MaxValue;

            PackagesSoapClient client = new PackagesSoapClient(basicHttpBinding, new EndpointAddress(packageServerUrl));

            return client;
        }
    }
}
