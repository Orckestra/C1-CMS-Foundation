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
        private readonly Type _templateUserControlType;
        private readonly string _templateFormVirtualPath;
        private TemplatedExecutionContainer _webDocument;

        internal TemplatedUiContainer(Type templateUserControlType, string templateFormVirtualPath)
        {
            _templateUserControlType = templateUserControlType;
            _templateFormVirtualPath = templateFormVirtualPath;
        }


        public IUiControl Render(
            IUiControl innerForm, 
            IUiControl customToolbarItems, 
            IFormChannelIdentifier channel, 
            IDictionary<string, object> eventHandlerBindings, 
            string containerLabel,
            string containerLabelField,
            string containerTooltip,
            ResourceHandle containerIcon)
        {
            if (!string.IsNullOrEmpty(_templateFormVirtualPath))
            {
                var document = new WebEmbeddedFormUiControl(channel)
                {
                    FormPath = _templateFormVirtualPath, 
                    Bindings = new Dictionary<string, object>(eventHandlerBindings) {{"Form", innerForm}}
                };
                

                if (customToolbarItems != null)
                {
                    document.Bindings.Add("CustomToolbarItems", customToolbarItems);
                }

                _webDocument = new TemplatedExecutionContainer(document, _templateUserControlType, containerLabel, containerLabelField, containerTooltip, containerIcon);
            }
            else
            {
                _webDocument = new TemplatedExecutionContainer((IWebUiControl)innerForm, _templateUserControlType, containerLabel, containerLabelField, containerTooltip, containerIcon);
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
        readonly IWebUiControl _form;
        readonly Type _templateUserControlType;
        readonly string _containerLabel;
        readonly string _containerTooltip;
        readonly string _containerLabelField;
        readonly ResourceHandle _containerIcon;

        Control _messagePlaceHolder;
        TemplatedUiContainerBase _templateControl;


        public TemplatedExecutionContainer(
            IWebUiControl form, Type templateUserControlType, 
            string containerLabel, string containerLabelField, string containerTooltip,
            ResourceHandle containerIcon)
        {
            _form = form;
            _templateUserControlType = templateUserControlType;
            _containerLabel = containerLabel;
            _containerLabelField = containerLabelField;
            _containerTooltip = containerTooltip;
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
            _templateControl.SetContainerTitleField(_containerLabelField);
            _templateControl.SetContainerTooltip(_containerTooltip);
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
