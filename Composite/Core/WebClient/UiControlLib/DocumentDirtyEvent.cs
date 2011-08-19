using System;
using System.Web.UI;
using Composite.Core.Extensions;
using Composite.Core.WebClient.UiControlLib.Foundation;

namespace Composite.Core.WebClient.UiControlLib
{
    /// <summary>
    /// When added to a document, the document will be marked as 'dirty' and the save button will be enabled.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class DocumentDirtyEvent : BaseControl
    {
        /// <exclude />
        public DocumentDirtyEvent()
            : base("ui:binding")
        {
        }

        /// <exclude />
        protected override void RenderAttributes(HtmlTextWriter writer)
        {
            Attributes["onattach"] = "this.dispatchAction(Binding.ACTION_DIRTY);";

            base.RenderAttributes(writer);
        }
    }
}
