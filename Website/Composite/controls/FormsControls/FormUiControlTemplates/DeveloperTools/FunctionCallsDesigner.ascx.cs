using System;
using Composite.Plugins.Forms.WebChannel.UiControlFactories;

namespace CompositeFunctionCallsDesigner
{
    public partial class FunctionCallsDesigner : FunctionCallsDesignerTemplateUserControlBase
    {
        public override string SessionStateProvider
        {
            get { return ViewState["SessionStateProvider"] as string; }
            set { ViewState["SessionStateProvider"] = value; }
        }

        public override Guid SessionStateId
        {
            get { return (Guid)ViewState["SessionStateId"]; }
            set { ViewState["SessionStateId"] = value; }
        }

	    public bool HasBasic { get; set; }
    }
}