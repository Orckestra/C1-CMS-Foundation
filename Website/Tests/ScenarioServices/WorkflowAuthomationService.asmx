<%@ WebService Language="C#" Class="Composite.Tests.ScenarioServices.WorkflowAuthomationService" %>

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Web.Services;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Collections.Generic;
using Composite.Security;
using Composite.StringExtensions;
using Composite.Workflow;
using Composite.Workflow.Foundation;
//using Composite.Workflow.Logger;

namespace Composite.Tests.ScenarioServices
{
    /// <summary>
    /// Summary description for WorkflowAuthomationService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class WorkflowAuthomationService : System.Web.Services.WebService
    {
        private string _viewId = "TestViewId";
        private string _consoleId = "TestConsoleId";

        private static readonly Hashtable<Guid, string> CreatedEntityTokens = new Hashtable<Guid, string>();

        [WebMethod]
        public void ExecuteAction(string serializedEntityToken, string serializedActionToken)
        {
            LogIn();

            EntityToken entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);
            ActionToken actionToken = ActionTokenSerializer.Deserialize(serializedActionToken);

            ActionExecutorFacade.Execute(entityToken, actionToken, GetFlowControllerServices());
        }
        
        [WebMethod]
        public Guid CreateWorkflow(string serializedEntityToken, string serializedActionToken)
        {
            LogIn();
            
            EntityToken entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);
            ActionToken actionToken = ActionTokenSerializer.Deserialize(serializedActionToken);

            FlowControllerServicesContainer services = GetFlowControllerServices();

            FlowToken flowToken;
            
            using (CreateExecutionScope())
            {
                flowToken = ActionExecutorFacade.Execute(entityToken, actionToken, services);
            }

            Composite.Verify.That(flowToken != null && flowToken is WorkflowFlowToken, "Failed to create a workflow");

            return (flowToken as WorkflowFlowToken).WorkflowInstanceId;
        }

        [WebMethod]
        public void FireEvent(Guid workflowInstanceId, string eventName)
        {
            LogIn();

            Dictionary<string, object> bindings = null;

            FormData formData = WorkflowFacade.GetFormData(workflowInstanceId);
            if (formData != null)
            {
                bindings = formData.Bindings;
            }

            if (eventName.StartsWith("CustomEvent0", true, CultureInfo.InvariantCulture))
            {
                int eventNumber = int.Parse(eventName.Substring(eventName.IndexOf("0")));
                WorkflowFacade.FireCustomEvent(eventNumber, workflowInstanceId, bindings);
            }
            else
            {
                switch (eventName.ToLower())
                {
                    case "cancel":
                        WorkflowFacade.FireCancelEvent(workflowInstanceId, bindings);
                        break;                        
                    case "next":
                        WorkflowFacade.FireNextEvent(workflowInstanceId, bindings);
                        break;
                    case "finish":
                        WorkflowFacade.FireFinishEvent(workflowInstanceId, bindings);
                        break;
                    case "preview":
                        WorkflowFacade.FirePreviewEvent(workflowInstanceId, bindings);
                        break;
                    case "previous":
                        WorkflowFacade.FirePreviousEvent(workflowInstanceId, bindings);
                        break;
                    case "save":
                        WorkflowFacade.FireSaveEvent(workflowInstanceId, bindings);
                        break;
                    default:
                        throw new InvalidOperationException("Unknown event name '{0}'".FormatWith(eventName));
                }
            }

            WorkflowFacade.RunWorkflow(workflowInstanceId);
        }

        [WebMethod]
        public string GetCreatedEntityToken(Guid workflowInstanceId)
        {
            return CreatedEntityTokens[workflowInstanceId];
        }

        #region Working with form data

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
            var bindings = GetBindings(workflowInstanceId);
            if(value != null 
                && value is string 
                && bindings.ContainsKey(formDataKey) 
                && bindings[formDataKey] != null) 
            {
                bindings[formDataKey] = Convert(value as string, bindings[formDataKey].GetType());
                return;
            }
            
            bindings[formDataKey] = value;
        }



        [WebMethod]
        public object GetFormDataProperty(Guid workflowInstanceId, string formDataKey, string propertyName)
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
        public void SetFormDataProperty(Guid workflowInstanceId, string formDataKey, string propertyName, object value)
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

        #endregion


        private static void LogIn()
        {
            UserValidationFacade.FormValidateUser("admin", "123456");
        }
        
        private FlowControllerServicesContainer GetFlowControllerServices()
        {
            FlowControllerServicesContainer flowControllerServiceContainer = new FlowControllerServicesContainer();
            
            flowControllerServiceContainer.AddService(new ManagementConsoleMessageService(_consoleId, _viewId));
            flowControllerServiceContainer.AddService(new TaskManagerFlowControllerServiceStub());
            flowControllerServiceContainer.AddService(new Composite.Forms.Flows.FormFlowRenderingService());
            // flowControllerServiceContainer.AddService(new ElementDataExchangeService(providerName));
            flowControllerServiceContainer.AddService(new ActionExecutionServiceWrapper(string.Empty, _consoleId));
            return flowControllerServiceContainer;
        }

        #region Nested


        private class ActionExecutionServiceWrapper : IActionExecutionService
        {
            public ActionExecutionServiceWrapper(string elementProviderName, string consoleId)
            {
                this.ElementProviderName = elementProviderName;
                this.ConsoleId = consoleId;
            }

            private string ElementProviderName { get; set; }
            private string ConsoleId { get; set; }

            public void Execute(EntityToken entityToken, ActionToken actionToken, Composite.Tasks.TaskManagerEvent taskManagerEvent)
            {
                // We aren't running child workflows, just remebering referenced entity tokens
                Guid workflowId = (taskManagerEvent as WorkflowCreationTaskManagerEvent).ParentWorkflowInstanceId;
                string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken);

                var entitryTokensTable = WorkflowAuthomationService.CreatedEntityTokens;
                lock(entitryTokensTable) 
                {
                    entitryTokensTable[workflowId] = serializedEntityToken;
                }
            }
        }

        private IDisposable CreateExecutionScope()
        {
            return new Composite.Data.DataScope(Composite.Data.DataScopeIdentifier.Administrated, Composite.Data.DataLocalizationFacade.DefaultLocalizationCulture);
        }
        
        private class TaskManagerFlowControllerServiceStub : Composite.Tasks.ITaskManagerFlowControllerService
        {
            public void OnStatus(Composite.Tasks.TaskManagerEvent taskManagerEvent)
            {
            }
        }

        private object Convert(string serializedValue, Type type)
        {
            if (type == typeof(string)) return serializedValue;
            if (type == typeof(bool)) return bool.Parse(serializedValue);
            if (type == typeof(Int32)) return Int32.Parse(serializedValue);
            if (type == typeof(Int64)) return Int64.Parse(serializedValue);
            if (type == typeof(DateTime)) return DateTime.Parse(serializedValue);
            if (type == typeof(Guid)) return new Guid(serializedValue);

            throw new InvalidOperationException("Cannot deserialize value of type '{0}'".FormatWith(type.FullName));
        }

        #endregion    
    }
}

