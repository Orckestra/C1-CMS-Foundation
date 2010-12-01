using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using Composite.Core.PackageSystem.WebServiceClient;


namespace Composite.Core.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    internal static class LicenseServerFacade
    {
        public static string ValidateTrialLicenseDefinitionRequest(Guid installationId, Guid productId, string publicKeyXml)
        {
            LicenseDefinitionServiceSoapClient client = CreateClient();

            return client.ValidateTrialLicenseDefinitionRequest(installationId, productId, publicKeyXml);
        }



        public static LicenseDefinitionDescriptor GetTrialLicenseDefinition(Guid installationId, Guid productId, string publicKeyXml)
        {
            LicenseDefinitionServiceSoapClient client = CreateClient();

            return client.GetTrialLicenseDefinition(installationId, productId, publicKeyXml);
        }
        

        
        private static string LicenseServerUrl
        {
            get
            {
                return "http://package.composite.net/PackageLicense/LicenseDefinitionService.asmx";
            }
        }



        private static LicenseDefinitionServiceSoapClient CreateClient()
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

            if (LicenseServerUrl.StartsWith("https") == true)
            {
                basicHttpBinding.Security.Mode = BasicHttpSecurityMode.Transport;
            }

            basicHttpBinding.MaxReceivedMessageSize = int.MaxValue;

            LicenseDefinitionServiceSoapClient client = new LicenseDefinitionServiceSoapClient(basicHttpBinding, new EndpointAddress(LicenseServerUrl));

            return client;
        }
    }
}
