using System;
using System.Web;
using System.Collections.Generic;
using Composite.Core.WebClient;


namespace Composite.C1Console.Forms.Flows
{
    internal class FormFlowRenderingService : IFormFlowRenderingService
    {
        private Dictionary<string, string> _bindingPathedMessages = null;

        public void RerenderView()
        {
            //StackTrace st = new StackTrace();
            //LoggingService.LogVerbose( "FormFlowRenderingService", "RerenderRequest from \n"+ st.ToString() );

            this.RerenderViewRequested = true;
        }

        public bool RerenderViewRequested { get; private set; }


        public bool HasFieldMessages
        {
            get { return (_bindingPathedMessages != null && _bindingPathedMessages.Count > 0); }
        }


        public void ShowFieldMessages(Dictionary<string, string> bindingPathedMessages)
        {
            if (_bindingPathedMessages == null)
            {
                _bindingPathedMessages = new Dictionary<string, string>();
            }

            foreach (var msgElement in bindingPathedMessages)
            {
                _bindingPathedMessages.Add(msgElement.Key, msgElement.Value);
            }
        }


        internal Dictionary<string, string> BindingPathedMessages
        {
            get { return _bindingPathedMessages; }
        }


        public void ShowFieldMessage(string fieldBindingPath, string message)
        {
            if (string.IsNullOrEmpty(fieldBindingPath)) throw new ArgumentException("Field binding path can not be null or an empty string", "fieldBindingPath");
            if (string.IsNullOrEmpty(message)) throw new ArgumentException("Field message can not be null or an empty string", "message");

            if (_bindingPathedMessages == null)
            {
                _bindingPathedMessages = new Dictionary<string, string>();
            }

            if (_bindingPathedMessages.ContainsKey(fieldBindingPath))
            {
                _bindingPathedMessages[fieldBindingPath] += "\n" + message;
            }
            else
            {
                _bindingPathedMessages.Add(fieldBindingPath, message);
            }
        }


        public void SetSaveStatus(bool succeeded)
        {
            var httpContext = HttpContext.Current;

            (httpContext.Handler as FlowPage).SaveStepSucceeded = succeeded;
        }
    }
}
