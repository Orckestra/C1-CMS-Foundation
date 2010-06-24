using System;
using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Activation;

namespace Composite.Logging.WCF
{
    public class LoggerServiceHostingFactory : ServiceHostFactory 
    {
        protected override ServiceHost CreateServiceHost(Type serviceType, Uri[] baseAddresses)
        {
            // Parsing url set like
            //
            //   http://local/Composite/services/LogService/local_80/LogService
            //   http://domain/Composite/services/LogService/local_80/LogService
            //   http://local:32/Composite/services/LogService/local_80/LogService
            //
            // In the example the first url has much for hostname: "//local/" and "local_80", so have to be choosen as a base url

            var newAddresses = new List<Uri>();

            foreach(Uri uri in baseAddresses)
            {
                
                string query = baseAddresses[0].PathAndQuery;
                int offset1 = query.LastIndexOf("/");
                int offset2 = query.LastIndexOf("/", offset1 - 1);

                string hostNameAndPort = query.Substring(offset2 + 1, offset1 - offset2 - 1);
                int separatorIndex = hostNameAndPort.LastIndexOf("_");

                if(separatorIndex > 0)
                {
                    int port;
                    string hostName = hostNameAndPort.Substring(0, separatorIndex);

                    if (int.TryParse(hostNameAndPort.Substring(separatorIndex + 1), out port)
                        && uri.Host == hostName && uri.Port == port)
                    {
                        newAddresses.Add(uri);
                    }
                }
            }

            if(newAddresses.Count == 0)
            {
                newAddresses.Add(baseAddresses[0]);
            }

            return new ServiceHost(serviceType, newAddresses.ToArray());
        }
    }
}
