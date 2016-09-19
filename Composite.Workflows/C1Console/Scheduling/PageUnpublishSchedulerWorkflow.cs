using System;
using System.ComponentModel;
using System.Globalization;
using Composite.Data;
using Composite.Data.PublishScheduling;
using Composite.Data.Types;

namespace Composite.C1Console.Scheduling
{
    [Obsolete]
    public sealed class PageUnpublishSchedulerWorkflow : BaseSchedulerWorkflow
    {
        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public Guid PageId { get; set; }

        protected override void Execute()
        {
            using (new DataScope(DataScopeIdentifier.Administrated, CultureInfo.CreateSpecificCulture(LocaleName)))
            {
                var pageUnpublishSchedule = PublishScheduleHelper.GetUnpublishSchedule(typeof (IPage), PageId.ToString(), LocaleName);
                Verify.IsNotNull(pageUnpublishSchedule, "Missing an unpublish page schedule record.");

                DataFacade.Delete(pageUnpublishSchedule);

                // NOTE: Unpublication logic removed
            }
        }
    }
}
