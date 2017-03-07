<%@ WebService Language="C#" Class="Composite.Services.FunctionService" %>

using System;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Linq;
using Composite.Functions;


namespace Composite.Services
{
    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    public class FunctionService : System.Web.Services.WebService
    {
        [WebMethod]
        public FunctionCallEditorSettings GetCustomEditorSettings(string functionName)
        {
            return FunctionCallEditorManager.GetCustomEditorSettings(functionName);
        }

        [WebMethod]
        public FunctionCallEditorSettings GetCustomEditorSettingsByMarkup(string xml)
        {
            var xElement = XElement.Parse(xml);

            string functionName = (string)xElement.Attribute("name");

            return functionName != null ? FunctionCallEditorManager.GetCustomEditorSettings(functionName) : null;
        }

        [WebMethod]
        public FunctionExecutionResult TryExecute(string xml)
        {
            XElement functionMarkup;
            BaseFunctionRuntimeTreeNode functionNode;
            try
            {
                functionMarkup = XElement.Parse(xml);
            }
            catch (Exception)
            {
                throw new ArgumentException("Not wellformed XML", "xml");
            }

            try
            {
                functionNode = FunctionFacade.BuildTree(functionMarkup) as BaseFunctionRuntimeTreeNode;
            }
            catch (Exception)
            {
                throw new ArgumentException("Not a parsable function call", "xml");
            }

            var executionResponse = new FunctionExecutionResult();
            executionResponse.FunctionParamsExist = FunctionFacade.GetFunction(functionNode.GetCompositeName()).ParameterProfiles.Any();

            try
            {
                object result = functionNode.GetValue();
                executionResponse.FunctionCallExecutable = true;
                executionResponse.FunctionResultType = (result is XNode ? "xml" : "string");
                executionResponse.FunctionResult = result.ToString();
            }
            catch (Exception)
            {
                executionResponse.FunctionCallExecutable = false;
                executionResponse.FunctionResult = null;
                executionResponse.FunctionResultType = null;
            }

            return executionResponse;
        }

        public class FunctionExecutionResult
        {
            public bool FunctionParamsExist { get; set; }
            public bool FunctionCallExecutable { get; set; }
            public string FunctionResultType { get; set; }
            public string FunctionResult { get; set; }
        }
    }
}
