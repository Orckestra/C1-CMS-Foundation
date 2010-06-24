using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq.Expressions;
using System.Transactions;
using Composite.Actions;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Types;
using Composite.Linq;
using Composite.ResourceSystem;
using Composite.Transactions;
using Composite.Types;
using Composite.Workflow;


namespace Composite.Workflows.StandardPlugins.Elements.ElementProviders.PageTypeElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeletePageTypeMetaDataFieldWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public DeletePageTypeMetaDataFieldWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_UpdateBindings_ExecuteCode(object sender, EventArgs e)
        {
            IPageTypeMetaDataTypeLink pageTypeMetaDataTypeLink = this.GetDataItemFromEntityToken<IPageTypeMetaDataTypeLink>();

            this.Bindings.Add("MessageText", string.Format(StringResourceSystemFacade.GetString("Composite.StandardPlugins.PageTypeElementProvider", "PageType.DeletePageTypeMetaDataFieldWorkflow.Confirm.Layout.Message"), pageTypeMetaDataTypeLink.Name));
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            IPageTypeMetaDataTypeLink pageTypeMetaDataTypeLink = this.GetDataItemFromEntityToken<IPageTypeMetaDataTypeLink>();

            DeleteTreeRefresher deleteTreeRefresher = this.CreateDeleteTreeRefresher(this.EntityToken);

            DataTypeDescriptor dataTypeDescriptor;
            if (DynamicTypeManager.TryGetDataTypeDescriptor(pageTypeMetaDataTypeLink.DataTypeId, out dataTypeDescriptor) == true)
            {
                PageMetaDataFacade.RemoveDefinition(pageTypeMetaDataTypeLink.PageTypeId, pageTypeMetaDataTypeLink.Name);
            }

            DataFacade.Delete<IPageTypeMetaDataTypeLink>(pageTypeMetaDataTypeLink);

            deleteTreeRefresher.PostRefreshMesseges();
        }
    }
}
