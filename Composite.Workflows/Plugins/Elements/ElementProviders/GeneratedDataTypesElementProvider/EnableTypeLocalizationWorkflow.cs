using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Transactions;
using System.Workflow.Activities;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Core.Logging;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Security;
using Composite.Data.Transactions;
using Composite.Core.Types;
using Composite.C1Console.Workflow;
using Composite.C1Console.Users;


namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EnableTypeLocalizationWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EnableTypeLocalizationWorkflow()
        {
            InitializeComponent();
        }



        private DataTypeDescriptor GetDataTypeDescriptor()
        {
            Type type;

            if ((this.EntityToken is Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.AssociatedDataElementProviderHelperEntityToken) == true)
            {
                var castedEntityToken = this.EntityToken as Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.AssociatedDataElementProviderHelperEntityToken;

                type = TypeManager.GetType(castedEntityToken.Payload);
            }
            else
            {
                GeneratedDataTypesElementProviderTypeEntityToken entityToken = (GeneratedDataTypesElementProviderTypeEntityToken)this.EntityToken;
                type = TypeManager.GetType(entityToken.SerializedTypeName);
            }

            Guid guid = type.GetImmutableTypeId();

            return DataMetaDataFacade.GetDataTypeDescriptor(guid);
        }



        private void LocalesExists(object sender, ConditionalEventArgs e)
        {
            e.Result = DataLocalizationFacade.ActiveLocalizationCultures.Any();
        }



        private void step1CodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            Dictionary<string, string> culturesDictionary = DataLocalizationFacade.ActiveLocalizationCultures.ToDictionary(f => f.Name, DataLocalizationFacade.GetCultureTitle);

            this.UpdateBinding("CultureName", (UserSettings.ForeignLocaleCultureInfo ?? UserSettings.ActiveLocaleCultureInfo).Name);
            this.UpdateBinding("CultureNameList", culturesDictionary);
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            DataTypeDescriptor dataTypeDescriptor = GetDataTypeDescriptor();


#warning MRJ: BM: DP: THIS CODE IS NOT NEEDED HERE ANY MORE AND SHOULD BE HANDLED BY DATA PROVIDER
            //Type interfaceType = TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);

            // Saving & deleting current data
            //var supportedDataScopes = new List<DataScopeIdentifier> { DataScopeIdentifier.Administrated };
            //if (dataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled))) supportedDataScopes.Add(DataScopeIdentifier.Public);
                

            //var dataset = new Dictionary<DataScopeIdentifier, List<IData>>();
            //foreach(var dataScope in supportedDataScopes)
            //{
            //    using (new DataScope(dataScope))
            //    {
            //        var dataFromScope = DataFacade.GetData(interfaceType).ToDataList();
            //        DataFacade.Delete((IEnumerable<IData>)dataFromScope, true, CascadeDeleteType.Disable);

            //        dataset.Add(dataScope, dataFromScope);
            //    }
            //}


            // Making changes to type
            DataTypeDescriptor newDataTypeDescriptor = dataTypeDescriptor.Clone();
            newDataTypeDescriptor.AddSuperInterface(typeof(ILocalizedControlled));

            List<CultureInfo> localesToCopyTo = new List<CultureInfo>();
            if (ThereAreReferencesInLocalizedData())
            {
                localesToCopyTo.AddRange(DataLocalizationFacade.ActiveLocalizationCultures);
            }
            else
            {
                string cultureName = this.GetBinding<string>("CultureName");
                localesToCopyTo.Add(CultureInfo.CreateSpecificCulture(cultureName));
            }

            UpdateDataTypeDescriptor updateDataTypeDescriptor = new UpdateDataTypeDescriptor(dataTypeDescriptor, newDataTypeDescriptor, false)
            {
                LocalesToCopyTo = localesToCopyTo
            };

            GeneratedTypesFacade.UpdateType(updateDataTypeDescriptor);

#warning MRJ: BM: DP: THIS CODE IS NOT NEEDED HERE ANY MORE AND SHOULD BE HANDLED BY DATA PROVIDER
            //var culturesToProcess = new List<CultureInfo>();
            //if(ThereAreReferencesInLocalizedData())
            //{
            //    culturesToProcess.AddRange(DataLocalizationFacade.ActiveLocalizationCultures);
            //}
            //else
            //{
            //    string cultureName = this.GetBinding<string>("CultureName");
            //    culturesToProcess.Add(CultureInfo.CreateSpecificCulture(cultureName));
            //}

            //Type emptyClassType = DataTypeTypesManager.GetDataTypeEmptyClass(interfaceType, true);

            //try
            //{
            //    using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            //    {
            //        foreach (CultureInfo cultureInfo in culturesToProcess)
            //        {
            //            foreach (DataScopeIdentifier dataScopeIdentifier in supportedDataScopes)
            //            {
            //                using (new DataScope(dataScopeIdentifier, cultureInfo))
            //                {
            //                    var dataFromScope = dataset[dataScopeIdentifier];

            //                    foreach (IData data in dataFromScope)
            //                    {
            //                        ILocalizedControlled newData = DataFacade.BuildNew(interfaceType) as ILocalizedControlled;
            //                        data.ProjectedCopyTo(newData);
            //                        newData.CultureName = cultureInfo.Name;
            //                        newData.SourceCultureName = cultureInfo.Name;

            //                        DataFacade.AddNew(newData, interfaceType, true, false, false);
            //                    }
            //                }
            //            }
            //        }

            //        transactionScope.Complete();
            //    }
            //}
            //catch (Exception ex)
            //{
            //    var exceptionToLog = new InvalidOperationException("Failed to copy data from non-localized type to localized", ex);
            //    LoggingService.LogError(typeof(EnableTypeLocalizationWorkflow).Name, exceptionToLog);

            //    throw;
            //}


            //EntityTokenCacheFacade.ClearCache();

            this.CloseCurrentView();
            this.CollapseAndRefresh();
        }

        private bool ThereAreReferencesInLocalizedData()
        {
            if (DataLocalizationFacade.ActiveLocalizationCultures.Count() == 1)
            {
                return false;
            }

            Type type = GetDataTypeDescriptor().GetInterfaceType();
            foreach (Type referencedType in type.GetRefereeTypes())
            {
                if (DataLocalizationFacade.IsLocalized(referencedType))
                {
                    return true;
                }
            }
            return false;
        }

        private void ThereAreReferencesInLocalizedData(object sender, ConditionalEventArgs e)
        {
            e.Result = ThereAreReferencesInLocalizedData();
        }
    }
}
