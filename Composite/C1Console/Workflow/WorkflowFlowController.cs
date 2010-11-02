using System;
using System.Collections.Generic;
using System.Threading;
using System.Xml;
using Composite.C1Console.Actions;
using Composite.C1Console.Forms.Flows;
using Composite.C1Console.Tasks;
using Composite.C1Console.Workflow.Foundation;
using Composite.Core.Logging;


namespace Composite.C1Console.Workflow
{
    internal sealed class WorkflowFlowController : IFlowController
    {
        private FlowControllerServicesContainer _servicesContainer;



        public FlowControllerServicesContainer ServicesContainer
        {
            set { _servicesContainer = value; }
        }



        public IFlowUiDefinition GetCurrentUiDefinition(FlowToken flowToken)
        {
            WorkflowFlowToken workflowFlowToken = (WorkflowFlowToken)flowToken;

            if (WorkflowFacade.WorkflowExists(workflowFlowToken.WorkflowInstanceId) == false)
            {
                LoggingService.LogVerbose("WorkflowFlowController", string.Format("The workflow with Id = {0} does not exists", workflowFlowToken.WorkflowInstanceId));
                return null;
            }


            using (GlobalInitializerFacade.CoreNotLockedScope)
            {
                Semaphore semaphore = WorkflowFacade.WaitForIdleStatus(workflowFlowToken.WorkflowInstanceId);
                if (semaphore != null)
                {
                    LoggingService.LogVerbose("WorkflowFlowController", string.Format("The workflow with Id = {0} is running, waiting until its done.", workflowFlowToken.WorkflowInstanceId));

                    semaphore.WaitOne(TimeSpan.FromSeconds(10), true);

                    LoggingService.LogVerbose("WorkflowFlowController", string.Format("Done waiting ont eh workflow with Id = {0}.", workflowFlowToken.WorkflowInstanceId));
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
                           new XmlTextReader(new System.IO.StringReader(formFunction.FormDefinition)),
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

            if (string.IsNullOrEmpty(formFunction.CustomToolbarDefinition) == false)
            {
                formFlowUiDefinition.SetCustomToolbarMarkupProvider(new XmlTextReader(new System.IO.StringReader(formFunction.CustomToolbarDefinition)));
            }
            else if (formFunction.CustomToolbarMarkupProvider != null)
            {
                formFlowUiDefinition.SetCustomToolbarMarkupProvider(formFunction.CustomToolbarMarkupProvider);
            }


            AddEventHandles(formFlowUiDefinition, workflowFlowToken.WorkflowInstanceId);

            return formFlowUiDefinition;
        }



        public void CancelFlow(FlowToken flowToken)
        {
            WorkflowFlowToken workflowFlowToken = (WorkflowFlowToken)flowToken;

            OnCancel(flowToken, null, null);
        }



        private static void AddEventHandles(FormFlowUiDefinition formFlowUiDefinition, Guid instanceId)
        {
            IEnumerable<string> eventNames = WorkflowFacade.GetCurrentFormEvents(instanceId);

            foreach (string eventName in eventNames)
            {
                switch (eventName)
                {
                    case "Save":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.Save, new FormFlowEventHandler(OnSave));
                        break;

                    case "Next":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.Next, new FormFlowEventHandler(OnNext));
                        break;

                    case "Previous":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.Previous, new FormFlowEventHandler(OnPrevious));
                        break;

                    case "Finish":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.Finish, new FormFlowEventHandler(OnFinish));
                        break;

                    case "Cancel":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.Cancel, new FormFlowEventHandler(OnCancel));
                        break;

                    case "Preview":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.Preview, new FormFlowEventHandler(OnPreview));
                        break;

                    case "CustomEvent01":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.CustomEvent01, new FormFlowEventHandler(OnCustomEvent01));
                        break;

                    case "CustomEvent02":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.CustomEvent02, new FormFlowEventHandler(OnCustomEvent02));
                        break;

                    case "CustomEvent03":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.CustomEvent03, new FormFlowEventHandler(OnCustomEvent03));
                        break;

                    case "CustomEvent04":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.CustomEvent04, new FormFlowEventHandler(OnCustomEvent04));
                        break;

                    case "CustomEvent05":
                        formFlowUiDefinition.EventHandlers.Add(StandardEventIdentifiers.CustomEvent05, new FormFlowEventHandler(OnCustomEvent05));
                        break;
                }
            }

            IEventHandleFilter eventHandlerFilter = WorkflowFacade.GetEventHandleFilter(instanceId);
            if (eventHandlerFilter != null)
            {
                eventHandlerFilter.Filter(formFlowUiDefinition.EventHandlers);
            }
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

            if (formServices.HasFieldMessages == false)
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

            if (formServices.HasFieldMessages == false)
            {
                serviceContainer.GetService<IFormFlowRenderingService>().RerenderView();
            }
        }



        private static void OnCancel(FlowToken flowToken, Dictionary<string, object> bindings, FlowControllerServicesContainer serviceContainer)
        {
            WorkflowFlowToken workflowFlowToken = (WorkflowFlowToken)flowToken;

            if (WorkflowFacade.WorkflowExists(workflowFlowToken.WorkflowInstanceId) == true)
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
                Core.Logging.LoggingService.LogVerbose("Workflow", string.Format("Cancel event suppressed because the workflow was terminated ({0})", workflowFlowToken.WorkflowInstanceId));
            }

            if (serviceContainer != null)
            {
                serviceContainer.GetService<IFormFlowRenderingService>().RerenderView();
            }
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
            if (customEventNumber < 1 || customEventNumber > 5) throw new ArgumentException("Number must be between 1 and 5", "customEventNumber");

            WorkflowFlowToken workflowFlowToken = (WorkflowFlowToken)flowToken;

            using (TaskContainer taskContainer = TaskManagerFacade.RuntTasks(flowToken, new WorkflowTaskManagerEvent(flowToken, workflowFlowToken.WorkflowInstanceId) { EventName = "CustomEvent0" + customEventNumber.ToString() }))
            {
                WorkflowFacade.FireCustomEvent(customEventNumber, workflowFlowToken.WorkflowInstanceId, bindings);
                WorkflowFacade.SetFlowControllerServicesContainer(workflowFlowToken.WorkflowInstanceId, serviceContainer);
                WorkflowFacade.RunWorkflow(workflowFlowToken.WorkflowInstanceId);
                taskContainer.SetOnIdleTaskManagerEvent(new WorkflowTaskManagerEvent(flowToken, workflowFlowToken.WorkflowInstanceId));
            }
        }
    }
}
