using System;
using System.Web.UI;

using Composite;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Core.Logging;
using Composite.Core.WebClient;
using Composite.Core.WebClient.FlowMediators;


public partial class Composite_Management_FlowUi : FlowPage
{
    private int _startTickCount = Environment.TickCount;
    private string _consoleId = null;
    private string _uiContainerName = null;

    private const string _consoleIdParameterName = "consoleId";
    private const string _flowHandleParameterName = "flowHandle";
    private const string _elementProviderNameParameterName = "elementProvider";

    protected void Page_Load(object sender, EventArgs e)
    {
        this.Error += new EventHandler(Composite_Management_FlowUi_Error);
        _consoleId = Request.QueryString[_consoleIdParameterName];
        string flowHandleSerialized = Request.QueryString[_flowHandleParameterName];
        string elementProviderName = Request.QueryString[_elementProviderNameParameterName];

        if (string.IsNullOrEmpty(_consoleId) == true) throw new ArgumentNullException(_consoleIdParameterName, "Missing query string parameter");
        if (string.IsNullOrEmpty(flowHandleSerialized) == true) throw new ArgumentNullException(_flowHandleParameterName, "Missing query string parameter");
        if (string.IsNullOrEmpty(elementProviderName) == true) throw new ArgumentNullException(_elementProviderNameParameterName, "Missing query string parameter");

        FlowHandle flowHandle = FlowHandle.Deserialize(flowHandleSerialized);

        try
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                Control webControl = WebFlowUiMediator.GetFlowUi(flowHandle, elementProviderName, _consoleId, out _uiContainerName);

                if (webControl == null)
                {
                    // TODO: check if "httpContext.ApplicationInstance.CompleteRequest();" can be used
                    Response.Redirect(UrlUtils.ResolveAdminUrl("content/flow/FlowUiCompleted.aspx"), true);
                }
                else
                {
                    this.Controls.Add(webControl);
                }
            }
        }
        catch (Exception ex)
        {
            IConsoleMessageQueueItem errorLogEntry = new LogEntryMessageQueueItem { Sender = typeof(System.Web.UI.Page), Level = Composite.Core.Logging.LogLevel.Error, Message = ex.Message };
            ConsoleMessageQueueFacade.Enqueue(errorLogEntry, _consoleId);
            throw;
        }
    }


    void Composite_Management_FlowUi_Error(object sender, EventArgs e)
    {
        Composite.Core.WebClient.ErrorServices.DocumentAdministrativeError(Server.GetLastError());
        Composite.Core.WebClient.ErrorServices.RedirectUserToErrorPage(_uiContainerName, Server.GetLastError());
    }


    protected override void OnUnload(EventArgs e)
    {
        if (Composite.RuntimeInformation.IsDebugBuild == true)
        {
            int endTickCount = Environment.TickCount;
            LoggingService.LogVerbose("FlowUi.aspx", string.Format("Time spent serving request: {0} ms", endTickCount - _startTickCount));
            base.OnUnload(e);
        }
    }

}