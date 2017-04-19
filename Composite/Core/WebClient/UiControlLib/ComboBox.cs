using System;
using System.Web.UI;
using System.Web.UI.WebControls;

using Composite.Core.Extensions;
using Composite.Core.ResourceSystem;
using Composite.Core.WebClient.UiControlLib.Foundation;

namespace Composite.Core.WebClient.UiControlLib
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class ComboBox : DropDownList
    {
        private static readonly string ReservedKey = "___reserved value";

        /// <exclude />
        public bool SelectionRequired { get; set; }

        /// <exclude />
        public string SelectionRequiredLabel { get; set; }



        /// <exclude />
        protected override HtmlTextWriterTag TagKey
        {
            get { return HtmlTextWriterTag.Unknown; }
        }


        /// <exclude />
        protected override string TagName
        {
            get { return "ui:datainputselector"; }
        }


        /// <exclude />
        protected override void AddAttributesToRender(HtmlTextWriter writer)
        {
            writer.AddAttribute("name", this.UniqueID);
            writer.AddAttribute("callbackid", this.ClientID);

            if (this.AutoPostBack)
            {
                writer.AddAttribute("onselectionchange", "this.dispatchAction(PageBinding.ACTION_DOPOSTBACK)");
            }
            if (this.SelectionRequired)
            {
                writer.AddAttribute("required", "true");
                string requiredLabel = this.SelectionRequiredLabel;
                if (string.IsNullOrEmpty(requiredLabel)) requiredLabel = StringResourceSystemFacade.GetString("Composite.Management", "AspNetUiControl.Selector.SelectValueLabel");
                writer.AddAttribute("label", requiredLabel);
            }

            if(!SelectedValue.IsNullOrEmpty())
            {
                writer.AddAttribute("value", SelectedValue);
            }

            this.AddClientAttributes(writer);
        }


        /// <exclude />
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


        /// <exclude />
        protected override void RenderContents(HtmlTextWriter writer)
        {
            for (int i = 0; i < this.Items.Count; i++)
            {
                if (Items[i].Text == ReservedKey)
                {
                    continue;
                }

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
                if (!item.Enabled || item.Text == ReservedKey)
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


        /// <exclude />
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