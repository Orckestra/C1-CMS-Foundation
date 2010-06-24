using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Workflow.Activities;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Data.Types;
using Composite.ResourceSystem;
using Composite.Transactions;
using Composite.Types;


namespace Composite.Workflows.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    public sealed partial class EditMetaDataWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public EditMetaDataWorkflow()
        {
            InitializeComponent();
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



        private List<Guid> GetOldAffectedPageIds()
        {            
            Pair<string, Type> metaDataPair = this.GetBinding<Pair<string, Type>>("SelectedMetaDataDefinition");
            IPageMetaDataDefinition pageMetaDataDefinition = PageMetaDataFacade.GetMetaDataDefinition(GetCurrentPageId(), metaDataPair.First);

            IPage page = GetCurrentPage();
            
            return page.GetMetaDataAffectedPages(pageMetaDataDefinition.StartLevel, pageMetaDataDefinition.Levels).Select(f => f.Id).ToList();
        }



        private List<Guid> GetNewAffectedPageIds()
        {
            int startLevel = this.GetBinding<int>("SelectedStartDisplay");
            int levels = this.GetBinding<int>("SelectedInheritDisplay");

            IPage page = GetCurrentPage();

            return page.GetMetaDataAffectedPages(startLevel, levels).Select(f => f.Id).ToList();
        }



        private void DefinedDefinitionsExists(object sender, ConditionalEventArgs e)
        {
            IPage page = GetCurrentPage();

            e.Result = page.GetDefinedMetaDataTypes().Count() > 0;
        }



        private void AffectedPagesExists(object sender, ConditionalEventArgs e)
        {
            List<Guid> oldPageIds = GetOldAffectedPageIds();
            List<Guid> newPageIds = GetNewAffectedPageIds();

            Pair<string, Type> metaDataPair = this.GetBinding<Pair<string, Type>>("SelectedMetaDataDefinition");

            IEnumerable<Guid> newPageIdsToAdd = newPageIds.Except(oldPageIds);
            foreach (Guid id in newPageIdsToAdd)
            {
                IPage page = PageManager.GetPageById(id);

                if (page.GetMetaData(metaDataPair.First, metaDataPair.Second) == null)
                {
                    e.Result = true;
                    return;
                }
            }

            e.Result = false;
        }



        private void ValidateNewDefinition(object sender, ConditionalEventArgs e)
        {
            Pair<string, Type> metaDataPair = this.GetBinding<Pair<string, Type>>("SelectedMetaDataDefinition");
            IPageMetaDataDefinition pageMetaDataDefinition = PageMetaDataFacade.GetMetaDataDefinition(GetCurrentPageId(), metaDataPair.First);

            e.Result = true;

            string newLabel = this.GetBinding<string>("Label");
            Guid newMetaDataContainerId = this.GetBinding<Guid>("SelectedMetaDataContainer");

            Guid pageId = GetCurrentPageId();

            if (pageMetaDataDefinition.Label != newLabel)
            {
                if (PageMetaDataFacade.IsDefinitionAllowed(pageId, pageMetaDataDefinition.Name, newLabel, pageMetaDataDefinition.MetaDataTypeId) == false)
                {
                    e.Result = false;
                    ShowFieldMessage("Label", StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataFieldNameAlreadyUsed"));
                }
            }
             
            if (pageMetaDataDefinition.MetaDataContainerId != newMetaDataContainerId)
            {
                if (PageMetaDataFacade.IsNewContainerIdAllowed(pageId, pageMetaDataDefinition.Name, newMetaDataContainerId) == false)
                {
                    e.Result = false;
                    ShowFieldMessage("SelectedMetaDataContainer", StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.EditMetaDataWorkflow.MetaDataContainerChangeNotAllowed"));
                }
            }
        }



        private void initializeCodeActivity_ShowNoDefinedDefinitionsMessage_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowMessage(
                DialogType.Message,
                StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.EditMetaDataWorkflow.NoMetaDataDefinitionsExists.Title"),
                StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.EditMetaDataWorkflow.NoMetaDataDefinitionsExists.Message")
            );
        }



        private void initializeCodeActivity_UpdateBindings_ExecuteCode(object sender, EventArgs e)
        {
            IPage page = GetCurrentPage();

            Dictionary<Pair<string, Type>, string> fieldGroupNames = new Dictionary<Pair<string, Type>, string>();
            foreach (Tuple<Type, string> typeName in page.GetDefinedMetaDataTypeAndNames().OrderBy(f => f.Item2))
            {
                fieldGroupNames.Add(new Pair<string, Type>(typeName.Item2, typeName.Item1), typeName.Item2);
            }

            this.Bindings.Add("MetaDataDefinitionOptions", fieldGroupNames);
            this.Bindings.Add("SelectedMetaDataDefinition", fieldGroupNames.Keys.First());
        }



        private void editDefinitionCodeActivity_UpdateBindings_ExecuteCode(object sender, EventArgs e)
        {            
            Pair<string, Type> metaDataPair = this.GetBinding<Pair<string, Type>>("SelectedMetaDataDefinition");
            IPageMetaDataDefinition pageMetaDataDefinition = PageMetaDataFacade.GetMetaDataDefinition(GetCurrentPageId(), metaDataPair.First);

            this.UpdateBinding("Label", pageMetaDataDefinition.Label);

            List<KeyValuePair<Guid, string>> containers = PageMetaDataFacade.GetAllMetaDataContainers();
            this.UpdateBinding("MetaDataContainerOptions", containers);
            this.UpdateBinding("SelectedMetaDataContainer", pageMetaDataDefinition.MetaDataContainerId);

            IPage page = GetCurrentPage();

            Dictionary<int, string> startDisplayOptions = new Dictionary<int, string>();
            if (page != null)
            {
                startDisplayOptions.Add(0, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption0"));
            }
            startDisplayOptions.Add(1, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption1"));
            startDisplayOptions.Add(2, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption2"));
            startDisplayOptions.Add(3, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption3"));
            startDisplayOptions.Add(4, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption4"));
            startDisplayOptions.Add(5, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.StartDisplayOption5"));
            this.UpdateBinding("StartDisplayOptions", startDisplayOptions);
            this.UpdateBinding("SelectedStartDisplay", pageMetaDataDefinition.StartLevel);

            int levels = pageMetaDataDefinition.Levels;
            if (levels > 10) levels = 10000;

            Dictionary<int, string> inheritDisplayOptions = new Dictionary<int, string>();
            inheritDisplayOptions.Add(0, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption0"));
            inheritDisplayOptions.Add(1, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption1"));
            inheritDisplayOptions.Add(2, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption2"));
            inheritDisplayOptions.Add(3, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption3"));
            inheritDisplayOptions.Add(10000, StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataWorkflow.InheritDisplayOption4"));
            this.UpdateBinding("InheritDisplayOptions", inheritDisplayOptions);
            this.UpdateBinding("SelectedInheritDisplay", levels);
        }



        private void collectDefaultValuesCodeActivity_ShowWizzard_ExecuteCode(object sender, EventArgs e)
        {
            Pair<string, Type> metaDataPair = this.GetBinding<Pair<string, Type>>("SelectedMetaDataDefinition");

            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(metaDataPair.Second);
            Type metaDataType = TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);

            DataTypeDescriptorFormsHelper helper = new DataTypeDescriptorFormsHelper(dataTypeDescriptor);
            helper.LayoutLabel = StringResourceSystemFacade.GetString("Composite.StandardPlugins.PageTypeElementProvider", "PageType.AddPageTypeMetaDataFieldWorkflow.AddingDefaultMetaData.Title");
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
            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                List<Guid> oldPageIds = GetOldAffectedPageIds();
                List<Guid> newPageIds = GetNewAffectedPageIds();

                Pair<string, Type> metaDataPair = this.GetBinding<Pair<string, Type>>("SelectedMetaDataDefinition");
                Guid newMetaDataContainerId = this.GetBinding<Guid>("SelectedMetaDataContainer");                
                string newLabel = this.GetBinding<string>("Label");
                int startLevel = this.GetBinding<int>("SelectedStartDisplay");
                int levels = this.GetBinding<int>("SelectedInheritDisplay");

                PageMetaDataFacade.UpdateDefinition(GetCurrentPageId(), metaDataPair.First, newLabel, startLevel, levels, newMetaDataContainerId);                

                IEnumerable<Guid> oldPageIdsToRemove = oldPageIds.Except(newPageIds);
                foreach (Guid id in oldPageIdsToRemove)
                {
                    IPage page = PageManager.GetPageById(id);
                    
                    bool otherDefinitionExists = page.GetAllowedMetaDataDefinitions().Where(f => f.Name == metaDataPair.First).Any();

                    if (otherDefinitionExists == true) continue;
                                        
                    using (new DataScope(DataScopeIdentifier.Public))
                    {
                        IData dataToDelete = page.GetMetaData(metaDataPair.First, metaDataPair.Second);
                        if (dataToDelete != null)
                        {
                            DataFacade.Delete(dataToDelete);
                        }
                    }

                    using (new DataScope(DataScopeIdentifier.Administrated))
                    {
                        IData dataToDelete = page.GetMetaData(metaDataPair.First, metaDataPair.Second);
                        if (dataToDelete != null)
                        {
                            DataFacade.Delete(dataToDelete);
                        }
                    }
                }


                IData newDataTemplate = null;
                if (this.BindingExist("NewDataTemplate") == true)
                {
                    newDataTemplate = this.GetBinding<IData>("NewDataTemplate");

                    DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(metaDataPair.Second.GetImmutableTypeId());
                    DataTypeDescriptorFormsHelper helper = new DataTypeDescriptorFormsHelper(dataTypeDescriptor);
                    helper.BindingsToObject(this.Bindings, newDataTemplate);
                }


                IEnumerable<Guid> newPageIdsToAdd = newPageIds.Except(oldPageIds);
                foreach (Guid id in newPageIdsToAdd)
                {
                    IPage page = PageManager.GetPageById(id);

                    page.AddNewMetaDataToExistingPage(metaDataPair.First, metaDataPair.Second, newDataTemplate);
                }

                transactionScope.Complete();
            }
        }
    }
}
