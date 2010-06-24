using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using Composite.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Types;
using Composite.Workflow;


namespace Composite.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteDataFolderWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public DeleteDataFolderWorkflow()
        {
            InitializeComponent();
        }



        private IPage GetPage()
        {
            AssociatedDataElementProviderHelperEntityToken entityToken = (AssociatedDataElementProviderHelperEntityToken)this.EntityToken;

            return PageManager.GetPageById(new Guid(entityToken.Id));
        }



        private Type GetFolderType()
        {
            AssociatedDataElementProviderHelperEntityToken entityToken = (AssociatedDataElementProviderHelperEntityToken)this.EntityToken;

            return TypeManager.GetType(entityToken.Payload);
        }



        private void confirmCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            this.Bindings.Add("DeleteDatas", true);
        }



        private void HasDataReferences(object sender, ConditionalEventArgs e)
        {
            IPage page = GetPage();

            IEnumerable<IData> dataToDelete = page.GetFolderData();

            var brokenReferences = new List<IData>();

            foreach (var data in dataToDelete)
            {
                var references = DataReferenceFacade.GetNotOptionalReferences(data);
                foreach (var reference in references)
                {
                    DataSourceId dataSourceId = reference.DataSourceId;
                    if (brokenReferences.Any(brokenRef => brokenRef.DataSourceId.Equals(dataSourceId))
                        || dataToDelete.Any(elem => elem.DataSourceId.Equals(dataSourceId)))
                    {
                        continue;
                    }

                    brokenReferences.Add(reference);
                }
            }

            e.Result = brokenReferences.Count > 0;
            if (brokenReferences.Count == 0)
            {
                return;
            }

            Bindings.Add("ReferencedData", DataReferenceFacade.GetBrokenReferencesReport(brokenReferences));
        }



        private void ShouldDeleteData(object sender, ConditionalEventArgs e)
        {
            e.Result = this.GetBinding<bool>("DeleteDatas");
        }



        private void deleteCodeActivity_Delete_ExecuteCode(object sender, EventArgs e)
        {
            IPage page = GetPage();
            Type folderType = GetFolderType();

            page.RemoveFolderDefinition(folderType, this.GetBinding<bool>("DeleteDatas"));

            SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
            specificTreeRefresher.PostRefreshMesseges(page.GetDataEntityToken());
        }
    }
}
