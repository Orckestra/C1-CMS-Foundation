using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Composite.Functions;
using System.Web;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.ResourceSystem;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Server
{
	internal sealed class ServerVariableFunction :  StandardFunctionBase
	{
        public ServerVariableFunction(EntityTokenFactory entityTokenFactory)
            : base("ServerVariable", "Composite.Web.Server", typeof(string), entityTokenFactory)
        {
        }

        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider serverVariableNameSelector =
                    StandardWidgetFunctions.DropDownList(
                        this.GetType(),
                        "ServerVariableNames",
                        false,
                        true);

                yield return new StandardFunctionParameterProfile(
                    "VariableName", typeof(string), true, new ConstantValueProvider("PATH_INFO"), serverVariableNameSelector);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            if (HttpContext.Current != null && HttpContext.Current.Request != null)
            {
                return HttpContext.Current.Request.ServerVariables[parameters.GetParameter<string>("VariableName")];
            }

            return null;
        }


        public static IEnumerable<string> ServerVariableNames()
        {
            yield return "ALL_HTTP";
            yield return "ALL_RAW";
            yield return "APPL_MD_PATH";
            yield return "APPL_PHYSICAL_PATH";
            yield return "AUTH_PASSWORD";
            yield return "AUTH_TYPE";
            yield return "AUTH_USER";
            yield return "CERT_COOKIE";
            yield return "CERT_FLAGS";
            yield return "CERT_ISSUER";
            yield return "CERT_KEYSIZE";
            yield return "CERT_SECRETKEYSIZE";
            yield return "CERT_SERIALNUMBER";
            yield return "CERT_SERVER_ISSUER";
            yield return "CERT_SERVER_SUBJECT";
            yield return "CERT_SUBJECT";
            yield return "CONTENT_LENGTH";
            yield return "CONTENT_TYPE";
            yield return "GATEWAY_INTERFACE";
            yield return "HTTP_ACCEPT";
            yield return "HTTP_ACCEPT_LANGUAGE";
            yield return "HTTP_COOKIE";
            yield return "HTTP_HOST";
            yield return "HTTP_REFERER";
            yield return "HTTP_USER_AGENT";
            yield return "HTTPS";
            yield return "HTTPS_KEYSIZE";
            yield return "HTTPS_SECRETKEYSIZE";
            yield return "HTTPS_SERVER_ISSUER";
            yield return "HTTPS_SERVER_SUBJECT";
            yield return "INSTANCE_ID";
            yield return "INSTANCE_META_PATH";
            yield return "LOCAL_ADDR";
            yield return "LOGON_USER";
            yield return "PATH_INFO";
            yield return "PATH_TRANSLATED";
            yield return "QUERY_STRING";
            yield return "REMOTE_ADDR";
            yield return "REMOTE_HOST";
            yield return "REMOTE_USER";
            yield return "REQUEST_METHOD";
            yield return "SCRIPT_NAME";
            yield return "SERVER_NAME";
            yield return "SERVER_PORT";
            yield return "SERVER_PORT_SECURE";
            yield return "SERVER_PROTOCOL";
            yield return "SERVER_SOFTWARE";
            yield return "URL";
        }
	}
}
