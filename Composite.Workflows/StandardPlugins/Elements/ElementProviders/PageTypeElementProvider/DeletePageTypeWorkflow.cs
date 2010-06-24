using System;
using System.Linq;
using System.Workflow.Activities;
using Composite.Data.Types;
using Composite.Workflow;
using Composite.Data;
using Composite.ResourceSystem;
using Composite.Actions;
using Composite.Linq;
using System.Collections.Generic;


namespace Composite.Workflows.StandardPlugins.Elements.ElementProviders.PageTypeElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeletePageTypeWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public DeletePageTypeWorkflow()
        {
            InitializeComponent();
        }



        private void IsPageReferingPageType(object sender, ConditionalEventArgs e)
        {            
            IPageType pageType = (IPageType)((DataEntityToken)this.EntityToken).Data;

            e.Result = DataFacade.GetData<IPage>().Where(f => f.PageTypeId == pageType.Id).Any();
        }



        private void confirmCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            IPageType pageType = (IPageType)((DataEntityToken)this.EntityToken).Data;

            this.Bindings.Add("MessageText", string.Format(StringResourceSystemFacade.GetString("Composite.StandardPlugins.PageTypeElementProvider", "PageType.DeletePageTypeWorkflow.Confirm.Layout.Messeage"), pageType.Name));
        }



        private void showPageReferingCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            IPageType pageType = (IPageType)((DataEntityToken)this.EntityToken).Data;

            this.Bindings.Add("MessageText", string.Format(StringResourceSystemFacade.GetString("Composite.StandardPlugins.PageTypeElementProvider", "PageType.DeletePageTypeWorkflow.PagesRefering.Layout.Message"), pageType.Name));
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            IPageType pageType = (IPageType)((DataEntityToken)this.EntityToken).Data;

            DeleteTreeRefresher deleteTreeRefresher = this.CreateDeleteTreeRefresher(this.EntityToken);

            IEnumerable<IPageTypeMetaDataTypeLink> pageTypeMetaDataTypeLinks = 
                DataFacade.GetData<IPageTypeMetaDataTypeLink>().
                Where(f => f.PageTypeId == pageType.Id).
                Evaluate();

            foreach (IPageTypeMetaDataTypeLink pageTypeMetaDataTypeLink in pageTypeMetaDataTypeLinks)
            {
                PageMetaDataFacade.RemoveDefinition(pageType.Id, pageTypeMetaDataTypeLink.Name);
            }

            DataFacade.Delete<IPageType>(pageType);

            deleteTreeRefresher.PostRefreshMesseges();
        }
    }
}
