using System.ComponentModel;
using System.Globalization;
using System.Linq;

using Composite.Core;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Transactions;
using Composite.Data.Types;

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
            using (new DataScope(DataScopeIdentifier.Administrated, CultureInfo.CreateSpecificCulture(LocaleName)))
            {
                using (var transaction = TransactionsFacade.CreateNewScope())
                {
                    var unpublishSchedule =
                        (from ps in DataFacade.GetData<IUnpublishSchedule>()
                         where ps.DataType == DataType &
                         ps.DataId == DataId &&
                               ps.LocaleCultureName == LocaleName
                         select ps).Single();

                    DataFacade.Delete(unpublishSchedule);

                    var deletePublished = false;

                    var type = TypeManager.GetType(DataType);

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
