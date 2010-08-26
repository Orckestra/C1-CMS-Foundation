using System;
using System.Collections.Generic;
using System.Web.UI;

using Composite.C1Console.Forms;
using Composite.C1Console.Forms.Foundation;
using Composite.C1Console.Forms.WebChannel;
using Composite.Plugins.Forms.WebChannel.Foundation;
using Composite.Plugins.Forms.WebChannel.UiControlFactories;
using Composite.Core.ResourceSystem;


namespace Composite.Plugins.Forms.WebChannel.UiContainerFactories
{
    internal class TemplatedUiContainer : IWebUiContainer
    {
        private Type _templateUserControlType;
        private string _templateFormVirtualPath;
        private TemplatedExecutionContainer _webDocument;

        internal TemplatedUiContainer(Type templateUserControlType, string templateFormVirtualPath)
        {
            _templateUserControlType = templateUserControlType;
            _templateFormVirtualPath = templateFormVirtualPath;
        }


        public IUiControl Render(IUiControl innerForm, IUiControl customToolbarItems, IFormChannelIdentifier channel, IDictionary<string, object> eventHandlerBindings, string containerLabel, ResourceHandle containerIcon)
        {
            if (string.IsNullOrEmpty(_templateFormVirtualPath) == false)
            {
                WebEmbeddedFormUiControl document = new WebEmbeddedFormUiControl(channel);
                document.FormPath = _templateFormVirtualPath; // "/Composite/Templates/Document.xml";

                document.Bindings = new Dictionary<string, object>(eventHandlerBindings);
                document.Bindings.Add("Form", innerForm);
                if (customToolbarItems != null)
                {
                    document.Bindings.Add("CustomToolbarItems", customToolbarItems);
                }

                _webDocument = new TemplatedExecutionContainer(document, _templateUserControlType, containerLabel, containerIcon);
            }
            else
            {
                _webDocument = new TemplatedExecutionContainer((IWebUiControl)innerForm, _templateUserControlType, containerLabel, containerIcon);
            }

            return _webDocument;
        }


        public void ShowFieldMessages(Dictionary<string, string> clientIDPathedMessages)
        {
            _webDocument.ShowFieldMessages( clientIDPathedMessages);
        }

    }




    internal class TemplatedExecutionContainer : UiControl, IWebUiControl
    {
        IWebUiControl _form;
        Control _messagePlaceHolder = null;
        Type _templateUserControlType;
        string _containerLabel;
        ResourceHandle _containerIcon;
        TemplatedUiContainerBase _templateControl;


        public TemplatedExecutionContainer(IWebUiControl form, Type templateUserControlType, string containerLabel, ResourceHandle containerIcon)
        {
            _form = form;
            _templateUserControlType = templateUserControlType;
            _containerLabel = containerLabel;
            _containerIcon = containerIcon;
        }

        internal Control GetMessagePlaceHolder()
        {
            if (_messagePlaceHolder == null) throw new InvalidOperationException("MessagePlaceHolder has not been initialized. The place holder will not exist before BuildWebControl() has been called");
            return _messagePlaceHolder;
        }


        public override void BindStateToControlProperties()
        {
            _form.BindStateToControlProperties();
        }


        public Control BuildWebControl()
        {
            _templateControl = _templateUserControlType.ActivateAsUserControl<TemplatedUiContainerBase>(this.UiControlID);

            Control formPlaceHolder = _templateControl.GetFormPlaceHolder();
            _messagePlaceHolder = _templateControl.GetMessagePlaceHolder();
            _templateControl.SetContainerTitle(_containerLabel);
            _templateControl.SetContainerIcon(_containerIcon);
            _templateControl.SetWebUiControlRef(_form);

            formPlaceHolder.Controls.Add(_form.BuildWebControl());

            return _templateControl;
        }


        public void InitializeViewState()
        {
            _form.InitializeViewState();
        }


        public bool IsFullWidthControl
        {
            get { throw new Exception("I am the root page!"); }
        }

        public string ClientName { get { return null; } }


        internal void ShowFieldMessages(Dictionary<string, string> clientIDPathedMessages)
        {
            _templateControl.ShowFieldMessages(clientIDPathedMessages);;
        }
    }

}
