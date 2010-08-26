<%@ WebService Language="C#" Class="WorkflowBindingsService" %>

using System;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Reflection;
using System.Collections.Generic;

using Composite;
using Composite.C1Console.Actions;
using Composite.C1Console.Security;
using Composite.C1Console.Events;
using Composite.C1Console.Elements;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Foundation;
using Composite.C1Console.Tasks;



[WebService(Namespace = "http://www.composite.net/ns/test")]
[SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
public class WorkflowBindingsService : WebService
{
    [WebMethod]
    public List<string> GetFormDataKeys(Guid workflowInstanceId)
    {
        return GetBindings(workflowInstanceId).Keys.ToList();
    }

    
    
    [WebMethod]
    public object GetFormData(Guid workflowInstanceId, string formDataKey)
    {
        return GetBindings(workflowInstanceId)[formDataKey];
    }

    
    
    [WebMethod]
    public void SetFormData(Guid workflowInstanceId, string formDataKey, object value)
    {
        GetBindings(workflowInstanceId)[formDataKey] = value;
    }

    
    
    [WebMethod]
    public object GetFormDataPropetry(Guid workflowInstanceId, string formDataKey, string propertyName)
    {
        object data = GetFormData(workflowInstanceId, formDataKey);

        Verify.IsNotNull(data, "Failed to get a form data. Key: " + formDataKey);

        BindingFlags bindingFlags = BindingFlags.Instance | BindingFlags.Public;

        FieldInfo fieldInfo = data.GetType().GetField(propertyName, bindingFlags);
        if (fieldInfo != null)
        {
            return fieldInfo.GetValue(data);
        }

        PropertyInfo propertyInfo = data.GetType().GetProperty(propertyName, bindingFlags);
        if (propertyInfo != null)
        {
            return propertyInfo.GetValue(data, new object[0]);
        }

        throw new InvalidOperationException(string.Format("Failed to find field or propertry '{0}'", propertyName));
    }

    
    
    [WebMethod]
    public void SetFormDataPropetry(Guid workflowInstanceId, string formDataKey, string propertyName, object value)
    {
        object data = GetFormData(workflowInstanceId, formDataKey);

        Verify.IsNotNull(data, "Failed to get a form data. Key: " + formDataKey);

        BindingFlags bindingFlags = BindingFlags.Instance | BindingFlags.Public;

        FieldInfo fieldInfo = data.GetType().GetField(propertyName, bindingFlags);
        if (fieldInfo != null)
        {
            fieldInfo.SetValue(data, value);
            return;
        }

        PropertyInfo propertyInfo = data.GetType().GetProperty(propertyName, bindingFlags);
        if (propertyInfo != null)
        {
            propertyInfo.SetValue(data, value, new object[0]);
            return;
        }

        throw new InvalidOperationException(string.Format("Failed to find field or propertry '{0}'", propertyName));
    }


    
    
    private static Dictionary<string, object> GetBindings(Guid workflowInstanceId)
    {
        FormData formData;
        WorkflowFacade.TryGetFormData(workflowInstanceId, out formData);

        Verify.IsNotNull(formData, "Failed to get form data by workflow ID.");
        return formData.Bindings;
    }
}
