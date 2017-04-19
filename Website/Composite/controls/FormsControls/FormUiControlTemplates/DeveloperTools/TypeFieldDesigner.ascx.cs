using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using Composite;
using Composite.Core;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Core.Extensions;
using Composite.Data.GeneratedTypes;
using Composite.Plugins.Elements.ElementProviders.Common;
using Composite.Plugins.Forms.WebChannel.UiControlFactories;
using Composite.Functions;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Core.ResourceSystem;
using Composite.Data.Validation;
using Composite.Core.WebClient.UiControlLib;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Web_FormControl_TypeFieldDesigner;

namespace CompositeTypeFieldDesigner
{

    public partial class TypeFieldDesigner : TypeFieldDesignerTemplateUserControlBase
    {
        private static readonly string LogTitle = typeof(TypeFieldDesigner).Name;

        private const string _defaultFieldNamePrefix = "NewField";
        private bool _nameChanged;
        private bool _dataUrlOrderUpdated;

        protected string GetString(string localPart)
        {
            return StringResourceSystemFacade.GetString("Composite.Web.FormControl.TypeFieldDesigner", localPart);
        }


        protected void Page_Load(object sender, EventArgs e)
        {
            if (!DetailsSplitPanelPlaceHolder.Visible && this.CurrentlySelectedFieldId != Guid.Empty)
            {
                InitializeDetailsSplitPanel();
            }

            if (!Page.IsPostBack)
            {
                DetailsSplitPanelPlaceHolder.Visible = false;
            }

            if (this.ViewState["Fields"] == null)
            {
                CurrentFields = new List<DataFieldDescriptor>();
            }
        }

        protected void Page_PreRender(object sender, EventArgs e)
        {
            if (IsPostBack && this.CurrentlySelectedFieldId != Guid.Empty)
            {
                string eventTarget = Request.Form["__EVENTTARGET"];

                // Refreshing
                if (eventTarget == "")
                {
                    if (ValidateSave())
                    {
                        Field_Save();
                        _nameChanged = true;
                    }
                }

                // Selecting "folder"
                if (eventTarget == "folder" && ValidateSave())
                {
                    Field_Save();
                    CurrentlySelectedFieldId = Guid.Empty;

                    DetailsSplitPanelPlaceHolder.Visible = false;
                }

                // TODO: fix the type reference!

                const string editFunctionUrl = "${root}/content/dialogs/functions/editFunctionCall.aspx";
                Func<Type, string> zipType = type => UrlUtils.ZipContent(TypeManager.SerializeType(type));

                btnWidgetFunctionMarkup.Attributes["label"] = CurrentlySelectedWidgetText;
                btnWidgetFunctionMarkup.Attributes["url"] = editFunctionUrl +"?functiontype=widget&zip_type="
                    + zipType(CurrentlySelectedWidgetReturnType)
                    + "&dialoglabel=" + HttpUtility.UrlEncode(Texts.WidgetDialogLabel, Encoding.UTF8) + "&multimode=false&functionmarkup=";

                btnValidationRulesFunctionMarkup.Attributes["label"] =
                    GetString(btnValidationRulesFunctionMarkup.Value.IsNullOrEmpty()
                                  ? "ValidationRulesAdd"
                                  : "ValidationRulesEdit");
                // TODO: some of the query parameters may not be used at the moment
                btnValidationRulesFunctionMarkup.Attributes["url"] = editFunctionUrl + "?zip_type="
                     + zipType(this.CurrentlySelectedTypeValidatorType)
                     + "&dialoglabel=" + HttpUtility.UrlEncode(Texts.ValidationRulesDialogLabel, Encoding.UTF8)
                     + "&multimode=true&addnewicon=Composite.Icons,validationrules-add&addnewicondisabled=Composite.Icons,validationrules-add-disabled"
                     + "&functionicon=Composite.Icons,validationrule&containericon=Composite.Icons,validationrules&functionmarkup=";

                btnDefaultValueFunctionMarkup.Attributes["label"] = CurrentlySelectedDefaultValueText;
                btnDefaultValueFunctionMarkup.Attributes["url"] =
                    editFunctionUrl + "?zip_type="
                    + zipType(this.CurrentlySelectedDefaultValueFunctionReturnType)
                    + "&dialoglabel=" + HttpUtility.UrlEncode(Texts.DefaultValueDialogLabel, Encoding.UTF8)
                    + "&multimode=false&functionmarkup=";

                if (eventTarget == chkShowInDataUrl.UniqueID)
                {
                    bool isChecked = chkShowInDataUrl.Checked;

                    SelectedField.DataUrlProfile = isChecked ? new DataUrlProfile() : null;
                }

                RepopulateDataUrlSegmentOrder(false);
                plhDataUrl.DataBind();
            }

            if (_nameChanged)
            {
                UpdateFieldsPanel();
            }

            plhDataUrl.Visible = CanAppearInDataRoute;
        }

        private void InitializeDetailsSplitPanel()
        {
            UpdateDetailsSplitPanel(true);

            if (SelectedFieldIsKeyField)
            {
                if (lstKeyType.Items.Count == 0)
                {
                    lstKeyType.Items.AddRange(KeyFieldHelper.GetKeyFieldOptions().Select(kvp => new ListItem(kvp.Value, kvp.Key)).ToArray());
                }

                var field = SelectedField;

                var keyType = KeyFieldHelper.GetKeyFieldType(field);
                Verify.That(keyType != GeneratedTypesHelper.KeyFieldType.Undefined, "Failed to parse key field type");

                lstKeyType.SelectedValue = keyType.ToString();

                txtKeyFieldName.Text = CurrentKeyFieldName;

                lstKeyType.IsDisabled = KeyFieldReadOnly;
                txtKeyFieldName.Enabled = !KeyFieldReadOnly;
            }
            else
            {
                UpdatePositionFieldOptions();
                UpdateGroupByPriorityFieldOptions();
                UpdateTreeOrderingFieldOptions();
                UpdateFieldTypeDetailsSelector();
            }

            InitDataUrlProperties();
            InitSearchProperties();

            DeleteButton.Enabled = !SelectedFieldIsKeyField;

            // Databinding placeholders so they can change visibility
            plhKeyFieldProperties.DataBind();
            plhFieldProperties.DataBind();
            plhDataUrl.DataBind();
            plhAdvancedFieldProperties.DataBind();
            plhSearch.DataBind();
        }


        private void UpdateDetailsSplitPanel(bool detailsSplitPanel)
        {
            DetailsSplitPanelPlaceHolder.Visible = detailsSplitPanel;
        }


        private void UpdatePositionFieldOptions()
        {
            var positionOptions = new Dictionary<int, string>();

            for (int i = 0; i < PositionableFieldsCount; i++)
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
            var groupByPriorityOptions = new Dictionary<int, string>
            {
                {0, GetString("GroupByPriorityNone")},
                {1, GetString("GroupByPriorityFirst")}
            };

            int existingGroupedFieldCount = this.CurrentFields.Count(f => f.GroupByPriority > 0);

            if (existingGroupedFieldCount > 0)
            {
                for (int i = 2; i <= existingGroupedFieldCount; i++)
                {
                    groupByPriorityOptions.Add(i, string.Format(GetString("GroupByPriorityN"), i));
                }

                if (!CurrentFields.Any(f => f.Id == this.CurrentlySelectedFieldId && f.GroupByPriority > 0))
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
            var treeOrderingFieldOptions = new Dictionary<DataFieldTreeOrderingProfile, string>
            {
                {
                    new DataFieldTreeOrderingProfile {OrderPriority = null}, 
                    GetString("TreeOrderingNone")
                },
                {
                    new DataFieldTreeOrderingProfile {OrderPriority = 1, OrderDescending = false},
                    GetString("TreeOrderingFirstAscending")
                },
                {
                    new DataFieldTreeOrderingProfile {OrderPriority = 1, OrderDescending = true},
                    GetString("TreeOrderingFirstDescending")
                }
            };

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

                if (!CurrentFields.Any(f => f.Id == CurrentlySelectedFieldId && f.TreeOrderingProfile.OrderPriority > 0))
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

                    TypeDetailsSelector.AutoPostBack = true;
                    TypeDetailsSelector.Items.AddRange(new []
                    {
                        new ListItem(Texts._16CharMax, "16"),
                        new ListItem(Texts._32CharMax, "32"),
                        new ListItem(Texts._64CharMax, "64"),
                        new ListItem(Texts._128CharMax, "128"),
                        new ListItem(Texts._256CharMax, "256"),
                        new ListItem(Texts._512CharMax, "512"),
                        new ListItem(Texts._1024CharMax, "1024"),
                        new ListItem(Texts.Unlimited, "max")
                    });
                    
                    TypeDetailsSelector.SelectedValue = "64";
                    break;
                case "System.Decimal":
                    TypeDetailsLabel.Text = Texts.DecimalNumberFormat;
                    TypeDetailsSelector.AutoPostBack = false; // this is a fix to plug bug in update manager (client)
                    TypeDetailsSelector.Items.Add(new ListItem(Texts._1DecimalPlace, "1"));
                    for (int i = 1; i < 16; i++)
                    {
                        TypeDetailsSelector.Items.Add(new ListItem(Texts.nDecimalPlaces(i), i.ToString()));
                    }
                    TypeDetailsSelector.SelectedValue = "2";
                    break;
                case "Reference":
                    TypeDetailsLabel.Text = Texts.ReferenceType;
                    TypeDetailsSelector.AutoPostBack = true;

                    var typeList =
                            from dataType in DataFacade.GetAllKnownInterfaces(UserType.Developer)
                            where !dataType.IsNotReferenceable()
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

        private void InitDataUrlProperties()
        {
            var field = SelectedField;

            if (field == null)
            {
                return;
            }

            chkShowInDataUrl.Checked = field.DataUrlProfile != null;

            RepopulateDataUrlSegmentOrder(true);

            if (lstDataUrlDateFormat.Items.Count == 0)
            {
                Func<string, string> format = s => string.Format(s, 
                    Texts.DataUrlDateFormat_Year, Texts.DataUrlDateFormat_Month, Texts.DataUrlDateFormat_Day);

                lstDataUrlDateFormat.Items.AddRange(new[]
                {
                    new ListItem(format("/{0}"), DataUrlSegmentFormat.DateTime_Year.ToString()),
                    new ListItem(format("/{0}/{1}"), DataUrlSegmentFormat.DateTime_YearMonth.ToString()),
                    new ListItem(format("/{0}/{1}/{2}"), DataUrlSegmentFormat.DateTime_YearMonthDay.ToString())
                });
            }

            var selectedValue = field.DataUrlProfile != null && field.DataUrlProfile.Format != null
                                ?  field.DataUrlProfile.Format.Value
                                : DataUrlSegmentFormat.DateTime_YearMonthDay;

            lstDataUrlDateFormat.SelectedValue = selectedValue.ToString();
        }


        private void RepopulateDataUrlSegmentOrder(bool updateSelection)
        {
            var field = SelectedField;

            if (_dataUrlOrderUpdated || field == null)
            {
                return;
            }

            int existingSelection = lstDataUrlOrder.SelectedIndex;

            var otherUrlSegments = CurrentFields
                .Where(f => f.DataUrlProfile != null && f.Id != field.Id)
                .OrderBy(f => f.DataUrlProfile.Order)
                .ToList();

            lstDataUrlOrder.Items.Clear();
            // Populating the selector
            for (int i = 0; i <= otherUrlSegments.Count; i++)
            {
                var fieldsInUrlPreviewOrder =
                    otherUrlSegments.Take(i)
                    .Concat(new[] { field })
                    .Concat(otherUrlSegments.Skip(i));

                var previewStr = string.Join("/", fieldsInUrlPreviewOrder.Select(GetUrlSegmentPreview));

                lstDataUrlOrder.Items.Add(new ListItem(previewStr, i.ToString()));
            }

            if (updateSelection)
            {
                int selectedIndex = otherUrlSegments.Count;

                if (field.DataUrlProfile != null && field.DataUrlProfile.Order <= otherUrlSegments.Count)
                {
                    selectedIndex = field.DataUrlProfile.Order;
                }

                lstDataUrlOrder.SelectedIndex = selectedIndex;
            }
            else
            {
                lstDataUrlOrder.SelectedIndex = existingSelection;
            }

            _dataUrlOrderUpdated = true;
        }



        private void InitSearchProperties()
        {
            var field = SelectedField;

            if (field == null) return;

            bool fieldIsSearchable = IsSearchable && !SelectedFieldIsKeyField;

            Type fieldType = field.InstanceType;
            bool isDataReference = !string.IsNullOrEmpty(field.ForeignKeyReferenceTypeName);

            bool indexTextEnabled = fieldIsSearchable
                && !isDataReference 
                && (fieldType == typeof(string));

            bool searchPreviewEnabled = fieldIsSearchable
                && !isDataReference
                && (fieldType == typeof(string)
                || fieldType == typeof(DateTime)
                || fieldType == typeof(DateTime?)
                || fieldType == typeof(decimal)
                || fieldType == typeof(decimal?)
                || fieldType == typeof(int)
                || fieldType == typeof(int?)
                || fieldType == typeof(bool));

            bool facetedSearchEnabled = fieldIsSearchable
                && !isDataReference
                && (fieldType == typeof(string)
                || fieldType == typeof(DateTime)
                || fieldType == typeof(DateTime?)
                || fieldType == typeof(bool));

            plhSearch.Visible = indexTextEnabled || searchPreviewEnabled || facetedSearchEnabled;

            plhSearch_IndexText.Visible = indexTextEnabled;
            plhSearch_FieldPreview.Visible = searchPreviewEnabled;
            plhSearch_FacetedSearch.Visible = facetedSearchEnabled;

            chkIndexText.Checked = indexTextEnabled && field.SearchProfile != null && field.SearchProfile.IndexText;
            chkSearchPreview.Checked = searchPreviewEnabled && field.SearchProfile != null && field.SearchProfile.EnablePreview;
            chkFacetField.Checked = facetedSearchEnabled && field.SearchProfile != null && field.SearchProfile.IsFacet;
        }



        private string GetUrlSegmentPreview(DataFieldDescriptor field)
        {
            string formatString = "";

            //if (field.InstanceType == typeof (DateTime))
            //{
            //    string year = Texts.DataUrlDateFormat_Year;
            //    string month = Texts.DataUrlDateFormat_Month;
            //    string day = Texts.DataUrlDateFormat_Day;

            //    var format = DataUrlSegmentFormat.DateTime_YearMonthDay;
            //    if (field.DataUrlProfile != null && field.DataUrlProfile.Format != null)
            //    {
            //        format = field.DataUrlProfile.Format.Value;
            //    }

            //    switch (format)
            //    {
            //        case DataUrlSegmentFormat.DateTime_Year:
            //            formatString = ":" + year;
            //            break;
            //        case DataUrlSegmentFormat.DateTime_YearMonth:
            //            formatString = ":" + year + "," + month;
            //            break;
            //        case DataUrlSegmentFormat.DateTime_YearMonthDay:
            //            formatString = ":" + year + "," + month + "," + day;
            //            break;
            //    }
            //}

            return "{" + field.Name + formatString + "}";
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
            if (this.TypeSelector.SelectedValue == "XHTML")
            {
                var functionParameters = new Dictionary<string,object>
                {
                    {"Constant", new XhtmlDocument()}
                };
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
                {
                    functionElement = functionElement.Elements().First();
                }
                    
                var functionNode = (BaseFunctionRuntimeTreeNode) FunctionFacade.BuildTree(functionElement);


                IFunction function = FunctionFacade.GetFunction(functionNode.GetCompositeName());

                if (function.ReturnType != this.CurrentlySelectedDefaultValueFunctionReturnType)
                {
                    btnDefaultValueFunctionMarkup.Value = "";
                }
            }
            catch (Exception ex)
            {
                Log.LogError(LogTitle, "Default value settings reset. Existing function markup failed to validate with the following message: '{0}'", ex.Message);
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

            var fields = CurrentFields;

            DataFieldDescriptor selectedField = fields.Single(f => f.Id == this.CurrentlySelectedFieldId);
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
                bool notOptional = this.CurrentlySelectedType == typeof(bool) || this.TypeSelector.SelectedValue == "XHTML";

                if (notOptional)
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
            var repeaterEventArgs = (RepeaterCommandEventArgs)e;
            Guid fieldId = new Guid(repeaterEventArgs.CommandArgument.ToString());

            if (ValidateSave())
            {
                switch (repeaterEventArgs.CommandName)
                {
                    case "Select":
                        Field_Select(fieldId);
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


        private void Field_Delete(Guid fieldId)
        {
            var field = CurrentFields.Single(f => f.Id == fieldId);

            if (CurrentLabelFieldName == field.Name)
            {
                CurrentLabelFieldName = "";
            }

            CurrentFields.RemoveAll(f => f.Id == fieldId);

            if (CurrentlySelectedFieldId == fieldId)
            {
                CurrentlySelectedFieldId = Guid.Empty;
            }

            foreach (DataFieldDescriptor laterField in this.CurrentFields.Where(f => f.Position > field.Position))
            {
                laterField.Position--;
            }

            EnsureGroupByPrioritySequence();
            EnsureTreeOrderPrioritySequence();

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



        private void Field_Select(Guid fieldId)
        {
            if (this.CurrentlySelectedFieldId != Guid.Empty)
            {
                if (!ValidateSave())
                {
                    return;
                }

                Field_Save();
            }

            this.CurrentlySelectedFieldId = fieldId;
            var selectedField = SelectedField;

            InitializeDetailsSplitPanel();

            this.NameField.Text = selectedField.Name;

            if (!SelectedFieldIsKeyField)
            {
                this.IsTitleFieldDateTimeSelector.Checked = (this.CurrentLabelFieldName == selectedField.Name);

                this.LabelField.Text = selectedField.FormRenderingProfile.Label;
                this.HelpField.Text = selectedField.FormRenderingProfile.HelpText;
                btnWidgetFunctionMarkup.Value = selectedField.FormRenderingProfile.WidgetFunctionMarkup;
                btnDefaultValueFunctionMarkup.Value = selectedField.NewInstanceDefaultFieldValue;

                if (string.IsNullOrEmpty(selectedField.ForeignKeyReferenceTypeName))
                {
                    if (selectedField.InstanceType.IsGenericType
                        && selectedField.InstanceType.GetGenericTypeDefinition() == typeof(Nullable<>))
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
                if (selectedField.InstanceType == typeof(string) && selectedField.StoreType.IsLargeString 
                    && !string.IsNullOrEmpty(selectedField.FormRenderingProfile.WidgetFunctionMarkup))
                {
                    var visualEditorWidgetName = StandardWidgetFunctions.VisualXhtmlDocumentEditorWidget.WidgetFunctionCompositeName;
                    var widgetFunction = XElement.Parse(selectedField.FormRenderingProfile.WidgetFunctionMarkup);
                    if ((string)widgetFunction.Attribute("name") == visualEditorWidgetName)
                    {
                        this.TypeSelector.SelectedValue = "XHTML";
                    }
                }

                this.OptionalSelector.SelectedValue = selectedField.IsNullable ? "true" : "false";

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

                if (!string.IsNullOrEmpty(selectedField.ForeignKeyReferenceTypeName))
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

                this.PositionField.SelectedValue = (selectedField.Position == PositionableFieldsCount - 1 ? "-1" : selectedField.Position.ToString());

                UpdateGroupByPriorityFieldOptions();
                UpdateTreeOrderingFieldOptions();
                this.GroupByPriorityField.SelectedValue = selectedField.GroupByPriority.ToString();
                this.TreeOrderingField.SelectedValue = selectedField.TreeOrderingProfile.ToString();
            }
        }



        
        private string CurrentKeyFieldName
        {
            get
            {
                return (string)this.ViewState["CurrentKeyFieldName"] ?? "";
            }
            set
            {
                this.ViewState["CurrentKeyFieldName"] = value;
            }
        }



        private string CurrentLabelFieldName
        {
            get
            {
                return (string)this.ViewState["LabelFieldName"] ?? "";
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
                object editorFieldId = this.ViewState["editedFieldId"];
                return (Guid?) editorFieldId ?? Guid.Empty;
            }
            set
            {
                this.ViewState["editedFieldId"] = value;
            }
        }



        protected bool HasFields
        {
            get { return this.CurrentFields.Count > 0; }
        }

        protected bool CanAppearInDataRoute
        {
            get
            {
                var field = SelectedField;
                if (field == null || field.IsNullable) return false;

                if (TypeSelector.SelectedValue == "Reference")
                {
                    return true;
                }

                var instanceType = field.InstanceType;
                
                if (instanceType == typeof (string))
                {
                    var selectedValue = TypeDetailsSelector.SelectedValue;

                    return selectedValue != "max" && selectedValue != "" && int.Parse(selectedValue) <= 128;
                }

                return instanceType == typeof (Guid)
                        || instanceType == typeof (Int16)
                        || instanceType == typeof (Int32)
                        || instanceType == typeof (Int64)
                        || instanceType == typeof (decimal)
                        || instanceType == typeof (DateTime);
            }
        }


        protected bool SelectedFieldIsKeyField
        {
            get
            {
                Guid fieldId = CurrentlySelectedFieldId;
                return fieldId != Guid.Empty && CurrentFields.Any(f => f.Id == fieldId && f.Name == CurrentKeyFieldName);
            }
        }


        protected DataFieldDescriptor SelectedField
        {
            get
            {
                Guid fieldId = CurrentlySelectedFieldId;
                return CurrentFields.FirstOrDefault(f => f.Id == fieldId);
            }
        }


        protected int PositionableFieldsCount
        {
            get { return this.CurrentFields.Count(f => f.Name != CurrentKeyFieldName); }
        }


        private List<DataFieldDescriptor> CurrentFields
        {
            get
            {
                var value = this.ViewState["Fields"];
                Verify.IsNotNull(value, "ViewState element 'Fields' does not exist");
                return (List<DataFieldDescriptor>) value;
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
            var keyProperties = DataAttributeFacade.GetKeyProperties(referencedType);

            if (keyProperties.Count == 1)
            {
                return keyProperties[0].PropertyType;
            }
            
            // with multi key types we go with a string
            return typeof(string);
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

                    selectedType = typeof(DataReference<>).MakeGenericType(new[]{ referencedType });
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
                        Log.LogError(LogTitle, "Widget settings reset. Existing widget failed to validate with the following message: '{0}'", ex.Message);
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
                        var widgetNode = (BaseFunctionRuntimeTreeNode)FunctionFacade.BuildTree(functionElement);
                        return widgetNode.GetName();
                    }
                    catch (Exception ex)
                    {
                        Log.LogError(LogTitle, "Widget settings reset. Existing widget failed to validate with the following message: '{0}'", ex.Message);
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
                Type selectedType;
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

                    if (selectedType == typeof(Guid)) return typeof(Guid?);
                    if (selectedType == typeof(int)) return typeof(int?);
                    if (selectedType == typeof(decimal)) return typeof(decimal?);
                    if (selectedType == typeof(DateTime)) return typeof(DateTime?);

                    if (selectedType == typeof(bool)) throw new InvalidOperationException("bool can not be nullable");

                    throw new InvalidOperationException("an unhandled nullable type");
                }

                return selectedType;
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
                        var keyProperties = referencedType.GetKeyProperties();

                        if (keyProperties.Count == 1)
                        {
                            object[] storeFieldTypeAttributes = keyProperties[0].GetCustomAttributes(typeof(StoreFieldTypeAttribute), true);
                            if (storeFieldTypeAttributes.Length == 1)
                            {
                                return ((StoreFieldTypeAttribute)storeFieldTypeAttributes[0]).StoreFieldType;
                            }
                            
                            throw new InvalidOperationException("Referenced types key field is missing an StoreFieldType attribute.");
                            
                        }
                        
                        // with multi key types we go with a string
                        return StoreFieldType.LargeString;
                    default:
                        throw new InvalidOperationException("can not locate store type - unmapped type");
                }
            }
        }


        protected void AddNewButton_Click(object sender, EventArgs e)
        {
            if (this.CurrentlySelectedFieldId != Guid.Empty)
            {
                if (!ValidateSave())
                {
                    return;
                }

                Field_Save();

                CurrentlySelectedFieldId = Guid.Empty;
            }

            string newFieldName = _defaultFieldNamePrefix;

            int i = 2;
            while (this.CurrentFields.Any(f => f.Name == newFieldName))
            {
                newFieldName = _defaultFieldNamePrefix + i++;
            }

            var stringSelectorWidgetFunctionMarkup =
                StandardWidgetFunctions.GetDefaultWidgetFunctionProviderByType(typeof (string))
                    .SerializedWidgetFunction.ToString(SaveOptions.DisableFormatting);

            Guid newFieldId = Guid.NewGuid();
            this.CurrentFields.Add(new DataFieldDescriptor(newFieldId, newFieldName, StoreFieldType.String(64), typeof(string))
            {
                Position = PositionableFieldsCount,
                FormRenderingProfile = new DataFieldFormRenderingProfile
                {
                    WidgetFunctionMarkup = stringSelectorWidgetFunctionMarkup
                }
            });

            if (string.IsNullOrEmpty(this.CurrentLabelFieldName))
            {
                this.CurrentLabelFieldName = newFieldName;
            }


            Field_Select(newFieldId);
            
            UpdateFieldsPanel();
            MakeClientDirty();
        }



        private bool ValidateSave()
        {
            if (this.CurrentlySelectedFieldId == Guid.Empty) return true;

            var nameField = SelectedFieldIsKeyField ? this.txtKeyFieldName : this.NameField;

            if (nameField.Text.Contains(" "))
            {
                Baloon(nameField, Texts.SpaceInNameError);
                return false;
            }

            if (string.IsNullOrEmpty(this.NameField.Text))
            {
                Baloon(nameField, Texts.NameEmptyError);
                return false;
            }

            if (this.CurrentFields.Any(f => f.Name == this.NameField.Text && f.Id != this.CurrentlySelectedFieldId))
            {
                Baloon(nameField, Texts.NameAlreadyInUseError);
                return false;
            }

            string err;
            if (!NameValidation.TryValidateName(nameField.Text, out err))
            {
                Baloon(nameField, err);
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
            var fm = new FieldMessage(fieldName, message);

            BaloonPlaceHolder.Controls.Add(fm);
        }

        private void UpdateFieldsPanel()
        {
            this.FieldListRepeater.DataSource = CurrentFields;
            this.FieldListRepeater.DataBind();
        }

        private void Field_Save()
        {
            var field = this.CurrentFields.Single(f => f.Id == this.CurrentlySelectedFieldId);


            if (SelectedFieldIsKeyField)
            {
                Field_Save_UpdateDataUrl(field, true);

                if (KeyFieldReadOnly)
                {
                    return;
                }

                if (!Field_Save_UpdateName(field, this.txtKeyFieldName))
                {
                    return;
                }

                var currentFieldType = KeyFieldHelper.GetKeyFieldType(field);

                GeneratedTypesHelper.KeyFieldType selectedFieldType;

                bool parsedOk = Enum.TryParse(lstKeyType.SelectedValue, out selectedFieldType);
                Verify.That(parsedOk, "Failed to parse key field type");

                if (currentFieldType != selectedFieldType)
                {
                    KeyFieldHelper.UpdateKeyType(field, selectedFieldType);
                }

                return;
            }


            if (!Field_Save_UpdateName(field, this.NameField))
            {
                return;
            }

            field.InstanceType = this.CurrentlySelectedType;
            field.ForeignKeyReferenceTypeName = this.CurrentForeignKeyReferenceTypeName;

            field.StoreType = this.CurrentlySelectedStoreFieldType;

            if (this.IsTitleFieldDateTimeSelector.Checked)
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

            bool generateLabel = this.LabelField.Text == "" && !this.NameField.Text.StartsWith(_defaultFieldNamePrefix);
            string label = generateLabel ? this.NameField.Text : this.LabelField.Text;

            field.IsNullable = bool.Parse(this.OptionalSelector.SelectedValue);

            field.FormRenderingProfile.Label = label;
            field.FormRenderingProfile.HelpText = this.HelpField.Text;

            if (!btnWidgetFunctionMarkup.Value.IsNullOrEmpty())
            {
                var functionElement = XElement.Parse(btnWidgetFunctionMarkup.Value);
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
                var functionElement = XElement.Parse(btnDefaultValueFunctionMarkup.Value);

                if (functionElement.Name.Namespace != Namespaces.Function10)
                    functionElement = functionElement.Elements().First();

                field.NewInstanceDefaultFieldValue = functionElement.ToString(SaveOptions.DisableFormatting);
            }
            else
            {
                field.NewInstanceDefaultFieldValue = null;
            }

            field.ValidationFunctionMarkup = null;

            if (!field.IsNullable)
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

            Field_Save_UpdatePosition(field);

            Field_Save_UpdateGroupByPriority(field);

            Field_Save_UpdateTreeOrderingProfile(field);

            Field_Save_UpdateDataUrl(field, CanAppearInDataRoute);

            Field_Save_SearchProfile(field);
        }

        private bool Field_Save_UpdateName(DataFieldDescriptor field, DataInput nameInput)
        {
            string newName = nameInput.Text;
            if (!FieldNameSyntaxValid(newName))
            {
                Baloon(nameInput, Texts.FieldNameSyntaxInvalid);
                return false;
            }

            if (this.CurrentFields.Any(f => String.Equals(f.Name, newName, StringComparison.InvariantCultureIgnoreCase)
                                              && f.Id != field.Id))
            {
                Baloon(nameInput.ClientID, Texts.CannotSave);
                return false;
            }

            if (field.Name != newName)
            {
                _nameChanged = true;
            }

            if (field.Name == CurrentKeyFieldName)
            {
                CurrentKeyFieldName = newName;
            }

            field.Name = newName;
            return true;
        }


        private void Field_Save_UpdatePosition(DataFieldDescriptor field)
        {
            var visibleFields = CurrentFields.Where(f => f.Name != CurrentKeyFieldName).ToList();
            int idFieldsCount = CurrentFields.Count(f => f.Name == CurrentKeyFieldName);

            int newPosition = int.Parse(this.PositionField.SelectedValue);
            if (newPosition == -1) newPosition = visibleFields.Count - 1;

            if (field.Position != newPosition)
            {
                this.CurrentFields.Remove(field);

                foreach (DataFieldDescriptor laterField in visibleFields.Where(f => f.Position > field.Position))
                {
                    laterField.Position--;
                }

                foreach (DataFieldDescriptor laterField in visibleFields.Where(f => f.Position >= newPosition))
                {
                    laterField.Position++;
                }

                field.Position = newPosition;
                this.CurrentFields.Insert(newPosition + idFieldsCount, field);
            }
        }


        private void Field_Save_UpdateGroupByPriority(DataFieldDescriptor field)
        {
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
        }


        private void Field_Save_UpdateTreeOrderingProfile(DataFieldDescriptor field)
        {
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

        private void Field_Save_UpdateDataUrl(DataFieldDescriptor field, bool dataUrlApplicable)
        {
            bool enabled = chkShowInDataUrl.Checked;
            if (!dataUrlApplicable || !enabled)
            {
                field.DataUrlProfile = null;
                return;
            }

            int order = lstDataUrlOrder.SelectedIndex;

            DataUrlSegmentFormat? format = null;

            if (field.InstanceType == typeof (DateTime))
            {
                string selectedValue = lstDataUrlDateFormat.SelectedValue;
                if (!string.IsNullOrEmpty(selectedValue))
                {
                    format = (DataUrlSegmentFormat)Enum.Parse(typeof(DataUrlSegmentFormat), selectedValue);
                }
            }

            field.DataUrlProfile = new DataUrlProfile { Order = order, Format = format };

            // Updating order of theother fields
            var otherUrlSegments = CurrentFields
                .Where(f => f.DataUrlProfile != null && f.Id != field.Id)
                .OrderBy(f => f.DataUrlProfile.Order)
                .ToList();

            int index = 0;

            foreach (var urlSegment in otherUrlSegments)
            {
                if (index == order) index++;

                urlSegment.DataUrlProfile.Order = index++;
            }
        }


        private void Field_Save_SearchProfile(DataFieldDescriptor field)
        {
            bool indexText = chkIndexText.Checked;
            bool searchPreview = chkSearchPreview.Checked;
            bool facet = chkFacetField.Checked;

            SearchProfile profile = null;
            if (indexText || searchPreview || facet)
            {
                profile = new SearchProfile
                {
                    IndexText = indexText,
                    EnablePreview = searchPreview,
                    IsFacet = facet
                };
            }

            field.SearchProfile = profile;
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
            if (this.CurrentlySelectedFieldId == Guid.Empty)
            {
                return;
            }

            List<Guid> fieldIds = CurrentFields.Select(field => field.Id).ToList();
            int fieldIndex = fieldIds.IndexOf(this.CurrentlySelectedFieldId);

            Field_Delete(this.CurrentlySelectedFieldId);
            MakeClientDirty();

            if(fieldIndex < fieldIds.Count - 1 /* Not the last element */)
            {
                Field_Select(fieldIds[fieldIndex + 1]); // Selecting the next element)
            }
        }



        private void MakeClientDirty()
        {
            MakeDirtyEventPlaceHolder.Visible = true;
        }

        private bool FieldNameSyntaxValid(string name)
        {
            return !string.IsNullOrWhiteSpace(name);
        }


        protected void NameFieldChanged(object sender, EventArgs e)
        {
            bool refreshTree = false;
            if (this.CurrentlySelectedFieldId != Guid.Empty)
            {
                string existingName = this.CurrentFields.Single(f => f.Id == this.CurrentlySelectedFieldId).Name;

                refreshTree = (existingName != this.NameField.Text);
            }

            FieldSettingsChanged(sender, e);

            if (refreshTree)
            {
                UpdateFieldsPanel();
            }
        }


        // one of the "post backing" fields has been changed on the client
        protected void FieldSettingsChanged(object sender, EventArgs e)
        {
            if (this.CurrentlySelectedFieldId != Guid.Empty)
            {
                if (ValidateSave())
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
                if (ValidateSave())
                {
                    Field_Save();
                }
            }

            foreach (var field in this.CurrentFields)
            {
                if (string.IsNullOrEmpty(field.FormRenderingProfile.Label))
                {
                    field.FormRenderingProfile.Label = field.Name;
                }
            }

            this.Fields = this.CurrentFields;
            this.KeyFieldName = this.CurrentKeyFieldName;
            this.LabelFieldName = this.CurrentLabelFieldName;
        }



        // First time we run - we are attached to a parent System.Web.Control 
        protected override void InitializeViewState()
        {
            var fields = new List<DataFieldDescriptor>();
            if (this.Fields != null) fields.AddRange(this.Fields);

            // ensure positioning is in place
            int position = 0;
            foreach (DataFieldDescriptor field in fields.Where(f => f.Name != KeyFieldName).OrderBy(f => f.Position))
            {
                field.Position = position++;
            }

            CurrentFields = fields;
            CurrentKeyFieldName = KeyFieldName;
            CurrentLabelFieldName = LabelFieldName;

            UpdateFieldsPanel();
        }


        public override string GetDataFieldClientName()
        {
            return null;
        }

        protected string GetTreeIcon(DataFieldDescriptor dataItem)
        {
            return "${icon:" + (dataItem.Name == CurrentKeyFieldName ? "key" : "parameter") + "}";
        }
    }
}