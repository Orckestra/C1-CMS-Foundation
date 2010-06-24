using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Transactions;
using System.Workflow.Activities;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.ResourceSystem;
using Composite.Transactions;
using Composite.Types;
using Composite.Users;
using Composite.Validation;
using Composite.Workflow;
using Composite.Data.Types;
using Microsoft.Practices.EnterpriseLibrary.Validation;


namespace Composite.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddMetaDataWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        private static string TypesBindingName { get { return "Types"; } }
        private static string SelectedTypeBindingName { get { return "SelectedType"; } }
        private static string FieldGroupNameBindingName { get { return "FieldGroupName"; } }
        private static string FieldGroupLabelBindingName { get { return "FieldGroupLabel"; } }
        private static string ContainersBindingName { get { return "Containers"; } }
        private static string SelectedContainerBindingName { get { return "SelectedContainer"; } }
        private static string StartDisplayOptionsBindingName { get { return "StartDisplayOptions"; } }
        private static string SelectedStartDisplayBindingName { get { return "SelectedStartDisplay"; } }
        private static string InheritDisplayOptionsBindingName { get { return "InheritDisplayOptions"; } }
        private static string SelectedInheritDisplayBindingName { get { return "SelectedInheritDisplay"; } }

        private static string DataAssociationVisabilityDescriptionBindingName { get { return "DataAssociationVisabilityRule"; } }



        public AddMetaDataWorkflow()
        {
            InitializeComponent();
        }



        private IEnumerable<Type> GetAddebleTypes()
        {
            IEnumerable<Type> accociationTypes = PageMetaDataFacade.GetAllMetaDataTypes();

            return accociationTypes;
        }



        private IPage GetCurrentPage()
        {
            if ((this.EntityToken is DataEntityToken) == true)
            {
                return this.GetDataItemFromEntityToken<IPage>();
            }
            else
            {
                return null;
            }
        }



        private Guid GetCurrentPageId()
        {
            IPage page = GetCurrentPage();

            if (page != null)
            {
                return page.Id;
            }
            else
            {
                return Guid.Empty;
            }
        }



        private void DoesTypesToAddExists(object sender, ConditionalEventArgs e)
        {
            e.Result = GetAddebleTypes().FirstOrDefault() != null;
        }



        private void DidFieldNameValidate(object sender, ConditionalEventArgs e)
        {
            PageMetaDataDescription dataAssociationVisabilityRule = this.GetBinding<PageMetaDataDescription>(DataAssociationVisabilityDescriptionBindingName);

            e.Result = dataAssociationVisabilityRule != null;
        }



        private void DoesTargetDataExists(object sender, ConditionalEventArgs e)
        {
            PageMetaDataDescription dataAssociationVisabilityRule = this.GetBinding<PageMetaDataDescription>(DataAssociationVisabilityDescriptionBindingName);

            IPage page = GetCurrentPage();

            e.Result = page.GetMetaDataAffectedPages(dataAssociationVisabilityRule.StartLevel, dataAssociationVisabilityRule.Levels).Any();
        }



        private void selectTypeCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            if (this.BindingExist(TypesBindingName) == false)
            {
                Dictionary<Type, string> types = GetAddebleTypes().OrderBy(f => f.GetTypeTitle()).ToDictionary(f => f, f => f.GetTypeTitle());

                this.UpdateBinding(TypesBindingName, types);
                this.UpdateBinding(SelectedTypeBindingName, types.Keys.First());
            }
        }



        private void noTypesToAddCodeActivity_ShowMessage_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowMessage(
                DialogType.Message,
                "${Composite.Management, AssociatedDataElementProviderHelper.AddMetaDataWorkflow.NoTypesTitle}",
                "${Composite.Management, AssociatedDataElementProviderHelper.AddMetaDataWorkflow.NoTypesMessage}"
                );
        }



        private void createFieldGroupCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            Type type = this.GetBinding<Type>(SelectedTypeBindingName);

            string metaDataDefinitionName = type.GetTypeTitle();
            int counter = 1;
            while (PageMetaDataFacade.IsDefinitionAllowed(GetCurrentPageId(), metaDataDefinitionName, metaDataDefinitionName, type.GetImmutableTypeId()) == false)
            {
                metaDataDefinitionName = string.Format("{0} {1}", type.GetTypeTitle(), counter++);
            }

            this.UpdateBinding(FieldGroupNameBindingName, metaDataDefinitionName);
            this.UpdateBinding(FieldGroupLabelBindingName, metaDataDefinitionName);


            if (this.BindingExist(ContainersBindingName) == false)
            {
                List<KeyValuePair<Guid, string>> containers = PageMetaDataFacade.GetAllMetaDataContainers();
                this.UpdateBinding(ContainersBindingName, containers);
                this.UpdateBinding(SelectedContainerBindingName, containers.First().Key);

                Dictionary<int, string> startDisplayOptions = new Dictionary<int, string>();
                if (GetCurrentPage() != null)
                {
                    startDisplayOptions.Add(0, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption0"));
                }
                startDisplayOptions.Add(1, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption1"));
                startDisplayOptions.Add(2, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption2"));
                startDisplayOptions.Add(3, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption3"));
                startDisplayOptions.Add(4, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption4"));
                startDisplayOptions.Add(5, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption5"));
                this.UpdateBinding(StartDisplayOptionsBindingName, startDisplayOptions);
                this.UpdateBinding(SelectedStartDisplayBindingName, startDisplayOptions.Keys.First());

                Dictionary<int, string> inheritDisplayOptions = new Dictionary<int, string>();
                inheritDisplayOptions.Add(0, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption0"));
                inheritDisplayOptions.Add(1, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption1"));
                inheritDisplayOptions.Add(2, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption2"));
                inheritDisplayOptions.Add(3, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption3"));
                inheritDisplayOptions.Add(10000, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption4"));
                this.UpdateBinding(InheritDisplayOptionsBindingName, inheritDisplayOptions);
                this.UpdateBinding(SelectedInheritDisplayBindingName, inheritDisplayOptions.Keys.Last());
            }
        }



        private void createFieldGroupCodeActivity_CreateVisabilatiyRule_ExecuteCode(object sender, EventArgs e)
        {
            string metaDataDefinitionName = this.GetBinding<string>(FieldGroupNameBindingName);
            string metaDataDefinitionLabel = this.GetBinding<string>(FieldGroupLabelBindingName);
            Type type = this.GetBinding<Type>(SelectedTypeBindingName);

            if (PageMetaDataFacade.IsDefinitionAllowed(GetCurrentPageId(), metaDataDefinitionName, metaDataDefinitionLabel, type.GetImmutableTypeId()) == true)
            {
                int startLevel = this.GetBinding<int>(SelectedStartDisplayBindingName);
                int levels = this.GetBinding<int>(SelectedInheritDisplayBindingName);
                PageMetaDataDescription dataAssociationVisabilityRule = PageMetaDataDescription.Branch(startLevel, levels);

                this.UpdateBinding(DataAssociationVisabilityDescriptionBindingName, dataAssociationVisabilityRule);
            }
            else
            {
                this.UpdateBinding(DataAssociationVisabilityDescriptionBindingName, null);

                this.ShowFieldMessage(FieldGroupNameBindingName, "${Composite.Management, AssociatedDataElementProviderHelper.AddMetaDataWorkflow.FieldGroupNameNotValid}");
            }
        }



        private void enterDefaultValuesCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            Type type = this.GetBinding<Type>(SelectedTypeBindingName);
            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type.GetImmutableTypeId());

            DataTypeDescriptorFormsHelper helper = new DataTypeDescriptorFormsHelper(dataTypeDescriptor);
            helper.LayoutIconHandle = "associated-data-add";

            GeneratedTypesHelper generatedTypesHelper = new GeneratedTypesHelper(dataTypeDescriptor);
            helper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);

            IData newData = DataFacade.BuildNew(type);

            helper.UpdateWithNewBindings(this.Bindings);
            helper.ObjectToBindings(newData, this.Bindings);

            this.DeliverFormData(
                    type.Name,
                    StandardUiContainerTypes.Wizard,
                    helper.GetForm(),
                    this.Bindings,
                    helper.GetBindingsValidationRules(newData)
                );
        }

        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            Type selectedMetaDataType = this.GetBinding<Type>(SelectedTypeBindingName);
            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(selectedMetaDataType.GetImmutableTypeId());

            PageMetaDataDescription dataAssociationVisabilityRule = this.GetBinding<PageMetaDataDescription>(DataAssociationVisabilityDescriptionBindingName);
            Guid metaDataContainerId = this.GetBinding<Guid>(SelectedContainerBindingName);
            string metaDataDefinitionName = this.GetBinding<string>(FieldGroupNameBindingName);
            string metaDataDefinitionLabel = this.GetBinding<string>(FieldGroupLabelBindingName);

            DataTypeDescriptorFormsHelper helper = new DataTypeDescriptorFormsHelper(dataTypeDescriptor);

            GeneratedTypesHelper generatedTypesHelper = new GeneratedTypesHelper(dataTypeDescriptor);
            helper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);

            IData newDataTemplate = DataFacade.BuildNew(selectedMetaDataType);
            helper.BindingsToObject(this.Bindings, newDataTemplate);

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                IPage page = GetCurrentPage();

                page.AddMetaDataDefinition(metaDataDefinitionName, metaDataDefinitionLabel, selectedMetaDataType.GetImmutableTypeId(), metaDataContainerId, dataAssociationVisabilityRule.StartLevel, dataAssociationVisabilityRule.Levels);

                page.AddNewMetaDataToExistingPages(metaDataDefinitionName, newDataTemplate);

                transactionScope.Complete();
            }

            ParentTreeRefresher parentTreeRefresher = this.CreateParentTreeRefresher();
            parentTreeRefresher.PostRefreshMesseges(this.EntityToken);
        }


        private void MetaDataValid(object sender, ConditionalEventArgs e)
        {
            Type selectedMetaDataType = this.GetBinding<Type>(SelectedTypeBindingName);
            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(selectedMetaDataType.GetImmutableTypeId());

            DataTypeDescriptorFormsHelper helper = new DataTypeDescriptorFormsHelper(dataTypeDescriptor);

            GeneratedTypesHelper generatedTypesHelper = new GeneratedTypesHelper(dataTypeDescriptor);
            helper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);

            IData newDataTemplate = DataFacade.BuildNew(selectedMetaDataType);
            helper.BindingsToObject(this.Bindings, newDataTemplate);

            var validationResults = ValidationFacade.Validate(newDataTemplate);

            bool valid = true;

            foreach (ValidationResult result in validationResults)
            {
                string fieldName = result.Key;
                if (!generatedTypesHelper.NotEditableDataFieldDescriptorNames.Contains(fieldName))
                {
                    this.ShowFieldMessage(result.Key, result.Message);
                    valid = false;
                }
            }

            if(valid)
            {
                var fieldsWithInvalidForeginKey = new List<string>();
                DataReferenceFacade.TryValidateForeignKeyIntegrity(newDataTemplate, fieldsWithInvalidForeginKey);
                if (fieldsWithInvalidForeginKey.Count > 0)
                {
                    foreach(string fieldName in fieldsWithInvalidForeginKey)
                    {
                        if (!generatedTypesHelper.NotEditableDataFieldDescriptorNames.Contains(fieldName))
                        {
                            this.ShowFieldMessage(fieldName, "Invalid reference");
                            valid = false;
                        }
                    }
                    
                }
            }

            e.Result = valid;
        }
    }
}
