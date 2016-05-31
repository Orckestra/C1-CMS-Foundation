using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Workflow.Activities;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.Types;
using Composite.Data.Transactions;
using Composite.C1Console.Workflow;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_PageElementProvider;

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

        private static class BindingNames
        {
            public const string DeleteAllVersionsConfirmed = nameof(DeleteAllVersionsConfirmed);
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

            this.Bindings = new Dictionary<string, object>
            {
                {"HasSubPages", hasChildren},
                {"DeleteAllSubPages", false},
                {BindingNames.DeleteAllVersionsConfirmed, false},
                {"DeleteMessageText", Texts.DeletePageStep2_Text(selectedPage.Title)}
            };
        }


        private void codeActivity2_ExecuteCode(object sender, EventArgs e)
        {
            bool hasSubPages = this.GetBinding<bool>("HasSubPages");

            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
            IPage selectedPage = (IPage)dataEntityToken.Data;

            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                if (!DataFacade.WillDeleteSucceed<IPage>(selectedPage))
                {
                    this.ShowMessage(
                        DialogType.Error,
                        Texts.DeletePageWorkflow_CascadeDeleteErrorTitle,
                        Texts.DeletePageWorkflow_CascadeDeleteErrorMessage
                    );

                    return;
                }

                List<CultureInfo> cultures = DataLocalizationFacade.ActiveLocalizationCultures.ToList();
                cultures.Remove(selectedPage.DataSourceId.LocaleScope);

                if (hasSubPages)
                {
                    List<IPage> pagesToDelete = selectedPage.GetSubChildren().ToList();

                    if (pagesToDelete.Any(page => !DataFacade.WillDeleteSucceed<IPage>(page)))
                    {
                        this.ShowMessage(DialogType.Error,
                            Texts.DeletePageWorkflow_CascadeDeleteErrorTitle,
                            Texts.DeletePageWorkflow_CascadeDeleteErrorMessage);

                        return;
                    }

                    foreach (IPage page in pagesToDelete)
                    {
                        if (!ExistInOtherLocale(cultures, page))
                        {
                            RemoveAllFolderAndMetaDataDefinitions(page);
                        }

                        page.DeletePageStructure();
                        ProcessControllerFacade.FullDelete(page);
                    }
                }

                if (!ExistInOtherLocale(cultures, selectedPage))
                {
                    RemoveAllFolderAndMetaDataDefinitions(selectedPage);
                }

                var parentTreeRefresher = this.CreateParentTreeRefresher();
                parentTreeRefresher.PostRefreshMesseges(selectedPage.GetDataEntityToken(), 2);

                selectedPage.DeletePageStructure();

                Guid pageId = selectedPage.Id;
                var pageVersions = DataFacade.GetData<IPage>(p => p.Id == pageId).ToList();

                ProcessControllerFacade.FullDelete(pageVersions);

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
                Texts.DeletePageWorkflow_HasCompositionsTitle,
                Texts.DeletePageWorkflow_HasCompositionsMessage
            );
        }

        private void PageHasMultpleVersions(object sender, ConditionalEventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
            IPage selectedPage = (IPage)dataEntityToken.Data;

            Guid pageId = selectedPage.Id;

            e.Result = DataFacade.GetData<IPage>().Count(p => p.Id == pageId) > 1;
        }

        private void codeActivity_MultipleVersionsDeletionConfirmedExecute(object sender, EventArgs e)
        {
            Bindings[BindingNames.DeleteAllVersionsConfirmed] = true;
        }

        private void HasPageDeletionBeenConfirmed(object sender, ConditionalEventArgs e)
        {
            e.Result = (bool)Bindings[BindingNames.DeleteAllVersionsConfirmed];
        }
    }
}
