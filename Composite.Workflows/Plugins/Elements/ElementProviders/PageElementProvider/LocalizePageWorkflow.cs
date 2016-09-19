using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types;
using Composite.Core.Linq;
using Composite.Data.Transactions;
using Composite.C1Console.Users;
using Composite.C1Console.Security;


namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    public sealed partial class LocalizePageWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public LocalizePageWorkflow()
        {
            InitializeComponent();
        }

        private void initializeCodeActivity_Copy_ExecuteCode(object sender, EventArgs e)
        {
            var castedEntityToken = (DataEntityToken)this.EntityToken;

            IPage newPage;

            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                CultureInfo sourceCultureInfo = UserSettings.ForeignLocaleCultureInfo;

                IPage sourcePage;
                List<IPagePlaceholderContent> sourcePagePlaceholders;
                List<IData> sourceMetaDataSet;

                using (new DataScope(sourceCultureInfo))
                {
                    var pageFromEntityToken = (IPage) castedEntityToken.Data;
                    Guid sourcePageId = pageFromEntityToken.Id;
                    Guid sourcePageVersionId = pageFromEntityToken.VersionId;

                    using (new DataScope(DataScopeIdentifier.Administrated))
                    {
                        sourcePage = DataFacade.GetData<IPage>(f => f.Id == sourcePageId).Single();
                        sourcePage = sourcePage.GetTranslationSource();

                        using (new DataScope(sourcePage.DataSourceId.DataScopeIdentifier))
                        {
                            sourcePagePlaceholders = DataFacade
                                .GetData<IPagePlaceholderContent>(f => f.PageId == sourcePageId && f.VersionId == sourcePageVersionId)
                                .ToList();
                            sourceMetaDataSet = sourcePage.GetMetaData().ToList();
                        }
                    }
                }


                CultureInfo targetCultureInfo = UserSettings.ActiveLocaleCultureInfo;

                using (new DataScope(targetCultureInfo))
                {
                    newPage = DataFacade.BuildNew<IPage>();
                    sourcePage.ProjectedCopyTo(newPage);

                    newPage.SourceCultureName = targetCultureInfo.Name;
                    newPage.PublicationStatus = GenericPublishProcessController.Draft;
                    newPage = DataFacade.AddNew<IPage>(newPage);

                    foreach (IPagePlaceholderContent sourcePagePlaceholderContent in sourcePagePlaceholders)
                    {
                        IPagePlaceholderContent newPagePlaceholderContent = DataFacade.BuildNew<IPagePlaceholderContent>();
                        sourcePagePlaceholderContent.ProjectedCopyTo(newPagePlaceholderContent);

                        newPagePlaceholderContent.SourceCultureName = targetCultureInfo.Name;
                        newPagePlaceholderContent.PublicationStatus = GenericPublishProcessController.Draft;
                        DataFacade.AddNew<IPagePlaceholderContent>(newPagePlaceholderContent);
                    }

                    foreach (IData metaData in sourceMetaDataSet)
                    {
                        ILocalizedControlled localizedData = metaData as ILocalizedControlled;

                        if(localizedData == null)
                        {
                            continue;
                        }

                        IEnumerable<ReferenceFailingPropertyInfo> referenceFailingPropertyInfos = DataLocalizationFacade.GetReferencingLocalizeFailingProperties(localizedData).Evaluate();

                        if (!referenceFailingPropertyInfos.Any())
                        {
                            IData newMetaData = DataFacade.BuildNew(metaData.DataSourceId.InterfaceType);
                            metaData.ProjectedCopyTo(newMetaData);

                            ILocalizedControlled localizedControlled = newMetaData as ILocalizedControlled;
                            localizedControlled.SourceCultureName = targetCultureInfo.Name;

                            IPublishControlled publishControlled = newMetaData as IPublishControlled;
                            publishControlled.PublicationStatus = GenericPublishProcessController.Draft;

                            DataFacade.AddNew(newMetaData);
                        }
                        else
                        {
                            foreach (ReferenceFailingPropertyInfo referenceFailingPropertyInfo in referenceFailingPropertyInfos)
                            {
                                Log.LogVerbose("LocalizePageWorkflow", 
                                                "Meta data of type '{0}' is not localized because the field '{1}' is referring some not yet localzed data"
                                                .FormatWith(metaData.DataSourceId.InterfaceType, referenceFailingPropertyInfo.DataFieldDescriptor.Name));
                            }
                        }
                    }
                }

                EntityTokenCacheFacade.ClearCache(sourcePage.GetDataEntityToken());
                EntityTokenCacheFacade.ClearCache(newPage.GetDataEntityToken());

                foreach (var folderType in PageFolderFacade.GetDefinedFolderTypes(newPage))
                {
                    EntityTokenCacheFacade.ClearCache(new AssociatedDataElementProviderHelperEntityToken(
                        TypeManager.SerializeType(typeof(IPage)),
                        PageElementProvider.DefaultConfigurationName,
                        newPage.Id.ToString(),
                        TypeManager.SerializeType(folderType)));
                }


                transactionScope.Complete();
            }

            ParentTreeRefresher parentTreeRefresher = this.CreateParentTreeRefresher();
            parentTreeRefresher.PostRefreshMesseges(newPage.GetDataEntityToken(), 2);

            this.ExecuteWorklow(newPage.GetDataEntityToken(), typeof(EditPageWorkflow));
        }
    }
}
