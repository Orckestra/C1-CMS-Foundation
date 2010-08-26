using System;
using System.Reflection;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using Composite.Core.Extensions;
using Composite.Core.ResourceSystem;

namespace Composite.Core.WebClient.UiControlLib
{
    /// <summary>
    /// To be used for creating stateless tags. Copies all the attributes from markup to the generated tag,
    /// the "clientid" attribute will be transformed to "id" attribute.
    /// </summary>
    /// <exclude />    
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class Generic : HtmlGenericControl 
    {
        private string _callbackid;
        private string _methodName;
        private bool? _posted;

        public Generic(string tag)
            : base(tag)
        {
            base.EnableViewState = false;
        }

        public virtual bool IsPosted
        {
            get
            {
                Verify.IsNotNull(_posted, "This property isn't awailable until 'PageLoad' event");
                return _posted.Value;
            }
        }

        protected override void OnLoad(System.EventArgs e)
        {
            _posted = false;
            base.OnLoad(e);

            if (Attributes["HasCallbackId"] == "true" && Attributes["callbackid"].IsNullOrEmpty())
            {
                Attributes.Remove("HasCallbackId");
                Attributes["callbackid"] = this.UniqueID;
            }

            _callbackid = this.Attributes["callbackid"] ?? string.Empty;
            _methodName = Attributes["OnCommand"];

            // NOTE: to be removed
            if(_methodName.IsNullOrEmpty())
            {
                _methodName = Attributes["OnServerClick"];
            }

            if(_callbackid != null
                && Page.IsPostBack 
                && !Page.Request.Form["__EVENTTARGET"].IsNullOrEmpty()
                && Page.Request.Form["__EVENTTARGET"].Replace('$', '_') == _callbackid.Replace('$', '_'))
            {
                _posted = true;
                if(_methodName != null)
                {
                    this.Page.RegisterRequiresRaiseEvent(new PostBackEventHandler(this));
                }
            }
        }

        protected override void RenderAttributes(HtmlTextWriter writer)
        {
            string clientId = Attributes["clientid"];
            if(clientId.IsNullOrEmpty() && !ID.IsNullOrEmpty())
            {
                clientId = ID;
            }

            if (!clientId.IsNullOrEmpty())
            {
                writer.WriteAttribute("id", clientId);

                Attributes.Remove("clientid");
            }

            string label = Attributes["label"];
            if (!label.IsNullOrEmpty())
            {
                Attributes["label"] = StringResourceSystemFacade.ParseString(label);
            }

            Attributes.Remove("OnServerClick"); // Server-side attribute
            Attributes.Remove("OnCommand"); // Server-side attribute

            this.Attributes.Render(writer);
        }

        protected class PostBackEventHandler : IPostBackEventHandler
        {
            private Generic _control;
            public PostBackEventHandler(Generic control)
            {
                _control = control;
            }

            public void RaisePostBackEvent(string eventArgument)
            {
                string methodName = _control._methodName;

                Control controlThatHandlesEvent = GetControlThatHandlesEvent(_control);

                if (controlThatHandlesEvent == null)
                {
                    Core.Logging.LoggingService.LogError(typeof(Generic).FullName, "Failed to find parent control, that appropriate for event handling".FormatWith(methodName));
                    return;
                }

                Type type = controlThatHandlesEvent.GetType();

                MethodInfo methodInfo = null;
                
                while(methodInfo == null && type != typeof(object))
                {
                    methodInfo = type.GetMethod(methodName);
                    type = type.BaseType;
                }

                if(methodInfo == null)
                {
                    Core.Logging.LoggingService.LogError(typeof(Generic).FullName, "Failed to find method '{0}'".FormatWith(methodName));
                    return;
                }

                methodInfo.Invoke(controlThatHandlesEvent, new object[0]);
            }

            private static Control GetControlThatHandlesEvent(Generic generic)
            {
                Control control = generic;
                do
                {
                    control = control.Parent;
                } while (control != null 
                    && !typeof (UserControl).IsAssignableFrom(control.GetType())
                    && !typeof (Page).IsAssignableFrom(control.GetType()));

                return control;
            }
        }
    }
}