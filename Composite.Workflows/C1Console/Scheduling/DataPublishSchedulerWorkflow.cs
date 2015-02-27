using System;
using System.ComponentModel;
using System.Globalization;
using Composite.Core;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.PublishScheduling;
using Composite.Data.Transactions;


namespace Composite.C1Console.Scheduling
{
    public sealed class DataPublishSchedulerWorkflow : BaseSchedulerWorkflow
    {
        private static readonly string LogTitle = typeof(DataPublishSchedulerWorkflow).Name;

        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public string DataType { get; set; }

        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public string DataId { get; set; }

        protected override void Execute()
        {
            Type type = TypeManager.GetType(DataType);

            using (new DataScope(DataScopeIdentifier.Administrated, CultureInfo.CreateSpecificCulture(LocaleName)))
            {
                using (var transaction = TransactionsFacade.CreateNewScope())
                {
                    var publishSchedule = PublishScheduleHelper.GetPublishSchedule(type, DataId, LocaleName);
                    DataFacade.Delete(publishSchedule);

                    var data = (IPublishControlled)DataFacade.GetDataByUniqueKey(type, DataId);
                    Verify.IsNotNull(data, "The data with the id '{0}' does not exist", DataId);

                    var transitions = ProcessControllerFacade.GetValidTransitions(data).Keys;

                    if (transitions.Contains(GenericPublishProcessController.Published))
                    {
                        data.PublicationStatus = GenericPublishProcessController.Published;

                        DataFacade.Update(data);

                        Log.LogVerbose(LogTitle, "Scheduled publishing of data with label '{0}' is complete", data.GetLabel());
                    }
                    else
                    {
                        Log.LogWarning(LogTitle, "Scheduled publishing of data with label '{0}' could not be done because the data is not in a publisheble state", data.GetLabel());
                    }

                    transaction.Complete();
                }
            }
        }
    }
}
