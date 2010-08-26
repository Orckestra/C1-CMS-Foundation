using System;
using System.Linq;
using System.Collections.Generic;
using System.IO;
using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Core.Serialization;
using Composite.C1Console.Trees;
using Composite.Core.Types;
using Composite.Data.Validation;
using Composite.C1Console.Workflow;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Composite.C1Console.Elements;
using Composite.Data.Types;



namespace Composite.C1Console.Trees.Workflows
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class GenericAddDataWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        [NonSerialized]
        private GenericAddDataActionNode _genericAddDataActionNode;        

        [NonSerialized]
        private IEnumerable<KeyValuePair<string, string>> _dataPayload = null;

        [NonSerialized]
        private DataTypeDescriptorFormsHelper _dataTypeDescriptorFormsHelper = null;

        [NonSerialized]
        private string _typeName = null;
        private string TypeName { get { return _typeName; } set { _typeName = value; } }        



        private void Initialize()
        {
            if (_genericAddDataActionNode == null)
            {
                if (string.IsNullOrEmpty(this.Payload) == true) throw new InvalidOperationException("The interface type should be a part of the workflows payload");

                Dictionary<string, string> serializedValues = StringConversionServices.ParseKeyValueCollection(this.Payload);

                _genericAddDataActionNode = (GenericAddDataActionNode)ActionNode.Deserialize(serializedValues, true);

                _dataPayload = serializedValues;
            }
        }



        private IEnumerable<KeyValuePair<string, string>> DataPayload
        {
            get
            {
                return _dataPayload;
            }
        }



        private DataTypeDescriptorFormsHelper FormsHelper
        {
            get
            {
                if (_dataTypeDescriptorFormsHelper == null)
                {
                    DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(_genericAddDataActionNode.InterfaceType);

                    this.TypeName = dataTypeDescriptor.Name;

                    GeneratedTypesHelper generatedTypesHelper = new GeneratedTypesHelper(dataTypeDescriptor) { AllowForiegnKeyEditing = true };

                    _dataTypeDescriptorFormsHelper = new DataTypeDescriptorFormsHelper(dataTypeDescriptor, true, this.EntityToken);
                    if (string.IsNullOrEmpty(_genericAddDataActionNode.CustomFormMarkupPath) == false)
                    {
                        _dataTypeDescriptorFormsHelper.AlternateFormDefinition = File.ReadAllText(_genericAddDataActionNode.CustomFormMarkupPath);
                    }
                    _dataTypeDescriptorFormsHelper.LayoutIconHandle = _genericAddDataActionNode.Icon.ResourceName;
                    _dataTypeDescriptorFormsHelper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);
                }

                return _dataTypeDescriptorFormsHelper;
            }
        }



        public GenericAddDataWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_BuildNewData_ExecuteCode(object sender, EventArgs e)
        {
            Initialize();

            this.FormsHelper.UpdateWithNewBindings(this.Bindings);

            IData newData = DataFacade.BuildNew(_genericAddDataActionNode.InterfaceType);

            if (PageFolderFacade.GetAllFolderTypes().Contains(_genericAddDataActionNode.InterfaceType) == true)
            {
                Dictionary<string, string> piggybag = PiggybagSerializer.Deserialize(this.ExtraPayload);
                PiggybagDataFinder piggybagDataFinder = new PiggybagDataFinder(piggybag, this.EntityToken);
                IPage page = (IPage)piggybagDataFinder.TryGetData(typeof(IPage));
                if (page != null)
                {
                    PageFolderFacade.AssignFolderDataSpecificValues(newData, page);
                }
            }            

            IPublishControlled publishControlled = newData as IPublishControlled;
            if (publishControlled != null)
            {
                publishControlled.PublicationStatus = GenericPublishProcessController.Draft;
            }


            Dictionary<string, string> values = new Dictionary<string, string>();
            TreeDataFieldGroupingElementEntityToken castedEntityToken = this.EntityToken as TreeDataFieldGroupingElementEntityToken;
            if (castedEntityToken != null)
            {
                Tree tree = TreeFacade.GetTree(castedEntityToken.Source);
                DataFolderElementsTreeNode treeNode = (DataFolderElementsTreeNode)tree.GetTreeNode(castedEntityToken.TreeNodeId);

                if ((treeNode.Range == null) && (treeNode.FirstLetterOnly == false))
                {
                    foreach (var kvp in castedEntityToken.DeserializedGroupingValues)
                    {
                        values.Add(kvp.Key, ValueTypeConverter.Convert<string>(kvp.Value));
                    }
                }
            }

            foreach (var kvp in this.DataPayload)
            {
                if (values.ContainsKey(kvp.Key) == false)
                {
                    values.Add(kvp.Key, StringConversionServices.DeserializeValueString(kvp.Value));
                }
                else
                {
                    values[kvp.Key] = StringConversionServices.DeserializeValueString(kvp.Value);
                }
            }
            newData.SetValues(values);



            this.FormsHelper.ObjectToBindings(newData, this.Bindings);

            GeneratedTypesHelper.SetNewIdFieldValue(newData);

            this.Bindings.Add("NewData", newData);
        }



        private void step1CodeActivity_DisplayForm_ExecuteCode(object sender, EventArgs e)
        {
            Initialize();

            if (this.BindingExist("DataAdded") == false)
            {
                this.FormsHelper.LayoutLabel = this.FormsHelper.DataTypeDescriptor.Name;
            }

            IData newData = this.GetBinding<IData>("NewData");

            this.DeliverFormData(
                    this.TypeName,
                    StandardUiContainerTypes.Document,
                    this.FormsHelper.GetForm(),
                    this.Bindings,
                    this.FormsHelper.GetBindingsValidationRules(newData)
                );
        }



        private void saveCodeActivity_SaveData_ExecuteCode(object sender, EventArgs e)
        {
            Initialize();

            IData newData = this.GetBinding<IData>("NewData");

            Dictionary<string, string> errorMessages = this.FormsHelper.BindingsToObject(this.Bindings, newData);

            ValidationResults validationResults = ValidationFacade.Validate(newData.DataSourceId.InterfaceType, newData);

            bool isValid = true;
            if (validationResults.IsValid == false)
            {
                foreach (ValidationResult result in validationResults)
                {
                    this.ShowFieldMessage(result.Key, result.Message);

                    isValid = false;
                }
            }

            if (errorMessages != null)
            {
                isValid = false;

                foreach (var kvp in errorMessages)
                {
                    this.ShowFieldMessage(kvp.Key, kvp.Value);
                }
            }

            if (isValid == false)
            {
                SetSaveStatus(false);
                return;
            }


            if (this.BindingExist("DataAdded") == false)
            {
                newData = DataFacade.AddNew(newData);

                this.AcquireLock(newData.GetDataEntityToken());

                this.UpdateBinding("NewData", newData);
                this.Bindings.Add("DataAdded", true);

                SetSaveStatus(true, newData);
            }
            else
            {
                DataFacade.Update(newData);
                SetSaveStatus(true);
            }

            this.RefreshCurrentEntityToken();
        }
    }
}
