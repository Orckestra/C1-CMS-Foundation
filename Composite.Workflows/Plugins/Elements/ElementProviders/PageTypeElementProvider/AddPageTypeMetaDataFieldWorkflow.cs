using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Workflow.Activities;
using Composite.C1Console.Actions;
using Composite.C1Console.Elements;
using Composite.C1Console.Trees;
using Composite.C1Console.Workflow;
using Composite.Core.Linq;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Data.Transactions;
using Composite.Data.Types;
using Composite.Data.Validation.ClientValidationRules;


namespace Composite.Plugins.Elements.ElementProviders.PageTypeElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddPageTypeMetaDataFieldWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public AddPageTypeMetaDataFieldWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_UpdateBindings_ExecuteCode(object sender, EventArgs e)
        {
            IPageTypeMetaDataTypeLink pageTypeMetaDataTypeLink = DataFacade.BuildNew<IPageTypeMetaDataTypeLink>();
            pageTypeMetaDataTypeLink.Id = Guid.NewGuid();

            Dictionary<string, string> piggybag = PiggybagSerializer.Deserialize(this.ExtraPayload);

            DataEntityToken dataEntityToken = piggybag.GetParentEntityTokens().FindDataEntityToken(typeof(IPageType));
            IPageType parentPageType = (IPageType)dataEntityToken.Data;

            pageTypeMetaDataTypeLink.PageTypeId = parentPageType.Id;

            this.Bindings.Add("CompositionDescriptionName", "");
            this.Bindings.Add("CompositionDescriptionLabel", "");            

            this.Bindings.Add("NewMetaDataTypeLink", pageTypeMetaDataTypeLink);

            List<KeyValuePair<Guid, string>> metaDataTypeOptions =
                PageMetaDataFacade.GetAllMetaDataTypes().                
                ToList(f => new KeyValuePair<Guid, string>(f.GetImmutableTypeId(), f.GetTypeTitle()));

            this.Bindings.Add("MetaDataTypeOptions", metaDataTypeOptions);

            List<KeyValuePair<Guid, string>> metaDataContainerOptions = PageMetaDataFacade.GetAllMetaDataContainers();

            this.Bindings.Add("MetaDataContainerOptions", metaDataContainerOptions);
            this.Bindings.Add("CompositionContainerId", metaDataContainerOptions.First().Key);

            this.BindingsValidationRules.Add("CompositionDescriptionName", new List<ClientValidationRule> { new NotNullClientValidationRule(), new StringLengthClientValidationRule(1, 128) });
            this.BindingsValidationRules.Add("CompositionDescriptionLabel", new List<ClientValidationRule> { new NotNullClientValidationRule(), new StringLengthClientValidationRule(1, 256) });
        }



        private void PagesUsingPageTypeExists(object sender, ConditionalEventArgs e)
        {
            IPageTypeMetaDataTypeLink metaDataTypeLink = this.GetBinding<IPageTypeMetaDataTypeLink>("NewMetaDataTypeLink");

            e.Result = DataFacade.GetData<IPage>().Where(f => f.PageTypeId == metaDataTypeLink.PageTypeId).Any();
        }



        private void ValidateMetaDataName(object sender, ConditionalEventArgs e)
        {
            IPageTypeMetaDataTypeLink pageTypeMetaDataTypeLink = this.GetBinding<IPageTypeMetaDataTypeLink>("NewMetaDataTypeLink");
            string metaDataDefinitionName = this.GetBinding<string>("CompositionDescriptionName");
            string metaDataDefinitionLabel = this.GetBinding<string>("CompositionDescriptionLabel");

            e.Result = PageMetaDataFacade.IsDefinitionAllowed(pageTypeMetaDataTypeLink.PageTypeId, metaDataDefinitionName, metaDataDefinitionLabel, pageTypeMetaDataTypeLink.DataTypeId);

            if (e.Result == false)
            {
                ShowFieldMessage("CompositionDescriptionName", "${Composite.Plugins.PageTypeElementProvider, PageType.AddPageTypeMetaDataFieldWorkflow.ValidationError.MetaDataFieldNameAlreadyUsed}");
            }
        }



        private void step2CodeActivity_ShowWizzard_ExecuteCode(object sender, EventArgs e)
        {
            IPageTypeMetaDataTypeLink pageTypeMetaDataTypeLink = this.GetBinding<IPageTypeMetaDataTypeLink>("NewMetaDataTypeLink");

            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(pageTypeMetaDataTypeLink.DataTypeId);
            Type metaDataType = TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);

            DataTypeDescriptorFormsHelper helper = new DataTypeDescriptorFormsHelper(dataTypeDescriptor);
            helper.LayoutLabel = StringResourceSystemFacade.GetString("Composite.Plugins.PageTypeElementProvider", "PageType.AddPageTypeMetaDataFieldWorkflow.AddingDefaultMetaData.Title");
            helper.LayoutIconHandle = "pagetype-add-metedatafield";

            GeneratedTypesHelper generatedTypesHelper = new GeneratedTypesHelper(dataTypeDescriptor);
            helper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);

            IData newDataTemplate = DataFacade.BuildNew(metaDataType);

            helper.UpdateWithNewBindings(this.Bindings);
            helper.ObjectToBindings(newDataTemplate, this.Bindings);
            this.UpdateBinding("NewDataTemplate", newDataTemplate);

            this.DeliverFormData(
                    metaDataType.GetTypeTitle(),
                    StandardUiContainerTypes.Wizard,
                    helper.GetForm(),
                    this.Bindings,
                    helper.GetBindingsValidationRules(newDataTemplate)
                );
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            IPageTypeMetaDataTypeLink pageTypeMetaDataTypeLink = this.GetBinding<IPageTypeMetaDataTypeLink>("NewMetaDataTypeLink");
            IData newDataTemplate = null;
            if (this.BindingExist("NewDataTemplate") == true)
            {
                newDataTemplate = this.GetBinding<IData>("NewDataTemplate");
            }

            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(pageTypeMetaDataTypeLink.DataTypeId);

            string metaDataDefinitionName = this.GetBinding<string>("CompositionDescriptionName");
            pageTypeMetaDataTypeLink.Name = metaDataDefinitionName;

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                DataFacade.AddNew<IPageTypeMetaDataTypeLink>(pageTypeMetaDataTypeLink);

                PageMetaDataFacade.AddDefinition(
                    pageTypeMetaDataTypeLink.PageTypeId,
                    metaDataDefinitionName,
                    this.GetBinding<string>("CompositionDescriptionLabel"),
                    pageTypeMetaDataTypeLink.DataTypeId,
                    this.GetBinding<Guid>("CompositionContainerId")
                );


                if (newDataTemplate != null)
                {
                    DataTypeDescriptorFormsHelper helper = new DataTypeDescriptorFormsHelper(dataTypeDescriptor);
                    helper.BindingsToObject(this.Bindings, newDataTemplate);

                    IPageType pageType = DataFacade.GetData<IPageType>().Where(f => f.Id == pageTypeMetaDataTypeLink.PageTypeId).Single();

                    PageMetaDataFacade.AddNewMetaDataToExistingPages(pageType, metaDataDefinitionName, newDataTemplate);                                                                          
                }

                transactionScope.Complete();
            }

            this.RefreshCurrentEntityToken();
        }
    }
}
    