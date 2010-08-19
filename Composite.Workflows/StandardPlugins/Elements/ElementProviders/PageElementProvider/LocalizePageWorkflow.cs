using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Transactions;
using Composite.Actions;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types;
using Composite.Linq;
using Composite.Logging;
using Composite.Transactions;
using Composite.Users;
using Composite.Security;


namespace Composite.StandardPlugins.Elements.ElementProviders.PageElementProvider
{
    public sealed partial class LocalizePageWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public LocalizePageWorkflow()
        {
            InitializeComponent();
        }

        private void initializeCodeActivity_Copy_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken castedEntityToken = (DataEntityToken)this.EntityToken;

            IPage newPage;

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                CultureInfo sourceCultureInfo = UserSettings.ForeignLocaleCultureInfo;

                IPage sourcePage;
                List<IPagePlaceholderContent> sourcePagePlaceholders;
                List<IData> metaDatas;

                using (new DataScope(sourceCultureInfo))
                {
                    Guid sourcePageId = ((IPage)castedEntityToken.Data).Id;

                    DataScopeIdentifier sourceDataScopeIdentifier = DataScopeIdentifier.Administrated;

                    using (new DataScope(sourceDataScopeIdentifier))
                    {
                        sourcePage = DataFacade.GetData<IPage>(f => f.Id == sourcePageId).Single();

                        if ((sourcePage.PublicationStatus == GenericPublishProcessController.Draft) || (sourcePage.PublicationStatus == GenericPublishProcessController.AwaitingApproval))
                        {
                            sourceDataScopeIdentifier = DataScopeIdentifier.Public;
                            using (new DataScope(sourceDataScopeIdentifier))
                            {
                                sourcePage = DataFacade.GetData<IPage>(f => f.Id == sourcePageId).Single();
                                sourcePagePlaceholders = DataFacade.GetData<IPagePlaceholderContent>(f => f.PageId == sourcePageId).ToList();
                                metaDatas = sourcePage.GetMetaData().ToList();
                            }
                        }
                        else
                        {
                            sourcePagePlaceholders = DataFacade.GetData<IPagePlaceholderContent>(f => f.PageId == sourcePageId).ToList();
                            metaDatas = sourcePage.GetMetaData().ToList();
                        }
                    }
                }


                CultureInfo targetCultureInfo = UserSettings.ActiveLocaleCultureInfo;

                using (new DataScope(targetCultureInfo))
                {
                    newPage = DataFacade.BuildNew<IPage>();
                    sourcePage.ProjectedCopyTo(newPage);

                    newPage.CultureName = targetCultureInfo.Name;
                    newPage.SourceCultureName = targetCultureInfo.Name;
                    newPage.PublicationStatus = GenericPublishProcessController.Draft;
                    newPage = DataFacade.AddNew<IPage>(newPage);

                    foreach (IPagePlaceholderContent sourcePagePlaceholderContent in sourcePagePlaceholders)
                    {
                        IPagePlaceholderContent newPagePlaceholderContent = DataFacade.BuildNew<IPagePlaceholderContent>();
                        sourcePagePlaceholderContent.ProjectedCopyTo(newPagePlaceholderContent);

                        newPagePlaceholderContent.CultureName = targetCultureInfo.Name;
                        newPagePlaceholderContent.SourceCultureName = targetCultureInfo.Name;
                        newPagePlaceholderContent.PublicationStatus = GenericPublishProcessController.Draft;
                        DataFacade.AddNew<IPagePlaceholderContent>(newPagePlaceholderContent);
                    }

                    foreach (IData metaData in metaDatas)
                    {
                        IEnumerable<ReferenceFailingPropertyInfo> referenceFailingPropertyInfos = DataLocalizationFacade.GetReferencingLocalizeFailingProperties((ILocalizedControlled)metaData).Evaluate();

                        if (referenceFailingPropertyInfos.Any() == false)
                        {
                            IData newMetaData = DataFacade.BuildNew(metaData.DataSourceId.InterfaceType);
                            metaData.ProjectedCopyTo(newMetaData);

                            ILocalizedControlled localizedControlled = newMetaData as ILocalizedControlled;
                            localizedControlled.CultureName = targetCultureInfo.Name;
                            localizedControlled.SourceCultureName = targetCultureInfo.Name;

                            IPublishControlled publishControlled = newMetaData as IPublishControlled;
                            publishControlled.PublicationStatus = GenericPublishProcessController.Draft;

                            DataFacade.AddNew(newMetaData);
                        }
                        else
                        {
                            foreach (ReferenceFailingPropertyInfo referenceFailingPropertyInfo in referenceFailingPropertyInfos)
                            {
                                LoggingService.LogVerbose("LocalizePageWorkflow", string.Format("Meta data of type '{0}' is not localized because the field '{1}' is referring some not yet localzed data", metaData.DataSourceId.InterfaceType, referenceFailingPropertyInfo.DataFieldDescriptor.Name));
                            }
                        }
                    }
                }

                EntityTokenCacheFacade.ClearCache(sourcePage.GetDataEntityToken());
                EntityTokenCacheFacade.ClearCache(newPage.GetDataEntityToken());

                transactionScope.Complete();
            }

            ParentTreeRefresher parentTreeRefresher = this.CreateParentTreeRefresher();
            parentTreeRefresher.PostRefreshMesseges(newPage.GetDataEntityToken(), 2);

            this.ExecuteWorklow(newPage.GetDataEntityToken(), typeof(EditPageWorkflow));
        }
    }
}
