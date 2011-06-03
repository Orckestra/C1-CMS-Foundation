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
using Composite.Core.ResourceSystem;
using Composite.C1Console.Security;
using Composite.Data.Transactions;
using Composite.Core.Types;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DisableTypeLocalizationWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public DisableTypeLocalizationWorkflow()
        {
            InitializeComponent();
        }


        private DataTypeDescriptor GetDataTypeDescriptor()
        {
            Type type;

            if ((this.EntityToken is Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.AssociatedDataElementProviderHelperEntityToken) == true)
            {
                Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.AssociatedDataElementProviderHelperEntityToken castedEntityToken = this.EntityToken as Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.AssociatedDataElementProviderHelperEntityToken;

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



        private void DataExists(object sender, ConditionalEventArgs e)
        {
            DataTypeDescriptor dataTypeDescriptor = GetDataTypeDescriptor();

            Type interfaceType = TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);

            foreach (CultureInfo cultureInfo in DataLocalizationFacade.ActiveLocalizationCultures)
            {
                using (new DataScope(cultureInfo))
                {
                    e.Result = DataFacade.GetData(interfaceType).ToDataEnumerable().Any();

                    if (e.Result == true)
                    {
                        return;
                    }
                }
            }
        }



        private void step1CodeActivity_InitializeBindings_ExecuteCode(object sender, EventArgs e)
        {
            DataTypeDescriptor dataTypeDescriptor = GetDataTypeDescriptor();

            Type interfaceType = TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);

            List<CultureInfo> culturesWithData = new List<CultureInfo>();
            foreach (CultureInfo cultureInfo in DataLocalizationFacade.ActiveLocalizationCultures)
            {
                using (DataScope localeScope = new DataScope(cultureInfo))
                {
                    bool dataExists = DataFacade.GetData(interfaceType).ToDataEnumerable().Any();

                    if (dataExists == true)
                    {
                        culturesWithData.Add(cultureInfo);
                    }
                }
            }

            Dictionary<string, string> culturesDictionary = culturesWithData.ToDictionary(f => f.Name, DataLocalizationFacade.GetCultureTitle);

            this.Bindings.Add("CultureName", culturesDictionary.First().Key);
            this.Bindings.Add("CultureNameList", culturesDictionary);
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            DataTypeDescriptor dataTypeDescriptor = GetDataTypeDescriptor();

            Type interfaceType = TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                List<IData> administratedDatas = null;
                List<IData> publicDatas = null;

                if (this.BindingExist("CultureName") == true)
                {
                    string cultureName = this.GetBinding<string>("CultureName");
                    CultureInfo cultureInfo = CultureInfo.CreateSpecificCulture(cultureName);

                    using (new DataScope(cultureInfo))
                    {
                        administratedDatas = DataFacade.GetData(interfaceType).ToDataList();
                        DataFacade.Delete((IEnumerable<IData>)administratedDatas, true, CascadeDeleteType.Disable);

                        if (dataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)) == true)
                        {
                            using (new DataScope(DataScopeIdentifier.Public))
                            {
                                publicDatas = DataFacade.GetData(interfaceType).ToDataList();
                                DataFacade.Delete((IEnumerable<IData>)publicDatas, true, CascadeDeleteType.Disable);
                            }
                        }
                    }
                }

                DataTypeDescriptor newDataTypeDescriptor = dataTypeDescriptor.Clone();
                newDataTypeDescriptor.RemoveSuperInterface(typeof(ILocalizedControlled));

                GeneratedTypesFacade.UpdateType(dataTypeDescriptor, newDataTypeDescriptor);

                // Important! Updates the type
                interfaceType = TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);

                if (administratedDatas != null)
                {
                    foreach (IData data in administratedDatas)
                    {
                        IData newData = DataFacade.BuildNew(interfaceType);
                        data.ProjectedCopyTo(newData);
                        DataFacade.AddNew(newData, true, false, false);
                    }

                    if (publicDatas != null)
                    {
                        using (DataScope dataScope = new DataScope(DataScopeIdentifier.Public))
                        {
                            foreach (IData data in publicDatas)
                            {
                                IData newData = DataFacade.BuildNew(interfaceType);
                                data.ProjectedCopyTo(newData);
                                DataFacade.AddNew(newData, true, false, false);
                            }
                        }
                    }
                }

                transactionScope.Complete();
            }

            EntityTokenCacheFacade.ClearCache();

            this.CloseCurrentView();
            this.CollapseAndRefresh();
        }
    }
}
