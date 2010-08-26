using System;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using Composite.Plugins.Forms.WebChannel.CustomUiControls;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.WebClient.Renderings.Template;
using System.Collections.Generic;
using Composite.Core.Types;
using Composite.Core.Logging;

namespace CompositePageContentEditor
{
    public partial class PageContentEditor : PageContentEditorTemplateUserControlBase
    {
        private Guid SelectedTemplateId { get { return new Guid(this.TemplateSelector.SelectedValue); } }        
 

        protected void Page_Load(object sender, EventArgs e)
        {
            if (this.ContentsPlaceHolder.Controls.Count == 0)
            {
                SetUpTextAreas(false);
            }
        }




        protected void TemplateSelector_SelectedIndexChanged(object sender, EventArgs e)
        {
            SetUpTextAreas(true);
        }


        protected override void BindStateToProperties()
        {
            this.TemplateId = this.SelectedTemplateId;

            Dictionary<string, string> newNamedXhtmlFragments = new Dictionary<string, string>();
            foreach (Control c in this.ContentsPlaceHolder.Controls)
            {
                if (IsRealContent(((TextBox)c).Text))
                {
                    newNamedXhtmlFragments.Add(c.ID, ((TextBox)c).Text.Replace("&nbsp;", "&#160;"));
                }
            }

            this.NamedXhtmlFragments = newNamedXhtmlFragments;
        }


        protected override void InitializeViewState()
        {
            this.TemplateSelector.DataSource = this.SelectableTemplateIds;
            this.TemplateSelector.DataValueField = "Key";
            this.TemplateSelector.DataTextField= "Value";
            this.TemplateSelector.DataBind();

            this.TemplateSelector.SelectedValue = this.TemplateId.ToString();

            SetUpTextAreas(true);
        }

        public override string GetDataFieldClientName()
        {
            return null;
        }


        private void SetUpTextAreas(bool flush)
        {
            TemplatePlaceholdersInfo info = TemplateInfo.GetRenderingPlaceHolders(this.SelectedTemplateId);

            List<string> handledIds = new List<string>();

            ContentsPlaceHolder.Controls.Clear();
            foreach (KeyValuePair placeHolderInfo in info.Placeholders)
            {
                if (handledIds.Contains(placeHolderInfo.Key) == false)
                {
                    TextBox contentTextBox = new Composite.Core.WebClient.UiControlLib.TextBox();
                    contentTextBox.TextMode = TextBoxMode.MultiLine;
                    contentTextBox.ID = placeHolderInfo.Key;
                    contentTextBox.Attributes.Add("placeholderid", placeHolderInfo.Key);
                    contentTextBox.Attributes.Add("placeholdername", placeHolderInfo.Value);
                    if (placeHolderInfo.Key == info.DefaultPlaceholderId)
                    {
                        contentTextBox.Attributes.Add("selected", "true");
                    }
                    if (flush == true)
                    {
                        if (this.NamedXhtmlFragments.ContainsKey(placeHolderInfo.Key))
                        {
                            contentTextBox.Text = this.NamedXhtmlFragments[placeHolderInfo.Key];
                        }
                        else
                        {
                            contentTextBox.Text = "<br />";
                        }
                    }
                    ContentsPlaceHolder.Controls.Add(contentTextBox);
                    handledIds.Add(placeHolderInfo.Key);
                }
            }
        }


        private bool IsRealContent(string content)
        {
            if (content.Length > 50) return true;
            string testContent = content.Replace("<p>", "");
            testContent = testContent.Replace("</p>", "");
            testContent = testContent.Replace("&nbsp;", "");
            testContent = testContent.Replace("&#160;", "");
            testContent = testContent.Replace(" ", "");
            testContent = testContent.Replace("<br/>", "");

            if (string.IsNullOrEmpty(testContent) == true)
            {
                return false;
            }
            else
            {
                return true;
            }
            
        }

    }
}