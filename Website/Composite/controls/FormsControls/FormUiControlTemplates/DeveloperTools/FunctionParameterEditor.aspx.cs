using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using Composite.Core;
using Composite.Data.DynamicTypes;
using Composite.Functions;
using Composite.Functions.ManagedParameters;
using Composite.Core.Types;
using Composite.Core.WebClient;
using Composite.Core.WebClient.FunctionCallEditor;
using Composite.Core.WebClient.State;
using Composite.Core.Xml;
using Composite.Core.ResourceSystem;
using Composite.Core.WebClient.UiControlLib;
using Composite.Core.Extensions;


namespace Composite.controls.FormsControls.FormUiControlTemplates.DeveloperTools
{

    public partial class FunctionParameterEditor : XhtmlPage
    {
        private static readonly string SessionStateProviderQueryKey = "StateProvider";
        private static readonly string StateIdQueryKey = "Handle";

        private const string _defaultFieldNamePrefix = "NewField";
        private bool nameChanged;


        private List<ManagedParameterDefinition> Parameters { get; set; }
        private List<Type> TypeOptions { get; set; }

        private IParameterEditorState _state;

        private Guid? _stateId;
        private Guid StateId
        {
            get
            {
                if (_stateId == null)
                {
                    string stateIdStr = Request.QueryString[StateIdQueryKey];

                    Guid stateId;
                    if (!SessionStateProviderName.IsNullOrEmpty()
                        && !stateIdStr.IsNullOrEmpty()
                        && Guid.TryParse(stateIdStr, out stateId))
                    {
                        _stateId = stateId;
                    }
                    else
                    {
                        _stateId = Guid.Empty;
                    }
                }

                return _stateId.Value;
            }
        }


        private string SessionStateProviderName
        {
            get
            {
                return Request.QueryString[SessionStateProviderQueryKey];
            }
        }

        protected string GetString(string localPart)
        {
            return StringResourceSystemFacade.GetString("Composite.Web.FormControl.FunctionParameterDesigner", localPart);
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            LoadData();

            if (!IsPostBack)
            {
                InitializeViewState();
            }

            if (!DetailsSplitPanelPlaceHolder.Visible && this.CurrentlySelectedFieldId != Guid.Empty)
            {
                InitializeDetailsSplitPanel();
            }

            if (!Page.IsPostBack)
            {
                DetailsSplitPanelPlaceHolder.Visible = false;
                UpdateTypeList();
            }

            if (this.ViewState["Fields"] == null)
            {
                CurrentFields = new List<ManagedParameterDefinition>();
            }

            if (Page.IsPostBack
                && this.Request.Form["__EVENTTARGET"] == string.Empty
                && CurrentlySelectedFieldId != Guid.Empty
                && ValidateSave())
            {
                Field_Save();
            }
        }

        public void OnMessage()
        {
            string message = ctlFeedback.GetPostedMessage();

            if(message == "save" || message == "persist" )
            {
                bool success = ValidateSave();
                ctlFeedback.SetStatus(success);

                if(success)
                {
                    Field_Save();
                }
            }
        }

        private void LoadData()
        {
            var provider = SessionStateManager.GetProvider(SessionStateProviderName);

            Verify.IsTrue(provider.TryGetState(StateId, out _state), "Failed to get session state");

            var parameters = _state.Parameters;
            var typeOptions = _state.ParameterTypeOptions; 

            Verify.IsNotNull(parameters, "Failed to get 'Parameters' binding from related workflow");
            Verify.IsNotNull(typeOptions, "Failed to get 'ParameterTypeOptions' binding from related workflow");

            Parameters = new List<ManagedParameterDefinition>(parameters);
            TypeOptions = new List<Type>(typeOptions);
        }

        protected void Page_PreRender(object sender, EventArgs e)
        {
            if(CurrentlySelectedFieldId != Guid.Empty)
            {
                var defaultFunction = StandardFunctions.GetDefaultFunctionByType(this.CurrentlySelectedType);

                btnDefaultValueFunctionMarkup.Attributes["label"] = GetString(btnDefaultValueFunctionMarkup.Value.IsNullOrEmpty() ? "DefaultValueSpecify" : "DefaultValueEdit");
                btnDefaultValueFunctionMarkup.Attributes["url"] =
                    "${root}/content/dialogs/functions/editFunctionCall.aspx?type=" + this.CurrentlySelectedType.FullName +
                    "&dialoglabel=" + HttpUtility.UrlEncode(GetString("DefaultValueDialogLabel"), Encoding.UTF8) + "&multimode=false&functionmarkup=";


                btnTestValueFunctionMarkup.Attributes["label"] = GetString(btnTestValueFunctionMarkup.Value.IsNullOrEmpty() ? "TestValueSpecify" : "TestValueEdit");
                btnTestValueFunctionMarkup.Attributes["url"] =
                    "${root}/content/dialogs/functions/editFunctionCall.aspx?type=" + this.CurrentlySelectedType.FullName +
                    "&dialoglabel=" + HttpUtility.UrlEncode(GetString("TestValueDialogLabel"), Encoding.UTF8) + "&multimode=false&functionmarkup=";

                btnWidgetFunctionMarkup.Attributes["label"] = CurrentlySelectedWidgetText;
                btnWidgetFunctionMarkup.Attributes["url"] =
                    "${root}/content/dialogs/functions/editFunctionCall.aspx?functiontype=widget&type=" + this.CurrentlySelectedWidgetReturnType.FullName +
                    "&dialoglabel=" + HttpUtility.UrlEncode(GetString("WidgetDialogLabel"), Encoding.UTF8) + "&multimode=false&functionmarkup=";

                if (defaultFunction != null)
                {
                    string defaultValue = new FunctionRuntimeTreeNode(defaultFunction).Serialize().ToString();

                    btnDefaultValueFunctionMarkup.DefaultValue = defaultValue;
                    btnTestValueFunctionMarkup.DefaultValue = defaultValue;
                }
            }

            btnDelete.Attributes["isdisabled"] = CurrentlySelectedFieldId == Guid.Empty ? "true" : "false";

            if (nameChanged)
            {
                UpdateFieldsPanel();
            }

            _state.Parameters = this.CurrentFields.ToList();
            SessionStateManager.GetProvider(SessionStateProviderName).SetState(StateId, _state, DateTime.Now.AddDays(7.0));
        }


        private void InitializeDetailsSplitPanel()
        {
            UpdateDetailsSplitPanel(true);
            UpdatePositionFieldOptions();
        }


        private void UpdateDetailsSplitPanel(bool detailsSplitPanel )
        {
            DetailsSplitPanelPlaceHolder.Visible = detailsSplitPanel;
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
                if (FunctionFacade.GetWidgetFunctionNamesByType(this.CurrentlySelectedWidgetReturnType).Any())
                {
                    Baloon(btnWidgetFunctionMarkup.ClientID, GetString("SpecifyWidgetTip"));
                }
            }
        }



        protected void PositionField_SelectedIndexChanged(object sender, EventArgs e)
        {
            FieldSettingsChanged(sender, e);
            UpdateFieldsPanel();
        }



        protected void TypeSelector_SelectedIndexChanged(object sender, EventArgs e)
        {
            FieldSettingsChanged(sender, e);

            ResetWidgetSelector();
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
            var fields = CurrentFields;

            var field = fields.Single(f => f.Id == fieldId);

            fields.RemoveAll(f => f.Id == fieldId);

            if (CurrentlySelectedFieldId == fieldId)
            {
                CurrentlySelectedFieldId = Guid.Empty;
            }

            foreach (ManagedParameterDefinition laterField in this.CurrentFields.Where(f => f.Position > field.Position))
            {
                laterField.Position--;
            }


            UpdatePositionFieldOptions();

            this.PositionField.SelectedValue = "-1";
            this.NameField.Text = "";

            UpdateFieldsPanel();

            UpdateDetailsSplitPanel(false);
        }



        private void UpdateTypeList()
        {
            var typeList = 
                from type in this.TypeOptions
                orderby type.Name
                select new { HashCode = type.FullName.GetHashCode(), Label = type.GetShortLabel() };

            TypeSelector.DataSource = typeList;
            TypeSelector.DataTextField = "Label";
            TypeSelector.DataValueField = "HashCode";
            TypeSelector.DataBind();
        }



        private void Field_Select(Guid fieldId)
        {
            if (ValidateSave())
            {
                if (this.CurrentlySelectedFieldId != Guid.Empty)
                {
                    Field_Save();
                }

                InitializeDetailsSplitPanel();

                var selectedField = CurrentFields.Single(f => f.Id == fieldId);

                this.CurrentlySelectedFieldId = fieldId;

                this.NameField.Text = selectedField.Name;

                this.LabelField.Text = selectedField.Label;
                this.HelpField.Text = selectedField.HelpText;

                string typeName = selectedField.Type.FullName.GetHashCode().ToString();

                if (this.TypeSelector.Items.FindByValue(typeName) != null)
                {
                    this.TypeSelector.SelectedValue = typeName;
                }
                else
                {
                    this.TypeSelector.Items.Insert( 0, new ListItem( "UNKNOWN TYPE: " + selectedField.Type.Name ));
                }

                btnWidgetFunctionMarkup.Value = selectedField.WidgetFunctionMarkup;

                btnDefaultValueFunctionMarkup.Value = selectedField.DefaultValueFunctionMarkup;

                btnTestValueFunctionMarkup.Value = selectedField.TestValueFunctionMarkup;

                this.PositionField.SelectedValue = (selectedField.Position == this.CurrentFields.Count - 1 ? "-1" : selectedField.Position.ToString());
            }
        }



        protected Guid CurrentlySelectedFieldId
        {
            get
            {
                var editedFieldId = ViewState["editedFieldId"];
                return editedFieldId  == null ? Guid.Empty : (Guid) editedFieldId;
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


        private List<ManagedParameterDefinition> CurrentFields
        {
            get
            {
                var value = this.ViewState["Fields"];
                if (value == null) throw new Exception("ViewState element 'Fields' does not exist");
                return (List<ManagedParameterDefinition>)value;
            }

            set
            {
                this.ViewState["Fields"] = value;
            }
        }


        protected Type CurrentlySelectedWidgetReturnType
        {
            get
            {
                Type selectedType = this.CurrentlySelectedType;

                return selectedType;
            }
        }



        protected string CurrentlySelectedWidgetText
        {
            get
            {
                string widgetMarkup = btnWidgetFunctionMarkup.Value;

                if (widgetMarkup.IsNullOrEmpty())
                {
                    return GetString("NoWidgetSpecifiedLabel");
                }

                XElement functionElement = XElement.Parse(widgetMarkup);
                if (functionElement.Name.Namespace!=Namespaces.Function10)
                    functionElement = functionElement.Elements().First();

                try
                {
                    var widgetNode = (BaseFunctionRuntimeTreeNode)FunctionFacade.BuildTree(functionElement);
                    return widgetNode.GetName();
                }
                catch (Exception ex)
                {
                    Log.LogError("FunctionParameter", ex);
                    Baloon(btnWidgetFunctionMarkup,"Error: "+ex.Message);
                    return GetString("NoWidgetSpecifiedLabel");
                }
            }
        }



        protected Type CurrentlySelectedType
        {
            get
            {
                var typeNameHash = Int32.Parse(this.TypeSelector.SelectedValue);
                return this.TypeOptions.First(t => t.FullName.GetHashCode() == typeNameHash); 
            }
        }



        private void ShowMessage(string targetFieldName, string p)
        {
            var fm = new FieldMessage(targetFieldName, p);

            // TODO: implement
        }



        public void btnAddNew_Click()
        {
            if (ValidateSave())
            {
                if (this.CurrentlySelectedFieldId != Guid.Empty)
                {
                    Field_Save();
                }

                InitializeDetailsSplitPanel();

                this.CurrentlySelectedFieldId = Guid.NewGuid();
                this.NameField.Text = _defaultFieldNamePrefix;

                int i = 2;
                while (this.CurrentFields.Any(f => f.Name == this.NameField.Text))
                {
                    this.NameField.Text = _defaultFieldNamePrefix + i++;
                }

                this.TypeSelector.SelectedValue = typeof(string).FullName.GetHashCode().ToString();
                btnDefaultValueFunctionMarkup.Value = "";
                btnTestValueFunctionMarkup.Value = "";
                this.LabelField.Text = "";
                this.HelpField.Text = "";
                this.PositionField.SelectedValue = "-1";

                ResetWidgetSelector();

                Field_Save();

                UpdatePositionFieldOptions();
                UpdateFieldsPanel();
                MakeClientDirty();
            }
        }



        private bool ValidateSave()
        {
            if (this.CurrentlySelectedFieldId == Guid.Empty) return true;

            if (this.NameField.Text.Contains(" "))
            {
                Baloon(this.NameField, GetString("SpaceInNameError"));
                return false;
            }

            if (string.IsNullOrEmpty(this.NameField.Text))
            {
                Baloon(this.NameField, GetString("NameEmptyError"));
                return false;
            }

            if (this.CurrentFields.Any(f => f.Name == this.NameField.Text && f.Id != this.CurrentlySelectedFieldId))
            {
                Baloon(this.NameField, GetString("NameAlreadyInUseError"));
                return false;
            }

            string toValidate = this.NameField.Text.StartsWith("@") ? this.NameField.Text.Substring(1) : this.NameField.Text;
            string err;
            if (!NameValidation.TryValidateName(toValidate, out err))
            {
                Baloon(this.NameField, err);
                return false;
            }

            return true;
        }



        private void Baloon(System.Web.UI.Control c, string message)
        {
            Baloon(c.UniqueID, message);
        }

        private void Baloon(string fieldName, string message)
        {
            var fm = new FieldMessage(fieldName, message);

            MessagesPlaceHolder.Controls.Add(fm);
        }

        private void UpdateFieldsPanel()
        {
            this.FieldListRepeater.DataSource = CurrentFields;
            this.FieldListRepeater.DataBind();
        }



        private void Field_Save()
        {
            if (CurrentlySelectedFieldId == Guid.Empty)
            {
                return;
            }

            if (this.CurrentFields.Count(f => f.Id == this.CurrentlySelectedFieldId) == 0)
            {
                var newField = new ManagedParameterDefinition
                {
                    Id = this.CurrentlySelectedFieldId,
                    Name = this.NameField.Text,
                    Type = this.CurrentlySelectedType,
                    Position = this.CurrentFields.Count
                };
                this.CurrentFields.Add(newField);
            }

            if (!FieldNameSyntaxValid(this.NameField.Text))
            {
                ShowMessage(this.NameField.ClientID, GetString("FieldNameSyntaxInvalid"));
                return;
            }

            if (this.CurrentFields.Count(f => String.Equals(f.Name, this.NameField.Text, StringComparison.OrdinalIgnoreCase) 
                                              && f.Id != this.CurrentlySelectedFieldId) > 0)
            {
                ShowMessage(this.NameField.ClientID, GetString("CannotSave"));
                return;
            }

            var field = this.CurrentFields.Single(f => f.Id == this.CurrentlySelectedFieldId);

            if (field.Name != this.NameField.Text)
            {
                nameChanged = true;
            }

            field.Name = this.NameField.Text;
            field.Type = this.CurrentlySelectedType;

            bool generateLabel = this.LabelField.Text == "" && !this.NameField.Text.StartsWith(_defaultFieldNamePrefix);
            string label = generateLabel ? this.NameField.Text : this.LabelField.Text;

            field.Label = label;
            field.HelpText = this.HelpField.Text;

            if (!btnWidgetFunctionMarkup.Value.IsNullOrEmpty())
            {
                XElement functionElement = XElement.Parse(btnWidgetFunctionMarkup.Value);
                if (functionElement.Name.Namespace != Namespaces.Function10)
                    functionElement = functionElement.Elements().First();

                field.WidgetFunctionMarkup = functionElement.ToString(SaveOptions.DisableFormatting);
            }
            else
            {
                field.WidgetFunctionMarkup = "";
            }


            if (!btnDefaultValueFunctionMarkup.Value.IsNullOrEmpty())
            {
                var functionElement = XElement.Parse(btnDefaultValueFunctionMarkup.Value);
                if (functionElement.Name.Namespace != Namespaces.Function10)
                    functionElement = functionElement.Elements().First();

                field.DefaultValueFunctionMarkup = functionElement.ToString(SaveOptions.DisableFormatting);
            }
            else
            {
                field.DefaultValueFunctionMarkup = null;
            }


            if (!btnTestValueFunctionMarkup.Value.IsNullOrEmpty())
            {
                var functionElement = XElement.Parse(btnTestValueFunctionMarkup.Value);
                if (functionElement.Name.Namespace != Namespaces.Function10)
                    functionElement = functionElement.Elements().First();

                field.TestValueFunctionMarkup = functionElement.ToString(SaveOptions.DisableFormatting);
            }
            else
            {
                field.TestValueFunctionMarkup = null;
            }


            int newPosition = int.Parse(this.PositionField.SelectedValue);
            if (newPosition == -1) newPosition = this.CurrentFields.Count - 1;

            if (field.Position != newPosition)
            {
                this.CurrentFields.Remove(field);

                foreach (ManagedParameterDefinition laterField in this.CurrentFields.Where(f => f.Position > field.Position))
                {
                    laterField.Position--;
                }

                foreach (ManagedParameterDefinition laterField in this.CurrentFields.Where(f => f.Position >= newPosition))
                {
                    laterField.Position++;
                }

                field.Position = newPosition;
                this.CurrentFields.Insert(newPosition, field);
            }

        }


        public void btnDelete_Click()
        {
            if (CurrentlySelectedFieldId == Guid.Empty)
            {
                return;
            }

            List<Guid> fieldIDs = CurrentFields.Select(field => field.Id).ToList();

            int currentFieldOffset = fieldIDs.IndexOf(CurrentlySelectedFieldId);

            Field_Delete(this.CurrentlySelectedFieldId);
            MakeClientDirty();

            if (currentFieldOffset < fieldIDs.Count - 1)
            {
                CurrentlySelectedFieldId = Guid.Empty;
                Field_Select(fieldIDs[currentFieldOffset + 1]);
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
        protected void BindStateToProperties()
        {
            // TODO: to be used
            if (this.CurrentlySelectedFieldId != Guid.Empty)
            {
                if (ValidateSave())
                {
                    Field_Save();
                }
            }



            foreach (var field in this.CurrentFields)
            {
                if (string.IsNullOrEmpty(field.Label))
                {
                    field.Label = field.Name;
                }
            }


            this.Parameters = this.CurrentFields;
        }



        // First time we run - we are attached to a parent System.Web.Control 
        protected void InitializeViewState()
        {
            var fields = new List<ManagedParameterDefinition>();
            if (this.Parameters != null) fields.AddRange(this.Parameters);

            // ensure positioning is in place
            int position = 0;
            foreach (ManagedParameterDefinition field in fields.OrderBy(f => f.Position))
            {
                field.Position = position++;
            }

            CurrentFields = fields;

            UpdateFieldsPanel();
        }

        protected string EventTarget
        {
            get
            {
                return IsPostBack ? Request.Form["__EVENTTARGET"] : string.Empty;
            }
        }
    }
}