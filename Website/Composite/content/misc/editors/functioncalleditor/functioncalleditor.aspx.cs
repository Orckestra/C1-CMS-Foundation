using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Caching;
using System.Web.UI;
using System.Xml;
using System.Xml.Linq;
using System.Xml.XPath;
using System.Xml.Xsl;
using Composite;
using Composite.C1Console.Events;
using Composite.C1Console.Forms.WebChannel;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Composite.Core.WebClient;
using Composite.Core.WebClient.FunctionCallEditor;
using Composite.Core.WebClient.State;
using Composite.Core.Xml;
using Composite.Functions;
using Composite.Plugins.Elements.ElementProviders.AllFunctionsElementProvider;
using Composite.Plugins.Forms.WebChannel.UiControlFactories;


/// <summary>
/// Summary description for functioneditor
/// </summary>
public partial class functioneditor : Composite.Core.WebClient.XhtmlPage
{
    private static readonly TimeSpan SessionExpirationPeriod = TimeSpan.FromDays(4.0);

    private static readonly string XsltExtensionObjectNamespace = "functioncalleditor";
    private const string LogTitle = "FunctionCallEditor";

    private static readonly XName ParameterNodeXName = Namespaces.Function10 + "param";
    private static readonly XName FunctionNodeXName = Namespaces.Function10 + "function";
    private static readonly XName WidgetFunctionNodeXName = Namespaces.Function10 + "widgetfunction";

    private static readonly string SessionStateProviderQueryKey = "StateProvider";
    private static readonly string StateIdQueryKey = "Handle";

    private static readonly string SelectedInputParameter_AttributeName = "inputParameter";

    private static readonly string GetInputParameterFunctionName = "Composite.Utils.GetInputParameter";
    private static readonly string GetInputParameterFunctionParameterName = "InputParameterName";

    private readonly XNamespace functionDescriptionNs = "#functionDescription";
    private static readonly string FunctionMarkupSessionKey = "fmsk";

    // Localization
    protected string ReturnTypeLabel { get { return GetString("ReturnTypeLabel"); } }
    protected string AddNewFunctionDialogLabel { get { return GetString("AddNewFunctionDialogLabel"); } }
    protected string SetNewFunctionDialogLabel { get { return GetString("SetNewFunctionDialogLabel"); } }
    protected string SelectFunctionDialogLabel { get { return GetString("ComplexFunctionCallDialogLabel"); } }
    protected string FunctionLocalNameGroupLabel { get { return GetString("FunctionLocalNameGroupLabel"); } }
    protected string FunctionLocalNameLabel { get { return GetString("FunctionLocalNameLabel"); } }
    protected string FunctionLocalNameHelp { get { return GetString("FunctionLocalNameHelp"); } }

    private enum ParameterValueType
    {
        Default = 0, Constant, InputParameter, FunctionCall
    }

    private enum EditorModeEnum
    {
        Design = 0,
        Source = 1
    }

    private IFunctionCallEditorState _state;
    private XDocument _functionMarkup;

    private EditorModeEnum EditorMode
    {
        get
        {
            return fldMode.Value == "source" ? EditorModeEnum.Source : EditorModeEnum.Design;
        }
        set
        {
            fldMode.Value = (value == EditorModeEnum.Source) ? "source" : "design";
        }
    }

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

    bool IsInTestMode
    {
        get { return StateId == Guid.Empty; }
    }

    protected XDocument FunctionMarkup
    {
        get
        {
            if (_functionMarkup == null)
            {
                if (!IsInTestMode)
                {
                    throw new InvalidOperationException();
                }

                string serializedMarkup = ViewState[FunctionMarkupSessionKey] as string;

                byte[] bytes = System.Text.Encoding.UTF8.GetBytes(serializedMarkup);
                using (var stream = new MemoryStream(bytes))
                {
                    _functionMarkup = XDocument.Load(stream);
                }

                PrettifyXmlNamespacePrefixes(_functionMarkup);
            }

            return _functionMarkup;
        }
        set
        {
            _functionMarkup = value;
        }
    }

    private static void PrettifyXmlNamespacePrefixes(XContainer functionTree)
    {
        var nestedFunctions = functionTree.Descendants(Namespaces.Function10 + "function").Where(
            f => f.Parent.Name.Namespace != Namespaces.Function10 && f.Attribute(XNamespace.Xmlns + "f") == null).ToList();

        foreach (var nestedFunction in nestedFunctions)
        {
            nestedFunction.Add(new XAttribute(XNamespace.Xmlns + "f", Namespaces.Function10));
        }

        functionTree.Descendants(Namespaces.Function10 + "function").Attributes("xmlns").Remove();
    }

    // Contains info that is used while building ID-s for treeview nodes
    private Dictionary<XElement, string> _xElementTreeNodeIDs;

    // Contains id map, an example is "/function[1]" => some guid
    private Dictionary<string, string> TreePathToIdMapping
    {
        get
        {
            return ViewState["TreeNodePathToIdMapping"] as Dictionary<string, string>;
        }
        set
        {
            ViewState["TreeNodePathToIdMapping"] = value;
        }
    }

    string SelectedNode
    {
        get
        {
            return ViewState["SelectedTreeNode"] as string;
        }
        set
        {
            ViewState["SelectedTreeNode"] = value;
        }
    }

    HashSet<string> InputParameterNodeIDs
    {
        get { return ViewState["InputParameterNodeIDs"] as HashSet<string>; }
        set { ViewState["InputParameterNodeIDs"] = value; }
    }

    bool InputParameterSelectorIsShown
    {
        get { return (bool)(ViewState["InputParameterSelectorIsShown"] ?? false); }
        set { ViewState["InputParameterSelectorIsShown"] = value; }
    }

    bool WidgetIsShown
    {
        get { return (bool)(ViewState["WidgetIsShown"] ?? false); }
        set { ViewState["WidgetIsShown"] = value; }
    }

    bool LocalFunctionNameIsShown
    {
        get { return (bool)(ViewState["LocalFunctionNameIsShown"] ?? false); }
        set { ViewState["LocalFunctionNameIsShown"] = value; }
    }

    private void Page_Load(object sender, EventArgs args)
    {
        this.Error += Page_Error;

        if (!IsInTestMode)
        {
            LoadFunctions();
        }

        if (!IsPostBack)
        {
            InitializeTreeView();
        }

        _xElementTreeNodeIDs = TreeHelper.GetElementToIdMap(FunctionMarkup, TreePathToIdMapping);

        string eventTarget = Request.Form["__EVENTTARGET"];
        string eventArgument = Request.Form["__EVENTARGUMENT"];

        string nodePath = null;
        Guid temp;
        if (Guid.TryParse(eventTarget, out temp))
        {
            nodePath = TreePathToIdMapping.Where(pair => pair.Value == eventTarget).Select(pair => pair.Key).FirstOrDefault();
        }

        // Treeview click
        if (nodePath != null
            || eventTarget == string.Empty
            || ctlFeedback.IsPosted
            || (eventTarget == "switchbutton" || eventArgument == "source"))
        {
            bool isValid = true;

            // If node is changed, updating changed parameter's value
            if (!SelectedNode.IsNullOrEmpty())
            {
                if (WidgetIsShown)
                {
                    // TODO: insert validation logic
                    UpdateParameterValueFromWidget();
                }
                else if (LocalFunctionNameIsShown)
                {
                    UpdateFunctionLocalName();
                }
                else if (InputParameterSelectorIsShown)
                {
                    UpdateInputParameterName();
                }
            }

            if (isValid && nodePath != null)
            {
                SelectedNode = nodePath;
            }
        }
        else
        {
            ParameterValueType? newParameterValueType = null;

            switch (eventTarget)
            {
                case "btnSetNewFunction": BtnSetNewFunctionCallClicked();
                    break;
                case "btnAddFunction": BtnAddFunctionCallClicked();
                    break;
                case "btnDeleteFunction": BtnDeleteFunctionClicked();
                    break;
                case "btnDefault": newParameterValueType = ParameterValueType.Default;
                    break;
                case "btnConstant": newParameterValueType = ParameterValueType.Constant;
                    break;
                case "btnInputParameter": newParameterValueType = ParameterValueType.InputParameter;
                    break;
                case "btnFunctionCall": newParameterValueType = ParameterValueType.FunctionCall;
                    break;
            }

            if (newParameterValueType != null)
            {
                ParameterValueTypeChanged(newParameterValueType.Value);
                ctlFeedback.MarkAsDirty();
            }
        }

        UpdateMenu();

        if (eventTarget == "switchbutton")
        {
            switch (eventArgument)
            {
                case "source":
                    EditorMode = EditorModeEnum.Source;
                    break;
                case "design":
                    if (SaveSourceMarkupChanges())
                    {
                        EditorMode = EditorModeEnum.Design;
                    }
                    break;
            }
        }

        SyncTreeAndEditingPanel();
    }

    private void Page_Error(object sender, EventArgs e)
    {
        Composite.Core.WebClient.ErrorServices.DocumentAdministrativeError(Server.GetLastError());
        Composite.Core.WebClient.ErrorServices.RedirectUserToErrorPage(null, Server.GetLastError());
    }


    private void Page_PreRender(object sender, EventArgs args)
    {
        //SyncTreeAndEditingPanel();
    }


    private void InitializeTreeView()
    {
        if (IsInTestMode)
        {
            // For testing only
            FunctionMarkup = XDocumentUtils.Load(Request.MapPath("functioneditor-sample-function.xml"));
        }

        WidgetIsShown = false;
        LocalFunctionNameIsShown = false;
        InputParameterSelectorIsShown = false;

        TreePathToIdMapping = TreeHelper.BuildTreePathToIdDictionary(FunctionMarkup);

        if (_state.AllowSelectingInputParameters)
        {
            InputParameterNodeIDs = CalculateGetInputParamaterFunctionCalls(FunctionMarkup, TreePathToIdMapping);
        }

        if (_state.WidgetFunctionSelection) {
            var functionName = ((IEnumerable)FunctionMarkup.XPathEvaluate("//*[local-name()='widgetfunction']/@name")).Cast<XAttribute>().Select(d => d.Value).FirstOrDefault();
            btnSetNewFunction.Attributes["value"] = functionName;
        }

    }

    public void OnMessage()
    {
        string message = ctlFeedback.GetPostedMessage();

        if (message == "save")
        {
            ctlFeedback.SetStatus(EditorMode == EditorModeEnum.Source ? SaveSourceMarkupChanges() : ValidateSave());
        }
        else if (message == "persist")
        {
            ctlFeedback.SetStatus(EditorMode == EditorModeEnum.Source ? SaveSourceMarkupChanges() : true);
        }
    }

    /// <summary>
    /// Searches for parameter values that are required but not set.
    /// </summary>
    /// <returns></returns>
    private bool ValidateSave()
    {
        return ValidateMarkup(FunctionMarkup, true);
    }

    /// <summary>
    /// Searches for parameter values that are required but not set.
    /// </summary>
    /// <returns></returns>
    private bool ValidateMarkup(XDocument markup, bool checkRequiredParameters)
    {
        foreach (XElement functionCall in markup.Descendants(FunctionNodeXName))
        {
            // Checking if function exists
            IMetaFunction metaFunction = TreeHelper.GetFunction(functionCall);
            if (metaFunction == null)
            {
                XAttribute nameAttr = functionCall.Attribute("name");
                string functionName = nameAttr != null ? nameAttr.Value : string.Empty;

                Alert(GetString("FunctionNotFound").FormatWith(functionName));
                FocusTreeNode(functionCall);
                return false;
            }

            List<string> undefinedParameters = TreeHelper.GetUndefinedParameterNames(functionCall).ToList();

            // Checking that all required parameters are set
            if (checkRequiredParameters)
            {
                foreach (ParameterProfile parameter in metaFunction.ParameterProfiles)
                {
                    if (parameter.IsRequired && undefinedParameters.Contains(parameter.Name) && !parameter.IsInjectedValue)
                    {
                        FocusTreeNode(functionCall, parameter.Name);
                        Alert(GetString("RequiredParameterNotDefined").FormatWith(parameter.LabelLocalized));
                        return false;
                    }
                }
            }

            // Checking type compatibility
            XElement parentNode = functionCall.Parent;
            if (parentNode.Name == ParameterNodeXName)
            {
                string parameterName = parentNode.Attribute("name").Value;

                IMetaFunction parentFunctionCall = TreeHelper.GetFunction(functionCall.Parent.Parent);
                ParameterProfile parameterProfile = parentFunctionCall.ParameterProfiles.FirstOrDefault(pr => pr.Name == parameterName);

                Verify.IsNotNull(parameterProfile, "Failed to get profile for parameter '{1}' on '{0}' function.".FormatWith(parentFunctionCall.Name, parameterName));

                Type functionReturnType = metaFunction.ReturnType;
                Type parameterType = parameterProfile.Type;
                if (!parameterType.IsAssignableFrom(functionReturnType)
                    && !functionReturnType.IsAssignableFrom(parameterType))
                {
                    FocusTreeNode(functionCall);
                    Alert(GetString("IncorrectTypeCast").FormatWith(parameterName, metaFunction.Name));
                    return false;
                }
            }
        }

        return true;
    }



    private void FocusTreeNode(XElement functionNode, string parameterName)
    {
        string functionPath = TreeHelper.GetElementToPathMap(FunctionMarkup)[functionNode];

        string parameterPath = TreeHelper.GetParameterPath(functionPath, parameterName);

        SelectedNode = parameterPath;
    }

    private void FocusTreeNode(XElement node)
    {
        string functionPath = TreeHelper.GetElementToPathMap(FunctionMarkup)[node];

        SelectedNode = functionPath;
    }

    private void Alert(string message)
    {
        string consoleId = _state.ConsoleId;
        if (consoleId.IsNullOrEmpty()) return;

        ConsoleMessageQueueFacade.Enqueue(
            new MessageBoxMessageQueueItem
            {
                DialogType = DialogType.Error,
                Message = message,
                Title = GetString("ValidationFailedAlertTitle")
            }, consoleId);
    }

    private void LoadState()
    {
        var stateProvider = SessionStateManager.GetProvider(SessionStateProviderName);

        if (!stateProvider.TryGetState(StateId, out _state))
        {
            throw new InvalidOperationException("Failed to get load session state");
        }
    }

    private void LoadFunctions()
    {
        LoadState();

        List<NamedFunctionCall> functionCalls = _state.FunctionCalls;

        Verify.IsNotNull(functionCalls, "Failed to get function calls");

        XElement functionsNode = XElement.Parse("<functions />");

        foreach (var localNamedFunctionCall in functionCalls)
        {
            Guid handle = Guid.NewGuid();

            BaseFunctionRuntimeTreeNode functionRuntime = localNamedFunctionCall.FunctionCall;

            XElement function = functionRuntime.Serialize();
            if (_state.AllowLocalFunctionNameEditing)
            {
                function.Add(new XAttribute("localname", localNamedFunctionCall.Name));
            }

            function.Add(new XAttribute("handle", handle));

            functionsNode.Add(function);
        }

        PrettifyXmlNamespacePrefixes(functionsNode);


        FunctionMarkup = new XDocument(functionsNode);
    }

    private void SaveChanges()
    {
        if (IsInTestMode)
        {
            return;
        }

        List<NamedFunctionCall> functionList = new List<NamedFunctionCall>();

        foreach (XElement functionElement in FunctionMarkup.Root.Elements())
        {
            BaseFunctionRuntimeTreeNode functionDefinition = (BaseFunctionRuntimeTreeNode)FunctionTreeBuilder.Build(functionElement);

            if (_state.WidgetFunctionSelection)
            {
                functionList.Add(new NamedFunctionCall(string.Empty, functionDefinition));
            }
            else
            {
                var localNameAttr = functionElement.Attribute("localname");
                string localname = localNameAttr == null ? string.Empty : localNameAttr.Value;

                functionList.Add(new NamedFunctionCall(localname, functionDefinition));
            }
        }

        var stateProvider = SessionStateManager.GetProvider(SessionStateProviderName);

        _state.FunctionCalls = functionList;
        stateProvider.SetState<IFunctionCallEditorState>(StateId, _state, DateTime.Now.Add(SessionExpirationPeriod));

        // Updating tree IDs
        Dictionary<XElement, string> newElementToPathMap = TreeHelper.GetElementToPathMap(FunctionMarkup);

        var newPathToIdMap = new Dictionary<string, string>();

        foreach (KeyValuePair<XElement, string> kvp in newElementToPathMap)
        {
            XElement node = kvp.Key;
            string nodePath = kvp.Value;

            if (_xElementTreeNodeIDs.ContainsKey(node))
            {
                string nodeId = _xElementTreeNodeIDs[node];
                newPathToIdMap.Add(nodePath, nodeId);

                // Copying virtual IDs 
                if (node.Name == FunctionNodeXName || node.Name == WidgetFunctionNodeXName)
                {
                    foreach (string parameterName in TreeHelper.GetUndefinedParameterNames(node))
                    {
                        string newVirtualParameterPath = TreeHelper.GetParameterPath(nodePath, parameterName);

                        string oldFunctionPath = TreePathToIdMapping.Where(p => p.Value == nodeId).Select(p => p.Key).First();
                        string oldVirtualParameterPath = TreeHelper.GetParameterPath(oldFunctionPath, parameterName);

                        if (TreePathToIdMapping.ContainsKey(oldVirtualParameterPath))
                        {
                            newPathToIdMap.Add(newVirtualParameterPath, TreePathToIdMapping[oldVirtualParameterPath]);
                        }
                        else
                        {
                            newPathToIdMap.Add(newVirtualParameterPath, TreeHelper.GetNewId());
                        }
                    }
                }
            }
            else
            {
                string nodeId;
                if (node.Name == ParameterNodeXName && TreePathToIdMapping.ContainsKey(nodePath))
                {
                    nodeId = TreePathToIdMapping[nodePath];
                }
                else
                {
                    nodeId = TreeHelper.GetNewId();
                }
                newPathToIdMap.Add(nodePath, nodeId);

                // Creating IDs for virtual parameter nodes
                if (node.Name == FunctionNodeXName || node.Name == WidgetFunctionNodeXName)
                {
                    foreach (string parameterName in TreeHelper.GetUndefinedParameterNames(node))
                    {
                        string newVirtualParameterPath = TreeHelper.GetParameterPath(nodePath, parameterName);
                        newPathToIdMap.Add(newVirtualParameterPath, TreeHelper.GetNewId());
                    }
                }
            }
        }

        TreePathToIdMapping = newPathToIdMap;
    }



    private void SyncTreeAndEditingPanel()
    {
        //Select first parameter if not selected
        //TODO: refactor this
        if (Request.UserAgent.IndexOf("MSIE ", System.StringComparison.Ordinal) == -1) // skip IE
        {
            if (SelectedNode.IsNullOrEmpty() && TreePathToIdMapping.Count > 1)
            {
                SelectedNode = TreePathToIdMapping.Keys.Skip(1).FirstOrDefault();
                _xElementTreeNodeIDs = TreeHelper.GetElementToIdMap(FunctionMarkup, TreePathToIdMapping);
            }
        }

        // Building tree 
        XDocument functionMarkup = Clone(FunctionMarkup);
        XElement updatedTreeView = UpdateTreeView(functionMarkup.Root);

        // Building an editing panel
        if (!SelectedNode.IsNullOrEmpty())
        {
            UpdateEditingPanel(updatedTreeView, SelectedNode);
        }

        btnSetNewFunction.Attributes.Add("dialoglabel", SetNewFunctionDialogLabel);
        btnAddFunction.Attributes.Add("dialoglabel", AddNewFunctionDialogLabel);
        btnAddFunction.Attributes["isdisabled"] = (_state.MaxFunctionAllowed > FunctionMarkup.Root.Elements().Count()) ? "false" : "true";


        bool singleFunctionSelection = _state.MaxFunctionAllowed == 1;
        btnSetNewFunction.Visible = singleFunctionSelection;
        btnAddFunction.Visible = !singleFunctionSelection;

        var visibleButton = singleFunctionSelection ? btnSetNewFunction : btnAddFunction;

        Type[] allowedTypes = _state.AllowedResultTypes;

        visibleButton.Attributes.Add("providersearch", AllFunctionsElementProviderSearchToken.Build(allowedTypes).Serialize());
        visibleButton.Attributes.Add("selectwidget", _state.WidgetFunctionSelection ? "true" : "false");

        // Updating "source xml" field
        functionMarkup = Clone(FunctionMarkup);
        foreach (XElement element in functionMarkup.Descendants().ToList())
        {
            var attr = element.Attribute("handle");
            if (attr != null)
            {
                attr.Remove();
            }
        }

        PrettifyXmlNamespacePrefixes(functionMarkup);

        var utf8 = System.Text.Encoding.UTF8;
        var xmlWriterSettings = new XmlWriterSettings
        {
            Indent = true,
            IndentChars = "\t",
            NamespaceHandling = NamespaceHandling.OmitDuplicates,
            Encoding = utf8
        };

        byte[] serializedXDocument;

        using (MemoryStream stream = new MemoryStream())
        {
            using (XmlWriter writer = XmlWriter.Create(stream, xmlWriterSettings))
            {
                functionMarkup.Save(writer);
            }
            serializedXDocument = stream.ToArray();
        }

        string serializedMarkup = utf8.GetString(serializedXDocument);
        serializedMarkup = serializedMarkup.Substring(serializedMarkup.IndexOf(Environment.NewLine) + Environment.NewLine.Length);

        //Update editor if switching to SourceMode
        if (Request["__EVENTARGUMENT"] == "source")
            ctlSourceEditor.Attributes["value"] = Context.Server.UrlEncode(serializedMarkup).Replace("+", "%20");

        if (IsInTestMode)
        {
            ViewState[FunctionMarkupSessionKey] = serializedMarkup;
        }
    }

    private void UpdateInputParameterName()
    {
        string nodeID = SelectedNode;

        XElement parameterNode = TreeHelper.FindByPath(FunctionMarkup.Root, nodeID);

        string selectedParameterName = Request.Form["lstInputParameterName"];

        // Updating param/function[@name='Composite.Utils.GetInputParameter']/param[@name='InputParameterName']/@value

        var parameterNameNode = parameterNode.Descendants(ParameterNodeXName).First();
        parameterNameNode.Attribute("value").Value = selectedParameterName ?? string.Empty;

        SaveChanges();
    }

    private void UpdateFunctionLocalName()
    {
        string nodeID = SelectedNode;

        XElement functionNode = TreeHelper.FindByPath(FunctionMarkup.Root, nodeID);

        functionNode.SetAttributeValue("localname", txtLocalName.Text);

        SaveChanges();
    }

    private void UpdateParameterValueFromWidget()
    {
        string nodeID = SelectedNode;

        XElement parameterNode = TreeHelper.FindByPath(FunctionMarkup.Root, nodeID);
        if (parameterNode == null) return;
        Verify.That(parameterNode != null, "Failed to get a parameter by path '{0}'", nodeID);

        string parameterName = parameterNode.Attribute("name").Value;

        XElement functionNode = parameterNode.Parent;
        IMetaFunction function = TreeHelper.GetFunction(functionNode);

        ParameterProfile parameterProfile = function.ParameterProfiles.FirstOrDefault(p => p.Name == parameterName);

        // Creating a widget instance
        object defaultParameterValue = parameterProfile.GetDefaultValue();
        var bindings = new Dictionary<string, object> { { parameterProfile.Name, defaultParameterValue } };


        var formTreeCompiler = FunctionUiHelper.BuildWidgetForParameters(
            new[] { parameterProfile },
            bindings,
            "FORM" + SelectedNode.GetHashCode(),
            "",
            WebManagementChannel.Identifier);

        // The control is temporary added to page, so it will get a correct ID
        var webUiControl = (IWebUiControl)formTreeCompiler.UiControl;
        var webControl = webUiControl.BuildWebControl();

        plhWidget.Controls.Add(webControl);

        // Loading control's post data
        LoadPostBackData(webControl);

        formTreeCompiler.SaveControlProperties();

        plhWidget.Controls.Clear();

        object newValue = bindings[parameterProfile.Name];

        bool newValueNotEmpty = newValue != null 
                                && (!(newValue is IList) || ((IList)newValue).Count > 0)
                                && !(parameterProfile.IsRequired && newValue as string == string.Empty);

        parameterNode.Remove();

        if (newValueNotEmpty)
        {
            var newConstantParam = new ConstantObjectParameterRuntimeTreeNode(parameterProfile.Name, newValue);

            functionNode.Add(newConstantParam.Serialize());
        }

        SaveChanges();
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


    private void BtnDefaultClicked(XElement parameterNode)
    {
        if (parameterNode != null)
        {
            parameterNode.Remove();

            SaveChanges();
        }
    }

    private void ParameterValueTypeChanged(ParameterValueType valueType)
    {
        string nodePath = SelectedNode;

        int parameterOffset = nodePath.LastIndexOf("@", System.StringComparison.Ordinal);
        string functionPath = nodePath.Substring(0, parameterOffset - 1);
        string parameterName = nodePath.Substring(parameterOffset + 1);

        XElement functionNode = TreeHelper.FindByPath(FunctionMarkup.Root, functionPath);
        XElement parameterNode = functionNode.Elements(ParameterNodeXName).FirstOrDefault(element => element.Attribute("name").Value == parameterName);

        string nodeID = TreePathToIdMapping[nodePath];

        if (_state.AllowSelectingInputParameters)
        {
            if (valueType != ParameterValueType.InputParameter)
            {
                InputParameterNodeIDs.Remove(nodeID);
            }
            else
            {
                if (!InputParameterNodeIDs.Contains(nodeID))
                {
                    InputParameterNodeIDs.Add(nodeID);
                }
            }
        }

        if (valueType == ParameterValueType.Default)
        {
            BtnDefaultClicked(parameterNode);
        }
        else if (valueType == ParameterValueType.Constant)
        {
            BtnConstantClicked(functionNode, parameterNode, parameterName);
        }
        else if (valueType == ParameterValueType.FunctionCall)
        {
            BtnFunctionCallClicked(functionNode, parameterNode, parameterName);
        }
        else if (valueType == ParameterValueType.InputParameter)
        {
            BtnInputParameterClicked(functionNode, parameterNode, parameterName);
        }
    }

    private void BtnConstantClicked(XElement functionNode, XElement parameterNode, string parameterName)
    {
        IMetaFunction function = TreeHelper.GetFunction(functionNode);
        ParameterProfile parameterProfile = function.ParameterProfiles.FirstOrDefault(p => p.Name == parameterName);
        Verify.IsNotNull(parameterProfile, "Failed to get parameter profile");

        if (parameterNode != null)
        {
            parameterNode.Remove();
        }

        object defaultParameterValue = parameterProfile.GetDefaultValue();

        var newConstantParam = new ConstantObjectParameterRuntimeTreeNode(parameterProfile.Name, defaultParameterValue ?? string.Empty);
        functionNode.Add(newConstantParam.Serialize());

        SaveChanges();
    }

    private void BtnSetNewFunctionCallClicked()
    {
        string selectedFunctionName = this.Request.Form["btnSetNewFunction"];

        FunctionMarkup.Root.RemoveAll();

        IMetaFunction metaFunction;
        AddFunctionCall(selectedFunctionName, out metaFunction);

        // If function has no parameters, focusing on it, otherwise client will automatically focus on the first parameter
        if (!metaFunction.ParameterProfiles.Any())
        {
            FocusTreeNode(FunctionMarkup.Root.Elements().Last());
        }
        else
        {
            SelectedNode = null;
        }

        SaveChanges();
    }

    private void BtnAddFunctionCallClicked()
    {
        string selectedFunctionName = this.Request.Form["btnAddFunction"];

        IMetaFunction metaFunction;
        AddFunctionCall(selectedFunctionName, out metaFunction);

        SaveChanges();
    }

    private void AddFunctionCall(string functionName, out IMetaFunction metaFunction)
    {
        BaseFunctionRuntimeTreeNode functionRuntime;

        if (_state.WidgetFunctionSelection)
        {
            IWidgetFunction widgetFunction = FunctionFacade.GetWidgetFunction(functionName);
            functionRuntime = new WidgetFunctionRuntimeTreeNode(widgetFunction);

            metaFunction = widgetFunction;
        }
        else
        {
            IFunction functionInfo = FunctionFacade.GetFunction(functionName);
            functionRuntime = new FunctionRuntimeTreeNode(functionInfo);

            metaFunction = functionInfo;
        }

        XElement function = functionRuntime.Serialize();

        if (!_state.WidgetFunctionSelection && _state.AllowLocalFunctionNameEditing)
        {
            string localName = functionName;
            int pointOffset = localName.LastIndexOf(".", StringComparison.Ordinal);
            if (pointOffset > 0 && pointOffset < localName.Length - 1)
            {
                localName = localName.Substring(pointOffset + 1);
            }
            string uniqueLocalName = localName;
            int retry = 1;
            while (FunctionMarkup.Descendants().Attributes("localname").Any(a => a.Value == uniqueLocalName))
            {
                uniqueLocalName = string.Format("{0}{1}", localName, ++retry);
            }

            function.Add(new XAttribute("localname", uniqueLocalName));
        }

        function.Add(new XAttribute("handle", Guid.NewGuid()));

        FunctionMarkup.Root.Add(function);
    }

    private void BtnInputParameterClicked(XElement functionNode, XElement parameterNode, string parameterName)
    {
        if (parameterNode != null)
        {
            parameterNode.Remove();
        }

        // Adding function call - GetInputParameter(InputParameterName = "...")

        IFunction getInputParameterFunc = FunctionFacade.GetFunction(GetInputParameterFunctionName);


        IMetaFunction function = TreeHelper.GetFunction(functionNode);
        ParameterProfile parameterProfile = function.ParameterProfiles.FirstOrDefault(p => p.Name == parameterName);
        var selectedParameter = _state.Parameters.FirstOrDefault(ip => InputParameterCanBeAssigned(parameterProfile.Type, ip.Type));
        string selectedParameterName = selectedParameter != null ? selectedParameter.Name : string.Empty;


        var newElement = new FunctionParameterRuntimeTreeNode(parameterName, new FunctionRuntimeTreeNode(getInputParameterFunc)).Serialize();
        functionNode.Add(newElement);

        var inputParameterNameNode = new ConstantObjectParameterRuntimeTreeNode(GetInputParameterFunctionParameterName, selectedParameterName).Serialize();
        newElement.Elements().First().Add(inputParameterNameNode);

        SaveChanges();
    }

    private void BtnFunctionCallClicked(XElement functionNode, XElement parameterNode, string parameterName)
    {
        if (parameterNode != null)
        {
            parameterNode.Remove();
        }

        // Adding function call to the xml
        string selectedFunction = btnFunctionCall.Value;
        IFunction newFunction = FunctionFacade.GetFunction(selectedFunction);

        functionNode.Add(new FunctionParameterRuntimeTreeNode(parameterName, new FunctionRuntimeTreeNode(newFunction)).Serialize());

        SaveChanges();
    }

    private void BtnDeleteFunctionClicked()
    {
        string nodeID = SelectedNode;

        var root = FunctionMarkup.Root;
        XElement functionNode = TreeHelper.FindByPath(FunctionMarkup.Root, nodeID);

        if (functionNode != null && functionNode.Parent == root)
        {
            functionNode.Remove();

            SaveChanges();

            SelectedNode = null; // Or something else

            UpdateEditingPanel(null, string.Empty);
        }
    }

    private void UpdateEditingPanel(XElement document, string nodeID)
    {
        WidgetIsShown = false;
        LocalFunctionNameIsShown = false;
        InputParameterSelectorIsShown = false;

        if (string.IsNullOrEmpty(nodeID))
        {
            mlvMain.SetActiveView(viewNoSelection);
            return;
        }

        bool isParameter = nodeID.LastIndexOf("@") > nodeID.LastIndexOf("/");

        string functionID = isParameter ? nodeID.Substring(0, nodeID.LastIndexOf("/")) : nodeID;

        var function = TreeHelper.FindByPath(document, functionID);

        Verify.That(function != null, "Failed to get a function by path '{0}'", functionID);

        if (isParameter)
        {
            string parameterName = nodeID.Substring(nodeID.LastIndexOf("@") + 1);
            ShowParameterData(function, parameterName, nodeID);
            return;
        }

        ShowFunctionData(function);
    }

    private static bool InputParameterCanBeAssigned(Type parameterType, Type inputParameterType)
    {
        return inputParameterType == typeof(object)
        || (parameterType == typeof(string)
            && (inputParameterType == typeof(int) || inputParameterType == typeof(DateTime)))
        || parameterType.IsAssignableFrom(inputParameterType);
    }

    private void ShowParameterData(XElement functionNode, string parameterName, string fullParameterPath)
    {
        mlvMain.SetActiveView(viewParameter);
       
        IMetaFunction function = TreeHelper.GetFunction(functionNode);

        ParameterProfile parameterProfile = function.ParameterProfiles.FirstOrDefault(p => p.Name == parameterName);

        // Configuring function selection dialog
        var searchToken = new AllFunctionsElementProviderSearchToken
        {
            // NOTE: shoudn't expose implementation details
            AcceptableTypes = TypeManager.TrySerializeType(parameterProfile.Type)
        };
        btnFunctionCall.Attributes.Add("providersearch", searchToken.Serialize());
        btnFunctionCall.Attributes.Add("dialoglabel", SelectFunctionDialogLabel.FormatWith(parameterProfile.Name));


        txtFieldName.Text = Server.HtmlEncode(StringResourceSystemFacade.ParseString(parameterProfile.Label));
        txtFieldType.Text = Server.HtmlEncode(parameterProfile.Type.GetShortLabel());
        txtFieldDescription.Text = Server.HtmlEncode(StringResourceSystemFacade.ParseString(parameterProfile.HelpDefinition.HelpText));

        XElement parameterNode = TreeHelper.GetParameterNode(functionNode, parameterName);


        if (!_state.AllowSelectingInputParameters)
        {
            btnInputParameter.Visible = false;
        }
        else
        {
            // Input parameter selector should be awaliable only if there's a parameter of an appropriate type
            bool inputParameterSelectorAvailable = _state.Parameters.Any(ip => InputParameterCanBeAssigned(parameterProfile.Type, ip.Type));
            if (!inputParameterSelectorAvailable)
            {
                btnInputParameter.Attributes["isdisabled"] = "true";
            }
        }

        if (parameterProfile.IsRequired && !parameterProfile.IsInjectedValue)
        {
            btnDefault.Visible = false;

            // If parameter is required, has no value and a widget is available - the widget should be shown by default.
            if (parameterNode == null
                && parameterProfile.WidgetFunction != null)
            {
                ParameterValueTypeChanged(ParameterValueType.Constant);

                parameterNode = TreeHelper.FindByPath(FunctionMarkup.Root, fullParameterPath);
            }
        }

        if (parameterProfile.WidgetFunction == null)
        {
            btnConstant.Attributes["isdisabled"] = "true";
        }

        if (parameterNode == null)
        {
            mlvWidget.Visible = false;

            btnDefault.Attributes["isdisabled"] = "true";
            return;
        }

        if (parameterNode.Attribute(SelectedInputParameter_AttributeName) != null)
        {
            ShowInputParameterSelector(parameterProfile, parameterNode);
            mlvWidget.Visible = true;
            return;
        }

        if (parameterNode.Elements(FunctionNodeXName).Any())
        {
            // function call should be shown
            btnFunctionCall.Attributes["class"] = "selected";

            mlvWidget.Visible = false;
            return;
        }

        // Constant (or input parameter), widget should be shown
        btnConstant.Attributes["isdisabled"] = "true";
  
        object parameterValue = FunctionMarkupHelper.GetParameterValue(parameterNode, parameterProfile);

        if (parameterProfile.Type.IsLazyGenericType() && parameterValue != null)
        {
            parameterValue = parameterProfile.Type.GetProperty("Value").GetGetMethod().Invoke(parameterValue, null);
        }

        // Adding a widget
        var bindings = new Dictionary<string, object> { { parameterProfile.Name, parameterValue } };

        var formTreeCompiler = FunctionUiHelper.BuildWidgetForParameters(
            new[] { parameterProfile },
            bindings,
            "FORM" + SelectedNode.GetHashCode(),
            "",
            WebManagementChannel.Identifier);

        IWebUiControl webUiControl = (IWebUiControl)formTreeCompiler.UiControl;

        var fieldGroupControl = webUiControl.BuildWebControl();
        var fieldGroupControlBase = fieldGroupControl as ContainerTemplateUserControlBase;

        // Preventing <ui:fields> tag from rendering
        fieldGroupControlBase.Settings.Add("RenderFieldsTag", false);
        // Overwriting field label
        fieldGroupControlBase.Settings.Add("FieldLabel", GetString("ParameterValueLabel"));

        mlvWidget.Visible = true;
        mlvWidget.SetActiveView(viewWidget_Constant);
        //viewWidget_Constant.Visible = true;
        plhWidget.Visible = true;
        plhWidget.Controls.Add(fieldGroupControl);

        if (IsPostBack && Context.Request.Form["__EVENTTARGET"].StartsWith(webUiControl.UiControlID + "$"))
        {
            webUiControl.BindStateToControlProperties();
        }
        else
        {
            webUiControl.InitializeViewState();
        }

        mlvWidget.SetActiveView(viewWidget_Constant);

        WidgetIsShown = true;
    }


    private static bool FunctionIsOnTopLevel(XElement functionNode)
    {
        return functionNode.Parent.Name.LocalName == "functions";
    }


    private void ShowInputParameterSelector(ParameterProfile parameterProfile, XElement parameterName)
    {
        // string inputParameterName = functionNode.Elements().First().Attribute("value").Value;

        btnInputParameter.Attributes["isdisabled"] = "true";
        btnInputParameter.Attributes["class"] = "selected";

        mlvWidget.SetActiveView(viewWidget_InputParameter);

        lstInputParameterName.Items.Clear();

        foreach (var parameter in _state.Parameters)
        {
            if (InputParameterCanBeAssigned(parameterProfile.Type, parameter.Type))
            {
                lstInputParameterName.Items.Add(parameter.Name);
            }
        }

        lstInputParameterName.SelectedValue = parameterName.Attribute(SelectedInputParameter_AttributeName).Value;

        InputParameterSelectorIsShown = true;
    }

    private void ShowFunctionData(XElement functionNode)
    {
        IMetaFunction function = TreeHelper.GetFunction(functionNode);

        txtFunctionName.Text = Server.HtmlEncode(function.Name);
        txtFunctionReturnType.Text = Server.HtmlEncode(function.ReturnType.GetShortLabel());
        txtFunctionDescription.Text = Server.HtmlEncode(StringResourceSystemFacade.ParseString(function.Description));

        if (FunctionIsOnTopLevel(functionNode) && _state.AllowLocalFunctionNameEditing)
        {
            plhEditLocalName.Visible = true;

            string localFunctionName = functionNode.Attribute("localname").Value;
            txtLocalName.Text = localFunctionName;

            LocalFunctionNameIsShown = true;
        }
        else
        {
            plhEditLocalName.Visible = false;
        }
        mlvMain.SetActiveView(viewFunction);
    }

    private XElement CopyWithId(XElement source)
    {
        XElement copy = new XElement(source);

        Dictionary<XElement, string> elementToPathMap = TreeHelper.GetElementToPathMap(copy);

        foreach (XElement element in elementToPathMap.Keys)
        {
            string elementPath = elementToPathMap[element];

            Verify.That(TreePathToIdMapping.ContainsKey(elementPath), "There's no tree ID assigned to element '{0}'", elementPath);
            string treeNodeId = TreePathToIdMapping[elementPath];

            element.Add(new XAttribute("id", treeNodeId),
                        new XAttribute("path", elementPath));
        }

        return copy;
    }

    private void UpdateMenu()
    {
        string selectedNode = SelectedNode;

        bool rootFunctionSelected = selectedNode != null && !selectedNode.Contains("@");
        btnDeleteFunction.Attributes["isdisabled"] = (!rootFunctionSelected) ? "true" : "false";
    }

    public bool SaveSourceMarkupChanges()
    {
        string markup = Context.Request.Form["ctlSourceEditor"];
        if (markup.IsNullOrEmpty())
        {
            return false;
        }

        markup = Context.Server.UrlDecode(markup);

        XDocument newMarkup;
        try
        {
            newMarkup = XDocument.Parse(markup);
        }

        catch (Exception e)
        {
            Log.LogError("FunctionCallEditor", e);
            Alert("Failed to parse the markup");
            return false;
        }

        try
        {
            if (!ValidateMarkup(newMarkup, false))
                return false;
        }
        catch (Exception e)
        {
            Alert(e.Message);
            return false;
        }


        FunctionMarkup = newMarkup;

        InitializeTreeView();

        SaveChanges();

        //Leave selected node if exists in murkup
        if (SelectedNode != null && !TreePathToIdMapping.ContainsKey(SelectedNode))
        {
            SelectedNode = null;
        }

        return true;
    }

    private XElement UpdateTreeView(XElement functionMarkupContainer)
    {
        // TODO: Do some compiled xslt caching

        XElement treeInput = CopyWithId(functionMarkupContainer);

        treeInput.Add(GetFunctionDescriptionElements(functionMarkupContainer));

        if (_state.AllowSelectingInputParameters)
        {
            CollapseGetInputParamaterFunctionCalls(treeInput, InputParameterNodeIDs);
        }

        // treeInput.Save(Request.MapPath("out.tmp.xml"));

        string xslFilePath = Request.MapPath("functioneditortree.xslt");
        XslCompiledTransform transform = GetTransformation(xslFilePath);

        var xsltTransformArguments = new XsltArgumentList();
        xsltTransformArguments.AddExtensionObject(XsltExtensionObjectNamespace, new TreeRenderingXsltExtensionObject(TreePathToIdMapping));
        xsltTransformArguments.AddParam("SelectedId", string.Empty, SelectedNode.IsNullOrEmpty() ? string.Empty : TreePathToIdMapping[SelectedNode]);

        XDocument transformedDoc = new XDocument();

        using (XmlWriter writer = transformedDoc.CreateWriter())
        {
            transform.Transform(treeInput.CreateReader(), xsltTransformArguments, writer);
        }

        WriteTo(transformedDoc, this.TreePlaceholder);

        return treeInput;
    }

    private XslCompiledTransform GetTransformation(string xsltFilePath)
    {
        string transformationCacheKey = "Compiled" + xsltFilePath;
        var cache = HttpContext.Current.Cache;

        var transform = cache[transformationCacheKey] as XslCompiledTransform;
        if (transform == null)
        {
            lock (this.GetType())
            {
                transform = cache[transformationCacheKey] as XslCompiledTransform;
                if (transform == null)
                {
                    transform = XsltServices.GetCompiledXsltTransform(xsltFilePath);
                    cache.Add(transformationCacheKey,
                        transform,
                        new CacheDependency(xsltFilePath),
                        DateTime.MaxValue,
                        TimeSpan.FromDays(1.0),
                        CacheItemPriority.Default,
                        null);
                }
            }
        }
        return transform;
    }

    private HashSet<string> CalculateGetInputParamaterFunctionCalls(XDocument functionCalls, Dictionary<string, string> pathToIdMapping)
    {
        Verify.That(_state.AllowSelectingInputParameters, "Invalid function call");

        var result = new HashSet<string>();

        List<string> availableParameters = _state.Parameters.Select(parameter => parameter.Name).ToList();

        var elementToPathMap = TreeHelper.GetElementToPathMap(functionCalls);
        foreach (XElement parameterElement in functionCalls.Descendants(ParameterNodeXName))
        {
            XElement functionNode = parameterElement.Elements().FirstOrDefault();
            if (functionNode == null
                || functionNode.Attribute("name") == null
                || functionNode.Attribute("name").Value != GetInputParameterFunctionName)
            {
                continue;
            }

            XElement inputParameterNameNode = functionNode.Elements(ParameterNodeXName).FirstOrDefault();
            if (inputParameterNameNode == null)
            {
                continue;
            }

            var parameterNameAttr = inputParameterNameNode.Attribute("value");
            if (parameterNameAttr == null
                || string.IsNullOrEmpty(parameterNameAttr.Value)
                || !availableParameters.Contains(parameterNameAttr.Value))
            {
                continue;
            }

            result.Add(pathToIdMapping[elementToPathMap[parameterElement]]);
        }

        return result;
    }

    /// <summary>
    /// Removes nodes that are related to "GetInputParameter" function calls, which are invisible in the tree
    /// </summary>
    /// <param name="root"></param>
    private static void CollapseGetInputParamaterFunctionCalls(XElement root, HashSet<string> inputParameterNodeIDs)
    {
        Func<XElement, bool> isUnnestedFunction10 = f => f.Ancestors().All(g => g.Name.Namespace == Namespaces.Function10 || g.Parent == null);
        List<XElement> parameterNodes = root.Descendants(ParameterNodeXName).Where(isUnnestedFunction10).ToList();

        var toBeRemoved = new List<XElement>();

        foreach (XElement parameterElement in parameterNodes)
        {
            string nodeId = parameterElement.Attribute("id").Value;
            if (!inputParameterNodeIDs.Contains(nodeId)) continue;

            XElement functionNode = parameterElement.Elements().FirstOrDefault();
            if (functionNode == null
                || (string) functionNode.Attribute("name") != GetInputParameterFunctionName) continue;

            XAttribute parameterNameAttr = functionNode.Elements().First().Attribute("value");

            // If parameter value isn't a constant - continue
            if (parameterNameAttr == null) continue;

            string parameterName = parameterNameAttr.Value;

            toBeRemoved.Add(functionNode);
            parameterElement.Add(new XAttribute(SelectedInputParameter_AttributeName, parameterName));
        }

        toBeRemoved.ForEach(element => element.Remove());
    }

    private IEnumerable<XElement> GetFunctionDescriptionElements(XElement functionMarkupToDescribe)
    {
        XElement unexpected = functionMarkupToDescribe.Elements().FirstOrDefault(f => f.Name != FunctionNodeXName && f.Name != WidgetFunctionNodeXName);
        if (unexpected != null)
        {
            throw new InvalidOperationException(string.Format("Provided function markup contained unexpected element name '{0}' at root.elements level.", unexpected.Name));
        }

        foreach (XElement element in functionMarkupToDescribe.Descendants())
        {
            element.Add(new XAttribute("xpath", element.GetXPath()));
        }


        string[] uniqueFunctionNames = functionMarkupToDescribe.Descendants(FunctionNodeXName).Select(f => f.Attribute("name").Value).Distinct().ToArray();
        string[] uniqueWidgetFunctionNames = functionMarkupToDescribe.Descendants(WidgetFunctionNodeXName).Select(f => f.Attribute("name").Value).Distinct().ToArray();

        List<IMetaFunction> toBeDescribed =
            uniqueFunctionNames
            .Select(functionName => FunctionFacade.GetFunction(functionName) as IMetaFunction)
            .Union(uniqueWidgetFunctionNames
                  .Select(functionName => FunctionFacade.GetWidgetFunction(functionName) as IMetaFunction))
            .ToList();


        var allFunctionDescriptions = new List<XElement>();

        foreach (IMetaFunction function in toBeDescribed)
        {
            var functionDescription = new XElement(functionDescriptionNs + "function"
                , new XAttribute("compositename", function.CompositeName())
                , new XAttribute("name", function.Name)
                , new XAttribute("namespace", function.Namespace)
                , new XAttribute("description", function.DescriptionLocalized() ?? "")
                , new XAttribute("returntypelabel", function.ReturnType.GetShortLabel()));

            foreach (ParameterProfile parameter in function.ParameterProfiles)
            {
                var parameterDescription = new XElement(functionDescriptionNs + "param"
                    , new XAttribute("name", parameter.Name)
                    , new XAttribute("typelabel", parameter.Type.GetShortLabel())
                    , new XAttribute("label", parameter.LabelLocalized)
                    , new XAttribute("required", parameter.IsRequired && !parameter.IsInjectedValue)
                    , new XAttribute("description", parameter.HelpDefinition.GetLocalized().HelpText));

                functionDescription.Add(parameterDescription);
            }

            allFunctionDescriptions.Add(functionDescription);
        }

        return allFunctionDescriptions;
    }

    private void WriteTo(XContainer markupSource, Control targetControl)
    {
        targetControl.Controls.Add(new LiteralControl(markupSource.ToString()));
    }


    private static XDocument Clone(XDocument document)
    {
        return new XDocument(CloneElement(document.Root));
    }

    private static XElement CloneElement(XElement element)
    {
        return new XElement(element.Name, element.Attributes(),
            element.Nodes().Select(n =>
            {
                XElement e = n as XElement;
                if (e != null)
                    return CloneElement(e);
                return n;
            }
            )
        );
    }

    protected static string GetString(string localPart)
    {
        return StringResourceSystemFacade.GetString("Composite.Web.FormControl.FunctionCallsDesigner", localPart);
    }

    protected string EventTarget
    {
        get
        {
            return IsPostBack ? Request.Form["__EVENTTARGET"] : string.Empty;
        }
    }

    public class TreeRenderingXsltExtensionObject
    {
        private readonly Dictionary<string, string> _pathToIdMapping;

        public TreeRenderingXsltExtensionObject(Dictionary<string, string> pathToIdMapping)
        {
            _pathToIdMapping = pathToIdMapping;
        }

        public string GetVirtualParameterId(string functionPath, string parameterName)
        {
            return _pathToIdMapping[TreeHelper.GetParameterPath(functionPath, parameterName)];
        }
    }
}