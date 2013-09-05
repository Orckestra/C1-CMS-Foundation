<%@ WebService Language="C#" Class="Composite.Services.Licensing" %>

using System;
using System.Collections.Generic;
using System.Web.Services;
using System.Web.Services.Protocols;
using Composite.Core.Types;

namespace Composite.Services
{
    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    public class Licensing : System.Web.Services.WebService
    {

        public Licensing()
        {
        }

        [WebMethod]
        public bool Registered(bool dummy)
        {
            return true;
        }

        [WebMethod]
        public bool InvokeLicenseFetch(bool dummy)
        {
            return true;
        }

        [WebMethod]
        public KeyValuePair[] GetInstallationInfo(bool dummy)
        {
            List<KeyValuePair> list = new List<KeyValuePair>();

            KeyValuePair pair = new KeyValuePair();
            pair.Key = "ProductVersion";
            pair.Value = Composite.RuntimeInformation.ProductVersion.ToString();
            list.Add(pair);

            pair = new KeyValuePair();
            pair.Key = "ProductTitle";
            pair.Value = Composite.RuntimeInformation.ProductTitle;
            list.Add(pair);

            pair = new KeyValuePair();
            pair.Key = "InstallationId";
            pair.Value = Composite.Core.Configuration.InstallationInformationFacade.InstallationId.ToString();
            list.Add(pair);

            return list.ToArray();
        }

        [WebMethod]
        public KeyValuePair[] GetCreditsInfo(bool dummy)
        {
            List<KeyValuePair> list = new List<KeyValuePair>();

            KeyValuePair pair = new KeyValuePair();
            pair.Key = "Core Development";
			pair.Value = "Marcus Wendt;Dmitry Dzygin;Taras Nakonechnyi;Poul Kjeldager Sørensen";
            list.Add(pair);

            pair = new KeyValuePair();
            pair.Key = "QA, Packages & Documentaion";
            pair.Value = "Volodymyr Muzyka;Vitaly Vysotskyi;Inna Boitsun";

            list.Add(pair);

            /*
            pair = new KeyValuePair();
            pair.Key = "Localization";
            pair.Value = "";
            list.Add(pair);
            */
            
            pair = new KeyValuePair();
            pair.Key = "Special Thanks To";
            pair.Value = "Martin Jensen for a solid codebase;Jesper Moth for the C1 Console;@burningice for ConpositeC1Contrib;@thorstenh for German translation;huangpin@eov.cn for Chinese translation;@C1er for Russian & Ukrainian translations;Emelie Mikaelsson (Invinn AB) for Swedish translation;HolisticWare team for contributions;@nufaqtz for awesome packages and inspiration";
            list.Add(pair);

            return list.ToArray();
        }
    }
}