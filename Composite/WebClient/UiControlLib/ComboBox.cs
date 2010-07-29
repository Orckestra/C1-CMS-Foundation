using System;
using System.Web.UI;
using System.Web.UI.WebControls;

using Composite.Extensions;
using Composite.ResourceSystem;
using Composite.WebClient.UiControlLib.Foundation;

namespace Composite.WebClient.UiControlLib
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class ComboBox : DropDownList
    {
        private static readonly string ReservedKey = "___reserved value";

        public bool SelectionRequired { get; set; }
        public string SelectionRequiredLabel { get; set; }

        protected override HtmlTextWriterTag TagKey
        {
            get { return HtmlTextWriterTag.Unknown; }
        }

        protected override string TagName
        {
            get { return "ui:datainputselector"; }
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

            if(!SelectedValue.IsNullOrEmpty())
            {
                writer.AddAttribute("value", SelectedValue);
            }

            this.AddClientAttributes(writer);
        }

        public override string SelectedValue
        {
            get
            {
                return base.SelectedValue;
            }
            set
            {
                if(this.Items.FindByValue(value) == null)
                {
                    this.Items.Add(new ListItem(ReservedKey, value));
                }
                base.SelectedValue = value;
            }
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

            ListItemCollection items = this.Items;

            if (items.Count == 0)
            {
                return;
            }

            foreach(ListItem item in items)
            {
                if (!item.Enabled)
                {
                    continue;
                }

                writer.WriteBeginTag("ui:selection");

                writer.WriteAttribute("value", item.Value, true);

                //if (this.Page != null)
                //{
                //    this.Page.ClientScript.RegisterForEventValidation(this.UniqueID, item.Value);
                //}
                writer.Write(HtmlTextWriter.SelfClosingTagEnd);
            }
        }

        protected override bool LoadPostData(string postDataKey, System.Collections.Specialized.NameValueCollection postCollection)
        {
            string postedValue = postCollection[postDataKey];
            if(!postedValue.IsNullOrEmpty() && this.Items.FindByValue(postedValue) == null)
            {
                this.Items.Add(new ListItem(ReservedKey, postedValue));
            }

            return base.LoadPostData(postDataKey, postCollection);
        } 
    }
}