using System;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    public sealed partial class UnLocalizePageWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public UnLocalizePageWorkflow()
        {
            InitializeComponent();
        }

        private void InitializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
            IPage selectedPage = (IPage)dataEntityToken.Data;
            PageServices.DeletePage(selectedPage.Id, selectedPage.VersionId, selectedPage.DataSourceId.LocaleScope, false);

            var parentTreeRefresher = this.CreateParentTreeRefresher();
            parentTreeRefresher.PostRefreshMessages(selectedPage.GetDataEntityToken());
        }
    }
}
