using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteMediaFileWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public DeleteMediaFileWorkflow()
        {
            InitializeComponent();
        }

        private void HasDataReferences(object sender, ConditionalEventArgs e)
        {
            IData mediaFile = ((DataEntityToken)this.EntityToken).Data;

            var brokenReferences = new List<IData>();

            var references = DataReferenceFacade.GetNotOptionalReferences(mediaFile);
            foreach (var reference in references)
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


        private void deleteCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DeleteTreeRefresher treeRefresher = this.CreateDeleteTreeRefresher(this.EntityToken);
            DataEntityToken token = (DataEntityToken)this.EntityToken;
            IMediaFile file = (IMediaFile)token.Data;

            if (DataFacade.WillDeleteSucceed(file))
            {
                DataFacade.Delete(file);

                treeRefresher.PostRefreshMesseges(true);
            }
            else
            {
                this.ShowMessage(
                        DialogType.Error,
                        StringResourceSystemFacade.GetString("Composite.Management", "DeleteMediaFileWorkflow.CascadeDeleteErrorTitle"),
                        StringResourceSystemFacade.GetString("Composite.Management", "DeleteMediaFileWorkflow.CascadeDeleteErrorMessage")
                    );
            }
        }
    }
}
