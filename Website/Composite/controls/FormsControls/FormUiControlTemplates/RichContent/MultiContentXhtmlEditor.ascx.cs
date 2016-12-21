using System;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using Composite.Core.Xml;
using System.Collections.Generic;
using Composite.Core.Logging;
using Composite.Plugins.Forms.WebChannel.UiControlFactories;

namespace CompositeMultiContentXhtmlEditor
{
    public partial class MultiContentXhtmlEditor : MultiContentXhtmlEditorTemplateUserControlBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (this.ContentsPlaceHolder.Controls.Count == 0)
            {
                SetUpTextAreas(false);
            }
        }

        protected override void BindStateToProperties()
        {
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
            SetUpTextAreas(true);
        }

        public override string GetDataFieldClientName()
        {
            return null;
        }


        private void SetUpTextAreas(bool flush)
        {
            List<string> handledIds = new List<string>();

            ContentsPlaceHolder.Controls.Clear();
			
			bool isFirst = true;
			
            foreach (string placeHolderId in this.PlaceholderDefinitions.Keys)
            {
                if (handledIds.Contains(placeHolderId) == false)
                {
                    string containerClasses = this.PlaceholderContainerClasses.ContainsKey(placeHolderId) ? this.PlaceholderContainerClasses[placeHolderId] : "";
                    TextBox contentTextBox = new Composite.Core.WebClient.UiControlLib.TextBox();
                    contentTextBox.TextMode = TextBoxMode.MultiLine;
                    contentTextBox.ID = placeHolderId;
                    contentTextBox.Attributes.Add("placeholderid", placeHolderId);
                    contentTextBox.Attributes.Add("placeholdername", this.PlaceholderDefinitions[placeHolderId]);
                    contentTextBox.Attributes.Add("containerclasses", containerClasses);

                    if ( isFirst )
                    {
                        contentTextBox.Attributes.Add("selected", "true");
                        isFirst = false;
                    }
                    if (flush == true)
                    {
                        if (this.NamedXhtmlFragments.ContainsKey(placeHolderId))
                        {
                            contentTextBox.Text = this.NamedXhtmlFragments[placeHolderId];
                        }
                        else
                        {
                            contentTextBox.Text = "";
                        }
                    }
                    ContentsPlaceHolder.Controls.Add(contentTextBox);
                    handledIds.Add(placeHolderId);
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