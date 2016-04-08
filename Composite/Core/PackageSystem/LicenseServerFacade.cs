using System;
using System.ServiceModel;
using Composite.Core.PackageSystem.WebServiceClient;


namespace Composite.Core.PackageSystem
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    internal static class LicenseServerFacade
    {
        public static string ValidateTrialLicenseDefinitionRequest(Guid installationId, Guid productId, string publicKeyXml)
        {
            var client = CreateClient();

            return client.ValidateTrialLicenseDefinitionRequest(installationId, productId, publicKeyXml);
        }



        public static LicenseDefinitionDescriptor GetTrialLicenseDefinition(Guid installationId, Guid productId, string publicKeyXml)
        {
            var client = CreateClient();

            return client.GetTrialLicenseDefinition(installationId, productId, publicKeyXml);
        }
        

        
        private static string LicenseServerUrl
            => "https://package.composite.net/PackageLicense/LicenseDefinitionService.asmx";


        private static LicenseDefinitionServiceSoapClient CreateClient()
        {
            var timeout = TimeSpan.FromMinutes(RuntimeInformation.IsDebugBuild ? 2 : 1);

            var basicHttpBinding = new BasicHttpBinding
            {
                CloseTimeout = timeout,
                OpenTimeout = timeout,
                ReceiveTimeout = timeout,
                SendTimeout = timeout
            };

            if (LicenseServerUrl.StartsWith("https", StringComparison.OrdinalIgnoreCase))
            {
                basicHttpBinding.Security.Mode = BasicHttpSecurityMode.Transport;
            }
            basicHttpBinding.MaxReceivedMessageSize = int.MaxValue;

            return new LicenseDefinitionServiceSoapClient(basicHttpBinding, new EndpointAddress(LicenseServerUrl));
        }
    }
}
