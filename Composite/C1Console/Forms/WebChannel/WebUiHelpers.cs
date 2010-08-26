//using System.Web.UI;
//using System.Web.UI.WebControls;
//using Composite.Core.WebClient.UiControlLib;


//namespace Composite.C1Console.Forms.WebChannel
//{
//    internal sealed class WebUiHelpers
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
