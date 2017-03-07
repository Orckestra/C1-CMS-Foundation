using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Xml;
using System.Xml.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Forms.Flows;
using Composite.C1Console.Tasks;
using Composite.C1Console.Workflow.Foundation;
using Composite.Core;


namespace Composite.C1Console.Workflow
{
    internal sealed class WorkflowFlowController : IFlowController
    {
        private static readonly string LogTitle = nameof (WorkflowFlowController);

        public FlowControllerServicesContainer ServicesContainer { set; private get; }


        public IFlowUiDefinition GetCurrentUiDefinition(FlowToken flowToken)
        {
            WorkflowFlowToken workflowFlowToken = (WorkflowFlowToken)flowToken;

            if (!WorkflowFacade.WorkflowExists(workflowFlowToken.WorkflowInstanceId))
            {
                Log.LogVerbose(LogTitle, "The workflow with Id = {0} does not exists", workflowFlowToken.WorkflowInstanceId);
                return null;
            }


            using (GlobalInitializerFacade.CoreNotLockedScope)
            {
                Semaphore semaphore = WorkflowFacade.WaitForIdleStatus(workflowFlowToken.WorkflowInstanceId);
                if (semaphore != null)
                {
                    Log.LogVerbose(LogTitle, "The workflow with Id = {0} is running, waiting until its done.", workflowFlowToken.WorkflowInstanceId);

                    semaphore.WaitOne(TimeSpan.FromSeconds(10), true);

                    Log.LogVerbose(LogTitle, "Done waiting on the workflow with Id = {0}.", workflowFlowToken.WorkflowInstanceId);
                }
            }


            FormData formFunction = WorkflowFacade.GetFormData(workflowFlowToken.WorkflowInstanceId);
            if (formFunction == null)
            {
                return null;
            }

            FormFlowUiDefinition formFlowUiDefinition;
            if (formFunction.FormDefinition != null)
            {
                formFlowUiDefinition = new FormFlowUiDefinition(
                           ToXmlReader(formFunction.FormDefinition),
                           formFunction.ContainerType,
                           formFunction.ContainerLabel,
                           formFunction.Bindings,
                           formFunction.BindingsValidationRules
                    );
            }
            else if (formFunction.FormMarkupProvider != null)
            {
                formFlowUiDefinition = new FormFlowUiDefinition(
                           formFunction.FormMarkupProvider,
                           formFunction.ContainerType,
                           formFunction.ContainerLabel,
                           formFunction.Bindings,
                           formFunction.BindingsValidationRules
                    );
            }
            else
            {
                throw new NotImplementedException();
            }

            var markup = GetCustomToolbarMarkup(formFunction);
            if (markup != null)
            {
                formFlowUiDefinition.SetCustomToolbarMarkupProvider(markup);
            }

            AddEventHandles(formFlowUiDefinition, workflowFlowToken.WorkflowInstanceId);

            return formFlowUiDefinition;
        }


        private XmlReader GetCustomToolbarMarkup(FormData formData)
        {
            if (formData.CustomToolbarItems == null || formData.CustomToolbarItems.Count == 0)
            {
                return null;
            }

            var parts = formData.CustomToolbarItems
                .OrderBy(t => t.Item3)
                .Select(t => t.Item2)
                .ToList();

            if (parts.Count == 1) return ToXmlReader(parts[0]);

            var templateDocument = XDocument.Parse(@"<?xml version=""1.0"" encoding=""utf-8""?>
<cms:formdefinition xmlns=""http://www.composite.net/ns/management/bindingforms/std.ui.controls.lib/1.0"" xmlns:internal=""http://www.composite.net/ns/management/bindingforms/internal.ui.controls.lib/1.0"" xmlns:f=""http://www.composite.net/ns/management/bindingforms/std.function.lib/1.0"" xmlns:cms=""http://www.composite.net/ns/management/bindingforms/1.0"">
  <cms:bindings>
  </cms:bindings>
  <cms:layout>
    <PlaceHolder>
    </PlaceHolder>
  </cms:layout>
</cms:formdefinition>");

            XElement bindings = GetBindingsElement(templateDocument);
            XElement layout = GetLayoutOrPlaceholderElement(templateDocument);

            foreach (var part in parts)
            {
                bindings.Add(GetBindingsElement(part).Elements());
                layout.Add(GetLayoutOrPlaceholderElement(part).Elements());
            }

            return ToXmlReader(templateDocument);
        }

        private XElement GetBindingsElement(XDocument templateDocument)
        {
            return templateDocument.Descendants().FirstOrDefault(d => d.Name.LocalName == "bindings");
        }

        private XElement GetLayoutOrPlaceholderElement(XDocument doc)
        {
            var layoutElement = doc.Descendants().FirstOrDefault(d => d.Name.LocalName == "layout");
            Verify.IsNotNull(layoutElement, "Failed to find 'layout' element");
            var firstElement = layoutElement.Elements().FirstOrDefault();
            if (firstElement != null && firstElement.Name.LocalName == "PlaceHolder")
            {
                return firstElement;
            }

            return layoutElement;
        }

        private XmlReader ToXmlReader(XDocument document) => ToXmlReader(document.ToString());

        private XmlReader ToXmlReader(string str) => new XmlTextReader(new StringReader(str));


        public void CancelFlow(FlowToken flowToken)
        {
            OnCancel(flowToken, null, null);
        }



        private static void AddEventHandles(FormFlowUiDefinition formFlowUiDefinition, Guid instanceId)
        {
            IEnumerable<string> eventNames = WorkflowFacade.GetCurrentFormEvents(instanceId);

            FormData formData = WorkflowFacade.GetFormData(instanceId);

            foreach (string eventName in eventNames)
            {
                if (formData?.ExcludedEvents != null && formData.ExcludedEvents.Contains(eventName)) continue;

                switch (eventName)
                {
                    case "Save":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.Save, OnSave);
                        break;

                    case "SaveAndPublish":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.SaveAndPublish, OnSaveAndPublish);
                        break;

                    case "Next":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.Next, OnNext);
                        break;

                    case "Previous":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.Previous, OnPrevious);
                        break;

                    case "Finish":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.Finish, OnFinish);
                        break;

                    case "Cancel":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.Cancel, OnCancel);
                        break;

                    case "Preview":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.Preview, OnPreview);
                        break;

                    case "CustomEvent01":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.CustomEvent01, OnCustomEvent01);
                        break;

                    case "CustomEvent02":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.CustomEvent02, OnCustomEvent02);
                        break;

                    case "CustomEvent03":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.CustomEvent03, OnCustomEvent03);
                        break;

                    case "CustomEvent04":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.CustomEvent04, OnCustomEvent04);
                        break;

                    case "CustomEvent05":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.CustomEvent05, OnCustomEvent05);
                        break;
                }
            }

            IEventHandleFilter eventHandlerFilter = WorkflowFacade.GetEventHandleFilter(instanceId);
            eventHandlerFilter?.Filter(formFlowUiDefinition.EventHandlers);
        }



        private static void OnSave(FlowToken flowToken, Dictionary<string, object> bindings, FlowControllerServicesContainer serviceContainer)
        {
            WorkflowFlowToken workflowFlowToken = (WorkflowFlowToken)flowToken;

            using (TaskContainer taskContainer = TaskManagerFacade.RuntTasks(flowToken, new WorkflowTaskManagerEvent(flowToken, workflowFlowToken.WorkflowInstanceId) { EventName = "Save" }))
            {
                TaskManagerFlowControllerService taskManagerFlowControllerService = new TaskManagerFlowControllerService(taskContainer);
                serviceContainer.AddService(taskManagerFlowControllerService);

                WorkflowFacade.FireSaveEvent(workflowFlowToken.WorkflowInstanceId, bindings);
                WorkflowFacade.SetFlowControllerServicesContainer(workflowFlowToken.WorkflowInstanceId, serviceContainer);
                WorkflowFacade.RunWorkflow(workflowFlowToken.WorkflowInstanceId);
                taskContainer.SetOnIdleTaskManagerEvent(new WorkflowTaskManagerEvent(flowToken, workflowFlowToken.WorkflowInstanceId));

                serviceContainer.RemoveService(taskManagerFlowControllerService);
            }
        }



        private static void OnSaveAndPublish(FlowToken flowToken, Dictionary<string, object> bindings, FlowControllerServicesContainer serviceContainer)
        {
            WorkflowFlowToken workflowFlowToken = (WorkflowFlowToken)flowToken;

            using (TaskContainer taskContainer = TaskManagerFacade.RuntTasks(flowToken, new WorkflowTaskManagerEvent(flowToken, workflowFlowToken.WorkflowInstanceId) { EventName = "Save" }))
            {
                TaskManagerFlowControllerService taskManagerFlowControllerService = new TaskManagerFlowControllerService(taskContainer);
                serviceContainer.AddService(taskManagerFlowControllerService);

                WorkflowFacade.FireSaveAndPublishEvent(workflowFlowToken.WorkflowInstanceId, bindings);
                WorkflowFacade.SetFlowControllerServicesContainer(workflowFlowToken.WorkflowInstanceId, serviceContainer);
                WorkflowFacade.RunWorkflow(workflowFlowToken.WorkflowInstanceId);
                taskContainer.SetOnIdleTaskManagerEvent(new WorkflowTaskManagerEvent(flowToken, workflowFlowToken.WorkflowInstanceId));

                serviceContainer.RemoveService(taskManagerFlowControllerService);
            }
        }



        private static void OnNext(FlowToken flowToken, Dictionary<string, object> bindings, FlowControllerServicesContainer serviceContainer)
        {
            WorkflowFlowToken workflowFlowToken = (WorkflowFlowToken)flowToken;

            using (TaskContainer taskContainer = TaskManagerFacade.RuntTasks(flowToken, new WorkflowTaskManagerEvent(flowToken, workflowFlowToken.WorkflowInstanceId) { EventName = "Next" }))
            {
                WorkflowFacade.FireNextEvent(workflowFlowToken.WorkflowInstanceId, bindings);
                WorkflowFacade.SetFlowControllerServicesContainer(workflowFlowToken.WorkflowInstanceId, serviceContainer);
                WorkflowFacade.RunWorkflow(workflowFlowToken.WorkflowInstanceId);
                taskContainer.SetOnIdleTaskManagerEvent(new WorkflowTaskManagerEvent(flowToken, workflowFlowToken.WorkflowInstanceId));
            }

            IFormFlowRenderingService formServices = serviceContainer.GetService<IFormFlowRenderingService>();

            if (!formServices.HasFieldMessages)
            {
                serviceContainer.GetService<IFormFlowRenderingService>().RerenderView();
            }
        }



        private static void OnPrevious(FlowToken flowToken, Dictionary<string, object> bindings, FlowControllerServicesContainer serviceContainer)
        {
            WorkflowFlowToken workflowFlowToken = (WorkflowFlowToken)flowToken;

            using (TaskContainer taskContainer = TaskManagerFacade.RuntTasks(flowToken, new WorkflowTaskManagerEvent(flowToken, workflowFlowToken.WorkflowInstanceId) { EventName = "Previous" }))
            {
                WorkflowFacade.FirePreviousEvent(workflowFlowToken.WorkflowInstanceId, bindings);
                WorkflowFacade.SetFlowControllerServicesContainer(workflowFlowToken.WorkflowInstanceId, serviceContainer);
                WorkflowFacade.RunWorkflow(workflowFlowToken.WorkflowInstanceId);
                taskContainer.SetOnIdleTaskManagerEvent(new WorkflowTaskManagerEvent(flowToken, workflowFlowToken.WorkflowInstanceId));
            }

            serviceContainer.GetService<IFormFlowRenderingService>().RerenderView();
        }



        private static void OnFinish(FlowToken flowToken, Dictionary<string, object> bindings, FlowControllerServicesContainer serviceContainer)
        {
            WorkflowFlowToken workflowFlowToken = (WorkflowFlowToken)flowToken;

            using (TaskContainer taskContainer = TaskManagerFacade.RuntTasks(flowToken, new WorkflowTaskManagerEvent(flowToken, workflowFlowToken.WorkflowInstanceId) { EventName = "Finish" }))
            {
                TaskManagerFlowControllerService taskManagerFlowControllerService = new TaskManagerFlowControllerService(taskContainer);
                serviceContainer.AddService(taskManagerFlowControllerService);

                WorkflowFacade.FireFinishEvent(workflowFlowToken.WorkflowInstanceId, bindings);
                WorkflowFacade.SetFlowControllerServicesContainer(workflowFlowToken.WorkflowInstanceId, serviceContainer);
                WorkflowFacade.RunWorkflow(workflowFlowToken.WorkflowInstanceId);
                taskContainer.SetOnIdleTaskManagerEvent(new WorkflowTaskManagerEvent(flowToken, workflowFlowToken.WorkflowInstanceId));
            }


            IFormFlowRenderingService formServices = serviceContainer.GetService<IFormFlowRenderingService>();

            if (!formServices.HasFieldMessages)
            {
                serviceContainer.GetService<IFormFlowRenderingService>().RerenderView();
            }
        }



        private static void OnCancel(FlowToken flowToken, Dictionary<string, object> bindings, FlowControllerServicesContainer serviceContainer)
        {
            WorkflowFlowToken workflowFlowToken = (WorkflowFlowToken)flowToken;

            if (WorkflowFacade.WorkflowExists(workflowFlowToken.WorkflowInstanceId))
            {
                using (TaskManagerFacade.RuntTasks(flowToken, new WorkflowTaskManagerEvent(flowToken, workflowFlowToken.WorkflowInstanceId) { EventName = "Cancel" }))
                {
                    WorkflowFacade.FireCancelEvent(workflowFlowToken.WorkflowInstanceId, bindings);
                    WorkflowFacade.SetFlowControllerServicesContainer(workflowFlowToken.WorkflowInstanceId, serviceContainer);
                    WorkflowFacade.RunWorkflow(workflowFlowToken.WorkflowInstanceId);                    
                }
            }
            else
            {
                Log.LogVerbose(LogTitle, "Cancel event suppressed because the workflow was terminated ({0})", workflowFlowToken.WorkflowInstanceId);
            }

            serviceContainer?.GetService<IFormFlowRenderingService>().RerenderView();
        }



        private static void OnPreview(FlowToken flowToken, Dictionary<string, object> bindings, FlowControllerServicesContainer serviceContainer)
        {
            WorkflowFlowToken workflowFlowToken = (WorkflowFlowToken)flowToken;

            using (TaskContainer taskContainer = TaskManagerFacade.RuntTasks(flowToken, new WorkflowTaskManagerEvent(flowToken, workflowFlowToken.WorkflowInstanceId) { EventName = "Preview" }))
            {
                WorkflowFacade.FirePreviewEvent(workflowFlowToken.WorkflowInstanceId, bindings);
                WorkflowFacade.SetFlowControllerServicesContainer(workflowFlowToken.WorkflowInstanceId, serviceContainer);
                WorkflowFacade.RunWorkflow(workflowFlowToken.WorkflowInstanceId);
                taskContainer.SetOnIdleTaskManagerEvent(new WorkflowTaskManagerEvent(flowToken, workflowFlowToken.WorkflowInstanceId));
            }
        }



        private static void OnCustomEvent01(FlowToken flowToken, Dictionary<string, object> bindings, FlowControllerServicesContainer serviceContainer)
        {
            OnCustomEvent(1, flowToken, bindings, serviceContainer);
        }



        private static void OnCustomEvent02(FlowToken flowToken, Dictionary<string, object> bindings, FlowControllerServicesContainer serviceContainer)
        {
            OnCustomEvent(2, flowToken, bindings, serviceContainer);
        }



        private static void OnCustomEvent03(FlowToken flowToken, Dictionary<string, object> bindings, FlowControllerServicesContainer serviceContainer)
        {
            OnCustomEvent(3, flowToken, bindings, serviceContainer);
        }



        private static void OnCustomEvent04(FlowToken flowToken, Dictionary<string, object> bindings, FlowControllerServicesContainer serviceContainer)
        {
            OnCustomEvent(4, flowToken, bindings, serviceContainer);
        }



        private static void OnCustomEvent05(FlowToken flowToken, Dictionary<string, object> bindings, FlowControllerServicesContainer serviceContainer)
        {
            OnCustomEvent(5, flowToken, bindings, serviceContainer);
        }



        private static void OnCustomEvent(int customEventNumber, FlowToken flowToken, Dictionary<string, object> bindings, FlowControllerServicesContainer serviceContainer)
        {
            if (customEventNumber < 1 || customEventNumber > 5) throw new ArgumentException("Number must be between 1 and 5", nameof(customEventNumber));

            WorkflowFlowToken workflowFlowToken = (WorkflowFlowToken)flowToken;

            using (TaskContainer taskContainer = TaskManagerFacade.RuntTasks(flowToken, new WorkflowTaskManagerEvent(flowToken, workflowFlowToken.WorkflowInstanceId) { EventName = "CustomEvent0" + customEventNumber }))
            {
                WorkflowFacade.FireCustomEvent(customEventNumber, workflowFlowToken.WorkflowInstanceId, bindings);
                WorkflowFacade.SetFlowControllerServicesContainer(workflowFlowToken.WorkflowInstanceId, serviceContainer);
                WorkflowFacade.RunWorkflow(workflowFlowToken.WorkflowInstanceId);
                taskContainer.SetOnIdleTaskManagerEvent(new WorkflowTaskManagerEvent(flowToken, workflowFlowToken.WorkflowInstanceId));
            }
        }
    }
}
