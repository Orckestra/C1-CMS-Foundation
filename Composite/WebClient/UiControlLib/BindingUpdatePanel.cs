//using System.ComponentModel;
//using System.Web.UI;
//using System.Web.UI.WebControls;
//using System.IO;
//using System.Globalization;

//using Composite.WebClient.UiControlLib.Foundation;

//namespace Composite.WebClient.UiControlLib
//{
//    public enum RepaintModeOptions
//    {
//        Normal,
//        Hidden,
//        Suspended
//    }

//    public class DisabledUpdatePanel : PlaceHolder
//    {
//        public DisabledUpdatePanel()
//        {
//            ChildrenAsTriggers = true;
//            UpdateMode = UpdatePanelUpdateMode.Always;
//        }

//        public bool IsInPartialRendering
//        {
//            get
//            {
//                return false;
//            }
//        }

//        public UpdatePanelUpdateMode UpdateMode { get; set; }
        
//        public bool ChildrenAsTriggers { get; set; }

//        public Control ContentTemplateContainer
//        {
//            get
//            {
//                return this;
//            }
//        }

//        public void Update()
//        {
//            // Do nothing
//        }
//    }


//    public class BindingUpdatePanel : /* DisabledUpdatePanel */ UpdatePanel 
//    {
//        public BindingUpdatePanel()
//        {
//            this.RepaintMode = RepaintModeOptions.Normal;
//        }


//        private bool _rendered = false;

//        [Category("Appearance"), DefaultValue(""), Description("CSS class names")]
//        public string CssClass { get; set; }

//        [Category("Appearance"), DefaultValue(""), Description("How repaints should be handled on the client (Normal, Hidden or Suspended)")]
//        public RepaintModeOptions RepaintMode { get; set; }// normal, hidden, suspended

//        [Category("Appearance"), DefaultValue("")]
//        public string Flex { get; set; }
        
//        [Category("Appearance"), DefaultValue("")]
//        public string ForceFitness { get; set; }

//        [Category("Appearance"), DefaultValue(""), Description("Some ui:updatepanels may be of a specialized type")]
//        public string ClientType { get; set; }


//        protected override void RenderChildren(HtmlTextWriter writer)
//        {
//            if (this.IsInPartialRendering==false)
//            {
//                if (string.IsNullOrEmpty(this.CssClass) == false)
//                {
//                    writer.AddAttribute(HtmlTextWriterAttribute.Class, this.CssClass);
//                }

//                writer.AddAttribute(HtmlTextWriterAttribute.Id, this.ClientID);
//                writer.AddAttribute("repaintmode", this.RepaintMode.ToString().ToLower());
//                if (string.IsNullOrEmpty(this.Flex)==false) writer.AddAttribute("flex", this.Flex);
//                if (string.IsNullOrEmpty(this.ForceFitness)==false) writer.AddAttribute("forcefitness", this.ForceFitness);
//                if (string.IsNullOrEmpty(this.ClientType) == false) writer.AddAttribute("type", this.ClientType);

//                writer.RenderBeginTag("ui:updatepanel");
//                writer.RenderBeginTag("ui:updatepanelbody");

//                HtmlTextWriter writer2 = new HtmlTextWriter(new StringWriter(Users.UserSettings.CultureInfo));
//                base.RenderChildren(writer2);
//                string innerMarkupWithUnwantedDiv = writer2.InnerWriter.ToString();

//                int openTagEnd = innerMarkupWithUnwantedDiv.IndexOf('>');
//                int closeTagStart = innerMarkupWithUnwantedDiv.LastIndexOf('<');

//                if (closeTagStart > openTagEnd)
//                {
//                    writer.Write( innerMarkupWithUnwantedDiv.Substring( openTagEnd+1, (closeTagStart - openTagEnd)-1 ));
//                }

//                writer.RenderEndTag();
//                writer.RenderEndTag();
//            }
//            else
//            {
//                if (_rendered==true)
//                {
//                    return;
//                }

//                base.RenderChildren(writer);
//            }
//            _rendered = true;
//        }


//    }
//}