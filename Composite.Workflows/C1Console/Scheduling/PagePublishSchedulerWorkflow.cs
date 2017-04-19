using System;
using System.ComponentModel;
using System.Globalization;
using Composite.Data;
using Composite.Data.PublishScheduling;
using Composite.Data.Types;

namespace Composite.C1Console.Scheduling
{
    [Obsolete]
    public sealed class PagePublishSchedulerWorkflow : BaseSchedulerWorkflow
    {
        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public Guid PageId { get; set; }

        protected override void Execute()
        {
            using (new DataScope(DataScopeIdentifier.Administrated, CultureInfo.CreateSpecificCulture(LocaleName)))
            {
                var pagePublishSchedule = PublishScheduleHelper.GetPublishSchedule(typeof(IPage), PageId.ToString(), LocaleName);
                DataFacade.Delete(pagePublishSchedule);

                // NOTE: publication logic removed
            }
        }
    }
}
