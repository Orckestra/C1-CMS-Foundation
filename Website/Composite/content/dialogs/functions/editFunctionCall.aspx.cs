using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI;
using System.Xml.Linq;
using Composite;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.WebChannel;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.WebClient;
using Composite.Core.WebClient.UiControlLib;
using Composite.Functions;
using Composite.Core.Types;
using Composite.Core.WebClient.FunctionCallEditor;
using Composite.Core.WebClient.State;
using Composite.Core.Xml;
using Composite.Core.ResourceSystem;


namespace CompositeEditFunctionCall
{
	public enum Tab
	{
		Basic = 0,
		Advanced = 1
	}

	public partial class EditFunctionCall : Composite.Core.WebClient.XhtmlPage
	{
	    private const string LogTitle = "EditFunctionCall";

		protected void Page_Load(object sender, EventArgs e)
		{
			SetDesignerParameters();

		    string eventTarget = Request["__EVENTTARGET"];

            
            if (eventTarget == "Basic")
			{
				var functionCallsEvaluated = new List<XElement> { XElement.Parse(FunctionMarkupInState) };
				CheckBasicView(functionCallsEvaluated);
				if (BasicViewEnabled)
				{

					ActiveTab = Tab.Basic;
					ProcessWidgets(false);
				}
			}
            else if (eventTarget == "Advanced")
            {
                ProcessWidgets(true, false, true);

                ActiveTab = Tab.Advanced;
			}
            else if (eventTarget == "buttonAccept")
            {
                if (ActiveTab == Tab.Basic && ValidateAndSaveBasicTab() ||
                    ActiveTab == Tab.Advanced)
                {
                    FunctionMarkup.Value = FunctionMarkupInState;
                    DialogDoAcceptPlaceHolder.Visible = true;
                }
            }
            else
            {
                if (BasicViewEnabled)
                {
                    ProcessWidgets(IsPostBack);
                }
            }

		    bool isBasicView = ActiveTab == Tab.Basic;

			FunctionCallDesigner.HasBasic = BasicViewEnabled;
            BasicPanel.Visible = isBasicView;
            AdvancedPanel.Visible = !isBasicView;
		}

	    private bool ProcessWidgets(bool processPost, bool showValidationErrors = false, bool ignoreValidationErrors = false)
	    {
            XElement functionMarkup = XElement.Parse(FunctionMarkupInState);

	        string functionName = (string) functionMarkup.Attribute("name");
	        IFunction function = FunctionFacade.GetFunction(functionName);

	        if (function.ParameterProfiles.All(p => p.WidgetFunction == null))
	        {
	            plhNoParameters.Visible = true;
                return true;
	        }

            var bindings = new Dictionary<string, object>();
            var parameterNodes = FunctionMarkupHelper.GetParameterNodes(functionMarkup);

            foreach (var parameterProfile in function.ParameterProfiles)
            {
                object parameterValue;

                XElement parameterNode;

	            if (parameterNodes.TryGetValue(parameterProfile.Name, out parameterNode))
	            {
                    parameterValue = FunctionMarkupHelper.GetParameterValue(parameterNode, parameterProfile);
	            }
	            else
	            {
	                parameterValue = parameterProfile.GetDefaultValue();
	            }

                if (parameterProfile.Type.IsLazyGenericType() && parameterValue != null)
                {
                    parameterValue = parameterProfile.Type.GetProperty("Value").GetGetMethod().Invoke(parameterValue, null);
                }

                bindings.Add(parameterProfile.Name, parameterValue);
	        }
            
            var formTreeCompiler = FunctionUiHelper.BuildWidgetForParameters(
                function.ParameterProfiles.Where(p => !p.HideInSimpleView 
                    || (p.IsRequired && (!bindings.ContainsKey(p.Name) || bindings[p.Name] == null))),
                bindings,
                "BasicView" ,
                "",
                WebManagementChannel.Identifier);

            var webUiControl = (IWebUiControl)formTreeCompiler.UiControl;

            var webControl = webUiControl.BuildWebControl();

            BasicContentPanel.Controls.Add(webControl);

            if (!processPost)
	        {
	            webUiControl.InitializeViewState();
	            return true;
	        }

            // Loading control's post data
	        LoadPostBackData(webControl);

	        var validationErrors = formTreeCompiler.SaveAndValidateControlProperties();

	        if (!ignoreValidationErrors)
	        {
                // Validating required parameters
	            foreach (var parameterProfile in function.ParameterProfiles)
	            {
	                if (!validationErrors.ContainsKey(parameterProfile.Name)
	                    && parameterProfile.IsRequired
	                    && parameterProfile.WidgetFunction != null
	                    && (!bindings.ContainsKey(parameterProfile.Name) || bindings[parameterProfile.Name] == null))
	                {
	                    validationErrors.Add(parameterProfile.Name, new Exception(
	                        StringResourceSystemFacade.GetString("Composite.Management", "Validation.RequiredField")));
	                }
	            }


	            if (validationErrors.Any())
	            {
	                if (showValidationErrors)
	                {
	                    ShowServerValidationErrors(formTreeCompiler, validationErrors);
	                }

	                return false;
	            }
	        }

	        foreach (var parameterProfile in function.ParameterProfiles)
	        {
                XElement parameterNode;
                parameterNodes.TryGetValue(parameterProfile.Name, out parameterNode);

	            object value = bindings[parameterProfile.Name];

	            if (!parameterProfile.IsRequired)
	            {
	                object defaultValue = parameterProfile.GetDefaultValue();
                    if(value == defaultValue 
                       || (value != null && value.Equals(defaultValue))
                       || (value is XNode && defaultValue is XNode && XElement.DeepEquals(value as XNode, defaultValue as XNode))
                       || parameterProfile.WidgetFunction == null)
	                {
	                    if (parameterNode != null)
	                    {
                            parameterNode.Remove();
	                    }
	                    continue;
	                }
	            }

                FunctionMarkupHelper.SetParameterValue(functionMarkup, parameterProfile, value);
	        }

	        FunctionMarkupInState = functionMarkup.ToString();

            return true;
	    }



	    private void LoadPostBackData(Control control)
	    {
            if (control is IPostBackDataHandler)
            {
                (control as IPostBackDataHandler).LoadPostData(control.UniqueID, Request.Form);
            }

            foreach (Control childControl in control.Controls)
            {
                LoadPostBackData(childControl);
            }
	    }



        private void ShowServerValidationErrors(FormTreeCompiler formTreeCompiler, Dictionary<string, Exception> serverValidationErrors)
        {
            foreach (var serverValidationError in serverValidationErrors)
            {
                string controlId = formTreeCompiler.GetBindingToClientIDMapping()[serverValidationError.Key];
                string message = StringResourceSystemFacade.ParseString(serverValidationError.Value.Message);

                plhErrors.Controls.Add(new FieldMessage(controlId, message));
            }
        }

		public Tab ActiveTab
		{
			get
			{
				Tab tab;
				Enum.TryParse(hdnActiveTab.Value, out tab);
				return tab;
			}
			set { hdnActiveTab.Value = ((int)value).ToString(); }
		}

		private bool ValidateAndSaveBasicTab()
		{
		    return ProcessWidgets(true, true);
		}

		private void CheckBasicView(ICollection<XElement> functionCallsEvaluated)
		{
            BasicViewEnabled = BasicViewApplicable(functionCallsEvaluated);
		}

        private bool BasicViewApplicable(ICollection<XElement> functionCallsEvaluated)
	    {
            // Basic view is enabled if 
            // - Only one function is being edited
            // - here's no parameters defined as function calls
            // - And there no required parameters without widgets

            if (MultiMode || IsWidgetSelection || functionCallsEvaluated.Count != 1)
            {
                return false;
            }

            var functionMarkup = functionCallsEvaluated.Single();

            if (functionMarkup
                 .Elements()
                 .Any(childElement => childElement.Elements().Any(e => e.Name.LocalName == "function")))
            {
                return false;
            }

            string functionName = (string)functionMarkup.Attribute("name");
            var function = FunctionFacade.GetFunction(functionName);

            if (function == null)
            {
                return false;
            }
            
            return !function.ParameterProfiles.Any(p => p.IsRequired && p.WidgetFunction == null && !p.IsInjectedValue);
	    }

		private void SetDesignerParameters()
		{
		    if (IsPostBack) return;

		    string typeName = Request.QueryString["type"];

		    if (typeName.IsNullOrEmpty())
		    {
		        typeName = UrlUtils.UnZipContent(Request.QueryString["zip_type"]);
		    }

		    Type resultType = typeName == null ? typeof(object) : TypeManager.GetType(typeName);


		    IsWidgetSelection = Request.QueryString["functiontype"] == "widget";

		    Guid stateId = Guid.NewGuid();

		    var state = new FunctionCallEditorStateSimple();

		    IEnumerable<XElement> functionCalls = GetFunctionElementsFromQueryString();
		    var functionCallsEvaluated = functionCalls.Evaluate();

            state.FunctionCallsXml = new XElement("functions", functionCallsEvaluated).ToString();
		    state.MaxFunctionAllowed = MultiMode ? 1000 : 1;
		    state.AllowedResultTypes = new[] { resultType };
		    state.WidgetFunctionSelection = IsWidgetSelection;
		    state.ConsoleId = Request.QueryString["consoleid"] ?? string.Empty;

		    SessionStateManager.DefaultProvider.AddState<IFunctionCallEditorState>(stateId, state, DateTime.Now.AddDays(7.0));

		    FunctionCallDesigner.SessionStateProvider = SessionStateManager.DefaultProviderName;
		    FunctionCallDesigner.SessionStateId = stateId;
            
		    SessionStateId = stateId;

			CheckBasicView(functionCallsEvaluated);

            ActiveTab = BasicViewEnabled ? Tab.Basic : Tab.Advanced;
		}

        private IEnumerable<XElement> GetFunctionElementsFromQueryString()
		{
			string functionMarkup = this.Request.QueryString["functionMarkup"];

			if (string.IsNullOrEmpty(functionMarkup))
			{
				functionMarkup = this.Request.Form["functionMarkup"];
			}

			const string ZipPrefix = "ZIP_";
			if (functionMarkup != null && functionMarkup.StartsWith(ZipPrefix))
			{
				functionMarkup = UrlUtils.UnZipContent(functionMarkup.Substring(ZipPrefix.Length));
			}

			return GetFunctionElements(functionMarkup);
		}

		private IEnumerable<XElement> GetFunctionElements(string functionMarkup)
		{
			if (!string.IsNullOrEmpty(functionMarkup) && functionMarkup != "null")
			{
				XElement functionElement = XElement.Parse(functionMarkup);

				if (functionElement.Name.Namespace == Namespaces.Function10)
				{
					yield return functionElement;
				}
				else
				{
					foreach (XElement multiFunctionElement in functionElement.Elements())
					{
						Verify.That(multiFunctionElement.Name.Namespace == Namespaces.Function10,
									"Nested function elements does not belong to expected namespace");

						yield return multiFunctionElement;
					}
				}
			}
		}

		protected string DialogLabel
		{
			get
			{
				return Request.QueryString["dialoglabel"] ?? StringResourceSystemFacade.GetString("Composite.Web.FormControl.FunctionCallsDesigner", "DialogTitle");
			}
		}

		protected bool MultiMode
		{
			get
			{
				return bool.Parse(Request.QueryString["multimode"] ?? "false");
			}
		}

		private bool IsWidgetSelection
		{
			get { return (bool)ViewState["IsWidgetSelection"]; }
			set { ViewState["IsWidgetSelection"] = value; }
		}

		private Guid SessionStateId
		{
			get { return (Guid)ViewState["SessionStateId"]; }
			set { ViewState["SessionStateId"] = value; }
		}

	    protected bool BasicViewEnabled
        {
            get { return (bool) ViewState["BasicViewEnabled"]; }
            set { ViewState["BasicViewEnabled"] = value; }
        }

		protected string FunctionMarkupInState
		{
			get
			{
				IFunctionCallEditorState state;
				if (!SessionStateManager.DefaultProvider.TryGetState<IFunctionCallEditorState>(SessionStateId, out state))
				{
					throw new InvalidOperationException("Failed to get session state");
				}

				string functionMarkup = "";

				foreach (NamedFunctionCall functionCall in state.FunctionCalls)
				{
					XElement serializedFunctionCall = functionCall.FunctionCall.Serialize();

					var nestedFunctions = serializedFunctionCall.Descendants(Namespaces.Function10 + "function").Where(
						f => f.Parent.Name.Namespace != Namespaces.Function10 && f.Attribute(XNamespace.Xmlns + "f") == null).ToList();

					foreach (var nestedFunction in nestedFunctions)
					{
						nestedFunction.Add(new XAttribute(XNamespace.Xmlns + "f", Namespaces.Function10));
					}

					functionMarkup += serializedFunctionCall.ToString();

					if (!this.MultiMode) break;
				}

				if (this.MultiMode && !string.IsNullOrEmpty(functionMarkup))
				{
					functionMarkup = string.Format("<functions>{0}</functions>", functionMarkup);
				}
				return functionMarkup;
			}
			set
			{
				IFunctionCallEditorState state;
				if (!SessionStateManager.DefaultProvider.TryGetState(SessionStateId, out state))
				{
					throw new InvalidOperationException("Failed to get session state");
				}
				(state as FunctionCallEditorStateSimple).FunctionCallsXml = new XElement("functions", GetFunctionElements(value)).ToString(); ;
				SessionStateManager.DefaultProvider.SetState<IFunctionCallEditorState>(SessionStateId, state, DateTime.Now.AddDays(7.0));
			}
		}
	}
}