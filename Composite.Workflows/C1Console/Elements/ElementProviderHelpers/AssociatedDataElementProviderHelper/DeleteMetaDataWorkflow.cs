using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Core.Types;
using Composite.C1Console.Workflow;
using Composite.Data.Types;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Events;
using System.Workflow.Activities;


namespace Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteMetaDataWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public DeleteMetaDataWorkflow()
        {
            InitializeComponent();
        }


        private IPage GetCurrentPage()
        {
            if ((this.EntityToken is DataEntityToken) == true)
            {
                return this.GetDataItemFromEntityToken<IPage>();
            }
            else
            {
                return null;
            }
        }



        private void DoesDefinedMetaDataTypesExists(object sender, ConditionalEventArgs e)
        {
            IPage page = GetCurrentPage();

            e.Result = page.GetDefinedMetaDataTypes().Count() > 0;
        }



        private void initializeCodeActivity_ShowMessage_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowMessage(
                DialogType.Message,
                StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.DeleteMetaDataWorkflow.NoDefinedTypesExists.Title"),
                StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.DeleteMetaDataWorkflow.NoDefinedTypesExists.Message"));
        }



        private void confirmCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            IPage page = GetCurrentPage();

            Dictionary<Pair<string, Type>, string> fieldGroupNames = new Dictionary<Pair<string, Type>, string>();
            foreach (Tuple<Type, string> typeName in page.GetDefinedMetaDataTypeAndNames().OrderBy(f => f.Item2))
            {
                fieldGroupNames.Add(new Pair<string, Type>(typeName.Item2, typeName.Item1), typeName.Item2);
            }

            this.UpdateBinding("FieldGroupNames", fieldGroupNames);
            this.UpdateBinding("SelectedFieldGroupName", fieldGroupNames.Keys.First());
        }



        private void deleteCodeActivity_Delete_ExecuteCode(object sender, EventArgs e)
        {
            IPage page = GetCurrentPage();

            Pair<string, Type> metaDataPair = this.GetBinding<Pair<string, Type>>("SelectedFieldGroupName");

            page.RemoveMetaDataDefinition(metaDataPair.First);

            ParentTreeRefresher parentTreeRefresher = this.CreateParentTreeRefresher();
            parentTreeRefresher.PostRefreshMesseges(this.EntityToken);
        }        
    }
}
