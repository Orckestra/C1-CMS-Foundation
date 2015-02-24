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
    public sealed class DataPublishSchedulerWorkflow : BaseSchedulerWorkflow
    {
        private static readonly string LogTitle = typeof(DataPublishSchedulerWorkflow).Name;

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
                    var publishSchedule =
                        (from ps in DataFacade.GetData<IPublishSchedule>()
                         where ps.DataType == DataType &
                         ps.DataId == DataId &&
                               ps.LocaleCultureName == LocaleName
                         select ps).Single();

                    DataFacade.Delete(publishSchedule);

                    var type = TypeManager.GetType(DataType);

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
