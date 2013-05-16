using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Workflow.Activities;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Data.ProcessControlled;
using Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Workflow;
using Composite.Core.Extensions; 


namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteDataWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public DeleteDataWorkflow()
        {
            InitializeComponent();
        }

        private void HasDataReferences(object sender, ConditionalEventArgs e)
        {
            IData data = ((DataEntityToken)this.EntityToken).Data;

            var brokenReferences = new List<IData>();

            var references = DataReferenceFacade.GetNotOptionalReferences(data);
            foreach (var reference in references)
            {
                DataSourceId referenceDataSourceId = reference.DataSourceId;
                if (brokenReferences.Any(brokenRef => brokenRef.DataSourceId == referenceDataSourceId))
                {
                    continue;
                }

                brokenReferences.Add(reference);
            }

            e.Result = brokenReferences.Count > 0;
            if (brokenReferences.Count == 0)
            {
                return;
            }

            Bindings.Add("ReferencedData", DataReferenceFacade.GetBrokenReferencesReport(brokenReferences));
        }

        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DeleteTreeRefresher deleteTreeRefresher = this.CreateDeleteTreeRefresher(this.EntityToken);

            IData data = ((DataEntityToken)this.EntityToken).Data;

            if (DataFacade.WillDeleteSucceed(data))
            {
                ProcessControllerFacade.FullDelete(data);

                deleteTreeRefresher.PostRefreshMesseges(true);
            }
            else
            {
                this.ShowMessage(
                        DialogType.Error,
                        StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", "CascadeDeleteErrorTitle"),
                        StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", "CascadeDeleteErrorMessage")
                    );
            }
        }
    }
}
