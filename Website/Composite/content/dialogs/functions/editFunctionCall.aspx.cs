using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite;
using Composite.C1Console.Forms.WebChannel;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.WebClient;
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
        private static readonly XName ParameterNodeXName = Namespaces.Function10 + "param";
        private static readonly XName ParameterValueElementXName = Namespaces.Function10 + "paramelement";

		protected void Page_Load(object sender, EventArgs e)
		{
			SetDesignerParameters();

		    string eventTarget = Request["__EVENTTARGET"];

            
            if (eventTarget == "Basic")
			{
				ActiveTab = Tab.Basic;
                ProcessWidgets(false);
			}
            else if (eventTarget == "Advanced")
			{
                ActiveTab = ValidateAndSaveBasicTab() ? Tab.Advanced : Tab.Basic;
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
                ProcessWidgets(IsPostBack);
            }

		    bool isBasicView = ActiveTab == Tab.Basic;

            BasicPanel.Visible = isBasicView;
            AdvancedPanel.Visible = !isBasicView;
		}

	    private bool ProcessWidgets(bool processPost, bool showValidationErrors = false)
	    {
            XElement functionMarkup = XElement.Parse(FunctionMarkupInState);

	        string functionName = (string) functionMarkup.Attribute("name");
	        IFunction function = FunctionFacade.GetFunction(functionName);

            var bindings = new Dictionary<string, object>();
            var parameterNodes = functionMarkup.Elements(ParameterNodeXName).ToDictionary(e => (string)e.Attribute("name"));

            foreach (var parameterProfile in function.ParameterProfiles)
            {
                object parameterValue;

                XElement parameterNode;

	            if (parameterNodes.TryGetValue(parameterProfile.Name, out parameterNode))
	            {
                    parameterValue = GetParameterValue(parameterNode, parameterProfile);
	            }
	            else
	            {
	                parameterValue = parameterProfile.GetDefaultValue();
	            }

                bindings.Add(parameterProfile.Name, parameterValue);
	        }
            
            var formTreeCompiler = FunctionUiHelper.BuildWidgetForParameters(
                function.ParameterProfiles,
                bindings,
                "BasicView" ,
                "",
                WebManagementChannel.Identifier);

            IWebUiControl webUiControl = (IWebUiControl)formTreeCompiler.UiControl;

            var webControl = webUiControl.BuildWebControl();

            BasicPanel.Controls.Add(webControl);

            if (!processPost)
	        {
	            webUiControl.InitializeViewState();
	            return true;
	        }
	        
	        webUiControl.BindStateToControlProperties();

	        var validationErrors = formTreeCompiler.SaveAndValidateControlProperties();

	        if (validationErrors.Any())
	        {
	            if (showValidationErrors)
	            {
	                // TODO: show validation errors
	            }
                
	            return false;
	        }

	        foreach (var parameterProfile in function.ParameterProfiles)
	        {
                XElement parameterNode;
                parameterNodes.TryGetValue(parameterProfile.Name, out parameterNode);

	            object newValue = bindings[parameterProfile.Name];

	            bool newValueNotEmpty = newValue != null
	                                    && (!(newValue is IList) || ((IList) newValue).Count > 0)
	                                    && !(parameterProfile.IsRequired && newValue as string == string.Empty);

	            if (parameterNode != null)
	            {
                    parameterNode.Remove();
	            }

	            if (newValueNotEmpty && newValue != parameterProfile.GetDefaultValue())
	            {
	                var newConstantParam = new ConstantObjectParameterRuntimeTreeNode(parameterProfile.Name, newValue);

	                functionMarkup.Add(newConstantParam.Serialize());
	            }
	        }

	        FunctionMarkupInState = functionMarkup.ToString();

            return true;
	    }

        private object GetParameterValue(XElement parameterNode, ParameterProfile parameterProfile)
        {
            // TODO: merge with FunctionCallEditor's code

            List<XElement> parameterElements = parameterNode.Elements(ParameterValueElementXName).ToList();
            if (parameterElements.Any())
            {
                return parameterElements.Select(element => element.Attribute("value").Value).ToList();
            }

            var valueAttr = parameterNode.Attribute("value");
            if (valueAttr != null)
            {
                try
                {
                    return ValueTypeConverter.Convert(valueAttr.Value, parameterProfile.Type);
                }
                catch (Exception ex)
                {
                    Log.LogError(LogTitle, ex);

                    return parameterProfile.GetDefaultValue();
                }
            }

            if (parameterNode.Elements().Any())
            {
                Type paramType = parameterProfile.Type;

                if (paramType.IsSubclassOf(typeof(XContainer))
                    || (paramType.IsGenericType
                        && paramType.GetGenericTypeDefinition() == typeof(Lazy<>)
                        && paramType.GetGenericArguments()[0].IsSubclassOf(typeof(XContainer))))
                {
                    return ValueTypeConverter.Convert(parameterNode.Elements().First(), parameterProfile.Type);
                }

                throw new NotImplementedException("Not supported type of function parameter element node: '{0}'".FormatWith(paramType.FullName));
            }

            return parameterProfile.GetDefaultValue();
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

		private void SetDesignerParameters()
		{
			if (!IsPostBack)
			{
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
				if (IsWidgetSelection)
				{
					functionCalls = ConvertToFunctions(functionCalls);
				}
				state.FunctionCallsXml = new XElement("functions", functionCalls.ToArray()).ToString();
				state.MaxFunctionAllowed = MultiMode ? 1000 : 1;
				state.AllowedResultTypes = new[] { resultType };
				state.WidgetFunctionSelection = IsWidgetSelection;
				state.ConsoleId = Request.QueryString["consoleid"] ?? string.Empty;

				SessionStateManager.DefaultProvider.AddState<IFunctionCallEditorState>(stateId, state, DateTime.Now.AddDays(7.0));

				FunctionCallDesigner.SessionStateProvider = SessionStateManager.DefaultProviderName;
				FunctionCallDesigner.SessionStateId = stateId;

				SessionStateId = stateId;
			}
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
		private IEnumerable<XElement> ConvertToFunctions(IEnumerable<XElement> functionCalls)
		{
			foreach (XElement element in functionCalls)
			{
				yield return element;
			}
		}
	}
}