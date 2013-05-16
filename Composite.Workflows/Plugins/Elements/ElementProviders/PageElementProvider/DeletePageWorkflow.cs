using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Transactions;
using System.Workflow.Activities;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.Types;
using Composite.Core.ResourceSystem;
using Composite.Data.Transactions;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    [EntityTokenLock]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeletePageWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public DeletePageWorkflow()
        {
            InitializeComponent();
        }


        private void HasInstanceCompositionsTest(object sender, ConditionalEventArgs e)
        {
            e.Result = false; // Ignore this test, we delete all defined folders ande metadat fields when last page (with respect to locales) are deleted            
        }


        private void HasSubpages(object sender, ConditionalEventArgs e)
        {
            e.Result = this.GetBinding<bool>("HasSubPages");
        }



        private void HasDataReferences(object sender, ConditionalEventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
            IPage selectedPage = (IPage)dataEntityToken.Data;

            List<IData> dataToDelete = new List<IData>();

            IEnumerable<IPage> subtree = new[] { selectedPage }.Concat(selectedPage.GetSubChildren());

            foreach (IPage page in subtree)
            {
                dataToDelete.Add(page);
                dataToDelete.AddRange(page.GetFolderData());
                dataToDelete.AddRange(page.GetMetaData());
            }

            var brokenReferences = new List<IData>();
            foreach (var data in dataToDelete)
            {
                var references = DataReferenceFacade.GetNotOptionalReferences(data);
                foreach (var reference in references)
                {
                    if (reference is IPagePlaceholderContent)
                    {
                        continue;
                    }

                    DataSourceId dataSourceId = reference.DataSourceId;
                    if (dataToDelete.Any(elem => elem.DataSourceId.Equals(dataSourceId))
                        || brokenReferences.Any(brokenRef => brokenRef.DataSourceId.Equals(dataSourceId)))
                    {
                        continue;
                    }

                    brokenReferences.Add(reference);
                }
            }

            e.Result = brokenReferences.Count > 0;
            if (brokenReferences.Count > 0)
            {
                Bindings.Add("ReferencedData", DataReferenceFacade.GetBrokenReferencesReport(brokenReferences));
            }
        }



        private void codeActivity1_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
            IPage selectedPage = (IPage)dataEntityToken.Data;

            bool hasChildren = PageServices.GetChildren(selectedPage.Id).Any();

            Dictionary<string, object> bindings = new Dictionary<string, object>();
            bindings.Add("HasSubPages", hasChildren);
            bindings.Add("DeleteAllSubPages", false);
            bindings.Add("DeleteMessageText", string.Format(StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "DeletePageStep2.Text"), selectedPage.Title));
            this.Bindings = bindings;
        }


        private void codeActivity2_ExecuteCode(object sender, EventArgs e)
        {
            bool hasSubPages = this.GetBinding<bool>("HasSubPages");

            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
            IPage selectedPage = (IPage)dataEntityToken.Data;

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                if (DataFacade.WillDeleteSucceed<IPage>(selectedPage) == false)
                {
                    this.ShowMessage(
                        DialogType.Error,
                        StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "DeletePageWorkflow.CascadeDeleteErrorTitle"),
                        StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "DeletePageWorkflow.CascadeDeleteErrorMessage")
                    );

                    return;
                }

                List<CultureInfo> cultures = DataLocalizationFacade.ActiveLocalizationCultures.ToList();
                cultures.Remove(selectedPage.DataSourceId.LocaleScope);

                if (hasSubPages)
                {
                    List<IPage> pagesToDelete = selectedPage.GetSubChildren().ToList();

                    foreach (IPage page in pagesToDelete)
                    {
                        if (DataFacade.WillDeleteSucceed<IPage>(page) == false)
                        {
                            this.ShowMessage(
                                DialogType.Error,
                                StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "DeletePageWorkflow.CascadeDeleteErrorTitle"),
                                StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "DeletePageWorkflow.CascadeDeleteErrorMessage")
                            );

                            return;
                        }
                    }

                    foreach (IPage page in pagesToDelete)
                    {
                        if (ExistInOtherLocale(cultures, page) == false)
                        {
                            RemoveAllFolderAndMetaDataDefinitions(page);
                        }

                        page.DeletePageStructure();
                        ProcessControllerFacade.FullDelete(page);
                    }
                }

                if (ExistInOtherLocale(cultures, selectedPage) == false)
                {
                    RemoveAllFolderAndMetaDataDefinitions(selectedPage);
                }

                ParentTreeRefresher parentTreeRefresher = this.CreateParentTreeRefresher();
                parentTreeRefresher.PostRefreshMesseges(selectedPage.GetDataEntityToken(), 2);

                selectedPage.DeletePageStructure();
                ProcessControllerFacade.FullDelete(selectedPage);

                transactionScope.Complete();
            }
        }


        private bool ExistInOtherLocale(List<CultureInfo> cultures, IPage page)
        {
            foreach (CultureInfo localeCultureInfo in cultures)
            {
                using (new DataScope(localeCultureInfo))
                {
                    if (Composite.Data.PageManager.GetPageById(page.Id) != null)
                    {
                        return true;
                    }
                }
            }

            return false;
        }


        private void RemoveAllFolderAndMetaDataDefinitions(IPage page)
        {
            foreach (Type folderType in page.GetDefinedFolderTypes())
            {
                page.RemoveFolderDefinition(folderType, true);
            }

            foreach (Tuple<Type, string> metaDataTypeAndName in page.GetDefinedMetaDataTypeAndNames())
            {
                page.RemoveMetaDataDefinition(metaDataTypeAndName.Item2, true);
            }
        }


        private void initializeCodeActivity_ShowError_InstanceCompositions_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowMessage(
                DialogType.Error,
                "${Composite.Plugins.PageElementProvider, DeletePageWorkflow.HasCompositionsTitle}",
                "${Composite.Plugins.PageElementProvider, DeletePageWorkflow.HasCompositionsMessage}"
            );
        }

        private void confDeleteDataCodeActivity_execute(object sender, EventArgs e)
        {
        }
    }
}
