using System;
using System.Web;
using Composite.Extensions;

namespace Composite.WebClient.UiControlLib
{
    /// <summary>
    /// Creates a few tags that are responsible for communiation with C1 backend UI's javascript.
    /// </summary>
    /// <example>
    /// <code>
    ///   &lt;aspui:Feedback runat="server"  OnCommand="MethodToBeExecutedOnCommand" ResponseStatus="ResponseStatus" /&gt;
    /// </code>  
    /// 
    ///   is an equivalent to the following markup:
    /// <code>    
    ///  &lt;ui:feedbackset id="feedback"&gt;
    ///    &lt;!-- request --&gt;
    ///    &lt;aspui:Generic runat="server"
    ///        ID="btnRequest"
    ///        OnCommand="MethodToBeExecutedOnCommand"
    ///        TagName="ui:request"
    ///        clientid="request"
    ///        callbackid="request"
    ///        value=""/&gt;
    ///		
    ///    &lt;!-- response --&gt;
    ///    &lt;aspui:Generic runat="server"
    ///        ID="tagResponse"
    ///        TagName="ui:response"
    ///        clientid="response"
    ///        status="ResponseStatus"/&gt;
	///	
    ///  &lt;/ui:feedbackset&gt;
    /// </code> 
    /// </example>
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class Feedback : Generic
    {
        public enum Status
        {
            Empty = 0,
            Success = 1, 
            Failure = 2,
            Ping = 3
        }

        private Generic _requestTag;
        private Generic _responseTag;
        private Generic _consoleIdField;

        private string _consoleId;

        public Feedback(string emptyParameter) : base("ui:feedbackset")
        {
            this.Attributes["clientid"] = "feedback";

            _requestTag = new Generic("ui:request");
            _requestTag.Attributes["clientid"] = "__REQUEST";
            _requestTag.Attributes["callbackid"] = "__REQUEST";

            _responseTag = new Generic("ui:response");
            _responseTag.Attributes["clientid"] = "__RESPONSE";
            _responseTag.Attributes["checksum"] = DateTime.Now.Ticks.ToString();

            _consoleIdField = new Generic("input");
            _consoleIdField.Attributes["type"] = "hidden";
            _consoleIdField.Attributes["clientid"] = "__CONSOLEID";
            _consoleIdField.Attributes["name"] = "__CONSOLEID";

            // Persisting "__CONSOLEID" field value
            _consoleId = GetConsoleId();
            if (!_consoleId.IsNullOrEmpty())
            {
                _consoleIdField.Attributes["value"] = _consoleId;
            }

            this.Controls.Add(_requestTag);
            this.Controls.Add(_responseTag);
            _requestTag.Controls.Add(_consoleIdField);
        }

        public string OnCommand
        {
            set { _requestTag.Attributes["OnCommand"] = value; }
        }


        public string ResponseStatus
        {
            set { _responseTag.Attributes["status"] = value; }
        }

        public void SetStatus(Status status)
        {
            switch (status)
            {
                case Status.Empty:
                    _responseTag.Attributes.Remove("status");
                    break;
                case Status.Success:
                    ResponseStatus = "success";
                    break;
                case Status.Failure:
                    ResponseStatus = "failure";
                    break;
                case Status.Ping:
                    ResponseStatus = "ooookay";
                    break;
                default:
                    Logging.LoggingService.LogWarning(typeof(Feedback).FullName, "Unexpected status value ");
                    break;
            }
        }

        public void SetStatus(bool success)
        {
            SetStatus(success ? Status.Success : Status.Failure);
        }

        public string GetPostedMessage()
        {
            return this.Page.IsPostBack ? this.Page.Request.Form["__REQUEST"] : string.Empty; 
        }

        public override bool IsPosted
        {
            get 
            {
                return Page.IsPostBack && Page.Request.Form["__EVENTTARGET"].Replace('$', '_') == _requestTag.Attributes["clientid"].Replace('$', '_');
            }
        }

        protected override void OnPreRender(EventArgs e)
        {
            // Setting default status value - "Ping"
            if (_requestTag.IsPosted 
                && _responseTag.Attributes["status"].IsNullOrEmpty()
                && GetPostedMessage() == "refresh")
            {
                SetStatus(Status.Ping);
            }

            // Updating information about console mesages system
            if (_consoleId != null)
            {
                int messageNumber = ConsoleEventSystem.ConsoleMessageQueueFacade.GetLatestMessageNumber(_consoleId);
                _responseTag.Attributes["messagequeueindex"] = messageNumber.ToString();
            }

            base.OnPreRender(e);
        }

        private static string GetConsoleId()
        {
            var httpContext = HttpContext.Current;
            if (httpContext != null
                && httpContext.Request != null)
            {
                var request = httpContext.Request;
                return request.QueryString["consoleId"] ?? httpContext.Request.Form["__CONSOLEID"];
            }

            return null;
        }

        public void MarkAsDirty()
        {
             this.Attributes["dirty"] = "true";
        }
    }
}
