using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Workflow.Activities;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.Types;
using Composite.Data.Transactions;
using Composite.C1Console.Trees;
using Composite.C1Console.Trees.Foundation.AttachmentPoints;
using Composite.Core.Types;
using Composite.C1Console.Workflow;


namespace Composite.C1Console.Trees.Workflows
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class RemoveApplicationWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
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
                if (!tree.HasAttachmentPoints(this.EntityToken)) continue;
                if (!tree.HasPossibleAttachmentPoints(this.EntityToken)) continue;

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
            this.ShowMessage(DialogType.Message, "${Composite.C1Console.Trees, RemoveApplication.NoTrees.Title}", "${Composite.C1Console.Trees, RemoveApplication.NoTrees.Message}");
        }
    }
}
