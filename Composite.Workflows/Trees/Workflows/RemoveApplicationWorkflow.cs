using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Workflow.Activities;
using Composite.ConsoleEventSystem;
using Composite.Data;
using Composite.Data.Types;
using Composite.Transactions;
using Composite.Trees;
using Composite.Trees.Foundation.AttachmentPoints;
using Composite.Types;
using Composite.Workflow;


namespace Composite.Workflows.Trees.Workflows
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class RemoveApplicationWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public RemoveApplicationWorkflow()
        {
            InitializeComponent();
        }



        private void IsThereAnyTrees(object sender, ConditionalEventArgs e)
        {
            e.Result = this.BindingExist("SelectedTreeId");
        }



        private void initializeCodeActivity_UpdateBindings_ExecuteCode(object sender, EventArgs e)
        {
            Dictionary<string, string> selectableTreeIds = new Dictionary<string, string>();
            foreach (Tree tree in TreeFacade.AllTrees)
            {
                if (tree.HasAttachmentPoints(this.EntityToken) == false) continue;

                selectableTreeIds.Add(tree.TreeId, tree.AllowedAttachmentApplicationName);
            }


            if (selectableTreeIds.Count > 0)
            {
                this.UpdateBinding("SelectedTreeId", selectableTreeIds.First().Key);
                this.UpdateBinding("SelectableTreeIds", selectableTreeIds);
            }
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            string treeId = this.GetBinding<string>("SelectedTreeId");

            Tree tree = TreeFacade.GetTree(treeId);
            
            DynamicDataItemAttachmentPoint dataItemAttachmentPoint = (DynamicDataItemAttachmentPoint)tree.GetAttachmentPoints(this.EntityToken).Single();

            TreeFacade.RemovePersistedAttachmentPoint(treeId, dataItemAttachmentPoint.InterfaceType, dataItemAttachmentPoint.KeyValue);            

            this.RefreshCurrentEntityToken();
        }



        private void initializeCodeActivity_ShowNoTreesMessage_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowMessage(DialogType.Message, "${Composite.Trees, RemoveApplication.NoTrees.Title}", "${Composite.Trees, RemoveApplication.NoTrees.Message}");
        }
    }
}
