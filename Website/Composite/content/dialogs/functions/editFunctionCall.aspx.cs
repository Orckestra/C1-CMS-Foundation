using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using Composite.Functions;
using Composite.Core.Types;
using Composite.Core.WebClient.FunctionCallEditor;
using Composite.Core.WebClient.State;
using Composite.Core.Xml;
using Composite.Core.ResourceSystem;


namespace CompositeEditFunctionCall
{
    public partial class EditFunctionCall : Composite.Core.WebClient.XhtmlPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            SetDesignerParameters();

            if(IsPostBack)
            {
                Ok_Click(null, null);
            }
        }

        private void SetDesignerParameters()
        {
            if(!IsPostBack)
            {
                string typeName = Request.QueryString["type"];
                Type resultType = typeName == null ? typeof(object) : TypeManager.GetType(typeName);

                IsWidgetSelection = Request.QueryString["functiontype"] == "widget";

                Guid stateId = Guid.NewGuid();

                var state = new FunctionCallEditorStateSimple();

                IEnumerable<XElement> functionCalls = GetFunctionElementsFromQueryString();
                if(IsWidgetSelection)
                {
                    functionCalls = ConvertToFunctions(functionCalls);
                }
                state.FunctionCallsXml = new XElement("functions", functionCalls.ToArray()).ToString();
                state.MaxFunctionAllowed = MultiMode ? 1000 : 1;
                state.AllowedResultTypes = new [] { resultType };
                state.WidgetFunctionSelection = IsWidgetSelection;
                state.ConsoleId = Request.QueryString["consoleid"] ?? string.Empty;

                SessionStateManager.DefaultProvider.AddState<IFunctionCallEditorState>(stateId, state, DateTime.Now.AddDays(7.0));

                FunctionCallDesigner.SessionStateProvider = SessionStateManager.DefaultProviderName;
                FunctionCallDesigner.SessionStateId = stateId;

                SessionStateId = stateId;
            }

            FunctionCallDesigner.SessionStateProvider = SessionStateManager.DefaultProviderName;
            FunctionCallDesigner.SessionStateId = SessionStateId;
        }

        private IEnumerable<XElement> GetFunctionElementsFromQueryString()
        {
            string functionMarkup = this.Request.QueryString["functionMarkup"];

            if (string.IsNullOrEmpty(functionMarkup) == true)
            {
                functionMarkup = HttpUtility.UrlDecode( this.Request.Form["functionMarkup"] );
            }

            if (string.IsNullOrEmpty(functionMarkup) == false && functionMarkup != "null")
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
                        if (multiFunctionElement.Name.Namespace != Namespaces.Function10 ) throw new InvalidOperationException("Nested function elements does not belong to expected namespace");

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

        protected void Ok_Click(object sender, EventArgs e)
        {
            IFunctionCallEditorState state;
            if(!SessionStateManager.DefaultProvider.TryGetState<IFunctionCallEditorState>(SessionStateId, out state))
            {
                throw new InvalidOperationException("Failed to get session state");
            }

            //var castedState = (state as FunctionCallEditorStateSimple);

            string functionMarkup = "";

            foreach (NamedFunctionCall functionCall in state.FunctionCalls)
            {
                XElement serializedFunctionCall = functionCall.FunctionCall.Serialize();
                if(IsWidgetSelection)
                {
                    ConvertToWidgetFunction(serializedFunctionCall);
                }

                //if (this.FunctionCallDesigner.DisplayFunctionLocalNames == true && string.IsNullOrEmpty(functionCall.Name) == false)
                //{
                //    serializedFunctionCall.Add(new XAttribute("localname", functionCall.Name));
                //}

                functionMarkup += serializedFunctionCall.ToString();

                if (this.MultiMode == false) break;
            }

            if (this.MultiMode == true && string.IsNullOrEmpty(functionMarkup) == false)
            {
                functionMarkup = string.Format("<functions>{0}</functions>", functionMarkup);
            }

            this.FunctionMarkup.Value = functionMarkup;

             this.DialogDoAcceptPlaceHolder.Visible = true;
        }

        private IEnumerable<XElement> ConvertToFunctions(IEnumerable<XElement> functionCalls)
        {
            foreach(XElement element in functionCalls)
            {
                // element.Name = Namespaces.Function10 + "function";

                //// Removing "helpdefinition" tag since editor isn't using it anyway
                //var helpDefinition = element.Elements(Namespaces.Function10 + "helpdefinition").FirstOrDefault();
                //if(helpDefinition != null)
                //{
                //    helpDefinition.Remove();
                //}
                yield return element;
            }
        }

        private void ConvertToWidgetFunction(XElement element)
        {
            // element.Name = Namespaces.Function10 + "widgetfunction";
        }
   }
}