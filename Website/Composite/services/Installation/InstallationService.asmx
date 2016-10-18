<%@ WebService Language="C#" Class="Composite.Services.Licensing" %>

using System.Web.Services;
using System.Web.Services.Protocols;
using Composite.C1Console.Security;
using Composite.Core.Types;
using Composite.Core.Configuration;

namespace Composite.Services
{
	[WebService(Namespace = "http://www.composite.net/ns/management")]
	[SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
	public class Licensing : System.Web.Services.WebService
	{
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
			return new[]
			{
				new KeyValuePair
				{
					Key = "ApplicationName",
					Value = GlobalSettingsFacade.ApplicationName
				},
				new KeyValuePair
				{
					Key = "ProductVersion",
					Value = Composite.RuntimeInformation.BrandedProductVersion.ToString()
				},
				new KeyValuePair
				{
					Key = "ProductTitle",
					Value = Composite.RuntimeInformation.ProductTitle
},
				new KeyValuePair
				{
					Key = "InstallationId",
					Value = Composite.Core.Configuration.InstallationInformationFacade.InstallationId.ToString()
				},
				new KeyValuePair
				{
					Key = "PasswordExpirationTimeInDays",
					Value = PasswordPolicyFacade.PasswordExpirationTimeInDays.ToString()
				}
			};
		}

		[WebMethod]
		public KeyValuePair[] GetCreditsInfo(bool dummy)
		{
			return new[]
			{
				new KeyValuePair
				{
					Key = "Core Development",
					Value = "Marcus Wendt;Dmitry Dzygin;Taras Nakonechnyi;Morteza Kasravi;Gert Sønderby;Inna Boitsun"
				},
				new KeyValuePair
				{
					Key = "QA, Documentation & Support",
					Value = "Vitaly Vysotskyi;Pavlo Kuzminskiy"
				},
				new KeyValuePair
				{
					Key = "Special Thanks To",
					Value = string.Join(";", new[]
					{
						"Martin Jensen for a solid codebase",
						"Jesper Moth for the first generation C1 Console",
						"Lamine N'Dao @ Orckestra for 2015 design",
						"@nufaqtz for awesome packages, inspiration and core contribs",
						"Poul Kjeldager Sørensen for the Windows Azure support",
						"@burningice for CompositeC1Contrib",
						"@thorstenh for German translation",
						"huangpin@eov.cn for Chinese translation",
						"@C1er for Russian & Ukrainian translations",
						"Emelie Mikaelsson (Invinn AB) for Swedish translation",
						"Erik Paquet for French translation",
						"Volodymyr Muzyka for building our Kiev team",
						"HolisticWare team for contributions",
						"Our community for help and cheering us on",
						"Our paying customers which make this possible"
					})
				}
			};
		}
	}
}