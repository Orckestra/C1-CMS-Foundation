using System;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Composite.WebClient.UiControlLib.Foundation;
using Composite.ResourceSystem;


namespace Composite.WebClient.UiControlLib
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class Selector : DropDownList
    {
        public Selector()
            : base()
        {
            bool isInternetExplorer = HttpContext.Current.Request.UserAgent.Contains("MSIE");
            this.SimpleSelectorMode = false; // isInternetExplorer;
        }

        public bool SelectionRequired { get; set; }
        public string SelectionRequiredLabel { get; set; }
        public bool SimpleSelectorMode { get; set; }

        protected override HtmlTextWriterTag TagKey
        {
            get { return HtmlTextWriterTag.Unknown; }
        }

        protected override string TagName
        {
            get { return this.SimpleSelectorMode ? "ui:simpleselector" : "ui:selector"; }
            
        }

        protected override void AddAttributesToRender(HtmlTextWriter writer)
        {
            
             writer.AddAttribute("name", this.UniqueID);
            writer.AddAttribute("callbackid", this.ClientID);

            if (this.AutoPostBack == true)
            {
                writer.AddAttribute("onchange", "this.dispatchAction(PageBinding.ACTION_DOPOSTBACK)");
            }

            if (this.SelectionRequired == true)
            {
                writer.AddAttribute("required", "true");
                string requiredLabel = this.SelectionRequiredLabel;
                if (string.IsNullOrEmpty(requiredLabel) == true) requiredLabel = StringResourceSystemFacade.GetString("Composite.Management", "AspNetUiControl.Selector.SelectValueLabel");
                writer.AddAttribute("label", requiredLabel);
            }

            this.AddClientAttributes(writer);
        }


        protected override void RenderContents(HtmlTextWriter writer)
        {
            for (int i = 0; i < this.Items.Count; i++)
            {
                string label = StringResourceSystemFacade.ParseString(this.Items[i].Text);

                int firstNonSpaceSpacePosition = 0;
                while (firstNonSpaceSpacePosition < label.Length && label.Substring(firstNonSpaceSpacePosition, 1) == " ")
                    firstNonSpaceSpacePosition++;

                string spacing = new String(Convert.ToChar(160), firstNonSpaceSpacePosition * 2);
                this.Items[i].Text = string.Concat(spacing, label.Substring(firstNonSpaceSpacePosition));
            }

            if (this.SimpleSelectorMode == false)
            {
                ListItemCollection items = this.Items;
                int count = items.Count;
                if (count > 0)
                {
                    bool flag = false;
                    for (int i = 0; i < count; i++)
                    {
                        ListItem item = items[i];
                        if (item.Enabled)
                        {
                            writer.WriteBeginTag("ui:selection");
                            if (item.Selected && this.SelectionRequired == false)
                            {
                                if (flag)
                                {
                                    this.VerifyMultiSelect();
                                }
                                flag = true;
                                writer.WriteAttribute("selected", "true");
                            }

                            writer.WriteAttribute("label", item.Text, true);
                            writer.WriteAttribute("value", item.Value, true);
                            writer.WriteAttribute("tooltip", item.Text, true);
                            if (this.Page != null)
                            {
                                this.Page.ClientScript.RegisterForEventValidation(this.UniqueID, item.Value);
                            }
                            writer.Write(HtmlTextWriter.SelfClosingTagEnd);
                        }
                    }
                }
            }
            else
            {
                base.RenderContents(writer);
            }
        }


        public override void RenderBeginTag(HtmlTextWriter writer)
        {
            base.RenderBeginTag(writer);

            if (this.SimpleSelectorMode == true)
            {
                writer.WriteFullBeginTag("select");
            }
        }

        public override void RenderEndTag(HtmlTextWriter writer)
        {
        
        	if (this.SimpleSelectorMode == true)
            {
                writer.WriteEndTag("select");
            }

            base.RenderEndTag(writer);
        }





    }
}