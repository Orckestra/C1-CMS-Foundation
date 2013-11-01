using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Core.Extensions;
using Composite.C1Console.Forms;
using Composite.Plugins.Forms.WebChannel.UiControlFactories;
using Composite.Functions;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Core.ResourceSystem;
using Composite.Data.Validation;
using Composite.Core.Logging;
using Composite.Core.WebClient.UiControlLib;


namespace CompositeTypeFieldDesigner
{

    public partial class TypeFieldDesigner : TypeFieldDesignerTemplateUserControlBase
    {
        private const string _defaultFieldNamePrefix = "NewField";
        private bool nameChanged = false;

        protected string GetString(string localPart)
        {
            return StringResourceSystemFacade.GetString("Composite.Web.FormControl.TypeFieldDesigner", localPart);
        }


        protected void Page_Load(object sender, EventArgs e)
        {

            if (DetailsSplitPanelPlaceHolder.Visible == false && this.CurrentlySelectedFieldId != Guid.Empty)
            {
                InitializeDetailsSplitPanel();
            }

            if (Page.IsPostBack == false)
            {
                DetailsSplitPanelPlaceHolder.Visible = false;
            }

            if (this.ViewState["Fields"] == null)
            {
                this.ViewState.Add("Fields", new List<DataFieldDescriptor>());
                this.ViewState.Add("editedPatameterId", null);
            }
        }

        protected void Page_PreRender(object sender, EventArgs e)
        {
            if (IsPostBack && this.CurrentlySelectedFieldId != Guid.Empty)
            {
                // Refreshing
                if (Request.Form["__EVENTTARGET"] == "")
                {
                    if (ValidateSave())
                    {
                        Field_Save();
                        nameChanged = true;
                    }
                }

                // Selecting "folder"
                if (Request.Form["__EVENTTARGET"] == "folder" && ValidateSave())
                {
                    Field_Save();
                    CurrentlySelectedFieldId = Guid.Empty;

                    DetailsSplitPanelPlaceHolder.Visible = false;
                }

                // TODO: fix the type reference!
                btnWidgetFunctionMarkup.Attributes["label"] = CurrentlySelectedWidgetText;
                btnWidgetFunctionMarkup.Attributes["url"] = "${root}/content/dialogs/functions/editFunctionCall.aspx?functiontype=widget&zip_type="
                    + UrlUtils.ZipContent(TypeManager.SerializeType(CurrentlySelectedWidgetReturnType))
                    + "&dialoglabel=" + HttpUtility.UrlEncode(GetString("WidgetDialogLabel"), Encoding.UTF8) + "&multimode=false&functionmarkup=";

                btnValidationRulesFunctionMarkup.Attributes["label"] =
                    GetString(btnValidationRulesFunctionMarkup.Value.IsNullOrEmpty()
                                  ? "ValidationRulesAdd"
                                  : "ValidationRulesEdit");
                // TODO: some of the query parameters may not be used at the moment
                btnValidationRulesFunctionMarkup.Attributes["url"] = "${root}/content/dialogs/functions/editFunctionCall.aspx?zip_type="
                     + UrlUtils.ZipContent(TypeManager.SerializeType(this.CurrentlySelectedTypeValidatorType))
                     + "&dialoglabel=" + HttpUtility.UrlEncode(GetString("ValidationRulesDialogLabel"), Encoding.UTF8)
                     + "&multimode=true&addnewicon=Composite.Icons,validationrules-add&addnewicondisabled=Composite.Icons,validationrules-add-disabled"
                     + "&functionicon=Composite.Icons,validationrule&containericon=Composite.Icons,validationrules&functionmarkup=";

                btnDefaultValueFunctionMarkup.Attributes["label"] = CurrentlySelectedDefaultValueText;
                btnDefaultValueFunctionMarkup.Attributes["url"] =
                    "${root}/content/dialogs/functions/editFunctionCall.aspx?zip_type="
                    + UrlUtils.ZipContent(TypeManager.SerializeType(this.CurrentlySelectedDefaultValueFunctionReturnType))
                    + "&dialoglabel=" + HttpUtility.UrlEncode(GetString("DefaultValueDialogLabel"), Encoding.UTF8)
                    + "&multimode=false&functionmarkup=";
            }

            if (nameChanged)
            {
                UpdateFieldsPanel();
            }
        }

        private void InitializeDetailsSplitPanel()
        {
            UpdateDetailsSplitPanel(true);
            UpdatePositionFieldOptions();
            UpdateGroupByPriorityFieldOptions();
            UpdateTreeOrderingFieldOptions();
            UpdateFieldTypeDetailsSelector();
        }


        private void UpdateDetailsSplitPanel(bool detailsSplitPanel)
        {
            if (DetailsSplitPanelPlaceHolder.Visible != detailsSplitPanel)
            {
                DetailsSplitPanelPlaceHolder.Visible = detailsSplitPanel;
            }
        }


        private void UpdatePositionFieldOptions()
        {
            var positionOptions = new Dictionary<int, string>();

            for (int i = 0; i < this.CurrentFields.Count; i++)
            {
                positionOptions.Add(i, (i + 1).ToString() + ".");
            }

            positionOptions.Add(-1, GetString("PositionLast"));

            this.PositionField.DataSource = positionOptions;
            this.PositionField.DataTextField = "Value";
            this.PositionField.DataValueField = "Key";
            this.PositionField.DataBind();
        }


        private void UpdateGroupByPriorityFieldOptions()
        {
            var groupByPriorityOptions = new Dictionary<int, string>();

            groupByPriorityOptions.Add(0, GetString("GroupByPriorityNone"));
            groupByPriorityOptions.Add(1, GetString("GroupByPriorityFirst"));

            int existingGroupedFieldCount = this.CurrentFields.Count(f => f.GroupByPriority > 0);

            if (existingGroupedFieldCount > 0)
            {
                for (int i = 2; i <= existingGroupedFieldCount; i++)
                {
                    groupByPriorityOptions.Add(i, string.Format(GetString("GroupByPriorityN"), i.ToString()));
                }

                if (this.CurrentFields.Any(f => f.Id == this.CurrentlySelectedFieldId && f.GroupByPriority > 0) == false)
                {
                    groupByPriorityOptions.Add(existingGroupedFieldCount + 1, string.Format(GetString("GroupByPriorityN"), existingGroupedFieldCount + 1));
                }
            }

            this.GroupByPriorityField.DataSource = groupByPriorityOptions;
            this.GroupByPriorityField.DataTextField = "Value";
            this.GroupByPriorityField.DataValueField = "Key";
            this.GroupByPriorityField.DataBind();
        }


        private void UpdateTreeOrderingFieldOptions()
        {
            var treeOrderingFieldOptions = new Dictionary<DataFieldTreeOrderingProfile, string>();

            treeOrderingFieldOptions.Add(
                new DataFieldTreeOrderingProfile { OrderPriority = null }
                , GetString("TreeOrderingNone"));
            treeOrderingFieldOptions.Add(
                new DataFieldTreeOrderingProfile { OrderPriority = 1, OrderDescending = false }
                , GetString("TreeOrderingFirstAscending"));
            treeOrderingFieldOptions.Add(
                new DataFieldTreeOrderingProfile { OrderPriority = 1, OrderDescending = true }
                , GetString("TreeOrderingFirstDescending"));

            int existingOrderedFieldCount = this.CurrentFields.Count(f => f.TreeOrderingProfile != null && f.TreeOrderingProfile.OrderPriority.HasValue);

            if (existingOrderedFieldCount > 0)
            {
                for (int i = 2; i <= existingOrderedFieldCount; i++)
                {
                    treeOrderingFieldOptions.Add(
                        new DataFieldTreeOrderingProfile { OrderPriority = i, OrderDescending = false }
                        , string.Format(GetString("TreeOrderingNAscending"), i));

                    treeOrderingFieldOptions.Add(
                        new DataFieldTreeOrderingProfile { OrderPriority = i, OrderDescending = true }
                        , string.Format(GetString("TreeOrderingNDescending"), i));
                }

                if (this.CurrentFields.Any(f => f.Id == this.CurrentlySelectedFieldId && f.TreeOrderingProfile.OrderPriority > 0) == false)
                {
                    treeOrderingFieldOptions.Add(
                        new DataFieldTreeOrderingProfile { OrderPriority = existingOrderedFieldCount + 1, OrderDescending = false }
                        , string.Format(GetString("TreeOrderingNAscending"), existingOrderedFieldCount + 1));

                    treeOrderingFieldOptions.Add(
                        new DataFieldTreeOrderingProfile { OrderPriority = existingOrderedFieldCount + 1, OrderDescending = true }
                        , string.Format(GetString("TreeOrderingNDescending"), existingOrderedFieldCount + 1));
                }
            }

            this.TreeOrderingField.DataSource = treeOrderingFieldOptions;
            this.TreeOrderingField.DataTextField = "Value";
            this.TreeOrderingField.DataValueField = "Key";
            this.TreeOrderingField.DataBind();
        }



        private void UpdateFieldTypeDetailsSelector()
        {
            TypeDetailsSelector.ClearSelection();
            TypeDetailsSelector.Items.Clear();

            TypeDetailsPlaceHolder.Visible = true;
            TypeDetailsOptionalPlaceHolder.Visible = true;

            switch (this.TypeSelector.SelectedValue)
            {
                case "System.String":
                    TypeDetailsLabel.Text = GetString("StringMaximumLength");

                    TypeDetailsSelector.AutoPostBack = false; // this is a fix to plug bug in update manager (client)
                    TypeDetailsSelector.Items.Add(new ListItem(GetString("16CharMax"), "16"));
                    TypeDetailsSelector.Items.Add(new ListItem(GetString("32CharMax"), "32"));
                    TypeDetailsSelector.Items.Add(new ListItem(GetString("64CharMax"), "64"));
                    TypeDetailsSelector.Items.Add(new ListItem(GetString("128CharMax"), "128"));
                    TypeDetailsSelector.Items.Add(new ListItem(GetString("256CharMax"), "256"));
                    TypeDetailsSelector.Items.Add(new ListItem(GetString("512CharMax"), "512"));
                    TypeDetailsSelector.Items.Add(new ListItem(GetString("1024CharMax"), "1024"));
                    TypeDetailsSelector.Items.Add(new ListItem(GetString("Unlimited"), "max"));
                    TypeDetailsSelector.SelectedValue = "64";
                    break;
                case "System.Decimal":
                    TypeDetailsLabel.Text = GetString("DecimalNumberFormat");
                    TypeDetailsSelector.AutoPostBack = false; // this is a fix to plug bug in update manager (client)
                    TypeDetailsSelector.Items.Add(new ListItem(GetString("1DecimalPlace"), "1"));
                    for (int i = 1; i < 16; i++)
                    {
                        TypeDetailsSelector.Items.Add(new ListItem(GetString("nDecimalPlaces").FormatWith(i), i.ToString()));
                    }
                    TypeDetailsSelector.SelectedValue = "2";
                    break;
                case "Reference":
                    TypeDetailsLabel.Text = GetString("ReferenceType"); ;
                    TypeDetailsSelector.AutoPostBack = true;

                    var typeList =
                            from dataType in DataFacade.GetAllKnownInterfaces(UserType.Developer)
                            where dataType.IsNotReferenceable() == false
                            orderby dataType.FullName
                            select new { TypeManagerName = TypeManager.SerializeType(dataType), Label = dataType.GetShortLabel() };

                    TypeDetailsSelector.DataSource = typeList;
                    TypeDetailsSelector.DataTextField = "Label";
                    TypeDetailsSelector.DataValueField = "TypeManagerName";
                    TypeDetailsSelector.SelectedValue = null;
                    TypeDetailsSelector.DataBind();
                    break;
                case "System.Boolean":
                    TypeDetailsOptionalPlaceHolder.Visible = false;
                    TypeDetailsPlaceHolder.Visible = false;
                    break;
                case "XHTML":
                    TypeDetailsOptionalPlaceHolder.Visible = false;
                    TypeDetailsPlaceHolder.Visible = false;
                    break;
                default:
                    TypeDetailsPlaceHolder.Visible = false;
                    break;
            }
        }



        protected void TypeDetailsSelector_Reference_SelectedIndexChanged(object sender, EventArgs e)
        {
            CheckAndFixWrongOptionalSelection();

            if (TypeSelector.SelectedValue == "Reference")
            {
                ResetWidgetSelector();
                ResetDefaultValueSelector();
            }
        }




        private void ResetWidgetSelector()
        {
            string widgetFunctionMarkup = "";

            WidgetFunctionProvider widgetFunctionProvider = StandardWidgetFunctions.GetDefaultWidgetFunctionProviderByType(this.CurrentlySelectedWidgetReturnType);
            if (widgetFunctionProvider != null)
            {
                widgetFunctionMarkup = widgetFunctionProvider.SerializedWidgetFunction.ToString(SaveOptions.DisableFormatting);
            } 

            btnWidgetFunctionMarkup.Value = widgetFunctionMarkup;

            if (widgetFunctionMarkup == "")
            {
                Baloon(btnWidgetFunctionMarkup.ClientID, GetString("NoWidgetSelected")); 
            }
        }



        private void ResetDefaultValueSelector()
        {
            if (this.TypeSelector.SelectedValue=="XHTML")
            {
                var function = StandardFunctions.XhtmlDocumentFunction;
                var functionParameters = new Dictionary<string,object>();
                functionParameters.Add( "Constant", new XhtmlDocument());
                var functionTree = FunctionFacade.BuildTree(StandardFunctions.XhtmlDocumentFunction, functionParameters);
                btnDefaultValueFunctionMarkup.Value = functionTree.Serialize().ToString();

                return;
            }
            if (btnDefaultValueFunctionMarkup.Value.IsNullOrEmpty())
            {
                return;
            }
            
            try
            {
                XElement functionElement = XElement.Parse(btnDefaultValueFunctionMarkup.Value);
                if (functionElement.Name.Namespace != Namespaces.Function10)
                    functionElement = functionElement.Elements().First();
                BaseFunctionRuntimeTreeNode functionNode =
                    (BaseFunctionRuntimeTreeNode) FunctionFacade.BuildTree(functionElement);

                IFunction function = FunctionFacade.GetFunction(functionNode.GetCompositeName());

                if (!function.ReturnType.Equals(this.CurrentlySelectedDefaultValueFunctionReturnType))
                {
                    btnDefaultValueFunctionMarkup.Value = "";
                }
            }
            catch (Exception ex)
            {
                LoggingService.LogError("TypeFieldDesigner",
                        string.Format("Default value settings reset. Existing function markup failed to validate with the following message: '{0}'", ex.Message));
                btnDefaultValueFunctionMarkup.Value = "";
            }
        }


        protected void PositionField_SelectedIndexChanged(object sender, EventArgs e)
        {
            FieldSettingsChanged(sender, e);
            UpdateFieldsPanel();
        }



        protected void TypeSelector_SelectedIndexChanged(object sender, EventArgs e)
        {
            UpdateFieldTypeDetailsSelector();
            CheckAndFixWrongOptionalSelection();

            if (this.ViewState["Fields"] == null) throw new Exception("ViewState element 'Fields' does not exist");
            var Fields = (List<DataFieldDescriptor>)this.ViewState["Fields"];

            DataFieldDescriptor selectedField = Fields.Single(f => f.Id == this.CurrentlySelectedFieldId);
            selectedField.ValidationFunctionMarkup = null;
            btnValidationRulesFunctionMarkup.Value = "";

            FieldSettingsChanged(sender, e);

            ResetWidgetSelector();
            ResetDefaultValueSelector();
        }



        protected void OptionalSelector_SelectedIndexChanged(object sender, EventArgs e)
        {
            CheckAndFixWrongOptionalSelection();

            if (this.TypeSelector.SelectedValue == "Reference" 
                || (this.CurrentlySelectedType != typeof(string) && this.CurrentlySelectedType != typeof(DateTime)))
            {
                ResetWidgetSelector();
            }

            FieldSettingsChanged(sender, e);
        }



        private void CheckAndFixWrongOptionalSelection()
        {
            if (this.OptionalSelector.SelectedValue == "true")
            {
                this.OptionalSelector.SelectedValue = "false";
                bool notOptional = (this.CurrentlySelectedType == typeof(bool) || this.TypeSelector.SelectedValue == "XHTML");

                if (notOptional == true)
                {
                    UpdateDetailsSplitPanel(true);
                }
                else
                {
                    this.OptionalSelector.SelectedValue = "true";
                }
            }
        }




        protected void FieldDataList_ItemCommand(Object sender, EventArgs e)
        {
            RepeaterCommandEventArgs repeaterEventArgs = (RepeaterCommandEventArgs)e;
            Guid FieldId = new Guid(repeaterEventArgs.CommandArgument.ToString());

            if (ValidateSave() == true)
            {
                switch (repeaterEventArgs.CommandName)
                {
                    case "Select":
                        Field_Select(FieldId);
                        break;
                    default:
                        throw new Exception("unhandled item command name: " + repeaterEventArgs.CommandName);
                }
            }
            else
            {
                UpdateFieldsPanel();
            }
        }


        private void Field_Delete(Guid FieldId)
        {
            if (this.ViewState["Fields"] == null) throw new Exception("ViewState element 'Fields' does not exist");
            var Fields = (List<DataFieldDescriptor>)this.ViewState["Fields"];

            var Field = Fields.Single(f => f.Id == FieldId);

            if (this.CurrentLabelFieldName == Field.Name)
            {
                this.CurrentLabelFieldName = "";
            }

            Fields.RemoveAll(f => f.Id == FieldId);

            if (this.CurrentlySelectedFieldId != Guid.Empty)
            {
                if (this.CurrentlySelectedFieldId == FieldId) this.CurrentlySelectedFieldId = Guid.Empty;
            }

            foreach (DataFieldDescriptor laterField in this.CurrentFields.Where(f => f.Position > Field.Position))
            {
                laterField.Position--;
            }

            EnsureGroupByPrioritySequence();

            UpdatePositionFieldOptions();
            UpdateTreeOrderingFieldOptions();
            UpdateGroupByPriorityFieldOptions();

            this.PositionField.SelectedValue = "-1";
            this.GroupByPriorityField.SelectedValue = "0";
            this.TreeOrderingField.SelectedValue = null;
            this.NameField.Text = "";

            UpdateFieldsPanel();

            UpdateDetailsSplitPanel(false);
        }



        private void Field_Select(Guid FieldId)
        {
            if (!ValidateSave())
            {
                return;
            }

            if (this.CurrentlySelectedFieldId != Guid.Empty)
            {
                Field_Save();
            }

            InitializeDetailsSplitPanel();

            if (this.ViewState["Fields"] == null) throw new Exception("ViewState element 'Fields' does not exist");
            var Fields = (List<DataFieldDescriptor>)this.ViewState["Fields"];

            var selectedField = Fields.Single(f => f.Id == FieldId);

            this.CurrentlySelectedFieldId = FieldId;

            this.NameField.Text = selectedField.Name;

            this.IsTitleFieldDateTimeSelector.Checked = (this.CurrentLabelFieldName == selectedField.Name);

            this.LabelField.Text = selectedField.FormRenderingProfile.Label;
            this.HelpField.Text = selectedField.FormRenderingProfile.HelpText;
            btnWidgetFunctionMarkup.Value = selectedField.FormRenderingProfile.WidgetFunctionMarkup;
            btnDefaultValueFunctionMarkup.Value = selectedField.NewInstanceDefaultFieldValue;

            if (string.IsNullOrEmpty(selectedField.ForeignKeyReferenceTypeName) == true)
            {
                if (selectedField.InstanceType.IsGenericType && selectedField.InstanceType.GetGenericTypeDefinition() == typeof(Nullable<>))
                {
                    Type underlying = selectedField.InstanceType.GetGenericArguments()[0];
                    this.TypeSelector.SelectedValue = underlying.FullName;
                }
                else
                {
                    this.TypeSelector.SelectedValue = selectedField.InstanceType.FullName;
                }
            }
            else
            {
                this.TypeSelector.SelectedValue = "Reference";
            }

            // XHTML compensate
            if (selectedField.InstanceType == typeof(string) && selectedField.StoreType.IsLargeString && !string.IsNullOrEmpty(selectedField.FormRenderingProfile.WidgetFunctionMarkup))
            {
                var viualEditorWidgetName = StandardWidgetFunctions.VisualXhtmlDocumentEditorWidget.WidgetFunctionCompositeName;
                var widgetFunction = XElement.Parse(selectedField.FormRenderingProfile.WidgetFunctionMarkup);
                if((string)widgetFunction.Attribute("name") == viualEditorWidgetName)
                {
                    this.TypeSelector.SelectedValue = "XHTML";
                }
            }

            this.OptionalSelector.SelectedValue = (selectedField.IsNullable ? "true" : "false");

            UpdateFieldTypeDetailsSelector();

            btnValidationRulesFunctionMarkup.Value = "";

            if (selectedField.ValidationFunctionMarkup != null && selectedField.ValidationFunctionMarkup.Count > 0)
            {
                btnValidationRulesFunctionMarkup.Value = string.Format("<functions>{0}</functions>", String.Concat(selectedField.ValidationFunctionMarkup.ToArray()));
            }

            if (this.TypeSelector.SelectedValue != "Reference")
            {
                if (selectedField.InstanceType == typeof(string))
                {
                    if (selectedField.StoreType.IsLargeString)
                    {
                        this.TypeDetailsSelector.SelectedValue = "max";
                    }
                    else
                    {
                        ListItem selected = this.TypeDetailsSelector.Items.FindByValue(selectedField.StoreType.MaximumLength.ToString());
                        if (selected == null)
                        {
                            selected = new ListItem(selectedField.StoreType.MaximumLength.ToString());
                            this.TypeDetailsSelector.Items.Add(selected);
                        }
                        this.TypeDetailsSelector.ClearSelection();
                        selected.Selected = true;
                    }
                }
                if (selectedField.InstanceType == typeof(decimal) || selectedField.InstanceType == typeof(decimal?))
                {
                    ListItem selected = this.TypeDetailsSelector.Items.FindByValue(selectedField.StoreType.NumericScale.ToString());
                    if (selected == null)
                    {
                        selected = new ListItem(selectedField.StoreType.NumericScale.ToString());
                        this.TypeDetailsSelector.Items.Add(selected);
                    }
                    this.TypeDetailsSelector.SelectedValue = selected.Value;
                    //selected.Selected = true;
                }
            }

            if (string.IsNullOrEmpty(selectedField.ForeignKeyReferenceTypeName) == false)
            {
                try
                {
                    this.TypeDetailsSelector.SelectedValue = selectedField.ForeignKeyReferenceTypeName;
                }
                catch (Exception)
                {
                    Baloon(this.TypeDetailsSelector, string.Format("Unable to set original value. '{0}' is not known.", selectedField.ForeignKeyReferenceTypeName));
                }
            }

            this.PositionField.SelectedValue = (selectedField.Position == this.CurrentFields.Count - 1 ? "-1" : selectedField.Position.ToString());

            UpdateGroupByPriorityFieldOptions();
            UpdateTreeOrderingFieldOptions();
            this.GroupByPriorityField.SelectedValue = selectedField.GroupByPriority.ToString();
            this.TreeOrderingField.SelectedValue = selectedField.TreeOrderingProfile.ToString();
        }



        private string CurrentLabelFieldName
        {
            get
            {
                if (this.ViewState["LabelFieldName"] == null)
                {
                    return "";
                }

                return (string)this.ViewState["LabelFieldName"];
            }
            set
            {
                this.ViewState["LabelFieldName"] = value;
            }
        }



        protected Guid CurrentlySelectedFieldId
        {
            get
            {
                if (this.ViewState["editedFieldId"] == null)
                {
                    return Guid.Empty;
                }

                return new Guid(this.ViewState["editedFieldId"].ToString());
            }
            set
            {
                this.ViewState["editedFieldId"] = value;
            }
        }



        protected bool HasFields
        {
            get
            {
                return this.CurrentFields.Count > 0;
            }
        }


        private List<DataFieldDescriptor> CurrentFields
        {
            get
            {
                if (this.ViewState["Fields"] == null) throw new Exception("ViewState element 'Fields' does not exist");
                return (List<DataFieldDescriptor>)this.ViewState["Fields"];
            }

            set
            {
                this.ViewState["Fields"] = value;
            }
        }



        private string CurrentForeignKeyReferenceTypeName
        {
            get
            {
                switch (this.TypeSelector.SelectedValue)
                {
                    case "Reference":
                        return this.TypeDetailsSelector.SelectedValue;
                    default:
                        return null;
                }
            }
        }



        private Type GetInstanceTypeForReference(Type referencedType)
        {
            List<PropertyInfo> keyProperties = DataAttributeFacade.GetKeyProperties(referencedType);

            if (keyProperties.Count == 1)
            {
                return keyProperties[0].PropertyType;
            }
            else
            {
                // with multi key tyoes we go with a string
                return typeof(string);
            }
        }



        protected Type CurrentlySelectedTypeValidatorType
        {
            get
            {
                Type builderGenericBase = typeof(PropertyValidatorBuilder<>);

                Type selectedType = this.CurrentlySelectedType;
                // Nullable<T> handling
                if (selectedType.IsGenericType && selectedType.GetGenericTypeDefinition() == typeof(Nullable<>))
                {
                    selectedType = selectedType.GetGenericArguments()[0];
                }

                return builderGenericBase.MakeGenericType(selectedType);
            }
        }



        protected Type CurrentlySelectedWidgetReturnType
        {
            get
            {
                if (TypeSelector.SelectedValue == "XHTML")
                {
                    return typeof(XhtmlDocument);
                }

                Type selectedType = this.CurrentlySelectedType;

                if (this.CurrentForeignKeyReferenceTypeName != null)
                {
                    Type referencedType = TypeManager.GetType(this.CurrentForeignKeyReferenceTypeName);
                    if (referencedType == null) throw new InvalidOperationException("Missing value for referenced type!" + this.CurrentForeignKeyReferenceTypeName);
                    Type[] typeArg = { referencedType };

                    if (this.OptionalSelector.SelectedValue == "true")
                    {
                        selectedType = typeof(NullableDataReference<>).MakeGenericType(typeArg);
                    }
                    else
                    {
                        selectedType = typeof(DataReference<>).MakeGenericType(typeArg);
                    }
                }


                return selectedType;
            }
        }



        protected Type CurrentlySelectedDefaultValueFunctionReturnType
        {
            get
            {
                Type selectedType = this.CurrentlySelectedType;

                if (this.CurrentForeignKeyReferenceTypeName != null)
                {
                    Type referencedType = TypeManager.GetType(this.CurrentForeignKeyReferenceTypeName);
                    if (referencedType == null) throw new InvalidOperationException("Missing value for referenced type!" + this.CurrentForeignKeyReferenceTypeName);
                    Type[] typeArg = { referencedType };

                    selectedType = typeof(DataReference<>).MakeGenericType(typeArg);
                }


                return selectedType;
            }
        }



        protected string CurrentlySelectedWidgetText
        {
            get
            {
                if (!btnWidgetFunctionMarkup.Value.IsNullOrEmpty())
                {
                    try
                    {
                        XElement functionElement = XElement.Parse(btnWidgetFunctionMarkup.Value);
                        if (functionElement.Name.Namespace != Namespaces.Function10)
                        {
                            functionElement = functionElement.Elements().First();
                        }
                        var widgetNode = (BaseFunctionRuntimeTreeNode) FunctionFacade.BuildTree(functionElement);
                        return widgetNode.GetName();
                    }
                    catch (Exception ex)
                    {
                        LoggingService.LogError("TypeFieldDesigner", "Widget settings reset. Existing widget failed to validate with the following message: '{0}'".FormatWith(ex.Message));
                        btnWidgetFunctionMarkup.Value = string.Empty;
                    }
                }

                return GetString("NoWidgetSelectedLabel");
            }
        }



        protected string CurrentlySelectedDefaultValueText
        {
            get
            {
                if (!btnDefaultValueFunctionMarkup.Value.IsNullOrEmpty())
                {
                    try
                    {
                        XElement functionElement = XElement.Parse(btnDefaultValueFunctionMarkup.Value);
                        if (functionElement.Name.Namespace != Namespaces.Function10)
                            functionElement = functionElement.Elements().First();
                        BaseFunctionRuntimeTreeNode widgetNode = (BaseFunctionRuntimeTreeNode)FunctionFacade.BuildTree(functionElement);
                        return widgetNode.GetName();
                    }
                    catch (Exception ex)
                    {
                        LoggingService.LogError("TypeFieldDesigner", string.Format("Widget settings reset. Existing widget failed to validate with the following message: '{0}'", ex.Message));
                        btnWidgetFunctionMarkup.Value = "";
                    }
                }

                return "(no default value)";
            }
        }

        private Type CurrentlySelectedType
        {
            get
            {
                Type selectedType = null;
                switch (this.TypeSelector.SelectedValue)
                {
                    case "Reference":
                        Type referencedType = TypeManager.GetType(this.CurrentForeignKeyReferenceTypeName);
                        selectedType = GetInstanceTypeForReference(referencedType);
                        break;
                    case "XHTML":
                        selectedType = typeof(string);
                        break;
                    default:
                        selectedType = TypeManager.GetType(this.TypeSelector.SelectedValue);
                        break;
                }

                if (this.OptionalSelector.SelectedValue == "true")
                {
                    if (selectedType == typeof(string)) return typeof(string);

                    if (selectedType == typeof(Guid)) return typeof(Nullable<Guid>);
                    if (selectedType == typeof(int)) return typeof(Nullable<int>);
                    if (selectedType == typeof(decimal)) return typeof(Nullable<decimal>);
                    if (selectedType == typeof(DateTime)) return typeof(Nullable<DateTime>);

                    if (selectedType == typeof(bool)) throw new InvalidOperationException("bool can not be nullable");

                    throw new InvalidOperationException("unhandles nullable type");
                }
                else
                {
                    return selectedType;
                }
            }
        }



        private StoreFieldType CurrentlySelectedStoreFieldType
        {
            get
            {
                switch (this.TypeSelector.SelectedValue)
                {
                    case "System.String":
                        if (this.TypeDetailsSelector.SelectedValue == "max") return StoreFieldType.LargeString;
                        return StoreFieldType.String(Int32.Parse(this.TypeDetailsSelector.SelectedValue));
                    case "XHTML":
                        return StoreFieldType.LargeString;
                    case "System.Int32":
                        return StoreFieldType.Integer;
                    case "System.Decimal":
                        int decimalPlaces = Int32.Parse(this.TypeDetailsSelector.SelectedValue);
                        return StoreFieldType.Decimal(28, decimalPlaces);
                    case "System.DateTime":
                        return StoreFieldType.DateTime;
                    case "System.Boolean":
                        return StoreFieldType.Boolean;
                    case "System.Guid":
                        return StoreFieldType.Guid;
                    case "Reference":
                        Type referencedType = TypeManager.GetType(this.CurrentForeignKeyReferenceTypeName);
                        List<PropertyInfo> keyProperties = DataAttributeFacade.GetKeyProperties(referencedType);

                        if (keyProperties.Count == 1)
                        {
                            object[] storeFieldTypeAttributes = keyProperties[0].GetCustomAttributes(typeof(StoreFieldTypeAttribute), true);
                            if (storeFieldTypeAttributes.Length == 1)
                            {
                                return ((StoreFieldTypeAttribute)storeFieldTypeAttributes[0]).StoreFieldType;
                            }
                            else
                            {
                                throw new InvalidOperationException("Referenced types key field is missing an StoreFieldType attribute.");
                            }
                        }
                        else
                        {
                            // with multi key tyoes we go with a string
                            return StoreFieldType.LargeString;
                        }
                    default:
                        throw new InvalidOperationException("can not locate store type - unmapped type");
                }
            }
        }



        private Dictionary<string, string> GetBindingValuesAsStrings(Dictionary<string, object> source)
        {
            var result = new Dictionary<string, string>();
            foreach (var sourceParam in source)
            {
                if (sourceParam.Value != null)
                {
                    if (sourceParam.Value.GetType() == typeof(string))
                    {
                        result.Add(sourceParam.Key, (string)sourceParam.Value);
                    }
                    else
                    {

                        string value = Composite.Core.Types.ValueTypeConverter.Convert<string>(sourceParam.Value);
                        result.Add(sourceParam.Key, value);
                    }
                }
            }
            return result;
        }



        private void ShowMessage(string targetFieldName, string p)
        {
            FieldMessage fm = new FieldMessage(targetFieldName, p);

        }



        protected void AddNewButton_Click(object sender, EventArgs e)
        {
            if (!ValidateSave())
            {
                return;
            }

            if (this.CurrentlySelectedFieldId != Guid.Empty)
            {
                Field_Save();
            }

            InitializeDetailsSplitPanel();

            this.CurrentlySelectedFieldId = Guid.NewGuid();
            this.NameField.Text = _defaultFieldNamePrefix;

            int i = 2;
            while (this.CurrentFields.Where(f => f.Name == this.NameField.Text).Any())
            {
                this.NameField.Text = _defaultFieldNamePrefix + i++;
            }

            this.TypeSelector.SelectedValue = "System.String";
            this.UpdateFieldTypeDetailsSelector();
            btnValidationRulesFunctionMarkup.Value = "";
            btnDefaultValueFunctionMarkup.Value = "";
            this.LabelField.Text = "";
            this.HelpField.Text = "";
            this.PositionField.SelectedValue = "-1";

            this.IsTitleFieldDateTimeSelector.Checked = (string.IsNullOrEmpty(this.CurrentLabelFieldName));

            ResetWidgetSelector();

            Field_Save();

            UpdatePositionFieldOptions();
            UpdateTreeOrderingFieldOptions();
            UpdateGroupByPriorityFieldOptions();
            UpdateFieldsPanel();
            MakeClientDirty();
        }



        private bool ValidateSave()
        {
            if (this.CurrentlySelectedFieldId == Guid.Empty) return true;

            if (this.NameField.Text.Contains(" ") == true)
            {
                Baloon(this.NameField, GetString("SpaceInNameError"));
                return false;
            }

            if (string.IsNullOrEmpty(this.NameField.Text) == true)
            {
                Baloon(this.NameField, GetString("NameEmptyError"));
                return false;
            }

            if (this.CurrentFields.Where(f => f.Name == this.NameField.Text && f.Id != this.CurrentlySelectedFieldId).Any() == true)
            {
                Baloon(this.NameField, GetString("NameAlreadyInUseError"));
                return false;
            }

            string err;
            if (Composite.Data.DynamicTypes.NameValidation.TryValidateName(this.NameField.Text, out err) == false)
            {
                Baloon(this.NameField, err);
                return false;
            }

            return true;
        }



        private void Baloon(Control c, string message)
        {
            Baloon(c.UniqueID, message);
        }

        private void Baloon(string fieldName, string message)
        {
            FieldMessage fm = new FieldMessage(fieldName, message);

            BaloonPlaceHolder.Controls.Add(fm);
        }

        private void UpdateFieldsPanel()
        {
            this.FieldListRepeater.DataSource = this.ViewState["Fields"];
            this.FieldListRepeater.DataBind();
        }

        private void Field_Save()
        {
            if (this.CurrentFields.Count(f => f.Id == this.CurrentlySelectedFieldId) == 0)
            {
                DataFieldDescriptor newField = new DataFieldDescriptor(this.CurrentlySelectedFieldId, this.NameField.Text, StoreFieldType.Boolean, this.CurrentlySelectedType);
                newField.Position = this.CurrentFields.Count;
                this.CurrentFields.Add(newField);
            }

            if (FieldNameSyntaxValid(this.NameField.Text) == false)
            {
                ShowMessage(this.NameField.ClientID, GetString("FieldNameSyntaxInvalid"));
                return;
            }

            var field = this.CurrentFields.Single(f => f.Id == this.CurrentlySelectedFieldId);


            if (field.Name != this.NameField.Text)
            {
                nameChanged = true;
            }


            if (this.CurrentFields.Count<DataFieldDescriptor>(f => f.Name.ToLower() == this.NameField.Text.ToLower() && f.Id != field.Id) > 0)
            {
                ShowMessage(this.NameField.ClientID, GetString("CannotSave"));
                return;
            }

            field.Name = this.NameField.Text;
            field.InstanceType = this.CurrentlySelectedType;
            field.ForeignKeyReferenceTypeName = this.CurrentForeignKeyReferenceTypeName;

            field.StoreType = this.CurrentlySelectedStoreFieldType;

            if (this.IsTitleFieldDateTimeSelector.Checked == true)
            {
                this.CurrentLabelFieldName = field.Name;
            }
            else
            {
                if (this.CurrentLabelFieldName == field.Name)
                {
                    this.CurrentLabelFieldName = "";
                }
            }

            bool generateLabel = (this.LabelField.Text == "" && this.NameField.Text.StartsWith(_defaultFieldNamePrefix) == false);
            string label = (generateLabel ? this.NameField.Text : this.LabelField.Text);

            field.IsNullable = bool.Parse(this.OptionalSelector.SelectedValue);

            field.FormRenderingProfile.Label = label;
            field.FormRenderingProfile.HelpText = this.HelpField.Text;

            if (!btnWidgetFunctionMarkup.Value.IsNullOrEmpty())
            {
                XElement functionElement = XElement.Parse(btnWidgetFunctionMarkup.Value);
                if (functionElement.Name.Namespace != Namespaces.Function10)
                {
                    functionElement = functionElement.Elements().First();
                }

                field.FormRenderingProfile.WidgetFunctionMarkup = functionElement.ToString(SaveOptions.DisableFormatting);
            }
            else
            {
                field.FormRenderingProfile.WidgetFunctionMarkup = "";
            }

            if (!btnDefaultValueFunctionMarkup.Value.IsNullOrEmpty())
            {
                XElement functionElement = XElement.Parse(btnDefaultValueFunctionMarkup.Value);
                if (functionElement.Name.Namespace != Namespaces.Function10)
                    functionElement = functionElement.Elements().First();

                field.NewInstanceDefaultFieldValue = functionElement.ToString(SaveOptions.DisableFormatting);
            }
            else
            {
                field.NewInstanceDefaultFieldValue = null;
            }

            field.ValidationFunctionMarkup = null;

            if (field.IsNullable == false)
            {
                switch (this.CurrentlySelectedStoreFieldType.PhysicalStoreType)
                {
                    case PhysicalStoreFieldType.Integer:
                    case PhysicalStoreFieldType.Long:
                        field.DefaultValue = DefaultValue.Integer(0);
                        break;
                    case PhysicalStoreFieldType.Decimal:
                        field.DefaultValue = DefaultValue.Decimal(0);
                        break;
                    case PhysicalStoreFieldType.String:
                    case PhysicalStoreFieldType.LargeString:
                        field.DefaultValue = DefaultValue.String("");
                        break;
                    case PhysicalStoreFieldType.DateTime:
                        field.DefaultValue = DefaultValue.Now;
                        break;
                    case PhysicalStoreFieldType.Guid:
                        field.DefaultValue = DefaultValue.Guid(Guid.Empty);
                        break;
                    case PhysicalStoreFieldType.Boolean:
                        field.DefaultValue = DefaultValue.Boolean(false);
                        break;
                    default:
                        break;
                }
            }
            else
            {
                field.DefaultValue = null;
            }

            if (!btnValidationRulesFunctionMarkup.Value.IsNullOrEmpty())
            {
                field.ValidationFunctionMarkup =
                    (from element in XElement.Parse(btnValidationRulesFunctionMarkup.Value).Elements()
                     select element.ToString()).ToList();
            }

            int newPosition = int.Parse(this.PositionField.SelectedValue);
            if (newPosition == -1) newPosition = this.CurrentFields.Count - 1;

            if (field.Position != newPosition)
            {
                this.CurrentFields.Remove(field);

                foreach (DataFieldDescriptor laterField in this.CurrentFields.Where(f => f.Position > field.Position))
                {
                    laterField.Position--;
                }

                foreach (DataFieldDescriptor laterField in this.CurrentFields.Where(f => f.Position >= newPosition))
                {
                    laterField.Position++;
                }

                field.Position = newPosition;
                this.CurrentFields.Insert(newPosition, field);
            }

            int newGroupByPriority = int.Parse(this.GroupByPriorityField.SelectedValue);

            if (field.GroupByPriority != newGroupByPriority)
            {
                int assignGroupByPriority = 1;
                foreach (DataFieldDescriptor otherField in this.CurrentFields.Where(f => f.GroupByPriority > 0 && f.Id != field.Id).OrderBy(f => f.GroupByPriority))
                {
                    if (assignGroupByPriority == newGroupByPriority) assignGroupByPriority++;
                    otherField.GroupByPriority = assignGroupByPriority;
                    assignGroupByPriority++;
                }
            }
            field.GroupByPriority = newGroupByPriority;
            EnsureGroupByPrioritySequence();

            if (field.TreeOrderingProfile.ToString() != this.TreeOrderingField.SelectedValue)
            {
                field.TreeOrderingProfile = DataFieldTreeOrderingProfile.FromString(this.TreeOrderingField.SelectedValue);
                int assignTreeOrderPriority = 1;
                foreach (DataFieldDescriptor otherField in this.CurrentFields.Where(f => f.TreeOrderingProfile.OrderPriority > 0 && f.Id != field.Id).OrderBy(f => f.TreeOrderingProfile.OrderPriority))
                {
                    if (assignTreeOrderPriority == field.TreeOrderingProfile.OrderPriority) assignTreeOrderPriority++;
                    otherField.TreeOrderingProfile.OrderPriority = assignTreeOrderPriority;
                    assignTreeOrderPriority++;
                }
            }
            EnsureTreeOrderPrioritySequence();

        }


        private void EnsureGroupByPrioritySequence()
        {
            int assignGroupByPriority = 1;
            foreach (DataFieldDescriptor field in this.CurrentFields.Where(f => f.GroupByPriority > 0).OrderBy(f => f.GroupByPriority))
            {
                field.GroupByPriority = assignGroupByPriority;
                assignGroupByPriority++;
            }
        }


        private void EnsureTreeOrderPrioritySequence()
        {
            int assignTreeOrderPriority = 1;
            foreach (DataFieldDescriptor field in this.CurrentFields.Where(f => f.TreeOrderingProfile.OrderPriority > 0).OrderBy(f => f.TreeOrderingProfile.OrderPriority))
            {
                field.TreeOrderingProfile.OrderPriority = assignTreeOrderPriority;
                assignTreeOrderPriority++;
            }
        }


        protected void DeleteButton_Click(object sender, EventArgs e)
        {
            if (this.CurrentlySelectedFieldId != Guid.Empty)
            {
                var fields = (List<DataFieldDescriptor>)this.ViewState["Fields"];
                List<Guid> fieldIds = fields.Select(field => field.Id).ToList();
                int fieldIndex = fieldIds.IndexOf(this.CurrentlySelectedFieldId);

                Field_Delete(this.CurrentlySelectedFieldId);
                MakeClientDirty();

                if(fieldIndex < fieldIds.Count - 1 /* Not the last element */)
                {
                    Field_Select(fieldIds[fieldIndex + 1]); // Selecting the next element)
                }
            }
        }



        private void MakeClientDirty()
        {
            MakeDirtyEventPlaceHolder.Visible = true;
        }

        private bool FieldNameSyntaxValid(string name)
        {
            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(name.Trim()))
            {
                return false;
            }

            return true;
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="uiControlMarkup">The visual content of the form. All namespaces that controls and functions belong to must be declared.</param>
        /// <param name="bindingDeclarationMarkup">Bining declarations - a list of elements like &lt;binding name="..." type="..." optional="false" xmlns="http://www.composite.net/ns/management/bindingforms/1.0" /></param>
        /// <returns></returns>
        private FormDefinition BuildFormDefinition(XNode bindingsDeclarationMarkup, XNode uiControlMarkup, Dictionary<string, object> bindings)
        {
            XNamespace placeholderSpace = "#internal";
            XNamespace stdControlLibSpace = Namespaces.BindingFormsStdUiControls10;

            string formXml =
            #region XML for form
 @"<?xml version='1.0' encoding='utf-8' ?>
<cms:formdefinition
  xmlns:internal='" + placeholderSpace + @"'
  xmlns:cms='" + Namespaces.BindingForms10 + @"'>

  <internal:bindingsDeclarationPlaceholder />

  <cms:layout>
    <!--FieldGroup xmlns='" + stdControlLibSpace + @"'-->
      <internal:uiControlPlaceholder />
    <!--/FieldGroup-->
  </cms:layout>
  
</cms:formdefinition>";
            #endregion

            var formMarkup = XDocument.Parse(formXml);

            XElement bindingDeclarationPlaceholder = formMarkup.Descendants(placeholderSpace + "bindingsDeclarationPlaceholder").First();

            bindingDeclarationPlaceholder.ReplaceWith(bindingsDeclarationMarkup);

            XElement uiControlPlaceholder = formMarkup.Descendants(placeholderSpace + "uiControlPlaceholder").First();
            uiControlPlaceholder.ReplaceWith(uiControlMarkup);
            return new FormDefinition(formMarkup.CreateReader(), bindings);
        }

        protected void NameFieldChanged(object sender, EventArgs e)
        {
            bool refreshTree = false;
            if (this.CurrentlySelectedFieldId != Guid.Empty)
            {
                string existingName = this.CurrentFields.Where(f => f.Id == this.CurrentlySelectedFieldId).Single().Name;

                refreshTree = (existingName != this.NameField.Text);
            }

            FieldSettingsChanged(sender, e);

            if (refreshTree == true)
            {
                UpdateFieldsPanel();
            }
        }

        // one of the "post backing" fields has been changed on the client
        protected void FieldSettingsChanged(object sender, EventArgs e)
        {
            if (this.CurrentlySelectedFieldId != Guid.Empty)
            {
                if (ValidateSave() == true)
                {
                    Field_Save();
                }
            }
        }



        // Saving data to the form dictionary...
        protected override void BindStateToProperties()
        {
            if (this.CurrentlySelectedFieldId != Guid.Empty)
            {
                if (ValidateSave() == true)
                {
                    Field_Save();
                }
            }

            foreach (var field in this.CurrentFields)
            {
                if (string.IsNullOrEmpty(field.FormRenderingProfile.Label) == true)
                {
                    field.FormRenderingProfile.Label = field.Name;
                }
            }

            this.Fields = this.CurrentFields;
            this.LabelFieldName = this.CurrentLabelFieldName;
        }



        // First time we run - we are attached to a parent System.Web.Control 
        protected override void InitializeViewState()
        {
            List<DataFieldDescriptor> fields = new List<DataFieldDescriptor>();
            if (this.Fields != null) fields.AddRange(this.Fields);

            // ensure positioning is in place
            int position = 0;
            foreach (DataFieldDescriptor field in fields.OrderBy(f => f.Position))
            {
                field.Position = position++;
            }

            this.ViewState.Add("Fields", fields);
            this.ViewState.Add("editedPatameterId", null);

            this.CurrentLabelFieldName = this.LabelFieldName;

            UpdateFieldsPanel();
        }


        public override string GetDataFieldClientName()
        {
            return null;
        }


    }
}