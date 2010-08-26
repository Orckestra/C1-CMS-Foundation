using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Workflow;


namespace Composite.C1Console.Trees.Workflows
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class GenericDeleteDataWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public GenericDeleteDataWorkflow()
        {
            InitializeComponent();
        }



        private void HasDataReferences(object sender, ConditionalEventArgs e)
        {
            IData data = ((DataEntityToken)this.EntityToken).Data;

            this.Bindings.Add("Text", string.Format("{0}: {1}", Composite.Core.ResourceSystem.StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "TreeGenericDeleteConfirm.Text"), data.GetLabel()));

            var brokenReferences = new List<IData>();

            List<IData> references = DataReferenceFacade.GetNotOptionalReferences(data);
            foreach (IData reference in references)
            {
                DataSourceId dataSourceId = reference.DataSourceId;
                if (brokenReferences.Any(brokenRef => brokenRef.DataSourceId == dataSourceId))
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



        private void finalizeCodeActivity_DeteleData_ExecuteCode(object sender, System.EventArgs e)
        {
            DeleteTreeRefresher deleteTreeRefresher = this.CreateDeleteTreeRefresher(this.EntityToken);

            IData data = ((DataEntityToken)this.EntityToken).Data;

            if (DataFacade.WillDeleteSucceed(data) == true)
            {
                ProcessControllerFacade.FullDelete(data);

                deleteTreeRefresher.PostRefreshMesseges(true);
            }
            else
            {
                this.ShowMessage(
                        DialogType.Error,
                        StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "TreeGenericDelete.CascadeDeleteErrorTitle"),
                        StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "TreeGenericDelete.CascadeDeleteErrorMessage")
                    );
            }
        }
    }
}
