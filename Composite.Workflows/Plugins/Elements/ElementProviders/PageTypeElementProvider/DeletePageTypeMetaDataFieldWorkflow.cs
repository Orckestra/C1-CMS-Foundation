using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq.Expressions;
using System.Transactions;
using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Types;
using Composite.Core.Linq;
using Composite.Core.ResourceSystem;
using Composite.Data.Transactions;
using Composite.Core.Types;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.PageTypeElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeletePageTypeMetaDataFieldWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public DeletePageTypeMetaDataFieldWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_UpdateBindings_ExecuteCode(object sender, EventArgs e)
        {
            IPageTypeMetaDataTypeLink pageTypeMetaDataTypeLink = this.GetDataItemFromEntityToken<IPageTypeMetaDataTypeLink>();

            this.Bindings.Add("MessageText", string.Format(StringResourceSystemFacade.GetString("Composite.Plugins.PageTypeElementProvider", "PageType.DeletePageTypeMetaDataFieldWorkflow.Confirm.Layout.Message"), pageTypeMetaDataTypeLink.Name));
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            IPageTypeMetaDataTypeLink pageTypeMetaDataTypeLink = this.GetDataItemFromEntityToken<IPageTypeMetaDataTypeLink>();

            DeleteTreeRefresher deleteTreeRefresher = this.CreateDeleteTreeRefresher(this.EntityToken);

            DataTypeDescriptor dataTypeDescriptor;
            if (DynamicTypeManager.TryGetDataTypeDescriptor(pageTypeMetaDataTypeLink.DataTypeId, out dataTypeDescriptor))
            {
                PageMetaDataFacade.RemoveDefinition(pageTypeMetaDataTypeLink.PageTypeId, pageTypeMetaDataTypeLink.Name);
            }

            DataFacade.Delete<IPageTypeMetaDataTypeLink>(pageTypeMetaDataTypeLink);

            deleteTreeRefresher.PostRefreshMesseges();
        }
    }
}
