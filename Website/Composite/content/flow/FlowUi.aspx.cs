using System;
using System.Threading;
using System.Web;
using System.Web.UI;

using Composite;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Core;
using Composite.Core.WebClient;
using Composite.Core.WebClient.FlowMediators;


public partial class Composite_Management_FlowUi : FlowPage
{
    private readonly int _startTickCount = Environment.TickCount;
    private string _consoleId = null;
    private string _uiContainerName = null;

    private const string _consoleIdParameterName = "consoleId";
    private const string _flowHandleParameterName = "flowHandle";
    private const string _elementProviderNameParameterName = "elementProvider";

    protected void Page_Load(object sender, EventArgs e)
    {
        this.Error += Composite_Management_FlowUi_Error;
        _consoleId = Request.QueryString[_consoleIdParameterName];
        string flowHandleSerialized = Request.QueryString[_flowHandleParameterName];
        string elementProviderName = Request.QueryString[_elementProviderNameParameterName];

        if (string.IsNullOrEmpty(_consoleId)) throw new ArgumentNullException(_consoleIdParameterName, "Missing query string parameter");
        if (string.IsNullOrEmpty(flowHandleSerialized)) throw new ArgumentNullException(_flowHandleParameterName, "Missing query string parameter");
        if (string.IsNullOrEmpty(elementProviderName)) throw new ArgumentNullException(_elementProviderNameParameterName, "Missing query string parameter");

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
        catch (ThreadAbortException)
        {
            throw;
        }
        catch (Exception ex)
        {
            IConsoleMessageQueueItem errorLogEntry = new LogEntryMessageQueueItem
            {
                Sender = typeof(System.Web.UI.Page), Level = Composite.Core.Logging.LogLevel.Error, Message = ex.Message
            };
            ConsoleMessageQueueFacade.Enqueue(errorLogEntry, _consoleId);
            throw;
        }

        Response.Cache.SetCacheability(HttpCacheability.NoCache);
    }


    void Composite_Management_FlowUi_Error(object sender, EventArgs e)
    {
        Composite.Core.WebClient.ErrorServices.DocumentAdministrativeError(Server.GetLastError());
        Composite.Core.WebClient.ErrorServices.RedirectUserToErrorPage(_uiContainerName, Server.GetLastError());
    }


    protected override void OnUnload(EventArgs e)
    {
        if (Composite.RuntimeInformation.IsDebugBuild)
        {
            int endTickCount = Environment.TickCount;
            Log.LogVerbose("FlowUi.aspx", "Time spent serving request: {0} ms", endTickCount - _startTickCount);
            base.OnUnload(e);
        }
    }

}