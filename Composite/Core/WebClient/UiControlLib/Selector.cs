using System;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Composite.Core.WebClient.UiControlLib.Foundation;
using Composite.Core.ResourceSystem;


namespace Composite.Core.WebClient.UiControlLib
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class Selector : DropDownList
    {
        /// <exclude />
        public Selector()
            : base()
        {
            bool isInternetExplorer = HttpContext.Current.Request.UserAgent.Contains("MSIE");
            this.SimpleSelectorMode = false; // isInternetExplorer;
        }


        /// <exclude />
        public bool SelectionRequired { get; set; }

        /// <exclude />
        public string SelectionRequiredLabel { get; set; }

        /// <exclude />
        public bool SimpleSelectorMode { get; set; }

        /// <exclude />
        public bool IsDisabled { get; set; }


        /// <exclude />
        protected override HtmlTextWriterTag TagKey
        {
            get { return HtmlTextWriterTag.Unknown; }
        }


        /// <exclude />
        protected override string TagName
        {
            get { return this.SimpleSelectorMode ? "ui:simpleselector" : "ui:selector"; }
        }


        /// <exclude />
        protected override void AddAttributesToRender(HtmlTextWriter writer)
        {
            
             writer.AddAttribute("name", this.UniqueID);
            writer.AddAttribute("callbackid", this.ClientID);

            if (this.AutoPostBack)
            {
                writer.AddAttribute("onchange", "this.dispatchAction(PageBinding.ACTION_DOPOSTBACK)");
            }

            if (this.SelectionRequired)
            {
                writer.AddAttribute("required", "true");
                string requiredLabel = this.SelectionRequiredLabel;
                if (string.IsNullOrEmpty(requiredLabel)) requiredLabel = StringResourceSystemFacade.GetString("Composite.Management", "AspNetUiControl.Selector.SelectValueLabel");
                writer.AddAttribute("label", requiredLabel);
            }

            if (this.IsDisabled)
            {
                writer.AddAttribute("isdisabled", "true");
            }

            this.AddClientAttributes(writer);
        }


        /// <exclude />
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


        /// <exclude />
        public override void RenderBeginTag(HtmlTextWriter writer)
        {
            base.RenderBeginTag(writer);

            if (this.SimpleSelectorMode)
            {
                writer.WriteFullBeginTag("select");
            }
        }



        /// <exclude />
        public override void RenderEndTag(HtmlTextWriter writer)
        {
        
        	if (this.SimpleSelectorMode)
            {
                writer.WriteEndTag("select");
            }

            base.RenderEndTag(writer);
        }
    }
}