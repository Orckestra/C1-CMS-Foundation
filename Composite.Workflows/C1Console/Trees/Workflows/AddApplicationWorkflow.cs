using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Workflow.Activities;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Elements.Plugins.ElementAttachingProvider;
using Composite.Data.Transactions;
using Composite.C1Console.Trees;
using Composite.Core.Types;
using Composite.C1Console.Workflow;


namespace Composite.C1Console.Trees.Workflows
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddApplicationWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public AddApplicationWorkflow()
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
                if (tree.HasPossibleAttachmentPoints(this.EntityToken) == false) continue;
                if (tree.HasAttachmentPoints(this.EntityToken)) continue;

                selectableTreeIds.Add(tree.TreeId, tree.AllowedAttachmentApplicationName);
            }


            if (selectableTreeIds.Count > 0)
            {
                this.UpdateBinding("SelectedTreeId", selectableTreeIds.First().Key);
                this.UpdateBinding("SelectableTreeIds", selectableTreeIds);

                Dictionary<string, string> selectablePositions = Enum.GetNames(typeof(ElementAttachingProviderPosition)).ToDictionary(f => f);
                this.UpdateBinding("SelectedPosition", selectablePositions.First().Key);
                this.UpdateBinding("SelectablePositions", selectablePositions);
            }
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;

            object keyValue = dataEntityToken.DataSourceId.GetKeyValue();

            string treeId = this.GetBinding<string>("SelectedTreeId");
            string serializedPosition = this.GetBinding<string>("SelectedPosition");

            ElementAttachingProviderPosition position = (ElementAttachingProviderPosition)Enum.Parse(typeof(ElementAttachingProviderPosition), serializedPosition);

            TreeFacade.AddPersistedAttachmentPoint(treeId, dataEntityToken.InterfaceType, keyValue, position);

            this.RefreshCurrentEntityToken();
        }



        private void initializeCodeActivity_ShowNoTreesMessage_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowMessage(DialogType.Message, "${Composite.C1Console.Trees, AddApplication.NoTrees.Title}", "${Composite.C1Console.Trees, AddApplication.NoTrees.Message}");
        }
    }
}
