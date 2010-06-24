//using System.Web.UI;
//using System.Web.UI.WebControls;
//using Composite.WebClient.UiControlLib;


//namespace Composite.Forms.WebChannel
//{
//    public sealed class WebUiHelpers
//    {
//        public static Control WrapInUpdatePanel( Control content, bool childrenAsUpdateTriggers )
//        {

//            BindingUpdatePanel updatePanel = new BindingUpdatePanel();
//            updatePanel.UpdateMode = UpdatePanelUpdateMode.Conditional;
//            updatePanel.ChildrenAsTriggers = childrenAsUpdateTriggers; 
//            updatePanel.ID = content.ID + "UpdatePanel";

//            updatePanel.ContentTemplateContainer.Controls.Add( content );

//            return updatePanel;
//        }
//    }
//}
