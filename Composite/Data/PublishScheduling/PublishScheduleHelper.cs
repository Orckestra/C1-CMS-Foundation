using System;
using System.Linq;
using System.Workflow.Runtime;
using Composite.Data.Types;

namespace Composite.Data.PublishScheduling
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class PublishScheduleHelper
    {
        /// <exclude />
        public static void CreatePublishSchedule(Type dataType, string id, string cultureName, DateTime date, WorkflowInstance workflow)
        {
            var publishSchedule = DataFacade.BuildNew<IPublishSchedule>();

            publishSchedule.Id = Guid.NewGuid();
            publishSchedule.DataTypeId = dataType.GetImmutableTypeId();
            publishSchedule.DataId = id;
            publishSchedule.PublishDate = date;
            publishSchedule.WorkflowInstanceId = workflow.InstanceId;
            publishSchedule.LocaleCultureName = DataLocalizationFacade.IsLocalized(dataType) ? cultureName : "";

            DataFacade.AddNew(publishSchedule);
        }

        /// <exclude />
        public static void CreateUnpublishSchedule(Type dataType, string id, string cultureName, DateTime date, WorkflowInstance workflow)
        {
            var unpublishSchedule = DataFacade.BuildNew<IUnpublishSchedule>();

            unpublishSchedule.Id = Guid.NewGuid();
            unpublishSchedule.DataTypeId = dataType.GetImmutableTypeId();
            unpublishSchedule.DataId = id;
            unpublishSchedule.UnpublishDate = date;
            unpublishSchedule.WorkflowInstanceId = workflow.InstanceId;
            unpublishSchedule.LocaleCultureName = DataLocalizationFacade.IsLocalized(dataType) ? cultureName : "";

            DataFacade.AddNew(unpublishSchedule);
        }

        /// <exclude />
        public static IPublishSchedule GetPublishSchedule(Type dataType, string id, string cultureName)
        {
            Guid dataTypeId = dataType.GetImmutableTypeId();
            var query = DataFacade.GetData<IPublishSchedule>().Where(ps => ps.DataId == id && ps.DataTypeId == dataTypeId);

            if (DataLocalizationFacade.IsLocalized(dataType))
            {
                query = query.Where(ps => ps.LocaleCultureName == cultureName);
            }

            return query.FirstOrDefault();
        }

        /// <exclude />
        public static IUnpublishSchedule GetUnpublishSchedule(Type dataType, string id, string cultureName)
        {
            Guid dataTypeId = dataType.GetImmutableTypeId();
            var query = DataFacade.GetData<IUnpublishSchedule>().Where(ps => ps.DataId == id && ps.DataTypeId == dataTypeId);

            if (DataLocalizationFacade.IsLocalized(dataType))
            {
                query = query.Where(ps => ps.LocaleCultureName == cultureName);
            }

            return query.FirstOrDefault();
        }
    }
}
