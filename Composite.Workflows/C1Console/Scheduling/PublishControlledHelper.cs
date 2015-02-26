using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Runtime;

using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.Core.ResourceSystem;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types;
using Composite.Plugins.Elements.ElementProviders.PageElementProvider;

namespace Composite.C1Console.Scheduling
{
    public class PublishControlledHelper
    {
        public static void CreatePublishSchedule(Type dataType, string id, string cultureName, DateTime date, WorkflowInstance workflow)
        {
            var publishSchedule = DataFacade.BuildNew<IPublishSchedule>();

            publishSchedule.Id = Guid.NewGuid();
            publishSchedule.DataType = dataType.FullName;
            publishSchedule.DataId = id;
            publishSchedule.PublishDate = date;
            publishSchedule.WorkflowInstanceId = workflow.InstanceId;
            publishSchedule.LocaleCultureName = cultureName;

            DataFacade.AddNew(publishSchedule);
        }

        public static void CreateUnpublishSchedule(Type dataType, string id, string cultureName, DateTime date, WorkflowInstance workflow)
        {
            var unpublishSchedule = DataFacade.BuildNew<IUnpublishSchedule>();

            unpublishSchedule.Id = Guid.NewGuid();
            unpublishSchedule.DataType = dataType.FullName;
            unpublishSchedule.DataId = id;
            unpublishSchedule.UnpublishDate = date;
            unpublishSchedule.WorkflowInstanceId = workflow.InstanceId;
            unpublishSchedule.LocaleCultureName = cultureName;

            DataFacade.AddNew(unpublishSchedule);
        }

        public static IPublishSchedule GetPublishedSchedule(Type dataType, string id, string cultureName)
        {
            return (from ps in DataFacade.GetData<IPublishSchedule>()
                    where ps.DataType == dataType.FullName &&
                        ps.DataId == id &&
                        ps.LocaleCultureName == cultureName
                    select ps).FirstOrDefault();
        }

        public static IUnpublishSchedule GetUnpublishedSchedule(Type dataType, string id, string cultureName)
        {
            return (from ps in DataFacade.GetData<IUnpublishSchedule>()
                    where ps.DataType == dataType.FullName &&
                        ps.DataId == id &&
                        ps.LocaleCultureName == cultureName
                    select ps).FirstOrDefault();
        }

        public static void HandlePublishUnpublishWorkflows(IData selectedData, string cultureName, DateTime? publishDate, DateTime? unpublishDate, ref WorkflowInstance publishWorkflowInstance, ref WorkflowInstance unpublishWorkflowInstance)
        {
            var key = selectedData.GetUniqueKey().ToString();

            var existingPublishSchedule = GetPublishedSchedule(selectedData.DataSourceId.InterfaceType, key, cultureName);
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

                CreatePublishSchedule(selectedData.DataSourceId.InterfaceType, selectedData.GetUniqueKey().ToString(), cultureName, publishDate.Value, publishWorkflowInstance);
            }

            var existingUnpublishSchedule = GetUnpublishedSchedule(selectedData.DataSourceId.InterfaceType, key, cultureName);
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

                CreateUnpublishSchedule(selectedData.DataSourceId.InterfaceType, key, cultureName, unpublishDate.Value, unpublishWorkflowInstance);
            }
        }

        public static void HandlePublishUnpublishWorkflows(IPage selectedPage, string cultureName, DateTime? publishDate, DateTime? unpublishDate, ref WorkflowInstance publishWorkflowInstance, ref WorkflowInstance unpublishWorkflowInstance)
        {
            var existingPublishSchedule = GetPublishedSchedule(typeof(IPage), selectedPage.Id.ToString(), cultureName);
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

                CreatePublishSchedule(typeof(IPage), selectedPage.Id.ToString(), cultureName, publishDate.Value, publishWorkflowInstance);
            }

            var existingUnpublishSchedule = GetUnpublishedSchedule(typeof(IPage), selectedPage.Id.ToString(), cultureName);
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

                CreateUnpublishSchedule(typeof(IPage), selectedPage.Id.ToString(), cultureName, unpublishDate.Value, unpublishWorkflowInstance);
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

            var title = StringResourceSystemFacade.GetString("Composite.Management", "Website.Forms.Administrative.EditPage.PublishDatePreventPublishTitle");
            var message = StringResourceSystemFacade.GetString("Composite.Management", "Website.Forms.Administrative.EditPage.PublishDatePreventPublish");

            messageAction(DialogType.Warning, title, message);

            return false;
        }
    }
}
