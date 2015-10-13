using System;
using System.Web.UI;
using System.Collections.Generic;
using Composite.C1Console.Forms.DataServices.UiControls;
using Composite.C1Console.Forms.WebChannel;
using Composite.Core.Extensions;
using Composite.Core.ResourceSystem;
using Composite.Core.WebClient.FlowMediators.FormFlowRendering;
using Composite.Plugins.Forms.WebChannel.UiControlFactories;


namespace Composite.Plugins.Forms.WebChannel.UiContainerFactories
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class TemplatedUiContainerBase : UserControl
    {
        private IWebUiControl _webUiControl;
        private string _titleField;

        /// <exclude />
        public abstract Control GetFormPlaceHolder();
        
        /// <exclude />
        public abstract Control GetMessagePlaceHolder();

        /// <exclude />
        public abstract void SetContainerTitle(string title);

        /// <exclude />
        public void SetContainerTitleField(string titleField)
        {
            _titleField = titleField;
        }

        /// <exclude />
        public string GetTitleFieldControlId()
        {
            IWebUiControl container = GetContainer();

            if (_titleField.IsNullOrEmpty() || container == null) return string.Empty;

            var mappings = new Dictionary<string, string>();

            FormFlowUiDefinitionRenderer.ResolveBindingPathToCliendIDMappings(container, mappings);

            string clientId = mappings.ContainsKey(_titleField) ? mappings[_titleField] : "";

            return clientId;
        }

        /// <exclude />
        public abstract void SetContainerIcon(ResourceHandle icon);


        internal void SetWebUiControlRef(IWebUiControl webUiControl)
        {
            _webUiControl = webUiControl;
        }


        /// <exclude />
        protected override void OnInit(System.EventArgs e)
        {
            base.OnInit(e);

            if (!this.IsPostBack)
            {
                _webUiControl.InitializeViewState();
                return;
            }
        }

        /// <exclude />
        protected override void OnPreRender(EventArgs e)
        {
            // Initializing lazy controls after PageLoad so the processed Post data will be overwritten
            if (IsPostBack)
            {
                if (_webUiControl is EmbeddedFormUiControl)
                {
                    var container = GetContainer();
                    container?.InitializeLazyBindedControls();
                }
            }

            base.OnPreRender(e);
        }

        private TemplatedContainerUiControl GetContainer()
        {
            var container = (_webUiControl as EmbeddedFormUiControl).CompiledUiControl as TemplatedContainerUiControl;
            return container;
        }

        /// <exclude />
        public abstract void ShowFieldMessages(Dictionary<string, string> clientIDPathedMessages);
    }
}
