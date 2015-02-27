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
    public sealed class DataUnpublishSchedulerWorkflow : BaseSchedulerWorkflow
    {
        private static readonly string LogTitle = typeof(DataUnpublishSchedulerWorkflow).Name;

        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public string DataType { get; set; }

        [Browsable(false), DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public string DataId { get; set; }

        protected override void Execute()
        {
            var type = TypeManager.GetType(DataType);

            using (new DataScope(DataScopeIdentifier.Administrated, CultureInfo.CreateSpecificCulture(LocaleName)))
            {
                using (var transaction = TransactionsFacade.CreateNewScope())
                {
                    var unpublishSchedule = PublishScheduleHelper.GetUnpublishSchedule(type, DataId, LocaleName);
                    Verify.IsNotNull(unpublishSchedule, "Missing an unpublish data schedule record");

                    DataFacade.Delete(unpublishSchedule);

                    var deletePublished = false;

                    var data = (IPublishControlled)DataFacade.GetDataByUniqueKey(type, DataId);
                    Verify.IsNotNull(data, "The data with the id {0} does not exist", DataId);

                    var transitions = ProcessControllerFacade.GetValidTransitions(data).Keys;

                    if (transitions.Contains(GenericPublishProcessController.Draft))
                    {
                        data.PublicationStatus = GenericPublishProcessController.Draft;

                        DataFacade.Update(data);

                        deletePublished = true;
                    }
                    else
                    {
                        Log.LogWarning(LogTitle, "Scheduled unpublishing of data with label '{0}' could not be done because the data is not in a unpublisheble state", data.GetLabel());
                    }


                    if (deletePublished)
                    {
                        using (new DataScope(DataScopeIdentifier.Public))
                        {
                            var deletedData = (IPublishControlled)DataFacade.GetDataByUniqueKey(type, DataId);
                            if (deletedData != null)
                            {
                                DataFacade.Delete(deletedData, CascadeDeleteType.Disable);

                                Log.LogVerbose(LogTitle, "Scheduled unpublishing of data with label '{0}' is complete", deletedData.GetLabel());
                            }
                        }
                    }

                    transaction.Complete();
                }
            }
        }
    }
}
