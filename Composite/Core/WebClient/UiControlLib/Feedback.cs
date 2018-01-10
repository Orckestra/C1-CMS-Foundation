using System;
using System.Web;
using Composite.Core.Extensions;

namespace Composite.Core.WebClient.UiControlLib
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
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class Feedback : Generic
    {
        /// <exclude />
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
        public enum Status
        {
            /// <exclude />
            Empty = 0,

            /// <exclude />
            Success = 1,

            /// <exclude />
            Failure = 2,

            /// <exclude />
            Ping = 3
        }

        private Generic _requestTag;
        private Generic _responseTag;
        private Generic _consoleIdField;
        private Generic _viewIdField;

        private string _consoleId;

        /// <exclude />
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

            _viewIdField = new Generic("input");
            _viewIdField.Attributes["type"] = "hidden";
            _viewIdField.Attributes["clientid"] = "__VIEWID";
            _viewIdField.Attributes["name"] = "__VIEWID";

            // Persisting "__CONSOLEID" field value
            _consoleId = GetConsoleId();
            if (!_consoleId.IsNullOrEmpty())
            {
                _consoleIdField.Attributes["value"] = _consoleId;
            }

            this.Controls.Add(_requestTag);
            this.Controls.Add(_responseTag);
            _requestTag.Controls.Add(_consoleIdField);
            _requestTag.Controls.Add(_viewIdField);
        }

        /// <exclude />
        public string OnCommand
        {
            set { _requestTag.Attributes["OnCommand"] = value; }
        }

        /// <exclude />
        public string ResponseStatus
        {
            set { _responseTag.Attributes["status"] = value; }
        }

        /// <exclude />
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
                    Core.Logging.LoggingService.LogWarning(typeof(Feedback).FullName, "Unexpected status value ");
                    break;
            }
        }

        /// <exclude />
        public void SetStatus(bool success)
        {
            SetStatus(success ? Status.Success : Status.Failure);
        }

        /// <exclude />
        public string GetPostedMessage()
        {
            return this.Page.IsPostBack ? this.Page.Request.Form["__REQUEST"] : string.Empty; 
        }

        /// <exclude />
        public override bool IsPosted
        {
            get 
            {
                return Page.IsPostBack && Page.Request.Form["__EVENTTARGET"].Replace('$', '_') == _requestTag.Attributes["clientid"].Replace('$', '_');
            }
        }

        /// <exclude />
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
                int messageNumber = C1Console.Events.ConsoleMessageQueueFacade.GetLatestMessageNumber(_consoleId);
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

        /// <exclude />
        public void MarkAsDirty()
        {
             this._responseTag.Attributes["dirty"] = "true";
        }
    }
}
