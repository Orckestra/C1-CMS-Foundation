using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using Composite.C1Console.Events;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Workflow;
using Composite.Core.Collections.Generic;
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
            public const string DeleteAllVersions = nameof(DeleteAllVersions);
            public const string DeleteChildrenConfirmed = nameof(DeleteChildrenConfirmed);
            public const string HasSubPages = nameof(HasSubPages);
            public const string DeleteMessageText = nameof(DeleteMessageText);
            public const string ReferencedData = nameof(ReferencedData);
        }


        private void HasInstanceCompositionsTest(object sender, ConditionalEventArgs e)
        {
            e.Result = false; // Ignore this test, we delete all defined folders ande metadat fields when last page (with respect to locales) are deleted            
        }


        private void HasSubpages(object sender, ConditionalEventArgs e)
        {
            e.Result = this.GetBinding<bool>(BindingNames.HasSubPages);
        }



        private void HasDataReferences(object sender, ConditionalEventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
            IPage selectedPage = (IPage)dataEntityToken.Data;

            var dataToDelete = new List<IData>();

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
                var references = DataReferenceFacade.GetReferences(data, false, 
                    (type, fp) => !fp.IsOptionalReference 
                                  && type != typeof(IPagePlaceholderContent)
                                  && fp.SourcePropertyInfo.DeclaringType != typeof(IPageRelatedData));

                foreach (var reference in references)
                {
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
                Bindings.Add(BindingNames.ReferencedData, DataReferenceFacade.GetBrokenReferencesReport(brokenReferences));
            }
        }



        private void codeActivity1_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
            IPage selectedPage = (IPage)dataEntityToken.Data;

            bool hasChildren = PageServices.GetChildren(selectedPage.Id).Any();

            this.Bindings.AddDictionary(new Dictionary<string, object>
            {
                {BindingNames.HasSubPages, hasChildren},
                {BindingNames.DeleteMessageText, Texts.DeletePageStep2_Text(selectedPage.Title)}
            });
        }


        private void codeActivity2_ExecuteCode(object sender, EventArgs e)
        {
            bool hasSubPages = this.GetBinding<bool>(BindingNames.HasSubPages);

            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
            IPage selectedPage = (IPage)dataEntityToken.Data;


            if (!DataFacade.WillDeleteSucceed<IPage>(selectedPage))
            {
                this.ShowMessage(
                    DialogType.Error,
                    Texts.DeletePageWorkflow_CascadeDeleteErrorTitle,
                    Texts.DeletePageWorkflow_CascadeDeleteErrorMessage
                );

                return;
            }

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
            }

            var parentTreeRefresher = this.CreateParentTreeRefresher();
            parentTreeRefresher.PostRefreshMessages(selectedPage.GetDataEntityToken(), 2);

            PageServices.DeletePage(selectedPage);
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

        private void HasPageDeletionBeenConfirmed(object sender, ConditionalEventArgs e)
        {
            bool IsTrueBinding(string bindingName) => Bindings.ContainsKey(bindingName) && (bool) Bindings[bindingName];

            e.Result = IsTrueBinding(BindingNames.DeleteAllVersions)
                    || IsTrueBinding(BindingNames.DeleteChildrenConfirmed);
        }

        private void DeleteCurrentVersion(object sender, EventArgs e)
        {
            var dataEntityToken = (DataEntityToken)this.EntityToken;
            IPage selectedPage = (IPage)dataEntityToken.Data;

            PageServices.DeletePage(selectedPage.Id, selectedPage.VersionId, selectedPage.DataSourceId.LocaleScope);

            Guid pageId = selectedPage.Id;
            var anotherVersion = DataFacade.GetData<IPage>().FirstOrDefault(p => p.Id == pageId);

            var parentTreeRefresher = this.CreateParentTreeRefresher();
            parentTreeRefresher.PostRefreshMessages((anotherVersion ?? selectedPage).GetDataEntityToken());

            if (anotherVersion != null)
            {
                SelectElement(anotherVersion.GetDataEntityToken());
            }
        }

        private void ifElse_ShouldAllVersionsBeDeleted(object sender, ConditionalEventArgs e)
        {
            e.Result = (bool)Bindings[BindingNames.DeleteAllVersions];
        }

        private void SetupDeleteMultipleVersionsForm(object sender, EventArgs e)
        {
            Bindings[BindingNames.DeleteAllVersions] = false;
        }

        private void OnDeletingChildrenConfirmed(object sender, EventArgs e)
        {
            Bindings[BindingNames.DeleteChildrenConfirmed] = true;
        }
    }
}
