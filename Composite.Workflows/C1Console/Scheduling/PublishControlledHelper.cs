using System;
using System.Collections.Generic;
using System.Workflow.Runtime;

using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.PublishScheduling;
using Composite.Data.Types;
using Composite.Plugins.Elements.ElementProviders.PageElementProvider;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Management;

namespace Composite.C1Console.Scheduling
{
    public class PublishControlledHelper
    {
        public static void HandlePublishUnpublishWorkflows(IData selectedData, string cultureName, DateTime? publishDate, DateTime? unpublishDate, ref WorkflowInstance publishWorkflowInstance, ref WorkflowInstance unpublishWorkflowInstance)
        {
            var key = selectedData.GetUniqueKey().ToString();

            var existingPublishSchedule = PublishScheduleHelper.GetPublishSchedule(selectedData.DataSourceId.InterfaceType, key, cultureName);
            if (existingPublishSchedule != null)
            {
                WorkflowFacade.AbortWorkflow(existingPublishSchedule.WorkflowInstanceId);

                DataFacade.Delete(existingPublishSchedule);
            }

            if (publishDate != null)
            {
                publishWorkflowInstance = WorkflowFacade.CreateNewWorkflow(
                        typeof(DataPublishSchedulerWorkflow),
                        new Dictionary<string, object> 
                        { 
                            { "Date", publishDate },
                            { "DataType", selectedData.DataSourceId.InterfaceType.FullName },
                            { "DataId", selectedData.GetUniqueKey().ToString() },
                            { "LocaleName", cultureName }
                        }
                    );

                PublishScheduleHelper.CreatePublishSchedule(selectedData.DataSourceId.InterfaceType, selectedData.GetUniqueKey().ToString(), cultureName, publishDate.Value, publishWorkflowInstance);
            }

            var existingUnpublishSchedule = PublishScheduleHelper.GetUnpublishSchedule(selectedData.DataSourceId.InterfaceType, key, cultureName);
            if (existingUnpublishSchedule != null)
            {
                WorkflowFacade.AbortWorkflow(existingUnpublishSchedule.WorkflowInstanceId);

                DataFacade.Delete(existingUnpublishSchedule);
            }

            if (unpublishDate != null)
            {
                unpublishWorkflowInstance = WorkflowFacade.CreateNewWorkflow(
                        typeof(DataUnpublishSchedulerWorkflow),
                        new Dictionary<string, object> 
                        { 
                            { "Date", unpublishDate },
                            { "DataType", selectedData.DataSourceId.InterfaceType.FullName },
                            { "DataId", key },
                            { "LocaleName", cultureName }
                        }
                    );

                PublishScheduleHelper.CreateUnpublishSchedule(selectedData.DataSourceId.InterfaceType, key, cultureName, unpublishDate.Value, unpublishWorkflowInstance);
            }
        }

        public static void HandlePublishUnpublishWorkflows(IPage selectedPage, string cultureName, DateTime? publishDate, DateTime? unpublishDate, ref WorkflowInstance publishWorkflowInstance, ref WorkflowInstance unpublishWorkflowInstance)
        {
            var existingPublishSchedule = PublishScheduleHelper.GetPublishSchedule(typeof(IPage), selectedPage.Id.ToString(), cultureName);
            if (existingPublishSchedule != null)
            {
                WorkflowFacade.AbortWorkflow(existingPublishSchedule.WorkflowInstanceId);

                DataFacade.Delete(existingPublishSchedule);
            }

            if (publishDate != null)
            {
                publishWorkflowInstance = WorkflowFacade.CreateNewWorkflow(
                    typeof(PagePublishSchedulerWorkflow), 
                    new Dictionary<string, object>
                {
                    { "Date", publishDate },
                    { "PageId", selectedPage.Id },
                    { "LocaleName", cultureName }
                });

                PublishScheduleHelper.CreatePublishSchedule(typeof(IPage), selectedPage.Id.ToString(), cultureName, publishDate.Value, publishWorkflowInstance);
            }

            var existingUnpublishSchedule = PublishScheduleHelper.GetUnpublishSchedule(typeof(IPage), selectedPage.Id.ToString(), cultureName);
            if (existingUnpublishSchedule != null)
            {
                WorkflowFacade.AbortWorkflow(existingUnpublishSchedule.WorkflowInstanceId);

                DataFacade.Delete(existingUnpublishSchedule);
            }

            if (unpublishDate != null)
            {
                unpublishWorkflowInstance = WorkflowFacade.CreateNewWorkflow(
                    typeof(PageUnpublishSchedulerWorkflow), 
                    new Dictionary<string, object>
                {
                    { "Date", unpublishDate },
                    { "PageId", selectedPage.Id },
                    { "LocaleName", cultureName }
                });

                PublishScheduleHelper.CreateUnpublishSchedule(typeof(IPage), selectedPage.Id.ToString(), cultureName, unpublishDate.Value, unpublishWorkflowInstance);
            }
        }

        public static void ReloadPageElementInConsole(IPage page)
        {
            var parentPageId = PageManager.GetParentId(page.Id);
            var parentPage = parentPageId != Guid.Empty ? PageManager.GetPageById(parentPageId) : null;

            var parentEntityToken = (parentPage != null)
                                        ? parentPage.GetDataEntityToken()
                                        : (EntityToken)new PageElementProviderEntityToken("PageElementProvider");

            ConsoleMessageQueueFacade.Enqueue(new RefreshTreeMessageQueueItem { EntityToken = parentEntityToken }, null);
        }

        public static bool PublishIfNeeded(IData data, bool doPublish, IDictionary<string, object> binding, Action<DialogType, string, string> messageAction)
        {
            if (!(data is IPublishControlled))
            {
                return false;
            }

            WorkflowInstance publishWorkflowInstance = null;
            WorkflowInstance unpublishWorkflowInstance = null;

            var publishDate = (DateTime?)binding["PublishDate"];
            var unpublishDate = (DateTime?)binding["UnpublishDate"];

            string cultureName = UserSettings.ActiveLocaleCultureInfo.Name;
            HandlePublishUnpublishWorkflows(data, cultureName, publishDate, unpublishDate, ref publishWorkflowInstance, ref unpublishWorkflowInstance);

            if (publishWorkflowInstance != null)
            {
                publishWorkflowInstance.Start();

                WorkflowFacade.RunWorkflow(publishWorkflowInstance);
            }

            if (unpublishWorkflowInstance != null)
            {
                unpublishWorkflowInstance.Start();

                WorkflowFacade.RunWorkflow(unpublishWorkflowInstance);
            }

            if (!doPublish)
            {
                return false;
            }

            if (publishWorkflowInstance == null || publishDate < DateTime.Now)
            {
                var actionToken = new GenericPublishProcessController.PublishActionToken();
                var serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);

                ActionExecutorFacade.Execute(data.GetDataEntityToken(), actionToken, serviceContainer);

                return true;
            }

            var title = Texts.Website_Forms_Administrative_EditPage_PublishDatePreventPublishTitle;
            var message = Texts.Website_Forms_Administrative_EditPage_PublishDatePreventPublish;

            messageAction(DialogType.Warning, title, message);

            return false;
        }
    }
}
